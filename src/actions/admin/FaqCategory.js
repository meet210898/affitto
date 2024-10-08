import {
  FAQCATEGORY_CREATE_REQUEST,
  FAQCATEGORY_CREATE_SUCCESS,
  FAQCATEGORY_CREATE_FAIL,
  FAQCATEGORY_UPDATE_REQUEST,
  FAQCATEGORY_UPDATE_SUCCESS,
  FAQCATEGORY_UPDATE_FAIL,
  FAQCATEGORY_LIST_MY_REQUEST,
  FAQCATEGORY_LIST_MY_SUCCESS,
  FAQCATEGORY_LIST_MY_FAIL,
  FAQCATEGORY_DELETE_REQUEST,
  FAQCATEGORY_DELETE_SUCCESS,
  FAQCATEGORY_DELETE_FAIL,
} from "../../constants/admin/FaqCategory";
import axios from "axios";
const { REACT_APP_HOST } = process.env;
const userToken = JSON.parse(localStorage.getItem("auth-token"));

export const addFaqCategory = (faqCategoryData) => async (dispatch) => {
  try {
    dispatch({
      type: FAQCATEGORY_CREATE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken?.token}`,
      },
    };

    const { data } = await axios.post(
      `${REACT_APP_HOST}/addFaqCategory`,
      faqCategoryData,
      config
    );

    dispatch({
      type: FAQCATEGORY_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAQCATEGORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateFaqCategory =
  (faqCategoryId, faqCategoryData) => async (dispatch) => {
    try {
      dispatch({
        type: FAQCATEGORY_UPDATE_REQUEST,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${userToken?.token}`,
        },
      };

      const { data } = await axios.patch(
        `${REACT_APP_HOST}/editFaqCategory/${faqCategoryId}`,
        faqCategoryData,
        config
      );

      dispatch({
        type: FAQCATEGORY_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FAQCATEGORY_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteFaqCategory = (faqCategoryId) => async (dispatch) => {
  try {
    dispatch({
      type: FAQCATEGORY_DELETE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken?.token}`,
      },
    };

    await axios.delete(
      `${REACT_APP_HOST}/deleteFaqCategory/${faqCategoryId}`,
      config
    );

    dispatch({
      type: FAQCATEGORY_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: FAQCATEGORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listFaqCategory = () => async (dispatch) => {
  try {
    dispatch({
      type: FAQCATEGORY_LIST_MY_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken?.token}`,
      },
    };

    const { data } = await axios.get(
      `${REACT_APP_HOST}/getFaqCategory`,
      config
    );

    dispatch({
      type: FAQCATEGORY_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAQCATEGORY_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
