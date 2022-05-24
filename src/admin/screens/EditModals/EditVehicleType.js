import * as React from "react";
import { Box, Typography, Modal } from "@mui/material";
import ReactRoundedImage from "react-rounded-image";
import { Button, TextField, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/CameraAlt";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { updateVehicleType } from "../../../actions/admin/VehicleType";

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
  display: "none",
});

const ModalCall = ({ open, setOpen, editData }) => {
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const typeId = data.get("typeId");
    const emptyData = new FormData();
    emptyData.append(
      "typeName",
      data.get("typeName")
        ? data.get("typeName")
        : editData && editData.typeName
    );
    emptyData.append(
      "typeImage",
      data.get("typeImage")
        ? data.get("typeImage")
        : editData && editData.typeImage
    );
    dispatch(updateVehicleType(typeId, emptyData));
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
            name="typeId"
            type="hidden"
            variant="standard"
            value={editData && editData._id}
          />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <TextField
              label="Type Name"
              name="typeName"
              type="text"
              variant="standard"
              onChange={() => {}}
              defaultValue={editData && editData.typeName}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <ReactRoundedImage
              image={`${REACT_APP_HOST}/${editData && editData.typeImage}`}
              alt="vehicletype"
              imageWidth="120"
              imageHeight="120"
              roundedSize="0"
              borderRadius="30"
            />
            <label htmlFor="typeImage">
              <Input
                accept="image/*"
                id="typeImage"
                name="typeImage"
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
    </div>
  );
};

export default ModalCall;
