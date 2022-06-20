import {
  BOOKING_LIST_MY_REQUEST,
  BOOKING_LIST_MY_SUCCESS,
  BOOKING_LIST_MY_FAIL,
  BOOKING_DELETE_REQUEST,
  BOOKING_DELETE_SUCCESS,
  BOOKING_DELETE_FAIL,
} from "../../constants/admin/Booking";

import axios from "axios";

const { REACT_APP_HOST } = process.env;
const userToken = JSON.parse(localStorage.getItem("auth-token"));

export const listBooking = () => async (dispatch) => {
  try {
    dispatch({
      type: BOOKING_LIST_MY_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken?.token}`,
      },
    };
    const { data } = await axios.get(`${REACT_APP_HOST}/getBooking`, config);

    dispatch({
      type: BOOKING_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOKING_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteBooking = (bookingId) => async (dispatch) => {
  try {
    dispatch({
      type: BOOKING_DELETE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken?.token}`,
      },
    };

    await axios.delete(
      `${REACT_APP_HOST}/user/deleteBooking/${bookingId}`,
      config
    );

    dispatch({
      type: BOOKING_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: BOOKING_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
