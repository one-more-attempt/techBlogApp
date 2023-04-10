import Button from "@mui/material/Button";
import Intro from "./IntroPanel.module.scss";

export const IntroPanel = () => {
  return (
    <div className={Intro.introPanelWrapper}>
      <div className={Intro.textBlock}>
        <h1> conduit</h1>
        <p>A place to share your Angular knowledge.</p>
      </div>

      {/* <div className={Intro.imgBlock}>IMG</div> */}
    </div>
  );
};
