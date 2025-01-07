import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStateSlice } from "../type/IStateSlice";
import { IUser } from "../type/IUser";

const initialState: IStateSlice<IUser> = {
  loading: false,
  data: null,
  error: null,
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    ProfileRequest: (
      state: IStateSlice<IUser>,
      action: PayloadAction<string>
    ) => {
      state.loading = true;
    },
    ProfileSuccess: (
      state: IStateSlice<IUser>,
      action: PayloadAction<IUser>
    ) => {
      state.loading = false;
      state.data = action.payload;
    },
    ProfileFailure: (state: IStateSlice<any>, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { ProfileRequest, ProfileSuccess, ProfileFailure } =
  profileSlice.actions;
export default profileSlice.reducer;
