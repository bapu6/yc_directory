/** @format */

"use server";

import slugify from "slugify";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  const session = await auth();
  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );

  const slug = slugify(title as string, { lower: true, strict: true });
  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
      views: 0,
    };
    const result = await writeClient
      .withConfig({ useCdn: false })
      .create({ _type: "startup", ...startup });
    const response = parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
    return response;
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
