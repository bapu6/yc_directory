/** @format */

declare module "next-auth" {
  interface Session {
    id: string;
  }
  interface Jwt {
    id: string;
  }
}