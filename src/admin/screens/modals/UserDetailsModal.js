import * as React from "react";
import { Box, Typography, Modal, Grid } from "@mui/material";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listCities } from "../../../actions/admin/cityActions";
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
};

const ModalCall = ({ open, setOpen, editData }) => {
  const statesList = useSelector((state) => state.statesList);
  const { statesInfo } = statesList;

  const cityList = useSelector((state) => state.cityList);
  const { citiesInfo } = cityList;

  const fullName =
    editData && editData.firstName.concat(` ${editData && editData.lastName}`);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
    dispatch(listStates());
    dispatch(listCities());
  }, [dispatch, navigate]);

  const handleClose = () => setOpen(false);
  return (
    // <div>
    <Modal
      open={open}
      onClose={handleClose}
      component="form"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container>
          {/* <Grid md={12}>
            <h1>Information</h1>
          </Grid> */}
          <Grid xs={12}>
            <img
              src={`http://localhost:4000/${
                editData && editData.personalImage
              }`}
              alt="city"
              // imageWidth="100%"
              // imageHeight="150"
              // roundedSize="0"
              // borderRadius="30"
              style={{ width: "100%", height: "200px", maxWidth: "100%" }}
            />
          </Grid>
          <Grid
            xs={12}
            paddingLeft="20px"
            paddingRight="10px"
            paddingBottom="10px"
          >
            <TextField
              name="userId"
              type="hidden"
              variant="standard"
              value={editData && editData._id}
            />

            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Typography variant="h6" component="div">
                Name:{fullName}
              </Typography>
              <Typography variant="h6" component="div">
                City Name:
                {citiesInfo?.map((data) => {
                  return data._id === (editData && editData.cityId)
                    ? data.cityName
                    : "";
                })}
              </Typography>
              <Typography variant="h6" component="div">
                State Name:
                {statesInfo?.map((data) => {
                  return data._id === (editData && editData.stateId)
                    ? data.stateName
                    : "";
                })}
              </Typography>
              <Typography variant="h6" component="div">
                Email:{editData && editData.email}
              </Typography>
              <Typography variant="h6" component="div">
                Contact:{editData && editData.phoneNumber}
              </Typography>
              <Typography variant="h6" component="div">
                Address:{editData && editData.address}
              </Typography>
              <Typography variant="h6" component="div">
                Pincode:{editData && editData.pincode}
              </Typography>
            </Typography>

            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, paddingBottom: "20px" }}
            >
              <Button
                type="submit"
                onClick={handleClose}
                variant="contained"
                size="medium"
                style={{ float: "right" }}
              >
                Close
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
    // </div>
  );
};

export default ModalCall;
