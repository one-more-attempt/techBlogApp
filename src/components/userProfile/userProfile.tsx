import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";

import { RegisterPage } from "../registerPage/registerPage";
import { PageNotFound } from "../pageNotFound/pageNotFound";
import { MainPage } from "../mainPage/mainPage";
import { SignInPage } from "../signInPage/signInPage";

export const UserProfile = () => {
  const { userName } = useParams();
  return <div>You logined as {userName}</div>;
};
