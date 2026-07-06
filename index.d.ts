export interface TitleCaserSecurityOptions {
  allowHtml?: boolean;
  allowedHtmlTags?: string[];
  rejectScriptTags?: boolean;
  rejectEventHandlers?: boolean;
  rejectControlCharacters?: boolean;
  rejectBidiControls?: boolean;
  rejectZeroWidthCharacters?: boolean;
}

export type TitleCaserStyle = 'ap' | 'apa' | 'chicago' | 'wikipedia' | 'nyt' | 'british';
export type TitleCaserDictionaryProfile = 'lite' | 'full';
export type TitleCaserReplacementMap = { [key: string]: string };
export type TitleCaserReplacementPair = [string, string];

export interface TitleCaserOptions {
  style?: TitleCaserStyle;
  dictionaryProfile?: TitleCaserDictionaryProfile;
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
  wordReplacementsList?: TitleCaserReplacementMap[];
  replaceTerms?: TitleCaserReplacementPair[];
  phraseReplacementList?: TitleCaserReplacementMap;
  security?: TitleCaserSecurityOptions;
  debug?: boolean;
}

export interface TitleCaserConfigOptions extends TitleCaserOptions {
  ignoreList?: string[];
}

export class TitleCaser {
  constructor(options?: TitleCaserOptions);
  toTitleCase(text: string): string;
  setReplaceTerms(terms: TitleCaserReplacementMap[]): void;
  addReplaceTerm(term: string, replacement: string): void;
  removeReplaceTerm(term: string): void;
  addExactPhraseReplacements(phrases: TitleCaserReplacementMap[]): void;
  setStyle(style: TitleCaserStyle): void;
}

export const TITLE_CASER_CONFIG_DEFAULTS: Required<TitleCaserConfigOptions>;

export class TitleCaserConfig {
  constructor(config?: TitleCaserConfigOptions);
  minTitleChars: number;
  maxTitleChars: number;
  minTitleLength: number;
  maxTitleLength: number;
  style: TitleCaserStyle;
  dictionaryProfile: TitleCaserDictionaryProfile;
  smartQuotes: boolean;
  normalizeQuotes: boolean;
  normalizeWhitespace: boolean;
  debug: boolean;
  allowEmojis: boolean;
  allowSpecialCharacters: boolean;
  ignoreList: string[];
  neverCapitalize: string[];
  phraseReplacementList: TitleCaserReplacementMap;
  wordReplacementsList: TitleCaserReplacementMap[];
  replaceTerms: TitleCaserReplacementPair[];
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
