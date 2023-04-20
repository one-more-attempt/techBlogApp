import FavoriteIcon from "@mui/icons-material/Favorite";
import LikeBtn from "./Like.module.scss";

type LikeCounterButtonProps = {
  likeCount: number;
  isLiked: boolean;
};
export const LikeCounterButton = ({
  likeCount,
  isLiked,
}: LikeCounterButtonProps) => {
  return (
    <>
      <button disabled className={LikeBtn.likeCounter}>
        <FavoriteIcon />
        {likeCount}
      </button>
    </>
  );
};
