import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import registrationReducer from "../slice/registrationSlice";
import loginReducer from "../slice/loginSlice";
import userReducer from "../slice/userSlice";
import profileReducer from "../saga/profileSaga";
import timelineReducer from "../slice/timelineSlice";
import rootSaga from "../saga/rootSaga";
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    registration: registrationReducer,
    login: loginReducer,
    user: userReducer,
    profile: profileReducer,
    timeline: timelineReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
