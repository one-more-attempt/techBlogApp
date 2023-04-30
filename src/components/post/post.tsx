import PostStyles from "./post.module.scss";
import { PostUserInfo } from "../postInfo/PostUserInfo";
import { LikeCounterButton } from "../buttons/likeCounterButton/likeCounterButton";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../routes/routePathes";
import { PostTagsBlock } from "../postTagsBlock/postTagsBlock";
import { blogAPI } from "../../api/blogAPI";
import { localStorageService } from "../../services/LSService";
import { useEffect, useState } from "react";

type PostProps = {
  author: string;
  title: string;
  mainText: string;
  tags?: string[];
  isLiked: boolean;
  likeCount: number;
  createdAt: string;
  tagsList: string[];
  slug: string;
  imgURL: string;
  isUpdating?: boolean;
};

export const Post = ({
  author,
  title,
  mainText,
  isLiked,
  likeCount,
  createdAt,
  tagsList,
  slug,
  imgURL,
  isUpdating,
}: PostProps) => {
  const [likePost, { data: likePostData, isLoading: isLikePostLoading }] =
    blogAPI.useLikePostMutation();
  const [unLikePost, { data: unlikePostData, isLoading: isUnlikePostLoading }] =
    blogAPI.useUnlikePostMutation();

  const token = localStorageService.getToken();
  const limitedText =
    mainText.length > 500 ? mainText.slice(0, 500).concat("...") : mainText;
  const limitedtitle =
    title.length > 500 ? title.slice(0, 500).concat("...") : title;

  const goToLikePost = () => {
    likePost({
      token: token ? token : "",
      post: slug,
    })
      .unwrap()
      .then((resp) => console.log(`refetch`));
  };
  const goToUnLikePost = () => {
    unLikePost({
      token: token ? token : "",
      post: slug,
    })
      .unwrap()
      .then((resp) => console.log(`refetch`));
  };

  const likeHandler = () => {
    if (token) {
      if (isLiked) {
        goToUnLikePost();
      } else {
        goToLikePost();
      }
    } else {
      alert("Need to be authorized to unlock this feature")
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isLikePostLoading || isUnlikePostLoading) {
      setIsLoading(true);
    } else {
      if (!isUpdating) {
        setIsLoading(false);
      }
    }
  });

  return (
    <div className={PostStyles.postWrapper}>
      <div className={PostStyles.postHeader}>
        <PostUserInfo
          darkMode={false}
          author={author}
          createdAt={createdAt}
          imgURL={imgURL}
        />
        <LikeCounterButton
          isLiked={isLiked}
          likeCount={likeCount}
          likeHandler={likeHandler}
          isLoading={isLoading}
        />
      </div>
      <div className={PostStyles.postBody}>
        <div className={PostStyles.postBodyTitle}>
          <Link to={ROUTE_PATH.SELECTED_POST_DYNAMIC(slug)}>
            {limitedtitle}
          </Link>
        </div>
        <div className={PostStyles.postBodyMainText}>{limitedText}</div>
      </div>
      <div className={PostStyles.postFooter}>
        <div className={PostStyles.readMore}>
          <Link to={ROUTE_PATH.SELECTED_POST_DYNAMIC(slug)}>Read more...</Link>
        </div>
        <PostTagsBlock tagsList={tagsList} />
      </div>
    </div>
  );
};
