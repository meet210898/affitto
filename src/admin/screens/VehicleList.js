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
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { viewVehicleType } from "../../actions/admin/VehicleType";
import { listCompany } from "../../actions/admin/Company";
import ReactRoundedImage from "react-rounded-image";

import ModalCall from "./EditModals/EditVehicle";
import VehicleModalCall from "./EditModals/VehicleDetails";
import { deleteVehicle, listVehicle } from "../../actions/admin/Vehicle";
import DeleteModal from "./DeleteModals";

const { REACT_APP_HOST } = process.env;
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
  const navigate = useNavigate();

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [editData, setEditData] = React.useState(null);

  const [id, setId] = React.useState("");
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);
  const [confirmDialog, setConfirmDialog] = React.useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const vehicleUpdate = useSelector((state) => state.vehicleUpdate);
  const { success } = vehicleUpdate;

  const vehicleDelete = useSelector((state) => state.vehicleDelete);
  const { deleteSuccess } = vehicleDelete;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  React.useEffect(() => {
    if (!adminInfo.token) {
      navigate("/");
    }
    dispatch(viewVehicleType());
    dispatch(listCompany());
    dispatch(listVehicle());
  }, [dispatch, navigate, deleteSuccess, success, adminInfo.token]);
  let counter = 0;
  const vehicleList = useSelector((state) => state.vehicleList);
  const { vehiclesInfo } = vehicleList;

  const vehicleTypeList = useSelector((state) => state.vehicleTypeList);
  const { vehicleTypesInfo } = vehicleTypeList;

  const companyList = useSelector((state) => state.companyList);
  const { companiesInfo } = companyList;

  const editHandler = (row) => {
    setEditData(row);
  };

  return (
    <TableContainer component={Paper}>
      <DeleteModal
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        id={id}
        dispatchItem={deleteVehicle}
      />
      <ModalCall open={openEdit} setOpen={setOpenEdit} editData={editData} />
      <VehicleModalCall
        open={openDetail}
        setOpen={setOpenDetail}
        editData={editData}
      />
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
              <StyledTableCell>{++counter}</StyledTableCell>
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
                  image={`${REACT_APP_HOST}/${row.vehicleImage}`}
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
                    setOpenDetail(true);
                  }}
                >
                  Details
                </Button>
              </StyledTableCell>

              <StyledTableCell>
                <IconButton
                  onClick={() => {
                    editHandler(row);
                    setOpenEdit(true);
                  }}
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
                  onClick={() => {
                    setId(row._id);
                    setConfirmDialog({
                      isOpen: true,
                      title: "Are you sure to delete this record?",
                      subTitle: "You can't undo this operation",
                    });
                  }}
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
