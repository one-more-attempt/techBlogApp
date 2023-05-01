import LikeBtn from "./likePost.module.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { ReactComponent as Spinner } from "../../../img/spinner.svg";
import classNames from "classnames";

type LikePostButtonProps = {
  darkMode: boolean;
  isLiked: boolean;
  likesCount: number;
  isLoading: boolean;
  likeHandler: () => void;
};

export const LikePostButton = ({
  darkMode,
  isLiked,
  likesCount,
  isLoading,
  likeHandler
}: LikePostButtonProps) => {
  const buttonColor = classNames(LikeBtn.likeBtn, {
    [LikeBtn.darkMode]: darkMode,
    [LikeBtn.active]: isLiked,
  });

  const buttonIcon = isLiked ? <HeartBrokenIcon /> : <FavoriteIcon />;
  const loading = isLoading ? <Spinner /> : null;

  const buttonText = isLiked
    ? `Unfavorite Article (${likesCount})`
    : `Favorite Article (${likesCount})`;
  return (
    <div className={buttonColor} onClick = {likeHandler}>
      {buttonIcon}
      {buttonText}
      {loading}
    </div>
  );
};
