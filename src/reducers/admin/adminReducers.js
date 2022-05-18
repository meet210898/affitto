import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
  ADMIN_LIST_MY_REQUEST,
  ADMIN_LIST_MY_SUCCESS,
  ADMIN_LIST_MY_FAIL,
} from "../../constants/admin/adminConstants";

export const adminLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return { loading: true };
    case ADMIN_LOGIN_SUCCESS:
      return { loading: false, adminInfo: action.payload };
    case ADMIN_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const adminReducer = (state = { adminInfo: [] }, action) => {
  switch (action.type) {
    case ADMIN_LIST_MY_REQUEST:
      return { loading: true };
    case ADMIN_LIST_MY_SUCCESS:
      return { loading: false, adminInfo: action.payload };
    case ADMIN_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
