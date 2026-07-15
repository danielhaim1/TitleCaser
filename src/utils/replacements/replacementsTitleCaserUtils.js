import {
  regionalAcronymList,
  specialTermsList,
} from "../../TitleCaserConsts.js";

export function replacementsExtendTitleCaserUtils(TitleCaserUtils) {
  Object.defineProperties(TitleCaserUtils, {
    // Replace a word from a replacement map
    replaceTerm: {
      value(word, replaceTermObj) {
        if (typeof word !== "string" || word === "") {
          throw new TypeError("Invalid input: word must be a non-empty string.");
        }

        if (!replaceTermObj || typeof replaceTermObj !== "object") {
          throw new TypeError("Invalid input: replaceTermObj must be a non-null object.");
        }

        let lowercasedWord;
        lowercasedWord = word.toLowerCase();

        if (replaceTermObj.hasOwnProperty(lowercasedWord)) {
          return replaceTermObj[lowercasedWord];
        }

        if (replaceTermObj.hasOwnProperty(word)) {
          return replaceTermObj[word];
        }

        const uppercasedWord = word.toUpperCase();
        if (replaceTermObj.hasOwnProperty(uppercasedWord)) {
          return replaceTermObj[uppercasedWord];
        }

        return word;
      },
      writable: true,
      configurable: true,
    },

    // Correct a possessive suffix using known term casing
    correctSuffix: {
      value(word, correctTerms) {
        if (typeof word !== "string" || word === "") {
          throw new TypeError("Invalid input: word must be a non-empty string.");
        }

        if (!correctTerms || !Array.isArray(correctTerms) || correctTerms.some((term) => typeof term !== "string")) {
          throw new TypeError("Invalid input: correctTerms must be an array of strings.");
        }

        const suffixRegex = /'s$/i;

        if (suffixRegex.test(word)) {
          const wordWithoutSuffix = word.slice(0, -2);
          const matchingIndex = correctTerms.findIndex((term) => term.toLowerCase() === wordWithoutSuffix.toLowerCase());

          if (matchingIndex >= 0) {
            const correctCase = correctTerms[matchingIndex];
            return `${correctCase}'s`;
          } else {
            const capitalizedWord = wordWithoutSuffix.charAt(0).toUpperCase() + wordWithoutSuffix.slice(1);
            return `${capitalizedWord}'s`;
          }
        }

        return word;
      },
      writable: true,
      configurable: true,
    },

    // Correct a word using known term casing
    correctTerm: {
      value(word, correctTerms, delimiters = /[-']/) {
        if (typeof word !== "string" || word === "") {
          throw new TypeError("Invalid input: word must be a non-empty string.");
        }

        if (!correctTerms || !Array.isArray(correctTerms)) {
          throw new TypeError("Invalid input: correctTerms must be an array.");
        }

        if (typeof delimiters !== "string" && !Array.isArray(delimiters) && !(delimiters instanceof RegExp)) {
          throw new TypeError("Invalid input: delimiters must be a string, an array of strings, or a regular expression.");
        }

        if (typeof delimiters === "string") {
          delimiters = new RegExp(`[${delimiters}]`);
        } else if (Array.isArray(delimiters)) {
          delimiters = new RegExp(`[${delimiters.join("")}]`);
        }

        const exactTermIndex = correctTerms.findIndex(
          (term) => term.toLowerCase() === word.toLowerCase()
        );
        if (exactTermIndex >= 0) {
          return correctTerms[exactTermIndex];
        }

        const possessiveMatch = word.match(/^(.+)(['\u2019]s)$/i);
        if (possessiveMatch) {
          const [, baseWord, possessiveSuffix] = possessiveMatch;
          const baseTermIndex = correctTerms.findIndex(
            (term) => term.toLowerCase() === baseWord.toLowerCase()
          );

          if (baseTermIndex >= 0) {
            return `${correctTerms[baseTermIndex]}${possessiveSuffix.charAt(0)}s`;
          }
        }

        const parts = word.split(delimiters);
        const numParts = parts.length;

        for (let i = 0; i < numParts; i++) {
          const lowercasedPart = parts[i].toLowerCase();
          const index = correctTerms.findIndex((t) => t.toLowerCase() === lowercasedPart);
          if (index >= 0) {
            parts[i] = correctTerms[index];
          } else {
            parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1).toLowerCase();
          }
        }

        let joiner = delimiters.source.charAt(0);
        if (word.includes("-")) {
          joiner = "-";
        } else if (word.includes("'")) {
          joiner = "'";
        }

        return parts.join(joiner);
      },
      writable: true,
      configurable: true,
    },

    // Correct a hyphenated or dashed term by style
    correctTermHyphenated: {
      value(word, style) {
        const compoundParts = word.split(/([-–—])/);
        const hyphenatedWords = compoundParts.filter((_, index) => index % 2 === 0);
        if (hyphenatedWords.length < 2) return word;
        if (hyphenatedWords.filter((segment) => /[A-Za-z0-9]/.test(segment)).length < 2) return word;

        const containsRegionalAcronym = hyphenatedWords.some((segment) =>
          regionalAcronymList.includes(
            segment.toLowerCase().replace(/[^\w]/g, "")
          )
        );
        const capitalizeFirst = (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
        const lowercaseRest = (w) => w.charAt(0) + w.slice(1).toLowerCase();
        const capitalizeCompoundSegment = (w, index, length) => {
          if (
            TitleCaserUtils.isShortWord(w, style) &&
            index > 0 &&
            index < length - 1
          ) {
            return w.toLowerCase();
          }
          return capitalizeFirst(w);
        };

        const styleFunctions = {
          ap: capitalizeCompoundSegment,
          chicago: capitalizeCompoundSegment,
          apa: (w, index, length) => {
            if (
              !containsRegionalAcronym &&
              TitleCaserUtils.isShortWord(w, style) &&
              index > 0 &&
              index < length - 1
            ) {
              return w.toLowerCase();
            }
            return capitalizeFirst(w);
          },
          nyt: capitalizeFirst,
          wikipedia: (w, index) =>
            index === 0 ? capitalizeFirst(w) : lowercaseRest(w),
        };

        const processWord = styleFunctions[style] || lowercaseRest;

        const processedWords = hyphenatedWords.map((segment, i) => {
          let correctedWord = segment;

          const normalizedSegment = segment
            .toLowerCase()
            .replace(/[^\w]/g, "");

          if (regionalAcronymList.includes(normalizedSegment)) {
            return segment.toUpperCase();
          }

          const romanNumeralRegex =
            /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;

          if (romanNumeralRegex.test(segment)) {
            return segment.toUpperCase();
          }

          const lowerCaseWord = segment.toLowerCase();
          const uniqueTermsIndex = specialTermsList.findIndex(
            (w) => w.toLowerCase() === lowerCaseWord
          );

          if (uniqueTermsIndex >= 0) {
            correctedWord = specialTermsList[uniqueTermsIndex];
            if (TitleCaserUtils.hasUppercaseIntentional(correctedWord)) {
              return correctedWord;
            }
          }

          return processWord(correctedWord, i, hyphenatedWords.length);
        });

        return compoundParts
          .map((part, index) => {
            if (index % 2 === 0) return processedWords[index / 2];
            return style === "ap" ? "-" : part;
          })
          .join("");
      },
      writable: true,
      configurable: true,
    },
  });
}
