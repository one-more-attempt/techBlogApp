import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type UserStateType = {
  userName: string;
  email: string;
  isLogined: boolean;
  bio: string;
  imageURL: string;
};

const initialState: UserStateType = {
  isLogined: false,
  userName: "",
  email: "",
  bio: "",
  imageURL: "",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setIsLogined(
      state,
      action: PayloadAction<{
        name: string;
        bio: string;
        imageURL: string;
        email: string;
      }>
    ) {
      state.isLogined = true;
      state.userName = action.payload.name;
      state.bio = action.payload.bio;
      state.imageURL = action.payload.imageURL;
      state.email = action.payload.email;
    },
    setInitial(state) {
      state.isLogined = false;
      state.userName = "";
      state.email = "";
      state.bio = "";
      state.imageURL = "";
    },
  },
});

export const userSliceReducer = userSlice.reducer;
export const userSliceActions = userSlice.actions;
