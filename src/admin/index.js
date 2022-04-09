import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import {AdminDashboardScreen} from './screens/AdminDashboardScreen';

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<LoginScreen />} />
      <Route path='/screens/AdminDashboardScreen' element={<AdminDashboardScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
