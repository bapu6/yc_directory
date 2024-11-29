/** @format */

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { QUERY_AUTHOR_BY_GITHUB_ID } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({
      user: { name, email, image },
      profile: { id, login, bio },
    }) {
      const existingUser =
        (await client
          .withConfig({ useCdn: false })
          .fetch(QUERY_AUTHOR_BY_GITHUB_ID, {
            id,
          })) || {};

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(QUERY_AUTHOR_BY_GITHUB_ID, {
            id: profile?.id,
          });
        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token?.id });
      return session;
    },
  },
});