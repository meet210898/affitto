import {
    FAQCATEGORY_CREATE_REQUEST,
    FAQCATEGORY_CREATE_SUCCESS,
    FAQCATEGORY_CREATE_FAIL,
    FAQCATEGORY_CREATE_RESET,
    FAQCATEGORY_LIST_MY_REQUEST,
    FAQCATEGORY_LIST_MY_SUCCESS,
    FAQCATEGORY_LIST_MY_FAIL,
    FAQCATEGORY_DELETE_REQUEST,
    FAQCATEGORY_DELETE_SUCCESS,
    FAQCATEGORY_DELETE_FAIL,
    FAQCATEGORY_UPDATE_REQUEST,
    FAQCATEGORY_UPDATE_SUCCESS,
    FAQCATEGORY_UPDATE_FAIL,
    FAQCATEGORY_UPDATE_RESET,
    FAQCATEGORY_DETAILS_REQUEST,
    FAQCATEGORY_DETAILS_SUCCESS,
    FAQCATEGORY_DETAILS_FAIL,
  } from "../../constants/admin/faqCategoryConstants";
  
  export const faqCategoryCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case FAQCATEGORY_CREATE_REQUEST:
        return { loading: true };
      case FAQCATEGORY_CREATE_SUCCESS:
        return { loading: false, success: true, state: action.payload };
      case FAQCATEGORY_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case FAQCATEGORY_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const faqCategoryReducer = (state = { faqCategoryInfo: [] }, action) => {
    switch (action.type) {
      case FAQCATEGORY_LIST_MY_REQUEST:
        return { loading: true };
      case FAQCATEGORY_LIST_MY_SUCCESS:
        return { loading: false, faqCategoryInfo: action.payload };
      case FAQCATEGORY_LIST_MY_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const faqCategoryUpdateReducer = (state = { faqCategory: {} }, action) => {
    switch (action.type) {
      case FAQCATEGORY_UPDATE_REQUEST:
        return { loading: true };
      case FAQCATEGORY_UPDATE_SUCCESS:
        return { loading: false, success: true, faqCategory: action.payload };
      case FAQCATEGORY_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case FAQCATEGORY_UPDATE_RESET:
        return { state: {} };
      default:
        return state;
    }
  };
  
  export const faqCategoryDetailsReducer = (state = { state: { faqCategory: [] } }, action) => {
    switch (action.type) {
      case FAQCATEGORY_DETAILS_REQUEST:
        return { loading: true, ...state };
      case FAQCATEGORY_DETAILS_SUCCESS:
        return { loading: false, faqCategory: action.payload };
      case FAQCATEGORY_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const faqCategoryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case FAQCATEGORY_DELETE_REQUEST:
        return { loading: true };
      case FAQCATEGORY_DELETE_SUCCESS:
        return { loading: false, deleteSuccess: true };
      case FAQCATEGORY_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  