import { createClient } from 'next-sanity';
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const apiKey = process.env.NEXT_PUBLIC_SANITY_API_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: process.env.NODE_ENV === 'production', // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
});

export const urlBuilder = (source) => imageUrlBuilder(client).image(source);