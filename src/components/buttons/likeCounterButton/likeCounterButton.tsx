import FavoriteIcon from "@mui/icons-material/Favorite";
import classNames from "classnames";
import LikeBtn from "./Like.module.scss";
import { ReactComponent as Spinner } from "../../../img/spinner.svg";

type LikeCounterButtonProps = {
  likeCount: number;
  isLiked: boolean;
  likeHandler: () => void;
  isLoading?:boolean;
};
export const LikeCounterButton = ({
  likeCount,
  isLiked,
  likeHandler,
  isLoading
}: LikeCounterButtonProps) => {
  const buttonClassName = classNames(LikeBtn.likeCounter, {
    [LikeBtn.liked]: isLiked,
  });
  const loading = isLoading ? <Spinner /> : null;
  return (
    <>
      <button
        // disabled
        className={buttonClassName}
        onClick={() => {
          likeHandler();
        }}
      >
        <FavoriteIcon />
        {likeCount}
        {loading}
      </button>
    </>
  );
};
