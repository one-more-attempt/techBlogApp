import Edit from "./editButton.module.scss";
import classNames from "classnames";
import { ReactComponent as Spinner } from "../../../img/spinner.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

type deleteButtonProps = {
  darkMode: boolean;
  isLoading?: boolean;
  onClick: () => void;
};
export const EditPostButton = ({
  darkMode,
  isLoading,
  onClick,
}: deleteButtonProps) => {
  const buttonClass = classNames(Edit.editBtn, {
    [Edit.darkMode]: darkMode,
  });

  // const buttonText = isFollow ? `Unfollow ${author}` : `Follow ${author}`;
  // const buttonIcon = isFollow ? <RemoveIcon /> : <AddIcon />;
  // const loading = isLoading ? <Spinner /> : null;
  return (
    <>
      <button className={buttonClass} onClick={onClick}>
        <EditIcon />
        Edit Article
        {/* {loading} */}
      </button>
    </>
  );
};
