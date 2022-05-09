import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { addFaqCategory } from "../../actions/admin/faqCategoryActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddFaqCategoryScreen = () => {
  const [faqCategoryData, setFaqCategoryData] = React.useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [dispatch, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    dispatch(addFaqCategory({ faqCategory: faqCategoryData }));
  };
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ maxWidth: 275 }}
    >
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
