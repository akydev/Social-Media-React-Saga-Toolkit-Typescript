import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserResponse } from "../type/IAPIResponse";
import { ILogin } from "../type/ILogin";

interface LoginState {
  loading: boolean;
  loginData: ILogin | null;
  responseData: IUserResponse | null;
  error: string | null;
}

const initialState: LoginState = {
  loading: false,
  loginData: {
    email: "",
    password: "",
  },
  responseData: null,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest: (state: LoginState, action: PayloadAction<ILogin>) => {
      state.loading = true;
      state.loginData = action.payload;
    },
    loginSuccess: (state: LoginState, action: PayloadAction<IUserResponse>) => {
      state.loading = false;
      state.responseData = action.payload;
    },
    loginFailure: (state: LoginState, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure } = loginSlice.actions;
export default loginSlice.reducer;
