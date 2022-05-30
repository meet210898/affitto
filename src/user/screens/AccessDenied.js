import Topbar from "../components/topbar";
import { Button, Grid } from "@mui/material";
import accessDeniedImg from "../public/image/svgs/accessDenied.png";
import { NavLink } from "react-router-dom";
import Footer from "../components/footer";

const AccessDenied = () => {
  return (
    <>
      <Topbar />
      <Grid container justifyContent="center">
        <Grid xs={12} md={12} display="flex" justifyContent="center">
          <img src={accessDeniedImg} height="100%" width="20%" alt="blank" />
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid xs={1} md={3}></Grid>
        <Grid xs={10} md={6} display="flex" justifyContent="center">
          <h1 style={{ margin: "0px" }}>Error 403</h1>
        </Grid>

        <Grid xs={1} md={3}></Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid xs={1} md={3}></Grid>
        <Grid xs={10} md={6} display="flex" justifyContent="center">
          <h1>Access Denied!</h1>
        </Grid>
        <Grid xs={1} md={3}></Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid xs={1} md={3}></Grid>
        <Grid xs={10} md={6} display="flex" justifyContent="center">
          <NavLink style={{ textDecoration: "none" }} to="/user/Home">
            <Button variant="contained">Go to Home Page</Button>
          </NavLink>
        </Grid>
        <Grid xs={1} md={3}></Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default AccessDenied;
