import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../routes/routePathes";
import { API_URL } from "../../api/API_URL";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { stateSelectors } from "../../store";
import { Header } from "../../components/header/Header";
import { IntroPanel } from "../../components/introPanel/introPanel";
import { Footer } from "../../components/footer/Footer";
import { PostsContainer } from "../../components/postsContainer/postsContainer";
import { userSlice, userSliceActions } from "../../store/slices/userSlice";
import { blogAPI } from "../../api/blogAPI";
import { Email } from "@mui/icons-material";
import { localStorageService } from "../../services/LSService";

export const MainPage = () => {
  const token = localStorageService.getToken();
  const dispatch = useAppDispatch();
  const {
    data: userInfoData,
    isLoading,
    error,
  } = blogAPI.useGetUserInfoByTokenQuery("");

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
