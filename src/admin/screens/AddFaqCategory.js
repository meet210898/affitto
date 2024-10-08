import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { addFaqCategory } from "../../actions/admin/FaqCategory";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Snackbars from "../components/alert";

const AddFaqCategoryScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [faqCategoryData, setFaqCategoryData] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  React.useEffect(() => {
    if (!adminInfo.token) {
      navigate("/");
    }
  }, [dispatch, navigate, adminInfo.token]);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(addFaqCategory({ faqCategory: faqCategoryData }));
    setOpenSnackbar(true);
  };
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 275,
        margin: "0px",
        padding: "20px",
        boxShadow: "2px 1px 9px 2px #888888",
        background: "white",
      }}
    >
      <Snackbars
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        severity="success"
        msg="Faq category is added!"
      />
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            FAQ Category:
          </Typography>
          <TextField
            label="FAQ Category"
            name="faqCategory"
            type="text"
            variant="standard"
            onChange={(e) => setFaqCategoryData(e.target.value)}
          />
        </CardContent>

        <CardActions>
          <Button type="submit" variant="contained" size="medium">
            Add FAQ Category
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AddFaqCategoryScreen;
