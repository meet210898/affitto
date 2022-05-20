import * as React from "react";
import Topbar from "../components/topbar";
import img from "../public/image/aboutus/aboutus.jpg";
import registerUser from "../public/image/aboutus/registerUser.png";
import vehicleType from "../public/image/aboutus/type.jpg";
import selectVehicle from "../public/image/aboutus/selectVehicle.png";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import "../components/css/imgTxt.css";
import Fade from "react-reveal/Fade";
import Footer from "../components/footer";

const HomeScreen = () => {
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

  return (
    <>
      <Topbar />
      <div className="imgsettingAbout ">
        <Fade top>
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
        </Fade>
      </div>
      <Grid container>
        <Grid md={1}></Grid>
        <Grid xs={12} md={5} style={{ padding: "10px" }}>
          <Fade top>
            <Card
              style={{
                padding: "20px 30px",
                minHeight: "150px",
                height: "auto",
              }}
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
          </Fade>
        </Grid>
        <Grid xs={12} md={5} style={{ padding: "10px" }}>
          <Fade top>
            <Card
              style={{
                padding: "20px 30px",
                minHeight: "150px",
                height: "auto",
              }}
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
          </Fade>
        </Grid>
        <Grid md={1}></Grid>
      </Grid>
      <Grid container marginBottom="20px">
        <Grid xs={12} md={12} justifyContent="center" display="flex">
          <Fade top>
            <h2>How it works</h2>
          </Fade>
        </Grid>
        <Grid xs={1} md={2}></Grid>
        <Grid xs={10} md={8}>
          <Fade top>
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
                  <b>Register New User </b>
                </Card>
              </Grid>
            </Grid>
          </Fade>
          <Fade top>
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
                  <b>Choose a Type</b>
                </Card>
              </Grid>
            </Grid>
          </Fade>
          <Fade top>
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
          </Fade>
        </Grid>
        <Grid xs={1} md={2}></Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default HomeScreen;
