import * as React from "react";
import Topbar from "../components/topbar";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCompany, listVehicleDetails } from "../../actions/user/userActions";
import Fade from "react-reveal/Fade";
import Footer from "../components/footer";

export default function VehicleDetails() {
  const dispatch = useDispatch();

  const { vehicleId } = useParams("id");

  React.useEffect(() => {
    dispatch(getCompany(0));
    dispatch(listVehicleDetails(vehicleId));
  }, [dispatch, vehicleId]);

  const vehicleDetails = useSelector((state) => state.vehicleDetails);
  const { vehicle } = vehicleDetails;

  const companyList = useSelector((state) => state.companyList);
  const { companiesInfo } = companyList;

  return (
    <>
      <Topbar style={{ width: "auto" }} />

      <Grid container>
        <Grid xs={1}></Grid>
        <Grid xs={10}>
          <Grid container>
            <Grid xs={12}>
              <h1 style={{ padding: "0", margin: "0", marginTop: "15px" }}>
                {companiesInfo?.map((data) => {
                  return data._id === vehicle?.companyId
                    ? data.companyName
                    : "";
                })}
              </h1>
            </Grid>
            <Grid xs={12}>
              <p
                style={{
                  padding: "0",
                  margin: "0",
                  marginTop: "5px",
                  fontSize: "20px",
                }}
              >
                {vehicle?.vehicleName}
              </p>
            </Grid>
            <Grid container>
              <Grid xs={12} md={8} marginTop={2}>
                <Fade top>
                  <img
                    src={`http://localhost:4000/${vehicle?.vehicleImage}`}
                    style={{ height: "100%", maxWidth: "700px", width: "100%" }}
                    alt="tata"
                  />
                </Fade>
              </Grid>
              <Grid xs={12} md={1}></Grid>
              <Grid
                xs={12}
                md={3}
                sx={{
                  border: "0px",
                  width: { xs: "100%", md: "100%", marginTop: "16px" },
                }}
              >
                <Fade right>
                  <iframe
                    title="Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.1735673577796!2d72.75939917848156!3d21.1454898688498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd67f67bac901ac43!2zMjHCsDA4JzQ5LjYiTiA3MsKwNDUnMzMuNCJF!5e0!3m2!1sen!2sin!4v1653031491432!5m2!1sen!2sin"
                    allowfullscreen=""
                    width="100%"
                    height="100%"
                    style={{ border: "0px" }}
                    loading="lazy"
                  ></iframe>

                  {/* <h3>Pickup Location</h3>
                  
                  <p>305-306,AFITTO,City Light Road,Surat,Gujarat.</p> */}
                </Fade>
              </Grid>
            </Grid>
            <Grid xs={12} display="flex">
              <Grid xs={12}>
                <h3>About Vehicle</h3>

                <ul
                  style={{
                    listStyleType: "none",
                    padding: "0",
                    fontSize: "14px",
                  }}
                >
                  <b>
                    <li>Price Per Day : {vehicle?.priceperday}/-</li>
                  </b>
                  <li>
                    <p>{vehicle?.description}</p>
                  </li>
                </ul>
                <h3>Features</h3>
                <b>
                  <ul
                    style={{
                      fontSize: "14px",
                      paddingLeft: "15px",
                    }}
                  >
                    <li style={{ padding: "5px" }}>Seats: {vehicle?.seats}</li>
                    <li style={{ padding: "5px" }}>Doors: {vehicle?.door}</li>
                    <li style={{ padding: "5px" }}>
                      AC/Non-AC: {vehicle?.ac === true ? "AC" : "Non-AC"}
                    </li>
                    <li style={{ padding: "5px" }}>
                      RC: {vehicle?.rcNumber !== "" ? "YES" : "NO"}
                    </li>
                    <li style={{ padding: "5px" }}>
                      PUC: {vehicle?.pucImage !== null ? "YES" : "NO"}
                    </li>
                    <li style={{ padding: "5px" }}>
                      Insurance:{" "}
                      {vehicle?.insuranceImage !== null ? "YES" : "NO"}
                    </li>
                  </ul>
                </b>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
      <Footer />
    </>
  );
}
