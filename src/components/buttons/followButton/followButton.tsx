import Follow from "./followButton.module.scss";
import AddIcon from "@mui/icons-material/Add";
import classNames from "classnames";

type FollowButtonProps = {
  darkMode: boolean;
  active: boolean;
};
export const FollowButton = ({ darkMode, active }: FollowButtonProps) => {
  const buttonColor = classNames(Follow.followBtn, {
    [Follow.active]: active,
    [Follow.darkMode]: darkMode,
  });
  const buttonText = active
    ? `Unfollow Annah Benesova`
    : `Follow Annah Benesova`;

  return (
    <div className={buttonColor}>
      <AddIcon />
      {buttonText}
    </div>
  );
};
