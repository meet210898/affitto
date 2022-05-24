import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { addType } from "../../actions/admin/vehicleTypeActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Snackbars from "../components/alert";
import ReactRoundedImage from "react-rounded-image";

const AddVehicleType = () => {
  const [vehicleTypeData, setVehicleTypeData] = React.useState({
    typeName: null,
    typeImage: "",
  });

  const [openEdit, setOpenEdit] = React.useState(false);
  const Input = styled("input")({
    display: "none",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  React.useEffect(() => {
    if (!adminInfo.token) {
      navigate("/");
    }
  }, [navigate, adminInfo.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleTypeData({
      ...vehicleTypeData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setVehicleTypeData({
      ...vehicleTypeData,
      [name]: files[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emptyData = new FormData();
    for (const key in vehicleTypeData) {
      emptyData.append(key, vehicleTypeData[key]);
    }
    dispatch(addType(emptyData));
  };
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 300,
        margin: "0px",
        padding: "20px",
        boxShadow: "2px 1px 9px 2px #888888",
        background: "white",
      }}
    >
      <Snackbars
        open={openEdit}
        setOpen={setOpenEdit}
        severity="success"
        msg="Vehicle type is added!"
      />
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
            value={vehicleTypeData.typeName}
            onChange={handleChange}
          />
        </CardContent>
        <CardContent>
          <Typography variant="h5" component="div">
            Vehicle Type Image:
          </Typography>
          {vehicleTypeData.typeImage === "" ? (
            ""
          ) : (
            <ReactRoundedImage
              image={
                vehicleTypeData.typeImage !== ""
                  ? URL.createObjectURL(vehicleTypeData.typeImage)
                  : ""
              }
              alt="typeImage"
              imageWidth="100"
              imageHeight="100"
              roundedSize="0"
              borderRadius="30"
            />
          )}
          <label htmlFor="typeImage">
            <Input
              accept="image/*"
              id="typeImage"
              multiple
              type="file"
              name="typeImage"
              onChange={handleImageChange}
            />
            <Button variant="contained" component="span">
              Upload Image
            </Button>
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

export default AddVehicleType;
