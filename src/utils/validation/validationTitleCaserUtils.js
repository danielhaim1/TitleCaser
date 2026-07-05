import { allowedStylesList } from "../../TitleCaserConsts.js";

export const validationDefaultSecurityConfig = Object.freeze({
  allowHtml: false,
  allowedHtmlTags: Object.freeze(["br"]),
  rejectScriptTags: true,
  rejectEventHandlers: true,
  rejectControlCharacters: true,
  rejectBidiControls: true,
  rejectZeroWidthCharacters: false,
});

export const validationDefaultConfig = Object.freeze({
  minTitleChars: 1,
  maxTitleChars: 400,
  allowEmojis: true,
  allowSpecialCharacters: true,
  normalizeQuotes: false,
  dictionaryProfile: "full",
  security: validationDefaultSecurityConfig,
});

const validationAllowedConfigKeys = new Set([
  "minTitleChars",
  "maxTitleChars",
  "minTitleLength",
  "maxTitleLength",
  "style",
  "smartQuotes",
  "normalizeQuotes",
  "normalizeWhitespace",
  "debug",
  "allowEmojis",
  "allowSpecialCharacters",
  "dictionaryProfile",
  "ignoreList",
  "neverCapitalize",
  "phraseReplacementList",
  "wordReplacementsList",
  "replaceTerms",
  "security",
]);

const validationAllowedSecurityKeys = new Set([
  "allowHtml",
  "allowedHtmlTags",
  "rejectScriptTags",
  "rejectEventHandlers",
  "rejectControlCharacters",
  "rejectBidiControls",
  "rejectZeroWidthCharacters",
]);

