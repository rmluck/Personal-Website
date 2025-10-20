import { defineField, defineType } from 'sanity'

export const gamePicksType = defineType({
  name: 'gamePicks',
  title: 'Game Picks',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Picks Title',
      type: 'string',
      initialValue: 'Game Picks'
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'e.g., "Week 7" or "October 19, 2024"'
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
          { title: 'Mixed', value: 'mixed' }
        ]
      }
    }),
    defineField({
      name: 'games',
      title: 'Games',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'game',
              title: 'Game',
              type: 'reference',
              to: [{ type: 'game' }],
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'spread',
              title: 'Spread',
              type: 'string',
              description: 'e.g., "Oregon -3.5" or "Pick\'em"'
            }),
            defineField({
              name: 'overUnder',
              title: 'Over/Under',
              type: 'number',
              description: 'Total points line'
            }),
            defineField({
              name: 'straightUpPick',
              title: 'Straight Up Pick',
              type: 'string',
              options: {
                list: [
                  { title: 'Home Team', value: 'home' },
                  { title: 'Away Team', value: 'away' }
                ]
              }
            }),
            defineField({
              name: 'spreadPick',
              title: 'Against the Spread Pick',
              type: 'string',
              options: {
                list: [
                  { title: 'Home Team', value: 'home' },
                  { title: 'Away Team', value: 'away' }
                ]
              }
            }),
            defineField({
              name: 'overUnderPick',
              title: 'Over/Under Pick',
              type: 'string',
              options: {
                list: [
                  { title: 'Over', value: 'over' },
                  { title: 'Under', value: 'under' }
                ]
              }
            }),
            defineField({
              name: 'confidence',
              title: 'Confidence Level',
              type: 'string',
              options: {
                list: [
                  { title: 'Low', value: 'low' },
                  { title: 'Medium', value: 'medium' },
                  { title: 'High', value: 'high' }
                ]
              }
            }),
            defineField({
              name: 'analysis',
              title: 'Game Analysis',
              type: 'text',
              rows: 4,
              description: 'Your analysis and reasoning for the picks'
            }),
            defineField({
              name: 'keyFactors',
              title: 'Key Factors',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Key factors influencing your pick'
            })
          ],
          preview: {
            select: {
              awayTeam: 'game.awayTeam.name',
              homeTeam: 'game.homeTeam.name',
              spread: 'spread',
              straightUpPick: 'straightUpPick'
            },
            prepare({ awayTeam, homeTeam, spread, straightUpPick }) {
              return {
                title: `${awayTeam || 'Away'} @ ${homeTeam || 'Home'}`,
                subtitle: `${spread || 'No spread'} | Pick: ${straightUpPick || 'None'}`
              }
            }
          }
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle'
    },
    prepare({ title, subtitle }) {
      return {
        title: title,
        subtitle: subtitle
      }
    }
  }
})