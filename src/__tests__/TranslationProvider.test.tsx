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

describe('TranslationProvider', () => {
    const messages = {
        hello: 'Hello',
        home: { title: 'Home Title' },
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
})
