# next-static-intl

Minimal React i18n helper optimized for statically exported Next.js (App Router) sites.

## Quick usage

```tsx
// app/[locale]/layout.tsx (Next.js App Router)
import { TranslationProvider } from '@your-company/react-static-i18n';
import en from '../../locales/en.json';
import it from '../../locales/it.json';

export const generateStaticParams = () => [{ locale: 'en' }, { locale: 'it' }];

export default function LocaleLayout({ children, params }) {
  const messages = params.locale === 'en' ? en : it;
  return (
    <TranslationProvider locale={params.locale} messages={messages}>
      {children}
    </TranslationProvider>
  );
}
