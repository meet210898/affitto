import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Topbar from "../components/topbar";
import { useDispatch, useSelector } from "react-redux";
import { changeUserPassword } from "../../actions/user/userActions";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import Fade from "react-reveal/Fade";
import { useLocation } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <NavLink color="inherit" style={{ color: "#00000099" }} to="/user">
        AFFITTO
      </NavLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function UserLoginScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const { email } = location.state;

  const changePassword = useSelector((state) => state.changePassword);
  const { state } = changePassword;
  const { error } = changePassword;

  console.log(state, "state");
  console.log(error, "error");

  //   if (state && state.length !== 0) {
  //     console.log(email, "email");
  //     navigate("/user/changePassword", { state: { email: email } });
  //   }
  console.log(email, "email");
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get("password");
    const confirmpassword = data.get("confirmpassword");

    console.log(password, "password");
    console.log(confirmpassword, "confirmpassword");

    dispatch(
      changeUserPassword({
        email: email,
        password: password,
        confirmpassword: confirmpassword,
      })
    );
  };

  return (
    <Grid>
      <Topbar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Fade bottom>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#1b6dc1" }}>
                <PersonIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Change Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  style={{ background: "white" }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="current-password"
                  style={{ background: "white" }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Fade>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </Grid>
  );
}
