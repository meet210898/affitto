import {
  CITY_CREATE_REQUEST,
  CITY_CREATE_SUCCESS,
  CITY_CREATE_FAIL,
  CITY_UPDATE_REQUEST,
  CITY_UPDATE_SUCCESS,
  CITY_UPDATE_FAIL,
  CITY_LIST_MY_REQUEST,
  CITY_LIST_MY_SUCCESS,
  CITY_LIST_MY_FAIL,
  CITY_DELETE_REQUEST,
  CITY_DELETE_SUCCESS,
  CITY_DELETE_FAIL,
  CITY_DETAILS_REQUEST,
  CITY_DETAILS_SUCCESS,
  CITY_DETAILS_FAIL,
} from "../../constants/admin/cityConstants";
import axios from "axios";
const userToken = JSON.parse(localStorage.getItem("auth-token"));

export const addCity = (stateId, cityName, cityImage) => async (dispatch) => {
  try {
    dispatch({
      type: CITY_CREATE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("stateId", stateId);
    formData.append("cityName", cityName);
    formData.append("cityImage", cityImage);
    const { data } = await axios.post(
      "http://localhost:4000/addCity",
      formData,
      config
    );

    dispatch({
      type: CITY_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CITY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCity =
  (cityId, ...cityData) =>
  async (dispatch, getCity) => {
    try {
      dispatch({
        type: CITY_UPDATE_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userToken.token}`,
        },
      };

      const formData = new FormData();
      formData.append("stateId", cityData[0]);
      formData.append("cityName", cityData[1]);
      formData.append("cityImage", cityData[2]);

      const { data } = await axios.patch(
        `http://localhost:4000/editCity/${cityId}`,
        formData,
        config
      );

      dispatch({
        type: CITY_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CITY_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listCityDetails = (cityId) => async (dispatch) => {
  dispatch({ type: CITY_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(
      `http://localhost:4000/getCityById/${cityId}`
    );
    dispatch({
      type: CITY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CITY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCity = (cityId) => async (dispatch) => {
  try {
    dispatch({
      type: CITY_DELETE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    await axios.delete(`http://localhost:4000/deleteCity/${cityId}`, config);

    dispatch({
      type: CITY_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CITY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCities = () => async (dispatch) => {
  try {
    dispatch({
      type: CITY_LIST_MY_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    const { data } = await axios.get(`http://localhost:4000/getCity`, config);
    
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
