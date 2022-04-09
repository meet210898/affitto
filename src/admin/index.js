import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import {AdminDashboardScreen} from './screens/AdminDashboardScreen';
import {CityScreen} from './screens/CityScreen';
const index = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<LoginScreen />} />
      <Route path='/AdminDashboard' element={<AdminDashboardScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
