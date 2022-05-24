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
import ReactRoundedImage from "react-rounded-image";
import Snackbars from "../components/alert";

const AddState = () => {
  const Input = styled("input")({
    // display: "none",
  });

  const [stateData, setStateData] = React.useState({
    stateName: null,
    stateImage: "",
  });
  const [openEdit, setOpenEdit] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  React.useEffect(() => {
    if (!adminInfo.token) {
      navigate("/");
    }
  }, [dispatch, navigate, adminInfo.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateData({
      ...stateData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    console.log(name, "e.target");
    setStateData({
      ...stateData,
      [name]: files[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emptyData = new FormData();
    for (const key in stateData) {
      emptyData.append(key, stateData[key]);
    }

    dispatch(addState(emptyData));
    setOpenEdit(true);
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
      <Snackbars
        open={openEdit}
        setOpen={setOpenEdit}
        severity="success"
        msg="State is added!"
      />
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
            value={stateData.stateName}
            onChange={handleChange}
          />
        </CardContent>
        <CardContent>
          <Typography variant="h5" component="div">
            State Image:
          </Typography>
          {stateData.stateImage === "" ? (
            ""
          ) : (
            <ReactRoundedImage
              image={
                stateData.stateImage !== ""
                  ? URL.createObjectURL(stateData.stateImage)
                  : ""
              }
              style={{ objectFit: "cover" }}
              alt="state"
              imageWidth="100"
              imageHeight="100"
              roundedSize="0"
              borderRadius="30"
            />
          )}
          {/* <label htmlFor="stateImage">
            <Input
              accept="image/*"
              id="stateImage"
              multiple
              type="file"
              name="stateImage"
              onChange={handleImageChange}
            />
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label> */}
          <label htmlFor="stateImage">
            <Input
              accept="image/*"
              id="stateImage"
              name="stateImage"
              onChange={handleImageChange}
              style={{ width: "80%" }}
              type="file"
            />
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

export default AddState;
