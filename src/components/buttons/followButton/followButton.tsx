import Follow from "./followButton.module.scss";
import AddIcon from "@mui/icons-material/Add";

export const FollowButton = () => {
  return (
    <div className={Follow.followBtn}>
      <AddIcon />
      Follow Anah Benešová
    </div>
  );
};
