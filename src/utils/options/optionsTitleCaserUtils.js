import {
  allowedStylesList,
  styleConfigMap,
  wordReplacementsList,
} from "../../TitleCaserConsts.js";

export function optionsExtendTitleCaserUtils(TitleCaserUtils) {
  Object.defineProperties(TitleCaserUtils, {
    // Store the validator reference for title case options
    TitleCaseValidator: {
      value: undefined,
      writable: true,
      configurable: true,
    },

    // Cache merged title case options by style and custom lowercase words
    titleCaseOptionsCache: {
      value: new Map(),
      writable: true,
      configurable: true,
    },

    // Validate that an option value is an array of strings
    validateOption: {
      value(key, value) {
        if (!Array.isArray(value)) {
          throw new TypeError(`Invalid option: ${key} must be an array`);
        }

        if (!value.every((word) => typeof word === "string")) {
          throw new TypeError(`Invalid option: ${key} must be an array of strings`);
        }
      },
      writable: true,
      configurable: true,
    },

    // Validate the options object against known style configuration keys
    validateOptions: {
      value(options) {
        for (const key of Object.keys(options)) {
          if (key === "style") {
            if (typeof options.style !== "string") {
              throw new TypeError(`Invalid option: ${key} must be a string`);
            } else if (!allowedStylesList.includes(options.style)) {
              throw new TypeError(`Invalid option: ${key} must be a string`);
            }
            continue;
          }

          if (key === "wordReplacementsList") {
            if (!Array.isArray(options.wordReplacementsList)) {
              throw new TypeError(`Invalid option: ${key} must be an array`);
            } else {
              for (const term of options.wordReplacementsList) {
                if (typeof term !== "string") {
                  throw new TypeError(`Invalid option: ${key} must contain only strings`);
                }
              }
            }
            continue;
          }

          if (!styleConfigMap.hasOwnProperty(key)) {
            throw new TypeError(`Invalid option: ${key}`);
          }

          TitleCaserUtils.validateOption(key, options[key]);
        }
      },
      writable: true,
      configurable: true,
    },

    // Merge configured style options with user-provided overrides
    getTitleCaseOptions: {
      value(options = {}, lowercaseWords = []) {
        const style = options.style || "ap";
        const smartQuotes = options.hasOwnProperty("smartQuotes") ? options.smartQuotes : false;
        const cacheKey = `${style}|${smartQuotes}|${lowercaseWords.length > 0 ? lowercaseWords.sort().join(",") : ""}`;

        if (TitleCaserUtils.titleCaseOptionsCache.has(cacheKey)) {
          return TitleCaserUtils.titleCaseOptionsCache.get(cacheKey);
        }

        const mergedOptions = {
          ...styleConfigMap[options.style || "ap"],
          ...options,
          smartQuotes: options.hasOwnProperty("smartQuotes") ? options.smartQuotes : false,
        };

        const mergedArticles = [...new Set([...mergedOptions.articlesList, ...lowercaseWords])];
        const mergedShortConjunctions = [...new Set([...mergedOptions.shortConjunctionsList, ...lowercaseWords])];
        const mergedShortPrepositions = [...new Set([...mergedOptions.shortPrepositionsList, ...lowercaseWords])];

        const mergedReplaceTerms = [
          ...(mergedOptions.replaceTerms || []).map(([key, value]) => [key.toLowerCase(), value]),
          ...wordReplacementsList,
        ];

        const result = {
          articlesList: mergedArticles,
          shortConjunctionsList: mergedShortConjunctions,
          shortPrepositionsList: mergedShortPrepositions,
          neverCapitalizedList: [...mergedOptions.neverCapitalizedList],
          replaceTerms: mergedReplaceTerms,
          smartQuotes: mergedOptions.smartQuotes,
        };

        TitleCaserUtils.titleCaseOptionsCache.set(cacheKey, result);
        return result;
      },
      writable: true,
      configurable: true,
    },
  });
}
