import { Grid } from "@mui/material";
import Topbar from "../components/topbar";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
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
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useDispatch, useSelector } from "react-redux";
import {
  getStates,
  getCities,
  addAgency,
} from "../../actions/user/userActions";

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
  const [gstFrontImage, setGstFrontImage] = React.useState("");
  const [gstBackImage, setGstBackImage] = React.useState("");
  const [agencyCertificate, setGstAgencyCertificate] = React.useState("");
  const [perosnalImage, setPerosnalImage] = React.useState("");
  const [signatureImage, setSignatureImage] = React.useState("");

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getStates());
    dispatch(getCities());
  }, [dispatch]);

  const statesList = useSelector((state) => state.statesList);
  const { statesInfo } = statesList;

  const cityList = useSelector((state) => state.cityList);
  const { citiesInfo } = cityList;

  function uploadGstFrontImage(event) {
    setGstFrontImage(event.target.files[0]);
  }
  function uploadGstBackImage(event) {
    setGstBackImage(event.target.files[0]);
  }
  function uploadAgencyCertificate(event) {
    setGstAgencyCertificate(event.target.files[0]);
  }
  function uploadPersonalImage(event) {
    setPerosnalImage(event.target.files[0]);
  }
  function uploadSignatureImage(event) {
    setSignatureImage(event.target.files[0]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const registerData = new FormData(event.currentTarget);
    const emptyData = new FormData();

    console.log(
      'registerData.get("gstFrontImage")',
      registerData.get("gstFrontImage")
    );
    emptyData.append("firstName", registerData.get("firstName"));
    emptyData.append("lastName", registerData.get("lastName"));
    emptyData.append("phoneNumber", registerData.get("phoneNumber"));
    emptyData.append("stateId", stateId);
    emptyData.append("cityId", cityId);
    emptyData.append("email", registerData.get("email"));
    emptyData.append("password", registerData.get("password"));
    emptyData.append("userType", "Agency");
    emptyData.append("agencyName", registerData.get("agencyName"));
    emptyData.append("address", registerData.get("address"));
    emptyData.append("landmark", registerData.get("landmark"));
    emptyData.append("pincode", registerData.get("pincode"));
    emptyData.append("gstNumber", registerData.get("gstNumber"));
    emptyData.append("gstFrontImage", registerData.get("gstFrontImage"));
    emptyData.append("gstBackImage", registerData.get("gstBackImage"));
    emptyData.append(
      "agencyCertificateImage",
      registerData.get("agencyCertificate")
    );
    emptyData.append("personalImage", registerData.get("personalImage"));
    emptyData.append("signatureImage", registerData.get("signatureImage"));
    dispatch(addAgency(emptyData));

    // const registerData = {
    //   firstName: ,
    //   lastName: data.get("lastName"),
    //   phoneNumber: data.get("phoneNumber"),
    //   stateId: stateId,
    //   cityId: cityId,
    //   email: data.get("email"),
    //   password: data.get("password"),
    //   confirmPassword: data.get("confirmPassword"),
    //   userType:"Agency",
    //   agencyName: data.get("agencyName"),
    //   address: data.get("address"),
    //   landmark: data.get("landmark"),
    //   pincode: data.get("pincode"),
    //   gstno: data.get("gstno"),
    //   gstFrontImage: data.get("gstFrontImage"),
    //   gstBackImage: data.get("gstBackImage"),
    //   agencyCertificate: data.get("agencyCertificate"),
    //   personalImage: data.get("personalImage"),
    //   signatureImage: data.get("signatureImage"),
    // };
  };

  return (
    <>
      <Topbar />
      <ThemeProvider theme={theme}>
        <center>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Agency Register
          </Typography>
        </center>

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
                  <TextField
                    autoComplete="given-name"
                    name="agencyName"
                    required
                    fullWidth
                    id="agencyName"
                    label="Agency Name"
                    autoFocus
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
                    id="landmark"
                    label="Landmark"
                    name="landmark"
                    autoComplete="family-name"
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
                  <TextField
                    required
                    fullWidth
                    id="gstNumber"
                    label="GST Number"
                    name="gstNumber"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    component="label"
                    onChange={uploadGstFrontImage}
                  >
                    GST Front Image
                    <input
                      type="file"
                      id="gstFrontImage"
                      name="gstFrontImage"
                      hidden
                    />
                  </Button>
                  {gstFrontImage.name}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    component="label"
                    onChange={uploadGstBackImage}
                  >
                    GST Back Image
                    <input type="file" name="gstBackImage" hidden />
                  </Button>
                  {gstBackImage.name}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    component="label"
                    onChange={uploadAgencyCertificate}
                  >
                    Agency Certificate Image
                    <input type="file" name="agencyCertificate" hidden />
                  </Button>
                  {agencyCertificate.name}
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
                  {perosnalImage.name}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    component="label"
                    onChange={uploadSignatureImage}
                  >
                    Signature Image
                    <input type="file" name="signatureImage" hidden />
                  </Button>
                  {signatureImage.name}
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
    </>
  );
};

export default UserRegisterScreen;
