'use client'

import React, { useMemo } from 'react'

import { createTClient } from './createTClient'
import { Messages } from '../shared/types'
import { TranslationContext } from './context'

type Props = {
    children: React.ReactNode
    locale: string
    messages: Messages
}

export const TranslationProvider: React.FC<Props> = ({
    locale,
    messages,
    children,
}) => {
    const t = useMemo(() => createTClient(messages), [messages])

    return (
        <TranslationContext.Provider value={{ locale, messages, t }}>
            {children}
        </TranslationContext.Provider>
    )
}
