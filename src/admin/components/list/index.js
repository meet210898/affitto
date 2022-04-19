import React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const listItem = (props) => {
  return (
    <ListItem button key="Inbox">
      <ListItemIcon>
        <i className={props.icon} style={{ color: "white" }} aria-hidden="true"></i>
      </ListItemIcon>
      <ListItemText primary={props.name} />
    </ListItem>
  );
};

export default listItem;
