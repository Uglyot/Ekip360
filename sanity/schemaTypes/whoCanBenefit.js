import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'whoCanBenefit',
  title: 'Kimler Yararlanabilir',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'İkon Görseli',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Sıra',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'icon' },
  },
})
