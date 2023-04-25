import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "./API_URL";
import type { loginObject, loginResponse } from "../types/login";

export const blogAPI = createApi({
  reducerPath: "blogAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL.BASE_URL}` }),
  endpoints: (build) => ({
    getGlobalPosts: build.query({
      query: () => ({
        url: `${API_URL.GLOBAL_POSTS}`,
      }),
    }),

    getPopularTags: build.query({
      query: () => ({
        url: `${API_URL.POPULAR_TAGS}`,
      }),
    }),

    getGlobalFeedByTag: build.query({
      query: (tagname) => ({
        url: `${API_URL.GLOBAL_WITH_TAG(tagname)}`,
      }),
    }),

    getSelectedPost: build.query({
      query: (slug) => ({
        url: `${API_URL.POST_BY_SLUG(slug)}`,
      }),
    }),

    getPostComments: build.query({
      query: (slug) => ({
        url: `${API_URL.POST_COMMENTS_BY_SLUG(slug)}`,
      }),
    }),

    login: build.mutation<any, loginObject>({
      query: (loginObj) => ({
        url: `${API_URL.LOGIN}`,
        method: "POST",
        body: loginObj,
      }),
    }),

    getUserInfoByToken: build.query<loginResponse, any>({
      query: (token) => ({
        url: `${API_URL.USER_INFO}`,
        headers: { authorization: `Token ${token}` },
      }),
    }),
  }),
});
// getUserInfoByToken:
// get(API_URL.GET_USER_INFO, {
//         headers: {
//           authorization: "Token " + token,
//         },
// transformResponse: (response: any) => response.data,
