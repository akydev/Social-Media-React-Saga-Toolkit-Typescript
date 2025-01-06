import { all } from "redux-saga/effects";
import watcherLogin from "./loginSaga";

export default function* rootSaga() {
  yield all([watcherLogin()]);
}
