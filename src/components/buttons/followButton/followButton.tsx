import Follow from "./followButton.module.scss";
import AddIcon from "@mui/icons-material/Add";
import classNames from "classnames";

type FollowButtonProps = {
  darkMode: boolean;
  isFollow: boolean;
  author: string;
};
export const FollowButton = ({ darkMode, isFollow, author }: FollowButtonProps) => {
  const buttonColor = classNames(Follow.followBtn, {
    [Follow.active]: isFollow,
    [Follow.darkMode]: darkMode,
  });
  const buttonText = isFollow
    ? `Unfollow ${author}`
    : `Follow ${author}`;

  return (
    <div className={buttonColor}>
      <AddIcon />
      {buttonText}
    </div>
  );
};
