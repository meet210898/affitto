import React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const listItem = (props) => {
  return (
    <ListItem button key="Inbox">
      <ListItemIcon>
        <ArrowForwardIcon style={{ color: "white" }} />
      </ListItemIcon>
      <ListItemText primary={props.name} />
    </ListItem>
  );
};

export default listItem;
