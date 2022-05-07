import {
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_CREATE_RESET,
  USER_LIST_MY_REQUEST,
  USER_LIST_MY_SUCCESS,
  USER_LIST_MY_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  VEHICLEBYCOMPANY_DETAILS_REQUEST,
  VEHICLEBYCOMPANY_DETAILS_SUCCESS,
  VEHICLEBYCOMPANY_DETAILS_FAIL,
} from "../../constants/user/userConstants";

export const userCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CREATE_REQUEST:
      return { loading: true };
    case USER_CREATE_SUCCESS:
      return { loading: false, success: true, state: action.payload };
    case USER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return { state: {} };
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userReducer = (state = { usersInfo: [] }, action) => {
  switch (action.type) {
    case USER_LIST_MY_REQUEST:
      return { loading: true };
    case USER_LIST_MY_SUCCESS:
      return { loading: false, usersInfo: action.payload };
    case USER_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (
  user = { user: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true, ...user };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return user;
  }
};

export const listVehicleByCompanyDetails = (
  state = { state: { vehicleByCompany: [] } },
  action
) => {
  switch (action.type) {
    case VEHICLEBYCOMPANY_DETAILS_REQUEST:
      return { loading: true, ...state };
    case VEHICLEBYCOMPANY_DETAILS_SUCCESS:
      return { loading: false, vehicleByCompany: action.payload };
    case VEHICLEBYCOMPANY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
