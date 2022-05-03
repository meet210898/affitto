import * as React from "react";
import Topbar from "../components/topbar";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCompany, listVehicleDetails } from "../../actions/user/userActions";

export default function VehicleDetails() {
  const dispatch = useDispatch();

  const { vehicleId } = useParams("id");

  React.useEffect(() => {
    dispatch(getCompany());
    dispatch(listVehicleDetails(vehicleId));
  }, [dispatch, vehicleId]);

  const vehicleDetails = useSelector((state) => state.vehicleDetails);
  const { vehicle } = vehicleDetails;

  console.log(vehicle, "vehicle");

  const companyList = useSelector((state) => state.companyList);
  const { companiesInfo } = companyList;

  return (
    <>
      <Topbar />
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
            <Grid xs={10} marginTop={2}>
              <img
                src={`http://localhost:4000/${vehicle?.vehicleImage}`}
                style={{ height: "100%", width: "100%" }}
                alt="tata"
              />
            </Grid>
            <Grid xs={12} display="flex">
              <Grid xs={5}>
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
              <Grid xs={6}>
                <h3>Pickup Location</h3>
                <p>305-306,AFITTO,City Light Road,Surat,Gujarat.</p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
    </>
  );
}
