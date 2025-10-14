import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'group',
      title: 'Group',
      type: 'string',
      options: {
        list: [
          { title: 'Sports', value: 'sports' },
          { title: 'Entertainment', value: 'entertainment' },
          { title: 'Technology', value: 'technology' },
          { title: 'Lifestyle', value: 'lifestyle' },
          { title: 'Formats', value: 'formats' },
        ],
      },
    })
  ],
})
