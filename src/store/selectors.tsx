import { RootState } from ".";
import { useAppDispatch } from "./hooks/redux-hooks";


export const userSliceData = (state: RootState) => state.userSliceReducer;
