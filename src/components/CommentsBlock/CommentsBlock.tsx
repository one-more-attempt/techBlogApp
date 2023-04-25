import Avatar from "@mui/material/Avatar";
import { SimpleButton } from "../buttons/simpleTextButton/simpleTextButton";
import { AddComment } from "../addComment/AddComment";
import { PostActionPanel } from "../postActionPanel/postActionPanel";
import ComntsBlock from "./CommentsBlock.module.scss";
import { blogAPI } from "../../services/blogService";
import { Comment } from "../comment/comment";

type CommentsBlockProps = {
  author: string;
  date: string;
  favorited: boolean;
  following: boolean;
  likesCount: number;
  slug: string;
};
export const CommentsBlock = ({
  author,
  date,
  favorited,
  following,
  likesCount,
  slug,
}: CommentsBlockProps) => {
  const { data, error, isLoading } = blogAPI.useGetPostCommentsQuery(slug);
  console.log(data);

  return (
    <div
      className={`${ComntsBlock.adaptiveLayout} ${ComntsBlock.commentBlock}`}
    >
      <PostActionPanel
        author={author}
        darkMode={false}
        date={date}
        isLiked={favorited}
        isFollowing={following}
        likesCount={likesCount}
      />
      <AddComment />
      {data &&
        data.comments.map((item: any) => (
          <Comment
            date={item.createdAt}
            name={item.author.username}
            text={item.body}
            imgURL={item.author.image}
            key = {item.id}
          />
        ))}
    </div>
  );
};
// date: string;
// name: string;
// imgURL: string;
// text: string;
