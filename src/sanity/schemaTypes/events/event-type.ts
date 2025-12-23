import { defineField, defineType } from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'eventTitle',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
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
      name: 'dj',
      title: 'DJ or Category',
      type: 'string',
      description: 'DJ name or event category',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ticketLink',
      title: 'Ticket Link',
      type: 'url',
      description: 'Link to Posh VIP or native checkout',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isLive',
      title: 'Is Live',
      type: 'boolean',
      description: 'Highlight current shows',
      initialValue: false,
    }),
    defineField({
      name: 'venueName',
      title: 'Venue Name',
      type: 'string',
      description: 'Name of the venue (e.g., "Mana Wynwood")',
    }),
    defineField({
      name: 'venueAddress',
      title: 'Venue Address',
      type: 'string',
      description: 'Street address',
    }),
    defineField({
      name: 'venueCity',
      title: 'Venue City',
      type: 'string',
      description: 'City and state (e.g., "Miami, FL 33127")',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Text for the call-to-action button (e.g., "JOIN US IN MIAMI")',
      initialValue: 'GET TICKETS',
    }),
    defineField({
      name: 'agenda',
      title: 'Agenda',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
              description: 'Day name and date (e.g., "Tuesday • NOV 18th")',
            },
            {
              name: 'items',
              title: 'Agenda Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'timePeriod',
                      title: 'Time Period',
                      type: 'string',
                      description: 'MORNING, LUNCH, AFTERNOON, EVENING, etc.',
                    },
                    {
                      name: 'activity',
                      title: 'Activity',
                      type: 'string',
                      description: 'Description of the activity',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'eventTitle',
      subtitle: 'dj',
      media: 'image',
    },
  },
})

