import {
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,
  BOOKING_UPDATE_REQUEST,
  BOOKING_UPDATE_SUCCESS,
  BOOKING_UPDATE_FAIL,
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
import axios from "axios";
const userToken = JSON.parse(localStorage.getItem("auth-token"));

export const addBooking = (bookingData) => async (dispatch) => {
  try {
    dispatch({
      type: BOOKING_CREATE_REQUEST,
    });

    const { data } = await axios.post(
      "http://localhost:4000/addBooking",
      bookingData
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

// export const updateVehicle = (vehicleId, vehicleData) => async (dispatch) => {
//   try {
//     dispatch({
//       type: VEHICLE_UPDATE_REQUEST,
//     });

//     const config = {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${userToken.token}`,
//       },
//     };

//     const { data } = await axios.patch(
//       `http://localhost:4000/editVehicle/${vehicleId}`,
//       vehicleData,
//       config
//     );

//     dispatch({
//       type: VEHICLE_UPDATE_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: VEHICLE_UPDATE_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

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

// export const deleteVehicle = (vehicleId) => async (dispatch) => {
//   try {
//     dispatch({
//       type: VEHICLE_DELETE_REQUEST,
//     });

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userToken.token}`,
//       },
//     };

//     await axios.delete(
//       `http://localhost:4000/deleteVehicle/${vehicleId}`,
//       config
//     );

//     dispatch({
//       type: VEHICLE_DELETE_SUCCESS,
//     });
//   } catch (error) {
//     dispatch({
//       type: VEHICLE_DELETE_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const listBooking = () => async (dispatch) => {
  try {
    dispatch({
      type: BOOKING_LIST_MY_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:4000/getBooking`,
      config
    );

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
