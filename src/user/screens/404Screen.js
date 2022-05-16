import Topbar from "../components/topbar";
import { Button, Grid } from "@mui/material";
import errorImg from "../public/image/404/404page.png";
import { NavLink } from "react-router-dom";

const NotFoundScreen = () => {
  return (
    <>
      <Topbar />
      <Grid container justifyContent="center">
        <Grid xs={1} md={3}></Grid>
        <Grid xs={10} md={6} display="flex" justifyContent="center">
          <img
            style={{
              marginTop: "auto",
            }}
            src={errorImg}
            height="70%"
            width="50%"
            alt="blank"
          />
        </Grid>

        <Grid xs={1} md={3}></Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid xs={1} md={3}></Grid>
        <Grid xs={10} md={6} display="flex" justifyContent="center">
          <h1 style={{ margin: "0px" }}>Error 404</h1>
        </Grid>

        <Grid xs={1} md={3}></Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid xs={1} md={3}></Grid>
        <Grid xs={10} md={6} display="flex" justifyContent="center">
          <p>Oops! Seems the page you are looking for does not exist!</p>
        </Grid>

        <Grid xs={1} md={3}></Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid xs={1} md={3}></Grid>
        <Grid xs={10} md={6} display="flex" justifyContent="center">
          <NavLink style={{ textDecoration: "none" }} to="/user">
            <Button variant="contained">Go to Home Page</Button>
          </NavLink>
        </Grid>
        <Grid xs={1} md={3}></Grid>
      </Grid>
    </>
  );
};

export default NotFoundScreen;
