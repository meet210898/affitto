import {
  FAQ_CREATE_REQUEST,
  FAQ_CREATE_SUCCESS,
  FAQ_LIST_MY_REQUEST,
  FAQ_LIST_MY_SUCCESS,
  FAQ_CREATE_FAIL,
  FAQ_CREATE_RESET,
  FAQ_LIST_MY_FAIL,
  FAQ_DELETE_REQUEST,
  FAQ_DELETE_SUCCESS,
  FAQ_DELETE_FAIL,
  FAQ_UPDATE_REQUEST,
  FAQ_UPDATE_SUCCESS,
  FAQ_UPDATE_FAIL,
  FAQ_UPDATE_RESET,
  FAQ_DETAILS_REQUEST,
  FAQ_DETAILS_SUCCESS,
  FAQ_DETAILS_FAIL,
} from "../../constants/admin/Faq";

export const faqCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FAQ_CREATE_REQUEST:
      return { loading: true };
    case FAQ_CREATE_SUCCESS:
      return { loading: false, success: true, state: action.payload };
    case FAQ_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case FAQ_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const faqReducer = (state = { faqInfo: [] }, action) => {
  switch (action.type) {
    case FAQ_LIST_MY_REQUEST:
      return { loading: true };
    case FAQ_LIST_MY_SUCCESS:
      return { loading: false, faqInfo: action.payload };
    case FAQ_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const faqUpdateReducer = (state = { faq: {} }, action) => {
  switch (action.type) {
    case FAQ_UPDATE_REQUEST:
      return { loading: true };
    case FAQ_UPDATE_SUCCESS:
      return { loading: false, success: true, faq: action.payload };
    case FAQ_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case FAQ_UPDATE_RESET:
      return { state: {} };
    default:
      return state;
  }
};

export const faqDetailsReducer = (state = { state: { faq: [] } }, action) => {
  switch (action.type) {
    case FAQ_DETAILS_REQUEST:
      return { loading: true, ...state };
    case FAQ_DETAILS_SUCCESS:
      return { loading: false, faq: action.payload };
    case FAQ_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const faqDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case FAQ_DELETE_REQUEST:
      return { loading: true };
    case FAQ_DELETE_SUCCESS:
      return { loading: false, deleteSuccess: true };
    case FAQ_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
