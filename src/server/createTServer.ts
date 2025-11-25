import { translate } from '../shared/translate'
import { Messages } from '../shared/types'

export interface TServer {
    (key: string, params?: Record<string, string>): string
}

export const createTServer = (messages: Messages) => {
    return (key: string, params?: Record<string, string>): string =>
        translate(messages, key, params)
}
