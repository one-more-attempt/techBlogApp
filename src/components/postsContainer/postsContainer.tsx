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
import { PaginationButton } from "../paginationButton/PaginationButton";

export enum Feed {
  GlobalFeed = "GLOBAL_FEED",
  MyFeed = "MY_FEED",
  Tag = "TAG",
}

export const PostsContainer = () => {
  //login
  const token = localStorageService.getToken() || "";
  const userDataState = useAppSelector(stateSelectors.userSliceData);

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

  //pagination
  const [currentPaginationOffset, setCurrentPaginationOffset] = useState(0);
  const [pageCounter, setPageCounter] = useState<number[]>([0]);
  const [limit, setLimit] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const { isLogined } = userDataState;

  //feed selector
  const [activeFeed, setActiveFeed] = useState<string>(Feed.GlobalFeed);
  const [selectedPopularTag, setSelectedPopularTag] = useState("");

  //render
  const [activeToRender, setActiveToRender] = useState<
    getPostsResponse | undefined
  >();

  const paginationHandler = (data: getPostsResponse) => {
    const restOfDiv = data.articlesCount % limit;
    const divResult = Math.ceil(data.articlesCount / limit);
    const certainDiv = data.articlesCount / limit;
    restOfDiv > 0
      ? setPageCounter([...Array(divResult)])
      : setPageCounter([...Array(certainDiv)]);
    setActiveToRender(data);
  };

  useEffect(() => {
    if (activeFeed === Feed.GlobalFeed) {
      getGlobalFeedTrigger({
        token: "",
        offset: currentPaginationOffset,
        limit,
      })
        .unwrap()
        .then((resp) => {
          paginationHandler(resp);
        });
    }
    if (activeFeed === Feed.MyFeed) {
      myFeedTrigger({
        token,
        offset: currentPaginationOffset,
        limit,
      })
        .unwrap()
        .then((resp) => {
          paginationHandler(resp);
        });
    }
    if (activeFeed === Feed.Tag) {
      globalFeedByTagTrigger({
        tagname: selectedPopularTag,
        token: token,
        offset: currentPaginationOffset,
        limit: limit,
      })
        .unwrap()
        .then((resp) => {
          paginationHandler(resp);
        });
    }
  }, [activeFeed, selectedPopularTag, currentPaginationOffset]);

  const checkActive = (feed: Feed) => {
    if (activeFeed === feed) return Posts.activeFeed;
  };

  const isUpdating =
    isFetchingFeedByTag || isFetchingGlobalFeed || isFetchingMyFeed;
  const isLoading =
    isLoadingFeedByTag || isLoadingGlobalFeed || isLoadingMyFeed;
  const isError = isErrorByTag || isErrorGlobalFeed || isErrorMyFeed;

  const feedSelectorHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isNeedToCheckAuthStatus: boolean
  ) => {
    if (isNeedToCheckAuthStatus) {
      if (isLogined) {
        setActiveFeed(Feed.MyFeed);
        setPageCounter([...Array(0)]);
      } else {
        alert("Need to be authorized to unlock this feature");
      }
    } else {
      setActiveFeed(event.currentTarget.name);
      setPageCounter([...Array(0)]);
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

        {(isLoading || isUpdating) && (
          <div className={Posts.alerts}>Loading...</div>
        )}
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
