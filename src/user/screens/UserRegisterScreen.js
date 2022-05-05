import { Grid } from "@mui/material";
import Topbar from "../components/topbar";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserLoginScreen from "../screens/UserLoginScreen";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { getStates, getCities, addUser } from "../../actions/user/userActions";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const UserRegisterScreen = () => {
  const [stateId, setStateId] = React.useState("");
  const [cityId, setCityId] = React.useState("");
  const [personalImage, setPersonalImage] = React.useState("");

  function uploadPersonalImage(event) {
    setPersonalImage(event.target.files[0]);
  }

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getStates());
    dispatch(getCities());
  }, [dispatch]);

  const statesList = useSelector((state) => state.statesList);
  const { statesInfo } = statesList;

  const cityList = useSelector((state) => state.cityList);
  const { citiesInfo } = cityList;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const emptyData = new FormData();
    emptyData.append("firstName",data.get("firstName"))
    emptyData.append("lastName", data.get("lastName"));
    emptyData.append("phoneNumber", data.get("phoneNumber"));
    emptyData.append("stateId", stateId);
    emptyData.append("cityId",cityId);
    emptyData.append("username", data.get("username"));
    emptyData.append("email", data.get("email"));
    emptyData.append("password", data.get("password"));
    emptyData.append("confirmPassword", data.get("confirmPassword"));
    emptyData.append("address", data.get("address"));
    emptyData.append("pincode", data.get("pincode"));
    emptyData.append("personalImage", data.get("personalImage"));

    dispatch(addUser(emptyData));
  };

  return (
    <Grid>
      <Topbar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextareaAutosize
                    maxRows={4}
                    id="address"
                    name="address"
                    aria-label="maximum height"
                    placeholder="Agency Address"
                    autoFocus
                    style={{ width: "100%", height: "100px" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="pincode"
                    label="Pincode"
                    name="pincode"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="stateName">State</InputLabel>

                      <Select
                        labelId="stateName"
                        id="stateId"
                        name="stateId"
                        label="State"
                        value={stateId}
                        onChange={(e) => setStateId(e.target.value)}
                      >
                        {statesInfo?.map((data) => (
                          <MenuItem value={data._id}>{data.stateName}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="cityName">City</InputLabel>

                      <Select
                        labelId="cityName"
                        id="cityName"
                        name="cityName"
                        label="City"
                        value={cityId}
                        onChange={(e) => setCityId(e.target.value)}
                      >
                        {citiesInfo?.map((data) => {
                          if (stateId === data.stateId)
                            return (
                              <MenuItem value={data._id}>
                                {data.cityName}
                              </MenuItem>
                            );
                          else return "Please select State first!";
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    component="label"
                    onChange={uploadPersonalImage}
                  >
                    Personal Image
                    <input type="file" name="personalImage" hidden />
                  </Button>
                  {personalImage.name}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to={<UserLoginScreen />} variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </Grid>
  );
};

export default UserRegisterScreen;
