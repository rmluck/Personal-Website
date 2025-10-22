import { defineField, defineType } from 'sanity'

export const gameType = defineType({
  name: 'game',
  title: 'Game',
  type: 'document',
  fields: [
    defineField({
      name: 'homeTeam',
      title: 'Home Team',
      type: 'reference',
      to: [{ type: 'team' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'awayTeam',
      title: 'Away Team',
      type: 'reference',
      to: [{ type: 'team' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'gameDate',
      title: 'Game Date & Time',
      type: 'datetime'
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Stadium/Arena name or city'
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
      name: 'week',
      title: 'Week/Round',
      type: 'string',
      description: 'e.g., "Week 7", "Round 1", etc.'
    }),
    defineField({
        name: 'homeTeamRank',
        title: 'Home Team Rank',
        type: 'number',
        description: 'Leave blank if unranked'
    }),
    defineField({
        name: 'homeTeamRecord',
        title: 'Home Team Record',
        type: 'string',
        description: 'e.g., "7-0", "5-2", etc.'
    }),
    defineField({
        name: 'awayTeamRank',
        title: 'Away Team Rank',
        type: 'number',
        description: 'Leave blank if unranked'
    }),
    defineField({
        name: 'awayTeamRecord',
        title: 'Away Team Record',
        type: 'string',
        description: 'e.g., "7-0", "5-2", etc.'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: any) => `${doc.awayTeam?.name || 'away'}-${doc.homeTeam?.name || 'home'}-${doc.week || ''}`,
        maxLength: 96,
      },
    }),
  ],
  preview: {
    select: {
      homeTeam: 'homeTeam.name',
      awayTeam: 'awayTeam.name',
      gameDate: 'gameDate',
      week: 'week',
      homeRank: 'homeTeamRank',
      awayRank: 'awayTeamRank',
    },
    prepare({ homeTeam, awayTeam, gameDate, week }) {
      const date = gameDate ? new Date(gameDate).toLocaleDateString() : '';
      return {
        title: `${awayTeam || 'Away'} @ ${homeTeam || 'Home'}`,
        subtitle: `${week || ''} - ${date}`
      }
    }
  }
})