import * as React from "react";
import {
  Card,
  Typography,
  Button,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Topbar from "../components/topbar";
import Carousel from "react-material-ui-carousel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "react-reveal/Fade";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import img1 from "../public/image/dashboard/dashboardimg1.jpg";
import img2 from "../public/image/dashboard/dashboardimg2.jpg";
import companies from "../public/image/dashboard/brand-logo.jpg";
import category from "../public/image/dashboard/carbike.jpg";
import vehicle from "../public/image/dashboard/vehicle.jpg";
import mercedesInvestor from "../public/image/investor/mercedes.jpg";
import tataInvestor from "../public/image/investor/tatamotors.jpg";
import suzukiInvestor from "../public/image/investor/suzuki.jpg";
import landroverInvestor from "../public/image/investor/landrover2.jpg";
import carSvg from "../public/image/svgs/carSvg.png";
import price from "../public/image/svgs/price.png";

import GridDesign from "../components/grid";
import Footer from "../components/footer";
import useWindowSize from "../components/useWindowSize";

import {
  getCities,
  getCompany,
  getVehicleType,
  listFaq,
} from "../../actions/user/User";
import Investor from "../components/investor";
import Cards from "../components/cards";
import WhyCard from "../components/cards/whyCard";

import "../components/css/imgTxt.css";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const windowSize = useWindowSize();

  const imgs = [img1, img2];

  React.useEffect(() => {
    dispatch(getCompany(4));
    dispatch(getCities(4));
    dispatch(getVehicleType());
    dispatch(listFaq(4));
  }, [dispatch]);

  const faqList = useSelector((state) => state.faqList);
  const { faqInfo } = faqList;

  return (
    <>
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
        <GridDesign name="Why AFFITTO?" />
      </Fade>

      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="start"
      >
        <WhyCard
          imgName={carSvg}
          title="Well maintained cars"
          description="Regular service & maintenance; Inspected before each trip"
        />
        <WhyCard
          imgName={price}
          title="Flexible pricing plans"
          description="Select days & you are ready to go!"
        />
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
                        borderRadius: "12px",
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
            <Card
              style={{ padding: "20px 30px", borderRadius: "12px" }}
              variant="outlined"
            >
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
            <h4>View all..</h4>
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
              style={{
                display: "flex",
                flexWrap: "wrap",
                borderRadius: "12px",
              }}
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
    </>
  );
};

export default HomeScreen;
