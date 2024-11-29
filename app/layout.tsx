/** @format */

import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import "easymde/dist/easymde.min.css";
import { Toaster } from "@/components/ui/toaster";

const workSans = localFont({
  src: [
    {
      path: "./fonts/WorkSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Black.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Black.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Black.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Black.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Black.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Black.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Black.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Black.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "YC Directory",
  description: "Pitch your startup idea to the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workSans.variable}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
