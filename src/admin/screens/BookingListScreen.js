import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { TableContainer } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listCompany } from "../../actions/admin/companyActions";
import { listBooking } from "../../actions/admin/bookingActions";

import { listUser } from "../../actions/admin/userActions";
import { listVehicle } from "../../actions/admin/vehicleActions";
import moment from "moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ViewBookingScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
    dispatch(listUser());
    dispatch(listBooking());
    dispatch(listCompany());
    dispatch(listVehicle());
  }, [dispatch, navigate]);
  let counter = 0;

  const vehicleList = useSelector((state) => state.vehicleList);
  const { vehiclesInfo } = vehicleList;

  const companyList = useSelector((state) => state.companyList);
  const { companiesInfo } = companyList;

  const userList = useSelector((state) => state.userList);
  const { usersInfo } = userList;

  const bookingList = useSelector((state) => state.bookingList);
  const { bookingsInfo } = bookingList;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Customer Name</StyledTableCell>
            <StyledTableCell>Company Name</StyledTableCell>
            <StyledTableCell>Vehicle Name</StyledTableCell>
            <StyledTableCell>Start Date</StyledTableCell>
            <StyledTableCell>End Date</StyledTableCell>
            <StyledTableCell>Payment</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookingsInfo?.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell>{++counter}</StyledTableCell>
              <StyledTableCell>
                {usersInfo?.map((data) => {
                  return data._id === row.userId
                    ? data.firstName + " " + data.lastName
                    : "";
                })}
              </StyledTableCell>
              <StyledTableCell>
                {companiesInfo?.map((data) => {
                  return data._id === row.companyId ? data.companyName : "";
                })}
              </StyledTableCell>
              <StyledTableCell>
                {vehiclesInfo?.map((data) => {
                  return data._id === row.vehicleId ? data.vehicleName : "";
                })}
              </StyledTableCell>
              <StyledTableCell>
                {moment(row.startDate).format("LL")}
              </StyledTableCell>
              <StyledTableCell>
                {moment(row.endDate).format("LL")}
              </StyledTableCell>
              <StyledTableCell>{row.payment}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
