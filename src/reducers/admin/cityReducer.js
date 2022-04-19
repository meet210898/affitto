import {
  CITY_CREATE_REQUEST,
  CITY_CREATE_SUCCESS,
  CITY_LIST_MY_REQUEST,
  CITY_LIST_MY_SUCCESS,
  CITY_CREATE_FAIL,
  CITY_CREATE_RESET,
  CITY_LIST_MY_FAIL,
  CITY_DELETE_REQUEST,
  CITY_DELETE_SUCCESS,
  CITY_DELETE_FAIL,
  CITY_UPDATE_REQUEST,
  CITY_UPDATE_SUCCESS,
  CITY_UPDATE_FAIL,
  CITY_UPDATE_RESET,
  CITY_DETAILS_REQUEST,
  CITY_DETAILS_SUCCESS,
  CITY_DETAILS_FAIL,
} from "../../constants/admin/cityConstants";

export const cityCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CITY_CREATE_REQUEST:
      return { loading: true };
    case CITY_CREATE_SUCCESS:
      return { loading: false, success: true, state: action.payload };
    case CITY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CITY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const cityReducer = (state = { citiesInfo: []}, action) => {
  switch (action.type) {
    case CITY_LIST_MY_REQUEST:
      return { loading: true };
    case CITY_LIST_MY_SUCCESS:
      return { loading: false, citiesInfo: action.payload };
    case CITY_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const cityUpdateReducer = (state = { state: {} }, action) => {
  switch (action.type) {
    case CITY_UPDATE_REQUEST:
      return { loading: true };
    case CITY_UPDATE_SUCCESS:
      return { loading: false, success: true, city: action.payload };
    case CITY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CITY_UPDATE_RESET:
      return { state: {} };
    default:
      return state;
  }
};

export const cityDetailsReducer = (
  state = { state: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case CITY_DETAILS_REQUEST:
      return { loading: true, ...state };
    case CITY_DETAILS_SUCCESS:
      return { loading: false, city: action.payload };
    case CITY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const cityDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CITY_DELETE_REQUEST:
      return { loading: true };
    case CITY_DELETE_SUCCESS:
      return { loading: false, deleteSuccess: true };
    case CITY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
