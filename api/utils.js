import {
    CORRECT_TITLE_CASE,
    ALLOWED_TITLE_CASE_STYLES,
    TITLE_CASE_DEFAULT_OPTIONS,
    IGNORED_WORDS,
    IGNORED_TITLE_CASE_PHRASES,
    replaceCasing,
} from "./consts.js";

function validateOption(key, value) {
    if (!Array.isArray(value)) {
        throw new TypeError(`Invalid option: ${key} must be an array`);
    }
    if (!value.every((word) => typeof word === "string")) {
        throw new TypeError(`Invalid option: ${key} must be an array of strings`);
    }
}

function validateOptions(options) {
    for (const key of Object.keys(options)) {
        if (key === 'style') {
            if (typeof options.style !== 'string') {
                throw new TypeError(`Invalid option: ${key} must be a string`);
            } else if (!ALLOWED_TITLE_CASE_STYLES.includes(options.style)) {
                throw new TypeError(`Invalid option: ${key} must be a string`);
            }
            continue;
        }
        if (key === 'replaceCasing') {
            if (!Array.isArray(options.replaceCasing)) {
                throw new TypeError(`Invalid option: ${key} must be an array`);
            } else {
                for (const term of options.replaceCasing) {
                    if (typeof term !== 'string') {
                        throw new TypeError(`Invalid option: ${key} must contain only strings`);
                    }
                }
            }
            continue;
        }
        if (!TITLE_CASE_DEFAULT_OPTIONS.hasOwnProperty(key)) {
            throw new TypeError(`Invalid option: ${key}`);
        }
        validateOption(key, options[key]);
    }
}

const titleCaseOptionsCache = new Map();

export function getTitleCaseOptions(options = {}, lowercaseWords = []) {
    const cacheKey = JSON.stringify({ options, lowercaseWords });

    if (titleCaseOptionsCache.has(cacheKey)) {
        return titleCaseOptionsCache.get(cacheKey);
    }

    const mergedOptions = { ...TITLE_CASE_DEFAULT_OPTIONS[options.style], ...options };
    const mergedArticles = mergedOptions.articles.concat(lowercaseWords).filter((word, index, array) => array.indexOf(word) === index);
    const mergedShortConjunctions = mergedOptions.shortConjunctions.concat(lowercaseWords).filter((word, index, array) => array.indexOf(word) === index);
    const mergedShortPrepositions = mergedOptions.shortPrepositions.concat(lowercaseWords).filter((word, index, array) => array.indexOf(word) === index);
    const mergedReplaceTerms = [...(mergedOptions.replaceTerms || []).map(([key, value]) => [key.toLowerCase(), value]), ...replaceCasing];

    const result = {
        articles: mergedArticles,
        shortConjunctions: mergedShortConjunctions,
        shortPrepositions: mergedShortPrepositions,
        neverCapitalized: [...mergedOptions.neverCapitalized],
        replaceTerms: mergedReplaceTerms,
    };

    titleCaseOptionsCache.set(cacheKey, result);
    return result;
}


function isShortConjunction(word, style) {
    const shortConjunctions = [...getTitleCaseOptions({
        style: style
    }).shortConjunctions];
    const wordLowerCase = word.toLowerCase();
    return shortConjunctions.includes(wordLowerCase);
}

function isArticle(word, style) {
    const articles = getTitleCaseOptions({
        style: style
    }).articles;
    return articles.includes(word.toLowerCase());
}

function isShortPreposition(word, style) {
    const {
        shortPrepositions
    } = getTitleCaseOptions({
        style: style
    });
    return shortPrepositions.includes(word.toLowerCase());
}

const isNeverCapitalizedCache = new Map();

function isNeverCapitalized(word, style) {
  const cacheKey = `${style}_${word.toLowerCase()}`;

  if (isNeverCapitalizedCache.has(cacheKey)) {
    return isNeverCapitalizedCache.get(cacheKey);
  }

  const { neverCapitalized } = getTitleCaseOptions({ style });

  const result = neverCapitalized.includes(word.toLowerCase());
  isNeverCapitalizedCache.set(cacheKey, result);

  return result;
}

