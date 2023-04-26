import ArtBanner from "./articleBanner.module.scss";
import { PostUserInfo } from "../postInfo/PostUserInfo";
import { FollowButton } from "../buttons/followButton/followButton";
import { LikePostButton } from "../buttons/likePostButton/likePostButton";
import { PostActionPanel } from "../postActionPanel/postActionPanel";

type ArticleBannerProps = {
  title: string;
  author: string;
  date: string;
  favorited: boolean;
  following: boolean;
  likesCount: number;
  imgURL: string;
};

export const ArticleBanner = ({
  title,
  author,
  date,
  favorited,
  following,
  likesCount,
  imgURL
}: ArticleBannerProps) => {
  return (
    <div className={`${ArtBanner.articleBannerWrapper}`}>
      <div className={`${ArtBanner.container} ${ArtBanner.adaptiveLayout}`}>
        <h1>{title}</h1>

        <PostActionPanel
          author={author}
          date={date}
          isLiked={favorited}
          isFollowing={following}
          darkMode={true}
          likesCount= {likesCount}
          imgURL = {imgURL}
          
        />
      </div>
    </div>
  );
};
