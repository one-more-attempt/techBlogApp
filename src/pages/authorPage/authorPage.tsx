import { useState } from "react";
import { useParams } from "react-router-dom";
import { AuthorBanner } from "../../components/authorBanner/authorBanner";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { Post } from "../../components/post/post";
import { blogAPI } from "../../services/blogService";
import Author from "./authorPage.module.scss";

enum FeedSelector {
  Author,
  Favorited,
}

export const AuthorPage = () => {
  const { username } = useParams();
  console.log(username);
  const [feedSelector, setFeedSelector] = useState(FeedSelector.Author);
  const {
    data: authorPosts,
    error,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = blogAPI.useGetGlobalPostsQuery("");

  const checkActive = (feed: FeedSelector) => {
    if (feed === feedSelector) return Author.activeFeed;
  };

  return (
    <>
      <Header />
      <div className="content">
        <AuthorBanner />

        <div className={`${Author.contentWrapper} ${Author.adaptiveLayout}`}>
          <div className={Author.feedTooglePanel}>
            <div
              className={checkActive(FeedSelector.Author)}
              onClick={() => setFeedSelector(FeedSelector.Author)}
            >
              {username} Posts
            </div>
            <div
              className={checkActive(FeedSelector.Favorited)}
              onClick={() => {
                setFeedSelector(FeedSelector.Favorited);
              }}
            >
              {username} Favorited
            </div>
          </div>
          {authorPosts &&
            authorPosts.articles.map((item: any, index: number) => (
              <Post
                author={item.author.username}
                title={item.title}
                mainText={item.body}
                key={index}
                isLiked={item.favorite}
                likeCount={item.favoritesCount}
                createdAt={item.createdAt}
                tagsList={item.tagList}
                slug={item.slug}
                imgURL={item.author.image}
              />
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
