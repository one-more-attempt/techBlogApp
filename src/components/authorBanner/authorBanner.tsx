import { useEffect, useState } from "react";
import { blogAPI } from "../../api/blogAPI";
import { localStorageService } from "../../services/LSService";
import { stateSelectors } from "../../store";
import { useAppSelector } from "../../store/hooks/redux-hooks";
import { FollowButton } from "../buttons/followButton/followButton";
import { ModalWindow } from "../modalWindow/modalWindow";
import Banner from "./authorBanner.module.scss";

type AuthorBannerProps = {
  authorName: string;
};

export const AuthorBanner = ({ authorName }: AuthorBannerProps) => {
  const userDataState = useAppSelector(stateSelectors.userSliceData);
  const userName = userDataState.userName;
  const token = localStorageService.getToken();
  const [isLoading, setIsLoading] = useState(false);
  const [follow, { data: followData, isLoading: isFollowLoading }] =
    blogAPI.useFollowAuthorMutation();
  const [unFollow, { data: unFollowData, isLoading: isUnfollowLoading }] =
    blogAPI.useUnFollowAuthorMutation();

  const { data: authorData, isFetching: isAuthorDataLoading } =
    blogAPI.useGetAuthorInfoByTokenQuery({
      author: authorName,
      token: token ? token : "",
    });

  const status = authorData ? authorData.profile.following : false;
  const imgURL = authorData ? authorData.profile.image : "";
  const author = authorData ? authorData.profile.username : "";
  const bio = authorData ? authorData.profile.bio : "";

  useEffect(() => {
    if (isFollowLoading || isUnfollowLoading || isAuthorDataLoading) {
      setIsLoading(true);
    } else {
      if (!(isFollowLoading || isUnfollowLoading || isAuthorDataLoading)) {
        setIsLoading(false);
      }
    }
  });

  const followHandler = () => {
    if (token) {
      if (status) {
        unFollow({
          token: token ? token : "",
          author: authorName,
        });
      } else {
        follow({
          token: token ? token : "",
          author: authorName,
        });
      }
    } else {
      alert("Need to be authorized to unlock this feature");
    }
  };

  console.log(authorData);
  const buttonSelector =
    author !== userName ? (
      <FollowButton
        darkMode={false}
        isFollow={status}
        author={authorName}
        followHandler={followHandler}
        isDisabled={false}
        isLoading={isLoading}
      />
    ) : null;
  return (
    <>
      {/* <ModalWindow /> */}
      <div className={`${Banner.bannerWrapper} `}>
        <div className={`${Banner.adaptiveLayout} ${Banner.content}`}>
          <div className={Banner.imgContainer}>
            <img src={imgURL} alt="" />
          </div>
          <span className={Banner.authorName}>{authorName}</span>
          <span className={Banner.authorBio}>{bio}</span>
          <div className={Banner.btn}>{buttonSelector}</div>
        </div>
      </div>
    </>
  );
};
