import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import AddStateScreen from "./screens/AddStateScreen";
import CityScreen from "./screens/CityScreen";
import Sidebar from "./components/sidebar";
const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />

        <Route path="/AdminDashboard" element={<Sidebar />}>
          <Route path="State" element={<AddStateScreen />} />
          <Route path="City" element={<CityScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default index;
