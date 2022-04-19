import * as React from "react";
import PhotoCamera from "@mui/icons-material/CameraAlt";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {
  Button,
  TextField,
  IconButton,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { addCity } from "../../actions/admin/cityActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listStates } from "../../actions/admin/stateActions";

const AddStateScreen = () => {
  const [stateId, setStateId] = React.useState("");
  const [cityName, setCityName] = React.useState(null);
  const [cityImage, setCityImage] = React.useState(null);

  const Input = styled("input")({
    display: "none",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const statesList = useSelector((state) => state.statesList);
  const { statesInfo } = statesList;

  // if (statesInfo) {
  //   console.log(statesInfo, "stateDetails");
  // }

  // const { stateInfo } = createState;

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  // console.log(createState);
  // React.useEffect(() => {
  //   if (!userInfo) {
  //     navigate("/");
  //   }
  // }, [navigate, userInfo]);

  React.useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
    dispatch(listStates());
  }, [dispatch, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const stateId = data.get("stateId");
    const cityName = data.get("cityName");
    const cityImage = data.get("cityImage");
    if(!cityName){
      setCityName("")
    }
    if (!cityName) {
      setCityImage("");
    }
    

    dispatch(addCity(stateId, cityName, cityImage));
  };
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ maxWidth: 275 }}
    >
      <Card variant="outlined">
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
                value={stateId}
                onChange={(e) => setStateId(e.target.value)}
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
            value={cityName}
            onChange={(event) => setCityName(event.target.value)}
            error={cityName !== null && cityName.trim() === ""}
            helperText={
              cityName !== null && cityName.trim() === ""
                ? "*Please Enter City Name"
                : " "
            }
          />
        </CardContent>
        <CardContent>
          <Typography variant="h5" component="div">
            City Image:
          </Typography>
          <label htmlFor="cityImage">
            <Input
              accept="image/*"
              id="cityImage"
              multiple
              type="file"
              name="cityImage"
              
            />
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" size="medium">
            Add City
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AddStateScreen;
