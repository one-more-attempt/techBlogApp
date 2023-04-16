import { NavLink } from "react-router-dom";
import Posts from "./posts.module.scss";
import { Post } from "../post/post";
import { PopularTags } from "../popularTags/popularTags";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { stateSelectors } from "../../store";

export const PostsContainer = () => {
  const userDataState = useAppSelector(stateSelectors.userSliceData);
  const dispatch = useAppDispatch();
  // console.log({ userDataState });

  return (
    <div className={`${Posts.adaptiveLayout} ${Posts.postsContainer}`}>
      <div className={Posts.posts}>
        <div className={Posts.feedTooglePanel}>
          <div>Global Feed</div>
          <div>My Feed</div>
        </div>
        <Post />
      </div>
      <div className={Posts.tags}>
        <PopularTags />
      </div>
    </div>
  );
};
