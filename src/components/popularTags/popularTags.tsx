import PopTags from "./popularTags.module.scss";

export const PopularTags = () => {
  return (
    <div className={PopTags.tagsWrapper}>
      <div>Popular tags:</div>
      <div className={PopTags.tags}>
        <div> implementations</div>
        <div> welcome</div>
        <div> introduction</div>
        <div> codebaseShow</div>
        <div> ipsum</div>
        <div> qui</div>
        <div> et</div>
        <div> cupiditate </div>
        <div> deserunt</div>
      </div>
    </div>
  );
};
