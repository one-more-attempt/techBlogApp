import { NavLink } from "react-router-dom";
import Posts from "./posts.module.scss";
import { Post } from "../post/post";
import { PopularTags } from "../popularTags/popularTags";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { stateSelectors } from "../../store";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { Feed, userSlice } from "../../store/slices/userSlice";
import { blogAPI } from "../../api/blogAPI";
import { ErrorNotification } from "../errorNotification/errorNotification";
import { localStorageService } from "../../services/LSService";
import { ReactComponent as Spinner } from "../../img/spinner.svg";

export const PostsContainer = () => {
  const token = localStorageService.getToken();
  const userDataState = useAppSelector(stateSelectors.userSliceData);
  const dispatch = useAppDispatch();
  const { selectedTagName, feed, isLogined } = userDataState;

  const {
    data: globalFeed,
    isLoading: isLoadingGlobalFeed,
    isFetching: isFetchingGlobalFeed,
    isError: isErrorGlobalFeed,
  } = blogAPI.useGetGlobalPostsQuery(token ? token : "");

  const [
    myFeedTrigger,
    {
      data: myFeed,
      isLoading: isLoadingMyFeed,
      isFetching: isFetchingMyFeed,
      isError: isErrorMyFeed,
    },
  ] = blogAPI.useLazyGetMyFeedQuery();

  useEffect(() => {
    if (token) {
      myFeedTrigger(token);
    }
  });
  const {
    data: feedByTag,
    isError: isErrorByTag,
    isLoading: isLoadingFeedByTag,
    isFetching: isFetchingFeedByTag,
  } = blogAPI.useGetGlobalFeedByTagQuery({
    tagname: selectedTagName,
    token: token ? token : "",
  });

  console.log(globalFeed);

  let setActiveToRender;
  switch (feed) {
    case `${Feed.GlobalFeed}`:
      setActiveToRender = globalFeed;
      break;
    case `${Feed.MyFeed}`:
      setActiveToRender = myFeed;
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

  const isUpdating = isFetchingFeedByTag || isFetchingGlobalFeed ? true : false;
  const isLoading =
    isLoadingFeedByTag || isLoadingGlobalFeed || isLoadingMyFeed;
  const isError = isErrorByTag || isErrorGlobalFeed || isErrorMyFeed;

  return (
    <div className={`${Posts.adaptiveLayout} ${Posts.postsContainer}`}>
      <div className={Posts.posts}>
        <div className={Posts.feedTooglePanel}>
          <div
            className={checkActive(Feed.GlobalFeed)}
            onClick={() => {
              setActive(Feed.GlobalFeed);
            }}
          >
            Global Feed
          </div>
          <div
            className={checkActive(Feed.MyFeed)}
            onClick={() => {
              if (isLogined) {
                setActive(Feed.MyFeed);
              } else {
                alert("Need to be authorized to unlock this feature");
              }
            }}
          >
            My Feed
          </div>
          {selectedTagName ? (
            <div
              className={checkActive(Feed.Tag)}
              onClick={() => {
                setActive(Feed.Tag);
              }}
            >
              <span># </span>
              {selectedTagName}
            </div>
          ) : null}
        </div>

        {isLoading && <div className={Posts.alerts}>Loading...</div>}
        {isError && <div className={Posts.alerts}>Some Error Ocured</div>}

        {setActiveToRender &&
          setActiveToRender.articles.map((item: any, index: number) => (
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
              isUpdating={isUpdating}
            />
          ))}
      </div>

      <div className={Posts.tags}>
        <PopularTags />
      </div>
    </div>
  );
};
