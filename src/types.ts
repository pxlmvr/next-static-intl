export type Locale = string

// using interface for recursive type (type alias cannot reference itself)
export interface Messages {
    [key: string]: string | Messages
}

export type TranslateParams = Record<
    string,
    string | number | boolean | undefined
>
