import {
  STATE_CREATE_REQUEST,
  STATE_CREATE_SUCCESS,
  STATE_CREATE_FAIL,
  STATE_LIST_MY_REQUEST,
  STATE_LIST_MY_SUCCESS,
  STATE_LIST_MY_FAIL,
  STATE_CREATE_RESET,
  STATE_DELETE_REQUEST,
  STATE_DELETE_SUCCESS,
  STATE_DELETE_FAIL,
  STATE_UPDATE_REQUEST,
  STATE_UPDATE_SUCCESS,
  STATE_UPDATE_FAIL,
  STATE_UPDATE_RESET,
  STATE_DETAILS_REQUEST,
  STATE_DETAILS_SUCCESS,
  STATE_DETAILS_FAIL,
} from "../../constants/admin/State";

export const stateCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STATE_CREATE_REQUEST:
      return { loading: true };
    case STATE_CREATE_SUCCESS:
      return { loading: false, success: true, state: action.payload };
    case STATE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case STATE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const stateReducer = (state = { statesInfo: [] }, action) => {
  switch (action.type) {
    case STATE_LIST_MY_REQUEST:
      return { loading: true };
    case STATE_LIST_MY_SUCCESS:
      return { loading: false, statesInfo: action.payload };
    case STATE_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stateUpdateReducer = (state = { state: {} }, action) => {
  switch (action.type) {
    case STATE_UPDATE_REQUEST:
      return { loading: true };
    case STATE_UPDATE_SUCCESS:
      return { loading: false, success: true, state: action.payload };
    case STATE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case STATE_UPDATE_RESET:
      return { state: {} };
    default:
      return state;
  }
};

export const stateDetailsReducer = (
  state = { states: { stateDetails: [] } },
  action
) => {
  switch (action.type) {
    case STATE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case STATE_DETAILS_SUCCESS:
      return { loading: false, stateDetails: action.payload };
    case STATE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stateDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STATE_DELETE_REQUEST:
      return { loading: true };
    case STATE_DELETE_SUCCESS:
      return { loading: false, deleteSuccess: true };
    case STATE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
