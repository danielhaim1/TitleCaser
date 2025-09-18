declare module '@danielhaim/titlecaser' {
  export interface TitleCaserOptions {
    style?: 'ap' | 'apa' | 'chicago' | 'wikipedia' | 'nyt';
    smartQuotes?: boolean;
    ignoreWords?: string[];
    acronyms?: string[];
  }

  export class TitleCaser {
    constructor(options?: TitleCaserOptions);
    toTitleCase(text: string): string;
    setReplaceTerms(terms: Array<{ [key: string]: string }>): void;
    addReplaceTerm(term: string, replacement: string): void;
    removeReplaceTerm(term: string): void;
    addExactPhraseReplacements(phrases: Array<{ [key: string]: string }>): void;
  }

  export default TitleCaser;
}

declare global {
  interface String {
    toTitleCase(options?: import('@danielhaim/titlecaser').TitleCaserOptions): string;
  }
} 