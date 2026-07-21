import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Ekip Üyesi',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Ad Soyad',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Unvan',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      title: 'Fotoğraf',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Biyografi',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'order',
      title: 'Sıra',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'title', media: 'photo' },
  },
})
