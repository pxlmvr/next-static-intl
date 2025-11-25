import { Messages } from '../shared/types'
import { createTServer } from './createTserver'

export function getTranslations(locale: string, messages: Messages) {
    return createTServer(messages)
}
