import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import UserLoginScreen from "../user/screens/UserLoginScreen";
import UserRegisterScreen from "./screens/UserRegisterScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import CompanyList from "./screens/CompanyScreen";
import VehicleList from "./screens/VehicleScreen";
import VehicleDetails from "./screens/VehicleDetails";
import VehicleByCompanyScreen from "./screens/VehicleByCompanyScreen";
import BookingScreen from "./screens/BookingScreen";
import BookingList from "./screens/BookingListScreen";
import FaqScreen from "./screens/FaqScreen";
import ConfirmBookingScreen from "./screens/BookingConfirmScreen";
import AboutUsScreen from "./screens/AboutUsScreen";
import VehicleTypeList from "./screens/VehicleTypeScreen";
import NotFoundScreen from "./screens/404Screen";
import MyBookingScreen from "./screens/MyBookingScreen";
import ModifyBookingScreen from "./screens/ModifyBookingScreen";
import VehicleByTypeScreen from "./screens/VehicleByTypeScreen";
import ComingSoonScreen from "./screens/ComingSoonScreen";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/*" element={<NotFoundScreen />} />
        <Route path="/user" element={<HomeScreen />} />
        <Route path="/user/login" element={<UserLoginScreen />} />
        <Route path="/user/register" element={<UserRegisterScreen />} />
        <Route path="/user/profile" element={<UserProfileScreen />} />
        <Route path="/user/company" element={<CompanyList />} />
        <Route path="/user/vehicles" element={<VehicleList />} />
        <Route path="/user/booking/:vehicleId" element={<BookingScreen />} />
        <Route path="/user/booking" element={<BookingList />} />
        <Route path="/user/confirmBooking" element={<ConfirmBookingScreen />} />
        <Route path="/user/faq" element={<FaqScreen />} />
        <Route path="/user/category" element={<VehicleTypeList />} />
        <Route path="/user/aboutus" element={<AboutUsScreen />} />
        <Route path="/user/mybooking" element={<MyBookingScreen />} />
        <Route path="/user/comingsoon" element={<ComingSoonScreen />} />
        <Route
          path="/user/modifyBooking/:id"
          element={<ModifyBookingScreen />}
        />
        <Route
          path="/user/vehicledetails/:vehicleId"
          element={<VehicleDetails />}
        />
        <Route
          path="/user/vehicles/:companyId"
          element={<VehicleByCompanyScreen />}
        />
        <Route
          path="/user/vehiclesByType/:typeId"
          element={<VehicleByTypeScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
