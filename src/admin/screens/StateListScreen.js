import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { listStates } from "../../actions/stateActions";
import { useNavigate } from "react-router-dom";

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

export default function ViewStateScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const statesList = useSelector((state) => state.statesList);
  const { states } = statesList;
console.log(states,"states")
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  React.useEffect(() => {
    // if(states)
    // {
    //   console.log(states)
    // }
    // if (userInfo) {
       dispatch(listStates());
    // } 

  }, [dispatch]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>State Name</StyledTableCell>
            <StyledTableCell>State Image</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {states?.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell>0</StyledTableCell>
              <StyledTableCell>{row.stateName}</StyledTableCell>
              <StyledTableCell>{row.stateImage}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
