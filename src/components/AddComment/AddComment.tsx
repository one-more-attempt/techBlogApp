import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { blogAPI } from "../../api/blogAPI";
import { localStorageService } from "../../services/LSService";
import { SimpleButton } from "../buttons/simpleTextButton/simpleTextButton";
import NewComment from "./addComment.module.scss";

type AddCommentProps = {
  imgURL: string;
  slug: string;
};

export const AddComment = ({ imgURL, slug }: AddCommentProps) => {
  const token = localStorageService.getToken() || "";
  const [text, setText] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [
    addCommentToPost,
    { data: addCommentToPostData, isLoading: addCommentToPostLoading },
  ] = blogAPI.useAddCommentToPostMutation();
  // const toke= '2';

  const addCommentHandler = () => {
    const commentBody = {
      comment: { body: text },
    };
    addCommentToPost({ token, slug, comment: commentBody });
    setText("");
    console.log(`works`);
  };

  useEffect(() => {
    text.length > 5 ? setButtonStatus(false) : setButtonStatus(true);
  });
  return (
    <div className={`${NewComment.addCommentWrapper} `}>
      <div className={NewComment.content}>
        <fieldset>
          <textarea
            className={NewComment.commentInput}
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => {
              setText(e.currentTarget.value);
            }}
          ></textarea>
          <div className={NewComment.commentFooter}>
            <div className={NewComment.avatar}>
              <img src={imgURL} alt="" />
            </div>
            <SimpleButton
              text="Post Comment"
              disabled={buttonStatus}
              onClickFunc={addCommentHandler}
            />
          </div>
        </fieldset>
        {addCommentToPostLoading && "...Updating"}
      </div>
    </div>
  );
};
function postCommentData(postCommentData: any) {
  throw new Error("Function not implemented.");
}
