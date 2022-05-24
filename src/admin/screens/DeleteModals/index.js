import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { Button } from "@mui/material";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogAction: {
    justifyContent: "center",
  },
  titleIcon: {
    backgroundColor: "#FCE3E7",
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: "#FCE3E7",
      cursor: "default",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "8rem",
    },
  },
}));

const DeleteModal = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { confirmDialog, setConfirmDialog } = props;

  const handleClose = () => setConfirmDialog(false);

  const deleteHandler = () => {
    dispatch(props.dispatchItem(props.id));
    handleClose();
  };

  return (
    <Dialog
      open={confirmDialog.isOpen}
      onClose={handleClose}
      classes={{ paper: classes.dialog }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon}>
          <NotListedLocationIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Button
          style={{ background: "#FCE3E7" }}
          variant="contained"
          onClick={handleClose}
        >
          <b style={{ margin: "0px", color: "black" }}>No</b>
        </Button>
        <Button
          variant="contained"
          style={{ background: "red" }}
          onClick={deleteHandler}
        >
          <b style={{ margin: "0px" }}>Yes</b>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
