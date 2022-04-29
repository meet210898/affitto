import {
  Grid,
  Typography,
  TextField,
  Button,
  Popover,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import { updateProfile } from "../../../actions/user/userActions";
import { useDispatch } from "react-redux";

const EditPopover = ({ open, popObj }) => {
  const {
    anchorEl,
    label,
    name,
    value,
    type,
    info,
    setAnchorEl,
    fullName,
    currentStateId,
  } = popObj;

  const handleClose = () => setAnchorEl(null);
  const { firstName, lastName } = fullName;
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.value, "event");
    const data = new FormData(event.currentTarget);
    console.log(data, "data");
    console.log(name, "name");
    const emptyData = new FormData();
    emptyData.append(name, data.get(name));
    dispatch(updateProfile(emptyData));
  };

  return (
    <>
      <Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        // onSubmit={handleSubmit}
      >
        <Grid container display="block">
          <Grid sx={12} padding="15px">
            {type === "fullname" ? (
              <Typography>
                <TextField
                  label="firstName"
                  name="firstName"
                  type="text"
                  variant="standard"
                  defaultValue={firstName}
                  // onChange={handleChange}
                />
                <Typography marginTop="8px">
                  <TextField
                    label="lastName"
                    name="lastName"
                    type="text"
                    variant="standard"
                    defaultValue={lastName}
                    // onChange={handleChange}
                  />
                </Typography>
              </Typography>
            ) : type === "textField" ? (
              <Typography>
                <TextField
                  label={label}
                  name={name}
                  type="text"
                  variant="standard"
                  defaultValue={value}
                  // onChange={handleChange}
                />
              </Typography>
            ) : type === "citySelect" ? (
              <FormControl fullWidth>
                {" "}
                <InputLabel id={name}>{label}</InputLabel>
                <Select
                  labelId={name}
                  id={name}
                  name={name}
                  label={label}
                  defaultValue={value}
                >
                  {info?.map((data) => {
                    if (currentStateId === data.stateId)
                      return (
                        <MenuItem value={data.dataId}>{data.dataName}</MenuItem>
                      );
                    else return "Please select State first!";
                  })}
                </Select>{" "}
              </FormControl>
            ) : (
              <FormControl fullWidth>
                {" "}
                <InputLabel id={name}>{label}</InputLabel>
                <Select
                  labelId={name}
                  id={name}
                  name={name}
                  label={label}
                  defaultValue={value}
                >
                  {info?.map((data) => (
                    <MenuItem value={data.dataId}>{data.dataName}</MenuItem>
                  ))}
                </Select>{" "}
              </FormControl>
            )}

            <Grid marginTop="10px" display="flex" justifyContent="flex-end">
              <Button
                style={{
                  marginLeft: "10px",
                  height: "22px",
                }}
                type="submit"
                variant="contained"
                size="small"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                style={{
                  marginLeft: "10px",
                  height: "22px",
                  width: "51px",
                }}
                type="submit"
                variant="contained"
                size="small"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Popover>
    </>
  );
};

export default EditPopover;
