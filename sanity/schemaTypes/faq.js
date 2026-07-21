import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'Sıkça Sorulan Sorular',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Soru',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Cevap',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Sıra',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'question' },
  },
})
