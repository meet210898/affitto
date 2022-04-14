import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, TableContainer } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteState, listStates } from "../../actions/stateActions";
import { useNavigate } from "react-router-dom";
import ReactRoundedImage from "react-rounded-image";

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
  const { statesInfo } = statesList;

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  React.useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
    dispatch(listStates());
  }, [dispatch, navigate]);

  const editState = (stateId) => {
    navigate(`/AdminDashboard/EditState/${stateId}`);
  };

  const deleteHandler = (stateId) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteState(stateId));
      navigate("/AdminDashboard/viewState");
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>State Name</StyledTableCell>
            <StyledTableCell>State Image</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {statesInfo?.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell>0</StyledTableCell>
              <StyledTableCell>{row.stateName}</StyledTableCell>
              <StyledTableCell>
                <ReactRoundedImage
                  image={`http://localhost:4000/${row.stateImage}`}
                  style={{ objectFit: "cover" }}
                  alt=""
                  imageWidth="120"
                  imageHeight="120"
                  roundedSize="0"
                  borderRadius="30"
                />
              </StyledTableCell>

              <StyledTableCell>
                <IconButton
                  onClick={() => editState(row._id)}
                  aria-label="edit"
                  size="large"
                  color="primary"
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="large"
                  style={{ color: "red" }}
                  onClick={() => deleteHandler(row._id)}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
