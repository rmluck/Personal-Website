import { defineField, defineType } from 'sanity'

export const teamType = defineType({
  name: 'team',
  title: 'Team',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Team Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'abbreviation',
      title: 'Abbreviation',
      type: 'string',
      validation: Rule => Rule.required().max(10)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'sport',
      title: 'Sport',
      type: 'string',
      options: {
        list: [
          { title: 'College Football', value: 'college-football' },
          { title: 'NFL', value: 'nfl' },
          { title: 'NBA', value: 'nba' },
          { title: 'College Basketball', value: 'college-basketball' },
        ]
      }
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary Color',
      type: 'string',
      description: 'Hex color code (e.g., #FF6B35)',
      validation: Rule => Rule.regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, {
        name: 'hex color',
        invert: false,
      }).error('Must be a valid hex color code'),
    }),
    defineField({
      name: 'conference',
      title: 'Conference/Division',
      type: 'string',
      description: 'e.g., SEC, Big Ten, AFC East, etc.'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'sport',
      media: 'logo'
    }
  }
})