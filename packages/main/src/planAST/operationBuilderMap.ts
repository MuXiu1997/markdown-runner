import type { OperationBuilder } from './operation'
import {
  blockquote,
  code,
  heading,
  html,
  inlineCode,
  list,
  listItem,
  paragraph,
  root,
  strong,
  text,
  thematicBreak,
} from './operationBuilders'

const operationBuilderMap = new Map<string, OperationBuilder>([
  ['root', root],
  ['heading', heading],
  ['text', text],
  ['inlineCode', inlineCode],
  ['code', code],
  ['paragraph', paragraph],
  ['list', list],
  ['listItem', listItem],
  ['blockquote', blockquote],
  ['html', html],
  ['strong', strong],
  ['thematicBreak', thematicBreak],
])

export default operationBuilderMap
