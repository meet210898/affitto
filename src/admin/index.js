import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import AddStateScreen from "./screens/AddStateScreen";
import AddCityScreen from "./screens/AddCityScreen";
import Sidebar from "./components/sidebar";
import ViewStateScreen from "./screens/StateListScreen";
import ViewCityScreen from "./screens/CityListScreen";
import AddVehicleTypeScreen from "./screens/AddVehicleTypeScreen";
import ViewVehicleTypeScreen from "./screens/VehicleTypeListScreen";
import AddCompanyScreen from "./screens/AddCompanyScreen";
import ViewCompanyScreen from "./screens/CompanyListScreen";
import ViewUserScreen from "./screens/UserListScreen";
import AddVehicleScreen from "./screens/AddVehicleScreen";
import ViewVehicleScreen from "./screens/VehicleListScreen";
import AddFaqScreen from "./screens/AddFaqScreen";
import ViewFaqScreen from "./screens/FaqListScreen2";
import AddFaqCategoryScreen from "./screens/AddFaqCategoryScreen";
import ViewFaqCategoryScreen from "./screens/FaqCategoryListScreen";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />

        <Route path="/AdminDashboard" element={<Sidebar />}>
          <Route path="viewUser" element={<ViewUserScreen />} />

          <Route path="AddState" element={<AddStateScreen />} />
          <Route path="ViewState" element={<ViewStateScreen />} />

          <Route path="AddCity" element={<AddCityScreen />} />
          <Route path="ViewCity" element={<ViewCityScreen />} />

          <Route path="AddVehicleType" element={<AddVehicleTypeScreen />} />
          <Route path="ViewVehicleType" element={<ViewVehicleTypeScreen />} />

          <Route path="AddCompany" element={<AddCompanyScreen />} />
          <Route path="ViewCompany" element={<ViewCompanyScreen />} />

          <Route path="AddVehicle" element={<AddVehicleScreen />} />
          <Route path="ViewVehicle" element={<ViewVehicleScreen />} />

          <Route path="AddFaq" element={<AddFaqScreen />} />
          <Route path="ViewFaq" element={<ViewFaqScreen />} />

          <Route path="AddFaqCategory" element={<AddFaqCategoryScreen />} />
          <Route path="ViewFaqCategory" element={<ViewFaqCategoryScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default index;
