import { Card, Grid } from "@mui/material";
import Fade from "react-reveal/Fade";

const WhyCard = (props) => {
  return (
    <Grid xs={12} md={5}>
      <Fade bottom>
        <Card
          style={{
            padding: "15px",
            margin: "10px",
            borderRadius: "12px",
            height: "80px",
          }}
          variant="outlined"
        >
          <Grid container>
            <Grid
              xs={2}
              md={2}
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "auto",
                marginBottom: "auto",
              }}
            >
              <img src={props.imgName} height="70%" width="70%" alt="car svg" />
            </Grid>
            <Grid xs={10} md={10}>
              <h4 style={{ margin: "0px" }}>{props.title}</h4>
              <p>{props.description}</p>
            </Grid>
          </Grid>
        </Card>
      </Fade>
    </Grid>
  );
};
export default WhyCard;
