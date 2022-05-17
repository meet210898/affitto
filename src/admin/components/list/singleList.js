import React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import { NavLink } from "react-router-dom";

const singleListItem = (props) => {
  return (
    <NavLink
      style={{ color: "white", textDecoration: "none" }}
      to={`/AdminDashboard/${props.site}`}
    >
      <ListItem button key="Inbox">
        <ListItemIcon>
          <Icon>{props.headerIcon}</Icon>
        </ListItemIcon>
        <ListItemText primary={props.name} />
      </ListItem>
    </NavLink>
  );
};

export default singleListItem;