import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import {
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { addVehicle } from "../../actions/admin/vehicleActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { viewVehicleType } from "../../actions/admin/vehicleTypeActions";
import { listCompany } from "../../actions/admin/companyActions";

const AddVehicleScreen = () => {
  const [vehicleData, setVehicleData] = React.useState({
    typeId: "",
    companyId: "",
    vehicleName: "",
    vehicleImage: "",
    description: "",
    seats: "",
    door: "",
    ac: "",
    rcImage: "",
    rcNumber: "",
    pucImage: "",
    priceperday: "",
    insuranceImage: "",
  });

  const Input = styled("input")({
    display: "none",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/");
    }
    dispatch(viewVehicleType());
    dispatch(listCompany());
  }, [dispatch, navigate]);

  const vehicleTypeList = useSelector((state) => state.vehicleTypeList);
  const { vehicleTypesInfo } = vehicleTypeList;

  const companyList = useSelector((state) => state.companyList);
  const { companiesInfo } = companyList;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: files[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emptyData = new FormData();

    for (const key in vehicleData) {
      emptyData.append(key, vehicleData[key]);
    }

    dispatch(addVehicle(emptyData));
  };
  return (
    <Grid container display="flex">
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        style={{ width: "100%" }}
        sx={{
          margin: "0px",
          padding: "20px",
          boxShadow: "2px 1px 9px 2px #888888",
        }}
      >
        <Card variant="outlined">
          <Grid xs={12} md={4}>
            <CardContent>
              <Typography variant="h5" component="div">
                Vehicle Type:
              </Typography>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="typeName">Vehicle Type</InputLabel>
                  <Select
                    labelId="typeName"
                    id="typeId"
                    name="typeId"
                    defaultValue=""
                    value={vehicleData?.typeId}
                    label="vehicleType"
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
              <Typography variaetVehicleDatant="h5" component="div">
                Company Name:
              </Typography>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="companyName">Company</InputLabel>

                  <Select
                    labelId="companyName"
                    id="companyId"
                    name="companyId"
                    value={vehicleData?.companyId}
                    label="company"
                    onChange={handleChange}
                  >
                    {companiesInfo
                      ?.filter((item) => vehicleData?.typeId === item.typeId)
                      .map((data) => {
                        return (
                          <MenuItem value={data._id}>
                            {data.companyName}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                Vehicle Name:
              </Typography>
              <TextField
                label="Vehicle Name"
                name="vehicleName"
                type="text"
                variant="standard"
                onChange={handleChange}
              />
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                Vehicle Image:
              </Typography>
              <label htmlFor="vehicleImage">
                <Input
                  accept="image/*"
                  id="vehicleImage"
                  multiple
                  type="file"
                  name="vehicleImage"
                  onChange={handleImageChange}
                />
                <Button variant="contained" component="span">
                  Upload Image
                </Button>
              </label>
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                Description:
              </Typography>
              <TextField
                label="Description"
                name="description"
                type="text"
                variant="standard"
                onChange={handleChange}
              />
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                Seats:
              </Typography>
              <TextField
                label="Seats"
                name="seats"
                type="text"
                variant="standard"
                onChange={handleChange}
              />
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                Door:
              </Typography>
              <TextField
                label="Door"
                name="door"
                type="text"
                variant="standard"
                onChange={handleChange}
              />
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                AC/Non-AC:
              </Typography>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="ac">AC/Non-AC</InputLabel>

                  <Select
                    labelId="ac"
                    id="ac"
                    name="ac"
                    // value={ac}
                    label="ac"
                    onChange={handleChange}
                  >
                    <MenuItem value="true">AC</MenuItem>
                    <MenuItem value="false">Non-AC</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
          </Grid>

          <Grid xs={12} md={4}>
            <CardContent>
              <Typography variant="h5" component="div">
                Transmission:
              </Typography>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="transmission">Transmission</InputLabel>

                  <Select
                    labelId="transmission"
                    id="transmission"
                    name="transmission"
                    // value={ac}
                    label="Transmission"
                    onChange={handleChange}
                  >
                    <MenuItem value="Automatic">AUTO</MenuItem>
                    <MenuItem value="Manual">MANUAL</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                Fuel Type:
              </Typography>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="fuelType">Fuel Type</InputLabel>

                  <Select
                    labelId="fuelType"
                    id="fuelType"
                    name="fuelType"
                    // value={ac}
                    label="fuelType"
                    onChange={handleChange}
                  >
                    <MenuItem value="Petrol">Petrol</MenuItem>
                    <MenuItem value="Diesel">Diesel</MenuItem>
                    <MenuItem value="CNG">CNG</MenuItem>
                    <MenuItem value="LPG">LPG</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                RC Image:
              </Typography>
              <label htmlFor="rcImage">
                <Input
                  accept="image/*"
                  id="rcImage"
                  multiple
                  type="file"
                  name="rcImage"
                  onChange={handleImageChange}
                />
                <Button variant="contained" component="span">
                  Upload Image
                </Button>
              </label>
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                RC Number:
              </Typography>
              <TextField
                label="RC Number"
                name="rcNumber"
                type="text"
                variant="standard"
                onChange={handleChange}
              />
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                PUC Image:
              </Typography>
              <label htmlFor="pucImage">
                <Input
                  accept="image/*"
                  id="pucImage"
                  multiple
                  type="file"
                  name="pucImage"
                  onChange={handleImageChange}
                />
                <Button variant="contained" component="span">
                  Upload Image
                </Button>
              </label>
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                Price Per Day:
              </Typography>
              <TextField
                label="Price Per Day"
                name="priceperday"
                type="text"
                variant="standard"
                onChange={handleChange}
              />
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                Insurance Image:
              </Typography>
              <label htmlFor="insuranceImage">
                <Input
                  accept="image/*"
                  id="insuranceImage"
                  multiple
                  type="file"
                  name="insuranceImage"
                  onChange={handleImageChange}
                />
                <Button variant="contained" component="span">
                  Upload Image
                </Button>
              </label>
            </CardContent>
            <CardActions>
              <Button type="submit" variant="contained" size="medium">
                Add Vehicle
              </Button>
            </CardActions>
          </Grid>
        </Card>
      </Box>
    </Grid>
  );
};

export default AddVehicleScreen;
