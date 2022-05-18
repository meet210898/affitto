import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Grid } from "@mui/material";

const Investor = ({ img, investorName }) => {
  return (
    <Grid xs={6} md={3}>
      <div style={{ margin: "10px" }}>
        <CardMedia component="img" alt="hyundai" height="auto" image={img} />
        <CardContent style={{ padding: "0px" }}>
          <Typography
            gutterBottom
            style={{ textAlign: "center", fontWeight: "bold" }}
            component="div"
            variant="h6"
          >
            {investorName}
          </Typography>
        </CardContent>
      </div>
    </Grid>
  );
};

export default Investor;
