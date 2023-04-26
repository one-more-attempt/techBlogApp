import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "./API_URL";
import type { loginObject, loginResponse } from "../types/login";

export const blogAPI = createApi({
  reducerPath: "blogAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL.BASE_URL}` }),
  endpoints: (build) => ({
    
    login: build.mutation<loginResponse, loginObject>({
      query: (loginObj) => ({
        url: `${API_URL.LOGIN}`,
        method: "POST",
        body: loginObj,
      }),
    }),

    getUserInfoByToken: build.query<loginResponse, string>({
      query: (token) => ({
        url: `${API_URL.USER_INFO}`,
        headers: { authorization: `Token ${token}` },
      }),
    }),

    getGlobalPosts: build.query({
      query: () => ({
        url: `${API_URL.GLOBAL_POSTS}`,
      }),
    }),

    getAuthorPosts: build.query({
      query: (author:string) => ({
        url: `${API_URL.AUTHOR_POSTS(author)}`,
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
  }),
});

