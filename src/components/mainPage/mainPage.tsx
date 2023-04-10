import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../routes/routePathes";
import { API_URL } from "../../api/apiURL";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { stateSelectors } from "../../store";
import { Header } from "../header/Header";
import { IntroPanel } from "../introPanel/introPanel";
import { Post } from "../post/post";
import { PopularTags } from "../popularTags/popularTags";
import { Footer } from "../footer/Footer";
import { PostsContainer } from "../postsContainer/postsContainer";

export const MainPage = () => {
  // const
  // const [userData, setUserData] = useState({
  //   email: "",
  //   bio: "",
  //   token: "",
  //   username: "",
  //   image: "",
  // });

  const randomCharacterState = useAppSelector(stateSelectors.userSliceData);
  console.log({ randomCharacterState });

  const dispatch = useAppDispatch();

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

  return (
    <>
      <Header />
      <IntroPanel />
      {/* <Post />
      <PopularTags /> */}
      <PostsContainer/>
      <Footer />


      {/* <div>
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
      </div> */}
    </>
  );
};