export function isShortWord(word, style) {
    if (typeof word !== 'string') {
        throw new TypeError(`Invalid input: word must be a string. Received ${typeof word}.`);
    }

    if (!ALLOWED_TITLE_CASE_STYLES.includes(style)) {
        throw new Error(`Invalid option: style must be one of ${ALLOWED_TITLE_CASE_STYLES.join(", ")}.`);
    }

    return (
        isShortConjunction(word, style) ||
        isArticle(word, style) ||
        isShortPreposition(word, style) ||
        isNeverCapitalized(word, style)
    );
}

export function hasNumbersInWord(word) {
    return /\d/.test(word);
}

function hasMultipleUppercaseLetters(word) {
    let count = 0;
    for (let i = 0; i < word.length && count < 2; i++) {
        if (/[A-Z]/.test(word[i])) {
            count++;
        }
    }
    return count >= 2;
}

export function hasIntentionalUppercase(word) {
    return /[A-Z]/.test(word.slice(1)) && /[a-z]/.test(word.slice(0, -1));
}

export function hasHyphen(word) {
    return word.indexOf('-') !== -1 || word.indexOf('–') !== -1 || word.indexOf('—') !== -1;
}

export function hasApostrophe(word) {
    return word.indexOf("'") !== -1;
}

export function startsWithSymbol(word) {
    if (typeof word !== 'string') {
        throw new Error(`Parameter 'word' must be a string. Received '${typeof word}' instead.`);
    }

    if (word.length === 0) {
        return false;
    }

    const firstChar = word.charAt(0);

    return (
        firstChar === '#' ||
        firstChar === '@' ||
        firstChar === '.'
    );
}

export function endsWithSymbol(word, symbols = [".", ",", ";", ":", "?", "!", "]", ")", "}"]) {
    if (typeof word !== "string" || !Array.isArray(symbols))
        throw new Error("Invalid arguments");
    return symbols.some(symbol => word.endsWith(symbol)) || symbols.includes(word.slice(-2));
}

export function isRomanNumeral(word) {
    if (typeof word !== 'string' || word === '') {
        throw new TypeError('Invalid input: word must be a non-empty string.');
    }

    const romanNumeralRegex = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;

    return romanNumeralRegex.test(word);
}

export function hasHyphenRomanNumeral(word) {
    if (typeof word !== "string" || word === "") {
        throw new TypeError("Invalid input: word must be a non-empty string.");
    }

    const parts = word.split("-");
    for (let i = 0; i < parts.length; i++) {
        if (!isRomanNumeral(parts[i])) {
            return false;
        }
    }
    return true;
}

export function isWordIgnored(word, ignoredWords = IGNORED_WORDS) {
    if (!Array.isArray(ignoredWords)) {
        throw new TypeError("Invalid input: ignoredWords must be an array.");
    }

    if (typeof word !== "string" || word.trim() === "") {
        throw new TypeError("Invalid input: word must be a non-empty string.");
    }

    const lowercasedWord = word.toLowerCase().trim();

    return ignoredWords.includes(lowercasedWord);
}

export function isWordInArray(targetWord, wordList) {
    if (!Array.isArray(wordList)) {
      return false;
    }
  
    return wordList.some((word) => word.toLowerCase() === targetWord.toLowerCase());
  }
  

  export function getCorrectTitleCasing(word, includeApostrophe = false) {
    if (!word) {
      throw new Error('Word is empty.');
    }
  
    const lowerCaseWord = word.toLowerCase();
    const uniqueTermsIndex = CORRECT_TITLE_CASE.findIndex((w) => w.toLowerCase() === lowerCaseWord);
  
    if (uniqueTermsIndex >= 0) {
      const correctCase = CORRECT_TITLE_CASE[uniqueTermsIndex];
      if (includeApostrophe && lowerCaseWord.endsWith("'s")) {
        return `${correctCase}'s`;
      } else {
        return correctCase;
      }
    }
  
    if (includeApostrophe && lowerCaseWord.endsWith("'s")) {
      const baseWord = lowerCaseWord.slice(0, -2);
      const titleCaseBase = getCorrectTitleCasing(baseWord, true);
      return `${titleCaseBase}'s`;
    }
  
    return lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1);
  }
  

export function hasSuffix(word) {
    const suffix = "'s";
    return word.length > suffix.length && word.endsWith(suffix);
}

export function correctSuffix(word, correctTerms) {
    const suffix = "'s";
    const lowerCasedWord = word.toLowerCase();

    if (lowerCasedWord.endsWith(suffix)) {
        const wordWithoutSuffix = word.slice(0, -suffix.length);
        const matchingIndex = correctTerms.findIndex(
            (term) => term.toLowerCase() === wordWithoutSuffix.toLowerCase()
        );
        if (matchingIndex >= 0) {
            const correctCase = correctTerms[matchingIndex];
            return correctCase + suffix;
        }
    }

    return word;
}

