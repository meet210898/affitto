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
import { listStates } from "../../actions/admin/State";
import { listCities, deleteCity } from "../../actions/admin/City";
import { useNavigate } from "react-router-dom";
import ReactRoundedImage from "react-rounded-image";
import "../components/css/main.css";
import ModalCall from "./EditModals/EditCity";
import DeleteModal from "./DeleteModals";
import Snackbars from "../components/alert";

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

export default function ViewCityScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = React.useState(null);
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);

  const [id, setId] = React.useState("");
  const [confirmDialog, setConfirmDialog] = React.useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  let counter = 0;

  const cityDelete = useSelector((state) => state.cityDelete);
  const { deleteSuccess } = cityDelete;

  const cityUpdate = useSelector((state) => state.cityUpdate);
  const { success } = cityUpdate;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  React.useEffect(() => {
    if (!adminInfo.token) {
      navigate("/");
    }
    dispatch(listStates());
    dispatch(listCities());
  }, [dispatch, navigate, success, deleteSuccess, adminInfo.token]);

  React.useEffect(() => {
    setOpenDeleteAlert(true);
  }, [deleteSuccess]);

  const cityList = useSelector((state) => state.cityList);
  const { citiesInfo } = cityList;

  const statesList = useSelector((state) => state.statesList);
  const { statesInfo } = statesList;

  const editHandler = (row) => {
    setEditData(row);
  };

  return (
    <TableContainer component={Paper}>
      <ModalCall open={open} setOpen={setOpen} editData={editData} />
      <DeleteModal
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        id={id}
        dispatchItem={deleteCity}
      />
      {deleteSuccess && (
        <Snackbars
          open={openDeleteAlert}
          setOpen={setOpenDeleteAlert}
          severity="error"
          msg="City is deleted!"
        />
      )}
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>State Name</StyledTableCell>
            <StyledTableCell>City Name</StyledTableCell>
            <StyledTableCell>City Image</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {citiesInfo?.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell>{++counter}</StyledTableCell>
              <StyledTableCell>
                {statesInfo?.map((data) => {
                  return data._id === row.stateId ? data.stateName : "";
                })}
              </StyledTableCell>
              <StyledTableCell>{row.cityName}</StyledTableCell>
              <StyledTableCell>
                <ReactRoundedImage
                  image={`${REACT_APP_HOST}/${row.cityImage}`}
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
