import { PostTagsBlock } from "../postTagsBlock/postTagsBlock";
import SelectedPost from "./selectedPostBody.module.scss";

type SelectedPostBodyProps = {
  tagsList: string[];
  text: string;
};

export const SelectedPostBody = ({ tagsList, text }: SelectedPostBodyProps) => {

  return (
    <>
      <div
        className={`${SelectedPost.adaptiveLayout} ${SelectedPost.postBodyWrapper}`}
      >
        <div className={SelectedPost.mainText}> {text}</div>
        <div className={SelectedPost.tags}>
          <PostTagsBlock tagsList={tagsList} />
        </div>
      </div>
    </>
  );
};
