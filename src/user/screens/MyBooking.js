import * as React from "react";
import Topbar from "../components/topbar";
import { Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import moment from "moment";
import { NavLink } from "react-router-dom";
import Fade from "react-reveal/Fade";
import Footer from "../components/footer";
import GridDesign from "../components/grid";

import { listBookingByUserId } from "../../actions/user/bookingActions";
import {
  getCompany,
  listUserDetails,
  listVehicle,
} from "../../actions/user/userActions";
import ModalCall from "./Modals/CancelBookingModal";

const { REACT_APP_HOST } = process.env;

const MyBooking = () => {
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
    dispatch(getCompany(0));
    dispatch(listVehicle(0));
    dispatch(listBookingByUserId(decodeUserId._id));
    dispatch(listUserDetails(decodeUserId._id));
  }, [dispatch, decodeUserId._id, deleteSuccess]);

  const bookingByUser = useSelector((state) => state.bookingByUser);
  const { bookingsByUserInfo } = bookingByUser;

  const companyList = useSelector((state) => state.companyList);
  const { companiesInfo } = companyList;

  const vehicleList = useSelector((state) => state.vehicleList);
  const { vehiclesInfo } = vehicleList;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const bookHandler = (bookingId) => {
    navigate(`/user/modifyBooking/${bookingId}`);
  };

  return (
    <>
      <Topbar />
      <ModalCall open={openEdit} setOpen={setOpenEdit} editData={editData} />
      <GridDesign name="Your Bookings" />

      <Grid container>
        <Grid xs={1} md={1}></Grid>
        <Grid xs={10} md={10}>
          <Fade top>
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
                  style={{ padding: "20px 30px", marginBottom: "20px" }}
                  variant="outlined"
                >
                  <Grid container>
                    <Grid xs={12} md={12}>
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
                            <p style={{ margin: "0px" }}>
                              {vehicle.vehicleName}
                            </p>
                          );
                        })}
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
                              image={`${REACT_APP_HOST}/${vehicle.vehicleImage}`}
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
                        onClick={() => {
                          bookHandler(data._id);
                        }}
                        variant="contained"
                      >
                        Modify
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              ))
            )}
          </Fade>
        </Grid>
        <Grid xs={1} md={1}></Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default MyBooking;
