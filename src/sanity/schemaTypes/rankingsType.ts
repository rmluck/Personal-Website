import { defineField, defineType } from 'sanity'

export const rankingsType = defineType({
    name: "rankings",
    title: "Power Rankings",
    type: "object",
    fields: [
        defineField({
            name: "title",
            title: "Rankings Title",
            type: "string",
            initialValue: "Power Rankings",
        }),
        defineField({
            name: "subtitle",
            title: "Subtitle",
            type: "string",
            description: "e.g., 'Week 7' or 'October 2024'",
        }),
        defineField({
            name: "sport",
            title: "Sport",
            type: "string",
            options: {
                list: [
                    { title: "College Football", value: "college-football" },
                    { title: "NFL", value: "nfl" },
                    { title: "NBA", value: "nba" },
                    { title: "NBA", value: "nba" },
                    { title: "College Basketball", value: "college-basketball" },
                    { title: "Other", value: "other" },
                ]
            }
        }),
        defineField({
            name: "entities",
            title: "Entities",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        defineField({
                            name: "rank",
                            title: "Rank",
                            type: "number",
                            validation: Rule => Rule.required().min(1).max(200)
                        }),
                        defineField({
                            name: "team",
                            title: "Team Name",
                            type: "reference",
                            to: [{ type: "team" }],
                            validation: Rule => Rule.required()
                        }),
                        defineField({
                            name: "record",
                            title: "Record",
                            type: "string",
                            description: "e.g., '7-0', '5-2', etc.",
                        }),
                        defineField({
                            name: "movement",
                            title: "Movement",
                            type: "string",
                            options: {
                                list: [
                                    { title: "No Change", value: "none" },
                                    { title: "Up", value: "up" },
                                    { title: "Down", value: "down" },
                                    { title: "New", value: "new" },
                                ],
                            },
                        }),
                        defineField({
                            name: "movementAmount",
                            title: "Movement Amount",
                            type: "number",
                            description: "How many spots they moved (if applicable)",
                        }),
                        defineField({
                            name: "analysis",
                            title: "Analysis",
                            type: "text",
                            description: "Detailed analysis of this team's ranking",
                        }),
                        defineField({
                            name: "lastWeek",
                            title: "Last Week",
                            type: "string",
                            description: "e.g., 'W 35-21 vs Alabama' or 'L 28-31 @ Oregon'",
                        }),
                        defineField({
                            name: "thisWeek",
                            title: "This Week",
                            type: "string",
                            description: "e.g., '@ Georgia' or 'vs Missouri'",
                        }),
                    ],
                    preview: {
                        select: {
                            title: "team.name",
                            subtitle: "record",
                            rank: "rank",
                            media: "team.logo",
                        },
                        prepare({ title, subtitle, rank, media }) {
                            return {
                                title: `${rank}. ${title}`,
                                subtitle: subtitle,
                                media: media,
                            }
                        },
                    },
                }
            ],
        }),
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "subtitle",
        },
        prepare({ title, subtitle }) {
            return {
                title: title,
                subtitle: subtitle,
            }
        },
    },
})