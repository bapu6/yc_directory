/** @format */

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className="px-5 py-3 bg-white shadow-sm">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              <button
                onClick={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <span className="max-sm:hidden">Logout</span>
                <LogOut className="size-6 sm:hidden text-red-500" />
              </button>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage src={session?.user?.image || ""} />
                  <AvatarFallback className="bg-black-300" />
                </Avatar>
              </Link>
            </>
          ) : (
            <button
              onClick={async () => {
                "use server";
                // await signIn("github");
                await signIn("google"); //use for google sign in
              }}
            >
              <span>Login</span>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
