import {
  STATE_LIST_MY_REQUEST,
  STATE_LIST_MY_SUCCESS,
  STATE_LIST_MY_FAIL,
} from "../../constants/admin/stateConstants";
import {
  CITY_LIST_MY_REQUEST,
  CITY_LIST_MY_SUCCESS,
  CITY_LIST_MY_FAIL,
} from "../../constants/admin/cityConstants";
import axios from "axios";
import {
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
} from "../../constants/user/userConstants";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../../constants/userConstants";

export const getStates = () => async (dispatch) => {
  try {
    dispatch({
      type: STATE_LIST_MY_REQUEST,
    });

    const { data } = await axios.get(`http://localhost:4000/user/getState`);

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

export const getCities = () => async (dispatch) => {
  try {
    dispatch({
      type: CITY_LIST_MY_REQUEST,
    });

    const { data } = await axios.get(`http://localhost:4000/user/getCity`);

    dispatch({
      type: CITY_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CITY_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addUser = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_CREATE_REQUEST,
    });

    const { data } = await axios.post(
      "http://localhost:4000/user/addUser",
      formData
    );

    dispatch({
      type: USER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addAgency = (agencyData) => async (dispatch) => {
  try {
    console.log("-------------------------");
    dispatch({
      type: USER_CREATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    console.log(agencyData, "agencyData");

    const { data } = await axios.post(
      "http://localhost:4000/user/addAgency",
      agencyData,
      config
    );

    dispatch({
      type: USER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginUser = (loginData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:4000/user/login",
      loginData,
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("user-token", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("user-token");
  dispatch({ type: USER_LOGOUT });
};
