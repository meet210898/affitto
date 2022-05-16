import {
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,
  BOOKING_UPDATE_REQUEST,
  BOOKING_UPDATE_SUCCESS,
  BOOKING_UPDATE_FAIL,
  BOOKING_DELETE_REQUEST,
  BOOKING_DELETE_SUCCESS,
  BOOKING_DELETE_FAIL,
  BOOKING_DETAILS_REQUEST,
  BOOKING_DETAILS_SUCCESS,
  BOOKING_DETAILS_FAIL,
  BOOKINGBYUSER_DETAILS_REQUEST,
  BOOKINGBYUSER_DETAILS_SUCCESS,
  BOOKINGBYUSER_DETAILS_FAIL,
} from "../../constants/user/bookingConstants";
import axios from "axios";
const userToken = JSON.parse(localStorage.getItem("user-token"));
console.log(userToken, "userToken");

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

// export const getVehicleTypeDetails = (typeId) => async (dispatch) => {
//   dispatch({ type: VEHICLE_DETAILS_REQUEST });
//   try {
//     const { data } = await axios.get(
//       `http://localhost:4000/getVehicleTypeById/${typeId}`
//     );
//     dispatch({
//       type: VEHICLE_DETAILS_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: VEHICLE_DETAILS_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const deleteBooking = (bookingId) => async (dispatch) => {
  try {
    dispatch({
      type: BOOKING_DELETE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    await axios.delete(
      `http://localhost:4000/user/deleteBooking/${bookingId}`,
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
