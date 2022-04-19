import {
  STATE_CREATE_REQUEST,
  STATE_CREATE_SUCCESS,
  STATE_CREATE_FAIL,
  STATE_UPDATE_REQUEST,
  STATE_UPDATE_SUCCESS,
  STATE_UPDATE_FAIL,
  STATE_LIST_MY_REQUEST,
  STATE_LIST_MY_SUCCESS,
  STATE_LIST_MY_FAIL,
  STATE_DELETE_REQUEST,
  STATE_DELETE_SUCCESS,
  STATE_DELETE_FAIL,
  STATE_DETAILS_REQUEST,
  STATE_DETAILS_SUCCESS,
  STATE_DETAILS_FAIL,
} from "../../constants/admin/stateConstants";
import axios from "axios";
const userToken = JSON.parse(localStorage.getItem("auth-token"));

export const addState = (stateName, stateImage) => async (dispatch) => {
  try {
    dispatch({
      type: STATE_CREATE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("stateName", stateName);
    formData.append("stateImage", stateImage);
    const { data } = await axios.post(
      "http://localhost:4000/state",
      formData,
      config
    );

    dispatch({
      type: STATE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STATE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateState =
  (stateId, ...stateData) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: STATE_UPDATE_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userToken.token}`,
        },
      };

      const formData = new FormData();
      formData.append("stateName", stateData[0]);
      formData.append("stateImage", stateData[1]);
      
      const { data } = await axios.patch(
        `http://localhost:4000/editState/${stateId}`,
        formData,
        config
      );

      dispatch({
        type: STATE_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: STATE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listStateDetails = (stateId) => async (dispatch) => {
  dispatch({ type: STATE_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(
      `http://localhost:4000/getStateById/${stateId}`
    );
    dispatch({
      type: STATE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STATE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteState = (stateId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STATE_DELETE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    await axios.delete(`http://localhost:4000/deleteState/${stateId}`, config);

    dispatch({
      type: STATE_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: STATE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listStates = () => async (dispatch) => {
  try {
    dispatch({
      type: STATE_LIST_MY_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    const { data } = await axios.get(`http://localhost:4000/getState`, config);
    
    dispatch({
      type: STATE_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STATE_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};