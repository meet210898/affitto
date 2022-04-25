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
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ maxWidth: 275 }}
    >
      <Card variant="outlined">
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
                value={vehicleData.typeId}
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
                value={vehicleData.companyId}
                label="company"
                onChange={handleChange}
              >
                {companiesInfo?.map((data) => {
                  if (vehicleData.typeId === data.typeId)
                    return (
                      <MenuItem value={data._id}>{data.companyName}</MenuItem>
                    );
                  else return "Please select State first!";
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
        <CardActions>
          <Button type="submit" variant="contained" size="medium">
            Add Vehicle
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AddVehicleScreen;
