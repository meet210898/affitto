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
import { updateCompany } from "../../../actions/admin/companyActions";
import { viewVehicleType } from "../../../actions/admin/vehicleTypeActions";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
    dispatch(viewVehicleType());
  }, [dispatch, navigate]);

  const vehicleTypeList = useSelector((state) => state.vehicleTypeList);
  const { vehicleTypesInfo } = vehicleTypeList;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const CompanyId = data.get("CompanyId");

    const emptyData = new FormData();
    emptyData.append(
      "typeId",
      data.get("typeId")
      ? data.get("typeId")
      : editData && editData.typeId
    );
    emptyData.append(
      "companyName",
      data.get("companyName")
        ? data.get("companyName")
        : editData && editData.companyName
    );
    emptyData.append(
      "companyLogo",
      data.get("companyLogo")
        ? data.get("companyLogo")
        : editData && editData.companyLogo
    );

    dispatch(updateCompany(CompanyId, emptyData));
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
          name="CompanyId"
          type="hidden"
          variant="standard"
          value={editData && editData._id}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="typeName">Vehicle Type</InputLabel>

            <Select
              labelId="typeName"
              id="typeId"
              name="typeId"
              label="Vehicle Type"
              defaultValue={editData && editData.typeId}
            >
              {vehicleTypesInfo?.map((data) => (
                <MenuItem value={data._id}>{data.typeName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Typography id="modal-modal-title" variant="h6" component="h2">
          <TextField
            label="Company Name"
            name="companyName"
            type="text"
            variant="standard"
            onChange={() => {}}
            defaultValue={editData && editData.companyName}
          />
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <ReactRoundedImage
            image={`${REACT_APP_HOST}/${editData && editData.companyLogo}`}
            alt="company"
            imageWidth="120"
            imageHeight="120"
            roundedSize="0"
            borderRadius="30"
          />
          <label htmlFor="companyLogo">
            <Input
              accept="image/*"
              id="companyLogo"
              name="companyLogo"
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
