import classNames from "classnames";
import TextButton from "./textButton.module.scss";
type SimpleButtonProps = {
  text: string;
  disabled: boolean;
  onClickFunc?: () => void;
};
export const SimpleButton = ({
  text,
  disabled,
  onClickFunc,
}: SimpleButtonProps) => {
  const buttonClass = classNames(TextButton.simpleButton, {
    [TextButton.disabled]: disabled,
  });
  return (
    <button className={buttonClass} disabled={disabled} onClick={onClickFunc}>
      {text}
    </button>
  );
};
