import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import Topbar from "../components/topbar";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { getVehicleType } from "../../actions/user/userActions";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { makeStyles } from "@mui/styles";
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import companies from "../public/image/dashboard/brand-logo.jpg";
import { listVehicle, getCompany } from "../../actions/user/userActions";

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

export default function VehicleTypeList() {
  const dispatch = useDispatch();

  const classes = useStyles();
  React.useEffect(() => {
    dispatch(getCompany());
    dispatch(listVehicle(2));
    dispatch(getVehicleType());
  }, [dispatch]);

  const vehicleTypeList = useSelector((state) => state.vehicleTypeList);
  const { vehicleTypesInfo } = vehicleTypeList;

  const vehicleList = useSelector((state) => state.vehicleList);
  const { vehiclesInfo } = vehicleList;

  const companyList = useSelector((state) => state.companyList);
  const { companiesInfo } = companyList;

  return (
    <>
      <Topbar />
      <Grid container>
        <Grid xs={1} md={1}></Grid>
        <Grid xs={10} md={10}>
          <ImageList>
            <ImageListItem key="Subheader">
              <ListSubheader component="div" style={{ background: "none" }}>
                Category
              </ListSubheader>
            </ImageListItem>
          </ImageList>
        </Grid>
        <Grid xs={1} md={1}></Grid>
      </Grid>
      <Grid container>
        <Grid xs={1} md={1}></Grid>
        <Grid xs={10} md={8}>
          <Grid container display="flex" justifyContent="space-between">
            {vehicleTypesInfo?.map((data) => (
              <Grid md={6}>
                <Link to={`/user/vehicles/${data._id}`}>
                  <Card sx={{ maxWidth: 300, height: "auto", margin: "20px" }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`http://localhost:4000/${data.typeImage}`}
                      alt="typeLogo"
                    />
                    <CardContent>
                      <center>
                        <b>{data.typeName}</b>
                      </center>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid xs={10} md={2}>
          <Grid container>
            <Grid xs={1}></Grid>
            <Grid xs={10} md={12} className={classes.root}>
              <h3 style={{ margin: "0px" }}>Explore Vehicle</h3>
              <Grid container display="flex">
                {vehiclesInfo?.map((row) => (
                  <NavLink to={`/user/VehicleDetails/${row._id}`}>
                    <Card
                      sx={{
                        height: "auto",
                        width: "70%",
                        marginTop: "20px",
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
                        height="auto"
                        image={`http://localhost:4000/${row.vehicleImage}`}
                        alt="company"
                        style={{ marginTop: "15px" }}
                      />

                      <Grid
                        xs={12}
                        style={{
                          padding: "0px",
                          marginTop: "15px",
                          fontSize: "14px",
                          borderTop: "1px solid #a2a2a3",
                          justifyContent: "center",
                          display: "flex",
                        }}
                      >
                        <b>Rs. {row.priceperday} Price/Day</b>
                      </Grid>
                    </Card>
                  </NavLink>
                ))}
              </Grid>
            </Grid>
            <Grid xs={1}></Grid>
          </Grid>
        </Grid>
        <Grid xs={1} md={1}></Grid>
        {/* <Grid xs={1} md={1}></Grid>
        <Grid xs={10} md={6} display="flex">
          <Grid container display="flex">
            {vehicleTypesInfo?.map((data) => (
              <Grid md={6}>
                <Link to={`/user/vehicles/${data._id}`}>
                  <Card sx={{ maxWidth: 300, height: "auto", margin: "20px" }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`http://localhost:4000/${data.typeImage}`}
                      alt="typeLogo"
                    />
                    <CardContent>
                      <center>
                        <b>{data.typeName}</b>
                      </center>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid xs={12} md={4}>
          hi
        </Grid>
        <Grid xs={1} md={1}></Grid> */}
      </Grid>
    </>
  );
}
