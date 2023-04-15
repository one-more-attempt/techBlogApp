import FavoriteIcon from "@mui/icons-material/Favorite";
import LikeBtn from "./Like.module.scss";

export const LikeCounterButton = () => {
  return (
    <>
      <div className={LikeBtn.likeCounter}>
        <FavoriteIcon />
        500
      </div>
    </>
  );
};
