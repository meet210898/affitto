import {
  FAQ_CREATE_REQUEST,
  FAQ_CREATE_SUCCESS,
  FAQ_CREATE_FAIL,
  FAQ_UPDATE_REQUEST,
  FAQ_UPDATE_SUCCESS,
  FAQ_UPDATE_FAIL,
  FAQ_LIST_MY_REQUEST,
  FAQ_LIST_MY_SUCCESS,
  FAQ_LIST_MY_FAIL,
  FAQ_DELETE_REQUEST,
  FAQ_DELETE_SUCCESS,
  FAQ_DELETE_FAIL,
} from "../../constants/admin/Faq";
import axios from "axios";
const { REACT_APP_HOST } = process.env;
const userToken = JSON.parse(localStorage.getItem("auth-token"));

export const addFaq = (faqData) => async (dispatch) => {
  try {
    dispatch({
      type: FAQ_CREATE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken?.token}`,
      },
    };

    const { data } = await axios.post(
      `${REACT_APP_HOST}/addFaq`,
      faqData,
      config
    );

    dispatch({
      type: FAQ_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAQ_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateFaq = (faqId, faqData) => async (dispatch) => {
  try {
    dispatch({
      type: FAQ_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken?.token}`,
      },
    };

    const { data } = await axios.patch(
      `${REACT_APP_HOST}/editFaq/${faqId}`,
      faqData,
      config
    );

    dispatch({
      type: FAQ_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAQ_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteFaq = (faqId) => async (dispatch) => {
  try {
    dispatch({
      type: FAQ_DELETE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken?.token}`,
      },
    };

    await axios.delete(`${REACT_APP_HOST}/deleteFaq/${faqId}`, config);

    dispatch({
      type: FAQ_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: FAQ_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listFaq = () => async (dispatch) => {
  try {
    dispatch({
      type: FAQ_LIST_MY_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken?.token}`,
      },
    };

    const { data } = await axios.get(`${REACT_APP_HOST}/getFaq`, config);

    dispatch({
      type: FAQ_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAQ_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
