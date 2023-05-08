import classNames from "classnames";
import { useState } from "react";
import { ReactComponent as Spinner } from "../../img/spinner.svg";
import PaginationBtn from "./paginationButton.module.scss";

type PaginationButtonProps = {
  isActive: boolean;
  num: number;
  isLoading: boolean;
  onClick: () => any;
};

export const PaginationButton = ({
  isActive,
  num,
  onClick,
}: PaginationButtonProps) => {
  const buttonClass = classNames(PaginationBtn.paginationButton, {
    [PaginationBtn.active]: isActive,
  });
  const [loadingStatus, setLoadingStatus] = useState(false);

  const loading = loadingStatus ? <Spinner /> : null;
  return (
    <button
      className={buttonClass}
      onClick={() => {
        setLoadingStatus(true);
        onClick();
      }}
    >
      <span> {num}</span>
      {loading}
    </button>
  );
};

// ${
//     activePage === i + 1 ? Posts.active : ""
//   } `}

// setCurrentPaginationOffset(i * limit);
// setActivePage(i + 1);
