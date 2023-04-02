import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { RegisterPage } from "../registerPage/registerPage";
import { PageNotFound } from "../pageNotFound/pageNotFound";
import { MainPage } from "../mainPage/mainPage";
import { SignInPage } from "../signInPage/signInPage";
import { UserProfile } from "../userProfile/userProfile";
import { NewArticlePage } from "../newArticlePage/newArticlePage";
import { AccountSettingsPage } from "../profileSettings/profileSettings";
import { ProtectedRoute } from "../../routes/protectedRoute";
import { ROUTE_PATH } from "../../routes/routePathes";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTE_PATH.MAIN} element={<MainPage />} />
        <Route path={ROUTE_PATH.REGISTRATION} element={<RegisterPage />} />
        <Route path={ROUTE_PATH.SIGN_IN} element={<SignInPage />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path={ROUTE_PATH.ACCOUNT_SETTINGS}
            element={<AccountSettingsPage />}
          />
          <Route path={ROUTE_PATH.USER_PROFILE} element={<UserProfile />} />
          <Route path={ROUTE_PATH.NEW_POST} element={<NewArticlePage />} />

          <Route path={ROUTE_PATH.NOT_FOUND} element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};