const validationEmojiPattern = /(?:[\u2600-\u27BF]|[\uD83C-\uDBFF][\uDC00-\uDFFF])/;
const validationHtmlPattern = /<[^>]+>/;
const validationHtmlTagPattern = /<\/?\s*([a-zA-Z][\w:-]*)\b[^>]*>/g;
const validationScriptTagPattern = /<\s*\/?\s*script\b/i;
const validationHtmlEventHandlerPattern = /<[^>]+\son[a-z]+\s*=/i;
const validationControlCharactersPattern = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/;
const validationBidiControlsPattern = /[\u202A-\u202E\u2066-\u2069]/;
const validationZeroWidthCharactersPattern = /[\u200B-\u200D\uFEFF]/;
const validationSpecialCharactersPattern = /[`~^|\\{}<>©®™§¶•†‡‰′″‴※←-⇿∀-⋿⌂-⏿␀-␿①-⓿☀-⛿✀-➿]/;

function validationThrow(message) {
  throw new TypeError(message);
}

function validationMergeSecurityConfig(security = {}) {
  const allowedHtmlTags = Array.isArray(security.allowedHtmlTags)
    ? security.allowedHtmlTags
    : validationDefaultSecurityConfig.allowedHtmlTags;

  return {
    ...validationDefaultSecurityConfig,
    ...security,
    allowedHtmlTags: [...allowedHtmlTags],
  };
}

function validationCreateRuntimeConfig(config = {}) {
  const minTitleChars = config.minTitleChars ?? config.minTitleLength ?? validationDefaultConfig.minTitleChars;
  const maxTitleChars = config.maxTitleChars ?? config.maxTitleLength ?? validationDefaultConfig.maxTitleChars;

  return {
    ...validationDefaultConfig,
    ...config,
    minTitleChars,
    maxTitleChars,
    minTitleLength: minTitleChars,
    maxTitleLength: maxTitleChars,
    security: validationMergeSecurityConfig(config.security),
  };
}

export function validationExtendTitleCaserUtils(TitleCaserUtils) {
  Object.defineProperties(TitleCaserUtils, {
    // Check if a value is a plain object
    validationIsPlainObject: {
      value(value) {
        if (value === null || typeof value !== "object" || Array.isArray(value)) {
          return false;
        }

        const prototype = Object.getPrototypeOf(value);
        return prototype === Object.prototype || prototype === null;
      },
      writable: true,
      configurable: true,
    },

    // Check if a value is an array of strings
    validationIsStringArray: {
      value(value) {
        return Array.isArray(value) && value.every((item) => typeof item === "string");
      },
      writable: true,
      configurable: true,
    },

    // Check if a replacement list is an array of single-key string maps
    validationIsReplacementList: {
      value(value, maxItems = 2000, maxKeyLength = 200, maxValueLength = 500) {
        if (!Array.isArray(value) || value.length > maxItems) {
          return false;
        }

        return value.every((replacement) => {
          if (!TitleCaserUtils.validationIsPlainObject(replacement) || Object.keys(replacement).length !== 1) {
            return false;
          }

          const [term, replacementValue] = Object.entries(replacement)[0];
          return (
            typeof term === "string" &&
            typeof replacementValue === "string" &&
            term.length > 0 &&
            term.length <= maxKeyLength &&
            replacementValue.length <= maxValueLength
          );
        });
      },
      writable: true,
      configurable: true,
    },

    // Check if phrase replacements are a string-to-string map
    validationIsPhraseReplacementMap: {
      value(value, maxItems = 2000, maxKeyLength = 500, maxValueLength = 1000) {
        if (!TitleCaserUtils.validationIsPlainObject(value)) {
          return false;
        }

        const entries = Object.entries(value);
        if (entries.length > maxItems) {
          return false;
        }

        return entries.every(([term, replacement]) => (
          typeof term === "string" &&
          typeof replacement === "string" &&
          term.length > 0 &&
          term.length <= maxKeyLength &&
          replacement.length <= maxValueLength
        ));
      },
      writable: true,
      configurable: true,
    },

    // Detect emoji characters
    validationHasEmoji: {
      value(value) {
        return typeof value === "string" && validationEmojiPattern.test(value);
      },
      writable: true,
      configurable: true,
    },

    // Detect special characters outside normal title punctuation
    validationHasSpecialCharacters: {
      value(value) {
        return typeof value === "string" && validationSpecialCharactersPattern.test(value);
      },
      writable: true,
      configurable: true,
    },

    // Detect HTML-looking tags
    validationHasHtml: {
      value(value) {
        return typeof value === "string" && validationHtmlPattern.test(value);
      },
      writable: true,
      configurable: true,
    },

    // Check that all HTML-looking tags are explicitly allowed
    validationHasAllowedHtmlOnly: {
      value(value, allowedTags = []) {
        if (!TitleCaserUtils.validationHasHtml(value)) {
          return true;
        }

        const normalizedAllowedTags = allowedTags.map((tag) => tag.toLowerCase());
        const matches = [...value.matchAll(validationHtmlTagPattern)];

        if (matches.length === 0) {
          return false;
        }

        return matches.every((match) => normalizedAllowedTags.includes(match[1].toLowerCase()));
      },
      writable: true,
      configurable: true,
    },

    // Detect script tags
    validationHasScriptTag: {
      value(value) {
        return typeof value === "string" && validationScriptTagPattern.test(value);
      },
      writable: true,
      configurable: true,
    },

    // Detect inline HTML event handlers
    validationHasHtmlEventHandler: {
      value(value) {
        return typeof value === "string" && validationHtmlEventHandlerPattern.test(value);
      },
      writable: true,
      configurable: true,
    },

    // Detect unsafe control characters
    validationHasControlCharacters: {
      value(value) {
        return typeof value === "string" && validationControlCharactersPattern.test(value);
      },
      writable: true,
      configurable: true,
    },

    // Detect bidirectional override controls
    validationHasBidiControls: {
      value(value) {
        return typeof value === "string" && validationBidiControlsPattern.test(value);
      },
      writable: true,
      configurable: true,
    },

    // Detect zero-width characters
    validationHasZeroWidthCharacters: {
      value(value) {
        return typeof value === "string" && validationZeroWidthCharactersPattern.test(value);
      },
      writable: true,
      configurable: true,
    },

    // Normalize curly quote characters to straight quotes
    validationNormalizeQuotes: {
      value(value) {
        if (typeof value !== "string") {
          return value;
        }

        return value
          .replace(/[“”„‟]/g, "\"")
          .replace(/[‘’‚‛]/g, "'");
      },
      writable: true,
      configurable: true,
    },

    // Merge aliases and default validation settings
    validationCreateRuntimeConfig: {
      value(config = {}) {
        if (!TitleCaserUtils.validationIsPlainObject(config)) {
          validationThrow("Invalid config: config must be an object.");
        }

        return validationCreateRuntimeConfig(config);
      },
      writable: true,
      configurable: true,
    },

    // Validate TitleCaserConfig option shape
    validationValidateConfig: {
      value(config) {
        if (!TitleCaserUtils.validationIsPlainObject(config)) {
          validationThrow("Invalid config: config must be an object.");
        }

        Object.keys(config).forEach((key) => {
          if (!validationAllowedConfigKeys.has(key)) {
            validationThrow(`Invalid config: ${key} is not a supported option.`);
          }
        });

        if (config.security !== undefined && !TitleCaserUtils.validationIsPlainObject(config.security)) {
          validationThrow("Invalid config: security must be an object.");
        }

        if (
          config.security &&
          config.security.allowedHtmlTags !== undefined &&
          !Array.isArray(config.security.allowedHtmlTags)
        ) {
          validationThrow("Invalid config: security.allowedHtmlTags must be an array of strings.");
        }

        const runtimeConfig = validationCreateRuntimeConfig(config);

        if (!Number.isInteger(runtimeConfig.minTitleChars) || runtimeConfig.minTitleChars < 0) {
          validationThrow("Invalid config: minTitleChars must be a non-negative integer.");
        }

        if (!Number.isInteger(runtimeConfig.maxTitleChars) || runtimeConfig.maxTitleChars < 1) {
          validationThrow("Invalid config: maxTitleChars must be a positive integer.");
        }

        if (runtimeConfig.maxTitleChars < runtimeConfig.minTitleChars) {
          validationThrow("Invalid config: maxTitleChars must be greater than or equal to minTitleChars.");
        }

        if (runtimeConfig.maxTitleChars > 10000) {
          validationThrow("Invalid config: maxTitleChars must not exceed 10,000 characters.");
        }

        if (typeof runtimeConfig.style !== "string" || !allowedStylesList.includes(runtimeConfig.style)) {
          validationThrow("Invalid config: style must be a supported title casing style.");
        }

        if (
          typeof runtimeConfig.dictionaryProfile !== "string" ||
          !TitleCaserUtils.dictionaryGetProfilesList().includes(runtimeConfig.dictionaryProfile)
        ) {
          validationThrow("Invalid config: dictionaryProfile must be a supported dictionary profile.");
        }

        ["smartQuotes", "normalizeQuotes", "normalizeWhitespace", "debug", "allowEmojis", "allowSpecialCharacters"].forEach((key) => {
          if (typeof runtimeConfig[key] !== "boolean") {
            validationThrow(`Invalid config: ${key} must be a boolean.`);
          }
        });

        if (!TitleCaserUtils.validationIsStringArray(runtimeConfig.ignoreList)) {
          validationThrow("Invalid config: ignoreList must be an array of strings.");
        }

        if (!TitleCaserUtils.validationIsStringArray(runtimeConfig.neverCapitalize)) {
          validationThrow("Invalid config: neverCapitalize must be an array of strings.");
        }

        if (!TitleCaserUtils.validationIsPhraseReplacementMap(runtimeConfig.phraseReplacementList)) {
          validationThrow("Invalid config: phraseReplacementList must be an object with string keys and values.");
        }

        if (!TitleCaserUtils.validationIsReplacementList(runtimeConfig.wordReplacementsList)) {
          validationThrow("Invalid config: wordReplacementsList must contain single-key replacement objects.");
        }

        if (runtimeConfig.replaceTerms !== undefined) {
          const hasValidReplaceTerms =
            Array.isArray(runtimeConfig.replaceTerms) &&
            runtimeConfig.replaceTerms.length <= 2000 &&
            runtimeConfig.replaceTerms.every((term) => (
              Array.isArray(term) &&
              term.length === 2 &&
              typeof term[0] === "string" &&
              typeof term[1] === "string" &&
              term[0].length > 0 &&
              term[0].length <= 200 &&
              term[1].length <= 500
            ));

          if (!hasValidReplaceTerms) {
            validationThrow("Invalid config: replaceTerms must contain string replacement pairs.");
          }
        }

        if (!TitleCaserUtils.validationIsPlainObject(runtimeConfig.security)) {
          validationThrow("Invalid config: security must be an object.");
        }

        Object.keys(runtimeConfig.security).forEach((key) => {
          if (!validationAllowedSecurityKeys.has(key)) {
            validationThrow(`Invalid config: security.${key} is not a supported option.`);
          }
        });

        ["allowHtml", "rejectScriptTags", "rejectEventHandlers", "rejectControlCharacters", "rejectBidiControls", "rejectZeroWidthCharacters"].forEach((key) => {
          if (typeof runtimeConfig.security[key] !== "boolean") {
            validationThrow(`Invalid config: security.${key} must be a boolean.`);
          }
        });

        if (!TitleCaserUtils.validationIsStringArray(runtimeConfig.security.allowedHtmlTags)) {
          validationThrow("Invalid config: security.allowedHtmlTags must be an array of strings.");
        }

        return runtimeConfig;
      },
      writable: true,
      configurable: true,
    },

    // Validate input text against length and security config
    validationValidateInput: {
      value(value, config = {}) {
        const runtimeConfig = TitleCaserUtils.validationCreateRuntimeConfig(config);
        const security = runtimeConfig.security;

        if (typeof value !== "string") {
          validationThrow("Invalid input: input must be a string.");
        }

        if (value.length === 0) {
          validationThrow("Invalid input: input must not be empty.");
        }

        if (value.length < runtimeConfig.minTitleChars) {
          validationThrow(`Invalid input: input must be at least ${runtimeConfig.minTitleChars} characters.`);
        }

        if (value.length > runtimeConfig.maxTitleChars) {
          validationThrow(`Invalid input: input exceeds maximum length of ${runtimeConfig.maxTitleChars} characters.`);
        }

        if (!runtimeConfig.allowEmojis && TitleCaserUtils.validationHasEmoji(value)) {
          validationThrow("Invalid input: emojis are not allowed.");
        }

        if (!runtimeConfig.allowSpecialCharacters && TitleCaserUtils.validationHasSpecialCharacters(value)) {
          validationThrow("Invalid input: special characters are not allowed.");
        }

        if (security.rejectScriptTags && TitleCaserUtils.validationHasScriptTag(value)) {
          validationThrow("Invalid input: script tags are not allowed.");
        }

        if (security.rejectEventHandlers && TitleCaserUtils.validationHasHtmlEventHandler(value)) {
          validationThrow("Invalid input: HTML event handlers are not allowed.");
        }

        if (!security.allowHtml && !TitleCaserUtils.validationHasAllowedHtmlOnly(value, security.allowedHtmlTags)) {
          validationThrow("Invalid input: HTML tags are not allowed.");
        }

        if (security.rejectControlCharacters && TitleCaserUtils.validationHasControlCharacters(value)) {
          validationThrow("Invalid input: control characters are not allowed.");
        }

        if (security.rejectBidiControls && TitleCaserUtils.validationHasBidiControls(value)) {
          validationThrow("Invalid input: bidirectional control characters are not allowed.");
        }

        if (security.rejectZeroWidthCharacters && TitleCaserUtils.validationHasZeroWidthCharacters(value)) {
          validationThrow("Invalid input: zero-width characters are not allowed.");
        }

        return true;
      },
      writable: true,
      configurable: true,
    },
  });
}
