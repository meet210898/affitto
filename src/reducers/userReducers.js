import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LIST_MY_REQUEST,
  USER_LIST_MY_SUCCESS,
  USER_LIST_MY_FAIL,
} from "../constants/userConstants";

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
