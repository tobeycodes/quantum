import {
  SearchParams,
  convertYoastToMetadata,
  getPosts,
  getPostsPage,
} from "@/utils/scratch";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { page: string };
  searchParams: SearchParams;
};

export async function generateMetadata(): Promise<Metadata> {
  const postsPage = await getPostsPage();
  if (!postsPage) {
    return notFound();
  }

  return convertYoastToMetadata(postsPage);
}

export default async function Posts({ params }: Props) {
  if (params.page === "1") {
    return notFound();
  }

  const posts = await getPosts(params);

  return (
    <main>
      {posts.map((post) => (
        <div>{post.title.rendered}</div>
      ))}
    </main>
  );
}
