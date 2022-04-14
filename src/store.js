import { userLoginReducer } from "./reducers/userReducers";
import {
  stateReducer,
  stateDeleteReducer,
} from "./reducers/admin/stateReducer.";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  statesList: stateReducer,
  stateDelete: stateDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
