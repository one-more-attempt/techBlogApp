import HeaderStyle from "./Header.module.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import ArticleIcon from "@mui/icons-material/Article";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { stateSelectors } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { localStorageService } from "../../services/LSService";
import { ROUTE_PATH } from "../../routes/routePathes";
import { userSlice } from "../../store/slices/userSlice";

export const Header = () => {
  const userDataState = useAppSelector(stateSelectors.userSliceData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let links: JSX.Element;
  const goToLogout = () => {
    localStorageService.removetoken();
    dispatch(userSlice.actions.setInitial());

    navigate(ROUTE_PATH.MAIN);
  };

  if (userDataState.isLogined) {
    const userAvatar = userDataState.imageURL;
    links = (
      <>
        <Link to={ROUTE_PATH.MAIN} className={HeaderStyle.link}>
          <HomeIcon />
          Home
        </Link>
        <div className={HeaderStyle.link}>
          <ArticleIcon />
          <span>New article</span>
        </div>
        <div className={HeaderStyle.link}>
          <Link to={ROUTE_PATH.SETTINGS} className={HeaderStyle.link}>
            <SettingsIcon />
            <span>Settings</span>
          </Link>
        </div>
        <div className={HeaderStyle.link}>
          <img src={userAvatar} alt="" />
          <span>{userDataState.userName}</span>
        </div>
        <div className={HeaderStyle.link} onClick={goToLogout}>
          <LogoutIcon />
          <span>logout</span>
        </div>
      </>
    );
  } else {
    links = (
      <>
        <Link to={ROUTE_PATH.MAIN} className={HeaderStyle.link}>
          Home
        </Link>

        <Link to={ROUTE_PATH.SIGN_IN} className={HeaderStyle.link}>
          Sign in
        </Link>

        <Link to={ROUTE_PATH.SIGN_UP} className={HeaderStyle.link}>
          Sign up
        </Link>
      </>
    );
  }
  return (
    <>
      <div
        className={`${HeaderStyle.adaptiveLayout} ${HeaderStyle.headerContainer}`}
      >
        <div className={HeaderStyle.logo}>
          {" "}
          <Link to={ROUTE_PATH.MAIN}>conduit</Link>
        </div>

        <div className={HeaderStyle.links}>{links}</div>
      </div>
    </>
  );
};
