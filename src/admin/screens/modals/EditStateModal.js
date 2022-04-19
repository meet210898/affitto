import * as React from "react";
import { Box, Typography, Modal } from "@mui/material";
import ReactRoundedImage from "react-rounded-image";
import { Button, TextField, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/CameraAlt";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateState } from "../../../actions/admin/stateActions";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
  }; 
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const stateId = data.get("stateId");
    const stateName = data.get("stateName")
      ? data.get("stateName")
      : editData && editData.stateName;
    const stateImage = data.get("stateImage")
      ? data.get("stateImage")
      : editData && editData.stateImage;

    dispatch(updateState(stateId, stateName, stateImage));
    handleClose();
  };
  const handleClose = () => setOpen(false);
  return (
    <div>
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
            name="stateId"
            type="hidden"
            variant="standard"
            value={editData && editData._id}
          />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <TextField
              label="State Name"
              name="stateName"
              type="text"
              variant="standard"
              onChange={() => {}}
              defaultValue={editData && editData.stateName}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <ReactRoundedImage
              image={`http://localhost:4000/${editData && editData.stateImage}`}
              alt="state"
              imageWidth="120"
              imageHeight="120"
              roundedSize="0"
              borderRadius="30"
            />
            <label htmlFor="stateImage">
              <Input
                accept="image/*"
                id="stateImage"
                name="stateImage"
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
            <Button type="submit" onClick={handleClose} variant="contained" size="medium">
              Close
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalCall;
