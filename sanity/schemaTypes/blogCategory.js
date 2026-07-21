import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blogCategory',
  title: 'Blog Kategorisi',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
  ],
})
