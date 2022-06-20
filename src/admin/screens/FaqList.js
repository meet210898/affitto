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

import ModalCall from "./EditModals/EditFaq";
import { listFaq, deleteFaq } from "../../actions/admin/Faq";
import { listFaqCategory } from "../../actions/admin/FaqCategory";
import DeleteModal from "./DeleteModals";

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

export default function ViewFaqScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openEdit, setOpenEdit] = React.useState(false);
  const [editData, setEditData] = React.useState(null);

  const [id, setId] = React.useState("");
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);
  const [confirmDialog, setConfirmDialog] = React.useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  let counter = 0;

  const faqUpdate = useSelector((state) => state.faqUpdate);
  const { success } = faqUpdate;

  const faqDelete = useSelector((state) => state.faqDelete);
  const { deleteSuccess } = faqDelete;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  React.useEffect(() => {
    if (!adminInfo.token) {
      navigate("/");
    }
    dispatch(listFaqCategory());
    dispatch(listFaq());
  }, [dispatch, navigate, success, deleteSuccess, adminInfo.token]);

  const faqCategoryList = useSelector((state) => state.faqCategoryList);
  const { faqCategoryInfo } = faqCategoryList;

  const faqList = useSelector((state) => state.faqList);
  const { faqInfo } = faqList;

  const editHandler = (row) => {
    setEditData(row);
  };

  return (
    <TableContainer component={Paper}>
      <DeleteModal
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        id={id}
        dispatchItem={deleteFaq}
      />
      <ModalCall open={openEdit} setOpen={setOpenEdit} editData={editData} />

      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>FAQ Category</StyledTableCell>
            <StyledTableCell>Question</StyledTableCell>
            <StyledTableCell>Answer</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {faqInfo?.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell>{++counter}</StyledTableCell>
              <StyledTableCell>
                {faqCategoryInfo?.map((data) => {
                  return data._id === row.faqCategoryId ? data.faqCategory : "";
                })}
              </StyledTableCell>
              <StyledTableCell>{row.question}</StyledTableCell>
              <StyledTableCell>{row.answer}</StyledTableCell>

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
