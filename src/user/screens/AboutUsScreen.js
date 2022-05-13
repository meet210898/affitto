import * as React from "react";
import Topbar from "../components/topbar";
import img from "../public/image/aboutus/aboutus.jpg";
import registerUser from "../public/image/aboutus/registerUser.png";
import vehicleType from "../public/image/aboutus/type.jpg";
import selectVehicle from "../public/image/aboutus/selectVehicle.png";
import vehicle from "../public/image/dashboard/vehicle.jpg";
import Card from "@mui/material/Card";
import { makeStyles } from "@mui/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import "../components/css/imgTxt.css";

import {
  getCities,
  getCompany,
  getVehicleType,
  listFaq,
} from "../../actions/user/userActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isReadMorePurpose, setIsReadMorePurpose] = React.useState(true);
  const [isReadMoreGoal, setIsReadMoreGoal] = React.useState(true);
  const toggleReadMorePurpose = () => {
    setIsReadMorePurpose(!isReadMorePurpose);
  };

  const toggleReadMoreGoal = () => {
    setIsReadMoreGoal(!isReadMoreGoal);
  };
  const purpose = `An online vehicle rental system allows a person to book/reserve a vehicle
  with online payment on one end while the company staff handles the
  transactions, on the other via the Internet. The User can Upload their
  personal Vehicle for rent and can earn through it. The Users can also book
  Vehicle of other Users and Agencies available on the Website. Famous
  companies from United Kingdom, has gained popularity since the business
  used the technologies available to expand and provide more facilities to
  their customers`;

  const goal = `The basic functions of an online vehicle rental system are to keep
  tracks of vehicles, staff, customers and booking. It provides
  useful information to the staff such as giving daily reports of
  vehicles to be delivered/picked up and acts as a vehicle
  management system by monitoring the use and price of the vehicles.`;

  React.useEffect(() => {
    if (!localStorage.getItem("user-token")) {
      navigate("/user");
    }
  }, [navigate]);
  React.useEffect(() => {
    dispatch(getCompany());
    dispatch(getCities());
    dispatch(getVehicleType());
    dispatch(listFaq(4));
  }, [dispatch]);

  return (
    <>
      <Topbar />
      <div className="imgsettingAbout ">
        <div className="imgWrapper diagonal-gradient ">
          <img
            src={img}
            style={{ objectFit: "cover" }}
            height="400px"
            width="100%"
            alt="blank"
          />
          <Grid container>
            <Grid xs={10} md={6}>
              <h1 className="imgTitleAbout">Who we are</h1>
            </Grid>
          </Grid>
          <Grid xs={8} md={8}>
            <p className="descriptionAbout">Go Fast, Go Safe.</p>
          </Grid>
        </div>
      </div>
      <Grid container>
        <Grid md={1}></Grid>
        <Grid xs={12} md={5} style={{ padding: "10px" }}>
          <Card
            style={{ padding: "20px 30px", minHeight: "150px", height: "auto" }}
            variant="outlined"
          >
            <p style={{ marginTop: "0px" }} className="myfont">
              Main Purpose?
            </p>
            {isReadMorePurpose ? purpose.slice(0, 150) : purpose}
            <span onClick={toggleReadMorePurpose} className="read-or-hide">
              {isReadMorePurpose ? "...Read more" : " ...Show less"}
            </span>
          </Card>
        </Grid>
        <Grid xs={12} md={5} style={{ padding: "10px" }}>
          <Card
            style={{ padding: "20px 30px", minHeight: "150px", height: "auto" }}
            variant="outlined"
          >
            <p style={{ marginTop: "0px" }} className="myfont">
              Our Goal
            </p>
            {isReadMoreGoal ? goal.slice(0, 150) : goal}
            <span onClick={toggleReadMoreGoal} className="read-or-hide">
              {isReadMoreGoal ? "...Read more" : " ...Show less"}
            </span>
            <p></p>
          </Card>
        </Grid>
        <Grid md={1}></Grid>
      </Grid>
      <Grid container marginBottom="20px">
        <Grid xs={12} md={12} justifyContent="center" display="flex">
          <h2>How it works</h2>
        </Grid>
        <Grid xs={1} md={2}></Grid>
        <Grid xs={10} md={8}>
          <Grid container>
            <Grid xs={3} md={3}>
              <img
                src={registerUser}
                alt="register"
                height="auto"
                width="80px"
                className="center"
              />
            </Grid>
            <Grid xs={9} md={9}>
              <Card style={{ padding: "15px" }} variant="outlined">
                <p className="myfont" style={{ margin: "0px" }}>
                  Register an Account
                </p>
                <p>Registration of User</p>
                <NavLink to="/user/register">Register New User </NavLink>
              </Card>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: "20px" }}>
            <Grid xs={3} md={3}>
              <img
                src={vehicleType}
                alt="register"
                height="auto"
                width="80px"
                className="center"
              />
            </Grid>
            <Grid xs={9} md={9}>
              <Card style={{ padding: "15px" }} variant="outlined">
                <p className="myfont" style={{ margin: "0px" }}>
                  Choose a Type
                </p>
                <p>Different Type of Vehicle</p>
                <NavLink to="/user/type">Choose a Type</NavLink>
              </Card>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: "20px" }}>
            <Grid xs={3} md={3}>
              <img
                src={selectVehicle}
                alt="register"
                height="auto"
                width="80px"
                className="center"
              />
            </Grid>
            <Grid xs={9} md={9}>
              <Card style={{ padding: "15px" }} variant="outlined">
                <p className="myfont" style={{ margin: "0px" }}>
                  Select a Vehicle
                </p>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={1} md={2}></Grid>
      </Grid>
    </>
  );
};

export default HomeScreen;
