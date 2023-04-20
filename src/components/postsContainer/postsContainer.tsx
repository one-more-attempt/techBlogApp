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

export const PostsContainer = () => {
  const userDataState = useAppSelector(stateSelectors.userSliceData);
  const dispatch = useAppDispatch();
  const selectedTag = userDataState.selectedTagName;

  const {
    data: globalFeed,
    error,
    isLoading,
    isSuccess,
    refetch,
  } = blogAPI.useGetGlobalPostsQuery("");

  const {
    data: feedByTag,
    error: errorByTag,
    isLoading: isLoadingByTag,
  } = blogAPI.useGetGlobalFeedByTagQuery(selectedTag);
  // console.log(feedByTag);

  const checkActive = (feed: Feed) => {
    if (userDataState.feed === feed) return Posts.activeFeed;
  };
  const setActive = (feed: Feed) => {
    dispatch(userSlice.actions.setActiveFeed(feed));
  };
  const activeFeed = userDataState.feed;

  let setActiveToRender;
  switch (activeFeed) {
    case `${Feed.GlobalFeed}`:
      setActiveToRender = globalFeed;
      break;
    case `${Feed.Tag}`:
      setActiveToRender = feedByTag;
      break;
    default:
      setActiveToRender = globalFeed;
  }

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
              setActive(Feed.MyFeed);
              refetch();
            }}
          >
            My Feed
          </div>

          {userDataState.feed === Feed.Tag ? (
            <div className={checkActive(Feed.Tag)}>
              <span># </span>
              {userDataState.selectedTagName}
            </div>
          ) : null}
        </div>

        {/* {isLoading && "loading"} */}

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
              tagList={item.tagList}
            />
          ))}
      </div>
      <div className={Posts.tags}>
        <PopularTags />
      </div>
    </div>
  );
};
