import { blogAPI } from "../../services/blogService";
import { stateSelectors } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { userSlice } from "../../store/slices/userSlice";
import PopTags from "./popularTags.module.scss";

export const PopularTags = () => {
  const userDataState = useAppSelector(stateSelectors.userSliceData);
  const dispatch = useAppDispatch();
  const setActiveTag = (tagName: string) => {
    dispatch(userSlice.actions.setActiveFeedTag(tagName));
  };
  const { data, error, isLoading, isSuccess } =
    blogAPI.useGetPopularTagsQuery("");
  // console.log(data);

  return (
    <div className={PopTags.tagsWrapper}>
      <div>Popular tags:</div>
      <div className={PopTags.tags}>
        {isLoading && <span>...loading</span>}
        {error && <span>ERROR</span>}
        {data &&
          data.tags.map((item: any, index: number) => (
            <div
              key={index}
              onClick={() => {
                setActiveTag(item);
              }}
            >
              {item}
            </div>
          ))}
      </div>
    </div>
  );
};
