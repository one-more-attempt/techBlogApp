import { NavLink } from "react-router-dom";
import Posts from "./posts.module.scss";
import { Post } from "../post/post";
import { PopularTags } from "../popularTags/popularTags";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { stateSelectors } from "../../store";
import { useEffect, useState } from "react";
import classNames from "classnames";
import {
  Feed,
  userSlice,
  userSliceActions,
} from "../../store/slices/userSlice";
import { blogAPI } from "../../api/blogAPI";
import { ErrorNotification } from "../errorNotification/errorNotification";
import { localStorageService } from "../../services/LSService";
import { ReactComponent as Spinner } from "../../img/spinner.svg";

export const PostsContainer = () => {
  const token = localStorageService.getToken() || "";
  const userDataState = useAppSelector(stateSelectors.userSliceData);
  const dispatch = useAppDispatch();

  const [currentPaginationOffset, setCurrentPaginationOffset] = useState(0);
  const [pageCounter, setPageCounter] = useState(0);
  const [limit, setLimit] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const { selectedTagName, feed, isLogined } = userDataState;

  const [
    getGlobalFeedTrigger,
    {
      data: globalFeed,
      isLoading: isLoadingGlobalFeed,
      isFetching: isFetchingGlobalFeed,
      isError: isErrorGlobalFeed,
    },
  ] = blogAPI.useLazyGetGlobalPostsQuery();

  const [
    myFeedTrigger,
    {
      data: myFeed,
      isLoading: isLoadingMyFeed,
      isFetching: isFetchingMyFeed,
      isError: isErrorMyFeed,
    },
  ] = blogAPI.useLazyGetMyFeedQuery();

  const {
    data: feedByTag,
    isError: isErrorByTag,
    isLoading: isLoadingFeedByTag,
    isFetching: isFetchingFeedByTag,
  } = blogAPI.useGetGlobalFeedByTagQuery({
    tagname: selectedTagName,
    token: token ? token : "",
  });

  useEffect(() => {
    if (token) {
      myFeedTrigger(token);
    }
  }, []);

  useEffect(() => {
    getGlobalFeedTrigger({
      token,
      offset: currentPaginationOffset,
      limit,
    })
      .unwrap()
      .then((resp) => {
        // typeof ()resp.articlesCount);
        const restOfDiv = resp.articlesCount % limit;
        const divResult = Math.ceil(resp.articlesCount / limit);
        const certainDiv = resp.articleCount / limit;
        restOfDiv > 0 ? setPageCounter(divResult) : setPageCounter(certainDiv);
      });
  }, [currentPaginationOffset]);

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
    dispatch(userSliceActions.setActiveFeed(feed));
  };

  const isUpdating = isFetchingFeedByTag || isFetchingGlobalFeed ? true : false;
  const isLoading =
    isLoadingFeedByTag || isLoadingGlobalFeed || isLoadingMyFeed;
  const isError = isErrorByTag || isErrorGlobalFeed || isErrorMyFeed;

  console.log(globalFeed);
  console.log(pageCounter);

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

        <div>
          {[...Array(pageCounter)].map((item, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentPaginationOffset(i * limit);
                setActivePage(i+1)
              }}
            >
              {i + 1}

              { activePage === (i+1) ? "+" : ""}
            </button>
          ))}
          {isFetchingGlobalFeed && (
            <div className={Posts.alerts}>Loading...</div>
          )}
        </div>
      </div>

      <div className={Posts.tags}>
        <PopularTags />
      </div>
    </div>
  );
};
