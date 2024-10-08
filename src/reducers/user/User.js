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
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  VEHICLEBYCOMPANY_DETAILS_REQUEST,
  VEHICLEBYCOMPANY_DETAILS_SUCCESS,
  VEHICLEBYCOMPANY_DETAILS_FAIL,
  FAQBYFAQCATEGORY_DETAILS_REQUEST,
  FAQBYFAQCATEGORY_DETAILS_SUCCESS,
  FAQBYFAQCATEGORY_DETAILS_FAIL,
  VEHICLEBYTYPE_DETAILS_REQUEST,
  VEHICLEBYTYPE_DETAILS_SUCCESS,
  VEHICLEBYTYPE_DETAILS_FAIL,
  FORGETPASSWORD_REQUEST,
  FORGETPASSWORD_SUCCESS,
  FORGETPASSWORD_FAIL,
  OTP_REQUEST,
  OTP_SUCCESS,
  OTP_FAIL,
  CHANGEPASSWORD_REQUEST,
  CHANGEPASSWORD_SUCCESS,
  CHANGEPASSWORD_FAIL,
} from "../../constants/user/User";

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

export const forgetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGETPASSWORD_REQUEST:
      return { loading: true };
    case FORGETPASSWORD_SUCCESS:
      return { loading: false, success: true, state: action.payload };
    case FORGETPASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const OTPReducer = (state = {}, action) => {
  switch (action.type) {
    case OTP_REQUEST:
      return { loading: true };
    case OTP_SUCCESS:
      return { loading: false, success: true, state: action.payload };
    case OTP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const changePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGEPASSWORD_REQUEST:
      return { loading: true };
    case CHANGEPASSWORD_SUCCESS:
      return { loading: false, success: true, state: action.payload };
    case CHANGEPASSWORD_FAIL:
      return { loading: false, error: action.payload };
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

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, deleteSuccess: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
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

export const listVehicleByTypeDetails = (
  state = { state: { vehicleByType: [] } },
  action
) => {
  switch (action.type) {
    case VEHICLEBYTYPE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case VEHICLEBYTYPE_DETAILS_SUCCESS:
      return { loading: false, vehicleByType: action.payload };
    case VEHICLEBYTYPE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listFaqByFaqCategoryDetails = (
  state = { state: { FaqByFaqCategory: [] } },
  action
) => {
  switch (action.type) {
    case FAQBYFAQCATEGORY_DETAILS_REQUEST:
      return { loading: true, ...state };
    case FAQBYFAQCATEGORY_DETAILS_SUCCESS:
      return { loading: false, FaqByFaqCategory: action.payload };
    case FAQBYFAQCATEGORY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
