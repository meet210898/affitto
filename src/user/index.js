import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen"
import UserLoginScreen from "../user/screens/UserLoginScreen";
import UserRegisterScreen from "./screens/UserRegisterScreen";
import AgencyRegisterScreen from "./screens/AgencyRegisterScreen";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<HomeScreen />} />
        <Route path="/user/login" element={<UserLoginScreen />} />
        <Route path="/user/register" element={<UserRegisterScreen />} />
        <Route path="/user/registerAgency" element={<AgencyRegisterScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
