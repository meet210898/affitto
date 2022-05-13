import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, TableContainer } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ModalCall from "./modals/EditFaqCategoryModal";
import {
  listFaqCategory,
  deleteFaqCategory,
} from "../../actions/admin/faqCategoryActions";

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

export default function ViewFaqCategoryScreen() {
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editData, setEditData] = React.useState(null);
  const navigate = useNavigate();
  let counter = 0;

  const faqCategoryUpdate = useSelector((state) => state.faqCategoryUpdate);
  const { success } = faqCategoryUpdate;

  const faqCategoryDelete = useSelector((state) => state.faqCategoryDelete);
  const { deleteSuccess } = faqCategoryDelete;

  React.useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
    dispatch(listFaqCategory());
  }, [dispatch, navigate, success, deleteSuccess]);

  const faqCategoryList = useSelector((state) => state.faqCategoryList);
  const { faqCategoryInfo } = faqCategoryList;

  const deleteHandler = (faqCategoryId) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteFaqCategory(faqCategoryId));
      navigate("/AdminDashboard/ViewFaqCategory");
    }
  };

  const editHandler = (row) => {
    setEditData(row);
  };

  return (
    <TableContainer component={Paper}>
      <ModalCall open={openEdit} setOpen={setOpenEdit} editData={editData} />

      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {faqCategoryInfo?.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell>{++counter}</StyledTableCell>
              <StyledTableCell>{row.faqCategory}</StyledTableCell>
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
