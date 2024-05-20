import { Posts } from "@/components/posts";
import { SearchParams, convertYoastToMetadata, getPage } from "@/utils/scratch";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string[] };
  searchParams: SearchParams;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPage(params);
  if (!page) {
    return notFound();
  }

  return convertYoastToMetadata(page);
}

export default async function Page({ params }: Props) {
  const page = await getPage(params);
  if (!page) {
    return notFound();
  }

  const {
    title: { rendered: title },
  } = page;

  return (
    <main>
      <h1>{title}</h1>

      <Posts />
    </main>
  );
}
