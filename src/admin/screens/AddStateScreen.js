import * as React from "react";
import PhotoCamera from "@mui/icons-material/CameraAlt";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Button, TextField, IconButton } from "@mui/material";
import { addState } from "../../actions/admin/stateActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddStateScreen = () => {
  const Input = styled("input")({
    display: "none",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const createState = useSelector((state) => state.createState);
  // const { stateInfo } = createState;

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  // console.log(createState);
  // React.useEffect(() => {
  //   if (!userInfo) {
  //     navigate("/");
  //   }
  // }, [navigate, userInfo]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const stateName = data.get("stateName");
    const stateImage = data.get("stateImage");
    // console.log(stateImage);

    dispatch(addState(stateName, stateImage));
  };
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 275,
        margin: "0px",
        padding: "20px",
        boxShadow: "2px 1px 9px 2px #888888",
      }}
    >
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            State Name:
          </Typography>
          <TextField
            label="State Name"
            name="stateName"
            type="text"
            variant="standard"
          />
        </CardContent>
        <CardContent>
          <Typography variant="h5" component="div">
            State Image:
          </Typography>
          <label htmlFor="stateImage">
            <Input
              accept="image/*"
              id="stateImage"
              multiple
              type="file"
              name="stateImage"
            />
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
          <label htmlFor="stateImage">
            <Input accept="image/*" id="stateImage" type="file" />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" size="medium">
            Add State
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AddStateScreen;
