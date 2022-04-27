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
import { viewVehicleType } from "../../../actions/admin/vehicleTypeActions";
import { listCompany } from "../../../actions/admin/companyActions";
import { updateVehicle } from "../../../actions/admin/vehicleActions";

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
  const [vehicleData, setVehicleData] = React.useState({
    typeId: "",
    companyId: "",
    vehicleName: "",
    vehicleImage: "",
    description: "",
    seats: "",
    door: "",
    ac: "",
    rcImage: "",
    rcNumber: "",
    pucImage: "",
    priceperday: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
    dispatch(viewVehicleType());
    dispatch(listCompany());
  }, [dispatch, navigate]);

  React.useEffect(() => {
    if (editData) {
      setVehicleData(editData);
    }
  }, [editData]);

  const vehicleTypeList = useSelector((state) => state.vehicleTypeList);
  const { vehicleTypesInfo } = vehicleTypeList;

  const companyList = useSelector((state) => state.companyList);
  const { companiesInfo } = companyList;

  const handleSubmit = (event) => {
    event.preventDefault();
    const emptyData = new FormData();

    const data = new FormData(event.currentTarget);
    const vehicleId = data.get("vehicleId");

    for (const key in vehicleData) {
      emptyData.append(key, vehicleData[key]);
    }

    console.log(vehicleData, "vehicledata");

    dispatch(updateVehicle(vehicleId, emptyData));
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    console.log(files)
    setVehicleData({
      ...vehicleData,
      [name]: files[0],
    });
  };

  const handleClose = () => setOpen(false);
  return (
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                onChange={handleChange}
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
                  onChange={handleImageChange}
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                label="Description"
                name="description"
                type="text"
                variant="standard"
                onChange={handleChange}
                defaultValue={editData && editData.description}
              />
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                label="Seats"
                name="seats"
                type="text"
                variant="standard"
                onChange={handleChange}
                defaultValue={editData && editData.seats}
              />
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                label="Door"
                name="door"
                type="text"
                variant="standard"
                onChange={handleChange}
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
                    onChange={handleChange}
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
                  onChange={handleImageChange}
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                label="RC Number"
                name="rcNumber"
                type="text"
                variant="standard"
                onChange={handleChange}
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
                  onChange={handleImageChange}
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                label="Price/Day"
                name="priceperday"
                type="text"
                variant="standard"
                onChange={handleChange}
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
                  onChange={handleImageChange}
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
          </div>
        </div>
        <div>
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
        </div>
      </Box>
    </Modal>
  );
};

export default ModalCall;
