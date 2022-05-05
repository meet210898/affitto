import {
  stateCreateReducer,
  stateReducer,
  stateUpdateReducer,
  stateDetailsReducer,
  stateDeleteReducer,
} from "./reducers/admin/stateReducer";
import {
  cityCreateReducer,
  cityReducer,
  cityUpdateReducer,
  cityDeleteReducer,
  cityDetailsReducer,
} from "./reducers/admin/cityReducer";
import {
  vehicleTypeCreateReducer,
  vehicleTypeReducer,
  vehicleTypeUpdateReducer,
  vehicleTypeDeleteReducer,
  vehicleTypeDetailsReducer,
} from "./reducers/admin/vehicleTypeReducer";
import {
  vehicleCreateReducer,
  vehicleReducer,
  vehicleUpdateReducer,
  vehicleDeleteReducer,
  vehicleDetailsReducer,
} from "./reducers/admin/vehicleReducer";
import {
  companyCreateReducer,
  companyReducer,
  companyUpdateReducer,
  companyDeleteReducer,
  companyDetailsReducer,
} from "./reducers/admin/companyReducer";
import {
  userCreateReducer,
  userReducer,
  userLoginReducer,
  userDetailsReducer,
  userUpdateReducer,
} from "./reducers/user/userReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
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
  //ADMIN:USER
  userList: userReducer,

  //USER
  userCreate: userCreateReducer,
  userUpdate:userUpdateReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
