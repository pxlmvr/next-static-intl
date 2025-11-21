import { createT } from './createT'
import { Messages } from './types'

export function getTranslations(locale: string, messages: Messages) {
    return createT(messages)
}
