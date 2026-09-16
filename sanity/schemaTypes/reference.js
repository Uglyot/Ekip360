import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'referans',
  title: 'Referans',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'İşletme Adı',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Oteller', value: 'Hotels' },
          { title: 'Otomotiv', value: 'Automotive' },
          { title: 'Kafe-Pastaneler', value: 'CafeBakeries' },
          { title: 'Restoran-Bar', value: 'RestaurantBar' },
          { title: 'Spor Salonları', value: 'Gyms' },
          { title: 'Hastaneler', value: 'Hospitals' },
          { title: 'Kişisel Bakım', value: 'PersonalCare' },
          { title: 'Showroomlar', value: 'Showrooms' },
          { title: 'Sanat Galerileri', value: 'ArtGalleries' },
          { title: 'Küçük İşletmeler', value: 'SmallBusiness' },
          { title: 'Diğer', value: 'Other' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Küçük Görsel',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'streetViewUrl',
      title: 'Google Street View Bağlantısı',
      type: 'url',
    }),
    defineField({
      name: 'sector',
      title: 'Sektör',
      type: 'string',
    }),
    defineField({
      name: 'telephoneNumber',
      title: 'Telefon Numarası',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Adres',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'gallery',
      title: 'Galeri Fotoğrafları',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'description',
      title: 'Açıklama',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'website',
      title: 'Web Sitesi',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Sıra',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'thumbnail' },
  },
})
