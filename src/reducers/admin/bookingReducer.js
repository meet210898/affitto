import {
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_RESET,
  BOOKING_UPDATE_REQUEST,
  BOOKING_UPDATE_SUCCESS,
  BOOKING_UPDATE_FAIL,
  BOOKING_UPDATE_RESET,
  BOOKING_LIST_MY_REQUEST,
  BOOKING_LIST_MY_SUCCESS,
  BOOKING_LIST_MY_FAIL,
  BOOKING_DELETE_REQUEST,
  BOOKING_DELETE_SUCCESS,
  BOOKING_DELETE_FAIL,
  BOOKING_DETAILS_REQUEST,
  BOOKING_DETAILS_SUCCESS,
  BOOKING_DETAILS_FAIL,
} from "../../constants/admin/bookingConstants";

export const bookingCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING_CREATE_REQUEST:
      return { loading: true };
    case BOOKING_CREATE_SUCCESS:
      return { loading: false, success: true, state: action.payload };
    case BOOKING_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BOOKING_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const bookingReducer = (state = { bookingsInfo: [] }, action) => {
  switch (action.type) {
    case BOOKING_LIST_MY_REQUEST:
      return { loading: true };
    case BOOKING_LIST_MY_SUCCESS:
      return { loading: false, bookingsInfo: action.payload };
    case BOOKING_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bookingUpdateReducer = (state = { booking: {} }, action) => {
  switch (action.type) {
    case BOOKING_UPDATE_REQUEST:
      return { loading: true };
    case BOOKING_UPDATE_SUCCESS:
      return { loading: false, success: true, booking: action.payload };
    case BOOKING_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BOOKING_UPDATE_RESET:
      return { state: {} };
    default:
      return state;
  }
};

export const bookingDetailsReducer = (
  state = { state: { booking: [] } },
  action
) => {
  switch (action.type) {
    case BOOKING_DETAILS_REQUEST:
      return { loading: true, ...state };
    case BOOKING_DETAILS_SUCCESS:
      return { loading: false, booking: action.payload };
    case BOOKING_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bookingDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING_DELETE_REQUEST:
      return { loading: true };
    case BOOKING_DELETE_SUCCESS:
      return { loading: false, deleteSuccess: true };
    case BOOKING_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
