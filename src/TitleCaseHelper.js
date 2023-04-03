import {
    allowedTitleCaseStylesList,
    titleCaseDefaultOptionsList,
    wordReplacementsList,
    correctTitleCasingList,
    ignoredWordsList,
} from "./TitleCaseConsts.js";

export default class TitleCaseHelper {

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

    // Validate the options object
    static validateOptions(options) {
        for (const key of Object.keys(options)) {
            if (key === 'style') {
                if (typeof options.style !== 'string') {
                    throw new TypeError(`Invalid option: ${key} must be a string`);
                } else if (!allowedTitleCaseStylesList.includes(options.style)) {
                    throw new TypeError(`Invalid option: ${key} must be a string`);
                }
                continue;
            }
            if (key === 'wordReplacementsList') {
                if (!Array.isArray(options.wordReplacementsList)) {
                    throw new TypeError(`Invalid option: ${key} must be an array`);
                } else {
                    for (const term of options.wordReplacementsList) {
                        if (typeof term !== 'string') {
                            throw new TypeError(`Invalid option: ${key} must contain only strings`);
                        }
                    }
                }
                continue;
            }
            if (!titleCaseDefaultOptionsList.hasOwnProperty(key)) {
                throw new TypeError(`Invalid option: ${key}`);
            }
            TitleCaseValidator.validateOption(key, options[key]);
        }
    }

    static titleCaseOptionsCache = new Map();
    static getTitleCaseOptions(options = {}, lowercaseWords = []) {
        // Create a unique key for the cache that combines the options and the lowercase words
        const cacheKey = JSON.stringify({
            options,
            lowercaseWords
        });

        // If the cache already has an entry for this key, return the cached options
        if (TitleCaseHelper.titleCaseOptionsCache.has(cacheKey)) {
            return TitleCaseHelper.titleCaseOptionsCache.get(cacheKey);
        }

        // Merge the default options with the user-provided options
        const mergedOptions = {
            ...titleCaseDefaultOptionsList[options.style || "ap"],
            ...options
        };

        // Merge the default articles with user-provided articles and lowercase words
        const mergedArticles = mergedOptions.articlesList.concat(lowercaseWords)
            .filter((word, index, array) => array.indexOf(word) === index);

        // Merge the default short conjunctions with user-provided conjunctions and lowercase words
        const mergedShortConjunctions = mergedOptions.shortConjunctionsList.concat(lowercaseWords)
            .filter((word, index, array) => array.indexOf(word) === index);

        // Merge the default short prepositions with user-provided prepositions and lowercase words
        const mergedShortPrepositions = mergedOptions.shortPrepositionsList.concat(lowercaseWords)
            .filter((word, index, array) => array.indexOf(word) === index);

        // Merge the default word replacements with the user-provided replacements
        const mergedReplaceTerms = [
            ...(mergedOptions.replaceTerms || [])
                .map(([key, value]) => [key.toLowerCase(), value]),
            ...wordReplacementsList,
        ];

        // Return the merged options
        const result = {
            articlesList: mergedArticles,
            shortConjunctionsList: mergedShortConjunctions,
            shortPrepositionsList: mergedShortPrepositions,
            neverCapitalizedList: [...mergedOptions.neverCapitalizedList],
            replaceTerms: mergedReplaceTerms,
        };

        // Add the merged options to the cache and return them
        TitleCaseHelper.titleCaseOptionsCache.set(cacheKey, result);
        return result;
    }

    static isNeverCapitalizedCache = new Map();

    // Check if the word is a short conjunction
    static isShortConjunction(word, style) {
        // Get the list of short conjunctions from the TitleCaseHelper
        const shortConjunctionsList = [...TitleCaseHelper.getTitleCaseOptions({
            style: style
        })
            .shortConjunctionsList
        ];

        // Convert the word to lowercase
        const wordLowerCase = word.toLowerCase();

        // Return true if the word is in the list of short conjunctions
        return shortConjunctionsList.includes(wordLowerCase);
    }

    // Check if the word is an article
    static isArticle(word, style) {
        // Get the list of articles for the language
        const articlesList = TitleCaseHelper.getTitleCaseOptions({
            style: style
        })
            .articlesList;
        // Return true if the word matches an article
        return articlesList.includes(word.toLowerCase());
    }

    // Check if the word is a short preposition
    static isShortPreposition(word, style) {
        // Get the list of short prepositions from the Title Case Helper.
        const {
            shortPrepositionsList
        } = TitleCaseHelper.getTitleCaseOptions({
            style: style
        });
        // Check if the word is in the list of short prepositions.
        return shortPrepositionsList.includes(word.toLowerCase());
    }

    // This function is only ever called once per word per style, since the result is cached.
    // The cache key is a combination of the style and the lowercase word.
    static isNeverCapitalized(word, style) {
        // Check if the word is in the cache. If it is, return it.
        const cacheKey = `${style}_${word.toLowerCase()}`;
        if (TitleCaseHelper.isNeverCapitalizedCache.has(cacheKey)) {
            return TitleCaseHelper.isNeverCapitalizedCache.get(cacheKey);
        }

        // If the word is not in the cache, then check if it is in the word list for the given style.
        const {
            neverCapitalizedList
        } = TitleCaseHelper.getTitleCaseOptions({
            style
        });

        const result = neverCapitalizedList.includes(word.toLowerCase());
        // Store the result in the cache so it can be used again
        TitleCaseHelper.isNeverCapitalizedCache.set(cacheKey, result);

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
        return TitleCaseHelper.isShortConjunction(word, style) ||
            TitleCaseHelper.isArticle(word, style) ||
            TitleCaseHelper.isShortPreposition(word, style) ||
            TitleCaseHelper.isNeverCapitalized(word, style);
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
        // Only check for uppercase letters after the first letter
        // and only check for lowercase letters before the last letter
        return /[A-Z]/.test(word.slice(1)) && /[a-z]/.test(word.slice(0, -1));
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
        return word.indexOf('-') !== -1 || word.indexOf('–') !== -1 || word.indexOf('—') !== -1;
    }

