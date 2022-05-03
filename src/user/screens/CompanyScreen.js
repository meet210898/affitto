import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import Topbar from "../components/topbar";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { getCompany } from "../../actions/user/userActions";

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
      <Grid container justifyContent="center">
        <ImageList sx={{ width: 920, height: 450 }}>
          <ImageListItem key="Subheader" cols={3}>
            <ListSubheader component="div">Company</ListSubheader>
          </ImageListItem>
          {companiesInfo?.map((item) => (
            <ImageListItem key={item._id}>
              <img
                src={`http://localhost:4000/${item.companyLogo}`}
                style={{height:"200px",width:"299px"}}
                alt="logo"
              />
              <ImageListItemBar
                title={item.companyName}
              />
            </ImageListItem>
          ))}
          
        </ImageList>
      </Grid>
    </>
  );
}
