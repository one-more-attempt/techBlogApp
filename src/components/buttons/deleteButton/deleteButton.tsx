import Delete from "./deleteButton.module.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import classNames from "classnames";
import { localStorageService } from "../../../services/LSService";
import { ReactComponent as Spinner } from "../../../img/spinner.svg";
import DeleteIcon from "@mui/icons-material/Delete";

type deleteButtonProps = {
  darkMode: boolean;
  isLoading?: boolean;
  onClick: () => void;
};
export const DeletePostButton = ({
  darkMode,
  isLoading,
  onClick,
}: deleteButtonProps) => {
  const buttonClass = classNames(Delete.deleteBtn, {
    [Delete.darkMode]: darkMode,
  });

  // const buttonText = isFollow ? `Unfollow ${author}` : `Follow ${author}`;
  // const buttonIcon = isFollow ? <RemoveIcon /> : <AddIcon />;
  // const loading = isLoading ? <Spinner /> : null;
  return (
    <>
      <button className={buttonClass} onClick={onClick}>
        <DeleteIcon />
        Delete Article
        {/* {loading} */}
      </button>
    </>
  );
};
