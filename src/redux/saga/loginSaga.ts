import { PayloadAction } from "@reduxjs/toolkit";
import { ILogin } from "../type/ILogin";
import { IUserResponse } from "../type/IAPIResponse";
import { call, put, takeEvery } from "redux-saga/effects";
import loginService from "../service/login";
import { loginFailure, loginRequest, loginSuccess } from "../slice/loginSlice";
import toast from "react-hot-toast";

function* loginSaga(action: PayloadAction<ILogin>) {
  try {
    const res: IUserResponse = yield call(loginService, action.payload);
    yield put(loginSuccess(res));
    localStorage.setItem("token", res.token);
    localStorage.setItem("userId", res.user._id);
    toast.success("Login Succefull!");
  } catch (error: any) {
    yield put(loginFailure(error));
    toast.error(error.response?.data || "Login Failed!");
  }
}
export default function* watcherLogin() {
  yield takeEvery(loginRequest.type, loginSaga);
}
