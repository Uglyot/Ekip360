import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'slider',
  title: 'Slider Görseli',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık (İçeride kullanım için)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Görsel',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Görsel Açıklaması (alt text)',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Sıra',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image' },
  },
})
