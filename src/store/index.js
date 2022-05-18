import { adminLoginReducer } from "../reducers/admin/adminReducers";

import {
  stateCreateReducer,
  stateReducer,
  stateUpdateReducer,
  stateDetailsReducer,
  stateDeleteReducer,
} from "../reducers/admin/stateReducer";
import {
  cityCreateReducer,
  cityReducer,
  cityUpdateReducer,
  cityDeleteReducer,
  cityDetailsReducer,
} from "../reducers/admin/cityReducer";
import {
  vehicleTypeCreateReducer,
  vehicleTypeReducer,
  vehicleTypeUpdateReducer,
  vehicleTypeDeleteReducer,
  vehicleTypeDetailsReducer,
} from "../reducers/admin/vehicleTypeReducer";
import {
  vehicleCreateReducer,
  vehicleReducer,
  vehicleUpdateReducer,
  vehicleDeleteReducer,
  vehicleDetailsReducer,
} from "../reducers/admin/vehicleReducer";
import {
  faqCreateReducer,
  faqReducer,
  faqUpdateReducer,
  faqDeleteReducer,
  faqDetailsReducer,
} from "../reducers/admin/faqReducer";
import {
  faqCategoryCreateReducer,
  faqCategoryReducer,
  faqCategoryUpdateReducer,
  faqCategoryDeleteReducer,
  faqCategoryDetailsReducer,
} from "../reducers/admin/faqCategoryReducer";
import {
  companyCreateReducer,
  companyReducer,
  companyUpdateReducer,
  companyDeleteReducer,
  companyDetailsReducer,
} from "../reducers/admin/companyReducer";
import {
  bookingReducer,
  bookingDeleteReducer,
} from "../reducers/admin/bookingReducer";
import {
  bookingCreateReducer,
  bookingUpdateReducer,
  bookingByUserReducer,
  bookingByIdReducer,
} from "../reducers/user/bookingReducer";
import {
  userCreateReducer,
  userReducer,
  userLoginReducer,
  userDetailsReducer,
  userUpdateReducer,
  listVehicleByCompanyDetails,
  listVehicleByTypeDetails,
  listFaqByFaqCategoryDetails,
} from "../reducers/user/userReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  //LOGIN
  adminLogin: adminLoginReducer,
  //STATE
  stateCreate: stateCreateReducer,
  statesList: stateReducer,
  stateUpdate: stateUpdateReducer,
  stateDetails: stateDetailsReducer,
  stateDelete: stateDeleteReducer,
  //CITY
  cityCreate: cityCreateReducer,
  cityList: cityReducer,
  cityUpdate: cityUpdateReducer,
  cityDetails: cityDetailsReducer,
  cityDelete: cityDeleteReducer,
  //VEHICLETYPE
  vehicleTypeCreate: vehicleTypeCreateReducer,
  vehicleTypeList: vehicleTypeReducer,
  vehicleTypeUpdate: vehicleTypeUpdateReducer,
  vehicleTypeDetails: vehicleTypeDetailsReducer,
  vehicleTypeDelete: vehicleTypeDeleteReducer,
  //VEHICLE
  vehicleCreate: vehicleCreateReducer,
  vehicleList: vehicleReducer,
  vehicleUpdate: vehicleUpdateReducer,
  vehicleDetails: vehicleDetailsReducer,
  vehicleDelete: vehicleDeleteReducer,
  //COMPANY
  companyCreate: companyCreateReducer,
  companyList: companyReducer,
  companyUpdate: companyUpdateReducer,
  companyDetails: companyDetailsReducer,
  companyDelete: companyDeleteReducer,
  //FAQ
  faqCreate: faqCreateReducer,
  faqList: faqReducer,
  faqUpdate: faqUpdateReducer,
  faqDetails: faqDetailsReducer,
  faqDelete: faqDeleteReducer,
  //FAQCATEGORY
  faqCategoryCreate: faqCategoryCreateReducer,
  faqCategoryList: faqCategoryReducer,
  faqCategoryUpdate: faqCategoryUpdateReducer,
  faqCategoryDetails: faqCategoryDetailsReducer,
  faqCategoryDelete: faqCategoryDeleteReducer,
  //BOOKING
  bookingList: bookingReducer,
  bookingDelete: bookingDeleteReducer,
  //ADMIN:USER
  userList: userReducer,

  //USER LOGIN
  userLogin: userLoginReducer,
  //USER
  userCreate: userCreateReducer,
  userUpdate: userUpdateReducer,
  userDetails: userDetailsReducer,
  vehicleByCompanyDetails: listVehicleByCompanyDetails,
  vehicleByTypeDetails: listVehicleByTypeDetails,
  FaqByFaqCategoryDetails: listFaqByFaqCategoryDetails,
  //BOOKING
  bookingCreate: bookingCreateReducer,
  bookingByUser: bookingByUserReducer,
  bookingUpdate: bookingUpdateReducer,
  bookingById: bookingByIdReducer,
});

const userInfoFromStorage = localStorage.getItem("user-token")
  ? JSON.parse(localStorage.getItem("user-token"))
  : null;

const adminInfoFromStorage = localStorage.getItem("auth-token")
  ? JSON.parse(localStorage.getItem("auth-token"))
  : null;

const initialState = {
  adminLogin: { adminInfo: adminInfoFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    return reducer(undefined, action);
  }

  return reducer(state, action);
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
