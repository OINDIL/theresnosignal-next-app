import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { env } from '@/lib/env'

export default defineConfig({
    name: 'default',
    title: 'No Signal Demo',
    basePath: '/studio',

    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: 'production',

    plugins: [structureTool(), visionTool()],

    schema: {
        types: schemaTypes,
    },
})

