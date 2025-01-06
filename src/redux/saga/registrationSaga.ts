import { PayloadAction } from "@reduxjs/toolkit";
import { IRegistration } from "../type/IRegistration";
import { IUserResponse } from "../type/IAPIResponse";
import registrationService from "../service/registration";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  registrationFailure,
  registrationRequest,
  registrationSuccess,
} from "../slice/registrationSlice";
import toast from "react-hot-toast";

function* registrationSaga(action: PayloadAction<IRegistration>) {
  try {
    const res: IUserResponse = yield call(registrationService, action.payload);
    yield put(registrationSuccess(res));
    toast.success("Registration Successfull!");
  } catch (error: any) {
    yield put(registrationFailure(error));
    toast.error(
      error.response?.data || "Registration Failed Please Try Again!"
    );
  }
}
export default function* watcherRegistration() {
  yield takeEvery(registrationRequest.type, registrationSaga);
}
