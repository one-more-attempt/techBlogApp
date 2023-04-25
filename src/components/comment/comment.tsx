import CommentStyle from "./comment.module.scss";
import moment from "moment";

type CommentProps = {
  date: string;
  name: string;
  imgURL: string;
  text: string;
};
export const Comment = ({ date, name, imgURL, text }: CommentProps) => {
  return (
    <div className={CommentStyle.commentWrapper}>
      <div className={CommentStyle.text}>{text}</div>
      <div className={CommentStyle.footer}>
        <div className={CommentStyle.imgContainer}>
          <img src={imgURL} alt="" />
        </div>
        <div className={CommentStyle.userName}>{name}</div>
        <div className={CommentStyle.date}>
          {moment(date).format("MMMM D, YYYY")}
        </div>
      </div>
    </div>
  );
};
