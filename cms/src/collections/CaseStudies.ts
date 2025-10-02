import type { CollectionConfig } from 'payload'

export const caseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'title',
  },
  auth: false,
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'link',
      type: 'text',
      required: false,
    },
    {
      name: 'Images',
      type: 'array',
      minRows: 1,
      maxRows: 1,
      fields: [
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'projectImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },

    // Email added by default
    // Add more fields as needed
  ],
}
