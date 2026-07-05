import { TITLE_CASE_STYLES } from "./TitleCaserConsts.js";
import { TitleCaserUtils } from "./TitleCaserUtils.js";
import {
  validationDefaultConfig,
  validationDefaultSecurityConfig,
} from "./utils/validation/validationTitleCaserUtils.js";

const emptyArray = Object.freeze([]);
const emptyObject = Object.freeze({});

export const TITLE_CASER_CONFIG_DEFAULTS = Object.freeze({
  minTitleChars: validationDefaultConfig.minTitleChars,
  maxTitleChars: validationDefaultConfig.maxTitleChars,
  minTitleLength: validationDefaultConfig.minTitleChars,
  maxTitleLength: validationDefaultConfig.maxTitleChars,
  style: TITLE_CASE_STYLES.AP,
  smartQuotes: false,
  normalizeQuotes: validationDefaultConfig.normalizeQuotes,
  normalizeWhitespace: true,
  debug: false,
  allowEmojis: validationDefaultConfig.allowEmojis,
  allowSpecialCharacters: validationDefaultConfig.allowSpecialCharacters,
  dictionaryProfile: validationDefaultConfig.dictionaryProfile,
  ignoreList: emptyArray,
  neverCapitalize: emptyArray,
  phraseReplacementList: emptyObject,
  wordReplacementsList: emptyArray,
  replaceTerms: emptyArray,
  security: Object.freeze({
    ...validationDefaultSecurityConfig,
    allowedHtmlTags: Object.freeze([...validationDefaultSecurityConfig.allowedHtmlTags]),
  }),
});

export class TitleCaserConfig {
  constructor(config = {}) {
    if (!TitleCaserUtils.validationIsPlainObject(config)) {
      throw new TypeError("Invalid config: config must be an object.");
    }

    const aliasedConfig = { ...config };
    if (config.minTitleLength !== undefined && config.minTitleChars === undefined) {
      aliasedConfig.minTitleChars = config.minTitleLength;
    }
    if (config.maxTitleLength !== undefined && config.maxTitleChars === undefined) {
      aliasedConfig.maxTitleChars = config.maxTitleLength;
    }

    const rawConfig = {
      ...TITLE_CASER_CONFIG_DEFAULTS,
      ...aliasedConfig,
    };

    const validatedConfig = TitleCaserConfig.validate(rawConfig);

    const mergedConfig = {
      ...validatedConfig,
      minTitleLength: validatedConfig.minTitleChars,
      maxTitleLength: validatedConfig.maxTitleChars,
      ignoreList: [...validatedConfig.ignoreList],
      neverCapitalize: [...validatedConfig.neverCapitalize],
      phraseReplacementList: { ...validatedConfig.phraseReplacementList },
      wordReplacementsList: validatedConfig.wordReplacementsList.map((replacement) => ({ ...replacement })),
      replaceTerms: validatedConfig.replaceTerms.map((replacement) => [...replacement]),
      security: {
        ...validatedConfig.security,
        allowedHtmlTags: [...validatedConfig.security.allowedHtmlTags],
      },
    };

    Object.assign(this, mergedConfig);
  }

  // Validate config before passing options into TitleCaser
  static validate(config) {
    return TitleCaserUtils.validationValidateConfig(config);
  }

  // Check title length before formatting a title
  isTitleLengthValid(title) {
    if (typeof title !== "string") {
      return false;
    }

    return title.length >= this.minTitleChars && title.length <= this.maxTitleChars;
  }

  // Convert config into options accepted by TitleCaser
  toTitleCaserOptions() {
    const neverCapitalize = [...new Set([...this.neverCapitalize, ...this.ignoreList])];
    const options = {
      style: this.style,
      smartQuotes: this.smartQuotes,
      normalizeQuotes: this.normalizeQuotes,
      normalizeWhitespace: this.normalizeWhitespace,
      debug: this.debug,
      minTitleChars: this.minTitleChars,
      maxTitleChars: this.maxTitleChars,
      allowEmojis: this.allowEmojis,
      allowSpecialCharacters: this.allowSpecialCharacters,
      dictionaryProfile: this.dictionaryProfile,
      neverCapitalize,
      phraseReplacementList: { ...this.phraseReplacementList },
      security: {
        ...this.security,
        allowedHtmlTags: [...this.security.allowedHtmlTags],
      },
    };

    if (this.wordReplacementsList.length > 0) {
      options.wordReplacementsList = this.wordReplacementsList.map((replacement) => ({ ...replacement }));
    }

    if (this.replaceTerms.length > 0) {
      options.replaceTerms = this.replaceTerms.map((replacement) => [...replacement]);
    }

    return options;
  }
}

export function createTitleCaserConfig(config = {}) {
  return new TitleCaserConfig(config);
}
