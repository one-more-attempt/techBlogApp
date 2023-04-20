import PostStyles from "./post.module.scss";
import { PostUserInfo } from "../postInfo/PostUserInfo";
import { LikeCounterButton } from "../buttons/likeCounterButton/likeCounterButton";

type PostProps = {
  author: string;
  title: string;
  mainText: string;
  tags?: string[];
  isLiked: boolean;
  likeCount: number;
  createdAt: string;
  tagList: string[];
};

export const Post = ({
  author,
  title,
  mainText,
  isLiked,
  likeCount,
  createdAt,
  tagList,
}: PostProps) => {
  return (
    <div className={PostStyles.postWrapper}>
      <div className={PostStyles.postHeader}>
        <PostUserInfo darkMode={false} author={author} createdAt={createdAt} />
        <LikeCounterButton isLiked={isLiked} likeCount={likeCount} />
      </div>
      <div className={PostStyles.postBody}>
        <div className={PostStyles.postBodyTitle}>{title}</div>
        <div className={PostStyles.postBodyMainText}>{mainText}</div>
      </div>
      <div className={PostStyles.postFooter}>
        <div className={PostStyles.readMore}>Read more...</div>
        <div className={PostStyles.tagsBlock}>
          {tagList.map((item, index) => (
            <div className={PostStyles.tag} key= {index}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
