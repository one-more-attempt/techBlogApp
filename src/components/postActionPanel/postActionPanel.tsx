import { FollowButton } from "../buttons/followButton/followButton";
import { LikePostButton } from "../buttons/likePostButton/likePostButton";
import { PostUserInfo } from "../postInfo/PostUserInfo";
import PostActPanel from "./postActionPanel.module.scss";

type PostActionPanelProps = {
  author: string;
  darkMode: boolean;
  date: string;
  isLiked: boolean;
  isFollowing: boolean;
  likesCount: number;
  imgURL: string;
};
export const PostActionPanel = ({
  author,
  isLiked,
  isFollowing,
  likesCount,
  darkMode,
  imgURL,
}: PostActionPanelProps) => (
  <>
    <div className={PostActPanel.actionPanelWrapper}>
      <PostUserInfo
        darkMode={darkMode}
        author={author}
        createdAt={"2022-12-09T13:46:24.264Z"}
        imgURL={imgURL}
      />
      <FollowButton
        darkMode={darkMode}
        isFollow={isFollowing}
        author={author}
      />
      <LikePostButton
        darkMode={darkMode}
        isLiked={isLiked}
        likesCount={likesCount}
      />
    </div>
  </>
);
