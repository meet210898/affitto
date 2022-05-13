import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, TableContainer } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Button } from "@mui/material";
import { updateUserStatus } from "../../actions/admin/userActions";
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "../../actions/admin/userActions";
import { useNavigate } from "react-router-dom";
import ReactRoundedImage from "react-rounded-image";

import ModalCall from "./modals/UserDetailsModal";

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

export default function ViewUserScreen() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = React.useState(null);
  const navigate = useNavigate();
  let counter = 0;

  const userList = useSelector((state) => state.userList);
  const { usersInfo } = userList;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success } = userUpdate;

  //   const vehicleTypeDelete = useSelector((state) => state.vehicleTypeDelete);
  //   const { deleteSuccess } = vehicleTypeDelete;

  React.useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
    dispatch(listUser());
  }, [dispatch, navigate, success]);

  //   const deleteHandler = (typeId) => {
  //     if (window.confirm("Are you sure")) {
  //       dispatch(deleteVehicleType(typeId));
  //       navigate("/AdminDashboard/ViewVehicleType");
  //     }
  //   };

  const editStatus = (userId, isVerify) =>
    dispatch(updateUserStatus(userId, { isVerify: !isVerify }));

  const editHandler = (row) => setEditData(row);

  return (
    <TableContainer component={Paper}>
      <ModalCall open={open} setOpen={setOpen} editData={editData} />
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Details</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersInfo?.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell>{++counter}</StyledTableCell>
              <StyledTableCell>
                {row.firstName} {row.lastName}
              </StyledTableCell>
              <StyledTableCell>
                <ReactRoundedImage
                  image={`http://localhost:4000/${row.personalImage}`}
                  style={{ objectFit: "cover" }}
                  alt=""
                  imageWidth="120"
                  imageHeight="120"
                  roundedSize="0"
                  borderRadius="30"
                />
              </StyledTableCell>
              <StyledTableCell>
                <Button
                  variant="contained"
                  style={{ height: "auto", width: "auto", fontWeight: "bold" }}
                  color={row.isVerify === true ? "success" : "error"}
                  onClick={() => {
                    editStatus(row._id, row.isVerify);
                  }}
                >
                  {row.isVerify === true ? "Verified" : "Not Verified"}
                </Button>
              </StyledTableCell>
              <StyledTableCell>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 28,
                    backgroundColor: "#1976d2 !important",
                    color: "white",
                  }}
                  onClick={() => {
                    editHandler(row);
                    setOpen(true);
                  }}
                >
                  Details
                </Button>
              </StyledTableCell>
              <StyledTableCell>
                <IconButton
                  aria-label="delete"
                  size="large"
                  style={{ color: "red" }}
                  //   onClick={() => deleteHandler(row._id)}
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
