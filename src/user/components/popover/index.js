import {
  Grid,
  Typography,
  TextField,
  Button,
  Popover,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Box,
} from "@mui/material";
import * as React from "react";
import jwt_decode from "jwt-decode";
import {
  listUserDetails,
  updateProfile,
} from "../../../actions/user/userActions";
import { useDispatch, useSelector } from "react-redux";

const EditPopover = ({ open, popObj }) => {
  const {
    anchorEl,
    label,
    name,
    value,
    type,
    info,
    setAnchorEl,
    fullName,
    currentStateId,
  } = popObj;

  const userId = localStorage.getItem("user-token");
  const decodeUserId = jwt_decode(userId);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(listUserDetails(decodeUserId._id));
  }, [dispatch, decodeUserId._id]);

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const { firstName, lastName } = fullName;

  const [profileData, setProfileData] = React.useState();

  React.useEffect(() => {
    setProfileData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      cityId: user.cityId,
      stateId: user.stateId,
      phoneNumber: user.phoneNumber,
    });
  }, [user, setProfileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const checkCityId = () => {
    const infoData = info?.find(
      (data) =>
        currentStateId === data.stateId && profileData.cityId === data.cityId
    );
    return infoData ? infoData.cityId : "0";
  };

  const handleClose = () => setAnchorEl(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const emptyData = new FormData();

    for (const key in profileData) {
      emptyData.append(key, profileData[key]);
    }

    dispatch(updateProfile(decodeUserId._id, emptyData));
    handleClose();
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Popover
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Grid container display="block">
            <Grid sx={12} padding="15px">
              {type === "fullname" ? (
                <Typography>
                  <TextField
                    label="firstName"
                    name="firstName"
                    type="text"
                    variant="standard"
                    defaultValue={firstName}
                    onChange={handleChange}
                  />
                  <Typography marginTop="8px">
                    <TextField
                      label="lastName"
                      name="lastName"
                      type="text"
                      variant="standard"
                      defaultValue={lastName}
                      onChange={handleChange}
                    />
                  </Typography>
                </Typography>
              ) : type === "textField" ? (
                <Typography>
                  <TextField
                    label={label}
                    name={name}
                    type="text"
                    variant="standard"
                    defaultValue={value}
                    onChange={handleChange}
                  />
                </Typography>
              ) : type === "citySelect" ? (
                <FormControl fullWidth>
                  {" "}
                  <InputLabel id={name}>{label}</InputLabel>
                  <Select
                    labelId={name}
                    id={name}
                    name={name}
                    label={label}
                    defaultValue="0"
                    value={checkCityId()}
                    onChange={handleChange}
                  >
                    <MenuItem value="0">please select</MenuItem>
                    {info
                      ?.filter((item) => currentStateId === item.stateId)
                      .map((data) => {
                        return (
                          <MenuItem value={data.cityId}>
                            {data.cityName}
                          </MenuItem>
                        );
                      })}
                  </Select>{" "}
                </FormControl>
              ) : (
                <FormControl fullWidth>
                  {" "}
                  <InputLabel id={name}>{label}</InputLabel>
                  <Select
                    labelId={name}
                    id={name}
                    name={name}
                    label={label}
                    defaultValue={value}
                    onChange={handleChange}
                  >
                    {info?.map((data) => (
                      <MenuItem value={data.dataId}>{data.dataName}</MenuItem>
                    ))}
                  </Select>{" "}
                </FormControl>
              )}

              <Grid marginTop="10px" display="flex" justifyContent="flex-end">
                <Button
                  style={{
                    marginLeft: "10px",
                    height: "22px",
                  }}
                  variant="contained"
                  size="small"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  style={{
                    marginLeft: "10px",
                    height: "22px",
                    width: "51px",
                  }}
                  type="submit"
                  variant="contained"
                  size="small"
                  onClick={(event) => handleSubmit(event)}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Popover>
      </form>
    </Box>
  );
};

export default EditPopover;
