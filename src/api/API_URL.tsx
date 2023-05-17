export const API_URL = {
  BASE_URL: `https://conduit.productionready.io/api`,
  LOGIN: `/users/login`,
  REGISTER: `/users`,
  USER_INFO: `/user`,
  POPULAR_TAGS: "/tags",

  GLOBAL_POSTS: (offset: number, limit: number) =>
    `/articles?limit=${limit}&offset=${offset}`,
  GLOBAL_WITH_TAG: (tagName: string, offset: number, limit: number) =>
    `/articles?tag=${tagName}&limit=${limit}&offset=${offset}`,
  MY_FEED: (offset: number, limit: number) =>
    `/articles/feed?limit=${limit}&offset=${offset}`,

  AUTHOR_POSTS: (autor: string, offset: number, limit: number) =>
    `/articles?author=${autor}&limit=${limit}&offset=${offset}`,
  AUTHOR_LIKED_POSTS: (author: string, offset: number, limit: number) =>
    `/articles?favorited=${author}&limit=${limit}&offset=${offset}`,

  POST_BY_SLUG: (slug: string) => `/articles/${slug}`,
  POST_COMMENTS_BY_SLUG: (slug: string) => `/articles/${slug}/comments`,

  LIKE_POST: (slug: string) => `/articles/${slug}/favorite`,
  FOLLOW_USER: (user: string) => `/profiles/${user}/follow`,
  COMMENT_TO_POST: (slug: string) => `articles/${slug}/comments`,

  GET_AUTHOR_INFO: (user: string) => `/profiles/${user}`,
};
