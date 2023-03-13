import {
    ARR_LOWERCASE_TERMS,
    ARR_UNIQUE_TERMS,
    ARR_CORRECT_CAPITALIZED,
    ARR_CORRECT_TERMS,
    TITLE_CASE_STYLES,
    ALLOWED_TITLE_CASE_STYLES,
    TITLE_CASE_DEFAULT_OPTIONS,
    IGNORED_TITLE_CASE_WORDS,
    IGNORED_TITLE_CASE_PHRASES
} from "./titleCaseConstants.js";

import {
    validateOption,
    validateOptions,
    isWordInArray,
    isWordIgnored,
    isShortConjunction,
    isArticle,
    isShortPreposition,
    isNeverCapitalized,
    isIncorrectTerm,
    hasIntentionalUppercase,
    hasHyphen,
    startsWithHashtag,
    startsWithAtSymbol,
    hasNumbersInWord,
    isRomanNumeral,
    isFirstOrLast,
    endsWithSymbol,
    startsWithDot,
    processHyphenatedWord,
    getUniqueCapitalizedWord,
    correctTerm,
    getTitleCaseOptions
} from "./titleCaseUtils.js";


/**
 * toTitleCase function
 * 
 * @param {string} options - The options to use.
 * @returns {string} - The string with the title case applied.
 * 
 */

String.prototype.toTitleCase = function (options = {}) {
    const style = options.style || "ap";
    const ARR_WORD_REPLACEMENT = options.ARR_WORD_REPLACEMENT || [];
    console.log(ARR_WORD_REPLACEMENT);

    try {

        if (typeof this !== 'string') {
            throw new TypeError("Invalid input: input must be a string.");
        }

        if (typeof options !== "undefined" && typeof options !== "object") {
            throw new TypeError("Invalid options: options must be an object.");
        }
        const style = options && options.style && ALLOWED_TITLE_CASE_STYLES.includes(options.style) ? options.style : "ap";
        const { articles = [], shortConjunctions = [], shortPrepositions = [], neverCapitalized = [] } = getTitleCaseOptions(options ? options : {}, ARR_LOWERCASE_TERMS);
        const words = this.split(" ");
        const result = words.map((word, i) => {

            if (word.length === 0) {
                return word;
            }

            if (isWordIgnored(word, IGNORED_TITLE_CASE_WORDS)) {
                return word;
            }

            if (isWordInArray(word, ARR_WORD_REPLACEMENT)) {
                return correctTerm(word, ARR_WORD_REPLACEMENT);
            }

            if (isIncorrectTerm(word, Object.keys(ARR_CORRECT_TERMS))) {
                const index = Object.keys(ARR_CORRECT_TERMS).indexOf(word.toLowerCase());
                if (index !== -1) {
                    return Object.entries(ARR_CORRECT_TERMS)[index][1];
                }
            }

            if (isWordInArray(word, ARR_UNIQUE_TERMS)) {
                word = getUniqueCapitalizedWord(word);
                console.log(word);
                return word;
            }

            if (hasIntentionalUppercase(word) || hasIntentionalUppercase(word)) {
                return word;
            }

            if (isShortConjunction(word, style) || isArticle(word, style) || isShortPreposition(word, style) ||
                isNeverCapitalized(word, style)) {
                if (i > 0 && endsWithSymbol(words[i - 1])) {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                }
                return word.toLowerCase();
            }

            if (endsWithSymbol(word)) {
                const splitWord = word.split(/([.,\/#!$%\^&\*;:{}=\-_`~()])/g);
                const processedWords = splitWord.map((splitWord, j) => {
                    if (isWordInArray(splitWord, ARR_UNIQUE_TERMS)) {
                        return getUniqueCapitalizedWord(splitWord);
                    } else {
                        if (j > 0 && endsWithSymbol(splitWord)) {
                            return splitWord.charAt(0).toUpperCase() + splitWord.slice(1);
                        }
                        return splitWord.charAt(0).toUpperCase() + splitWord.slice(1);
                    }
                });

                return processedWords.join("");
            }

            if (hasHyphen(word) && !isWordInArray(word, ARR_UNIQUE_TERMS) && !isWordIgnored(word, IGNORED_TITLE_CASE_WORDS) && !isWordIgnored(word, IGNORED_TITLE_CASE_PHRASES) && !isWordInArray(word, ARR_CORRECT_TERMS) && !isWordInArray(word, ARR_CORRECT_CAPITALIZED) && !isWordInArray(word, ARR_WORD_REPLACEMENT) && !isWordInArray(word, ARR_LOWERCASE_TERMS)) {
                return processHyphenatedWord(word, style);
            }

            if (startsWithHashtag(word) || startsWithAtSymbol(word) || hasNumbersInWord(word) || startsWithDot(word)) {
                if (!isWordInArray(word, ARR_UNIQUE_TERMS)) {
                    return word;
                }
            }

            if (isRomanNumeral(word)) {
                return word.toUpperCase();
            }

            if (isFirstOrLast(words, word) && !isWordIgnored(word, IGNORED_TITLE_CASE_WORDS)) {
                word = word.charAt(0).toUpperCase() + word.slice(1);
                return word;
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });

        if (result.length > 0 && !isWordIgnored(result[0], IGNORED_TITLE_CASE_WORDS) && !isWordInArray(result[0], ARR_CORRECT_TERMS) && !hasIntentionalUppercase(result[0]) && !hasIntentionalUppercase(result[0]) && !startsWithHashtag(result[0]) && !startsWithAtSymbol(result[0]) && !hasNumbersInWord(result[0]) && !isRomanNumeral(result[0])) {
            const capitalizedFirstChar = result[0].charAt(0).toUpperCase() + result[0].slice(1);
            result[0] = capitalizedFirstChar;
        }

        // if ARR_UNIQUE_TERMS
        if (isWordInArray(result[0], Object.keys(ARR_UNIQUE_TERMS))) {
            const index = Object.keys(ARR_UNIQUE_TERMS).indexOf(result[0].toLowerCase());
            if (index !== -1) {
                console.log("Found word in dictionary")
                console.log("Replacing " + result[0].toLowerCase() + " with " + Object.entries(ARR_UNIQUE_TERMS)[index][1]);
                result[0] = Object.entries(ARR_UNIQUE_TERMS)[index][1];
            }
        }

        if (isIncorrectTerm(result[0], Object.keys(ARR_CORRECT_TERMS))) {
            console.log("Incorrect term found");
            const index = Object.keys(ARR_CORRECT_TERMS).indexOf(result[0]);
            if (index !== -1) {
                console.log("Correct term found");
                return Object.entries(ARR_CORRECT_TERMS)[index][1];
            } else {
                console.log("No match found");
            }
        }

        return result.join(" ");
    } catch (error) {
        throw error;
    }
};