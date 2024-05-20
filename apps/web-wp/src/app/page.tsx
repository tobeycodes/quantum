import { Posts } from "@/components/posts";
import { convertYoastToMetadata, getHomePage } from "@/utils/scratch";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const homePage = await getHomePage();

  return convertYoastToMetadata(homePage);
}

export default async function Home() {
  const { title } = await getHomePage();

  return (
    <main>
      <h1>{title.rendered}</h1>

      <Posts />
    </main>
  );
}
