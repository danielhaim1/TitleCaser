import {
  allowedStylesList,
  ignoredWordList,
} from "../../TitleCaserConsts.js";

export function wordsExtendTitleCaserUtils(TitleCaserUtils) {
  Object.defineProperties(TitleCaserUtils, {
    // Cache never-capitalized word checks by style and word
    isNeverCapitalizedCache: {
      value: new Map(),
      writable: true,
      configurable: true,
    },

    // Capitalize the first letter of a word
    capitalizeFirstLetter: {
      value(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      },
      writable: true,
      configurable: true,
    },

    // Check if the word is a short conjunction
    isShortConjunction: {
      value(word, style) {
        const shortConjunctionsList = [
          ...TitleCaserUtils.getTitleCaseOptions({
            style: style,
          }).shortConjunctionsList,
        ];

        const wordLowerCase = word.toLowerCase();

        return shortConjunctionsList.includes(wordLowerCase);
      },
      writable: true,
      configurable: true,
    },

    // Check if the word is an article
    isArticle: {
      value(word, style) {
        const articlesList = TitleCaserUtils.getTitleCaseOptions({
          style: style,
        }).articlesList;
        return articlesList.includes(word.toLowerCase());
      },
      writable: true,
      configurable: true,
    },

    // Check if the word is a short preposition
    isShortPreposition: {
      value(word, style) {
        const { shortPrepositionsList } = TitleCaserUtils.getTitleCaseOptions({
          style: style,
        });
        return shortPrepositionsList.includes(word.toLowerCase());
      },
      writable: true,
      configurable: true,
    },

    // Check if the word should never be capitalized for the style
    isNeverCapitalized: {
      value(word, style) {
        const cacheKey = `${style}_${word.toLowerCase()}`;
        if (TitleCaserUtils.isNeverCapitalizedCache.has(cacheKey)) {
          return TitleCaserUtils.isNeverCapitalizedCache.get(cacheKey);
        }

        const { neverCapitalizedList } = TitleCaserUtils.getTitleCaseOptions({
          style,
        });

        const result = neverCapitalizedList.includes(word.toLowerCase());
        TitleCaserUtils.isNeverCapitalizedCache.set(cacheKey, result);

        return result;
      },
      writable: true,
      configurable: true,
    },

    // Check if the word is lowercaseable under the style rules
    isShortWord: {
      value(word, style) {
        if (typeof word !== "string") {
          throw new TypeError(`Invalid input: word must be a string. Received ${typeof word}.`);
        }

        if (!allowedStylesList.includes(style)) {
          throw new Error(`Invalid option: style must be one of ${allowedStylesList.join(", ")}.`);
        }

        return (
          TitleCaserUtils.isShortConjunction(word, style) ||
          TitleCaserUtils.isArticle(word, style) ||
          TitleCaserUtils.isShortPreposition(word, style) ||
          TitleCaserUtils.isNeverCapitalized(word, style)
        );
      },
      writable: true,
      configurable: true,
    },

    // Check if the word should be ignored
    isWordIgnored: {
      value(word, ignoredWords = ignoredWordList) {
        if (!Array.isArray(ignoredWords)) {
          throw new TypeError("Invalid input: ignoredWords must be an array.");
        }

        if (typeof word !== "string" || word.trim() === "") {
          throw new TypeError("Invalid input: word must be a non-empty string.");
        }

        let lowercasedWord;
        lowercasedWord = word.toLowerCase().trim();

        return ignoredWords.includes(lowercasedWord);
      },
      writable: true,
      configurable: true,
    },

    // Check if the word exists in a case-insensitive word list
    isWordInArray: {
      value(targetWord, wordList) {
        if (!Array.isArray(wordList)) {
          return false;
        }

        return wordList.some((word) => word.toLowerCase() === targetWord.toLowerCase());
      },
      writable: true,
      configurable: true,
    },
  });
}
