import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserStateType = {
  userName: string;
  isLogined: boolean;
  bio: string;
  imageURL: string;
  feed: string;
  initialLoading: boolean;
};

const INITIAL_STATE: UserStateType = {
  isLogined: false,
  userName: "",
  bio: "",
  imageURL: "",
  feed: "global",
  initialLoading: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState: INITIAL_STATE,
  reducers: {
    setIsLogined(
      state,
      action: PayloadAction<{ name: string; bio: string; imageURL: string }>
    ) {
      state.isLogined = true;
      state.userName = action.payload.name;
      state.bio = action.payload.bio;
      state.imageURL = action.payload.imageURL;
    },

    setIsNotLogined(state) {
      state.isLogined = false;
    },

    setInitialLoading(state, action: PayloadAction<boolean>) {
      state.initialLoading = action.payload;
    },
  },
});

export const userSliceReducer = userSlice.reducer;
export const userSliceActions = userSlice.actions;
