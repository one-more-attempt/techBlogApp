import { useParams } from "react-router-dom";
import { ArticleBanner } from "../../components/articleBanner/ArticleBanner";
import { Header } from "../../components/header/Header";
import { blogAPI } from "../../api/blogAPI";
import { CommentsBlock } from "../../components/CommentsBlock/CommentsBlock";
import { SelectedPostBody } from "../../components/selectedPostBody/selectedPostBody";
import { Footer } from "../../components/footer/Footer";
import { localStorageService } from "../../services/LSService";
import { useEffect } from "react";
import { userSlice } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../store/hooks/redux-hooks";

export const SelectedPostPage = () => {
  const dispatch = useAppDispatch();
  const { slug } = useParams();
  const slugName = slug ? slug : "";

  //login data
  const token = localStorageService.getToken() || "";
  const [getUserInfoTrigger, { data: userInfoData }] =
    blogAPI.useLazyGetUserInfoByTokenQuery();
  useEffect(() => {
    if (token) {
      getUserInfoTrigger(token)
        .unwrap()
        .then((resp: any) => {
          const { email, username, bio, image } = resp.user;
          const userDataFromServer = {
            name: username,
            bio: bio,
            email: email,
            imageURL: image,
          };
          dispatch(userSlice.actions.setIsLogined(userDataFromServer));
          console.log(userInfoData);
        });
    }
  }, []);

  //post data from params
  const {
    data,
    error,
    isFetching: isSelectedPostFetching,
    isLoading,
  } = blogAPI.useGetSelectedPostQuery({ slug: slugName, token });
  console.log(data);

  const isPostUpdating = isSelectedPostFetching ? true : false;
  return (
    <>
      <Header />
      <div className="content">
        {isLoading && "is Loading..."}
        {data && (
          <>
            <ArticleBanner
              title={data.article.title}
              author={data.article.author.username}
              date={data.article.createdAt}
              favorited={data.article.favorited}
              following={data.article.author.following}
              likesCount={data.article.favoritesCount}
              imgURL={data.article.author.image}
              isPostUpdating= {isPostUpdating}
              slug = {data.article.slug}
            />
            <SelectedPostBody
              text={data.article.body}
              tagsList={data.article.tagList}
            />
            <CommentsBlock
              author={data.article.author.username}
              date={data.article.createdAt}
              favorited={data.article.favorited}
              following={data.article.author.following}
              likesCount={data.article.favoritesCount}
              slug={data.article.slug}
              imgURL={data.article.author.image}
              isPostUpdating={isPostUpdating}
              
            />
          </>
        )}
      </div>
      <Footer />
    </>
  );
};
