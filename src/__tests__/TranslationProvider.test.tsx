import { render, screen } from '@testing-library/react'
import React from 'react'
import { TranslationProvider } from '../TranslationProvider'
import { useTranslations } from '../useTranslations'

const TestComponent: React.FC = () => {
    const { t } = useTranslations()
    return (
        <div>
            <p data-testid="simple">{t('hello')}</p>
            <p data-testid="nested">{t('home.title')}</p>
        </div>
    )
}

const NoTranslationTestComponent: React.FC = () => {
    const { t } = useTranslations()
    return (
        <div>
            <p data-testid="noTranslation">{t('foo.baz')}</p>
        </div>
    )
}

const InterpolationTestComponent: React.FC = () => {
    const { t } = useTranslations()
    return (
        <div>
            <p data-testid="interpolated">{t('greeting', { name: 'John' })}</p>
        </div>
    )
}

const RichInterpolationTestComponent: React.FC = () => {
    const { t } = useTranslations()

    return (
        <div>
            <p data-testid="richInterpolated">
                {t.rich('message', {
                    bold: (chunks) => <strong>{chunks}</strong>,
                })}
            </p>
        </div>
    )
}

describe('TranslationProvider', () => {
    const messages = {
        hello: 'Hello',
        home: { title: 'Home Title' },
        greeting: 'greetings, {name}',
    }

    it('returns simple translations', () => {
        render(
            <TranslationProvider locale="en" messages={messages}>
                <TestComponent />
            </TranslationProvider>
        )

        expect(screen.getByTestId('simple')).toHaveTextContent('Hello')
    })

    it('returns nested translations', () => {
        render(
            <TranslationProvider locale="en" messages={messages}>
                <TestComponent />
            </TranslationProvider>
        )

        expect(screen.getByTestId('nested')).toHaveTextContent('Home Title')
    })

    it('returns translation key when no match is found in the messages object', () => {
        render(
            <TranslationProvider locale="en" messages={messages}>
                <NoTranslationTestComponent />
            </TranslationProvider>
        )

        expect(screen.getByTestId('noTranslation')).toHaveTextContent('foo.baz')
    })

    it('interpolates provided words with the translated string', () => {
        render(
            <TranslationProvider locale="en" messages={messages}>
                <InterpolationTestComponent />
            </TranslationProvider>
        )

        expect(screen.getByTestId('interpolated')).toHaveTextContent(
            'greetings, John'
        )
    })

    it('handles multiple interpolations correctly', () => {
        const multiInterpolationMessages = {
            farewell: 'Goodbye, {name}. See you on {day}.',
        }

        const MultiInterpolationTestComponent: React.FC = () => {
            const { t } = useTranslations()
            return (
                <div>
                    <p data-testid="multiInterpolated">
                        {t('farewell', { name: 'Alice', day: 'Monday' })}
                    </p>
                </div>
            )
        }

        render(
            <TranslationProvider
                locale="en"
                messages={multiInterpolationMessages}
            >
                <MultiInterpolationTestComponent />
            </TranslationProvider>
        )

        expect(screen.getByTestId('multiInterpolated')).toHaveTextContent(
            'Goodbye, Alice. See you on Monday.'
        )
    })

    it('handles rich interpolation', () => {
        const RichInterpolationMessages = {
            message: 'This is a <bold>bold</bold> statement.',
        }

        render(
            <TranslationProvider
                locale="en"
                messages={RichInterpolationMessages}
            >
                <RichInterpolationTestComponent />
            </TranslationProvider>
        )

        const richInterpolated = screen.getByTestId('richInterpolated')
        expect(richInterpolated).toContainHTML(
            'This is a <strong>bold</strong> statement.'
        )
        expect(richInterpolated).toHaveTextContent('This is a bold statement.')
    })
})
