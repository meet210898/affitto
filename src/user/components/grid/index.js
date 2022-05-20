import { Grid } from "@mui/material";

const GridDesign = ({name}) => {
  return (
    <Grid container md={12} xs={12}>
      <Grid md={1} xs={1}></Grid>
      <Grid md={10} xs={10}>
        <h2>{name}</h2>
      </Grid>
      <Grid md={1} xs={1}></Grid>
    </Grid>
  );
};

export default GridDesign;
