import {
  VEHICLE_CREATE_REQUEST,
  VEHICLE_CREATE_SUCCESS,
  VEHICLE_CREATE_FAIL,
  VEHICLE_UPDATE_REQUEST,
  VEHICLE_UPDATE_SUCCESS,
  VEHICLE_UPDATE_FAIL,
  VEHICLE_LIST_MY_REQUEST,
  VEHICLE_LIST_MY_SUCCESS,
  VEHICLE_LIST_MY_FAIL,
  VEHICLE_DELETE_REQUEST,
  VEHICLE_DELETE_SUCCESS,
  VEHICLE_DELETE_FAIL,
  VEHICLE_DETAILS_REQUEST,
  VEHICLE_DETAILS_SUCCESS,
  VEHICLE_DETAILS_FAIL,
} from "../../constants/admin/Vehicle";
import axios from "axios";
const { REACT_APP_HOST } = process.env;
const userToken = JSON.parse(localStorage.getItem("auth-token"));

export const addVehicle = (vehicleData) => async (dispatch) => {
  try {
    dispatch({
      type: VEHICLE_CREATE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      `${REACT_APP_HOST}/addVehicle`,
      vehicleData,
      config
    );

    dispatch({
      type: VEHICLE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VEHICLE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateVehicle = (vehicleId, vehicleData) => async (dispatch) => {
  try {
    dispatch({
      type: VEHICLE_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    const { data } = await axios.patch(
      `${REACT_APP_HOST}/editVehicle/${vehicleId}`,
      vehicleData,
      config
    );

    dispatch({
      type: VEHICLE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VEHICLE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getVehicleTypeDetails = (typeId) => async (dispatch) => {
  dispatch({ type: VEHICLE_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(
      `${REACT_APP_HOST}/getVehicleTypeById/${typeId}`
    );
    dispatch({
      type: VEHICLE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VEHICLE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteVehicle = (vehicleId) => async (dispatch) => {
  try {
    dispatch({
      type: VEHICLE_DELETE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    await axios.delete(`${REACT_APP_HOST}/deleteVehicle/${vehicleId}`, config);

    dispatch({
      type: VEHICLE_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: VEHICLE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listVehicle = () => async (dispatch) => {
  try {
    dispatch({
      type: VEHICLE_LIST_MY_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    const { data } = await axios.get(`${REACT_APP_HOST}/getVehicle`, config);

    dispatch({
      type: VEHICLE_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VEHICLE_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
