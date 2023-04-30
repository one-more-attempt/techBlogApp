import { SimpleButton } from "../buttons/simpleTextButton/simpleTextButton";
import Modal from "./modalWindow.module.scss";
export const ModalWindow = () => {
  return (
    <div className={Modal.modalWrapper}>
      <div className={Modal.modalContent}>
        <span> You need to Sign in to unlock this feature</span>
        <SimpleButton text="Close" disabled={false} />
        <SimpleButton text="Close" disabled={false} />
      </div>
    </div>
  );
};
