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

import { useDispatch, useSelector } from "react-redux";
import { viewVehicleType } from "../../actions/admin/vehicleTypeActions";
import { useNavigate } from "react-router-dom";
import { listCompany } from "../../actions/admin/companyActions";
import ReactRoundedImage from "react-rounded-image";

import ModalCall from "./modals/UserDetailsModal";
import { listVehicle } from "../../actions/admin/vehicleActions";

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

  const userList = useSelector((state) => state.userList);
  const { usersInfo } = userList;

  //   const vehicleTypeUpdate = useSelector((state) => state.vehicleTypeUpdate);
  //   const { vehicleType } = vehicleTypeUpdate;

  //   const vehicleTypeDelete = useSelector((state) => state.vehicleTypeDelete);
  //   const { deleteSuccess } = vehicleTypeDelete;

  React.useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
    dispatch(viewVehicleType());
    dispatch(listCompany());
    dispatch(listVehicle());
  }, [dispatch, navigate]);

  const vehicleList = useSelector((state) => state.vehicleList);
  const { vehiclesInfo } = vehicleList;

  const vehicleTypeList = useSelector((state) => state.vehicleTypeList);
  const { vehicleTypesInfo } = vehicleTypeList;

  const companyList = useSelector((state) => state.companyList);
  const { companiesInfo } = companyList;

  //   const deleteHandler = (typeId) => {
  //     if (window.confirm("Are you sure")) {
  //       dispatch(deleteVehicleType(typeId));
  //       navigate("/AdminDashboard/ViewVehicleType");
  //     }
  //   };

  const editHandler = (row) => {
    setEditData(row);
  };

  return (
    <TableContainer component={Paper}>
      <ModalCall open={open} setOpen={setOpen} editData={editData} />
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Vehicle Type</StyledTableCell>
            <StyledTableCell>Company Name</StyledTableCell>
            <StyledTableCell>Vehicle Name</StyledTableCell>
            <StyledTableCell>Vehicle Image</StyledTableCell>
            <StyledTableCell>Details</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehiclesInfo?.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell>0</StyledTableCell>
              <StyledTableCell>
                {vehicleTypesInfo?.map((data) => {
                  return data._id === row.typeId ? data.typeName : "";
                })}
              </StyledTableCell>
              <StyledTableCell>
                {companiesInfo?.map((data) => {
                  return data._id === row.companyId ? data.companyName : "";
                })}
              </StyledTableCell>
              <StyledTableCell>{row.vehicleName}</StyledTableCell>
              <StyledTableCell>
                <ReactRoundedImage
                  image={`http://localhost:4000/${row.vehicleImage}`}
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
