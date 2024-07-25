import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import RootSaga from "./RootSaga";
import rootReducer from "./RootReducer";
import { setAuthToken } from "../Utils/axios";
import { activeUserRequest } from "./AuthSaga/AuthActions";

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));
const token = localStorage.getItem("token");

sagaMiddleWare.run(RootSaga);

if (token) {
  setAuthToken(token);
  store.dispatch(activeUserRequest());
}

export default store;