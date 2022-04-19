import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import AddStateScreen from "./screens/AddStateScreen";
import AddCityScreen from "./screens/AddCityScreen";
import Sidebar from "./components/sidebar";
import ViewStateScreen from "./screens/StateListScreen";
import ViewCityScreen from "./screens/CityListScreen";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />

        <Route path="/AdminDashboard" element={<Sidebar />}>
          <Route path="State" element={<AddStateScreen />} />
          <Route path="ViewState" element={<ViewStateScreen />} />

          <Route path="AddCity" element={<AddCityScreen />} />
          <Route path="ViewCity" element={<ViewCityScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default index;
