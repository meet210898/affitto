import {
  STATE_LIST_MY_REQUEST,
  STATE_LIST_MY_SUCCESS,
  STATE_LIST_MY_FAIL,
  STATE_DELETE_REQUEST,
  STATE_DELETE_SUCCESS,
  STATE_DELETE_FAIL,
  STATE_UPDATE_REQUEST,
  STATE_UPDATE_SUCCESS,
  STATE_UPDATE_FAIL,
  STATE_UPDATE_RESET,
} from "../../constants/stateConstants";

export const stateReducer = (state = {}, action) => {
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


export const stateDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STATE_DELETE_REQUEST:
      return { loading: true };
    case STATE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case STATE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
