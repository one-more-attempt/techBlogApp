import Avatar from "@mui/material/Avatar";
import { SimpleButton } from "../buttons/simpleTextButton/simpleTextButton";
import { AddComment } from "../addComment/AddComment";
import { PostActionPanel } from "../postActionPanel/postActionPanel";
import ComntsBlock from "./CommentsBlock.module.scss";
import { blogAPI } from "../../api/blogAPI";
import { Comment } from "../comment/comment";
import { useAppSelector } from "../../store/hooks/redux-hooks";
import { stateSelectors } from "../../store";
import { localStorageService } from "../../services/LSService";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../routes/routePathes";

type CommentsBlockProps = {
  author: string;
  date: string;
  favorited: boolean;
  following: boolean;
  likesCount: number;
  slug: string;
  imgURL: string;
  isPostUpdating: boolean;
};
export const CommentsBlock = ({
  author,
  date,
  favorited,
  following,
  likesCount,
  slug,
  imgURL,
  isPostUpdating,
}: CommentsBlockProps) => {
  const token = localStorageService.getToken() || "";
  const userDataState = useAppSelector(stateSelectors.userSliceData);
  const userImgUrl = userDataState.imageURL;

  const {
    data: postCommentsData,
    error: postCommentError,
    isLoading: postCommentLoading,
    isFetching: isPostsComentsFetching,
  } = blogAPI.useGetPostCommentsQuery({
    slug,
    token,
  });

  let commentsOptional;
  console.log(postCommentsData);
  
  if (token) {
    commentsOptional = (
      <>
        <AddComment imgURL={userImgUrl} slug={slug} />
        {postCommentLoading && "Loading..."}
        {postCommentError && "Something went wrong..."}
        {postCommentsData &&
          postCommentsData.comments.map((item: any) => (
            <Comment
              date={item.createdAt}
              name={item.author.username}
              text={item.body}
              imgURL={item.author.image}
              key={item.id}
            />
          ))}
      </>
    );
  } else {
    commentsOptional = (
      <div className={ComntsBlock.notification}>
        You need to be autorized to see comments.
        <br />
        Please, <Link to={ROUTE_PATH.SIGN_IN}>sign in</Link> or{" "}
        <Link to={ROUTE_PATH.SIGN_UP}>sign up</Link>.
      </div>
    );
  }

  console.log("postCommentData", postCommentsData);

  return (
    <div
      className={`${ComntsBlock.adaptiveLayout} ${ComntsBlock.commentBlock}`}
    >
      <PostActionPanel
        author={author}
        darkMode={false}
        date={date}
        isLiked={favorited}
        following={following}
        likesCount={likesCount}
        imgURL={imgURL}
        isPostUpdating={isPostUpdating}
        slug={slug}
      />
      {commentsOptional}
    </div>
  );
};
