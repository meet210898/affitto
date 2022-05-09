import axios from "axios";
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
import {
  VEHICLETYPE_LIST_MY_REQUEST,
  VEHICLETYPE_LIST_MY_SUCCESS,
  VEHICLETYPE_LIST_MY_FAIL,
} from "../../constants/admin/vehicleTypeConstants";
import {
  COMPANY_LIST_MY_REQUEST,
  COMPANY_LIST_MY_SUCCESS,
  COMPANY_LIST_MY_FAIL,
} from "../../constants/admin/companyConstants";
import {
  VEHICLE_LIST_MY_REQUEST,
  VEHICLE_LIST_MY_SUCCESS,
  VEHICLE_LIST_MY_FAIL,
  VEHICLE_DETAILS_REQUEST,
  VEHICLE_DETAILS_SUCCESS,
  VEHICLE_DETAILS_FAIL,
} from "../../constants/admin/vehicleConstants";
import {
  FAQCATEGORY_LIST_MY_REQUEST,
  FAQCATEGORY_LIST_MY_SUCCESS,
  FAQCATEGORY_LIST_MY_FAIL,
} from "../../constants/admin/faqCategoryConstants";
import {
  FAQ_LIST_MY_REQUEST,
  FAQ_LIST_MY_SUCCESS,
  FAQ_LIST_MY_FAIL,
} from "../../constants/admin/faqConstants";
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
} from "../../constants/user/userConstants";
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

export const getCompany = () => async (dispatch) => {
  try {
    dispatch({
      type: COMPANY_LIST_MY_REQUEST,
    });

    const { data } = await axios.get(`http://localhost:4000/user/getCompany`);

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

export const listVehicle = () => async (dispatch) => {
  try {
    dispatch({
      type: VEHICLE_LIST_MY_REQUEST,
    });

    const { data } = await axios.get(`http://localhost:4000/user/getVehicle`);

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
      `http://localhost:4000/user/getVehicleById/${vehicleId}`
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
      `http://localhost:4000/user/getVehicleByCompanyId/${companyId}`
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

export const getVehicleType = () => async (dispatch) => {
  try {
    dispatch({
      type: VEHICLETYPE_LIST_MY_REQUEST,
    });

    const { data } = await axios.get(
      `http://localhost:4000/user/getVehicleType`
    );

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
      `http://localhost:4000/user/editUser/${userId}`,
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

export const listUserDetails = (userId) => async (dispatch) => {
  dispatch({ type: USER_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(
      `http://localhost:4000/user/getUserById/${userId}`
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

    const { data } = await axios.get(`http://localhost:4000/user/getFaq/${no}`);

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

    const { data } = await axios.get(
      `http://localhost:4000/user/getFaqCategory`
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

export const listFaqByFaqCategoryDetails =
  (faqCategoryId) => async (dispatch) => {
    dispatch({ type: VEHICLEBYCOMPANY_DETAILS_REQUEST });
    try {
      const { data } = await axios.get(
        `http://localhost:4000/user/getFaqByFaqCategoryId/${faqCategoryId}`
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
