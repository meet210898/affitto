import { userLoginReducer } from "./reducers/userReducers";
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
} from "./reducers/admin/vehicleReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  userLogin: userLoginReducer,
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
  //VEHICLE
  vehicleTypeCreate: vehicleTypeCreateReducer,
  vehicleTypeList: vehicleTypeReducer,
  vehicleTypeUpdate: vehicleTypeUpdateReducer,
  vehicleTypeDetails: vehicleTypeDetailsReducer,
  vehicleTypeDelete: vehicleTypeDeleteReducer,
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
