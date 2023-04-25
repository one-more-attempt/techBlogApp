import LikeBtn from "./likePost.module.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import classNames from "classnames";

type LikePostButtonProps = {
  darkMode: boolean;
  isLiked: boolean;
  likesCount: number;
};

export const LikePostButton = ({ darkMode, isLiked,  likesCount}: LikePostButtonProps) => {
  const buttonColor = classNames(LikeBtn.likeBtn, {
    [LikeBtn.darkMode]: darkMode,
    [LikeBtn.active]: isLiked,
  });

  const buttonText = isLiked
    ? `Unfavorite Article (${likesCount})`
    : `Favorite Article`;
  return (
    <div className={buttonColor}>
      <FavoriteIcon />
      {buttonText}
    </div>
  );
};
