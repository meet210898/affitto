import * as React from "react";
import Topbar from "../components/topbar";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCompany, listVehicleDetails } from "../../actions/user/User";

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button, Grid } from "@mui/material";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Footer from "../components/footer";

export default function BookingScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { vehicleId } = useParams("id");

  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  React.useEffect(() => {
    if (!userInfo.token) {
      navigate("/");
    }
    dispatch(getCompany());
    dispatch(listVehicleDetails(vehicleId));
  }, [dispatch, vehicleId, userInfo.token]);

  const vehicleDetails = useSelector((state) => state.vehicleDetails);
  const { vehicle } = vehicleDetails;

  const companyList = useSelector((state) => state.companyList);
  const { companiesInfo } = companyList;

  const time_difference = endDate.getTime() - startDate.getTime();
  const days_difference = time_difference / (1000 * 60 * 60 * 24);

  let payableAmount = 0;
  if (payableAmount > 0 && payableAmount < 1) {
    payableAmount = vehicle?.priceperday;
  } else {
    payableAmount = vehicle?.priceperday * Math.trunc(days_difference);
  }

  const data = {
    vehicleId: vehicleId,
    startDate: startDate,
    endDate: endDate,
    payableAmount: payableAmount,
  };

  return (
    <>
      <Topbar />
      <Grid container md={12} justifyContent="center">
        <h1>Book your vehicle</h1>
      </Grid>
      <Grid container>
        <Grid xs={1} md={3}></Grid>
        <Grid xs={10} md={6}>
          <Grid container>
            <Grid xs={12}>
              <h2 style={{ padding: "0", margin: "0", marginTop: "15px" }}>
                {companiesInfo?.map((data) => {
                  return data._id === vehicle?.companyId
                    ? data.companyName
                    : "";
                })}
              </h2>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12}>
              <p
                style={{
                  padding: "0",
                  margin: "0",
                  marginTop: "5px",
                  fontSize: "16px",
                }}
              >
                {vehicle?.vehicleName}
              </p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} md={5} display="block" style={{ marginTop: "10px" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField
                      style={{ backgroundColor: "white" }}
                      {...props}
                    />
                  )}
                  label="Start Date"
                  style={{ margin: "10px" }}
                  minDate={new Date()}
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid xs={12} md={1}></Grid>
            <Grid xs={12} md={5} display="block" style={{ marginTop: "10px" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField
                      style={{ backgroundColor: "white" }}
                      {...props}
                    />
                  )}
                  label="End Date"
                  style={{ margin: "10px" }}
                  minDate={startDate}
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid
              xs={12}
              md={12}
              style={{ fontSize: "20px", marginTop: "10px" }}
            >
              {endDate.getMilliseconds() === 0 ? (
                <b>Payable Amount:{payableAmount}</b>
              ) : (
                ""
              )}
            </Grid>

            <Grid
              xs={12}
              md={12}
              justifyContent="center"
              style={{ marginTop: "10px" }}
            >
              <NavLink
                style={{ textDecoration: "none" }}
                to={`/user/confirmBooking`}
                state={{ data: data }}
              >
                <Button variant="contained">Book</Button>
              </NavLink>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={1} md={3}></Grid>
      </Grid>
      <Footer />
    </>
  );
}
