import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../routes/routePathes";
import { API_URL } from "../../services/API_URL";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { stateSelectors } from "../../store";
import { Header } from "../../components/header/Header";
import { IntroPanel } from "../../components/introPanel/introPanel";
import { Footer } from "../../components/footer/Footer";
import { PostsContainer } from "../../components/postsContainer/postsContainer";
import { userSlice } from "../../store/slices/userSlice";
import { blogAPI } from "../../services/blogService";
import { ReactComponent as SpinnerImg } from "../../img/spinner.svg";
import { Email } from "@mui/icons-material";

export const MainPage = () => {
  const token = localStorage.getItem("userToken");
  const dispatch = useAppDispatch();

  // const trigger, data] = blogAPI.useGetUserInfoByTokenQuery(token);

  const [trigger, { data, isLoading, error }] =
    blogAPI.useLazyGetUserInfoByTokenQuery();

  useEffect(() => {
    if (token) {
      trigger(token, true);
    }
  });

  useEffect(() => {
    if (data) {
      const { email, username, bio, image } = data.user;
      const userDataFromServer = {
        name: username,
        bio: bio,
        email: email,
        imageURL: image,
      };
      dispatch(userSlice.actions.setIsLogined(userDataFromServer));
      console.log(data);
    }
  });

  return (
    <>
      <Header />
      {!token && <IntroPanel />}
      <div className="content">
        <PostsContainer />
      </div>
      <Footer />
    </>
  );
};
