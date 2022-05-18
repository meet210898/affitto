import { Grid } from "@mui/material";
import Fade from "react-reveal/Fade";
import { makeStyles } from "@mui/styles";
import { NavLink } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

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
    fontFamily: "Sans-serif",
  },
}));

const Cards = ({ img, linkName, name }) => {
  const classes = useStyles();
  return (
    <Grid md={3} className={classes.root}>
      <Fade top>
        <NavLink to={`/user/${linkName}`}>
          <Card>
            <CardMedia component="img" height="140" image={img} alt={name} />
            <Typography variant="h5" component="h2" className={classes.font}>
              {name}
            </Typography>
          </Card>
        </NavLink>
      </Fade>
    </Grid>
  );
};

export default Cards;