    // Check if a word is a Roman numeral
    static hasRomanNumeral(word) {
        // Check if the input is a string
        if (typeof word !== 'string' || word === '') {
            // Throw an error if the input is not a string
            throw new TypeError('Invalid input: word must be a non-empty string.');
        }

        // Define a regular expression that matches a roman numeral
        const romanNumeralRegex = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;
        // Check if the input word matches the regular expression
        return romanNumeralRegex.test(word);
    }

    // Check if a word is a hyphenated Roman numeral
    static hasHyphenRomanNumeral(word) {
        if (typeof word !== "string" || word === "") {
            throw new TypeError("Invalid input: word must be a non-empty string.");
        }

        const parts = word.split("-");
        for (let i = 0; i < parts.length; i++) {
            if (!TitleCaseHelper.hasRomanNumeral(parts[i])) {
                return false;
            }
        }
        return true;
    }

    // Check if a word has `nl2br` in it
    static hasHtmlBreak(word) {
        if (word === "nl2br") {
            return true;
        }

        return false;
    }

    // Check if a word starts with a symbol
    static startsWithSymbol(word) {
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

    // Check if a word ends with a symbol
    static endsWithSymbol(word, symbols = [".", ",", ";", ":", "?", "!"]) {
        // Check if the word is a string and the symbols is an array
        if (typeof word !== "string" || !Array.isArray(symbols))
            throw new Error("Invalid arguments");
        // Check if the word ends with a symbol or two symbols
        return symbols.some(symbol => word.endsWith(symbol)) || symbols.includes(word.slice(-2));
    }

    // This function accepts two arguments: a word and an array of ignored words.
    static isWordIgnored(word, ignoredWords = ignoredWordsList) {
        // If the ignoredWords argument is not an array, throw an error.
        if (!Array.isArray(ignoredWords)) {
            throw new TypeError("Invalid input: ignoredWords must be an array.");
        }

        // If the word argument is not a non-empty string, throw an error.
        if (typeof word !== "string" || word.trim() === "") {
            throw new TypeError("Invalid input: word must be a non-empty string.");
        }

        // Convert the word to lowercase and trim any whitespace.
        const lowercasedWord = word.toLowerCase()
            .trim();

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

    // This function is used to replace a word with a term in the replaceTerms object
    static replaceTerm(word, replaceTermsObj) {
        // Validate input
        if (typeof word !== "string" || word === "") {
            throw new TypeError("Invalid input: word must be a non-empty string.");
        }

        if (!replaceTermsObj || typeof replaceTermsObj !== "object") {
            throw new TypeError("Invalid input: replaceTermsObj must be a non-null object.");
        }

        // Check if the word is in the object with lowercase key
        const lowercasedWord = word.toLowerCase();
        if (replaceTermsObj.hasOwnProperty(lowercasedWord)) {
            return replaceTermsObj[lowercasedWord];
        }

        // Check if the word is in the object with original case key
        if (replaceTermsObj.hasOwnProperty(word)) {
            return replaceTermsObj[word];
        }

        // Check if the word is in the object with uppercase key
        const uppercasedWord = word.toUpperCase();
        if (replaceTermsObj.hasOwnProperty(uppercasedWord)) {
            return replaceTermsObj[uppercasedWord];
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
        // Count the number of parts
        const numParts = parts.length;

        // For each part
        for (let i = 0; i < numParts; i++) {
            // Lowercase the part
            const lowercasedPart = parts[i].toLowerCase();
            // Search for the part in the list of correct terms
            const index = correctTerms.findIndex((t) => t.toLowerCase() === lowercasedPart);
            // If the part is found in the list of correct terms
            if (index >= 0) {
                // Replace the part with the correct term
                parts[i] = correctTerms[index];
            }
        }

        // Join the parts back together using the first delimiter as the default delimiter
        const joined = parts.join(delimiters.source.charAt(0));
        return joined;
    }

    // This function is used to check if a word is in the correct terms list
    static correctTermHyphenated(word, style) {
        // Split the word into an array of words
        const hyphenatedWords = word.split("-");

        // Define functions to process words
        const capitalizeFirst = (word) => word.charAt(0)
            .toUpperCase() + word.slice(1);
        const lowercaseRest = (word) => word.charAt(0) + word.slice(1)
            .toLowerCase();

        // Define the style-specific processing functions
        const styleFunctions = {
            ap: (word, index) => (index === 0 ? capitalizeFirst(word) : lowercaseRest(word)),
            chicago: capitalizeFirst,
            apa: (word, index, length) => {
                if (TitleCaseHelper.isShortWord(word, style) && index > 0 && index < length - 1) {
                    return word.toLowerCase();
                }
                else {
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

            // Check if the word is a Roman numeral
            const romanNumeralRegex = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;
            if (romanNumeralRegex.test(word)) {
                return word.toUpperCase();
            }

            // Preserve the original word
            let correctedWord = word;

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