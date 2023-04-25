import PostStyles from "./post.module.scss";
import { PostUserInfo } from "../postInfo/PostUserInfo";
import { LikeCounterButton } from "../buttons/likeCounterButton/likeCounterButton";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../routes/routePathes";
import { PostTagsBlock } from "../postTagsBlock/postTagsBlock";
type PostProps = {
  author: string;
  title: string;
  mainText: string;
  tags?: string[];
  isLiked: boolean;
  likeCount: number;
  createdAt: string;
  tagsList: string[];
  slug: string;
  imgURL: string;
};

export const Post = ({
  author,
  title,
  mainText,
  isLiked,
  likeCount,
  createdAt,
  tagsList,
  slug,
  imgURL,
}: PostProps) => {
  const limitedText = mainText.slice(0, 500).concat("...");

  return (
    <div className={PostStyles.postWrapper}>
      <div className={PostStyles.postHeader}>
        <PostUserInfo
          darkMode={false}
          author={author}
          createdAt={createdAt}
          imgURL={imgURL}
        />
        <LikeCounterButton isLiked={isLiked} likeCount={likeCount} />
      </div>
      <div className={PostStyles.postBody}>
        <div className={PostStyles.postBodyTitle}>
          <Link to={ROUTE_PATH.SELECTED_POST_DYNAMIC(slug)}>{title}</Link>
        </div>
        <div className={PostStyles.postBodyMainText}>{limitedText}</div>
      </div>
      <div className={PostStyles.postFooter}>
        <div className={PostStyles.readMore}>Read more...</div>
        <PostTagsBlock tagsList={tagsList} />
      </div>
    </div>
  );
};
