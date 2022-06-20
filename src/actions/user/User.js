import axios from "axios";
import {
  STATE_LIST_MY_REQUEST,
  STATE_LIST_MY_SUCCESS,
  STATE_LIST_MY_FAIL,
} from "../../constants/admin/State";
import {
  CITY_LIST_MY_REQUEST,
  CITY_LIST_MY_SUCCESS,
  CITY_LIST_MY_FAIL,
} from "../../constants/admin/City";
import {
  VEHICLETYPE_LIST_MY_REQUEST,
  VEHICLETYPE_LIST_MY_SUCCESS,
  VEHICLETYPE_LIST_MY_FAIL,
} from "../../constants/admin/VehicleType";
import {
  COMPANY_LIST_MY_REQUEST,
  COMPANY_LIST_MY_SUCCESS,
  COMPANY_LIST_MY_FAIL,
} from "../../constants/admin/Company";
import {
  VEHICLE_LIST_MY_REQUEST,
  VEHICLE_LIST_MY_SUCCESS,
  VEHICLE_LIST_MY_FAIL,
  VEHICLE_DETAILS_REQUEST,
  VEHICLE_DETAILS_SUCCESS,
  VEHICLE_DETAILS_FAIL,
} from "../../constants/admin/Vehicle";
import {
  FAQCATEGORY_LIST_MY_REQUEST,
  FAQCATEGORY_LIST_MY_SUCCESS,
  FAQCATEGORY_LIST_MY_FAIL,
} from "../../constants/admin/FaqCategory";
import {
  FAQ_LIST_MY_REQUEST,
  FAQ_LIST_MY_SUCCESS,
  FAQ_LIST_MY_FAIL,
} from "../../constants/admin/Faq";
import {
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  VEHICLEBYCOMPANY_DETAILS_REQUEST,
  VEHICLEBYCOMPANY_DETAILS_SUCCESS,
  VEHICLEBYCOMPANY_DETAILS_FAIL,
  VEHICLEBYTYPE_DETAILS_REQUEST,
  VEHICLEBYTYPE_DETAILS_SUCCESS,
  VEHICLEBYTYPE_DETAILS_FAIL,
  FORGETPASSWORD_REQUEST,
  FORGETPASSWORD_SUCCESS,
  FORGETPASSWORD_FAIL,
  OTP_REQUEST,
  OTP_SUCCESS,
  OTP_FAIL,
  CHANGEPASSWORD_REQUEST,
  CHANGEPASSWORD_SUCCESS,
  CHANGEPASSWORD_FAIL,
} from "../../constants/user/User";

import {
  BOOKING_LIST_MY_REQUEST,
  BOOKING_LIST_MY_SUCCESS,
  BOOKING_LIST_MY_FAIL,
} from "../../constants/admin/Booking";
const { REACT_APP_HOST } = process.env;
const userToken = JSON.parse(localStorage.getItem("user-token"));

