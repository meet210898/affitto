import * as React from "react";
import { Box, Typography, Modal } from "@mui/material";
import ReactRoundedImage from "react-rounded-image";
import { Button, TextField, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/CameraAlt";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { updateState } from "../../../actions/admin/stateActions";
import { Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const { REACT_APP_HOST } = process.env;
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
  // display: "none",
});

const ModalCall = ({ open, setOpen, editData, children }) => {
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = React.useState();

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

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target, "e.target");
      setSelectedImage(e.target.files[0]);
    }
  };
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
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{ borderBottom: "1px solid #a2a2a3" }}
          >
            <h3 style={{ margin: "0px" }}>Edit State</h3>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
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
              defaultValue={editData && editData.stateName}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <ReactRoundedImage
              image={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : `${REACT_APP_HOST}/${editData && editData.stateImage}`
              }
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
                onChange={imageChange}
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
            <Button
              style={{
                marginRight: "8px",
                background: "#343E9A",
              }}
              type="submit"
              variant="contained"
            >
              Update
            </Button>
            <Button
              type="submit"
              onClick={handleClose}
              variant="contained"
              style={{ color: "black", background: "#FCE3E7" }}
            >
              Close
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalCall;
