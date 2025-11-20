import React, { ReactNode } from 'react'
import { Messages } from './types'

export interface TFunction {
    (key: string, params?: Record<string, string>): string
    rich(
        key: string,
        renderers: Record<string, (chunks: ReactNode) => ReactNode>
    ): ReactNode
}

const translate = (
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

const translateRich = (
    messages: Messages,
    key: string,
    renderers: Record<string, (chunks: React.ReactNode) => React.ReactNode>
): React.ReactNode => {
    const raw = translate(messages, key)

    const tagRegex = /<(\w+)>(.*?)<\/\1>/gs

    const parts: React.ReactNode[] = []
    let last = 0
    let match

    while ((match = tagRegex.exec(raw))) {
        const [full, tagName, content] = match

        if (match.index > last) {
            parts.push(raw.slice(last, match.index))
        }

        if (renderers[tagName]) {
            parts.push(renderers[tagName](content))
        } else {
            parts.push(full)
        }

        last = match.index + full.length
    }

    if (last < raw.length) {
        parts.push(raw.slice(last))
    }

    return <React.Fragment>{parts}</React.Fragment>
}

export const createT = (messages: Messages): TFunction => {
    const t = ((key: string, params?: Record<string, string>) => {
        return translate(messages, key, params)
    }) as TFunction

    t.rich = (
        key: string,
        renderers: Record<string, (chunks: ReactNode) => ReactNode>
    ) => {
        return translateRich(messages, key, renderers)
    }

    return t
}
