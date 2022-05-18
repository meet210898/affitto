import * as React from "react";
import ReactRoundedImage from "react-rounded-image";
import Grid from "@mui/material/Grid";
import { Typography, IconButton } from "@mui/material";
import Topbar from "../components/topbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listUserDetails, updateProfile } from "../../actions/user/userActions";
import jwt_decode from "jwt-decode";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { getCities, getStates } from "../../actions/user/userActions";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import EditPopover from "../components/popover/index";
import Fade from "react-reveal/Fade";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
    color: "textPrimary",
  },
  fontFamily: "Sans-serif",
});
const Input = styled("input")({
  display: "none",
});
export default function UserProfileScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [type, setType] = React.useState("");
  const [name, setName] = React.useState("");
  const [label, setLabel] = React.useState("");
  const [infoArr, setInfoArr] = React.useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userId = userInfo.token;
  const decodeUserId = jwt_decode(userId);

  React.useEffect(() => {
    if (!userInfo.token) {
      navigate("/user");
    }
  }, [navigate, userInfo.token]);

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success } = userUpdate;

  React.useEffect(() => {
    dispatch(listUserDetails(decodeUserId._id));
    dispatch(getStates());
    dispatch(getCities(0));
  }, [dispatch, decodeUserId._id, success]);

  const cityList = useSelector((state) => state.cityList);
  const { citiesInfo } = cityList;

  const statesList = useSelector((state) => state.statesList);
  const { statesInfo } = statesList;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  let fullName = {
    firstName: user.firstName,
    lastName: user.lastName,
  };

  const open = Boolean(anchorEl);

  let popObj = {
    anchorEl: anchorEl,
    label: label,
    name: name,
    value: value,
    type: type,
    info: infoArr,
    setAnchorEl: setAnchorEl,
    fullName: fullName,
    currentStateId: user.stateId,
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const changeImage = (event) => {
    event.preventDefault();

    const emptyData = new FormData();
    emptyData.append("personalImage", event.target.files[0]);

    dispatch(updateProfile(user?._id, emptyData));
  };

  return (
    <>
      <Grid>
        <Topbar />
        <ThemeProvider theme={theme}>
          <Container style={{ padding: "20px" }} component="main" maxWidth="xs">
            <CssBaseline />
            <Fade top>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px",
                  background: "white",
                  boxShadow: "2px 1px 9px 2px #888888",
                }}
              >
                <Grid
                  container
                  display="flex"
                  justifyContent="center"
                  title="Click to change the Profile Picture"
                >
                  <label htmlFor="personalImage">
                    <Input
                      accept="image/*"
                      id="personalImage"
                      name="personalImage"
                      type="file"
                      onChange={changeImage}
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <ReactRoundedImage
                        image={`http://localhost:4000/${user?.personalImage}`}
                        alt="vehicle"
                        style={{ objectFit: "cover" }}
                        imageWidth="150"
                        imageHeight="150"
                        roundedSize="0"
                      />
                    </IconButton>
                  </label>
                </Grid>
                <Grid container display="flex" justifyContent="center">
                  <h3
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "0 0 0 8px",
                    }}
                  >
                    {user.firstName} {user.lastName}{" "}
                    <IconButton
                      onClick={(event) => {
                        handleClick(event);
                        setValue(fullName);
                        setType("fullname");
                        setName("email");
                        setLabel("Email");
                      }}
                      aria-label="edit"
                      size="small"
                      color="primary"
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </h3>
                </Grid>

                <Grid container>
                  <h2>Your Details</h2>
                </Grid>
                <Grid xs={12} container>
                  <Grid display="block" xs={12}>
                    <Typography
                      mt={2}
                      style={{ margin: "0px" }}
                      component="div"
                    >
                      <b>Email</b>{" "}
                    </Typography>
                  </Grid>
                  <Grid display="block" xs={6}>
                    <p style={{ margin: "0px" }}>{user.email}</p>
                    <Typography marginTop="30px" mt={2} component="div">
                      <b>City</b>{" "}
                      <IconButton
                        onClick={(event) => {
                          handleClick(event);
                          setValue(user.cityId);
                          setType("citySelect");
                          setName("cityId");
                          setLabel("City");
                          setInfoArr(
                            citiesInfo?.map((data) => ({
                              stateId: data.stateId,
                              cityId: data._id,
                              cityName: data.cityName,
                            }))
                          );
                        }}
                        aria-label="edit"
                        size="small"
                        color="primary"
                      >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                    </Typography>
                    <p style={{ margin: "0px" }}>
                      {citiesInfo?.map((data) => {
                        return data._id === user.cityId ? data.cityName : "";
                      })}
                    </p>
                    <Typography marginTop="30px" mt={2} component="div">
                      <b>Phone</b>{" "}
                      <IconButton
                        onClick={(event) => {
                          handleClick(event);
                          setValue(user.phoneNumber);
                          setType("textField");
                          setName("phoneNumber");
                          setLabel("Contact Number");
                        }}
                        aria-label="edit"
                        size="small"
                        color="primary"
                      >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                    </Typography>
                    <p style={{ margin: "0px" }}>{user.phoneNumber}</p>
                  </Grid>
                  <Grid style={{ marginTop: "20px" }} xs={6}>
                    <Typography mt={2} component="div">
                      <b>Username</b>{" "}
                      <IconButton
                        onClick={(event) => {
                          handleClick(event);
                          setValue(user.username);
                          setType("textField");
                          setName("username");
                          setLabel("Username");
                        }}
                        aria-label="edit"
                        size="small"
                        color="primary"
                      >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                    </Typography>
                    <p style={{ margin: "0px" }}>{user.username}</p>
                    <Typography marginTop="30px" mt={2} component="div">
                      <b>State</b>{" "}
                      <IconButton
                        onClick={(event) => {
                          handleClick(event);
                          setValue(user.stateId);
                          setType("select");
                          setName("stateId");
                          setLabel("State");
                          setInfoArr(
                            statesInfo?.map((data) => ({
                              dataId: data._id,
                              dataName: data.stateName,
                            }))
                          );
                        }}
                        aria-label="edit"
                        size="small"
                        color="primary"
                      >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                    </Typography>
                    <p style={{ margin: "0px" }}>
                      {statesInfo?.map((data) => {
                        return data._id === user.stateId ? data.stateName : "";
                      })}
                    </p>
                  </Grid>
                </Grid>
              </Box>
            </Fade>
            <EditPopover open={open} popObj={popObj} />
          </Container>
        </ThemeProvider>
      </Grid>
    </>
  );
}
