import { defineField, defineType } from 'sanity'

export const radioShowType = defineType({
  name: 'radioShow',
  title: 'Radio Show (Schedule)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Show Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dj',
      title: 'DJ',
      type: 'reference',
      to: [{ type: 'dj' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'coverArt',
      title: 'Cover Art',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'startTime',
      title: 'Start Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endTime',
      title: 'End Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      description: 'Optional: highlight this show in the UI',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      djName: 'dj.name',
      start: 'startTime',
      media: 'coverArt',
    },
    prepare({ title, djName, start, media }) {
      const startLabel = start ? new Date(start).toLocaleString() : ''
      return {
        title: title || 'Radio Show',
        subtitle: [djName, startLabel].filter(Boolean).join(' • '),
        media,
      }
    },
  },
})

