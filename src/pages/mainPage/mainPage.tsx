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

export const MainPage = () => {
  const token = localStorage.getItem("userToken");
  console.log(token);

  const userDataState = useAppSelector(stateSelectors.userSliceData);
  const { isLogined } = userDataState;
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = blogAPI.useGetUserInfoByTokenQuery(token);

  // const [getUserInfo, { error, isError, isLoading, data }] =
  //   blogAPI.useGetUserInfoByTokenQuery();
  // const;
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (data) {
      console.log(data);
    }
  }, [data]);
  return (
    <>
      <Header />
      {!isLogined && <IntroPanel />}
      <div className="content">
        <PostsContainer />
      </div>
      <Footer />
    </>
  );
};
