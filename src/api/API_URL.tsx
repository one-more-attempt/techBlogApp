export const API_URL = {
  BASE_URL: `https://conduit.productionready.io/api`,
  LOGIN: `/users/login`,
  USER_INFO: `/user`,
  POPULAR_TAGS: "/tags",
  GLOBAL_POSTS: "/articles?limit=10&offset=0",
  MY_FEED: "/articles/feed",

  AUTHOR_POSTS: (autor: string) => `/articles?author=${autor}`,
  AUTHOR_LIKED_POSTS: (author: string) => `/articles?favorited=${author}`,

  GLOBAL_WITH_TAG: (tagName: string) =>
    `/articles?tag=${tagName}&limit=10&offset=0`,
  POST_BY_SLUG: (slug: string) => `/articles/${slug}`,
  POST_COMMENTS_BY_SLUG: (slug: string) => `/articles/${slug}/comments`,
  LIKE_POST: (slug: string) => `/articles/${slug}/favorite`,

  FOLLOW_USER: (user: string) => `/profiles/${user}/follow`,
  GET_AUTHOR_INFO: (user: string) => `/profiles/${user}`,

  COMMENT_TO_POST: (slug: string) => `articles/${slug}/comments`,
};
