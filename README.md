# next-static-intl

A minimal, zero-dependency internationalization helper for React, built specifically for statically exported Next.js App Router projects.

- No runtime I/O
- Fully static-friendly
- Available in both server and client components
- Supports nested keys
- Supports parameter interpolation
- Supports rich text (HTML-like) interpolation (client-only for the time being)
- Tiny bundle footprint
- Framework-agnostic — works in any React setup

## Installation

```bash
npm install next-static-intl
```

# or

```bash
yarn add next-static-intl
```

## Project structure example

```
messages/
  en.ts
  it.ts
app/
  [locale]/
    layout.tsx
    page.tsx
components/
  Header.tsx
```

Message files can contain nested messages:

```
export const messages = {
  home: {
    title: "Welcome, {name}!",
    richExample: "Click <bold>here</bold> to continue"
  }
}

```

## Quick usage

### app/[locale]/layout.tsx

```tsx
'use client'

import { TranslationProvider } from 'next-static-intl'
import en from '../../locales/en.ts'
import it from '../../locales/it.ts'

export const generateStaticParams = () => [{ locale: 'en' }, { locale: 'it' }]

export default function LocaleLayout({ children, params }) {
    const messages = params.locale === 'en' ? en : it

    return (
        <TranslationProvider locale={params.locale} messages={messages}>
            {children}
        </TranslationProvider>
    )
}
```

or **create a dedicated client-side wrapper component** for `<TranslationProvider />` to avoid making the layout component client-side:

```tsx
// components/LocaleProvider.tsx
'use client'

import { TranslationProvider } from 'next-static-intl'

export default function LocaleProvider({ children, locale, messages }) {
    return (
        <TranslationProvider locale={locale} messages={messages}>
            {children}
        </TranslationProvider>
    )
}
```

### Using translations inside client components

```tsx
'use client'

import { useTranslations } from 'next-static-intl'

export default function Home() {
    const { t } = useTranslations()
    return <h1>{t('home.title', { name: 'Alice' })}</h1>
}
```

### Using translations inside server components

```tsx
import { getTranslations } from 'next-static-intl/server'
import { messages } from '../messages/en'

export default function Home() {
    const t = getTranslations(messages)
    return <h1>{t('home.title', { name: 'Alice' })}</h1>
}
```

## Interpolation

### Plain interpolation

Messages:

```tsx
messages = {
    greeting: 'Hello, {name}! Today is {day}.',
}
```

Component:

```tsx
t('greeting', { name: 'Alice', day: 'Monday' })
// → "Hello, Alice! Today is Monday."
```

### Rich text interpolation

Use the `t.rich` method to embed React components.

Messages:

```tsx
messages = {
    info: 'Click <bold>here</bold> to continue',
}
```

Component:

```tsx
t.rich('info', {
    bold: (chunks) => <strong>{chunks}</strong>,
})
```

You can support any tag name (`<em>`, `<link>`, `<red>`, `<foo>`, …).

## API

### `<TranslationProvider />`

| Prop       | Type                  | Description             |
| ---------- | --------------------- | ----------------------- |
| `locale`   | `string`              | Active locale code      |
| `messages` | `Record<string, any>` | The loaded translations |

### `useTranslations()`

Returns `{ t, locale, messages }`.

```ts
const { t, locale, messages } = useTranslations()
```

`t(key, params?)`

- Resolves nested keys: `home.title`, `auth.errors.invalid`
- Supports simple placeholders: `{name}`

`t.rich(key, renderers)`:

- Parses HTML-like tags: `<bold>text</bold>`
- Calls renderers to turn chunks into components

### `getTranslations()`

Returns `t`.

```ts
const t = getTranslations()
```

`t(key, params?)`

- Resolves nested keys: `home.title`, `auth.errors.invalid`
- Supports simple placeholders: `{name}`

## Message format limitations

- Rich tags must be properly closed `(<bold>…</bold>)`
- Tags must be simple alphanumeric names (e.g., bold, link, red)
- Tags cannot be nested (yet!) → coming soon?

Example of unsupported case:

```ts
bad: 'Hello <bold>very <italic>nested</italic></bold> world'
```

## Why this library?

Many i18n libraries (including next-intl) assume:

- SSR is available
- messages can be loaded dynamically
- the router is dynamic

But Next.js static export removes these capabilities. This library was created to provide the missing piece:

- translation at build time
- zero runtime overhead
- zero hydration cost
- minimal API
- no dynamic imports
- full compatibility with App Router static generation

## TypeScript Support

Includes full TS definitions:

- Autocomplete for `t.rich`
- Strict types for `t` in context
- Types for messages and parameters

Example:

```ts
t('home.title') // autocomplete works if keys are typed
```

## Example messages

```ts
{
  home: {
    title: "Welcome, {name}!",
    cta: "Click <link>here</link> to continue"
  }
}
```

## License

MIT
