import * as React from "react";
import ReactRoundedImage from "react-rounded-image";
import {
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
  Grid,
  FormHelperText,
  Card,
  styled,
  CardActions,
  CardContent,
  Box,
} from "@mui/material";
import { addCity } from "../../actions/admin/cityActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listStates } from "../../actions/admin/stateActions";
import "../components/css/myCss.css";
import "../components/css/screen-css.css";
import Snackbars from "../components/alert";
import Skeleton from "@mui/material/Skeleton";

const validateCity = (cityData) => {
  let errors = {};
  if (!cityData.stateId) {
    errors.stateId = "State is required";
  }

  if (!cityData.cityName) {
    errors.cityName = "City Name is required";
  }

  if (!cityData.cityImage) {
    errors.cityImage = "City Image is required";
  }
  return errors;
};

const AddStateScreen = () => {
  const [cityData, setCityData] = React.useState({
    stateId: null,
    cityName: null,
    cityImage: "",
  });
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [openEdit, setOpenEdit] = React.useState(false);

  const Input = styled("input")({
    display: "none",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  React.useEffect(() => {
    if (!adminInfo.token) {
      navigate("/");
    }
    dispatch(listStates());
  }, [dispatch, navigate, adminInfo.token]);

  const statesList = useSelector((state) => state.statesList);
  const { statesInfo } = statesList;

  const { loading } = statesList;
  console.log(loading);

  const handleChange = (e) => {
    setMessage("");
    const { name, value } = e.target;
    setCityData({
      ...cityData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setCityData({
      ...cityData,
      [name]: files[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const mess = validateCity(cityData);

    const emptyData = new FormData();

    if (Object.keys(mess).length !== 0) {
      setError(mess);
      setMessage("*All fields are mandatory!");
    } else {
      for (const key in cityData) {
        emptyData.append(key, cityData[key]);
      }

      dispatch(addCity(emptyData));
      setOpenEdit(true);
    }
  };
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        width: 400,
        margin: "0px",
        padding: "20px",
        boxShadow: "2px 1px 9px 2px #888888",
        background: "white",
      }}
    >
      {loading && <Skeleton variant="rectangular" width={210} height={118} />}
      {!loading && (
        <>
          <Snackbars
            open={openEdit}
            setOpen={setOpenEdit}
            severity="success"
            msg="City is added!"
          />

          <Card variant="outlined">
            {message && <p className="error">{message}</p>}
            <CardContent>
              <Typography variant="h5" component="div">
                State:
              </Typography>
              <Box>
                <FormControl fullWidth>
                  <InputLabel id="stateName">State</InputLabel>

                  <Select
                    labelId="stateName"
                    id="stateId"
                    name="stateId"
                    label="City"
                    value={cityData.stateId}
                    onChange={handleChange}
                    error={error.stateId || cityData.stateId === ""}
                    required
                  >
                    {statesInfo?.map((data) => (
                      <MenuItem value={data._id}>{data.stateName}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText style={{ margin: "0px", color: "red" }}>
                    {error.stateId || cityData.stateId === ""
                      ? "*Please Select State"
                      : " "}
                  </FormHelperText>
                </FormControl>
              </Box>
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                City Name:
              </Typography>
              <TextField
                label="City Name"
                name="cityName"
                type="text"
                variant="standard"
                value={cityData.cityName}
                onChange={handleChange}
                error={
                  error.cityName ||
                  (cityData.cityName !== null &&
                    cityData.cityName.trim() === "")
                }
                helperText={
                  error.cityName ||
                  (cityData.cityName !== null &&
                    cityData.cityName.trim() === "")
                    ? "*Please Enter City Name"
                    : " "
                }
              />
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                City Image:
              </Typography>

              {cityData.cityImage === "" ? (
                ""
              ) : (
                <ReactRoundedImage
                  image={
                    cityData.cityImage !== ""
                      ? URL.createObjectURL(cityData.cityImage)
                      : ""
                  }
                  alt="city"
                  imageWidth="100"
                  imageHeight="100"
                  roundedSize="0"
                  borderRadius="30"
                />
              )}
              <label htmlFor="cityImage">
                <Input
                  accept="image/*"
                  id="cityImage"
                  multiple
                  type="file"
                  name="cityImage"
                  onChange={handleImageChange}
                  error={error.cityImage || cityData.cityImage === ""}
                  helperText={
                    error.cityImage || cityData.cityImage === ""
                      ? "*Please Enter City Image"
                      : " "
                  }
                />
                <Button variant="contained" component="span">
                  Upload Image
                </Button>
                {message && (
                  <FormHelperText style={{ margin: "0px", color: "red" }}>
                    *Please Select City Image
                  </FormHelperText>
                )}
              </label>
            </CardContent>
            <CardActions>
              <Button type="submit" variant="contained" size="medium">
                Add City
              </Button>
            </CardActions>
          </Card>
        </>
      )}
    </Box>
  );
};

export default AddStateScreen;
