import React from 'react'
import { Locale, Messages } from '../shared/types'
import { TClient } from './createTClient'

export type TranslationContextType = {
    locale: Locale
    messages: Messages
    t: TClient
}

export const TranslationContext =
    React.createContext<TranslationContextType | null>(null)
