import * as React from "react";
import Topbar from "../components/topbar";
import Carousel from "react-material-ui-carousel";
import img1 from "../public/image/dashboard/dashboardimg1.jpg";
import img2 from "../public/image/dashboard/dashboardimg2.jpg";
import companies from "../public/image/dashboard/brand-logo.jpg";
import category from "../public/image/dashboard/carbike.jpg";
import vehicle from "../public/image/dashboard/vehicle.jpg";
import Card from "@mui/material/Card";
import { makeStyles } from "@mui/styles";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid } from "@mui/material";
import "../components/css/imgTxt.css";
import useWindowSize from "../components/useWindowSize";

import {
  getCities,
  getCompany,
  getVehicleType,
  listFaq,
} from "../../actions/user/userActions";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const windowSize = useWindowSize();

  const imgs = [img1, img2];

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

  const companyList = useSelector((state) => state.companyList);
  const { companiesInfo } = companyList;

  const cityList = useSelector((state) => state.cityList);
  const { citiesInfo } = cityList;

  const vehicleTypeList = useSelector((state) => state.vehicleTypeList);
  const { vehicleTypesInfo } = vehicleTypeList;

  const faqList = useSelector((state) => state.faqList);
  const { faqInfo } = faqList;

  return (
    <div>
      <Topbar />
      <div className="imgsetting">
        <Carousel>
          {imgs.map((img) => (
            <div className="imgWrapper">
              <img
                src={img}
                style={{ objectFit: "cover" }}
                height="350px"
                width="100%"
                alt="blank"
              />
              <Grid container>
                <Grid xs={10} md={6}>
                  <h1 className="imgTitle">AFFITTO</h1>
                </Grid>
                <Grid xs={8} md={8}>
                  <p className="description">
                    Our fastest way to rent a vehicle.
                  </p>
                </Grid>
                <Grid xs={5} md={5}>
                  <NavLink
                    to=""
                    className="btn"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Button
                      variant="outlined"
                      style={{ color: "white", borderColor: "white" }}
                      className="fontsize"
                    >
                      View Detail
                    </Button>
                  </NavLink>
                </Grid>
              </Grid>
            </div>
          ))}
        </Carousel>
      </div>

      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        marginTop="20px"
      >
        <Grid md={3} className={classes.root}>
          <NavLink to={`/user/company`}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={companies}
                alt="Companies"
              />
              <Typography variant="h5" component="h2" className={classes.font}>
                Companies
              </Typography>
            </Card>
          </NavLink>
        </Grid>
        <Grid md={3} className={classes.root}>
          <NavLink to={`/user/vehicles`}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={vehicle}
                alt="City"
              />
              <Typography variant="h5" component="h2" className={classes.font}>
                Vehicles
              </Typography>
            </Card>
          </NavLink>
        </Grid>
        <Grid md={3} className={classes.root}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={category}
              alt="Category"
            />
            <Typography variant="h5" component="h2" className={classes.font}>
              Category
            </Typography>
          </Card>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <h2>Browse Our Listing</h2>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="start"
      >
        <Grid xs={12} md={3}>
          <Card style={{ padding: "20px 30px" }} variant="outlined">
            <h4 style={{ margin: "0px" }}>Company</h4>
            <ul
              style={{
                listStyleType: "none",
                textAlign: "left",
                paddingInlineStart: "0px",
              }}
            >
              {companiesInfo?.map((data) => {
                return <li>{data.companyName}</li>;
              })}
            </ul>
          </Card>
        </Grid>
        <Grid xs={12} md={3}>
          <Card style={{ padding: "20px 30px" }} variant="outlined">
            <h4 style={{ margin: "0px" }}>Cities</h4>
            <ul
              style={{
                listStyleType: "none",
                textAlign: "left",
                paddingInlineStart: "0px",
              }}
            >
              {citiesInfo?.map((data) => {
                return <li>{data.cityName}</li>;
              })}
            </ul>
          </Card>
        </Grid>
        <Grid xs={12} md={3}>
          <Card style={{ padding: "20px 30px" }} variant="outlined">
            <h4 style={{ margin: "0px" }}>Category</h4>
            <ul
              style={{
                listStyleType: "none",
                textAlign: "left",
                paddingInlineStart: "0px",
              }}
            >
              {vehicleTypesInfo?.map((data) => {
                return <li>{data.typeName}</li>;
              })}
            </ul>
          </Card>
        </Grid>
      </Grid>
      <Grid container md={12} xs={12}>
        <Grid md={1} xs={1}></Grid>
        <Grid md={10} xs={10}>
          <h2>FAQs</h2>
        </Grid>
        <Grid md={1} xs={1}></Grid>
      </Grid>
      <Grid container md={12} xs={12}>
        <Grid md={1} xs={1}></Grid>
        {windowSize.width < 900 ? (
          <Grid md={10} xs={10}>
            {faqInfo?.map((data) => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id={data._id}
                  style={{
                    padding: "10px",
                    backgroundColor: "#f1f1f1",
                  }}
                >
                  <Typography style={{ fontSize: "13px", fontWeight: "bold" }}>
                    {data.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography style={{ fontSize: "13px", color: "#7f868e" }}>
                    {data.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        ) : (
          <Grid md={10} xs={10}>
            <Card style={{ padding: "20px 30px" }} variant="outlined">
              {faqInfo?.map((data) => (
                <>
                  <h4 style={{ margin: "0px" }}>{data.question}</h4>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "1.43",
                      color: "rgba(18,34,50,.7)",
                    }}
                  >
                    {data.answer}
                  </p>
                </>
              ))}
            </Card>
          </Grid>
        )}
        <Grid md={1} xs={1}></Grid>
      </Grid>
      <Grid container md={12} xs={12}>
        <Grid md={1} xs={1}></Grid>

        <Grid md={10} xs={10} display="flex" justifyContent="right">
          <NavLink to="/user/faq">
            <h2>View all..</h2>
          </NavLink>
        </Grid>

        <Grid md={1} xs={1}></Grid>
      </Grid>
    </div>
  );
};

export default HomeScreen;
