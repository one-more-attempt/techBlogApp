import ArtBanner from "./articleBanner.module.scss";
import { PostUserInfo } from "../postInfo/PostUserInfo";
import { FollowButton } from "../buttons/followButton/followButton";
import { LikePostButton } from "../buttons/likePostButton/likePostButton";
import { PostActionPanel } from "../postActionPanel/postActionPanel";
import { blogAPI } from "../../api/blogAPI";
import { localStorageService } from "../../services/LSService";

type ArticleBannerProps = {
  title: string;
  slug: string;
  author: string;
  date: string;
  favorited: boolean;
  following: boolean;
  likesCount: number;
  imgURL: string;
  isPostUpdating: boolean;
};

export const ArticleBanner = ({
  title,
  author,
  date,
  favorited,
  following,
  likesCount,
  imgURL,
  isPostUpdating,
  slug,
}: ArticleBannerProps) => {
  return (
    <div className={`${ArtBanner.articleBannerWrapper}`}>
      <div className={`${ArtBanner.container} ${ArtBanner.adaptiveLayout}`}>
        <h1>{title}</h1>
        <PostActionPanel
          author={author}
          date={date}
          isLiked={favorited}
          following={following}
          darkMode={true}
          likesCount={likesCount}
          imgURL={imgURL}
          isPostUpdating={isPostUpdating}
          slug={slug}
        />
      </div>
    </div>
  );
};
