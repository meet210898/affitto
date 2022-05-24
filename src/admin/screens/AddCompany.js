import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { addCompany } from "../../actions/admin/Company";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { viewVehicleType } from "../../actions/admin/VehicleType";
import Snackbars from "../components/alert";
import ReactRoundedImage from "react-rounded-image";

const AddStateScreen = () => {
  const [companyData, setCompanyData] = React.useState({
    typeId: "",
    companyName: null,
    companyLogo: "",
  });
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

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
    dispatch(viewVehicleType());
  }, [dispatch, navigate, adminInfo.token]);

  const vehicleTypeList = useSelector((state) => state.vehicleTypeList);
  const { vehicleTypesInfo } = vehicleTypeList;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setCompanyData({
      ...companyData,
      [name]: files[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const emptyData = new FormData();
    for (const key in companyData) {
      emptyData.append(key, companyData[key]);
    }

    dispatch(addCompany(emptyData));
    setOpenSnackbar(true);
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
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        severity="success"
        msg="Company is added!"
      />
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            Vehicle Type:
          </Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="vehicleTypeName">Vehicle Type</InputLabel>

              <Select
                labelId="vehicleTypeName"
                id="typeId"
                name="typeId"
                label="Vehicle Type"
                value={companyData.typeId}
                onChange={handleChange}
              >
                {vehicleTypesInfo?.map((data) => (
                  <MenuItem value={data._id}>{data.typeName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </CardContent>
        <CardContent>
          <Typography variant="h5" component="div">
            Company Name:
          </Typography>
          <TextField
            label="Company Name"
            name="companyName"
            type="text"
            variant="standard"
            value={companyData.cityName}
            onChange={handleChange}
          />
        </CardContent>
        <CardContent>
          <Typography variant="h5" component="div">
            Company Logo:
          </Typography>
          {companyData.companyLogo === "" ? (
            ""
          ) : (
            <ReactRoundedImage
              image={
                companyData.companyLogo !== ""
                  ? URL.createObjectURL(companyData.companyLogo)
                  : ""
              }
              alt="companyLogo"
              imageWidth="100"
              imageHeight="100"
              roundedSize="0"
              borderRadius="30"
            />
          )}
          <label htmlFor="companyLogo">
            <Input
              accept="image/*"
              id="companyLogo"
              multiple
              type="file"
              name="companyLogo"
              onChange={handleImageChange}
            />
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" size="medium">
            Add Company
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AddStateScreen;
