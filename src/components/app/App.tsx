import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { RegisterPage } from "../../pages/registerPage/registerPage";
import { PageNotFound } from "../../pages/pageNotFound/pageNotFound";
import { MainPage } from "../../pages/mainPage/mainPage";
import { SignInPage } from "../../pages/signInPage/signInPage";
import { UserProfilePage } from "../../pages/userProfile/userProfilePage";
import { NewArticlePage } from "../../pages/newArticlePage/newArticlePage";
import { AccountSettingsPage } from "../AccountSettings/AccountSettings";
import { ProtectedRoute } from "../../routes/protectedRoute";
import { ROUTE_PATH } from "../../routes/routePathes";
import { SelectedPostPage } from "../../pages/selectedPostPage/selectedPostPage";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { stateSelectors } from "../../store";
import Main from "./Main.module.scss";
import { useEffect } from "react";
import { userSlice } from "../../store/slices/userSlice";
import axios from "axios";
import { API_URL } from "../../services/API_URL";

export const App = () => {
  
  // useEffect(() => {
  //   let token = localStorage.getItem(`userToken`);
  //   //если есть токен, берем данные по юзеру с сервера
  //   if (token) {
  //     dispatch(userSlice.actions.setInitialLoading(true));
  //     axios
  //       .get(API_URL.GET_USER_INFO, {
  //         headers: {
  //           authorization: "Token " + token,
  //         },
  //       })
  //       .then((resp) => {
  //         console.log(resp.data.user);
  //         const userData = {
  //           name: resp.data.user.username,
  //           bio: resp.data.user.bio,
  //           imageURL: resp.data.user.image,
  //         };
  //         dispatch(userSlice.actions.setIsLogined(userData));
  //         dispatch(userSlice.actions.setInitialLoading(false));
  //       });
  //   } else {
  //     dispatch(userSlice.actions.setIsNotLogined());
  //   }
  // }, []);
  return (
    <Router>
      <Routes>
        <Route path={ROUTE_PATH.MAIN} element={<MainPage />} />
        <Route path={ROUTE_PATH.REGISTRATION} element={<RegisterPage />} />
        <Route path={ROUTE_PATH.SIGN_IN} element={<SignInPage />} />
        <Route path={"/post"}>
          <Route path={":slug"} element={<SelectedPostPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path={ROUTE_PATH.ACCOUNT_SETTINGS}
            element={<AccountSettingsPage />}
          />
          <Route path={ROUTE_PATH.USER_PROFILE} element={<UserProfilePage />} />
          <Route path={ROUTE_PATH.NEW_POST} element={<NewArticlePage />} />

          <Route path={ROUTE_PATH.NOT_FOUND} element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};
function dispatch(arg0: {
  payload: boolean;
  type: "userSlice/setInitialLoading";
}) {
  throw new Error("Function not implemented.");
}
