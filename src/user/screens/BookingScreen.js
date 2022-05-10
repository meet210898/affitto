import * as React from "react";
import Topbar from "../components/topbar";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCompany, listVehicleDetails } from "../../actions/user/userActions";
import moment from "moment";

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Grid } from "@mui/material";

export default function BookingScreen() {
  const dispatch = useDispatch();

  const { vehicleId } = useParams("id");

  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  React.useEffect(() => {
    dispatch(getCompany());
    dispatch(listVehicleDetails(vehicleId));
  }, [dispatch, vehicleId]);

  const vehicleDetails = useSelector((state) => state.vehicleDetails);
  const { vehicle } = vehicleDetails;

  const companyList = useSelector((state) => state.companyList);
  const { companiesInfo } = companyList;

  const time_difference = endDate.getTime() - startDate.getTime();
  const days_difference = time_difference / (1000 * 60 * 60 * 24);

  const payableAmount = vehicle?.priceperday * days_difference;

  const data = {
    vehicleId: vehicleId,
    startDate: moment(startDate).format("LL"),
    endDate: moment(endDate).format("LL"),
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
              <LocalizationProvider
                style={{ margin: "10px" }}
                dateAdapter={AdapterDateFns}
              >
                <DatePicker
                  label="Start date"
                  value={startDate}
                  style={{ margin: "10px" }}
                  minDate={new Date()}
                  onChange={(date) => setStartDate(date)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid xs={12} md={1}></Grid>
            <Grid xs={12} md={5} display="block" style={{ marginTop: "10px" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="End date"
                  value={endDate}
                  style={{ margin: "10px" }}
                  minDate={startDate}
                  onChange={(date) => setEndDate(date)}
                  renderInput={(params) => <TextField {...params} />}
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
    </>
  );
}
