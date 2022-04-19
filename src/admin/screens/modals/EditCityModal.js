import * as React from "react";
import { Box, Typography, Modal, FormControl } from "@mui/material";
import ReactRoundedImage from "react-rounded-image";
import {
  Button,
  TextField,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/CameraAlt";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listCities, updateCity } from "../../../actions/admin/cityActions";
import { listStates } from "../../../actions/admin/stateActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Input = styled("input")({
  display: "none",
});

const ModalCall = ({ open, setOpen, editData }) => {

  const statesList = useSelector((state) => state.statesList);
  const { statesInfo } = statesList;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
    dispatch(listStates());
    dispatch(listCities());
  }, [dispatch, navigate]);


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const cityId = data.get("cityId");
    const stateId = data.get("stateId")
      ? data.get("stateId")
      : editData && editData.stateId;
    console.log(stateId, "stateId");
    const cityName = data.get("cityName")
      ? data.get("cityName")
      : editData && editData.cityName;
    const cityImage = data.get("cityImage")
      ? data.get("cityImage")
      : editData && editData.cityImage;

    dispatch(updateCity(cityId, stateId, cityName, cityImage));
    handleClose();
  };
  const handleClose = () => setOpen(false);
  return (
    // <div>
    <Modal
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      component="form"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TextField
          name="cityId"
          type="hidden"
          variant="standard"
          value={editData && editData._id}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="stateName">State</InputLabel>

            <Select
              labelId="stateName"
              id="stateId"
              name="stateId"
              label="City"
              defaultValue={editData && editData.stateId}
            >
              {statesInfo?.map((data) => (
                <MenuItem value={data._id}>{data.stateName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Typography id="modal-modal-title" variant="h6" component="h2">
          <TextField
            label="City Name"
            name="cityName"
            type="text"
            variant="standard"
            onChange={() => {}}
            defaultValue={editData && editData.cityName}
          />
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <ReactRoundedImage
            image={`http://localhost:4000/${editData && editData.cityImage}`}
            alt="city"
            imageWidth="120"
            imageHeight="120"
            roundedSize="0"
            borderRadius="30"
          />
          <label htmlFor="cityImage">
            <Input
              accept="image/*"
              id="cityImage"
              name="cityImage"
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
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" size="medium">
            Update
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            type="submit"
            onClick={handleClose}
            variant="contained"
            size="medium"
          >
            Close
          </Button>
        </Typography>
      </Box>
    </Modal>
    // </div>
  );
};

export default ModalCall;
