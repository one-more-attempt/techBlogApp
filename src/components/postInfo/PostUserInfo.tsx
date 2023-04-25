import classNames from "classnames";
import PostInfo from "./postInfo.module.scss";
import Avatar from "@mui/material/Avatar";
import moment from "moment";

type PostUserInfoProps = {
  darkMode: boolean;
  author: string;
  createdAt: string;
  imgURL: string;
};

export const PostUserInfo = ({
  darkMode,
  author,
  createdAt,
  imgURL,
}: PostUserInfoProps) => {
  const postAuthorColorMode = classNames(PostInfo.postAuthorLight, {
    [PostInfo.postAuthorDarkMode]: darkMode,
  });
  const postDateColorMode = classNames(PostInfo.postDateLight, {
    [PostInfo.postDateDarkMode]: darkMode,
  });

  return (
    <div className={PostInfo.postInfo}>
      <div className={PostInfo.postAvatar}>
        <img src={imgURL} alt="" />
      </div>

      <div className={PostInfo.postDetails}>
        <div className={postAuthorColorMode}>{author}</div>
        <div className={postDateColorMode}>
          {moment(createdAt).format("MMMM D, YYYY")}
        </div>
      </div>
    </div>
  );
};
