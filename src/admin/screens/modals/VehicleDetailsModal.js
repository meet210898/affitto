import * as React from "react";
import { Box, Typography, Modal } from "@mui/material";
import ReactRoundedImage from "react-rounded-image";
import {
  Button,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { viewVehicleType } from "../../../actions/admin/vehicleTypeActions";
import { listCompany } from "../../../actions/admin/companyActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 500,
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


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
        <Grid container>
          <Grid xs={12}>
            <h1>Details</h1>
          </Grid>
          <Grid xs={6}>
            <Typography variant="h6" component="div">
              Vehicle Image:
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
            </Typography>
            <Typography variant="h6" component="div">
              Vehicle Type:
              {vehicleTypesInfo?.map((data) => {
                return data._id === (editData && editData.typeId)
                  ? data.typeName
                  : "";
              })}
            </Typography>
            <Typography variant="h6" component="div">
              Company:
              {companiesInfo?.map((data) => {
                return data._id === (editData && editData.companyId)
                  ? data.companyName
                  : "";
              })}
            </Typography>
            <Typography variant="h6" component="div">
              Vehicle Name:{editData && editData.vehicleName}
            </Typography>
            <Typography variant="h6" component="div">
              Description:{editData && editData.description}
            </Typography>
            <Typography variant="h6" component="div">
              Seats:{editData && editData.seats}
            </Typography>
            <Typography variant="h6" component="div">
              Door:{editData && editData.door}
            </Typography>
            <Typography variant="h6" component="div">
              AC/Non-AC:{(editData && editData.ac) === true ? "AC" : "Non-AC"}
            </Typography>
            <Typography variant="h6" component="div">
              RC Number:{editData && editData.rcNumber}
            </Typography>
            <Typography variant="h6" component="div">
              Price/Day:{editData && editData.priceperday}
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography variant="h6" component="div">
              RC Image:
              <ReactRoundedImage
                image={`http://localhost:4000/${editData && editData.rcImage}`}
                alt="rcImage"
                imageWidth="120"
                imageHeight="120"
                roundedSize="0"
                borderRadius="0"
              />
            </Typography>

            <Typography variant="h6" component="div">
              PUC Image:
              <ReactRoundedImage
                image={`http://localhost:4000/${editData && editData.pucImage}`}
                alt="pucImage"
                imageWidth="120"
                imageHeight="120"
                roundedSize="0"
                borderRadius="0"
              />
            </Typography>

           
            <Typography variant="h6" component="div">
              Insurance:
              <ReactRoundedImage
                image={`http://localhost:4000/${
                  editData && editData.insuranceImage
                }`}
                alt="insurance"
                imageWidth="120"
                imageHeight="120"
                roundedSize="0"
                borderRadius="0"
              />
            </Typography>
          </Grid>
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
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalCall;
