/** @format */

import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
  _id,
  title,
  slug,
  _createdAt,
  author->{
  _id, name, slug, bio, image, title
  },
  views,
  description,
  category,
  image
}`);

export const STARTUPS_BY_ID =
  defineQuery(`*[_type == "startup" && _id == $id ][0]{
  _id,
  title,
  slug,
  _createdAt,
  author->{
  _id, name, slug, bio, image, title, username
  },
  views,
  description,
  category,
  image,
  pitch
}`);

export const STARTUPS_VIEWS_BY_ID =
  defineQuery(`*[_type == "startup" && _id == $id ][0]{
  _id,
  views,
}`);

export const QUERY_AUTHOR_BY_GITHUB_ID =
  defineQuery(`*[_type=="author" && id==$id][0]{
  _id,
  id,
  name,
  username,
  email,
  bio,
  image,
}`);
