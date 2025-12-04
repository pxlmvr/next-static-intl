import { Messages } from '../shared/types'
import { createTServer } from './createTServer'

export function getTranslations(messages: Messages) {
  return createTServer(messages)
}
