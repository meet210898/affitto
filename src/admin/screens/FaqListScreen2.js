import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Paper, IconButton } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import ModalCall from "./modals/EditFaqModal";
import { listFaq, deleteFaq } from "../../actions/admin/faqActions";
import { listFaqCategory } from "../../actions/admin/faqCategoryActions";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  ".MuiButtonBase-root:hover": {
    color: theme.palette.common.white,
  },
  ".MuiButtonBase-root:focus": {
    color: "red",
  },
  ".MuiTableSortLabel-icon": {
    fill: "red",
  },
  ".MuiTableSortLabel-root.Mui-active": {
    color: "red",
  },
}));

let counter = 0;

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "faqCategory",
    label: "FAQ Category",
  },
  {
    id: "question",
    label: "Question",
  },
  {
    id: "answer",
    label: "Answer",
  },

  {
    id: "action",
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells?.map((headCell) =>
          headCells.id === "Action" ? (
            ""
          ) : (
            <StyledTableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </StyledTableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editData, setEditData] = React.useState(null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
    dispatch(listFaqCategory());
    dispatch(listFaq());
  }, [dispatch, navigate]);

  const faqCategoryList = useSelector((state) => state.faqCategoryList);
  const { faqCategoryInfo } = faqCategoryList;

  const faqList = useSelector((state) => state.faqList);
  const { faqInfo } = faqList;

  const deleteHandler = (faqId) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteFaq(faqId));
      navigate("/Admin/ViewFaq");
    }
  };

  const editHandler = (row) => {
    setEditData(row);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <ModalCall open={openEdit} setOpen={setOpenEdit} editData={editData} />
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer adjustForCheckbox={false} displaySelectAll={false}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="customized table">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={faqInfo?.length}
            />
            <TableBody adjustForCheckbox={false} displaySelectAll={false}>
              {faqInfo &&
                stableSort(faqInfo, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        key={counter}
                        adjustForCheckbox={false}
                        displaySelectAll={false}
                        displayRowCheckbox={false}
                      >
                        {/* <StyledTableCell>{row.question}</StyledTableCell> */}

                        <StyledTableCell>
                          {faqCategoryInfo?.map((data) => {
                            return data._id === row.faqCategoryId ? (
                              <p> {data.faqCategory}</p>
                            ) : (
                              ""
                            );
                          })}
                          {/* {row.faqCategoryId + 1} */}
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
                            onClick={() => deleteHandler(row._id)}
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </StyledTableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={faqInfo?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* ))} */}
    </Box>
  );
}
