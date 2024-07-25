import { combineReducers } from "redux";
import authReducer from "./AuthSaga/AuthReducer";

export default combineReducers({
    authReducer,
})