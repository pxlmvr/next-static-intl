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

    return (
        <TranslationContext.Provider value={{ locale, messages, t }}>
            {children}
        </TranslationContext.Provider>
    )
}
