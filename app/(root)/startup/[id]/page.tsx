/** @format */

import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdown from "markdown-it";

import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { PLAYLIST_BY_SLUG_QUERY, STARTUPS_BY_ID } from "@/sanity/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartUpTypeCard } from "@/components/StartupCard";

export const experimental_ppr = true;

const md = markdown();

const StartUp = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params)?.id;

  const [post, { select: softwarePosts }] = await Promise.all([
    await client.fetch(STARTUPS_BY_ID, { id }),
    await client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "software" }),
  ]);

  const parsedContent = md.render(post?.pitch || "");

  if (!post) return notFound();

  return (
    <>
      <section className="pink_container">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post?.title}</h1>
        <p className="sub-heading !max-w-5xl">{post?.description}</p>
      </section>
      <section className="section_container">
        <Image
          src={post?.image || null}
          alt="post-image"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto rounded-xl"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post?.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post?.author?.image || null}
                alt="author-image"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post?.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post?.author?.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post?.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              dangerouslySetInnerHTML={{
                __html: parsedContent,
              }}
              className="prose max-w-4xl font-work-sans break-all"
            ></article>
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>
        <hr className="divider !w-full" />

        {softwarePosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Software posts</p>
            <ul className="mt-7 card_grid-sm">
              {softwarePosts.map((post: StartUpTypeCard) => (
                <StartupCard key={post?._id} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default StartUp;
