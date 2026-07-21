import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = createImageUrlBuilder(client)
export function urlFor(source) {
  return builder.image(source)
}

// ---- GROQ Queries ----

export async function getSliderImages() {
  return client.fetch(`*[_type == "slider"] | order(order asc) {
    _id, title, alt, image
  }`)
}

export async function getBlogPosts() {
  return client.fetch(`*[_type == "blogPost"] | order(publishedAt desc) {
    _id, title, slug, publishedAt, mainImage, summary,
    category->{ title, slug }
  }`)
}

export async function getBlogPost(slug) {
  return client.fetch(`*[_type == "blogPost" && slug.current == $slug][0] {
    _id, title, slug, publishedAt, mainImage, body,
    category->{ title, slug }
  }`, { slug })
}

export async function getBlogCategories() {
  return client.fetch(`*[_type == "blogCategory"] | order(title asc) {
    _id, title, slug
  }`)
}

export async function getReferences() {
  return client.fetch(`*[_type == "referans"] | order(order asc) {
    _id, title, category, thumbnail, streetViewUrl, description
  }`)
}

export async function getReferenceById(id) {
  return client.fetch(`*[_type == "referans" && _id == $id][0] {
    _id, title, category, thumbnail, streetViewUrl, sector,
    telephoneNumber, address, gallery, description
  }`, { id })
}

export async function getFaqs() {
  return client.fetch(`*[_type == "faq"] | order(order asc) {
    _id, question, answer
  }`)
}

export async function getServices() {
  return client.fetch(`*[_type == "service"] | order(order asc) {
    _id, title, icon, description
  }`)
}

export async function getWhoCanBenefit() {
  return client.fetch(`*[_type == "whoCanBenefit"] | order(order asc) {
    _id, title, icon
  }`)
}

export async function getVirtualTourAdvantages() {
  return client.fetch(`*[_type == "virtualTourAdvantage"] | order(order asc) {
    _id, title, image, description
  }`)
}

export async function getTeamMembers() {
  return client.fetch(`*[_type == "teamMember"] | order(order asc) {
    _id, name, title, photo, bio
  }`)
}
