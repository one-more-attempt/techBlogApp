import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthorBanner } from "../../components/authorBanner/authorBanner";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { Post } from "../../components/post/post";
import { blogAPI } from "../../api/blogAPI";
import { localStorageService } from "../../services/LSService";
import { useAppDispatch } from "../../store/hooks/redux-hooks";
import { userSlice } from "../../store/slices/userSlice";
import Author from "./authorPage.module.scss";

enum FeedSelector {
  Author,
  Favorited,
}

export const AuthorPage = () => {
  const token = localStorageService.getToken();
  const dispatch = useAppDispatch();
  const { author } = useParams();
  const authorName = author ? author : "";
  const [feedSelector, setFeedSelector] = useState(FeedSelector.Author);

  const [getUserInfoTrigger, { data: userInfoData }] =
    blogAPI.useLazyGetUserInfoByTokenQuery();

  const {
    data: authorPosts,
    isLoading: isAuthorPostsLoading,
    isFetching: isAuthorPostsFetching,
    isError: isAuthorPostsError,
  } = blogAPI.useGetAuthorPostsQuery({
    author: authorName,
    token: token ? token : "",
  });

  const {
    data: authorLikedPosts,
    isFetching: isAuthorLikedPostsFetching,
    isLoading: isAuthorLikedPostsLoading,
    isError: isAuthorLikedPostsError,
  } = blogAPI.useGetAuthorFavoritedPostsQuery(authorName);

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

  const postsToRender =
    feedSelector === FeedSelector.Author ? authorPosts : authorLikedPosts;
  const checkActive = (feed: FeedSelector) => {
    if (feed === feedSelector) return Author.activeFeed;
  };

  console.log(authorPosts);
  console.log(authorLikedPosts);

  const isPostsUpdating =
    isAuthorPostsFetching || isAuthorLikedPostsFetching ? true : false;
  const isLoading = isAuthorPostsLoading || isAuthorLikedPostsLoading;
  const isError = isAuthorLikedPostsError || isAuthorPostsError;
  return (
    <>
      <Header />
      <div className="content">
        <AuthorBanner authorName={authorName} />
        <div className={`${Author.contentWrapper} ${Author.adaptiveLayout}`}>
          <div className={Author.feedTooglePanel}>
            <div
              className={checkActive(FeedSelector.Author)}
              onClick={() => setFeedSelector(FeedSelector.Author)}
            >
              {author} Posts
            </div>
            <div
              className={checkActive(FeedSelector.Favorited)}
              onClick={() => {
                setFeedSelector(FeedSelector.Favorited);
              }}
            >
              {author} Favorited
            </div>
          </div>

          {isLoading && "loading"}
          {isError && "some error ocured"}

          {postsToRender &&
            postsToRender.articles.map((item: any, index: number) => (
              <Post
                author={item.author.username}
                title={item.title}
                mainText={item.body}
                key={index}
                isLiked={item.favorited}
                likeCount={item.favoritesCount}
                createdAt={item.createdAt}
                tagsList={item.tagList}
                slug={item.slug}
                imgURL={item.author.image}
                isUpdating={isPostsUpdating}
              />
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
