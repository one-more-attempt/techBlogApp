import { text } from "stream/consumers";
import Error from "./errorNotification.module.scss";
type ErrorNotificationProps = { data: { text: string; status: boolean } };
export const ErrorNotification = ({ data }: ErrorNotificationProps) => {
  const { text, status } = data;
  if (status) {
    return <div className={Error.errorNotificationWrapper}>{text}</div>;
  } else return null;
};
