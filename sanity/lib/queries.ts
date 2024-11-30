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

export const QUERY_AUTHOR_BY_ID =
  defineQuery(`*[_type=="author" && _id==$id][0]{
  _id,
  id,
  name,
  username,
  email,
  bio,
  image,
}`);

export const STARTUPS_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "startup" && author._ref==$id] | order(_createdAt desc) {
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

export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);
