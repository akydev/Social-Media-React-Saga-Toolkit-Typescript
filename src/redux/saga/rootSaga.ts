import { all } from "redux-saga/effects";
import watcherLogin from "./loginSaga";
import watcherProfile from "./profileSaga";
import watcherRegistration from "./registrationSaga";
import watcherTimeline from "./timelineSaga";
import watcherUser from "./userSaga";

export default function* rootSaga() {
  yield all([
    watcherRegistration(),
    watcherLogin(),
    watcherProfile(),
    watcherTimeline(),
    watcherUser(),
  ]);
}
