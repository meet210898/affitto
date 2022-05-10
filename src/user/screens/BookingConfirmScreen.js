import * as React from "react";
import Topbar from "../components/topbar";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCompany, listVehicleDetails } from "../../actions/user/userActions";
import jwt_decode from "jwt-decode";
import { listUserDetails } from "../../actions/user/userActions";
import { Typography, IconButton } from "@mui/material";

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Grid } from "@mui/material";

export default function BookingScreen() {
  const dispatch = useDispatch();

  const location = useLocation();

  const { data } = location.state;
  const decodeUserId = jwt_decode(localStorage.getItem("user-token"));

  React.useEffect(() => {
    dispatch(getCompany());
    dispatch(listVehicleDetails(data.vehicleId));
    dispatch(listUserDetails(decodeUserId._id));
  }, [dispatch, data.vehicleId, decodeUserId._id]);

  const vehicleDetails = useSelector((state) => state.vehicleDetails);
  const { vehicle } = vehicleDetails;

  const companyList = useSelector((state) => state.companyList);
  const { companiesInfo } = companyList;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  return (
    <>
      <Topbar />
      <Grid container marginTop="20px">
        <Grid xs={1} md={3}></Grid>

        <Grid
          xs={10}
          md={6}
          style={{ padding: "20px", boxShadow: "2px 1px 9px 2px #888888" }}
        >
          <Grid xs={12} md={12}>
            <h1>Confirmation</h1>
          </Grid>
          {/* user detail */}
          <Grid container>
            <Grid xs={6} md={6}>
              <Typography mt={2} component="div">
                <b>Name</b>
              </Typography>
              {user.firstName} {user.lastName}
            </Grid>
            <Grid xs={6} md={6}>
              <Typography mt={2} component="div">
                <b>Username</b>
              </Typography>
              {user.username}
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={6} md={6}>
              <Typography mt={2} component="div">
                <b>Email</b>
              </Typography>
              {user.email}
            </Grid>
            <Grid xs={6} md={6}>
              <Typography mt={2} component="div">
                <b>Phone Number</b>
              </Typography>
              {user.phoneNumber}
            </Grid>
          </Grid>

          {/* vehicle detail */}
          <Grid container>
            <Grid xs={6} md={6}>
              <Typography mt={2} component="div">
                <b>Company</b>
              </Typography>
              {companiesInfo?.map((data) => {
                return data._id === vehicle?.companyId ? data.companyName : "";
              })}
            </Grid>
            <Grid xs={6} md={6}>
              <Typography mt={2} component="div">
                <b>Vehicle Name</b>
              </Typography>
              {vehicle?.vehicleName}
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={6} md={6}>
              <Typography mt={2} component="div">
                <b>Start Date</b>
              </Typography>
              {data.startDate}
            </Grid>
            <Grid xs={6} md={6}>
              <Typography mt={2} component="div">
                <b>End Date</b>
              </Typography>
              {data.endDate}
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} md={12}>
              <Typography mt={2} style={{ fontSize: "20px" }} component="div">
                <b>Payable Amount</b>
                <p style={{ margin: "0px" }}>{data.payableAmount}</p>
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} md={12}>
              <Typography mt={2} style={{ fontSize: "20px" }} component="div">
                <Button variant="contained" color="secondary">
                  Pay Now
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid xs={1} md={3}></Grid>
      </Grid>
    </>
  );
}
