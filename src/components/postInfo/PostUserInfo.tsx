import classNames from "classnames";
import PostInfo from "./postInfo.module.scss";
import Avatar from "@mui/material/Avatar";
// let cn = classNames.bind(PostInfo);

type Props = {
  darkMode: boolean;
};

export const PostUserInfo = ({ darkMode }: Props) => {
  const postAuthorColorMode = classNames(PostInfo.postAuthorLight, {
    [PostInfo.postAuthorDarkMode]: darkMode,
  });
  const postDateColorMode = classNames(PostInfo.postDateLight, {
    [PostInfo.postDateDarkMode]: darkMode,
  });

  return (
    <div className={PostInfo.postInfo}>
      <div className={PostInfo.postAvatar}>
        <Avatar src="/broken-image.jpg" />
      </div>

      <div className={PostInfo.postDetails}>
        <div className={postAuthorColorMode}>Anah Benešová</div>
        <div className={postDateColorMode}>December 9, 2022</div>
      </div>
    </div>
  );
};
