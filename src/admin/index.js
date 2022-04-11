import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminDashboardScreen } from "./screens/AdminDashboardScreen";
import LoginScreen from "./screens/LoginScreen";
import AddStateScreen from "./screens/AddStateScreen";
import CityScreen from "./screens/CityScreen";
const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/AdminDashboard" element={<AdminDashboardScreen />} />
        <Route path="/AdminDashboard/State" element={<AddStateScreen />} />
        <Route path="/AdminDashboard/City" element={<CityScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
