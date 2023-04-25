import Error from "./errorNotification.module.scss";
type ErrorNotificationProps = {
  text: string;
  status: boolean;
};
export const ErrorNotification = ({ status, text }: ErrorNotificationProps) => {
  if (status) {
    return (
      <div className={Error.errorNotificationWrapper}>
        {text}
      </div>
    );
  } else return null;
};
