import {
  VEHICLETYPE_CREATE_REQUEST,
  VEHICLETYPE_CREATE_SUCCESS,
  VEHICLETYPE_CREATE_FAIL,
  VEHICLETYPE_UPDATE_REQUEST,
  VEHICLETYPE_UPDATE_SUCCESS,
  VEHICLETYPE_UPDATE_FAIL,
  VEHICLETYPE_LIST_MY_REQUEST,
  VEHICLETYPE_LIST_MY_SUCCESS,
  VEHICLETYPE_LIST_MY_FAIL,
  VEHICLETYPE_DELETE_REQUEST,
  VEHICLETYPE_DELETE_SUCCESS,
  VEHICLETYPE_DELETE_FAIL,
  VEHICLETYPE_DETAILS_REQUEST,
  VEHICLETYPE_DETAILS_SUCCESS,
  VEHICLETYPE_DETAILS_FAIL,
} from "../../constants/admin/VehicleType";
import axios from "axios";
const { REACT_APP_HOST } = process.env;
const userToken = JSON.parse(localStorage.getItem("auth-token"));

export const addType = (typeData) => async (dispatch) => {
  try {
    dispatch({
      type: VEHICLETYPE_CREATE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken?.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      `${REACT_APP_HOST}/addType`,
      typeData,
      config
    );

    dispatch({
      type: VEHICLETYPE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VEHICLETYPE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateVehicleType = (typeId, typeData) => async (dispatch) => {
  try {
    dispatch({
      type: VEHICLETYPE_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userToken?.token}`,
      },
    };

    const { data } = await axios.patch(
      `${REACT_APP_HOST}/editVehicleType/${typeId}`,
      typeData,
      config
    );

    dispatch({
      type: VEHICLETYPE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VEHICLETYPE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getVehicleTypeDetails = (typeId) => async (dispatch) => {
  dispatch({ type: VEHICLETYPE_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(
      `${REACT_APP_HOST}/getVehicleTypeById/${typeId}`
    );
    dispatch({
      type: VEHICLETYPE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VEHICLETYPE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteVehicleType = (typeId) => async (dispatch) => {
  try {
    dispatch({
      type: VEHICLETYPE_DELETE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken?.token}`,
      },
    };

    await axios.delete(`${REACT_APP_HOST}/deleteVehicleType/${typeId}`, config);

    dispatch({
      type: VEHICLETYPE_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: VEHICLETYPE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const viewVehicleType = () => async (dispatch) => {
  try {
    dispatch({
      type: VEHICLETYPE_LIST_MY_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken?.token}`,
      },
    };

    const { data } = await axios.get(
      `${REACT_APP_HOST}/getVehicleType`,
      config
    );

    dispatch({
      type: VEHICLETYPE_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VEHICLETYPE_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
