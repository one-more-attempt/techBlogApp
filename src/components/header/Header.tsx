import HeaderStyle from "./Header.module.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import ArticleIcon from "@mui/icons-material/Article";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { stateSelectors } from "../../store";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../routes/routePathes";

export const Header = () => {
  const userDataState = useAppSelector(stateSelectors.userSliceData);
  const dispatch = useAppDispatch();
  console.log({ userDataState });

  let links: JSX.Element;
  if (userDataState.initialLoading) {
    links = <>...Loading</>;
  } else {
    if (userDataState.isLogined) {
      links = (
        <>
          <span className={HeaderStyle.link}>
            <Link to={ROUTE_PATH.MAIN}>Home</Link>
          </span>
          <div className={HeaderStyle.link}>
            <ArticleIcon />
            <span>New article</span>
          </div>
          <div className={HeaderStyle.link}>
            <SettingsIcon />
            <span>Settings</span>
          </div>
          <div className={HeaderStyle.link}>
            <AccountCircleIcon />
            <span>{userDataState.userName}</span>
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
          <Link to={ROUTE_PATH.SIGN_IN} className={HeaderStyle.link}>
            Sign up
          </Link>
        </>
      );
    }
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