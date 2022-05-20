import Typography from "@mui/material/Typography";

const Copyright = (props) => {
  return (
    <Typography
      style={{ marginBottom: "16px" }}
      variant="body2"
      color="white"
      {...props}
    >
      {"© "}
      {new Date().getFullYear()}{" "}
      <span style={{ color: "white" }}>
        {" "}
        AFFITTO Pvt Ltd. All rights reserved
      </span>
    </Typography>
  );
};

export default Copyright;
