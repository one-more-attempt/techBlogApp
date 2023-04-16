import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../routes/routePathes";
import { API_URL } from "../../api/apiURL";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { stateSelectors } from "../../store";
import { Header } from "../../components/header/Header";
import { IntroPanel } from "../../components/introPanel/introPanel";
import { Footer } from "../../components/footer/Footer";
import { PostsContainer } from "../../components/postsContainer/postsContainer";
import { userSlice } from "../../store/slices/userSlice";

export const MainPage = () => {
  const userDataState = useAppSelector(stateSelectors.userSliceData);
  const dispatch = useAppDispatch();
  // console.log({ userDataState });

  useEffect(() => {
    let token = localStorage.getItem(`userToken`);
    //если есть токен, берем данные по юзеру с сервера
    if (token) {
      dispatch(userSlice.actions.setInitialLoading(true));
      axios
        .get(API_URL.GET_USER_INFO, {
          headers: {
            authorization: "Token " + token,
          },
        })
        .then((resp) => {
          console.log(resp.data.user);
          const userData = {
            name: resp.data.user.username,
            bio: resp.data.user.bio,
            imageURL: resp.data.user.image,
          };
          dispatch(userSlice.actions.setIsLogined(userData));
          dispatch(userSlice.actions.setInitialLoading(false));
        });
    } else {
      dispatch(userSlice.actions.setIsNotLogined());
    }
  }, []);

  const introPanel =
    userDataState.initialLoading ? null : !userDataState.isLogined ? (
      <IntroPanel />
    ) : null;
  return (
    <>
      <Header />
      {/* <IntroPanel /> */}
      {introPanel}
      {/* <ArticleHeader /> */}
      <div className="content">
        <PostsContainer />
        {/* <AddComment /> */}
      </div>
      <Footer />
    </>
  );
};

// const
// const [userData, setUserData] = useState({
//   email: "",
//   bio: "",
//   token: "",
//   username: "",
//   image: "",
// });

// useEffect(() => {
//   let token = localStorage.getItem(`userToken`);
//   if (token) {
//     axios
//       .get(API_URL.GET_USER_INFO, {
//         headers: {
//           authorization: "Token " + token,
//         },
//       })
//       .then((resp) => {
//         console.log(resp.data.user);
//         setUserData(resp.data.user);
//       });
//   }
// }, []);

{
  /* <div>
        <h1>
          <Link to="/registration">Go to registration </Link>
        </h1>
        <h1>
          <Link to="/sign-in"> Sign in </Link>
        </h1>
      </div>

      <div>
        user:
        <p>{userData.image ? <img src={userData.image} alt="" /> : null}</p>
        <p>{userData.username ? userData.username : null}</p>
        <p>{userData.email ? userData.email : null}</p>
      </div>
      <div>
        <Link to={`/profile/${userData.username}`}>
          {" "}
          <h1> Go to user profile</h1>{" "}
        </Link>

        <Link to="/sign-in"> Sign in </Link>
      </div> */
}
function setIsLogined(): any {
  throw new Error("Function not implemented.");
}