export function correctTerm(word, correctTerms) {
    if (typeof word !== "string" || word === "") {
        throw new TypeError("Invalid input: word must be a non-empty string.");
    }

    if (!correctTerms || !Array.isArray(correctTerms)) {
        throw new TypeError("Invalid input: correctTerms must be an array.");
    }

    const parts = word.split(/[-']/);
    const numParts = parts.length;

    for (let i = 0; i < numParts; i++) {
        const lowercasedPart = parts[i].toLowerCase();
        const index = correctTerms.findIndex((t) => t.toLowerCase() === lowercasedPart);
        if (index >= 0) {
            parts[i] = correctTerms[index];
        }
    }

    return parts.join(/[-']/);
}

export function replaceTerm(word, replaceTermsObj) {
    if (typeof word !== "string" || word === "") {
        throw new TypeError("Invalid input: word must be a non-empty string.");
    }

    if (typeof replaceTermsObj !== "object" || replaceTermsObj === null) {
        throw new TypeError(
            "Invalid input: replaceTermsObj must be a non-null object."
        );
    }

    const lowercasedWord = word.toLowerCase();

    if (lowercasedWord in replaceTermsObj) {
        return replaceTermsObj[lowercasedWord];
    }

    if (word in replaceTermsObj) {
        return replaceTermsObj[word];
    }

    if (word.toUpperCase() in replaceTermsObj) {
        return replaceTermsObj[word.toUpperCase()];
    }

    return word;
}

export function correctHyphenatedTerm(word, style) {
    const hyphenatedWords = word.split("-");
    const capitalizeFirst = (word) => word.charAt(0).toUpperCase() + word.slice(1);
    const lowercaseRest = (word) => word.charAt(0) + word.slice(1).toLowerCase();
  
    const styleFunctions = {
      ap: (word, index) => (index === 0 ? capitalizeFirst(word) : lowercaseRest(word)),
      chicago: capitalizeFirst,
      apa: (word, index, length) => {
        if (isShortWord(word, style) && index > 0 && index < length - 1) {
          return word.toLowerCase();
        } else {
          return capitalizeFirst(word);
        }
      },
      nyt: (word, index) => (index === 0 ? capitalizeFirst(word) : lowercaseRest(word)),
      wikipedia: (word, index) => (index === 0 ? capitalizeFirst(word) : lowercaseRest(word)),
    };
  
    const processWord = styleFunctions[style] || lowercaseRest;
    const processedWords = hyphenatedWords.map((word, i) => {
      let correctedWord = word;
      const lowerCaseWord = word.toLowerCase();
      const uniqueTermsIndex = CORRECT_TITLE_CASE.findIndex((w) => w.toLowerCase() === lowerCaseWord);
      if (uniqueTermsIndex >= 0) {
        correctedWord = CORRECT_TITLE_CASE[uniqueTermsIndex];
      } else if (lowerCaseWord.endsWith("'s")) {
        const rootWord = lowerCaseWord.substring(0, lowerCaseWord.length - 2);
        const rootWordIndex = CORRECT_TITLE_CASE.findIndex((w) => w.toLowerCase() === rootWord);
        if (rootWordIndex >= 0) {
          correctedWord = `${CORRECT_TITLE_CASE[rootWordIndex]}'s`;
        }
      }
      return processWord(correctedWord, i, hyphenatedWords.length);
    });
  
    return processedWords.join("-");
  }
  

export function isPhraseIgnored(words, IGNORED_TITLE_CASE_PHRASES) {
    return words.some((word, i) => {
        const ignorePhrase = IGNORED_TITLE_CASE_PHRASES.find(phrase => phrase.toLowerCase().startsWith(word.toLowerCase()));
        if (ignorePhrase) {
            const remainingWords = words.slice(i + 1);
            const remainingIgnorePhrases = IGNORED_TITLE_CASE_PHRASES.filter(phrase => phrase.toLowerCase().startsWith(ignorePhrase.toLowerCase() + ' '));
            if (remainingIgnorePhrases.length > 0) {
                return isPhraseIgnored(remainingWords, remainingIgnorePhrases);
            } else {
                return true;
            }
        }
        return false;
    });
}