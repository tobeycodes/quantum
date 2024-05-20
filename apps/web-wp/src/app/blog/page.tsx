import {
  getPosts,
  convertYoastToMetadata,
  getPostsPage,
} from "@/utils/scratch";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// TODO: Handle metadata <title>Blog - Page 2 of 2 - quantum</title>
export async function generateMetadata(): Promise<Metadata> {
  const postsPage = await getPostsPage();
  if (!postsPage) {
    return notFound();
  }

  return convertYoastToMetadata(postsPage);
}

export default async function Posts() {
  const posts = await getPosts();

  return (
    <main>
      {posts.map((post) => (
        <div>{post.title.rendered}</div>
      ))}
    </main>
  );
}
