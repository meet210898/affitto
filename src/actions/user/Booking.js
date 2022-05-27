import {
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,
  BOOKING_UPDATE_REQUEST,
  BOOKING_UPDATE_SUCCESS,
  BOOKING_UPDATE_FAIL,
  BOOKINGBYUSER_DETAILS_REQUEST,
  BOOKINGBYUSER_DETAILS_SUCCESS,
  BOOKINGBYUSER_DETAILS_FAIL,
  BOOKINGBYID_DETAILS_REQUEST,
  BOOKINGBYID_DETAILS_SUCCESS,
  BOOKINGBYID_DETAILS_FAIL,
} from "../../constants/user/Booking";
import axios from "axios";
const { REACT_APP_HOST } = process.env;
const userToken = JSON.parse(localStorage.getItem("user-token"));

export const addBooking = (bookingData) => async (dispatch) => {
  try {
    dispatch({
      type: BOOKING_CREATE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    const { data } = await axios.post(
      `${REACT_APP_HOST}/user/addBooking`,
      bookingData,
      config
    );

    dispatch({
      type: BOOKING_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOKING_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateBooking = (bookingId, bookingData) => async (dispatch) => {
  try {
    dispatch({
      type: BOOKING_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    const { data } = await axios.patch(
      `${REACT_APP_HOST}/user/editBookingIsCancel/${bookingId}`,
      bookingData,
      config
    );

    dispatch({
      type: BOOKING_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOKING_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateBookingStatus = (bookingId, status) => async (dispatch) => {
  try {
    dispatch({
      type: BOOKING_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    const { data } = await axios.patch(
      `${REACT_APP_HOST}/editBookingStatus/${bookingId}`,
      status,
      config
    );

    dispatch({
      type: BOOKING_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOKING_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listBookingById = (bookingId) => async (dispatch) => {
  try {
    dispatch({
      type: BOOKINGBYID_DETAILS_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    const { data } = await axios.get(
      `${REACT_APP_HOST}/user/getBookingById/${bookingId}`,
      config
    );

    dispatch({
      type: BOOKINGBYID_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOKINGBYID_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listBookingByUserId = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: BOOKINGBYUSER_DETAILS_REQUEST,
    });

    const { data } = await axios.get(
      `${REACT_APP_HOST}/user/getBookingByUserId/${userId}`
    );

    dispatch({
      type: BOOKINGBYUSER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOKINGBYUSER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
