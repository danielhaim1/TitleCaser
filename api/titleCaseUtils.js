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

/**
 * Validates an option
 * 
 * @param {string} key
 * @param {string[]} value
 * 
 * @returns {void}
 * 
 */
export function validateOption(key, value) {
    if (!Array.isArray(value)) {
        throw new TypeError(`Invalid option: ${key} must be an array`);
    }
    if (!value.every((word) => typeof word === "string")) {
        throw new TypeError(`Invalid option: ${key} must be an array of strings`);
    }
}

/**
 * Validates the title case options
 * 
 * @param {object} options
 * @param {string} options.style
 * @param {string[]} options.articles
 * @param {string[]} options.shortConjunctions
 * @param {string[]} options.shortPrepositions
 * @param {string[]} options.neverCapitalized
 * 
 * @returns {void}
 */
export function validateOptions(options) {
    for (const key of Object.keys(options)) {
        if (key === 'style') {
            if (typeof options.style !== 'string') {
                throw new TypeError(`Invalid option: ${key} must be a string`);
            } else if (!ALLOWED_TITLE_CASE_STYLES.includes(options.style)) {
                throw new TypeError(`Invalid option: ${key}`);
            }
            continue;
        }
        if (key === 'ARR_WORD_REPLACEMENT') {
            if (!Array.isArray(options.ARR_WORD_REPLACEMENT)) {
                throw new TypeError(`Invalid option: ${key} must be an array`);
            } else {
                for (const term of options.ARR_WORD_REPLACEMENT) {
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


/**
 * Gets the title case options for a given style
 * 
 * @param {object} options
 * @param {string} options.style
 * 
 * @returns {object}
 * 
 */
export function getTitleCaseOptions(options = {}, lowercaseWords = ARR_LOWERCASE_TERMS, ARR_WORD_REPLACEMENT = ARR_CORRECT_CAPITALIZED) {
    validateOptions(options);
    const style = options.style || "ap";
    const defaultOptions = TITLE_CASE_DEFAULT_OPTIONS[style];
    const articles = options.articles || defaultOptions.articles;
    const shortConjunctions = options.shortConjunctions || defaultOptions.shortConjunctions;
    const shortPrepositions = options.shortPrepositions || defaultOptions.shortPrepositions;
    const neverCapitalized = options.neverCapitalized || defaultOptions.neverCapitalized;
    return {
        articles: [...new Set([...articles, ...lowercaseWords.filter(word => !defaultOptions.articles.includes(word))])],
        shortConjunctions: [...new Set([...shortConjunctions, ...lowercaseWords.filter(word => !defaultOptions.shortConjunctions.includes(word))])],
        shortPrepositions: [...new Set([...shortPrepositions, ...lowercaseWords.filter(word => !defaultOptions.shortPrepositions.includes(word))])],
        neverCapitalized: [...neverCapitalized],
        ARR_WORD_REPLACEMENT: [...new Set([...ARR_WORD_REPLACEMENT])],
    };
}

/**
 * Checks if a word is a short conjunction
 * 
 * @param {string} word
 * @param {string} style
 * 
 * @returns {boolean}
 * 
 */
export function isShortConjunction(word, style) {
    const shortConjunctions = [...getTitleCaseOptions({
        style: style
    }).shortConjunctions];
    const wordLowerCase = word.toLowerCase();
    return shortConjunctions.includes(wordLowerCase);
}

/**
 * Checks if a word is an article
 * 
 * @param {string} word
 * @param {string} style
 * 
 * @returns {boolean}
 *
 */
export function isArticle(word, style) {
    const articles = getTitleCaseOptions({
        style: style
    }).articles;
    return articles.includes(word.toLowerCase());
}

/**
 * Checks if a word is a short preposition
 * 
 * @param {string} word
 * @param {string} style
 * 
 * @returns {boolean}
 * 
 */
export function isShortPreposition(word, style) {
    if (typeof word !== 'string') {
        throw new Error(`Parameter 'word' must be a string. Received '${typeof word}' instead.`);
    }
    if (!ALLOWED_TITLE_CASE_STYLES.includes(style)) {
        throw new Error(`Invalid option: style must be one of ${ALLOWED_TITLE_CASE_STYLES.join(", ")}`);
    }
    const shortPrepositions = [...getTitleCaseOptions({
        style: style
    }).shortPrepositions];
    const isShort = shortPrepositions.includes(word.toLowerCase());
    return isShort;
}

/**
 * Checks if a word is never capitalized.
 * 
 * @param {string} word - The word to check.
 * @param {string} style - The style to use.
 * @returns {boolean} - Returns true if the word is never capitalized, false otherwise.
 * 
 */
export function isNeverCapitalized(word, style) {
    if (!ALLOWED_TITLE_CASE_STYLES.includes(style)) {
        return false;
    }
    const neverCapitalized = [...getTitleCaseOptions({
        style: style
    }).neverCapitalized];
    const lowerWord = word.toLowerCase();
    if (neverCapitalized.includes(lowerWord)) {
        return true;
    }
    return false;
}

/**
 * Checks if a word has a number in it.
 * 
 * @param {string} word - The word to check.
 * @returns {boolean} - Returns true if the word has a number in it, false otherwise.
 * 
 * hasNumbersInWord("VMware"); // false
 * hasNumbersInWord("asf8"); // true
 */
export function hasNumbersInWord(word) {
    return /\d/.test(word);
}

/**
 * Checks if a word has more than 2 uppercase letters in it.
 * 
 * @param {string} word - The word to check.
 * @returns {boolean} - Returns true if the word has multiple uppercase letters, false otherwise.
 * 
 * hasMultipleUppercaseLetters("VMware"); // true
 * hasMultipleUppercaseLetters("iPhone"); // true
 * hasMultipleUppercaseLetters("ALL"); // true
 * 
 */
export function hasMultipleUppercaseLetters(word) {
    let count = 0;
    for (let i = 0; i < word.length; i++) {
        if (/[A-Z]/.test(word[i])) {
            count++;
            if (count >= 2) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Checks if a word has any intentional uppercase letter in it, i.e., an uppercase letter that is not the first letter of the word.
 * 
 * @param {string} word - The word to check.
 * @returns {boolean} - Returns true if the word has an intentional uppercase letter, false otherwise.
 * 
 * hasIntentionalUppercase("VMware"); // true
 * hasIntentionalUppercase("iPhone"); // true
 * hasIntentionalUppercase("ALL"); // true
 * 
 */
export function hasIntentionalUppercase(word) {
    for (let i = 1; i < word.length; i++) {
        // Check if the current character is uppercase.
        if (/[A-Z]/.test(word[i])) {
            // Check if the previous character is also uppercase or a lowercase letter.
            if (/[A-Za-z]/.test(word[i - 1])) {
                // The uppercase letter is intentional.
                return true;
            }
            return true;
        }
    }
    // No intentional uppercase letter found.
    return false;
}

/**
 * Checks if a word contains a hyphen.
 *
 * @param {string} word - The word to check.
 * @returns {boolean} - True if the word contains a hyphen, false otherwise.
 * 
 * hasHyphen('hello-world'); // true
 * hasHyphen('foo'); // false
 * hasHyphen('foo-bar-baz'); // true
 * hasHyphen('foo–bar'); // true
 * hasHyphen('foo—bar'); // true
 * hasHyphen('foo-bar_baz'); // false
 * 
 */
export function hasHyphen(word) {
    return word.includes('-') || word.includes('–') || word.includes('—');
}

/**
 * Checks if a word starts with a hashtag.
 * 
 * @param {string} word - The word to check.
 * @returns {boolean} - True if the word starts with a hashtag, false otherwise.
 * 
 * startsWithHashtag('#hello'); // true
 * startsWithHashtag('hello'); // false
 * startsWithHashtag('hello#'); // false
 *  
 */
export function startsWithHashtag(word) {
    return word.startsWith('#');
}

/**
 * Checks if a word starts with an at symbol.
 * 
 * @param {string} word - The word to check.
 * @returns {boolean} - True if the word starts with an at symbol, false otherwise.
 * 
 * startsWithAtSymbol('@hello'); // true
 * startsWithAtSymbol('hello'); // false
 * startsWithAtSymbol('hello@'); // false
 * 
 */
export function startsWithAtSymbol(word) {
    return word.charAt(0) === '@';
}

export function startsWithDot(word, symbols = ["."]) {
    return word.charAt(0) === symbols[0];
}

/**
 * Checks if a word ends with a symbol.
 *
 * @param {string} word - The word to check.
 * @param {string[]} symbols - An array of symbols to check for.
 * 
 * @returns {boolean} - True if the word ends with a symbol, false otherwise.
 * 
 * endsWithSymbol('hello.'); // true
 * endsWithSymbol('hello?'); // true
 * endsWithSymbol('hello!'); // true
 * endsWithSymbol('hello,'); // true
 * endsWithSymbol('hello'); // false
 * endsWithSymbol('hello', ['.', ',', ';', ':', '?', '!', ']', ')', '}']); // true
 * 
 */
export function endsWithSymbol(word, symbols = [".", ",", ";", ":", "?", "!", "]", ")", "}"]) {
    return symbols.some(symbol => word.endsWith(symbol)) || symbols.some(symbol => word.endsWith(` ${symbol}`));
}

/**
 * Capitalizes the first letter of a word and returns the result.
 * 
 * @param {string} word - The word to capitalize.
 * @returns {string} - The capitalized word.
 * 
 * capitalize('hello'); // 'Hello'
 * capitalize('HeLlO'); // 'Hello'
 * 
 */
function capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Checks if a word is the first word in an array of words.
 *  
 * @param {string} word - The word to check.
 * @param {string[]} wordsArray - The array of words to check against.
 * 
 * @returns {boolean} - True if the word is the first word in the array, false otherwise.
 * 
 * isFirst('hello', ['hello', 'world']); // true
 * isFirst('world', ['hello', 'world']); // false
 * 
 */
export function isFirst(word, wordsArray) {
    return word === wordsArray[0];
}

/**
 * Checks if a word is the last word in an array of words.
 * 
 * @param {string} word - The word to check.
 * @param {string[]} wordsArray - The array of words to check against.
 *  
 * @returns {boolean} - True if the word is the last word in the array, false otherwise.
 *  
 * isLast('hello', ['hello', 'world']); // false
 * isLast('world', ['hello', 'world']); // true
 * 
 */
export function isLast(word, wordsArray) {
    return word === wordsArray[wordsArray.length - 1];
}

/**
 * Checks if a word is the first or last word in an array of words.
 * 
 * @param {string} word - The word to check.
 * @param {string[]} wordsArray - The array of words to check against.
 *  
 * @returns {boolean} - True if the word is the first or last word in the array, false otherwise.
 * 
 * isFirstOrLast('hello', ['hello', 'world']); // true
 * isFirstOrLast('world', ['hello', 'world']); // true
 * isFirstOrLast('foo', ['hello', 'world']); // false
 */
export function isFirstOrLast(wordsArray, word) {
    return isFirst(word, wordsArray) || isLast(word, wordsArray);
}

/**
 * Checks if a word is a roman numeral.
 * 
 * @param {string} word - The word to check.
 * @returns {boolean} - True if the word is a roman numeral, false otherwise.
 * 
 * isRomanNumeral('I'); // true
 * isRomanNumeral('II'); // true
 * isRomanNumeral('III'); // true
 * isRomanNumeral('IV'); // true
 */
export function isRomanNumeral(word) {
    return /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i.test(word);
}
/**
 * Checks if a word is a roman numeral
 * 
 * @param {string} word - The word to check.
 * @returns {boolean} - True if the word is a roman numeral, false otherwise.
 *  
 * isRomanNumeral('I'); // true
 * isRomanNumeral('II'); // true
 * isRomanNumeral('III'); // true
 * isRomanNumeral('IV'); // true
 */
export function hasHyphenRomanNumeral(word) {
    const parts = word.split('-');
    for (let i = 0; i < parts.length; i++) {
        if (!/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i.test(parts[i])) {
            return false;
        }
    }
    return true;
}
/**
 * Checks if a word is in the list of ignored words.
 * 
 * @param {string} word - The word to check.
 * @param {string[]} list - The list of ignored words.
 * 
 * @returns {boolean} - True if the word is in the list of ignored words, false otherwise.
 * 
 * isWordIgnored('hello', ['hello', 'world']); // true
 * isWordIgnored('world', ['hello', 'world']); // true
 * isWordIgnored('foo', ['hello', 'world']); // false
 * 
 */
export function isWordIgnored(word, list) {
    const ignoreList = Array.isArray(list) ? list : [];
    const result = ignoreList.includes(word.toLowerCase());
    return result;
}

/**
 * Checks if a word is in an array of words.
 * 
 * @param {string} word - The word to check.
 * @param {string[]} list - The array of words to check against.
 * 
 * @returns {boolean} - True if the word is in the array of words, false otherwise.
 * 
 * isWordInArray('hello', ['hello', 'world']); // true
 * isWordInArray('world', ['hello', 'world']); // true
 * isWordInArray('foo', ['hello', 'world']); // false
 */
export function isWordInArray(word, list) {
    const array = Array.isArray(list) ? list : [];
    const result = array.map(word => word.toLowerCase()).includes(word.toLowerCase());
    return result;
}

/**
 * Returns the index of a word in the unique words array.
 * 
 * @param {string} word - The word to check.
 * @param {string[]} list - The array of words to check against.
 * 
 * @returns {number} - The index of the word in the array of words, -1 if not found.
 *
 * getUniqueWordIndex('hello', ['hello', 'world']); // 0
 * getUniqueWordIndex('world', ['hello', 'world']); // 1
 * getUniqueWordIndex('foo', ['hello', 'world']); // -1
 *  
 */
export function getUniqueCapitalizedWord(word) {
    console.log(`Checking for unique word: ${word}`);
    const lowerCaseWord = word.toLowerCase();
    const uniqueTermsIndex = ARR_UNIQUE_TERMS.findIndex(w => w.toLowerCase() === lowerCaseWord);
    if (uniqueTermsIndex >= 0) {
        console.log(`Found unique word: ${word}`);
        return ARR_UNIQUE_TERMS[uniqueTermsIndex];
    } else {
        console.log(`Did not find unique word: ${word}`);
        return null;
    }
}

/**
 * Returns the corrected term for a word in the list of corrected terms.
 * 
 * @param {string} word - The word to check.
 * @param {string[]} list - The array of words to check against.
 * 
 * @returns {string} - The corrected term for the word, or the original word if not found.
 * 
 * correctTerm('hello', ['hello', 'world']); // 'Hello'
 * correctTerm('world', ['hello', 'world']); // 'World'
 * correctTerm('foo', ['hello', 'world']); // 'foo'
 * 
 */
export function correctTerm(word, arr) {
    const lowerCaseWord = word.toLowerCase();
    const correctWordIndex = arr.findIndex(w => w.toLowerCase() === lowerCaseWord);
    if (correctWordIndex >= 0) {
        const correctedTerm = Object.values(arr)[correctWordIndex];
        return correctedTerm;
    } else {
        return word;
    }
}

/**
 * Checks if a word is an incorrect term.
 * 
 * @param {string} word - The word to check.
 * @param {string[]} list - The array of words to check against.
 * 
 * @returns {boolean} - True if the word is an incorrect term, false otherwise.
 * 
 * isIncorrectTerm('hello', ['hello', 'world']); // true
 * isIncorrectTerm('world', ['hello', 'world']); // true
 * isIncorrectTerm('foo', ['hello', 'world']); // false
 */
export function isIncorrectTerm(word, arr) {
    const lowerCaseWord = word.toLowerCase();
    const correctWordIndex = arr.findIndex(w => w.toLowerCase() === lowerCaseWord);
    if (correctWordIndex >= 0) {
        const correctedTerm = Object.values(arr)[correctWordIndex];
        return correctedTerm !== lowerCaseWord; // Check if the term needs to be corrected
    } else {
        return false;
    }
}


/**
 * Checks if a phrase is in the list of ignored phrases.
 * 
 * @param {string[]} words - The words to check.
 * @param {string[]} IGNORED_TITLE_CASE_PHRASES - The list of ignored phrases.
 * 
 * @returns {boolean} - True if the phrase is in the list of ignored phrases, false otherwise.
 * 
 * isPhraseIgnored(['hello', 'world'], ['hello world']); // true
 * isPhraseIgnored(['hello', 'world'], ['hello', 'world']); // true
 * isPhraseIgnored(['hello', 'world'], ['foo', 'bar']); // false
 */
export function isPhraseIgnored(words, IGNORED_TITLE_CASE_PHRASES) {
    for (let i = 0; i < words.length; i++) {
        const currentWord = words[i];
        const ignorePhrase = IGNORED_TITLE_CASE_PHRASES.find(phrase => phrase.toLowerCase() === currentWord.toLowerCase() || phrase.toLowerCase()
            .startsWith(
                currentWord.toLowerCase() + ' '));
        if (ignorePhrase) {
            const remainingWords = words.slice(i + 1);
            const remainingIgnorePhrases = IGNORED_TITLE_CASE_PHRASES.filter(phrase => phrase.toLowerCase().startsWith(ignorePhrase.toLowerCase() +
                ' '));
            if (remainingIgnorePhrases.length > 0) {
                const result = isPhraseIgnored(remainingWords, remainingIgnorePhrases);
                return result;
            } else {
                return true;
            }
        }
    }
    return false;
}

/**
 * Checks and processes a hyphenated word
 * 
 * @param {string} word - The word to check.
 * @param {string} style - The style to use.
 *  
 * @returns {string} - The processed word.
 * 
 * processHyphenatedWord('hello-world', 'title'); // 'Hello-World'
 * processHyphenatedWord('louis-iv', 'sentence'); // 'louis-IV'
 */

export function processHyphenatedWord(word, style) {
    // Split the word into its hyphenated components
    const hyphenatedWords = word.split("-");
    // Process each component
    const processedWords = hyphenatedWords.map((hyphenatedWord, j) => {
        // If the word is a short conjunction, article, preposition, or a word never capitalized, return it in lower case
        if (isShortConjunction(hyphenatedWord, style) || isArticle(hyphenatedWord, style) || isShortPreposition(hyphenatedWord, style) ||
            isNeverCapitalized(hyphenatedWord, style)) {
            return hyphenatedWord.toLowerCase();
            // If the word is a Roman numeral, return it in upper case
        } else if (isRomanNumeral(hyphenatedWord)) {
            return hyphenatedWord.toUpperCase();
            // If the word is a component of a hyphenated word, return it in title case
        } else if (j > 0 && !isRomanNumeral(hyphenatedWords[j - 1])) {
            return hyphenatedWord.charAt(0).toUpperCase() + hyphenatedWord.slice(1).toLowerCase();
            // Otherwise, return the word in title case
        } else {
            return hyphenatedWord.charAt(0).toUpperCase() + hyphenatedWord.slice(1).toLowerCase();
        }
    });
    // Return the hyphenated word
    return processedWords.join("-");
}

