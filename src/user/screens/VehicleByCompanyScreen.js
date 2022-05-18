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
} from "../../actions/user/userActions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import carSeat from "../public/image/svgs/car-seat.webp";
import carGear from "../public/image/svgs/car-gear.webp";
import carFuel from "../public/image/svgs/car-fuel.webp";

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
                    image={`http://localhost:4000/${row.vehicleImage}`}
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
          {/* <ImageList>
            <ImageListItem key="Subheader">
              <ListSubheader component="div">Vehicles</ListSubheader>
            </ImageListItem>
          </ImageList>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                {vehicleByCompany?.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell width="200px">
                      <img
                        src={`http://localhost:4000/${row.vehicleImage}`}
                        alt="vehicle"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          maxWidth: "200px",
                          height: "auto",
                          borderRadius: "20%",
                          backdropFilter: "blur(2px) sepia(50%)",
                        }}
                      />
                    </TableCell>

                    <TableCell style={{ padding: "0" }} align="left">
                      <ul
                        style={{
                          listStyleType: "none",
                          padding: "0",
                        }}
                      >
                        <b>
                          <li>
                            {companiesInfo?.map((data) => {
                              return data._id === row.companyId
                                ? data.companyName
                                : "";
                            })}
                          </li>
                        </b>
                        <li>{row.vehicleName}</li>
                        <Button
                          style={{
                            maxWidth: "10px",
                            maxHeight: "15px",
                            minWidth: "10px",
                            minHeight: "15px",
                            cursor: "default",
                          }}
                          variant="outlined"
                        >
                          <li style={{ fontSize: "10px" }}>
                            {row.ac === true ? "AC" : "Non-AC"}
                          </li>
                        </Button>
                        <b>
                          <li style={{ fontSize: "16px" }}>
                            Rs. {row.priceperday} Price/Day
                          </li>
                        </b>
                      </ul>
                    </TableCell>
                    <TableCell style={{ padding: "0" }} align="right">
                      <Button variant="contained">Book</Button>
                      <Button
                        style={{ marginLeft: "10px" }}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          detailHandler(row._id);
                        }}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}
        </Grid>

        <Grid xs={1}></Grid>
      </Grid>
    </>
  );
}
