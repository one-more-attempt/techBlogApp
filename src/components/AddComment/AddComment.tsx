import { Avatar } from "@mui/material";
import { SimpleButton } from "../buttons/simpleTextButton/simpleTextButton";
import NewComment from "./addComment.module.scss";

export const AddComment = () => (
  <div className={`${NewComment.addCommentWrapper} `}>
    <div className={NewComment.content}>
      <fieldset>
        <textarea
          className={NewComment.commentInput}
          placeholder="Write a comment..."
        ></textarea>
        <div className={NewComment.commentFooter}>
          <div className={NewComment.avatar}>
            <Avatar />
          </div>
          <SimpleButton text="Post Comment" disabled={false} />
        </div>
      </fieldset>
    </div>
  </div>
);
