import {
  BOOKING_LIST_MY_REQUEST,
  BOOKING_LIST_MY_SUCCESS,
  BOOKING_LIST_MY_FAIL,
  BOOKING_DELETE_REQUEST,
  BOOKING_DELETE_SUCCESS,
  BOOKING_DELETE_FAIL,
} from "../../constants/admin/bookingConstants";

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
