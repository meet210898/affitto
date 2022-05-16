import * as React from "react";
import Topbar from "../components/topbar";
import { Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import moment from "moment";
import { NavLink } from "react-router-dom";

import { listBookingByUserId } from "../../actions/user/bookingActions";
import {
  getCompany,
  listUserDetails,
  listVehicle,
} from "../../actions/user/userActions";
import ModalCall from "./Modals/CancelBookingModal";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  font: {
    position: "absolute",
    bottom: "1%",
    width: "50%",
    textAlign: "left",
    color: "white",
    fontSize: "20px",
    fontFamily: "Sans-serif",
  },
}));

const NotFoundScreen = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const decodeUserId = jwt_decode(localStorage.getItem("user-token"));
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editData, setEditData] = React.useState(null);

  React.useEffect(() => {
    if (!localStorage.getItem("user-token")) {
      navigate("/user");
    }
  }, [navigate]);

  const bookingDelete = useSelector((state) => state.bookingDelete);
  const { deleteSuccess } = bookingDelete;

  React.useEffect(() => {
    dispatch(getCompany());
    dispatch(listVehicle());
    dispatch(listBookingByUserId(decodeUserId._id));
    dispatch(listUserDetails(decodeUserId._id));
  }, [dispatch, decodeUserId._id, deleteSuccess]);

  const bookingByUser = useSelector((state) => state.bookingByUser);
  const { bookingsByUserInfo } = bookingByUser;

  console.log(bookingsByUserInfo, "bookingsByUserInfo");

  const companyList = useSelector((state) => state.companyList);
  const { companiesInfo } = companyList;

  const vehicleList = useSelector((state) => state.vehicleList);
  const { vehiclesInfo } = vehicleList;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  return (
    <>
      <Topbar />
      <ModalCall open={openEdit} setOpen={setOpenEdit} editData={editData} />
      <Grid container>
        <Grid xs={1} md={1}></Grid>
        <Grid xs={10} md={10}>
          <h2>Your Bookings</h2>
        </Grid>
        <Grid xs={1} md={1}></Grid>
      </Grid>

      <Grid container>
        <Grid xs={1} md={1}></Grid>
        <Grid xs={10} md={10}>
          {bookingsByUserInfo?.length === 0 ? (
            <center>
              <h1>Oops! You don't have any bookings</h1>
              <NavLink style={{ textDecoration: "none" }} to="/user">
                <Button variant="contained">Go to Home Page</Button>
              </NavLink>
            </center>
          ) : (
            bookingsByUserInfo?.map((data) => (
              <Card
                style={{ padding: "20px 30px", marginTop: "20px" }}
                variant="outlined"
              >
                <Grid container>
                  <Grid xs={12} md={9}>
                    {companiesInfo
                      ?.filter((item) => item._id === data.companyId)
                      .map((company) => {
                        return (
                          <h3 style={{ margin: "0px" }}>
                            {company.companyName}
                          </h3>
                        );
                      })}
                    {vehiclesInfo
                      ?.filter((item) => item._id === data.vehicleId)
                      .map((vehicle) => {
                        return (
                          <p style={{ margin: "0px" }}>{vehicle.vehicleName}</p>
                        );
                      })}
                  </Grid>
                  <Grid xs={12} md={3}>
                    <p style={{ margin: "0px", color: "rgba(0, 0, 0, 0.6)" }}>
                      Booking ID
                    </p>
                    <p style={{ margin: "0px" }}>{data._id}</p>
                  </Grid>
                </Grid>

                <Grid container style={{ marginTop: "10px" }}>
                  <Grid xs={12} md={3}>
                    {vehiclesInfo
                      ?.filter((item) => item._id === data.vehicleId)
                      .map((vehicle) => {
                        return (
                          <CardMedia
                            component="img"
                            height="auto"
                            image={`http://localhost:4000/${vehicle.vehicleImage}`}
                            alt="company"
                          />
                        );
                      })}
                  </Grid>
                  <Grid
                    style={{ marginLeft: "10px" }}
                    xs={12}
                    md={8}
                    display="flex"
                  >
                    <Grid xs={12} md={6}>
                      <p
                        style={{
                          marginTop: "0px",
                          marginBottom: "0px",
                          color: "rgba(0, 0, 0, 0.6)",
                        }}
                      >
                        Pick up
                      </p>
                      <p style={{ margin: "0px" }} display="flex">
                        {moment(data.startDate).format("LL")}{" "}
                        {moment(data.startDate).format("LT")}
                      </p>

                      <p
                        style={{
                          marginBottom: "0px",
                          color: "rgba(0, 0, 0, 0.6)",
                        }}
                      >
                        Name
                      </p>
                      <p style={{ margin: "0px" }}>
                        {user.firstName} {user.lastName}
                      </p>
                      <h3>Payment: {data.payment}</h3>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <p
                        style={{
                          marginTop: "0px",
                          marginBottom: "0px",
                          color: "rgba(0, 0, 0, 0.6)",
                        }}
                      >
                        Drop Date
                      </p>
                      <p style={{ margin: "0px" }}>
                        {moment(data.endDate).format("LL")}{" "}
                        {moment(data.endDate).format("LT")}
                      </p>

                      <p
                        style={{
                          marginBottom: "0px",
                          color: "rgba(0, 0, 0, 0.6)",
                        }}
                      >
                        Mobile
                      </p>
                      <p style={{ margin: "0px" }}>{user.phoneNumber}</p>
                    </Grid>
                  </Grid>
                  <Grid justifyContent="right" xs={12} md={12} display="flex">
                    <Button
                      onClick={() => {
                        setEditData(data._id);
                        setOpenEdit(true);
                      }}
                      style={{ background: "red" }}
                      variant="contained"
                    >
                      Cancel
                    </Button>
                    <Button
                      style={{ marginLeft: "10px" }}
                      onClick=""
                      variant="contained"
                    >
                      Modify
                    </Button>
                  </Grid>
                </Grid>

                {/* <CardMedia
              component="img"
              height="140"
              //   image={companies}
              alt="Companies"
            />
            <Typography variant="h5" component="h2" className={classes.font}>
              Companies
            </Typography> */}
              </Card>
            ))
          )}
        </Grid>
        <Grid xs={1} md={1}></Grid>
      </Grid>
    </>
  );
};

export default NotFoundScreen;
