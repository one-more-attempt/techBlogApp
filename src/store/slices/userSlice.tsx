import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Feed {
  GlobalFeed = "GLOBAL_FEED",
  MyFeed = "MY_FEED",
  Tag = "TAG",
}

export type UserStateType = {
  userName: string;
  isLogined: boolean;
  bio: string;
  imageURL: string;
  feed: Feed;
  selectedTagName: string;
  initialLoading: boolean;
};

const INITIAL_STATE: UserStateType = {
  isLogined: false,
  userName: "",
  bio: "",
  imageURL: "",
  feed: Feed.GlobalFeed,
  initialLoading: false,
  selectedTagName: "",
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

    setActiveFeed(state, action: PayloadAction<Feed>) {
      state.feed = action.payload;
    },
    setActiveFeedTag(state, action: PayloadAction<string>) {
      state.feed = Feed.Tag;
      state.selectedTagName = action.payload;
    },
  },
});

export const userSliceReducer = userSlice.reducer;
export const userSliceActions = userSlice.actions;
