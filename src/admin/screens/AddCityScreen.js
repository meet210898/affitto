import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Progress from "../components/progress/index";
import ReactRoundedImage from "react-rounded-image";
import err from "../components/css/screen-css.css";
import {
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { addCity } from "../../actions/admin/cityActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listStates } from "../../actions/admin/stateActions";
import "../components/css/myCss.css";
import Snackbars from "../components/alert";

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
    stateId: "",
    cityName: null,
    cityImage: "",
  });

  const [message, setMessage] = React.useState("");
  const [openEdit, setOpenEdit] = React.useState(false);

  const Input = styled("input")({
    display: "none",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const statesList = useSelector((state) => state.statesList);
  const { statesInfo } = statesList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(userInfo, "userInfo");

  React.useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
    dispatch(listStates());
  }, [dispatch, navigate]);

  const handleChange = (e) => {
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
      setMessage("*This fields are mandatory!");
    } else {
      for (const key in cityData) {
        emptyData.append(key, cityData[key]);
      }
      // if (!cityData.cityName) {
      //   setCityData({ cityName: "" });
      // }
      // if (!cityData.cityName) {
      //   setCityData({ cityName: "" });
      // }

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
        maxWidth: 300,
        margin: "0px",
        padding: "20px",
        boxShadow: "2px 1px 9px 2px #888888",
        background: "white",
      }}
    >
      <Snackbars open={openEdit} setOpen={setOpenEdit} msg="City is added!" />
      <Grid container display="flex" justifyContent="center">
        <Card variant="outlined">
          {message && <p className="error">{message}</p>}
          <CardContent>
            <Typography variant="h5" component="div">
              State:
            </Typography>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="stateName">State</InputLabel>

                <Select
                  labelId="stateName"
                  id="stateId"
                  name="stateId"
                  label="City"
                  value={cityData.stateId}
                  onChange={handleChange}
                >
                  {statesInfo?.map((data) => (
                    <MenuItem value={data._id}>{data.stateName}</MenuItem>
                  ))}
                </Select>
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
                cityData.cityName !== null && cityData.cityName.trim() === ""
              }
              helperText={
                cityData.cityName !== null && cityData.cityName.trim() === ""
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
              />
              <Button variant="contained" component="span">
                Upload Image
              </Button>
            </label>
            {/* {cityData.cityImage ? <Progress /> : ""} */}
          </CardContent>
          <CardActions>
            <Button type="submit" variant="contained" size="medium">
              Add City
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Box>
  );
};

export default AddStateScreen;
