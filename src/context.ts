import React from 'react'
import { Locale, Messages } from './types'
import { TFunction } from './createT'

export type TranslationContextType = {
    locale: Locale
    messages: Messages
    t: TFunction
}

export const TranslationContext =
    React.createContext<TranslationContextType | null>(null)