export const getStates = () => async (dispatch) => {
  try {
    dispatch({
      type: STATE_LIST_MY_REQUEST,
    });

    const { data } = await axios.get(`${REACT_APP_HOST}/user/getState`);

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

export const getCities = (no) => async (dispatch) => {
  try {
    dispatch({
      type: CITY_LIST_MY_REQUEST,
    });

    const { data } = await axios.get(`${REACT_APP_HOST}/user/getCity/${no}`);

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

export const getCompany = (no) => async (dispatch) => {
  try {
    dispatch({
      type: COMPANY_LIST_MY_REQUEST,
    });

    const { data } = await axios.get(`${REACT_APP_HOST}/user/getCompany/${no}`);

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

export const listBooking = () => async (dispatch) => {
  try {
    dispatch({
      type: BOOKING_LIST_MY_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userToken?.token}`,
      },
    };

    const { data } = await axios.get(
      `${REACT_APP_HOST}/user/getBookingByUserId/`,
      config
    );

    dispatch({
      type: BOOKING_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOKING_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listVehicle = (no) => async (dispatch) => {
  try {
    dispatch({
      type: VEHICLE_LIST_MY_REQUEST,
    });

    const { data } = await axios.get(`${REACT_APP_HOST}/user/getVehicle/${no}`);

    dispatch({
      type: VEHICLE_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VEHICLE_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listVehicleDetails = (vehicleId) => async (dispatch) => {
  dispatch({ type: VEHICLE_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(
      `${REACT_APP_HOST}/user/getVehicleById/${vehicleId}`
    );
    dispatch({
      type: VEHICLE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VEHICLE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listVehicleByCompanyDetails = (companyId) => async (dispatch) => {
  dispatch({ type: VEHICLEBYCOMPANY_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(
      `${REACT_APP_HOST}/user/getVehicleByCompanyId/${companyId}`
    );

    dispatch({
      type: VEHICLEBYCOMPANY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VEHICLEBYCOMPANY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listVehicleByTypeDetails = (typeId) => async (dispatch) => {
  dispatch({ type: VEHICLEBYTYPE_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(
      `${REACT_APP_HOST}/user/getVehicleByTypeId/${typeId}`
    );

    dispatch({
      type: VEHICLEBYTYPE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VEHICLEBYTYPE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getVehicleType = () => async (dispatch) => {
  try {
    dispatch({
      type: VEHICLETYPE_LIST_MY_REQUEST,
    });

    const { data } = await axios.get(`${REACT_APP_HOST}/user/getVehicleType`);

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

export const addUser = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_CREATE_REQUEST,
    });

    const { data } = await axios.post(
      `${REACT_APP_HOST}/user/addUser`,
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

export const updateProfile = (userId, profileData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.patch(
      `${REACT_APP_HOST}/user/editUser/${userId}`,
      profileData,
      config
    );

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addAgency = (agencyData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_CREATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      `${REACT_APP_HOST}/user/addAgency`,
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

    const { data } = await axios.post(
      `${REACT_APP_HOST}/user/login`,
      loginData
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

export const forgetPassword = (forgetPasswordData) => async (dispatch) => {
  try {
    dispatch({
      type: FORGETPASSWORD_REQUEST,
    });

    const { data } = await axios.patch(
      `${REACT_APP_HOST}/user/forgetpassword`,
      forgetPasswordData
    );

    dispatch({
      type: FORGETPASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FORGETPASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const checkOTP = (otpData) => async (dispatch) => {
  try {
    dispatch({
      type: OTP_REQUEST,
    });

    const { data } = await axios.post(
      `${REACT_APP_HOST}/user/checkOTP`,
      otpData
    );
    dispatch({
      type: OTP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OTP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const changeUserPassword = (changePasswordData) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGEPASSWORD_REQUEST,
    });

    const { data } = await axios.patch(
      `${REACT_APP_HOST}/user/changePassword`,
      changePasswordData
    );
    dispatch({
      type: CHANGEPASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHANGEPASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUserDetails = (userId) => async (dispatch) => {
  dispatch({ type: USER_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(
      `${REACT_APP_HOST}/user/getUserById/${userId}`
    );
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listFaq = (no) => async (dispatch) => {
  try {
    dispatch({
      type: FAQ_LIST_MY_REQUEST,
    });

    const { data } = await axios.get(`${REACT_APP_HOST}/user/getFaq/${no}`);

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

export const listFaqCategory = () => async (dispatch) => {
  try {
    dispatch({
      type: FAQCATEGORY_LIST_MY_REQUEST,
    });

    const { data } = await axios.get(`${REACT_APP_HOST}/user/getFaqCategory`);

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

export const listFaqByFaqCategoryDetails =
  (faqCategoryId) => async (dispatch) => {
    dispatch({ type: VEHICLEBYCOMPANY_DETAILS_REQUEST });
    try {
      const { data } = await axios.get(
        `${REACT_APP_HOST}/user/getFaqByFaqCategoryId/${faqCategoryId}`
      );

      dispatch({
        type: VEHICLEBYCOMPANY_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: VEHICLEBYCOMPANY_DETAILS_FAIL,
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
