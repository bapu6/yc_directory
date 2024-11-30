/** @format */

import React from "react";
import { unstable_after as after } from "next/server";
import pluralize from "pluralize";

import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { STARTUPS_VIEWS_BY_ID } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

const View = async ({ id }: { id: string }) => {
  const { views = 0 } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUPS_VIEWS_BY_ID, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: views + 1 })
        .commit()
  );

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-bblack">
          {pluralize("view", views)} : {views}
        </span>
      </p>
    </div>
  );
};
export default View;
