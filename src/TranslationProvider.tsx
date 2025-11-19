import { TranslationContext } from './context'
import { Messages } from './types'

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
    const t = (key: string, params?: Record<string, string>): string => {
        const parts = key.split('.')

        let result: string | Messages = messages

        for (const part of parts) {
            if (
                typeof result === 'object' &&
                result !== null &&
                part in result
            ) {
                result = result[part]
            } else {
                return key
            }
        }

        // FIXME: handle multiple interpolations correctly
        if (typeof result === 'string' && params) {
            const tempResult: string = result // this is necessary because in the forEach loop result is no longer narrowed to string
            Object.keys(params).forEach((paramKey) => {
                const regex = new RegExp(`{${paramKey}}`, 'g')
                result = tempResult.replace(regex, params[paramKey])
            })
        }

        return typeof result === 'string' ? result : key
    }

    return (
        <TranslationContext.Provider value={{ locale, messages, t }}>
            {children}
        </TranslationContext.Provider>
    )
}
