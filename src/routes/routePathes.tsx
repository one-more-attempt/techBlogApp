export const ROUTE_PATH = {
  MAIN: `/`,
  SIGN_UP: `/sign-up`,
  SIGN_IN: `/sign-in`,
  POST: `/post`,
  SETTINGS: `/settings`,
  SELECTED_POST_DYNAMIC: (title: string) => `/post/${title}`,
  PROFILE: "/profile/:author",
  PROFILE_DYNAMIC: (username: string) => `/profile/${username}`,
  NEW_ARTICLE: `/editor`,
  NOT_FOUND: `*`,
};
