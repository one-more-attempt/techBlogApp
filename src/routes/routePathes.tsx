export const ROUTE_PATH = {
  MAIN: `/`,
  SIGN_UP: `/sign-up`,
  SIGN_IN: `/sign-in`,
  POST: `/post`,
  SELECTED_POST_DYNAMIC: (title: string) => `/post/${title}`,
  PROFILE: '/profile',
  PROFILE_DYNAMIC: (username: string) => `/profile/${username}`,
  
  ACCOUNT_SETTINGS: `/account-settings`,
  NEW_POST: `/new-post`,
  USER_PROFILE: `/profile/:userName`,
  NOT_FOUND: `*`,
};