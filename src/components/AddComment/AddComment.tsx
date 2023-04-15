import Avatar from "@mui/material/Avatar";
import CommentAdd from "./AddComment.module.scss";
import { SimpleButton } from "../buttons/simpleTextButton/simpleTextButton";
export const AddComment = () => {
  return (
    <div
      className={`${CommentAdd.addCommentWrapper} ${CommentAdd.adaptiveLayout}`}
    >
      <div className={CommentAdd.content}>
        <fieldset>
          <textarea className={CommentAdd.commentInput} placeholder= 'Write a comment...'></textarea>
          <div className={CommentAdd.commentFooter}>
            <div className={CommentAdd.avatar}>
              <Avatar />
            </div>
            <SimpleButton />
          </div>
        </fieldset>
      </div>
    </div>
  );
};
