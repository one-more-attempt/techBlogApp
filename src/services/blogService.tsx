import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "./API_URL";

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

    // getGlobalFeedByTag 

  }),
});
