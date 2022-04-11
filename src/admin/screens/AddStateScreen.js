import React from "react";
import Topbar from "../components/topbar";
import OutlinedCard from "../components/controls/OutlinedCard";

const AddStateScreen = () => {
  return (
    <div>
      <Topbar drawerName="Add State" /> 
      {/* <Grid style={{ marginLeft: "240px" }}>
        <OutlinedCard />
      </Grid> */} 
      <OutlinedCard />
      <h1>dashboard</h1>
    </div>
  );
};

export default AddStateScreen;
