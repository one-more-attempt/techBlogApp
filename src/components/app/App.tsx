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

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/registration" element={<RegisterPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};
