import * as React from "react";
import Topbar from "../components/topbar";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCompany, listVehicleDetails } from "../../actions/user/userActions";
import jwt_decode from "jwt-decode";
import { listUserDetails } from "../../actions/user/userActions";
import { Typography } from "@mui/material";
import { Button, Grid } from "@mui/material";
import logo from "../public/image/logo/logo.png";
import { addBooking } from "../../actions/user/bookingActions";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function BookingScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const bookingData = {
    userId: decodeUserId._id,
    companyId: vehicle.companyId,
    vehicleId: data.vehicleId,
    startDate: data.startDate,
    endDate: data.endDate,
    payment: data.payableAmount,
    status: true,
  };

  const paymentHandler = () => {
    const options = {
      key: "rzp_test_bolvGRv48sO691",
      amount: bookingData.payment * 100,
      name: "Booking Payment",
      image: logo,

      prefill: {
        name: user.firstName + " " + user.lastName,
        email: user.email,
        contact: user.phoneNumber,
      },
      notes: {
        address: user.address,
      },
      theme: {
        color: "#1b6dc1",
      },
      handler(response) {
        const paymentId = response.razorpay_payment_id;
        const url =
          "http://localhost:3000/api/v1/rzp_capture/" +
          paymentId +
          "/" +
          bookingData.payment;
        // Using my server endpoints to capture the payment
        fetch(url, {
          method: "get",
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        })
          .then(function (data) {
            //api call insert booking
            dispatch(addBooking(bookingData));
            navigate("/user/MyBooking");
          })
          .catch(function (error) {
            //error booking
            console.log("Request failed", error);
          });
      },
    };
    const rzp1 = new window.Razorpay(options);

    rzp1.open();
  };

  return (
    <>
      <Topbar />
      <Grid container marginTop="20px">
        <Grid xs={1} md={3}></Grid>

        <Grid
          xs={10}
          md={6}
          style={{
            background: "white",
            padding: "20px",
            boxShadow: "2px 1px 9px 2px #888888",
          }}
        >
          <Grid xs={12} md={12}>
            <h1 style={{ margin: "0px" }}>Confirmation</h1>
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
            <Grid xs={12} md={6}>
              <Typography mt={2} component="div">
                <b>Email</b>
              </Typography>
              {user.email}
            </Grid>
            <Grid xs={12} md={6}>
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
              {moment(data.startDate).format("LL")}
            </Grid>
            <Grid xs={6} md={6}>
              <Typography mt={2} component="div">
                <b>End Date</b>
              </Typography>
              {moment(data.endDate).format("LL")}
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={6} md={6}>
              <Typography mt={2} component="div">
                <b>Pick up Time</b>
              </Typography>
              {moment(data.startDate).format("LT")}
            </Grid>
            <Grid xs={6} md={6}>
              <Typography mt={2} component="div">
                <b>Deliver Time</b>
              </Typography>
              {moment(data.endDate).format("LT")}
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
                <Button onClick={paymentHandler} variant="contained">
                  Pay Now
                </Button>
                <Button
                  style={{ marginLeft: "10px", background: "red" }}
                  onClick={() => navigate("/user/vehicles")}
                  variant="contained"
                >
                  Cancel
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
