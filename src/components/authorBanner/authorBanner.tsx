import { FollowButton } from "../buttons/followButton/followButton";
import Banner from "./authorBanner.module.scss";
type AuthorBannerProps = {
  imgURL: string;
  authorName: string;
};

export const AuthorBanner = () => {
  return (
    <div className={`${Banner.bannerWrapper} `}>
      <div className={`${Banner.adaptiveLayout} ${Banner.content}`}>
        <div className={Banner.imgContainer}>
          <img src="https://api.realworld.io/images/demo-avatar.png" alt="" />
        </div>
        <span className={Banner.authorName}>Anah Benešová</span>
        <div className={Banner.btn}>
          <FollowButton
            darkMode={false}
            isFollow={false}
            author={"Anah Benešová"}
          />
        </div>
      </div>
    </div>
  );
};

// {{APIURL}}/articles?author=johnjacob

// type FollowButtonProps = {
//   darkMode: boolean;
//   isFollow: boolean;
//   author: string;
// };
