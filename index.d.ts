export interface TitleCaserSecurityOptions {
  allowHtml?: boolean;
  allowedHtmlTags?: string[];
  rejectScriptTags?: boolean;
  rejectEventHandlers?: boolean;
  rejectControlCharacters?: boolean;
  rejectBidiControls?: boolean;
  rejectZeroWidthCharacters?: boolean;
}

export interface TitleCaserOptions {
  style?: 'ap' | 'apa' | 'chicago' | 'wikipedia' | 'nyt' | 'british';
  dictionaryProfile?: 'lite' | 'full';
  smartQuotes?: boolean;
  normalizeQuotes?: boolean;
  normalizeWhitespace?: boolean;
  minTitleChars?: number;
  maxTitleChars?: number;
  minTitleLength?: number;
  maxTitleLength?: number;
  allowEmojis?: boolean;
  allowSpecialCharacters?: boolean;
  neverCapitalize?: string[];
  wordReplacementsList?: Array<{ [key: string]: string }>;
  replaceTerms?: Array<[string, string]>;
  phraseReplacementList?: { [key: string]: string };
  security?: TitleCaserSecurityOptions;
  debug?: boolean;
}

export interface TitleCaserConfigOptions extends TitleCaserOptions {
  ignoreList?: string[];
}

export class TitleCaser {
  constructor(options?: TitleCaserOptions);
  toTitleCase(text: string): string;
  setReplaceTerms(terms: Array<{ [key: string]: string }>): void;
  addReplaceTerm(term: string, replacement: string): void;
  removeReplaceTerm(term: string): void;
  addExactPhraseReplacements(phrases: Array<{ [key: string]: string }>): void;
  setStyle(style: string): void;
}

export const TITLE_CASER_CONFIG_DEFAULTS: Required<TitleCaserConfigOptions>;

export class TitleCaserConfig {
  constructor(config?: TitleCaserConfigOptions);
  minTitleChars: number;
  maxTitleChars: number;
  minTitleLength: number;
  maxTitleLength: number;
  style: NonNullable<TitleCaserOptions['style']>;
  dictionaryProfile: NonNullable<TitleCaserOptions['dictionaryProfile']>;
  smartQuotes: boolean;
  normalizeQuotes: boolean;
  normalizeWhitespace: boolean;
  debug: boolean;
  allowEmojis: boolean;
  allowSpecialCharacters: boolean;
  ignoreList: string[];
  neverCapitalize: string[];
  phraseReplacementList: { [key: string]: string };
  wordReplacementsList: Array<{ [key: string]: string }>;
  replaceTerms: Array<[string, string]>;
  security: Required<TitleCaserSecurityOptions>;
  static validate(config: TitleCaserConfigOptions): void;
  isTitleLengthValid(title: string): boolean;
  toTitleCaserOptions(): TitleCaserOptions;
}

export function createTitleCaserConfig(config?: TitleCaserConfigOptions): TitleCaserConfig;

export default TitleCaser;

declare global {
  interface String {
    toTitleCase(options?: TitleCaserOptions): string;
  }
}
