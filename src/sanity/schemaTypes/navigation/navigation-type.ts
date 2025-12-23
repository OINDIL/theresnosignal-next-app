import { defineField, defineType } from 'sanity'

export const navigationLinkType = defineType({
    name: 'navigation',
    title: 'Navigation',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: "href",
            type: "string"
        }),
        defineField({
            name: "isVisible",
            type: "boolean",
        })
    ],
})

