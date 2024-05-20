// NOTE: wip for server functions

import { Metadata } from "next";

export type SearchParams = { [key: string]: string | string[] | undefined };

export interface WpRestError {
  code: string;
  message: string;
  data: {
    status: number;
  };
}

// TODO: complete types
export interface WpPost {
  link: string;
  title: {
    rendered: string;
  };
  yoast_head_json: {
    title: string;
  };
}

const RESPONSE_NOT_OK = "Failed to fetch";

export const wpFetch = async <T extends object>(
  route: string,
  params?: SearchParams
): Promise<T> => {
  const searchParams = new URLSearchParams();

  if (params) {
    for (const key in params) {
      const value = params[key];
      if (value === undefined) {
        continue;
      }

      if (Array.isArray(value)) {
        for (const item of value) {
          searchParams.append(key, item);
        }
      }

      if (typeof value === "string") {
        searchParams.append(key, value);
      }
    }
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}${route}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
  );

  if (!response.ok) {
    throw new Error(RESPONSE_NOT_OK);
  }

  const data = (await response.json()) as WpRestError | T;

  if ("code" in data) {
    throw new Error(data.message);
  }

  return data;
};

export const getHomePage = async (): Promise<WpPost> => {
  return wpFetch<WpPost>("/wp-json/quantum/v1/homepage");
};

export const getPostsPage = async (): Promise<WpPost> => {
  return wpFetch<WpPost>("/wp-json/quantum/v1/postspage");
};

export const getPosts = async <T extends WpPost>(
  params?: SearchParams
): Promise<T[]> => {
  return wpFetch<T[]>(`/wp-json/wp/v2/posts`, params);
};

export const getPages = async <T extends WpPost>(
  params?: SearchParams
): Promise<T[]> => {
  return wpFetch<T[]>("/wp-json/wp/v2/pages", params);
};

export const getPage = async <T extends WpPost>(
  params: SearchParams
): Promise<T | undefined> => {
  if (!params.slug) {
    return undefined;
  }

  const apiHost = process.env.NEXT_PUBLIC_API_HOST ?? "";
  const slug = Array.isArray(params.slug) ? params.slug : [params.slug];
  const pages = await wpFetch<T[]>(`/wp-json/wp/v2/pages`, {
    slug,
    per_page: "1",
  });

  const page = pages[0];
  if (!page) {
    return page;
  }

  const links = page.link
    .replace(apiHost, "")
    .split("/")
    .filter((n) => n);

  if (slug.join() !== links.join()) {
    return undefined;
  }

  return page;
};

// TODO: add all meta data
export const convertYoastToMetadata = <T extends WpPost>(
  post: T
): Metadata => ({
  title: post.yoast_head_json.title,
});
