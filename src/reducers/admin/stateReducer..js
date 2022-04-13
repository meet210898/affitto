import {
  STATE_LIST_MY_REQUEST,
  STATE_LIST_MY_SUCCESS,
  STATE_LIST_MY_FAIL,
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
