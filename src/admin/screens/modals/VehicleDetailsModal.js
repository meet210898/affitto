import * as React from "react";
import { Box, Typography, Modal, FormControl } from "@mui/material";
import ReactRoundedImage from "react-rounded-image";
import {
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { viewVehicleType } from "../../../actions/admin/vehicleTypeActions";
import { listCompany } from "../../../actions/admin/companyActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 500,
  overflow: "scroll",
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
    dispatch(listCompany());
  }, [dispatch, navigate]);

  const vehicleTypeList = useSelector((state) => state.vehicleTypeList);
  const { vehicleTypesInfo } = vehicleTypeList;

  const companyList = useSelector((state) => state.companyList);
  const { companiesInfo } = companyList;

  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      component="form"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1>Details</h1>
        <TextField
          name="vehicleId"
          type="hidden"
          variant="standard"
          value={editData && editData._id}
        />
        <div style={{ display: "flex", width: "100%" }}>
          <div>
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

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="companyName">Company</InputLabel>

                <Select
                  labelId="companyName"
                  id="companyId"
                  name="companyId"
                  label="Company"
                  defaultValue={editData && editData.companyId}
                >
                  {companiesInfo?.map((data) => (
                    <MenuItem value={data._id}>{data.companyName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                label="Vehicle Name"
                name="vehicleName"
                type="text"
                variant="standard"
                defaultValue={editData && editData.vehicleName}
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <ReactRoundedImage
                image={`http://localhost:4000/${
                  editData && editData.vehicleImage
                }`}
                alt="vehicle"
                imageWidth="120"
                imageHeight="120"
                roundedSize="0"
                borderRadius="30"
              />
              <label htmlFor="vehicleImage">
                <Input
                  accept="image/*"
                  id="vehicleImage"
                  name="vehicleImage"
                  type="file"
                />
              </label>
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                label="Description"
                name="description"
                type="text"
                variant="standard"
                defaultValue={editData && editData.description}
              />
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                label="Seats"
                name="seats"
                type="text"
                variant="standard"
                defaultValue={editData && editData.seats}
              />
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                label="Door"
                name="door"
                type="text"
                variant="standard"
                defaultValue={editData && editData.door}
              />
            </Typography>
          </div>
          <div>
            <Typography variant="h5" component="div">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="ac">AC/Non-AC</InputLabel>

                  <Select
                    labelId="ac"
                    id="ac"
                    name="ac"
                    label="ac"
                    defaultValue={editData && editData.ac}
                  >
                    <MenuItem value="true">AC</MenuItem>
                    <MenuItem value="false">Non-AC</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <ReactRoundedImage
                image={`http://localhost:4000/${editData && editData.rcImage}`}
                alt="rcImage"
                imageWidth="120"
                imageHeight="120"
                roundedSize="0"
                borderRadius="30"
              />
              <label htmlFor="rcImage">
                <Input
                  accept="image/*"
                  id="rcImage"
                  name="rcImage"
                  type="file"
                />
              </label>
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                label="RC Number"
                name="rcNumber"
                type="text"
                variant="standard"
                defaultValue={editData && editData.rcNumber}
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <ReactRoundedImage
                image={`http://localhost:4000/${editData && editData.pucImage}`}
                alt="pucImage"
                imageWidth="120"
                imageHeight="120"
                roundedSize="0"
                borderRadius="30"
              />
              <label htmlFor="pucImage">
                <Input
                  accept="image/*"
                  id="pucImage"
                  name="pucImage"
                  type="file"
                />
              </label>
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                label="Price/Day"
                name="priceperday"
                type="text"
                variant="standard"
                defaultValue={editData && editData.priceperday}
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <ReactRoundedImage
                image={`http://localhost:4000/${
                  editData && editData.insuranceImage
                }`}
                alt="insurance"
                imageWidth="120"
                imageHeight="120"
                roundedSize="0"
                borderRadius="30"
              />
              <label htmlFor="insuranceImage">
                <Input
                  accept="image/*"
                  id="insuranceImage"
                  name="insuranceImage"
                  type="file"
                />
              </label>
            </Typography>
          </div>
        </div>
        <div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            
            <Button
              type="submit"
              onClick={handleClose}
              variant="contained"
              size="medium"
            >
              Close
            </Button>
          </Typography>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalCall;
