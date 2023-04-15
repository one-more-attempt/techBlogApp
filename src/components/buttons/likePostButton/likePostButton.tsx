import LikeBtn from "./likePost.module.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import classNames from "classnames";

type LikePostButtonProps = {
  darkMode: boolean;
  active: boolean;
};

export const LikePostButton = ({ darkMode, active }: LikePostButtonProps) => {
  const buttonColor = classNames(LikeBtn.likeBtn, {
    [LikeBtn.darkMode]: darkMode,
    [LikeBtn.active]: active,
  });

  const buttonText = active
    ? `Unfavourite Annah Benesova`
    : `Favourite Annah Benesova`;
  return (
    <div className={buttonColor}>
      <FavoriteIcon />
      {buttonText}
    </div>
  );
};
