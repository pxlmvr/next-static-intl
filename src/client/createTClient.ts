'use client'

import React, { ReactNode } from 'react'
import { Messages } from '../shared/types'
import { translate } from '../shared/translate'

export interface TClient {
    (key: string, params?: Record<string, string>): string
    rich(
        key: string,
        renderers: Record<string, (chunks: ReactNode) => ReactNode>
    ): ReactNode
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

    return React.createElement(React.Fragment, null, parts)
}

export function createTClient(messages: Messages): TClient {
    const t = ((key, params) => translate(messages, key, params)) as TClient

    t.rich = (key, renderers) => translateRich(messages, key, renderers)

    return t
}
