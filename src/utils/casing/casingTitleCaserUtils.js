import { styleConfigMap } from "../../TitleCaserConsts.js";

export function casingExtendTitleCaserUtils(TitleCaserUtils) {
  Object.defineProperties(TitleCaserUtils, {
    // Check if a word has multiple uppercase letters
    hasUppercaseMultiple: {
      value(word) {
        let count = 0;
        for (let i = 0; i < word.length && count < 2; i++) {
          if (/[A-Z]/.test(word[i])) {
            count++;
          }
        }
        return count >= 2;
      },
      writable: true,
      configurable: true,
    },

    // Check if a word has intentional uppercase casing after the first letter
    hasUppercaseIntentional: {
      value(word) {
        if (word.length <= 4) {
          return /[A-Z]/.test(word.slice(1));
        }

        const hasUppercase = /[A-Z]/.test(word.slice(1));
        const hasLowercase = /[a-z]/.test(word.slice(1));

        return hasUppercase && hasLowercase;
      },
      writable: true,
      configurable: true,
    },

    // Check if the entire input string is uppercase
    isEntirelyUppercase: {
      value(str) {
        return str === str.toUpperCase() && str !== str.toLowerCase() && str.length > 1;
      },
      writable: true,
      configurable: true,
    },

    // Normalize a word only when the style says it should stay lowercase
    normalizeCasingForWordByStyle: {
      value(word, style) {
        if (!word || !style || !styleConfigMap[style]) return false;

        const lowerWord = word.toLowerCase();
        const { shortConjunctionsList, articlesList, shortPrepositionsList, neverCapitalizedList } = styleConfigMap[style];

        const combinedList = [...shortConjunctionsList, ...articlesList, ...shortPrepositionsList, ...neverCapitalizedList];

        return combinedList.includes(lowerWord) ? word : false;
      },
      writable: true,
      configurable: true,
    },

    // Check if a word begins with an uppercase letter
    casingHasInitialCapital: {
      value(word) {
        if (typeof word !== "string") return false;

        const firstLetterIndex = word.search(/[A-Za-z]/);
        if (firstLetterIndex === -1) return false;

        const firstLetter = word[firstLetterIndex];
        return firstLetter === firstLetter.toUpperCase() && firstLetter !== firstLetter.toLowerCase();
      },
      writable: true,
      configurable: true,
    },
  });
}
