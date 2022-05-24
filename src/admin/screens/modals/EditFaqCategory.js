import * as React from "react";
import { Box, Typography, Modal } from "@mui/material";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateFaqCategory } from "../../../actions/admin/faqCategoryActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "auto",
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalCall = ({ open, setOpen, editData }) => {
  const [faqCategoryData, setFaqCategoryData] = React.useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [dispatch, navigate]);

  React.useEffect(() => {
    if (editData) {
      setFaqCategoryData(editData);
    }
  }, [editData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const faqCategoryId = editData && editData._id;

    dispatch(updateFaqCategory(faqCategoryId, {faqCategory:faqCategoryData}));
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <TextField
            label="FAQ Category"
            name="faqCategory"
            type="text"
            variant="standard"
            defaultValue={editData && editData.faqCategory}
            onChange={(e) => setFaqCategoryData(e.target.value)}
          />
        </Typography>

        <div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" size="medium">
              Update
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              type="submit"
              onClick={handleClose}
              variant="contained"
              size="medium"
            >
              Close
            </Button>
          </Typography>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalCall;
