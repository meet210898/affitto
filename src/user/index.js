import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import UserLogin from "./screens/UserLogin";
import UserRegister from "./screens/UserRegister";
import UserProfile from "./screens/UserProfile";
import CompanyList from "./screens/Company";
import VehicleList from "./screens/Vehicle";
import VehicleDetails from "./screens/VehicleDetails";
import VehicleByCompany from "./screens/VehicleByCompany";
import Booking from "./screens/Booking";
import Faq from "./screens/Faq";
import ConfirmBooking from "./screens/BookingConfirm";
import AboutUs from "./screens/AboutUs";
import VehicleTypeList from "./screens/VehicleType";
import NotFound from "./screens/404";
import MyBooking from "./screens/MyBooking";
import ModifyBooking from "./screens/ModifyBooking";
import VehicleByType from "./screens/VehicleByType";
import ComingSoon from "./screens/ComingSoon";
import ForgetPassword from "./screens/ForgetPassword";
import OTP from "./screens/OTP";
import ChangePassword from "./screens/ChangePassword";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/company" element={<CompanyList />} />
        <Route path="/user/vehicles" element={<VehicleList />} />
        <Route path="/user/booking/:vehicleId" element={<Booking />} />
        <Route path="/user/confirmBooking" element={<ConfirmBooking />} />
        <Route path="/user/faq" element={<Faq />} />
        <Route path="/user/category" element={<VehicleTypeList />} />
        <Route path="/user/aboutus" element={<AboutUs />} />
        <Route path="/user/mybooking" element={<MyBooking />} />
        <Route path="/user/comingsoon" element={<ComingSoon />} />
        <Route path="/user/forgetpassword" element={<ForgetPassword />} />
        <Route path="/user/otp" element={<OTP />} />
        <Route path="/user/changepassword" element={<ChangePassword />} />
        <Route path="/user/modifyBooking/:id" element={<ModifyBooking />} />
        <Route
          path="/user/vehicledetails/:vehicleId"
          element={<VehicleDetails />}
        />
        <Route
          path="/user/vehicles/:companyId"
          element={<VehicleByCompany />}
        />
        <Route
          path="/user/vehiclesByType/:typeId"
          element={<VehicleByType />}
        />
        <Route path="/user/*" element={<NotFound />} />
        <Route path="/user/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
