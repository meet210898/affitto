import {
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_CREATE_RESET,
  USER_LIST_MY_REQUEST,
  USER_LIST_MY_SUCCESS,
  USER_LIST_MY_FAIL,
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