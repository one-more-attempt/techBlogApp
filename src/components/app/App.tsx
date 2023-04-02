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
import { ROUTES } from "../../routes/routes";
export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainPage />} />
        <Route path={ROUTES.REGISTRATION} element={<RegisterPage />} />
        <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />


        //protected route!!!!
        <Route path={ROUTES.ACCOUNT_SETTINGS} element={<AccountSettingsPage />} />
        <Route path={ROUTES.NEW_POST} element={<NewArticlePage />} />
        <Route path={ROUTES.USER_PROFILE} element={<UserProfile />} />


        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};
