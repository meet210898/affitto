import {
  COMPANY_CREATE_REQUEST,
  COMPANY_CREATE_SUCCESS,
  COMPANY_CREATE_FAIL,
  COMPANY_UPDATE_REQUEST,
  COMPANY_UPDATE_SUCCESS,
  COMPANY_UPDATE_FAIL,
  COMPANY_LIST_MY_REQUEST,
  COMPANY_LIST_MY_SUCCESS,
  COMPANY_LIST_MY_FAIL,
  COMPANY_DELETE_REQUEST,
  COMPANY_DELETE_SUCCESS,
  COMPANY_DELETE_FAIL,
} from "../../constants/admin/companyConstants";
import axios from "axios";
const userToken = JSON.parse(localStorage.getItem("auth-token"));

export const addCompany = (companyData) => async (dispatch) => {
  try {
    dispatch({
      type: COMPANY_CREATE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    console.log(companyData, "companyData");
    const { data } = await axios.post(
      "http://localhost:4000/addCompany",
      companyData,
      config
    );

    dispatch({
      type: COMPANY_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCompany = (companyId, companyData) => async (dispatch) => {
  try {
    dispatch({
      type: COMPANY_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    const { data } = await axios.patch(
      `http://localhost:4000/editCompany/${companyId}`,
      companyData,
      config
    );

    dispatch({
      type: COMPANY_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCompany = (companyId) => async (dispatch) => {
  try {
    dispatch({
      type: COMPANY_DELETE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    await axios.delete(
      `http://localhost:4000/deleteCompany/${companyId}`,
      config
    );

    dispatch({
      type: COMPANY_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCompany = () => async (dispatch) => {
  try {
    dispatch({
      type: COMPANY_LIST_MY_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:4000/getCompany`,
      config
    );

    dispatch({
      type: COMPANY_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
