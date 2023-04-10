import HeaderStyle from "./Header.module.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import ArticleIcon from '@mui/icons-material/Article';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const Header = () => {
  return (
    <>
      <div
        className={`${HeaderStyle.adaptiveLayout} ${HeaderStyle.headerContainer}`}
      >
        <div className={HeaderStyle.logo}>conduit</div>
        <div className={HeaderStyle.links}>
          <span>Home</span>
          <span>Sign in</span>
          <span>Sign up</span>
          <div>
            <ArticleIcon />
            <span>New article</span>
          </div>
          <div>
            <SettingsIcon />
            <span>Settings</span>
          </div>
          <div>
            <AccountCircleIcon />
            <span>Username</span>
          </div>
        </div>
      </div>
    </>
  );
};
