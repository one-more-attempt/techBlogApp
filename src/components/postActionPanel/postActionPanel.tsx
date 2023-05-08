import { useEffect, useState } from "react";
import { blogAPI } from "../../api/blogAPI";
import { localStorageService } from "../../services/LSService";
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

  const token = localStorageService.getToken();
  const [follow, { data: followData, isLoading: isFollowDataLoading }] =
    blogAPI.useFollowAuthorMutation();
  const [unFollow, { data: unFollowData, isLoading: isUnfollowDataLoading }] =
    blogAPI.useUnFollowAuthorMutation();
  const [likePost, { data: likePostData, isLoading: isLikePostLoading }] =
    blogAPI.useLikePostMutation();
  const [unLikePost, { data: unlikePostData, isLoading: isUnlikePostLoading }] =
    blogAPI.useUnlikePostMutation();

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

  return (
    <>
      <div className={PostActPanel.actionPanelWrapper}>
        <PostUserInfo
          darkMode={darkMode}
          author={author}
          createdAt={date}
          imgURL={imgURL}
        />
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
      </div>
    </>
  );
};
