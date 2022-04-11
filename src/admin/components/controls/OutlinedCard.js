import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";



const card = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div">
        State Name:
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ maxWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
