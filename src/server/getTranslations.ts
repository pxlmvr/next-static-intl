import { Messages } from '../shared/types'
import { createTServer } from './createTServer'

export function getTranslations(locale: string, messages: Messages) {
    return createTServer(messages)
}
