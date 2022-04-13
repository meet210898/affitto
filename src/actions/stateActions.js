import {
  STATE_CREATE_REQUEST,
  STATE_CREATE_SUCCESS,
  STATE_CREATE_FAIL,
  STATE_LIST_MY_REQUEST,
  STATE_LIST_MY_SUCCESS,
  STATE_LIST_MY_FAIL
} from "../constants/stateConstants";
import axios from "axios";

export const addState = (stateName, stateImage) => async (dispatch) => {
  try {
    dispatch({
      type: STATE_CREATE_REQUEST,
    });
    const userToken = JSON.parse(localStorage.getItem("auth-token"));
    console.log(userToken, "userToken");
    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    console.log(stateName, "statename");
    console.log(stateImage, "stateimg");
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

export const listStates = () => async (dispatch, getState) => {
  try {
    console.log("request")
    dispatch({
      type: STATE_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    console.log(userInfo.token, "userInfo.token");
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
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
