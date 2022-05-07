import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { addFaq } from "../../actions/admin/faqActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddFaqScreen = () => {
  const [faqData, setFaqData] = React.useState({
    question: "",
    answer: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [dispatch, navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFaqData({
      ...faqData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(addFaq(faqData));
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
            Question:
          </Typography>
          <TextField
            label="Question"
            name="question"
            type="text"
            variant="standard"
            onChange={handleChange}
          />
        </CardContent>

        <CardContent>
          <Typography variant="h5" component="div">
            Answer:
          </Typography>
          <TextField
            label="Answer"
            name="answer"
            type="text"
            variant="standard"
            onChange={handleChange}
          />
        </CardContent>

        <CardActions>
          <Button type="submit" variant="contained" size="medium">
            Add FAQ
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AddFaqScreen;
