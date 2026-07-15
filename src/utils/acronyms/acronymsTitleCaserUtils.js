import {
  regionalAcronymList,
  regionalAcronymPrecedingWordsList,
  regionalAcronymFollowingWordsList,
} from "../../TitleCaserConsts.js";

export function acronymsExtendTitleCaserUtils(TitleCaserUtils) {
  Object.defineProperties(TitleCaserUtils, {
    // Check if a word is a regional acronym
    isRegionalAcronym: {
      value(word) {
        if (typeof word !== "string") {
          throw new TypeError("Invalid input: word must be a string.");
        }

        if (word.length < 2) {
          return false;
        }

        const lowercasedWord = word.toLowerCase();
        return regionalAcronymList.includes(lowercasedWord);
      },
      writable: true,
      configurable: true,
    },

    // Check if an undotted regional acronym is supported by nearby context
    isRegionalAcronymNoDot: {
      value(word, nextWord, prevWord = null) {
        if (typeof word !== "string" || typeof nextWord !== "string") {
          return false;
        }

        const firstWordStripped = word.toLowerCase().replace(/[^\w\s]/g, "");
        const nextWordStripped = nextWord.toLowerCase().replace(/[^\w\s]/g, "");

        const smallDirectPrecedingIndicators = ["the"];

        if (
          prevWord &&
          regionalAcronymList.includes(firstWordStripped) &&
          smallDirectPrecedingIndicators.includes(prevWord.toLowerCase())
        ) {
          return true;
        }

        return (
          regionalAcronymList.includes(firstWordStripped) && regionalAcronymFollowingWordsList.includes(nextWordStripped)
        );
      },
      writable: true,
      configurable: true,
    },

    // Check if a final word should be treated as a regional acronym
    isFinalWordRegionalAcronym: {
      value(word, prevWord, prevPrevWord = null) {
        if (typeof word !== "string" || typeof prevWord !== "string") return false;

        const current = word.toLowerCase().replace(/[^\w]/g, "");
        const prev = prevWord.toLowerCase().replace(/[^\w]/g, "");

        if (!regionalAcronymList.includes(current)) return false;

        if (regionalAcronymPrecedingWordsList.includes(prev)) return true;

        return false;
      },
      writable: true,
      configurable: true,
    },

    // Normalize a regional acronym to uppercase
    normalizeRegionalAcronym: {
      value(word) {
        if (typeof word !== "string") {
          throw new TypeError("Invalid input: word must be a string.");
        }

        return word.toUpperCase();
      },
      writable: true,
      configurable: true,
    },

    // Normalize dotted acronyms into lookup keys
    normalizeAcronymKey: {
      value(word) {
        return word.toLowerCase().replace(/\./g, "");
      },
      writable: true,
      configurable: true,
    },
  });
}
