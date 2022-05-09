import * as React from "react";
import Topbar from "../components/topbar";
import Carousel from "react-material-ui-carousel";
import img1 from "../public/image/rolls_royce_black_badge_ghost_2022_4k_6-3840x2160.jpg";
import img2 from "../public/image/ford_ranger_raptor_2022_4k_8k-7680x4320.jpg";
import Card from "@mui/material/Card";
import { makeStyles } from "@mui/styles";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";

import {
  getCities,
  getCompany,
  getVehicleType,
  listFaq,
} from "../../actions/user/userActions";

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
      <br></br>
      <Carousel>
        {
          <img
            src={img1}
            style={{ objectFit: "cover" }}
            height="350px"
            width="100%"
            alt="blank"
          />
        }

        {
          <img
            src={img2}
            style={{ objectFit: "cover" }}
            height="350px"
            width="100%"
            alt="blank"
          />
        }
      </Carousel>
      <br />
      <br />

      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid md={3} className={classes.root}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={img1}
              alt="Companies"
            />
            <Typography variant="h5" component="h2" className={classes.font}>
              Companies
            </Typography>
          </Card>
        </Grid>
        <Grid md={3} className={classes.root}>
          <Card>
            <CardMedia component="img" height="140" image={img1} alt="City" />
            <Typography variant="h5" component="h2" className={classes.font}>
              Cities
            </Typography>
          </Card>
        </Grid>
        <Grid md={3} className={classes.root}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={img1}
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
        <Grid xs={3}>
          <h4>Company</h4>
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
        </Grid>
        <Grid xs={3}>
          <h4>Cities</h4>
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
        </Grid>
        <Grid xs={3}>
          <h4>Category</h4>
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
                {/* <hr style={{ border: "0", padding: "8px" }}></hr> */}
              </>
            ))}
          </Card>
        </Grid>
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
