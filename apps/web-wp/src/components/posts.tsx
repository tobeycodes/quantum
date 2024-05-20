"use client";

import { usePosts } from "@/utils/scratch-client";

export const Posts = () => {
  const { data, isLoading, error } = usePosts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div>
      {data.map((post) => (
        <div>{post.title.rendered}</div>
      ))}
    </div>
  );
};
