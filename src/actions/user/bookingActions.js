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
} from "../../constants/user/bookingConstants";
import axios from "axios";
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
      "http://localhost:4000/user/addBooking",
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
      `http://localhost:4000/user/editBookingIsCancel/${bookingId}`,
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
      `http://localhost:4000/editBookingStatus/${bookingId}`,
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
      `http://localhost:4000/user/getBookingById/${bookingId}`,
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

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:4000/user/getBookingByUserId/${userId}`,
      config
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
