import classNames from "classnames";
import { useEffect, useState } from "react";
import { ReactComponent as Spinner } from "../../img/spinner.svg";
import PaginationBtn from "./paginationButton.module.scss";

type PaginationButtonProps = {
  isActive: boolean;
  num: number;
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

  return (
    <button
      className={buttonClass}
      onClick={() => {
        onClick();
      }}
    >
      <span> {num}</span>
    </button>
  );
};
