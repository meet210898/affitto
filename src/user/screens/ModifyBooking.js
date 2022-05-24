import * as React from "react";
import Topbar from "../components/topbar";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCompany, listVehicle } from "../../actions/user/User";
import { listBookingById } from "../../actions/user/Booking";

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button, Grid } from "@mui/material";
import Footer from "../components/footer";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function BookingScreen() {
  const dispatch = useDispatch();

  const { id } = useParams("id");

  React.useEffect(() => {
    dispatch(getCompany(0));
    dispatch(listVehicle(0));
    dispatch(listBookingById(id));
  }, [dispatch, id]);

  const bookingById = useSelector((state) => state.bookingById);
  const { bookingsByIdInfo } = bookingById;

  const vehicleList = useSelector((state) => state.vehicleList);
  const { vehiclesInfo } = vehicleList;

  const companyList = useSelector((state) => state.companyList);
  const { companiesInfo } = companyList;

  // React.useEffect(() => {
  //   dispatch(
  //     listVehicleDetails(
  //       bookingsByIdInfo?.vehicleId ? bookingsByIdInfo?.vehicleId : ""
  //     )
  //   );
  // }, [dispatch, bookingsByIdInfo?.vehicleId]);

  const [startDate, setStartDate] = React.useState(
    new Date(bookingsByIdInfo?.startDate ? bookingsByIdInfo?.startDate : "")
  );
  const [endDate, setEndDate] = React.useState(
    new Date(bookingsByIdInfo?.endDate ? bookingsByIdInfo?.endDate : "")
  );
  // const [payableAmount, setPayableAmount] = React.useState(0);
  const totalAmount = bookingsByIdInfo?.payment;

  const time_difference = endDate.getTime() - startDate.getTime();
  const days_difference = time_difference / (1000 * 60 * 60 * 24);

  let payableAmount = 0;
  // if (
  //   (payableAmount > 0 && payableAmount < vehiclesInfo?.priceperday) ||
  //   payableAmount === 0
  // ) {
  //   payableAmount = vehiclesInfo?.priceperday;
  // } else {
  payableAmount =
    bookingsByIdInfo?.vehicleId?.priceperday * Math.trunc(days_difference);
  // }
  if (bookingsByIdInfo?.payment > payableAmount) {
    payableAmount = bookingsByIdInfo?.payment - payableAmount;
  }

  console.log(payableAmount, "payableAmount");
  console.log(totalAmount, "totalAmount");

  const data = {
    vehicleId: id,
    startDate: startDate,
    endDate: endDate,
    payableAmount: payableAmount,
  };

  console.log(bookingsByIdInfo?.payment < payableAmount, "...");

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
                  return data._id === bookingsByIdInfo?.vehicleId?._id
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
                  label="DateTimePicker"
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
              <b>Total Amount:{totalAmount}</b>
            </Grid>
            <Grid
              xs={12}
              md={12}
              style={{ fontSize: "20px", marginTop: "10px" }}
            >
              {endDate.getMilliseconds() === 0 ? (
                <b>
                  Payable Amount:
                  {bookingsByIdInfo?.payment < payableAmount
                    ? "Your amount will be transfer to your bank account in three working days"
                    : payableAmount}
                </b>
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
      <Footer />
    </>
  );
}
