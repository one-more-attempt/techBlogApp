import ArtHead from "./articleHeader.module.scss";
import { PostUserInfo } from "../postInfo/PostUserInfo";
import { FollowButton } from "../buttons/followButton/followButton";
import { LikePostButton } from "../buttons/likePostButton/likePostButton";

export const ArticleHeader = () => {
  return (
    <div className={`${ArtHead.articleHeaderWrapper}`}>
      <div className={`${ArtHead.container} ${ArtHead.adaptiveLayout}`}>
        <h1>
          Try to transmit the HTTP card, maybe it will override the multi-byte
          hard drive!
        </h1>
        <div className={ArtHead.userInfo}>
          <PostUserInfo />

          <FollowButton />
          <LikePostButton />
        </div>
      </div>
    </div>
  );
};
