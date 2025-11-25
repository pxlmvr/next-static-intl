import { Messages } from './types'

export const translate = (
    messages: Messages,
    key: string,
    params?: Record<string, string>
): string => {
    const parts = key.split('.')
    let value: string | Messages = messages

    for (const part of parts) {
        if (typeof value === 'object' && value !== null && part in value) {
            value = value[part]
        } else {
            return key
        }
    }

    if (typeof value !== 'string') return key

    if (params) {
        let final = value
        for (const [name, paramValue] of Object.entries(params)) {
            const regex = new RegExp(`{${name}}`, 'g')
            final = final.replace(regex, paramValue)
        }
        return final
    }

    return value
}
