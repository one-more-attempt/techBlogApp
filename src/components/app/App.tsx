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
import { AuthorPage } from "../../pages/authorPage/authorPage";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTE_PATH.MAIN} element={<MainPage />} />
        <Route path={ROUTE_PATH.REGISTRATION} element={<RegisterPage />} />
        <Route path={ROUTE_PATH.SIGN_IN} element={<SignInPage />} />
        <Route path={ROUTE_PATH.POST}>
          <Route path={":slug"} element={<SelectedPostPage />} />
        </Route>
        <Route path={ROUTE_PATH.PROFILE}>
          <Route path={":author"} element={<AuthorPage />} />
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
