/** @format */

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { QUERY_AUTHOR_BY_GITHUB_ID } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

interface GitHubProfile {
  id: string;
  login: string;
  bio?: string;
}

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface Account {
  provider: string;
  type: string;
  providerAccountId: string;
  access_token: string;
  token_type: string;
  scope: string;
}

const config = {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }: { user: User; profile: GitHubProfile }) {
      const existingUser =
        (await client
          .withConfig({ useCdn: false })
          .fetch(QUERY_AUTHOR_BY_GITHUB_ID, {
            id: profile.id,
          })) || {};

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: profile.id,
          name: user.name || "",
          username: profile.login,
          email: user.email || "",
          image: user.image || "",
          bio: profile.bio || "",
        });
      }

      return true;
    },
    async jwt({
      token,
      account,
      profile,
    }: {
      token: Record<string, unknown>;
      account: Account | null;
      profile: GitHubProfile | null;
    }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(QUERY_AUTHOR_BY_GITHUB_ID, {
            id: profile.id,
          });
        token.id = user?._id;
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Record<string, unknown>;
      token: Record<string, unknown>;
    }) {
      Object.assign(session, { id: token?.id });
      return session;
    },
  },
};

// @ts-expect-error - NextAuth v5 beta types are not fully stabilized
export const { handlers, auth, signIn, signOut } = NextAuth(config);
