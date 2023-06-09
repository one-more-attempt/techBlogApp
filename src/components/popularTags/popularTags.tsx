import { Dispatch, SetStateAction } from "react";
import { blogAPI } from "../../api/blogAPI";
import { stateSelectors } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { Feed } from "../postsContainer/postsContainer";

import PopTags from "./popularTags.module.scss";

type PopularTagsProps = {
  setSelectedPopularTag: (arg: string) => void;
  setActiveFeed: (arg: Feed) => void;
  setPageCounter: Dispatch<SetStateAction<number[]>>;
};

export const PopularTags = ({
  setSelectedPopularTag,
  setActiveFeed,
  setPageCounter,
}: PopularTagsProps) => {
  const { data, error, isLoading, isSuccess } =
    blogAPI.useGetPopularTagsQuery(true);

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
                setSelectedPopularTag(item);
                setActiveFeed(Feed.Tag);
                setPageCounter([...Array(0)]);
              }}
            >
              {item}
            </div>
          ))}
      </div>
    </div>
  );
};
