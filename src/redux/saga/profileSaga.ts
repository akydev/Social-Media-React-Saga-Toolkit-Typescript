import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  ProfileFailure,
  ProfileRequest,
  ProfileSuccess,
} from "../slice/profileSlice";
import { IUser } from "../type/IUser";
import profileService from "../service/profile";

function* profileSaga(action: PayloadAction<string>) {
  try {
    const res: IUser = yield call(profileService, action.payload);
    yield put(ProfileSuccess(res));
  } catch (error) {
    yield put(ProfileFailure(error));
  }
}

export default function* watcherProfile() {
  yield takeEvery(ProfileRequest.type, profileSaga);
}
