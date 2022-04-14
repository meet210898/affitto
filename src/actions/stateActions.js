import {
  STATE_CREATE_REQUEST,
  STATE_CREATE_SUCCESS,
  STATE_CREATE_FAIL,
  STATE_LIST_MY_REQUEST,
  STATE_LIST_MY_SUCCESS,
  STATE_LIST_MY_FAIL,
  STATE_DELETE_REQUEST,
  STATE_DELETE_SUCCESS,
  STATE_DELETE_FAIL,
  STATE_DETAILS_REQUEST,
  STATE_DETAILS_SUCCESS,
  STATE_DETAILS_FAIL,
} from "../constants/stateConstants";
import axios from "axios";

export const addState = (stateName, stateImage) => async (dispatch) => {
  try {
    dispatch({
      type: STATE_CREATE_REQUEST,
    });

    const userToken = JSON.parse(localStorage.getItem("auth-token"));
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

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: STATE_DETAILS_REQUEST });

    const { data } = await axios.get(`http://localhost:4000/getState/${id}`);

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

export const deleteState = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STATE_DELETE_REQUEST,
    });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    const userToken = JSON.parse(localStorage.getItem("auth-token"));
    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    await axios.delete(`http://localhost:4000/deleteState/${id}`, config);

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

export const listStates = () => async (dispatch, getState) => {
  try {
    console.log("request")
    dispatch({
      type: STATE_LIST_MY_REQUEST,
    });
    const userToken = JSON.parse(localStorage.getItem("auth-token"));
    const {
      userLogin: { userInfo },
    } = getState();

    console.log(userToken.token, "userInfo.token");
    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    const { data } = await axios.get(`http://localhost:4000/getState`, config);
    console.log(data,"data")
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
