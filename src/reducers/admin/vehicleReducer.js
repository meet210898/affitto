import {
  VEHICLETYPE_CREATE_REQUEST,
  VEHICLETYPE_CREATE_SUCCESS,
  VEHICLETYPE_LIST_MY_REQUEST,
  VEHICLETYPE_LIST_MY_SUCCESS,
  VEHICLETYPE_CREATE_FAIL,
  VEHICLETYPE_CREATE_RESET,
  VEHICLETYPE_LIST_MY_FAIL,
  VEHICLETYPE_DELETE_REQUEST,
  VEHICLETYPE_DELETE_SUCCESS,
  VEHICLETYPE_DELETE_FAIL,
  VEHICLETYPE_UPDATE_REQUEST,
  VEHICLETYPE_UPDATE_SUCCESS,
  VEHICLETYPE_UPDATE_FAIL,
  VEHICLETYPE_UPDATE_RESET,
  VEHICLETYPE_DETAILS_REQUEST,
  VEHICLETYPE_DETAILS_SUCCESS,
  VEHICLETYPE_DETAILS_FAIL,
} from "../../constants/admin/vehicleTypeConstants";

export const vehicleTypeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case VEHICLETYPE_CREATE_REQUEST:
      return { loading: true };
    case VEHICLETYPE_CREATE_SUCCESS:
      return { loading: false, success: true, state: action.payload };
    case VEHICLETYPE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case VEHICLETYPE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const vehicleTypeReducer = (state = { citiesInfo: [] }, action) => {
  switch (action.type) {
    case VEHICLETYPE_LIST_MY_REQUEST:
      return { loading: true };
    case VEHICLETYPE_LIST_MY_SUCCESS:
      return { loading: false, vehicleTypesInfo: action.payload };
    case VEHICLETYPE_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const vehicleTypeUpdateReducer = (state = { state: {} }, action) => {
  switch (action.type) {
    case VEHICLETYPE_UPDATE_REQUEST:
      return { loading: true };
    case VEHICLETYPE_UPDATE_SUCCESS:
      return { loading: false, success: true, vehicleType: action.payload };
    case VEHICLETYPE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case VEHICLETYPE_UPDATE_RESET:
      return { state: {} };
    default:
      return state;
  }
};

export const vehicleTypeDetailsReducer = (
  state = { state: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case VEHICLETYPE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case VEHICLETYPE_DETAILS_SUCCESS:
      return { loading: false, vehicleType: action.payload };
    case VEHICLETYPE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const vehicleTypeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case VEHICLETYPE_DELETE_REQUEST:
      return { loading: true };
    case VEHICLETYPE_DELETE_SUCCESS:
      return { loading: false, deleteSuccess: true };
    case VEHICLETYPE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
