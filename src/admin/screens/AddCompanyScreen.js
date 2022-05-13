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
import { addCompany } from "../../actions/admin/companyActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { viewVehicleType } from "../../actions/admin/vehicleTypeActions";

const AddStateScreen = () => {
  const [typeId, setTypeId] = React.useState("");

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
  }, [dispatch, navigate]);

  const vehicleTypeList = useSelector((state) => state.vehicleTypeList);
  const { vehicleTypesInfo } = vehicleTypeList;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const emptyData = new FormData();
    emptyData.append("typeId", typeId);
    emptyData.append("companyName", data.get("companyName"));
    emptyData.append("companyLogo", data.get("companyLogo"));

    dispatch(addCompany(emptyData));
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
      }}
    >
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
                value={typeId}
                onChange={(e) => setTypeId(e.target.value)}
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
          />
        </CardContent>
        <CardContent>
          <Typography variant="h5" component="div">
            Company Logo:
          </Typography>
          <label htmlFor="companyLogo">
            <Input
              accept="image/*"
              id="companyLogo"
              multiple
              type="file"
              name="companyLogo"
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
