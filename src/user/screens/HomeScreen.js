import * as React from "react";
import Topbar from "../components/topbar";
import Carousel from "react-material-ui-carousel";
import img1 from "../public/image/dashboard/dashboardimg1.jpg";
import img2 from "../public/image/dashboard/dashboardimg2.jpg";
import companies from "../public/image/dashboard/brand-logo.jpg";
import category from "../public/image/dashboard/carbike.jpg";
import vehicle from "../public/image/dashboard/vehicle.jpg";
import mercedesInvestor from "../public/image/investor/mercedes.jpg";
import tataInvestor from "../public/image/investor/tatamotors.jpg";
import suzukiInvestor from "../public/image/investor/suzuki.jpg";
import landroverInvestor from "../public/image/investor/landrover2.jpg";
import GridDesign from "../components/grid";
import Footer from "../components/footer";
import useWindowSize from "../components/useWindowSize";

import {
  Card,
  Typography,
  Button,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  getCities,
  getCompany,
  getVehicleType,
  listFaq,
} from "../../actions/user/userActions";

import Investor from "../components/investor";
import Cards from "../components/cards";

import "../components/css/imgTxt.css";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const windowSize = useWindowSize();

  const imgs = [img1, img2];

  React.useEffect(() => {
    if (!localStorage.getItem("user-token")) {
      navigate("/user");
    }
  }, [navigate]);
  React.useEffect(() => {
    dispatch(getCompany(4));
    dispatch(getCities(4));
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
                    to="/user/aboutus"
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
        <Cards img={companies} linkName="company" name="Companies" />
        <Cards img={vehicle} linkName="vehicle" name="Vehicles" />
        <Cards img={category} linkName="category" name="Category" />
      </Grid>
      <Fade left>
        <Grid container justifyContent="center">
          <h2>Browse Our Listing</h2>
        </Grid>
      </Fade>

      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="start"
      >
        <Grid xs={12} md={3}>
          <Fade bottom>
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
          </Fade>
        </Grid>
        <Grid xs={12} md={3}>
          <Fade bottom>
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
          </Fade>
        </Grid>
        <Grid xs={12} md={3}>
          <Fade bottom>
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
          </Fade>
        </Grid>
      </Grid>

      <GridDesign name="FAQs" />

      <Grid container md={12} xs={12}>
        <Grid md={1} xs={1}></Grid>
        {windowSize.width < 900 ? (
          <Grid md={10} xs={10}>
            <Fade bottom>
              <>
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
                      <Typography
                        style={{ fontSize: "13px", fontWeight: "bold" }}
                      >
                        {data.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        style={{ fontSize: "13px", color: "#7f868e" }}
                      >
                        {data.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </>
            </Fade>
          </Grid>
        ) : (
          <Grid md={10} xs={10}>
            <Card style={{ padding: "20px 30px" }} variant="outlined">
              <Fade bottom>
                <>
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
                </>
              </Fade>
            </Card>
          </Grid>
        )}
        <Grid md={1} xs={1}></Grid>
      </Grid>

      <Grid container md={12} xs={12}>
        <Grid md={1} xs={1}></Grid>

        <Grid md={10} xs={10} display="flex" justifyContent="right">
          <NavLink to="/user/faq" style={{ color: "#1b6dc1" }}>
            <h2>View all..</h2>
          </NavLink>
        </Grid>

        <Grid md={1} xs={1}></Grid>
      </Grid>

      <GridDesign name="Our Investors" />

      <Grid container>
        <Grid md={1} xs={1}></Grid>
        <Grid md={10} xs={10} container>
          <Fade bottom>
            <Card
              style={{ display: "flex", flexWrap: "wrap" }}
              variant="outlined"
            >
              <Investor img={tataInvestor} investorName="TATA Motors" />
              <Investor
                img={mercedesInvestor}
                investorName="Mercedes ///AMG Motorsport"
              />
              <Investor
                img={landroverInvestor}
                investorName="Land Rover Motors"
              />
              <Investor img={suzukiInvestor} investorName="Maruti Suzuki" />
            </Card>
          </Fade>
        </Grid>
        <Grid md={1} xs={1}></Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default HomeScreen;
