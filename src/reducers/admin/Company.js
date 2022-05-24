import {
  COMPANY_CREATE_REQUEST,
  COMPANY_CREATE_SUCCESS,
  COMPANY_LIST_MY_REQUEST,
  COMPANY_LIST_MY_SUCCESS,
  COMPANY_CREATE_FAIL,
  COMPANY_CREATE_RESET,
  COMPANY_LIST_MY_FAIL,
  COMPANY_DELETE_REQUEST,
  COMPANY_DELETE_SUCCESS,
  COMPANY_DELETE_FAIL,
  COMPANY_UPDATE_REQUEST,
  COMPANY_UPDATE_SUCCESS,
  COMPANY_UPDATE_FAIL,
  COMPANY_UPDATE_RESET,
  COMPANY_DETAILS_REQUEST,
  COMPANY_DETAILS_SUCCESS,
  COMPANY_DETAILS_FAIL,
} from "../../constants/admin/Company";

export const companyCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPANY_CREATE_REQUEST:
      return { loading: true };
    case COMPANY_CREATE_SUCCESS:
      return { loading: false, success: true, state: action.payload };
    case COMPANY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case COMPANY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const companyReducer = (state = { companiesInfo: [] }, action) => {
  switch (action.type) {
    case COMPANY_LIST_MY_REQUEST:
      return { loading: true };
    case COMPANY_LIST_MY_SUCCESS:
      return { loading: false, companiesInfo: action.payload };
    case COMPANY_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companyUpdateReducer = (state = { company: {} }, action) => {
  switch (action.type) {
    case COMPANY_UPDATE_REQUEST:
      return { loading: true };
    case COMPANY_UPDATE_SUCCESS:
      return { loading: false, success: true, company: action.payload };
    case COMPANY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case COMPANY_UPDATE_RESET:
      return { state: {} };
    default:
      return state;
  }
};

export const companyDetailsReducer = (
  state = { company: { company: [] } },
  action
) => {
  switch (action.type) {
    case COMPANY_DETAILS_REQUEST:
      return { loading: true, ...state };
    case COMPANY_DETAILS_SUCCESS:
      return { loading: false, company: action.payload };
    case COMPANY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companyDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPANY_DELETE_REQUEST:
      return { loading: true };
    case COMPANY_DELETE_SUCCESS:
      return { loading: false, deleteSuccess: true };
    case COMPANY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
