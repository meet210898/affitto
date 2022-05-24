import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import Topbar from "../components/topbar";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCompany,
  listVehicleByCompanyDetails,
} from "../../actions/user/User";
import Button from "@mui/material/Button";
import Fade from "react-reveal/Fade";
import Footer from "../components/footer";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import carSeat from "../public/image/svgs/car-seat.webp";
import carGear from "../public/image/svgs/car-gear.webp";
import carFuel from "../public/image/svgs/car-fuel.webp";

const { REACT_APP_HOST } = process.env;
export default function VehicleList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { companyId } = useParams("id");

  React.useEffect(() => {
    dispatch(getCompany(0));
    dispatch(listVehicleByCompanyDetails(companyId));
  }, [dispatch, companyId]);

  const vehicleByCompanyDetails = useSelector(
    (state) => state.vehicleByCompanyDetails
  );
  const { vehicleByCompany } = vehicleByCompanyDetails;

  const companyList = useSelector((state) => state.companyList);
  const { companiesInfo } = companyList;

  const detailHandler = (vehicleId) => {
    navigate(`/user/VehicleDetails/${vehicleId}`);
  };

  const bookHandler = (vehicleId) => {
    navigate(`/user/Booking/${vehicleId}`);
  };

  return (
    <>
      <Topbar />
      <Grid container>
        <Grid xs={1}></Grid>
        <Grid xs={10}>
          <ImageList>
            <ImageListItem key="Subheader">
              <ListSubheader component="div" style={{ background: "none" }}>
                Vehicles
              </ListSubheader>
            </ImageListItem>
          </ImageList>
          <Fade bottom>
            <Grid container display="flex">
              {vehicleByCompany?.map((row) => (
                <Grid md={4} style={{ width: "100%" }}>
                  <Card
                    sx={{
                      maxWidth: "400px",
                      height: "auto",
                      width: "auto",
                      margin: "20px",
                      padding: "20px",
                      boxShadow: "2px 1px 9px 2px #888888",
                    }}
                  >
                    <CardContent style={{ padding: "0px" }}>
                      <center>
                        <h3 style={{ margin: "0px" }}>
                          {companiesInfo?.map((data) => {
                            return data._id === row.companyId
                              ? data.companyName
                              : "";
                          })}{" "}
                          {row.vehicleName}
                        </h3>
                      </center>
                    </CardContent>
                    <CardMedia
                      component="img"
                      height="180"
                      image={`${REACT_APP_HOST}/${row.vehicleImage}`}
                      alt="company"
                      style={{ marginTop: "15px" }}
                    />
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                      marginTop="15px"
                    >
                      <Grid display="flex" xs={4}>
                        <img
                          src={carFuel}
                          height="20px"
                          width="20px"
                          alt="gear"
                        />
                        <span>{row.fuelType}</span>
                      </Grid>
                      <Grid display="flex" xs={4}>
                        <img
                          src={carGear}
                          height="15px"
                          width="15px"
                          style={{ marginLeft: "10px" }}
                          alt="gear"
                        />{" "}
                        <span>{row.transmission}</span>
                      </Grid>
                      <Grid display="flex" xs={4}>
                        <img
                          src={carSeat}
                          height="15px"
                          width="15px"
                          style={{ marginLeft: "10px" }}
                          alt="seat"
                        />
                        <span>{row.seats} seats</span>
                      </Grid>
                    </Grid>

                    <Grid
                      xs={12}
                      style={{
                        padding: "0px",
                        marginTop: "15px",
                        fontSize: "20px",
                        borderTop: "1px solid #a2a2a3",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <b>Rs. {row.priceperday} Price/Day</b>
                    </Grid>

                    <Grid container marginTop="15px">
                      <Grid xs={12} display="flex" justifyContent="center">
                        <Button
                          style={{ margin: "5px" }}
                          variant="contained"
                          onClick={() => {
                            bookHandler(row._id);
                          }}
                        >
                          Book
                        </Button>
                        <Button
                          style={{ margin: "5px" }}
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            detailHandler(row._id);
                          }}
                        >
                          Details
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Fade>
        </Grid>

        <Grid xs={1}></Grid>
      </Grid>
      <Footer />
    </>
  );
}
