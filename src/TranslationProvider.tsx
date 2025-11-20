import React, { useMemo } from 'react'
import { TranslationContext } from './context'
import { Messages } from './types'
import { createT } from './createT'

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
    const t = useMemo(() => createT(messages), [messages])

    return (
        <TranslationContext.Provider value={{ locale, messages, t }}>
            {children}
        </TranslationContext.Provider>
    )
}
