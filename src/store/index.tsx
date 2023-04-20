import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSliceReducer } from "./slices/userSlice";
import { blogAPI } from "../services/blogService";

const rootReducer = combineReducers({
  userSliceReducer,
  [blogAPI.reducerPath]: blogAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(blogAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export * as stateSelectors from "./selectors";
