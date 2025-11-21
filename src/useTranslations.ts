'use client'

import { useContext } from 'react'
import { TranslationContext } from './context'

export const useTranslations = () => {
    const context = useContext(TranslationContext)
    if (!context) {
        throw new Error(
            'useTranslations must be used within a TranslationProvider'
        )
    }
    return context
}
