export const API_URL = {
  BASE_URL: `https://conduit.productionready.io/api`,
  LOGIN: `/users/login`,
  USER_INFO: `/user`,
  POPULAR_TAGS: "/tags",
  GLOBAL_POSTS: "/articles?limit=10&offset=0",
  AUTHOR_POSTS: (autor:string) =>  ` /articles?author=${autor}`,
  GLOBAL_WITH_TAG: (tagName: string) =>
    `/articles?tag=${tagName}&limit=10&offset=0`,
  POST_BY_SLUG: (slug: string) => `/articles/${slug}`,
  POST_COMMENTS_BY_SLUG: (slug: string) => `/articles/${slug}/comments`,

};
