import LikeBtn from "./likePost.module.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const LikePostButton = () => {
  return (
    <div className={`${LikeBtn.likeBtn} ${LikeBtn.dark} ${LikeBtn.active}`}>
      <FavoriteIcon />
      Follow Anah Benešová
    </div>
  );
};
