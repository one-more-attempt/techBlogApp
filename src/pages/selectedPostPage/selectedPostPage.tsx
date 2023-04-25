import { useParams } from "react-router-dom";
import { ArticleBanner } from "../../components/articleBanner/ArticleBanner";
import { Header } from "../../components/header/Header";
import { blogAPI } from "../../services/blogService";
import { CommentsBlock } from "../../components/CommentsBlock/CommentsBlock";
import { SelectedPostBody } from "../../components/selectedPostBody/selectedPostBody";
import { Footer } from "../../components/footer/Footer";

export const SelectedPostPage = () => {
  let { slug } = useParams();
  const { data, error, isLoading } = blogAPI.useGetSelectedPostQuery(slug);
  console.log(data);

  return (
    <>
      <Header />
      <div className="content">
        {isLoading && "is Loading..."}
        {data && (
          <>
            <ArticleBanner
              title={data.article.title}
              author={data.article.author.username}
              date={data.article.createdAt}
              favorited={data.article.favorited}
              following={data.article.author.following}
              likesCount={data.article.favoritesCount}
            />
            <SelectedPostBody
              text={data.article.body}
              tagsList={data.article.tagList}
            />
            <CommentsBlock
              author={data.article.author.username}
              date={data.article.createdAt}
              favorited={data.article.favorited}
              following={data.article.author.following}
              likesCount={data.article.favoritesCount}
              slug={data.article.slug}
            />
          </>
        )}
      </div>
      <Footer />
    </>
  );
};
