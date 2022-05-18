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
import { listStates } from "../../actions/admin/stateActions";
import { listCities, deleteCity } from "../../actions/admin/cityActions";
import { useNavigate } from "react-router-dom";
import ReactRoundedImage from "react-rounded-image";
import "../components/css/main.css";
import ModalCall from "./modals/EditCityModal";

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

  const cityDelete = useSelector((city) => city.cityDelete);
  const { deleteSuccess } = cityDelete;

  const cityUpdate = useSelector((city) => city.cityUpdate);
  const { success } = cityUpdate;

  React.useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
    dispatch(listStates());
    dispatch(listCities());
  }, [dispatch, navigate, success, deleteSuccess]);

  const cityList = useSelector((city) => city.cityList);
  const { citiesInfo } = cityList;

  const statesList = useSelector((state) => state.statesList);
  const { statesInfo } = statesList;

  const deleteHandler = (stateId) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteCity(stateId));
      navigate("/Admin/viewCity");
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
                    image={`http://localhost:4000/${row.cityImage}`}
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
