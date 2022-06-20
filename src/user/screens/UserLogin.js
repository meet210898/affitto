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
import { loginUser } from "../../actions/user/User";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import Fade from "react-reveal/Fade";

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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  React.useEffect(() => {
    if (localStorage.getItem("user-token")) {
      navigate("/user/Home");
    }
  }, [userInfo, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const emailId = data.get("email");
    const pwd = data.get("password");
    const loginData = {
      email: emailId,
      password: pwd,
    };
    dispatch(loginUser(loginData));
  };

  return (
    <>
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
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  style={{ background: "white" }}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  style={{ background: "white" }}
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <NavLink
                      to="/user/forgetpassword"
                      style={{ color: "#1b6dc1" }}
                      variant="body2"
                    >
                      Forgot password?
                    </NavLink>
                  </Grid>
                  <Grid item>
                    <NavLink
                      to="/user/register"
                      style={{ color: "#1b6dc1" }}
                      variant="body2"
                    >
                      Don't have an account? Sign Up
                    </NavLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Fade>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
