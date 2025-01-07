import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  TimelineFailure,
  TimelineRequest,
  TimelineSuccess,
} from "../slice/timelineSlice";
import { ITimeline } from "../type/ITimeline";
import timelineService from "../service/timeline";

function* timelineSaga(action: PayloadAction<string>) {
  try {
    const res: ITimeline[] = yield call(timelineService, action.payload);
    yield put(TimelineSuccess(res));
  } catch (error) {
    yield put(TimelineFailure(error));
  }
}

export default function* watcherTimeline() {
  yield takeEvery(TimelineRequest.type, timelineSaga);
}
