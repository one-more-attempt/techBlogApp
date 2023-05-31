import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "./API_URL";
import { baseQuery } from "./baseQuery";

import type {
  LoginInput,
  LoginResponse,
  AuthorInfoResponse,
  FollowUnfollowAuthorInput,
  LikeUnlikePostInput,
  likeUnlikePostResponse,
  allCommentsInput,
  addCommentToPostInput,
  AuthorInfoInput,
  getCommentsResponse,
  addCommentResponse,
  getFeedInput,
  getFeedByTagNameInput,
  getPostsResponse,
  getAuthorPostsInput,
  getSelectedPostInput,
  getSelectedPostResponse,
  getAllPopularTagsResponse,
  SignUpResponse,
  SignUpInput,
  LoginResponseTransFormed,
} from "../types/types";
import { QueryLifecycleApi } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { userSliceActions } from "../store/slices/userSlice";

export const blogAPI = createApi({
  reducerPath: "blogAPI",
  baseQuery,
  // baseQuery: fetchBaseQuery({ baseUrl: `${API_URL.BASE_URL}` }),
  tagTypes: ["post", "authorInfo", "selectedPost", "comments", "userInfo"],
  endpoints: (build) => ({
    register: build.mutation<SignUpResponse, SignUpInput>({
      query: (signUpInputData) => ({
        url: `${API_URL.REGISTER}`,
        method: "POST",
        body: signUpInputData,
      }),
    }),

    updateProfile: build.mutation<any, any>({
      query: (updateData) => ({
        url: API_URL.USER_INFO,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["userInfo"],
    }),

    login: build.mutation<LoginResponse, LoginInput>({
      query: (loginObj) => ({
        url: API_URL.LOGIN,
        method: "POST",
        body: loginObj,
      }),
    }),

    followAuthor: build.mutation<AuthorInfoResponse, FollowUnfollowAuthorInput>(
      {
        query: ({ token, author }) => ({
          url: `${API_URL.FOLLOW_USER(author)}`,
          method: "POST",
        }),
        invalidatesTags: ["authorInfo", "selectedPost"],
      }
    ),

    UnFollowAuthor: build.mutation<
      AuthorInfoResponse,
      FollowUnfollowAuthorInput
    >({
      query: ({ token, author }) => ({
        url: `${API_URL.FOLLOW_USER(author)}`,
        method: "DELETE",
        headers: { authorization: `Token ${token}` },
      }),
      invalidatesTags: ["authorInfo", "selectedPost"],
    }),

    likePost: build.mutation<likeUnlikePostResponse, LikeUnlikePostInput>({
      query: ({ token, post }) => ({
        url: `${API_URL.LIKE_POST(post)}`,
        method: "POST",
        headers: { authorization: `Token ${token}` },
      }),
      invalidatesTags: ["post", "selectedPost"],
    }),

    unlikePost: build.mutation<likeUnlikePostResponse, LikeUnlikePostInput>({
      query: ({ token, post }) => ({
        url: `${API_URL.LIKE_POST(post)}`,
        method: "DELETE",
        headers: { authorization: `Token ${token}` },
      }),
      invalidatesTags: ["post", "selectedPost"],
    }),

    getPostComments: build.query<getCommentsResponse, allCommentsInput>({
      query: ({ slug, token }) => ({
        url: `${API_URL.POST_COMMENTS_BY_SLUG(slug)}`,
        headers: { authorization: `Token ${token}` },
      }),
      providesTags: (result) => ["comments"],
    }),

    addCommentToPost: build.mutation<addCommentResponse, addCommentToPostInput>(
      {
        query: ({ token, comment, slug }) => ({
          url: `${API_URL.COMMENT_TO_POST(slug)}`,
          method: "POST",
          headers: { authorization: `Token ${token}` },
          body: comment,
        }),
        invalidatesTags: ["comments"],
      }
    ),

    getUserInfoByToken: build.query<LoginResponseTransFormed, void>({
      query: () => ({ url: `${API_URL.USER_INFO}s` }),
      transformResponse: (response: LoginResponse) => {
        const transformedResponse = { ...response.user };
        return transformedResponse;
      },
      transformErrorResponse: (response: { status: string | number }) => {
        console.log(response.status);
        return response.status;
      },

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        //start
        try {
          const { data } = await queryFulfilled;
          //success
          const { email, username, bio, image } = data;
          const userDataFromServer = {
            name: username,
            bio: bio,
            email: email,
            imageURL: image,
          };
          dispatch(userSliceActions.setIsLogined(userDataFromServer));
        } catch (err) {
          //err
        }
      },

      providesTags: (result) => ["userInfo"],
    }),

    getAuthorInfoByToken: build.query<AuthorInfoResponse, AuthorInfoInput>({
      query: ({ author, token }) => ({
        url: `${API_URL.GET_AUTHOR_INFO(author)}`,
        headers: { authorization: `Token ${token}` },
      }),
      providesTags: (result) => ["authorInfo"],
    }),

    getGlobalPosts: build.query<getPostsResponse, getFeedInput>({
      query: ({ token, offset, limit }) => ({
        url: `${API_URL.GLOBAL_POSTS(offset, limit)}`,
        headers: { authorization: `Token ${token}` },
      }),
      providesTags: (result) => ["post"],
    }),

    getMyFeed: build.query<getPostsResponse, getFeedInput>({
      query: ({ token, offset, limit }) => ({
        url: `${API_URL.MY_FEED(offset, limit)}`,

        headers: { authorization: `Token ${token}` },
      }),
      providesTags: (result) => ["post"],
    }),

    getGlobalFeedByTag: build.query<getPostsResponse, getFeedByTagNameInput>({
      query: ({ tagname, token, offset, limit }) => ({
        url: `${API_URL.GLOBAL_WITH_TAG(tagname, offset, limit)}`,
        headers: { authorization: `Token ${token}` },
      }),
      providesTags: (result) => ["post"],
    }),

    getAuthorPosts: build.query<getPostsResponse, getAuthorPostsInput>({
      query: ({ author, token, offset, limit }) => ({
        url: `${API_URL.AUTHOR_POSTS(author, offset, limit)}`,
        headers: { authorization: `Token ${token}` },
      }),
      providesTags: (result) => ["post"],
    }),

    getAuthorFavoritedPosts: build.query<getPostsResponse, getAuthorPostsInput>(
      {
        query: ({ author, token, offset, limit }) => ({
          url: `${API_URL.AUTHOR_LIKED_POSTS(author, offset, limit)}`,
          headers: { authorization: `Token ${token}` },
        }),
      }
    ),

    getPopularTags: build.query<getAllPopularTagsResponse, boolean>({
      query: () => ({
        url: `${API_URL.POPULAR_TAGS}`,
      }),
    }),

    getSelectedPost: build.query<getSelectedPostResponse, getSelectedPostInput>(
      {
        query: ({ slug, token }) => ({
          url: `${API_URL.POST_BY_SLUG(slug)}`,
          headers: { authorization: `Token ${token}` },
        }),
        providesTags: (result) => ["selectedPost"],
      }
    ),

    newPost: build.mutation<any, any>({
      query: ({ postData, token }) => ({
        url: `${API_URL.POST_NEW_ARTICLE}`,
        method: "POST",
        body: postData,
        headers: { authorization: `Token ${token}` },
      }),
    }),

    deleteSelectedPost: build.mutation<
      getSelectedPostResponse,
      getSelectedPostInput
    >({
      query: ({ slug, token }) => ({
        url: `${API_URL.POST_BY_SLUG(slug)}`,
        headers: { authorization: `Token ${token}` },
        method: "DELETE",
      }),
    }),

    updateSelectedPost: build.mutation<getSelectedPostResponse, any>({
      query: ({ slug, postData, token }) => ({
        url: `${API_URL.POST_BY_SLUG(slug)}`,
        headers: { authorization: `Token ${token}` },
        method: "PUT",
        body: postData,
      }),
    }),
  }),
});
