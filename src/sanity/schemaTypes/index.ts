import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {rankingsType} from './rankingsType'
import { teamType } from './teamType'
import { gameType } from './gameType'
import { gamePicksType } from './gamePicksType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, rankingsType, teamType, gameType, gamePicksType],
}
