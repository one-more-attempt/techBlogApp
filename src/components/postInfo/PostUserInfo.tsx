import PostInfo from "./postInfo.module.scss";
import Avatar from "@mui/material/Avatar";

export const PostUserInfo = () => {
  return (
    <div className={PostInfo.postInfo}>
    <div className={PostInfo.postAvatar}>
      <Avatar src="/broken-image.jpg" />
    </div>

    <div className={PostInfo.postDetails}>
      <div className={PostInfo.postAuthor}>Anah Benešová</div>
      <div className={PostInfo.postDate}>December 9, 2022</div>
    </div>
  </div>
  )

};
