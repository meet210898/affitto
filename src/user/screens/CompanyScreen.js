import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import Topbar from "../components/topbar";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { getCompany } from "../../actions/user/userActions";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

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
              <ListSubheader component="div">Company</ListSubheader>
            </ImageListItem>
          </ImageList>
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
      <Grid container>
        <Grid xs={1}></Grid>
        <Grid xs={10} display="flex">
          <Grid container display="flex">
            {companiesInfo?.map((data) => (
              <Grid md={4}>
                <Link to={`/user/vehicles/${data._id}`}>
                  <Card sx={{ maxWidth: 300, height: "auto", margin: "20px" }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`http://localhost:4000/${data.companyLogo}`}
                      alt="company"
                    />
                    <CardContent>
                      <center>
                        <b>{data.companyName}</b>
                      </center>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
    </>
  );
}
