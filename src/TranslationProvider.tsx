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
    const t = (key: string): string => {
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
        return typeof result === 'string' ? result : key
    }

    return (
        <TranslationContext.Provider value={{ locale, messages, t }}>
            {children}
        </TranslationContext.Provider>
    )
}
