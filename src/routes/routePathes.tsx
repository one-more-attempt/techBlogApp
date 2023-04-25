export const ROUTE_PATH = {
  MAIN: `/`,
  REGISTRATION: `/registration`,
  SIGN_IN: `/sign-in`,
  ACCOUNT_SETTINGS: `/account-settings`,
  NEW_POST: `/new-post`,
  USER_PROFILE: `/profile/:userName`,
  SELECTED_POST: `/post/:postTitle`,
  SELECTED_POST_DYNAMIC: (title: string) => `/post/${title}`,
  NOT_FOUND: `*`,
};
// const serverURL = "https://conduit.productionready.io/api/users/login";