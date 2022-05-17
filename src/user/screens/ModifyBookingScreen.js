import * as React from "react";
import Topbar from "../components/topbar";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCompany, listVehicle } from "../../actions/user/userActions";
import { listBookingById } from "../../actions/user/bookingActions";

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button, Grid } from "@mui/material";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function BookingScreen() {
  const dispatch = useDispatch();

  const { id } = useParams("id");

  React.useEffect(() => {
    dispatch(getCompany());
    dispatch(listVehicle(0));
    dispatch(listBookingById(id));
  }, [dispatch, id]);

  const bookingById = useSelector((state) => state.bookingById);
  const { bookingsByIdInfo } = bookingById;

  const vehicleList = useSelector((state) => state.vehicleList);
  const { vehiclesInfo } = vehicleList;

  const companyList = useSelector((state) => state.companyList);
  const { companiesInfo } = companyList;

  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const time_difference = endDate.getTime() - startDate.getTime();
  const days_difference = time_difference / (1000 * 60 * 60 * 24);

  let payableAmount = 0;
  if ((payableAmount > 0 && payableAmount < 1) || payableAmount === 0) {
    payableAmount = bookingsByIdInfo?.payment;
  } else {
    payableAmount = bookingsByIdInfo?.payment * Math.trunc(days_difference);
  }
  console.log(payableAmount, "payableAmount");

  const data = {
    vehicleId: id,
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
                  return data._id === bookingsByIdInfo?.companyId
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
                {vehiclesInfo?.map((data) => {
                  return data._id === bookingsByIdInfo?.vehicleId
                    ? data.vehicleName
                    : "";
                })}
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
                  label="DateTimePicker"
                  style={{ margin: "10px" }}
                  minDate={new Date()}
                  value={bookingsByIdInfo?.startDate}
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
                  label="DateTimePicker"
                  style={{ margin: "10px" }}
                  minDate={bookingsByIdInfo?.startDate}
                  value={bookingsByIdInfo?.endDate}
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
                <b>Payable Amount:{bookingsByIdInfo?.payment}</b>
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
    </>
  );
}
