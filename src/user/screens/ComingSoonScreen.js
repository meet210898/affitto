import Topbar from "../components/topbar";
import { Grid } from "@mui/material";
import comingsoonImg from "../public/image/comingsoon/comingsoon.jpg";
import "../components/css/imgSet.css";

const ComingSoonScreen = () => {
  return (
    <>
      <Topbar />
      <Grid style={{}} container justifyContent="center">
        <Grid xs={12} md={12} className="imgSet">
          <img
            id="imgSet"
            src={comingsoonImg}
            height="100%"
            width="100%"
            alt="blank"
          />
          <div className="titleImg">WE'RE COMING SOON!!</div>
        </Grid>
      </Grid>
    </>
  );
};

export default ComingSoonScreen;
