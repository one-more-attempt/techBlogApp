import PostStyles from "./post.module.scss";
import { PostUserInfo } from "../postInfo/PostUserInfo";
import { LikeCounterButton } from "../buttons/likeCounterButton/likeCounterButton";

export const Post = () => {
  return (
    <div className={PostStyles.postWrapper}>
      <div className={PostStyles.postHeader}>
        <PostUserInfo darkMode={false} />
        <LikeCounterButton />
      </div>
      <div className={PostStyles.postBody}>
        <div className={PostStyles.postBodyTitle}>
          If we quantify the alarm, we can get to the FTP pixel through the
          online SSL interface!
        </div>
        <div className={PostStyles.postBodyMainText}>
          Quia quo iste et aperiam voluptas consectetur a omnis et.\nDolores et
          earum consequuntur sunt et.\nEa nulla ab voluptatem dicta vel.
          Temporibus aut adipisci magnam aliquam eveniet nihil laudantium
          reprehenderit sit.\nAspernatur cumque labore voluptates mollitia
          deleniti et. Quos pariatur tenetur.\nQuasi omnis eveniet eos maiores
          esse magni possimus blanditiis.\nQui incidunt sit quos consequatur aut
          qui et aperiam delectus
        </div>
      </div>
      <div className={PostStyles.postFooter}>
        <div className={PostStyles.readMore}>Read more...</div>
        <div className={PostStyles.tagsBlock}>
          <div className={PostStyles.tag}>some tag</div>
          <div className={PostStyles.tag}>some tag</div>
          <div className={PostStyles.tag}>some tag</div>
          <div className={PostStyles.tag}>some tag</div>
          <div className={PostStyles.tag}>some tag</div>
        </div>
      </div>
    </div>
  );
};
