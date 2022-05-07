import * as React from "react";
import Topbar from "../components/topbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCompany, listVehicleDetails } from "../../actions/user/userActions";

import isWeekend from "date-fns/isWeekend";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Grid } from "@mui/material";

export default function BookingScreen() {
  const dispatch = useDispatch();

  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const { vehicleId } = useParams("id");

  React.useEffect(() => {
    dispatch(getCompany());
    dispatch(listVehicleDetails(vehicleId));
  }, [dispatch, vehicleId]);

  const vehicleDetails = useSelector((state) => state.vehicleDetails);
  const { vehicle } = vehicleDetails;

  const companyList = useSelector((state) => state.companyList);
  const { companiesInfo } = companyList;

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
            <Grid xs={12} display="block" style={{ marginTop: "10px" }}>
              <LocalizationProvider
                style={{ margin: "10px" }}
                dateAdapter={AdapterDateFns}
              >
                <DatePicker
                  label="Start date"
                  value={startDate}
                  style={{ margin: "10px" }}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid xs={12} display="block" style={{ marginTop: "10px" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="End date"
                  value={endDate}
                  style={{ margin: "10px" }}
                  onChange={(newValue) => {
                    setEndDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid xs={12} justifyContent="center" style={{ marginTop: "10px" }}>
              <Button variant="contained">Search</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={1} md={3}></Grid>
      </Grid>
    </>
  );
}
