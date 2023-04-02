import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserStateType = {
  userName: string;
  isLogined: boolean;
};

const INITIAL_STATE: UserStateType = {
  userName: "",
  isLogined: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState: INITIAL_STATE,
  reducers: {
    setIsLogined(state, action: PayloadAction<string>) {
      state.userName = action.payload;
      state.userName = "";
      state.isLogined = false;
    },

    setIsNotLogined(state) {
      state.userName = "";
      state.isLogined = true;
    },
  },
});

export const userSliceReducer = userSlice.reducer;
export const userSliceActions = userSlice.actions;
