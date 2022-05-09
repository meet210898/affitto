import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { addFaq } from "../../actions/admin/faqActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listFaqCategory } from "../../actions/admin/faqCategoryActions";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

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
    dispatch(listFaqCategory());
  }, [dispatch, navigate]);

  const faqCategoryList = useSelector((state) => state.faqCategoryList);
  const { faqCategoryInfo } = faqCategoryList;

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
            FAQ Category:
          </Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="faqCategoryId">FAQ Category</InputLabel>

              <Select
                labelId="faqCategoryId"
                id="faqCategoryId"
                name="faqCategoryId"
                // value={faqCategoryInfo.typeId}
                label="FAQ Category"
                onChange={handleChange}
              >
                {faqCategoryInfo?.map((data) => (
                  <MenuItem value={data._id}>{data.faqCategory}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </CardContent>

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
