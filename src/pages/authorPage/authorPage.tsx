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
import { PaginationButton } from "../../components/paginationButton/PaginationButton";

enum FeedSelector {
  Author,
  Favorited,
}

export const AuthorPage = () => {
  const { author } = useParams();
  const authorName = author ? author : "";
  const token = localStorageService.getToken() || "";
  const dispatch = useAppDispatch();

  const [feedSelector, setFeedSelector] = useState(FeedSelector.Author);

  //pagination
  const [currentPaginationOffset, setCurrentPaginationOffset] = useState(0);
  const [pageCounter, setPageCounter] = useState<number[]>([0]);
  const [limit, setLimit] = useState(10);
  const [activePage, setActivePage] = useState(1);

  const {
    data: userInfoData,
    isLoading: userInfoIsLoading,
    error: userInfoIsError,
  } = blogAPI.useGetUserInfoByTokenQuery();
  
  const [
    getAuthorPostsTrigger,
    {
      data: authorPosts,
      isLoading: isAuthorPostsLoading,
      isFetching: isAuthorPostsFetching,
      isError: isAuthorPostsError,
    },
  ] = blogAPI.useLazyGetAuthorPostsQuery();

  const [
    getAuthorFavouritePostsQuery,
    {
      data: authorLikedPosts,
      isFetching: isAuthorLikedPostsFetching,
      isLoading: isAuthorLikedPostsLoading,
      isError: isAuthorLikedPostsError,
    },
  ] = blogAPI.useLazyGetAuthorFavoritedPostsQuery();

  const postsToRender =
    feedSelector === FeedSelector.Author ? authorPosts : authorLikedPosts;
  const checkActive = (feed: FeedSelector) => {
    if (feed === feedSelector) return Author.activeFeed;
  };

  // useEffect(() => {
  //   if (token) {
  //     getUserInfoTrigger(token)
  //       .unwrap()
  //       .then((resp: any) => {
  //         const { email, username, bio, image } = resp.user;
  //         const userDataFromServer = {
  //           name: username,
  //           bio: bio,
  //           email: email,
  //           imageURL: image,
  //         };
  //         dispatch(userSlice.actions.setIsLogined(userDataFromServer));
  //       });
  //   }
  // }, []);

  useEffect(() => {
    if (postsToRender === authorPosts) {
      // setPageCounter([0]);
      getAuthorPostsTrigger({
        author: authorName,
        token: token,
        offset: currentPaginationOffset,
        limit: limit,
      })
        .unwrap()
        .then((resp: any) => {
          if (resp.articlesCount) {
            const restOfDiv = resp.articlesCount % limit;
            const divResult = Math.ceil(resp.articlesCount / limit);
            const certainDiv = resp.articleCount / limit;
            restOfDiv > 0
              ? setPageCounter([...Array(divResult)])
              : setPageCounter([...Array(certainDiv)]);
          } else {
            setPageCounter([0]);
          }
        });
    }
    if (postsToRender === authorLikedPosts) {
      // setPageCounter([0]);
      getAuthorFavouritePostsQuery({
        author: authorName,
        token: token,
        offset: currentPaginationOffset,
        limit: limit,
      })
        .unwrap()
        .then((resp: any) => {
          if (resp.articlesCount) {
            const restOfDiv = resp.articlesCount % limit;
            const divResult = Math.ceil(resp.articlesCount / limit);
            const certainDiv = resp.articleCount / limit;
            restOfDiv > 0
              ? setPageCounter([...Array(divResult)])
              : setPageCounter([...Array(certainDiv)]);
          } else {
            setPageCounter([0]);
          }
        });
    }
  }, [currentPaginationOffset, postsToRender]);

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
          {isError && "some error occured"}

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

          <div className={Author.paginationWrapper}>
            {pageCounter.length > 1 &&
              pageCounter.map((item, i) => (
                <PaginationButton
                  isActive={activePage === i + 1}
                  num={i + 1}
                  key={i}
                  onClick={() => {
                    setCurrentPaginationOffset(i * limit);
                    setActivePage(i + 1);
                  }}
                />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
