import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { API_URL } from "./API_URL";
import { localStorageService } from "../services/LSService";

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL.BASE_URL,
  prepareHeaders: (headers) => {
    const LStoken = localStorageService.getToken() || "";
    headers.set("authorization", `Token ${LStoken}`);
    return headers;
  },
});
