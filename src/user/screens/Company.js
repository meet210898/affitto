import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import Topbar from "../components/topbar";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { getCompany } from "../../actions/user/userActions";
import { NavLink } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Fade from "react-reveal/Fade";
import Footer from "../components/footer";

const { REACT_APP_HOST } = process.env;
export default function CompanyList() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  const companyList = useSelector((state) => state.companyList);
  const { companiesInfo } = companyList;

  return (
    <>
      <Topbar />
      <Grid container>
        <Grid xs={1}></Grid>
        <Grid xs={10}>
          <ImageList>
            <ImageListItem key="Subheader">
              <ListSubheader component="div" style={{ background: "none" }}>
                Company
              </ListSubheader>
            </ImageListItem>
          </ImageList>
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
      <Grid container>
        <Grid xs={1}></Grid>
        <Grid xs={10} display="flex">
          <Fade top>
            <Grid container display="flex">
              {companiesInfo?.map((data) => (
                <Grid md={4}>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to={`/user/vehicles/${data._id}`}
                  >
                    <Card
                      sx={{ maxWidth: 300, height: "auto", margin: "20px" }}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={`${REACT_APP_HOST}/${data.companyLogo}`}
                        alt="company"
                      />
                      <CardContent>
                        <center>
                          <b>{data.companyName}</b>
                        </center>
                      </CardContent>
                    </Card>
                  </NavLink>
                </Grid>
              ))}
            </Grid>
          </Fade>
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
      <Footer />
    </>
  );
}
