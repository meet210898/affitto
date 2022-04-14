import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import AddStateScreen from "./screens/AddStateScreen";
import EditStateScreen from "./screens/EditStateScreen";
import CityScreen from "./screens/CityScreen";
import Sidebar from "./components/sidebar";
import ViewStateScreen from "./screens/StateListScreen";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />

        <Route path="/AdminDashboard" element={<Sidebar />}>
          <Route path="State" element={<AddStateScreen />} />
          <Route path="ViewState" element={<ViewStateScreen />}></Route>
          <Route path="EditState/:id" element={<EditStateScreen />} />
          <Route path="City" element={<CityScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default index;
