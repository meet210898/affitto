import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { addType } from "../../actions/admin/vehicleActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const AddStateScreen = () => {
  const [typeImage, setTypeImage] = React.useState("");

  const Input = styled("input")({
    display: "none",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function uploadTypeImage(event) {
    setTypeImage(event.target.files[0]);
  }

  console.log(typeImage, "typeImage");
  // if (statesInfo) {
  //   console.log(statesInfo, "stateDetails");
  // }

  // const { stateInfo } = createState;

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  // console.log(createState);
  // React.useEffect(() => {
  //   if (!userInfo) {
  //     navigate("/");
  //   }
  // }, [navigate, userInfo]);

  React.useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const emptyData = new FormData();
    emptyData.append("typeName",data.get("typeName"));
    emptyData.append("typeImage", typeImage);
    dispatch(addType(emptyData));
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
            Vehicle Type Name:
          </Typography>
          <TextField
            label="Type Name"
            name="typeName"
            type="text"
            variant="standard"
          />
        </CardContent>
        <CardContent>
          <Typography variant="h5" component="div">
            Vehicle Type Image:
          </Typography>
          <label htmlFor="typeImage">
            <Input
              accept="image/*"
              id="typeImage"
              multiple
              type="file"
              name="typeImage"
              onChange={uploadTypeImage}
            />
            <Button variant="contained" component="span">
              Upload Image
            </Button>
            {typeImage.name}
          </label>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" size="medium">
            Add Vehicle Type
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AddStateScreen;
