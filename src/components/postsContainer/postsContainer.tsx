import { NavLink } from "react-router-dom";
import Posts from "./posts.module.scss";
import { Post } from "../post/post";
import { PopularTags } from "../popularTags/popularTags";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { stateSelectors } from "../../store";
import { useState } from "react";
import classNames from "classnames";
import { Feed, userSlice } from "../../store/slices/userSlice";
import { blogAPI } from "../../services/blogService";
import { ErrorNotification } from "../errorNotification/errorNotification";

export const PostsContainer = () => {
  const userDataState = useAppSelector(stateSelectors.userSliceData);
  const dispatch = useAppDispatch();
  // const [isNotLoginedError, setisNotLoginedError] = useState(false);
  const { selectedTagName, feed, isLogined, showIsNotLoginedError } =
    userDataState;

  const {
    data: globalFeed,
    error,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = blogAPI.useGetGlobalPostsQuery("");

  const {
    data: feedByTag,
    error: errorByTag,
    isLoading: isLoadingByTag,
  } = blogAPI.useGetGlobalFeedByTagQuery(selectedTagName);
  console.log(globalFeed);

  let setActiveToRender;
  switch (feed) {
    case `${Feed.GlobalFeed}`:
      setActiveToRender = globalFeed;
      break;
    case `${Feed.Tag}`:
      setActiveToRender = feedByTag;
      break;
    default:
      setActiveToRender = globalFeed;
  }

  const checkActive = (feed: Feed) => {
    if (userDataState.feed === feed) return Posts.activeFeed;
  };
  const setActive = (feed: Feed) => {
    dispatch(userSlice.actions.setActiveFeed(feed));
  };

  return (
    <div className={`${Posts.adaptiveLayout} ${Posts.postsContainer}`}>
      <div className={Posts.posts}>
        <div className={Posts.feedTooglePanel}>
          <div
            className={checkActive(Feed.GlobalFeed)}
            onClick={() => {
              setActive(Feed.GlobalFeed);
              refetch();
            }}
          >
            Global Feed
          </div>
          <div
            className={checkActive(Feed.MyFeed)}
            onClick={() => {
              if (isLogined) {
                setActive(Feed.MyFeed);
                refetch();
              } else {
                // showIsNotLoginedErrorAndHideAfter5sec();
              }
            }}
          >
            My Feed
          </div>

          {feed === Feed.Tag ? (
            <div className={checkActive(Feed.Tag)}>
              <span># </span>
              {selectedTagName}
            </div>
          ) : null}
        </div>

        {isLoading && "loading..."}
        {isError && "SomeError"}

        {setActiveToRender &&
          setActiveToRender.articles.map((item: any, index: number) => (
            <Post
              author={item.author.username}
              title={item.title}
              mainText={item.body}
              key={index}
              isLiked={item.favorite}
              likeCount={item.favoritesCount}
              createdAt={item.createdAt}
              tagsList={item.tagList}
              slug={item.slug}
              imgURL={item.author.image}
            />
          ))}
      </div>

      <div className={Posts.tags}>
        <PopularTags />
      </div>
    </div>
  );
};
