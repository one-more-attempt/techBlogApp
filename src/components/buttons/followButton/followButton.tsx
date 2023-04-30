import Follow from "./followButton.module.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import classNames from "classnames";
import { localStorageService } from "../../../services/LSService";
// import  Spinner from "../../../img/spinner.svg";
import { ReactComponent as Spinner } from "../../../img/spinner.svg";

type FollowButtonProps = {
  darkMode: boolean;
  isFollow: boolean;
  author: string;
  isLogined?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  followHandler?: () => void;
};
export const FollowButton = ({
  darkMode,
  isFollow,
  author,
  isDisabled,
  isLoading,
  followHandler,
}: FollowButtonProps) => {
  const buttonColor = classNames(Follow.followBtn, {
    [Follow.active]: isFollow,
    [Follow.darkMode]: darkMode,
  });

  const buttonText = isFollow ? `Unfollow ${author}` : `Follow ${author}`;
  const buttonIcon = isFollow ? <RemoveIcon /> : <AddIcon />;
  const loading = isLoading ? <Spinner /> : null;
  return (
    <>
      <button
        className={buttonColor}
        disabled={isDisabled}
        onClick={() => {
          if (followHandler) followHandler();
        }}
      >
        {buttonIcon}
        {buttonText}
        {loading}
      </button>
    </>
  );
};
