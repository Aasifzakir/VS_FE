import { takeLatest, put, call } from "redux-saga/effects";
import types from './AuthActionTypes';
import { axiosGet, axiosPost, setAuthToken } from "../../Utils/axios";
import { activeUserResponse, errorResponse, loginResponse, postUserResponse } from "./AuthActions";


function* onlogin({ payload }) {
  try {
    const response = yield call(() =>
      axiosPost("auth/login", payload).then((response) => response?.data)
    );
    if (response.success) {
      localStorage.setItem("token", response?.data);
      setAuthToken(response?.data);
    }
    yield put(loginResponse(response));
  } catch (error) {
    yield put(loginResponse(error));
  }
}

//GET ACTIVE USER

function* onGetActiveUserAsync() {
  try {
    const response = yield call(() =>
      axiosGet("auth/active_user").then((response) => response?.data)
    );
    yield put(activeUserResponse(response));
  } catch (error) {
    yield put(errorResponse(error.response));
  }
}

function* onPostUser({ payload }) {
    try {
      const response = yield call(() =>
        axiosPost("user", payload).then((response) => response?.data)
      );
      yield put(postUserResponse(response));
    } catch (error) {
      yield put(errorResponse(error));
    }
  }

//WATCHER
export function* authWatcherSaga() {
  yield takeLatest(types.POST_USER_REQUEST, onPostUser);
  yield takeLatest(types.LOGIN_REQUEST, onlogin);
  yield takeLatest(types.LOGIN_RESPONSE, onGetActiveUserAsync);
  yield takeLatest(types.ACTIVE_USER_REQUEST, onGetActiveUserAsync);
}