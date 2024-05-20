"use client";

// NOTE: wip for client functions

import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import { SearchParams, WpPost, getPosts } from "./scratch";

export const usePosts = <T extends WpPost>(
  params: SearchParams = {},
  config?: SWRConfiguration<T[], Error>
): SWRResponse<T[], Error> => {
  return useSWR<T[], Error>(params, (params) => getPosts<T>(params), config);
};

// TODO: add usePost, usePages, usePage, etc...
