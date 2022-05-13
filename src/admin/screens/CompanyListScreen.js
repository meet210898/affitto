import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Grid, IconButton, TableContainer } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { viewVehicleType } from "../../actions/admin/vehicleTypeActions";
import { listCompany, deleteCompany } from "../../actions/admin/companyActions";
import { useNavigate } from "react-router-dom";
import ReactRoundedImage from "react-rounded-image";
import "../components/css/main.css";
import ModalCall from "./modals/EditCompanyModal";

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

export default function ViewCityScreen() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = React.useState(null);
  const navigate = useNavigate();
  let counter = 0;

  const companyDelete = useSelector((state) => state.companyDelete);
  const { deleteSuccess } = companyDelete;

  const companyUpdate = useSelector((state) => state.companyUpdate);
  const { success } = companyUpdate;

  React.useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
    dispatch(viewVehicleType());
    dispatch(listCompany());
  }, [dispatch, navigate, success, deleteSuccess]);

  const companyList = useSelector((state) => state.companyList);
  const { companiesInfo } = companyList;

  const vehicleTypeList = useSelector((state) => state.vehicleTypeList);
  const { vehicleTypesInfo } = vehicleTypeList;

  const deleteHandler = (companyId) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteCompany(companyId));
      navigate("/AdminDashboard/viewCompany");
    }
  };

  const editHandler = (row) => {
    setEditData(row);
  };

  return (
    <Grid>
      <ModalCall open={open} setOpen={setOpen} editData={editData} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>Vehicle Type</StyledTableCell>
              <StyledTableCell>Company Name</StyledTableCell>
              <StyledTableCell>Company Image</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companiesInfo?.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell>{++counter}</StyledTableCell>
                <StyledTableCell>
                  {vehicleTypesInfo?.map((data) => {
                    return data._id === row.typeId ? data.typeName : "";
                  })}
                </StyledTableCell>
                <StyledTableCell>{row.companyName}</StyledTableCell>
                <StyledTableCell>
                  <ReactRoundedImage
                    image={`http://localhost:4000/${row.companyLogo}`}
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
                    onClick={() => {
                      editHandler(row);
                      setOpen(true);
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
    </Grid>
  );
}
