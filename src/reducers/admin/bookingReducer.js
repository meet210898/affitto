import {
  BOOKING_LIST_MY_REQUEST,
  BOOKING_LIST_MY_SUCCESS,
  BOOKING_LIST_MY_FAIL,
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
