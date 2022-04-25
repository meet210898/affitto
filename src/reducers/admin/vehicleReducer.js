import {
  VEHICLE_CREATE_REQUEST,
  VEHICLE_CREATE_SUCCESS,
  VEHICLE_LIST_MY_REQUEST,
  VEHICLE_LIST_MY_SUCCESS,
  VEHICLE_CREATE_FAIL,
  VEHICLE_CREATE_RESET,
  VEHICLE_LIST_MY_FAIL,
  VEHICLE_DELETE_REQUEST,
  VEHICLE_DELETE_SUCCESS,
  VEHICLE_DELETE_FAIL,
  VEHICLE_UPDATE_REQUEST,
  VEHICLE_UPDATE_SUCCESS,
  VEHICLE_UPDATE_FAIL,
  VEHICLE_UPDATE_RESET,
  VEHICLE_DETAILS_REQUEST,
  VEHICLE_DETAILS_SUCCESS,
  VEHICLE_DETAILS_FAIL,
} from "../../constants/admin/vehicleConstants";

export const vehicleCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case VEHICLE_CREATE_REQUEST:
      return { loading: true };
    case VEHICLE_CREATE_SUCCESS:
      return { loading: false, success: true, state: action.payload };
    case VEHICLE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case VEHICLE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const vehicleReducer = (state = { vehiclesInfo: [] }, action) => {
  switch (action.type) {
    case VEHICLE_LIST_MY_REQUEST:
      return { loading: true };
    case VEHICLE_LIST_MY_SUCCESS:
      return { loading: false, vehiclesInfo: action.payload };
    case VEHICLE_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const vehicleUpdateReducer = (state = { vehicle: {} }, action) => {
  switch (action.type) {
    case VEHICLE_UPDATE_REQUEST:
      return { loading: true };
    case VEHICLE_UPDATE_SUCCESS:
      return { loading: false, success: true, vehicle: action.payload };
    case VEHICLE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case VEHICLE_UPDATE_RESET:
      return { state: {} };
    default:
      return state;
  }
};

export const vehicleDetailsReducer = (
  state = { state: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case VEHICLE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case VEHICLE_DETAILS_SUCCESS:
      return { loading: false, vehicle: action.payload };
    case VEHICLE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const vehicleDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case VEHICLE_DELETE_REQUEST:
      return { loading: true };
    case VEHICLE_DELETE_SUCCESS:
      return { loading: false, deleteSuccess: true };
    case VEHICLE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
