import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { blogAPI } from "../../api/blogAPI";
import { ROUTE_PATH } from "../../routes/routePathes";
import { localStorageService } from "../../services/LSService";
import { stateSelectors } from "../../store";
import { useAppSelector } from "../../store/hooks/redux-hooks";
import { DeletePostButton } from "../buttons/deleteButton/deleteButton";
import { EditPostButton } from "../buttons/editButton/editButton";
import { FollowButton } from "../buttons/followButton/followButton";
import { LikePostButton } from "../buttons/likePostButton/likePostButton";
import { PostUserInfo } from "../postInfo/PostUserInfo";
import PostActPanel from "./postActionPanel.module.scss";

type PostActionPanelProps = {
  author: string;
  darkMode: boolean;
  date: string;
  isLiked: boolean;
  following: boolean;
  likesCount: number;
  imgURL: string;
  isPostUpdating: boolean;
  slug: string;
};

export const PostActionPanel = ({
  author,
  isLiked,
  following,
  likesCount,
  darkMode,
  imgURL,
  isPostUpdating,
  date,
  slug,
}: PostActionPanelProps) => {
  const navigate = useNavigate();
  const userDataState = useAppSelector(stateSelectors.userSliceData);
  const userName = userDataState.userName;
  const token = localStorageService.getToken();

  const [follow, { data: followData, isLoading: isFollowDataLoading }] =
    blogAPI.useFollowAuthorMutation();
  const [unFollow, { data: unFollowData, isLoading: isUnfollowDataLoading }] =
    blogAPI.useUnFollowAuthorMutation();
  const [likePost, { data: likePostData, isLoading: isLikePostLoading }] =
    blogAPI.useLikePostMutation();
  const [unLikePost, { data: unlikePostData, isLoading: isUnlikePostLoading }] =
    blogAPI.useUnlikePostMutation();

  const [deletePost, { data: deletePostData, isLoading: deletePostIsLoading, isError }] =
    blogAPI.useDeleteSelectedPostMutation();

  const followHandler = () => {
    if (token) {
      if (following) {
        unFollow({
          token: token ? token : "",
          author: author,
        });
      } else {
        follow({
          token: token ? token : "",
          author: author,
        });
      }
    } else {
      alert("Need to be authorized to unlock this feature");
    }
  };

  const likeHandler = () => {
    if (token) {
      if (isLiked) {
        unLikePost({
          token: token ? token : "",
          post: slug,
        });
      } else {
        likePost({
          token: token ? token : "",
          post: slug,
        });
      }
    } else {
      alert("Need to be authorized to unlock this feature");
    }
  };

  const deletePostHandler = () => {
    deletePost({ token, slug })
      .unwrap()
      .then((res) => navigate(ROUTE_PATH.MAIN))
      .catch((err) => {
        console.log(err);
      });
  };

  
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  useEffect(() => {
    //follow loading status
    if (isFollowDataLoading || isUnfollowDataLoading) {
      setIsFollowLoading(true);
    } else {
      if (!isPostUpdating) {
        setIsFollowLoading(false);
      }
    }
    //like loading status
    if (isLikePostLoading || isUnlikePostLoading) {
      setIsLikeLoading(true);
    } else {
      if (!isPostUpdating) {
        setIsLikeLoading(false);
      }
    }
  });

  const activeButtons =
    author !== userName ? (
      <>
        <FollowButton
          darkMode={darkMode}
          isFollow={following}
          author={author}
          followHandler={followHandler}
          isLoading={isFollowLoading}
        />
        <LikePostButton
          darkMode={darkMode}
          isLiked={isLiked}
          likesCount={likesCount}
          isLoading={isLikeLoading}
          likeHandler={likeHandler}
        />
      </>
    ) : (
      <>
        <DeletePostButton darkMode={darkMode} onClick={deletePostHandler} />
        <EditPostButton darkMode={darkMode} onClick={() => {}} />
      </>
    );
  return (
    <>
      <div className={PostActPanel.actionPanelWrapper}>
        <PostUserInfo
          darkMode={darkMode}
          author={author}
          createdAt={date}
          imgURL={imgURL}
        />
        {activeButtons}
      </div>
    </>
  );
};
