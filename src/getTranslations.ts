import { createT } from './createT'
import { Messages } from './types'

export const getTranslations = (messages: Messages) => {
    return createT(messages)
}
