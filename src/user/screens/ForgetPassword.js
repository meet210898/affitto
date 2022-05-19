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
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../actions/user/userActions";
import { Navigate, NavLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import Fade from "react-reveal/Fade";
import { useNavigate } from "react-router-dom";

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

  const [email, setEmail] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(forgetPassword({ email: email }));

    navigate("/user/OTP", { state: { email: email } });

    // <NavLink
    //   to="/user/OTP"
    //   state={{ email: email }}
    //   style={{ textDecoration: "none" }}
    // />;
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
                Forget Password
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
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ background: "white" }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Send OTP
                </Button>
                <Grid container>
                  <Grid item>
                    <NavLink
                      to="/user/login"
                      style={{ color: "#1b6dc1" }}
                      variant="body2"
                    >
                      Already have an account? Sign In
                    </NavLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Fade>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </Grid>
  );
}
