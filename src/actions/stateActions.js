import {
  STATE_CREATE_REQUEST,
  STATE_CREATE_SUCCESS,
  STATE_CREATE_FAIL,
} from "../constants/stateConstants";
import axios from "axios";

export const addState = (stateName, stateImage) => async (dispatch) => {
  try {
    dispatch({
      type: STATE_CREATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    console.log(stateName, "statename");
    console.log(stateImage, "stateimg");
    const { data } = await axios.post(
      "http://localhost:4000/state ",
      { stateName, stateImage },
      config
    );

    dispatch({
      type: STATE_CREATE_SUCCESS,
      payload: data,
    });
    localStorage.setItem("auth-token", data.token);
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
