import React from "react";
import Icon from "@mui/material/Icon";

const FooterIcons = (props) => {
  return (
    <Icon style={{ margin: "8px", transform: "scale(1.5)", color: "#346DC1" }}>
      {props.icon}
    </Icon>
  );
};

export default FooterIcons;
