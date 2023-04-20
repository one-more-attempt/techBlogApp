export const API_URL = {
  BASE_URL: `https://conduit.productionready.io/api`,
  USER_INFO: `/api/user`,
  POPULAR_TAGS: "/tags",
  GLOBAL_POSTS: "/articles?limit=10&offset=0",
  GLOBAL_WITH_TAG: (tagName: string) =>
    `/articles?tag=${tagName}&limit=10&offset=0`,
  LOGIN: `https://conduit.productionready.io/api/users/login`,
};
// https://conduit.productionready.io/api/articles?tag=butt&limit=10&offset=0
