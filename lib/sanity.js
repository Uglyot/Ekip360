import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

const builder = createImageUrlBuilder(client);
export function urlFor(source) {
  // auto=format: Accept basligina gore WebP/AVIF uretir; tum sayfalarda byte kazanci.
  return builder.image(source).auto("format");
}

const sanityFetchOptions = { next: { revalidate: 60 } };

// ---- GROQ Queries ----

export async function getSliderImages() {
  return client.fetch(
    `*[_type == "slider"] | order(order asc) {
      _id, title, alt, image
    }`,
    {},
    sanityFetchOptions,
  );
}

export async function getBlogPosts() {
  return client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      _id, title, slug, publishedAt, mainImage, summary,
      category->{ title, slug }
    }`,
    {},
    sanityFetchOptions,
  );
}

export async function getBlogPost(slug) {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
    _id, title, slug, publishedAt, mainImage, body,
    category->{ title, slug }
  }`,
    { slug },
    sanityFetchOptions,
  );
}

export async function getBlogCategories() {
  return client.fetch(
    `*[_type == "blogCategory"] | order(title asc) {
      _id, title, slug
    }`,
    {},
    sanityFetchOptions,
  );
}

export async function getReferences() {
  return client.fetch(
    `*[_type == "referans"] | order(order asc) {
      _id, title, category, thumbnail, streetViewUrl
    }`,
    {},
    sanityFetchOptions,
  );
}

export async function getReferenceById(id) {
  return client.fetch(
    `*[_type == "referans" && _id == $id][0] {
    _id, title, category, thumbnail, streetViewUrl, sector,
    telephoneNumber, address, gallery, description
  }`,
    { id },
    sanityFetchOptions,
  );
}
