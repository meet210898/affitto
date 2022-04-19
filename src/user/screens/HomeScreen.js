import Topbar from "../components/topbar";
import Carousel from "react-material-ui-carousel";
import img1 from "../public/image/rolls_royce_black_badge_ghost_2022_4k_6-3840x2160.jpg";
import img2 from "../public/image/ford_ranger_raptor_2022_4k_8k-7680x4320.jpg";
import Card from "@mui/material/Card";
import { makeStyles } from "@mui/styles";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  font: {
    position: "absolute",
    bottom: "1%",
    width: "50%",
    textAlign: "left",
    color: "white",
    fontSize: "20px",
    fontFamily: "Comic Sans MS",
  },
}));

const HomeScreen = () => {
  const classes = useStyles();
  return (
    <div>
      <Topbar />
      <br></br>
      <Carousel>
        {
          <img
            src={img1}
            style={{ objectFit: "cover" }}
            height="350px"
            width="100%"
            alt="blank"
          />
        }

        {
          <img
            src={img2}
            style={{ objectFit: "cover" }}
            height="350px"
            width="100%"
            alt="blank"
          />
        }
      </Carousel>
      <br />
      <br />
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid md={3} className={classes.root}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={img1}
              alt="Companies"
            />
            <Typography variant="h5" component="h2" className={classes.font}>
              Companies
            </Typography>
          </Card>
        </Grid>
        <Grid md={3} className={classes.root}>
          <Card>
            <CardMedia component="img" height="140" image={img1} alt="City" />
            <Typography variant="h5" component="h2" className={classes.font}>
              Cities
            </Typography>
          </Card>
        </Grid>
        <Grid md={3} className={classes.root}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={img1}
              alt="Category"
            />
            <Typography variant="h5" component="h2" className={classes.font}>
              Category
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomeScreen;
