import FooterStyles from "./footer.module.scss";

export const Footer = () => {
  return (
    <div className={FooterStyles.footerWrapper}>
      <div className={FooterStyles.adaptiveLayout}>
        <div className={FooterStyles.footerLogo}>conduit </div>
        <div className={FooterStyles.footerText}>
          © 2023. An interactive learning project by 1more.attempt. Code licensed
          under MIT.{" "}
        </div>
      </div>
    </div>
  );
};
