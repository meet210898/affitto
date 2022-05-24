import * as React from "react";
import { Box, Typography, Modal } from "@mui/material";
import { Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { updateBookingStatus } from "../../../actions/user/Booking";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: "20px",
  width: { xs: "70%", md: "30%" },
  height: "auto",
};

const ModalCall = ({ open, setOpen, editData }) => {
  const [bookingId, setBookingId] = React.useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!localStorage.getItem("user-token")) {
      navigate("/user");
    }
  }, [navigate]);

  React.useEffect(() => {
    if (editData) {
      setBookingId(editData);
    }
  }, [editData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(updateBookingStatus(bookingId, { status: false }));
    handleClose();
  };

  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      component="form"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container display="flex" justifyContent="center">
          <HighlightOffIcon
            style={{ height: "30%", width: "30%", color: "red" }}
          />
        </Grid>
        <Grid container>
          <Grid xs={1} md={1}></Grid>
          <Grid xs={10} md={10}>
            <center>
              <h2>Are you sure?</h2>
              <p>
                Do you really want to cancel booking? This process cannot be
                undone.
              </p>
            </center>
          </Grid>
          <Grid xs={1} md={1}></Grid>
        </Grid>
        <Grid display="flex" justifyContent="center">
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button
              type="submit"
              onClick={handleClose}
              variant="contained"
              size="medium"
              style={{ margin: "5px" }}
            >
              Close
            </Button>
            <Button
              type="submit"
              variant="contained"
              style={{ background: "red", margin: "5px" }}
              size="medium"
            >
              Yes, Cancel Booking
            </Button>
          </Typography>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalCall;
