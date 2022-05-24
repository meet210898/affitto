import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import AddState from "./screens/AddState";
import AddCity from "./screens/AddCity";
import Sidebar from "./components/sidebar";
import ViewState from "./screens/StateList";
import ViewCity from "./screens/CityList";
import AddVehicleType from "./screens/AddVehicleType";
import ViewVehicleType from "./screens/VehicleTypeList";
import AddCompany from "./screens/AddCompany";
import ViewCompany from "./screens/CompanyList";
import ViewUser from "./screens/UserList";
import AddVehicle from "./screens/AddVehicle";
import ViewVehicle from "./screens/VehicleList";
import AddFaq from "./screens/AddFaq";
import ViewFaq from "./screens/FaqList2";
import AddFaqCategory from "./screens/AddFaqCategory";
import ViewFaqCategory from "./screens/FaqCategoryList";
import ViewBooking from "./screens/BookingList";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/Admin" element={<Sidebar />}>
          <Route path="viewUser" element={<ViewUser />} />
          <Route path="viewBooking" element={<ViewBooking />} />

          <Route path="AddState" element={<AddState />} />
          <Route path="ViewState" element={<ViewState />} />

          <Route path="AddCity" element={<AddCity />} />
          <Route path="ViewCity" element={<ViewCity />} />

          <Route path="AddVehicleType" element={<AddVehicleType />} />
          <Route path="ViewVehicleType" element={<ViewVehicleType />} />

          <Route path="AddCompany" element={<AddCompany />} />
          <Route path="ViewCompany" element={<ViewCompany />} />

          <Route path="AddVehicle" element={<AddVehicle />} />
          <Route path="ViewVehicle" element={<ViewVehicle />} />

          <Route path="AddFaq" element={<AddFaq />} />
          <Route path="ViewFaq" element={<ViewFaq />} />

          <Route path="AddFaqCategory" element={<AddFaqCategory />} />
          <Route path="ViewFaqCategory" element={<ViewFaqCategory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default index;
