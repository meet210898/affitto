import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import Topbar from "../components/topbar";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listVehicle, getCompany } from "../../actions/user/userActions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ReactRoundedImage from "react-rounded-image";
import Button from "@mui/material/Button";

export default function VehicleList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(getCompany());
    dispatch(listVehicle());
  }, [dispatch]);

  const vehicleList = useSelector((state) => state.vehicleList);
  const { vehiclesInfo } = vehicleList;

  const companyList = useSelector((state) => state.companyList);
  const { companiesInfo } = companyList;

  const detailHandler = (vehicleId) => {
      navigate(`/user/VehicleDetails/${vehicleId}`);
  };

  return (
    <>
      <Topbar />
      <Grid container>
        <Grid xs={2}></Grid>
        <Grid xs={8}>
          <ImageList>
            <ImageListItem key="Subheader">
              <ListSubheader component="div">Vehicles</ListSubheader>
            </ImageListItem>
          </ImageList>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                {vehiclesInfo?.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell width="50px">
                      <ReactRoundedImage
                        image={`http://localhost:4000/${row.vehicleImage}`}
                        style={{ objectFit: "cover" }}
                        alt=""
                        imageWidth="150"
                        imageHeight="120"
                        roundedSize="0"
                        borderRadius="30"
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
                        onClick={()=>{
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
          </TableContainer>
        </Grid>

        <Grid xs={2}></Grid>
      </Grid>
    </>
  );
}
