import React from 'react'
import { Locale, Messages } from './types'

export type TranslationContextType = {
    locale: Locale
    messages: Messages
    t: (key: string, params?: Record<string, string>) => string
}

export const TranslationContext =
    React.createContext<TranslationContextType | null>(null)
