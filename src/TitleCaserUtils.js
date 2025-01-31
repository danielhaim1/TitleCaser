import {
  allowedTitleCaseStylesList,
  titleCaseDefaultOptionsList,
  wordReplacementsList,
  correctTitleCasingList,
  ignoredWordList,
} from "./TitleCaserConsts.js";

export class TitleCaserUtils {
  // Validate the option key
  static validateOption(key, value) {
    // Check if value is an array
    if (!Array.isArray(value)) {
      throw new TypeError(`Invalid option: ${key} must be an array`);
    }

    // Check if all values in the array are strings
    if (!value.every((word) => typeof word === "string")) {
      throw new TypeError(`Invalid option: ${key} must be an array of strings`);
    }
  }

  // Validate the option object
  static TitleCaseValidator;

  static validateOptions(options) {
    for (const key of Object.keys(options)) {
      if (key === "style") {
        if (typeof options.style !== "string") {
          throw new TypeError(`Invalid option: ${key} must be a string`);
        } else if (!allowedTitleCaseStylesList.includes(options.style)) {
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

      if (!titleCaseDefaultOptionsList.hasOwnProperty(key)) {
        throw new TypeError(`Invalid option: ${key}`);
      }

      this.TitleCaseValidator.validateOption(key, options[key]);
    }
  }

  static titleCaseOptionsCache = new Map();

  static getTitleCaseOptions(options = {}, lowercaseWords = []) {
    // Create a unique key for the cache that combines the options and the lowercase words
    const cacheKey = JSON.stringify({
      options,
      lowercaseWords,
    });

    // If the cache already has an entry for this key, return the cached options
    if (TitleCaserUtils.titleCaseOptionsCache.has(cacheKey)) {
      return TitleCaserUtils.titleCaseOptionsCache.get(cacheKey);
    }

    const mergedOptions = {
      ...titleCaseDefaultOptionsList[options.style || "ap"],
      ...options,
      smartQuotes: options.hasOwnProperty("smartQuotes") ? options.smartQuotes : false,
    };

    // Merge the default articles with user-provided articles and lowercase words
    const mergedArticles = mergedOptions.articlesList
      .concat(lowercaseWords)
      .filter((word, index, array) => array.indexOf(word) === index);

    // Merge the default short conjunctions with user-provided conjunctions and lowercase words
    const mergedShortConjunctions = mergedOptions.shortConjunctionsList
      .concat(lowercaseWords)
      .filter((word, index, array) => array.indexOf(word) === index);

    // Merge the default short prepositions with user-provided prepositions and lowercase words
    const mergedShortPrepositions = mergedOptions.shortPrepositionsList
      .concat(lowercaseWords)
      .filter((word, index, array) => array.indexOf(word) === index);

    // Merge the default word replacements with the user-provided replacements
    const mergedReplaceTerms = [
      ...(mergedOptions.replaceTerms || []).map(([key, value]) => [key.toLowerCase(), value]),
      ...wordReplacementsList,
    ];

    // Return the merged options
    const result = {
      articlesList: mergedArticles,
      shortConjunctionsList: mergedShortConjunctions,
      shortPrepositionsList: mergedShortPrepositions,
      neverCapitalizedList: [...mergedOptions.neverCapitalizedList],
      replaceTerms: mergedReplaceTerms,
      smartQuotes: mergedOptions.smartQuotes, // Add smartQuotes option to result
    };

    // Add the merged options to the cache and return them
    TitleCaserUtils.titleCaseOptionsCache.set(cacheKey, result);
    return result;
  }

  static isNeverCapitalizedCache = new Map();

  // Check if the word is a short conjunction
  static isShortConjunction(word, style) {
    // Get the list of short conjunctions from the TitleCaseHelper
    const shortConjunctionsList = [
      ...TitleCaserUtils.getTitleCaseOptions({
        style: style,
      }).shortConjunctionsList,
    ];

    // Convert the word to lowercase
    const wordLowerCase = word.toLowerCase();

    // Return true if the word is in the list of short conjunctions
    return shortConjunctionsList.includes(wordLowerCase);
  }

  // Check if the word is an article
  static isArticle(word, style) {
    // Get the list of articles for the language
    const articlesList = TitleCaserUtils.getTitleCaseOptions({
      style: style,
    }).articlesList;
    // Return true if the word matches an article
    return articlesList.includes(word.toLowerCase());
  }

  // Check if the word is a short preposition
  static isShortPreposition(word, style) {
    // Get the list of short prepositions from the Title Case Helper.
    const { shortPrepositionsList } = TitleCaserUtils.getTitleCaseOptions({
      style: style,
    });
    // Check if the word is in the list of short prepositions.
    return shortPrepositionsList.includes(word.toLowerCase());
  }

  // This function is only ever called once per word per style, since the result is cached.
  // The cache key is a combination of the style and the lowercase word.
  static isNeverCapitalized(word, style) {
    // Check if the word is in the cache. If it is, return it.
    const cacheKey = `${style}_${word.toLowerCase()}`;
    if (TitleCaserUtils.isNeverCapitalizedCache.has(cacheKey)) {
      return TitleCaserUtils.isNeverCapitalizedCache.get(cacheKey);
    }

    // If the word is not in the cache, then check if it is in the word list for the given style.
    const { neverCapitalizedList } = TitleCaserUtils.getTitleCaseOptions({
      style,
    });

    const result = neverCapitalizedList.includes(word.toLowerCase());
    // Store the result in the cache so it can be used again
    TitleCaserUtils.isNeverCapitalizedCache.set(cacheKey, result);

    return result;
  }

  static isShortWord(word, style) {
    // If the word is not a string, throw a TypeError.
    if (typeof word !== "string") {
      throw new TypeError(`Invalid input: word must be a string. Received ${typeof word}.`);
    }

    // If the style is not one of the allowed styles, throw an Error.
    if (!allowedTitleCaseStylesList.includes(style)) {
      throw new Error(`Invalid option: style must be one of ${allowedTitleCaseStylesList.join(", ")}.`);
    }

    // If the word is a short conjunction, article, preposition, or is in the never-capitalized list, return true.
    // Otherwise, return false.
    return (
      TitleCaserUtils.isShortConjunction(word, style) ||
      TitleCaserUtils.isArticle(word, style) ||
      TitleCaserUtils.isShortPreposition(word, style) ||
      TitleCaserUtils.isNeverCapitalized(word, style)
    );
  }

  // Check if a word has a number
  static hasNumbers(word) {
    return /\d/.test(word);
  }

  // Check if a word has multiple uppercase letters
  static hasUppercaseMultiple(word) {
    // initialize count to 0
    let count = 0;
    // loop through each character of the word
    for (let i = 0; i < word.length && count < 2; i++) {
      // if the character is an uppercase letter
      if (/[A-Z]/.test(word[i])) {
        // increment count by 1
        count++;
      }
    }
    // return true if count is greater or equal to 2, false otherwise
    return count >= 2;
  }

  // Check if a word has an intentional uppercase letter
  // (i.e. not the first letter of the word)
  static hasUppercaseIntentional(word) {
    if (word.length <= 4) {
      return /[A-Z]/.test(word.slice(1));
    }

    const hasUppercase = /[A-Z]/.test(word.slice(1));
    const hasLowercase = /[a-z]/.test(word.slice(1));

    return hasUppercase && hasLowercase;
  }

  // Check if a word is an acronym
  // (i.e. 'the', 'to', 'within')
  static isAcronym(word, prevWord, nextWord) {
    try {
      if (typeof word !== "string") {
        throw new Error("Input word must be a string.");
      }

      const countryCodes = new Set(["us", "usa"]);
      const commonShortWords = new Set([
        "the",
        "in",
        "to",
        "within",
        "towards",
        "into",
        "at",
      ]);
      const directFollowingIndicators = new Set([
        "policies",
        "government",
        "military",
        "embassy",
        "administration",
        "senate",
        "congress",
        "parliament",
        "cabinet",
        "federation",
        "republic",
        "democracy",
        "law",
        "act",
        "treaty",
        "court",
        "legislation",
        "statute",
        "bill",
        "agency",
        "department",
        "bureau",
        "service",
        "office",
        "council",
        "commission",
        "division",
        "alliance",
        "union",
        "confederation",
        "bloc",
        "zone",
        "territory",
        "province",
        "state",
        "army",
        "navy",
        "forces",
        "marines",
        "airforce",
        "defense",
        "intelligence",
        "security",
        "economy",
        "budget",
        "finance",
        "treasury",
        "trade",
        "sanctions",
        "aid",
        "strategy",
        "plan",
        "policy",
        "program",
        "initiative",
        "project",
        "reform",
        "relations",
        "ambassador",
        "diplomacy",
        "summit",
        "conference",
        "talks",
        "negotiations",
      ]);

      const removePunctuation = (word) => word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

      // Remove trailing punctuation from the word
      const removeTrailingPunctuation = (word) => {
        const match = word.match(/^(.*?)([.,\/#!$%\^&\*;:{}=\-_`~()]+)$/);
        if (match && match[1]) {
          return match[1];
        }
        return word;
      };

      word = word ? removePunctuation(word.toLowerCase()) : "";
      word = removeTrailingPunctuation(word);

      prevWord = prevWord ? removePunctuation(prevWord.toLowerCase()) : "";
      nextWord = nextWord ? removePunctuation(nextWord.toLowerCase()) : "";

      // Check if it's an acronym with direct following indicators
      const isDirectAcronym =
        countryCodes.has(word) &&
        (!prevWord || commonShortWords.has(prevWord)) &&
        (!nextWord || directFollowingIndicators.has(nextWord));

      // Check if it's an acronym based on the previous word
      const isPreviousAcronym = countryCodes.has(prevWord) && (!nextWord || directFollowingIndicators.has(nextWord));

      return isDirectAcronym || isPreviousAcronym;
    } catch (error) {
      console.error(`An error occurred: ${error.message}`);
      return false; // Return false in case of errors to indicate failure.
    }
  }

  static checkIfWordIsAcronym(commonShortWords, prevWord, currentWord, nextWord) {
    const countryCodes = ["us", "usa"];
    const directPrecedingIndicators = ["the", "in", "to", "from", "against", "with", "within", "towards", "into", "at"];
    const directFollowingIndicators = [
      "policies",
      "government",
      "military",
      "embassy",
      "administration",
      "senate",
      "congress",
      "parliament",
      "cabinet",
      "federation",
      "republic",
      "democracy",
      "law",
      "act",
      "treaty",
      "court",
      "legislation",
      "statute",
      "bill",
      "agency",
      "department",
      "bureau",
      "service",
      "office",
      "council",
      "commission",
      "division",
      "alliance",
      "union",
      "confederation",
      "bloc",
      "zone",
      "territory",
      "province",
      "state",
      "army",
      "navy",
      "forces",
      "marines",
      "airforce",
      "defense",
      "intelligence",
      "security",
      "economy",
      "budget",
      "finance",
      "treasury",
      "trade",
      "sanctions",
      "aid",
      "strategy",
      "plan",
      "policy",
      "program",
      "initiative",
      "project",
      "reform",
      "relations",
      "ambassador",
      "diplomacy",
      "summit",
      "conference",
      "talks",
      "negotiations",
    ];

    const removePunctuation = (word) => word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

    currentWord = currentWord ? removePunctuation(currentWord.toLowerCase()) : "";
    prevWord = prevWord ? removePunctuation(prevWord.toLowerCase()) : "";
    nextWord = nextWord ? removePunctuation(nextWord.toLowerCase()) : "";

    if (
      countryCodes.includes(currentWord.toLowerCase()) &&
      (prevWord === null || commonShortWords.includes(prevWord.toLowerCase())) &&
      (nextWord === null || directFollowingIndicators.includes(nextWord.toLowerCase()))
    ) {
      return true;
    }

    return false;
  }

  // Check if a word has a suffix
  static hasSuffix(word) {
    // Test if word is longer than suffix
    const suffix = "'s";
    // Test if word ends with suffix
    return word.length > suffix.length && word.endsWith(suffix);
  }

  // Check if a word has an apostrophe
  static hasApostrophe(word) {
    return word.indexOf("'") !== -1;
  }

  // Check if a word has a hyphen
  static hasHyphen(word) {
    return word.indexOf("-") !== -1 || word.indexOf("–") !== -1 || word.indexOf("—") !== -1;
  }

  // Check if a word is a Roman numeral
  static hasRomanNumeral(word) {
    // Check if the input is a string
    if (typeof word !== "string" || word === "") {
      // Throw an error if the input is not a string
      throw new TypeError("Invalid input: word must be a non-empty string.");
    }

    // Check if the word contains an apostrophe
    const hasApostrophe = word.includes("'");

    // If the word has an apostrophe, split it
    const wordParts = hasApostrophe ? word.split("'") : [word];

    // Define a regular expression that matches a roman numeral
    const romanNumeralRegex = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;

    // Check each part of the word
    const isRomanNumeral = wordParts.every((part) => romanNumeralRegex.test(part));

    return isRomanNumeral;
  }

  // Check if a word is a hyphenated Roman numeral
  static hasHyphenRomanNumeral(word) {
    if (typeof word !== "string" || word === "") {
      throw new TypeError("Invalid input: word must be a non-empty string.");
    }

    const parts = word.split("-");
    for (let i = 0; i < parts.length; i++) {
      if (!TitleCaserUtils.hasRomanNumeral(parts[i])) {
        return false;
      }
    }
    return true;
  }

  // Check if a word has `nl2br` in it
  static hasHtmlBreak(word) {
    return word === "nl2br";
  }

  // Check if a string has Unicode symbols.
  static hasUnicodeSymbols(str) {
    return /[^\x00-\x7F\u00A0-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u02AF\u02B0-\u02FF\u0300-\u036F\u0370-\u03FF\u0400-\u04FF\u0500-\u052F\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u0780-\u07BF\u07C0-\u07FF\u0800-\u083F\u0840-\u085F\u0860-\u087F\u0880-\u08AF\u08B0-\u08FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF]/.test(
      str,
    );
  }

  // Checks whether a string contains any currency symbols
  static hasCurrencySymbols(str) {
    return /[^\x00-\x7F\u00A0-\u00FF\u20AC\u20A0-\u20B9\u20BD\u20A1-\u20A2\u00A3-\u00A5\u058F\u060B\u09F2-\u09F3\u0AF1\u0BF9\u0E3F\u17DB\u20A6\u20A8\u20B1\u2113\u20AA-\u20AB\u20AA\u20AC-\u20AD\u20B9]/.test(
      str,
    );
  }

  // Check if a word is ampersand
  static isWordAmpersand(str) {
    return /&amp;|&/.test(str);
  }

  // Check if a word starts with a symbol
  static startsWithSymbol(word) {
    if (typeof word !== "string") {
      throw new Error(`Parameter 'word' must be a string. Received '${typeof word}' instead.`);
    }

    if (word.length === 0) {
      return false;
    }

    const firstChar = word.charAt(0);

    return firstChar === "#" || firstChar === "@" || firstChar === ".";
  }

  static escapeSpecialCharacters(str) {
    return str.replace(/[&<>"']/g, function (match) {
      switch (match) {
        case "&":
          return "&amp;";
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case '"':
          return "&quot;";
        case "'":
          return "&#x27;";
        default:
          return match;
      }
    });
  }

  // Check if there's an unescaped special character
  static unescapeSpecialCharacters(str) {
    return str.replace(/&amp;|&lt;|&gt;|&quot;|&#x27;/g, function (match) {
      switch (match) {
        case "&amp;":
          return "&";
        case "&lt;":
          return "<";
        case "&gt;":
          return ">";
        case "&quot;":
          return '"';
        case "&#x27;":
          return "'";
        default:
          return match;
      }
    });
  }

  // Check if a word ends with a symbol
  static endsWithSymbol(word, symbols = [".", ",", ";", ":", "?", "!"]) {
    // Check if the word is a string and the symbols is an array
    if (typeof word !== "string" || !Array.isArray(symbols)) throw new Error("Invalid arguments");
    // Check if the word ends with a symbol or two symbols
    return symbols.some((symbol) => word.endsWith(symbol)) || symbols.includes(word.slice(-2));
  }

  // This function accepts two arguments: a word and an array of ignored words.
  static isWordIgnored(word, ignoredWords = ignoredWordList) {
    // If the ignoredWords argument is not an array, throw an error.
    if (!Array.isArray(ignoredWords)) {
      throw new TypeError("Invalid input: ignoredWords must be an array.");
    }

    // If the word argument is not a non-empty string, throw an error.
    if (typeof word !== "string" || word.trim() === "") {
      throw new TypeError("Invalid input: word must be a non-empty string.");
    }

    // Convert the word to lowercase and trim any space.
    let lowercasedWord;
    lowercasedWord = word.toLowerCase().trim();

    // If the word is in the ignoredWords array, return true. Otherwise, return false.
    return ignoredWords.includes(lowercasedWord);
  }

  // Check if the wordList is a valid array
  static isWordInArray(targetWord, wordList) {
    if (!Array.isArray(wordList)) {
      return false;
    }

    // Check if the targetWord is in the wordList
    return wordList.some((word) => word.toLowerCase() === targetWord.toLowerCase());
  }

  static convertQuotesToCurly(input) {
    const curlyQuotes = {
      "'": ["\u2018", "\u2019"],
      '"': ["\u201C", "\u201D"],
    };

    let replacedText = "";

    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      const curlyQuotePair = curlyQuotes[char];

      if (curlyQuotePair) {
        const prevChar = input[i - 1];
        const nextChar = input[i + 1];

        // Determine whether to use left or right curly quote
        const isLeftAligned = !prevChar || prevChar === " " || prevChar === "\n";
        const curlyQuote = isLeftAligned ? curlyQuotePair[0] : curlyQuotePair[1];
        replacedText += curlyQuote;

        // Handle cases where right curly quote is followed by punctuation or space
        if (curlyQuote === curlyQuotePair[1] && /[.,;!?()\[\]{}:]/.test(nextChar)) {
          replacedText += nextChar;
          i++; // Skip the next character
        }
      } else {
        replacedText += char;
      }
    }

    return replacedText;
  }

  // This function is used to replace a word with a term in the replaceTerms object
  static replaceTerm(word, replaceTermObj) {
    // Validate input
    if (typeof word !== "string" || word === "") {
      throw new TypeError("Invalid input: word must be a non-empty string.");
    }

    if (!replaceTermObj || typeof replaceTermObj !== "object") {
      throw new TypeError("Invalid input: replaceTermObj must be a non-null object.");
    }

    // Convert the word to lowercase
    let lowercasedWord;
    lowercasedWord = word.toLowerCase();

    // Check if the word is in the object with lowercase key
    if (replaceTermObj.hasOwnProperty(lowercasedWord)) {
      return replaceTermObj[lowercasedWord];
    }

    // Check if the word is in the object with original case key
    if (replaceTermObj.hasOwnProperty(word)) {
      return replaceTermObj[word];
    }

    // Check if the word is in the object with uppercase key
    const uppercasedWord = word.toUpperCase();
    if (replaceTermObj.hasOwnProperty(uppercasedWord)) {
      return replaceTermObj[uppercasedWord];
    }

    // If the word is not in the object, return the original word
    return word;
  }

  // This function is used to check if a suffix is present in a word that is in the correct terms list
  static correctSuffix(word, correctTerms) {
    // Validate input
    if (typeof word !== "string" || word === "") {
      throw new TypeError("Invalid input: word must be a non-empty string.");
    }

    if (!correctTerms || !Array.isArray(correctTerms) || correctTerms.some((term) => typeof term !== "string")) {
      throw new TypeError("Invalid input: correctTerms must be an array of strings.");
    }

    // Define the regular expression for the suffix
    const suffixRegex = /'s$/i;

    // If the word ends with the suffix
    if (suffixRegex.test(word)) {
      // Remove the suffix from the word
      const wordWithoutSuffix = word.slice(0, -2);
      // Check if the word without the suffix matches any of the correct terms
      const matchingIndex = correctTerms.findIndex((term) => term.toLowerCase() === wordWithoutSuffix.toLowerCase());

      if (matchingIndex >= 0) {
        // If it does, return the correct term with the suffix
        const correctCase = correctTerms[matchingIndex];
        return `${correctCase}'s`;
      } else {
        // If not, capitalize the first letter and append the suffix
        const capitalizedWord = wordWithoutSuffix.charAt(0).toUpperCase() + wordWithoutSuffix.slice(1);
        return `${capitalizedWord}'s`;
      }
    }

    // If the word doesn't end with the suffix, return the word as-is
    return word;
  }

  // This function is used to check if a word is in the correct terms list
  static correctTerm(word, correctTerms, delimiters = /[-']/) {
    // Validate input
    if (typeof word !== "string" || word === "") {
      throw new TypeError("Invalid input: word must be a non-empty string.");
    }

    if (!correctTerms || !Array.isArray(correctTerms)) {
      throw new TypeError("Invalid input: correctTerms must be an array.");
    }

    if (typeof delimiters !== "string" && !Array.isArray(delimiters) && !(delimiters instanceof RegExp)) {
      throw new TypeError("Invalid input: delimiters must be a string, an array of strings, or a regular expression.");
    }

    // Convert delimiters to a regular expression if it is a string or an array
    if (typeof delimiters === "string") {
      delimiters = new RegExp(`[${delimiters}]`);
    } else if (Array.isArray(delimiters)) {
      delimiters = new RegExp(`[${delimiters.join("")}]`);
    }

    // Split the word into parts delimited by the specified delimiters
    const parts = word.split(delimiters);
    const numParts = parts.length;

    // For each part, replace it with the correct term if found or title-case it if not found
    for (let i = 0; i < numParts; i++) {
      const lowercasedPart = parts[i].toLowerCase();
      const index = correctTerms.findIndex((t) => t.toLowerCase() === lowercasedPart);
      if (index >= 0) {
        parts[i] = correctTerms[index];
      } else {
        // Capitalize first letter and lowercase the rest if no replacement is found
        parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1).toLowerCase();
      }
    }

    // Determine the joiner based on the original word
    let joiner = delimiters.source.charAt(0);
    if (word.includes("-")) {
      joiner = "-";
    } else if (word.includes("'")) {
      joiner = "'";
    }

    // Join the parts back together using the determined joiner
    return parts.join(joiner);
  }

  // This function is used to check if a word is in the correct terms list
  static correctTermHyphenated(word, style) {
    // Split the word into an array of words
    const hyphenatedWords = word.split("-");

    // Define functions to process words
    const capitalizeFirst = (word) => word.charAt(0).toUpperCase() + word.slice(1);
    const lowercaseRest = (word) => word.charAt(0) + word.slice(1).toLowerCase();

    // Define the style-specific processing functions
    const styleFunctions = {
      ap: (word, index) => (index === 0 ? capitalizeFirst(word) : lowercaseRest(word)),
      chicago: capitalizeFirst,
      apa: (word, index, length) => {
        if (TitleCaserUtils.isShortWord(word, style) && index > 0 && index < length - 1) {
          return word.toLowerCase();
        } else {
          return capitalizeFirst(word);
        }
      },
      nyt: (word, index) => (index === 0 ? capitalizeFirst(word) : lowercaseRest(word)),
      wikipedia: (word, index) => (index === 0 ? capitalizeFirst(word) : lowercaseRest(word)),
    };

    // Get the style-specific processing function
    const processWord = styleFunctions[style] || lowercaseRest;

    // Process each word
    const processedWords = hyphenatedWords.map((word, i) => {
      let correctedWord = word;

      const romanNumeralApostropheSRegex = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})'s$/i;
      if (romanNumeralApostropheSRegex.test(word)) {
        const updatedWord = correctedWord.toUpperCase().replace(/'S$/, "'s");
        // Uppercase the Roman numeral part and concatenate back with 's
        return updatedWord;
      }

      // Check if the word is a Roman numeral
      const romanNumeralRegex = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;
      if (romanNumeralRegex.test(word)) {
        return word.toUpperCase();
      }

      // Preserve the original word

      // Check if the word contains an apostrophe
      const hasApostrophe = word.includes("'");
      if (hasApostrophe) {
        // Split the word at the apostrophe
        const wordParts = word.split("'");
        // Check each part for Roman numerals
        const isRomanNumeral = wordParts.every((part) => romanNumeralRegex.test(part));
        if (isRomanNumeral) {
          // Uppercase each Roman numeral part and join back with apostrophe
          correctedWord = wordParts.map((part) => part.toUpperCase()).join("'");
          return correctedWord;
        } else {
          return processWord(correctedWord, i, hyphenatedWords.length);
        }
      }

      // Check if the word is in the list of words to preserve
      const lowerCaseWord = word.toLowerCase();
      const uniqueTermsIndex = correctTitleCasingList.findIndex((w) => w.toLowerCase() === lowerCaseWord);
      if (uniqueTermsIndex >= 0) {
        correctedWord = correctTitleCasingList[uniqueTermsIndex];
      }
      // Check if the word is a possessive form
      else if (lowerCaseWord.endsWith("'s")) {
        const rootWord = lowerCaseWord.substring(0, lowerCaseWord.length - 2);
        const rootWordIndex = correctTitleCasingList.findIndex((w) => w.toLowerCase() === rootWord);
        if (rootWordIndex >= 0) {
          correctedWord = `${correctTitleCasingList[rootWordIndex]}'s`;
        }
      }

      // Process the word
      return processWord(correctedWord, i, hyphenatedWords.length);
    });

    // Rejoin the words
    return processedWords.join("-");
  }
}
