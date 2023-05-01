import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "./API_URL";
import type {
  loginObject,
  loginResponse,
  AuthorInfoResponse,
  AuthorInfoBody,
} from "../types/types";

export const blogAPI = createApi({
  reducerPath: "blogAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL.BASE_URL}` }),
  tagTypes: ["post", "authorInfo", "selectedPost", "comments"],
  endpoints: (build) => ({
    login: build.mutation<loginResponse, loginObject>({
      query: (loginObj) => ({
        url: `${API_URL.LOGIN}`,
        method: "POST",
        body: loginObj,
      }),
    }),

    followAuthor: build.mutation<any, { token: string; author: string }>({
      query: ({ token, author }) => ({
        url: `${API_URL.FOLLOW_USER(author)}`,
        method: "POST",
        headers: { authorization: `Token ${token}` },
      }),
      invalidatesTags: ["authorInfo", "selectedPost"],
    }),

    UnFollowAuthor: build.mutation<any, { token: string; author: string }>({
      query: ({ token, author }) => ({
        url: `${API_URL.FOLLOW_USER(author)}`,
        method: "DELETE",
        headers: { authorization: `Token ${token}` },
      }),
      invalidatesTags: ["authorInfo", "selectedPost"],
    }),

    likePost: build.mutation<any, { token: string; post: string }>({
      query: ({ token, post }) => ({
        url: `${API_URL.LIKE_POST(post)}`,
        method: "POST",
        headers: { authorization: `Token ${token}` },
      }),
      invalidatesTags: ["post", "selectedPost"],
    }),

    unlikePost: build.mutation<any, { token: string; post: string }>({
      query: ({ token, post }) => ({
        url: `${API_URL.LIKE_POST(post)}`,
        method: "DELETE",
        headers: { authorization: `Token ${token}` },
      }),
      invalidatesTags: ["post", "selectedPost"],
    }),

    addCommentToPost: build.mutation<
      any,
      { token: string; slug: string; comment: { comment: { body: string } } }
    >({
      query: ({ token, comment, slug }) => ({
        url: `${API_URL.COMMENT_TO_POST(slug)}`,
        method: "POST",
        headers: { authorization: `Token ${token}` },
        body: comment,
      }),
      invalidatesTags: ["comments"],
    }),

    getUserInfoByToken: build.query<loginResponse, string>({
      query: (token) => ({
        url: `${API_URL.USER_INFO}`,
        headers: { authorization: `Token ${token}` },
      }),
    }),

    getAuthorInfoByToken: build.query<AuthorInfoResponse, AuthorInfoBody>({
      query: ({ author, token }) => ({
        url: `${API_URL.GET_AUTHOR_INFO(author)}`,
        headers: { authorization: `Token ${token}` },
      }),
      providesTags: (result) => ["authorInfo"],
    }),

    getGlobalPosts: build.query<any, string>({
      query: (token) => ({
        url: `${API_URL.GLOBAL_POSTS}`,
        headers: { authorization: `Token ${token}` },
      }),
      providesTags: (result) => ["post"],
    }),

    getMyFeed: build.query<any, string>({
      query: (token) => ({
        url: `${API_URL.MY_FEED}`,
        headers: { authorization: `Token ${token}` },
      }),
      providesTags: (result) => ["post"],
    }),

    getAuthorPosts: build.query<any, { author: string; token: string }>({
      query: ({ author, token }) => ({
        url: `${API_URL.AUTHOR_POSTS(author)}`,
        headers: { authorization: `Token ${token}` },
      }),
      providesTags: (result) => ["post"],
    }),

    getAuthorFavoritedPosts: build.query({
      query: (author: string) => ({
        url: `${API_URL.AUTHOR_LIKED_POSTS(author)}`,
      }),
    }),

    getPopularTags: build.query({
      query: () => ({
        url: `${API_URL.POPULAR_TAGS}`,
      }),
    }),

    getGlobalFeedByTag: build.query<any, { tagname: string; token: string }>({
      query: ({ tagname, token }) => ({
        url: `${API_URL.GLOBAL_WITH_TAG(tagname)}`,
        headers: { authorization: `Token ${token}` },
      }),
      providesTags: (result) => ["post"],
    }),

    getSelectedPost: build.query<any, { slug: string; token: string }>({
      query: ({ slug, token }) => ({
        url: `${API_URL.POST_BY_SLUG(slug)}`,
        headers: { authorization: `Token ${token}` },
      }),
      providesTags: (result) => ["selectedPost"],
    }),

    getPostComments: build.query<any, { slug: string; token: string }>({
      query: ({ slug, token }) => ({
        url: `${API_URL.POST_COMMENTS_BY_SLUG(slug)}`,
        headers: { authorization: `Token ${token}` },
      }),
      providesTags: (result) => ["comments"],
    }),
  }),
});
