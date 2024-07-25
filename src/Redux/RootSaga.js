import { all } from "redux-saga/effects";
import { authWatcherSaga } from "./AuthSaga/AuthSaga";

export default function* RootSaga() {
    yield all([authWatcherSaga()])
}