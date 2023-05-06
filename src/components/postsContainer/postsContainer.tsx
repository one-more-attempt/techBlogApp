import { NavLink } from "react-router-dom";
import Posts from "./posts.module.scss";
import { Post } from "../post/post";
import { PopularTags } from "../popularTags/popularTags";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { stateSelectors } from "../../store";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { userSlice, userSliceActions } from "../../store/slices/userSlice";

import { blogAPI } from "../../api/blogAPI";
import { ErrorNotification } from "../errorNotification/errorNotification";
import { localStorageService } from "../../services/LSService";
import { ReactComponent as Spinner } from "../../img/spinner.svg";
import { getPostsResponse } from "../../types/types";

export enum Feed {
  GlobalFeed = "GLOBAL_FEED",
  MyFeed = "MY_FEED",
  Tag = "TAG",
}

export const PostsContainer = () => {
  //login
  const token = localStorageService.getToken() || "";
  const userDataState = useAppSelector(stateSelectors.userSliceData);

  //feed selector
  const [activeFeed, setActiveFeed] = useState<string>(Feed.GlobalFeed);
  const [selectedPopularTag, setSelectedPopularTag] = useState("");

  //pagination
  const [currentPaginationOffset, setCurrentPaginationOffset] = useState(0);
  const [pageCounter, setPageCounter] = useState(0);
  const [limit, setLimit] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const { isLogined } = userDataState;

  //data
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

  const [
    globalFeedByTagTrigger,
    {
      data: feedByTag,
      isError: isErrorByTag,
      isLoading: isLoadingFeedByTag,
      isFetching: isFetchingFeedByTag,
    },
  ] = blogAPI.useLazyGetGlobalFeedByTagQuery();

  let activeToRender: getPostsResponse | undefined;

  if (activeFeed === Feed.GlobalFeed) {
    activeToRender = globalFeed;
  }
  if (activeFeed === Feed.MyFeed) {
    console.log(`==`);

    activeToRender = myFeed;
  }
  if (activeFeed === Feed.Tag) {
    activeToRender = feedByTag;
  }

  useEffect(() => {
    if (activeToRender === globalFeed) {
      getGlobalFeedTrigger({
        token: "",
        offset: currentPaginationOffset,
        limit,
      })
        .unwrap()
        .then((resp) => {
          const restOfDiv = resp.articlesCount % limit;
          const divResult = Math.ceil(resp.articlesCount / limit);
          const certainDiv = resp.articlesCount / limit;
          restOfDiv > 0
            ? setPageCounter(divResult)
            : setPageCounter(certainDiv);
        });
    }

    if (activeToRender === myFeed) {
      myFeedTrigger({
        token,
        offset: currentPaginationOffset,
        limit,
      })
        .unwrap()
        .then((resp) => {
          const restOfDiv = resp.articlesCount % limit;
          const divResult = Math.ceil(resp.articlesCount / limit);
          const certainDiv = resp.articlesCount / limit;
          restOfDiv > 0
            ? setPageCounter(divResult)
            : setPageCounter(certainDiv);
        });
    }
    if (activeToRender === feedByTag) {
      globalFeedByTagTrigger({
        tagname: selectedPopularTag,
        token: token,
        offset: currentPaginationOffset,
        limit: limit,
      })
        .unwrap()
        .then((resp) => {
          const restOfDiv = resp.articlesCount % limit;
          const divResult = Math.ceil(resp.articlesCount / limit);
          const certainDiv = resp.articlesCount / limit;
          restOfDiv > 0
            ? setPageCounter(divResult)
            : setPageCounter(certainDiv);
        });
    }
  }, [currentPaginationOffset, activeToRender, selectedPopularTag]);

  const checkActive = (feed: Feed) => {
    if (activeFeed === feed) return Posts.activeFeed;
  };

  const isUpdating =
    isFetchingFeedByTag || isFetchingGlobalFeed || isFetchingMyFeed;
  const isLoading =
    isLoadingFeedByTag || isLoadingGlobalFeed || isLoadingMyFeed;
  const isError = isErrorByTag || isErrorGlobalFeed || isErrorMyFeed;

  console.log(activeToRender);
  // console.log(pageCounter);

  const feedSelectorHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isNeedToCheckAuthStatus: boolean
  ) => {
    if (isNeedToCheckAuthStatus) {
      if (isLogined) {
        setActiveFeed(Feed.MyFeed);
        setPageCounter(0);
      } else {
        alert("Need to be authorized to unlock this feature");
      }
    } else {
      setActiveFeed(event.currentTarget.name);
      setPageCounter(0);
    }
  };

  return (
    <div className={`${Posts.adaptiveLayout} ${Posts.postsContainer}`}>
      <div className={Posts.posts}>
        <div className={Posts.feedTooglePanel}>
          <button
            name={Feed.GlobalFeed}
            className={checkActive(Feed.GlobalFeed)}
            onClick={(event) => {
              feedSelectorHandler(event, false);
            }}
          >
            Global Feed
          </button>
          <button
            className={checkActive(Feed.MyFeed)}
            name={Feed.MyFeed}
            onClick={(event) => {
              feedSelectorHandler(event, true);
            }}
          >
            My Feed
          </button>
          {selectedPopularTag && (
            <button
              className={checkActive(Feed.Tag)}
              name={Feed.Tag}
              onClick={(event) => {
                feedSelectorHandler(event, false);
              }}
            >
              <span># </span>
              {selectedPopularTag}
            </button>
          )}
        </div>

        {isLoading ||
          (isUpdating && <div className={Posts.alerts}>Loading...</div>)}
        {isError && <div className={Posts.alerts}>Some Error Ocured</div>}

        {activeToRender &&
          activeToRender.articles.map((item: any, index: number) => (
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

        <div className={Posts.paginationWrapper}>
          {pageCounter && !isLoading
            ? [...Array(pageCounter)].map((item, i) => (
                <button
                  className={`${Posts.paginationButton} ${
                    activePage === i + 1 ? Posts.active : ""
                  } `}
                  key={i}
                  onClick={() => {
                    setCurrentPaginationOffset(i * limit);
                    setActivePage(i + 1);
                  }}
                >
                  {i + 1}
                </button>
              ))
            : null}
        </div>
      </div>

      <div className={Posts.tags}>
        <PopularTags
          setSelectedPopularTag={setSelectedPopularTag}
          setActiveFeed={setActiveFeed}
          setPageCounter={setPageCounter}
        />
      </div>
    </div>
  );
};
