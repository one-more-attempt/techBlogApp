import PostTags from "./postTagsBlock.module.scss";

type PostTagsBlockProps = {
  tagsList: string[];
};
export const PostTagsBlock = ({ tagsList }: PostTagsBlockProps) => (
  <div className={PostTags.tagsBlock}>
    {tagsList.map((item, index) => (
      <div className={PostTags.tag} key={index}>
        {item}
      </div>
    ))}
  </div>
);
