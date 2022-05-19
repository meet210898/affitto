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
import { checkOTP } from "../../actions/user/userActions";
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

  const [OTP, setOTP] = React.useState("");
  const OTPCheck = useSelector((state) => state.OTPCheck);
  const { state } = OTPCheck;
  const { error } = OTPCheck;

  if (state && state.length !== 0) {
    console.log(email, "email");
    navigate("/user/changePassword", { state: { email: email } });
  }

  // if (success) {
  //   navigate("/user/changePassword");
  // } else if (error) {
  //   navigate("/user/otp");
  // }

  // React.useEffect(() => {
  //   if (success) {
  //     navigate("/user/changePassword");
  //   } else {
  //     navigate("/user/otp");
  //   }
  // }, [success]);

  const data = {
    email: email,
    otp: OTP,
  };
  console.log(data, "data");

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(checkOTP(data));
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
                  type="password"
                  margin="normal"
                  required
                  fullWidth
                  id="otp"
                  label="OTP"
                  name="otp"
                  autoComplete="otp"
                  autoFocus
                  onChange={(e) => setOTP(e.target.value)}
                  style={{ background: "white" }}
                />
                {/* <NavLink
                  to="/user/changePassword"
                  state={{ data: data }}
                  style={{ textDecoration: "none" }}
                > */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
                {/* </NavLink> */}
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
