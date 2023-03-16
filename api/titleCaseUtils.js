import {
    COMMON_ABBREVIATIONS,
    CORRECT_TITLE_CASE,
    ARR_CORRECT_CAPITALIZED,
    ALLOWED_TITLE_CASE_STYLES,
    TITLE_CASE_DEFAULT_OPTIONS,
    IGNORED_WORDS,
    IGNORED_TITLE_CASE_PHRASES,
    REPLACE_TERMS,
    TITLE_CASE_STYLES
} from "./titleCaseConstants.js";

export function validateOption(key, value) {
    if (!Array.isArray(value)) {
        throw new TypeError(`Invalid option: ${key} must be an array`);
    }
    if (!value.every((word) => typeof word === "string")) {
        throw new TypeError(`Invalid option: ${key} must be an array of strings`);
    }
}

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
        if (key === 'REPLACE_TERMS') {
            if (!Array.isArray(options.REPLACE_TERMS)) {
                throw new TypeError(`Invalid option: ${key} must be an array`);
            } else {
                for (const term of options.REPLACE_TERMS) {
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

export function getTitleCaseOptions(options = {}, lowercaseWords = [], replaceTerms = []) {

    const {
        style = "ap",
        articles = TITLE_CASE_DEFAULT_OPTIONS[style].articles,
        shortConjunctions = TITLE_CASE_DEFAULT_OPTIONS[style].shortConjunctions,
        shortPrepositions = TITLE_CASE_DEFAULT_OPTIONS[style].shortPrepositions,
        neverCapitalized = TITLE_CASE_DEFAULT_OPTIONS[style].neverCapitalized
    } = options;

    // Convert replaceTerms object to an array
    let replaceTermsArray = [];
    if (typeof replaceTerms === "object") {
        replaceTermsArray = Object.entries(replaceTerms).map(([key, value]) => [key.toLowerCase(), value]);
    } else if (Array.isArray(replaceTerms)) {
        replaceTermsArray = [...replaceTerms]; // copy the array to avoid modifying the original
    }

    // Set default replace terms if none were passed in
    if (replaceTermsArray.length === 0 && REPLACE_TERMS.length > 0) {
        replaceTermsArray = REPLACE_TERMS;
    }

    return {
        articles: [...new Set([...articles, ...lowercaseWords.filter(word => !articles.includes(word))])],
        shortConjunctions: [...new Set([...shortConjunctions, ...lowercaseWords.filter(word => !shortConjunctions.includes(word))])],
        shortPrepositions: [...new Set([...shortPrepositions, ...lowercaseWords.filter(word => !shortPrepositions.includes(word))])],
        neverCapitalized: [...neverCapitalized],
        replaceTerms: replaceTermsArray,
    };
}

export function isShortConjunction(word, style) {
    const shortConjunctions = [...getTitleCaseOptions({
        style: style
    }).shortConjunctions];
    const wordLowerCase = word.toLowerCase();
    return shortConjunctions.includes(wordLowerCase);
}

export function isArticle(word, style) {
    const articles = getTitleCaseOptions({
        style: style
    }).articles;
    return articles.includes(word.toLowerCase());
}

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

export function isShortWord(word, style) {
    if (typeof word !== 'string') {
        throw new Error(`Parameter 'word' must be a string. Received '${typeof word}' instead.`);
    }
    if (!ALLOWED_TITLE_CASE_STYLES.includes(style)) {
        throw new Error(`Invalid option: style must be one of ${ALLOWED_TITLE_CASE_STYLES.join(", ")}`);
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

export function hasIntentionalUppercase(word) {
    for (let i = 1; i < word.length; i++) {
        if (/[A-Z]/.test(word[i])) {
            if (/[A-Za-z]/.test(word[i - 1])) {
                return true;
            }
            return true;
        }
    }
    return false;
}

export function hasHyphen(word) {
    return word.includes('-') || word.includes('–') || word.includes('—');
}

export function startsWithHashtag(word) {
    return word.startsWith('#');
}

export function startsWithAtSymbol(word) {
    return word.charAt(0) === '@';
}

export function startsWithDot(word, symbols = ["."]) {
    return word.charAt(0) === symbols[0];
}

export function endsWithSymbol(word, symbols = [".", ",", ";", ":", "?", "!", "]", ")", "}"]) {
    return symbols.some(symbol => word.endsWith(symbol)) || symbols.some(symbol => word.endsWith(` ${symbol}`));
}

export function capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function isFirst(word, wordsArray) {
    return word === wordsArray[0];
}

export function isLast(word, wordsArray) {
    return word === wordsArray[wordsArray.length - 1];
}

export function isFirstOrLast(wordsArray, word) {
    return isFirst(word, wordsArray) || isLast(word, wordsArray);
}

export function isRomanNumeral(word) {
    return /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i.test(word);
}

export function hasHyphenRomanNumeral(word) {
    const parts = word.split('-');
    for (let i = 0; i < parts.length; i++) {
        if (!/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i.test(parts[i])) {
            return false;
        }
    }
    return true;
}

export function isWordIgnored(word, list = IGNORED_WORDS) {
    try {
        if (!Array.isArray(list)) {
            throw new TypeError("Invalid input: list must be an array.");
        }

        if (typeof word !== "string" || word === "") {
            throw new TypeError("Invalid input: word must be a non-empty string.");
        }

        word = word.toLowerCase();
        const ignoredWordIndex = list.indexOf(word.toLowerCase());
        console.log(`The word ${word} is ${ignoredWordIndex > -1 ? "" : "not "}in the list of ignored words.`);

        if (ignoredWordIndex > -1) {
            return true;
        }

        return false;

    } catch (error) {
        console.error(error);
    }
}

export function isWordInArray(word, list) {
    const array = Array.isArray(list) ? list : [];
    const result = array.map(word => word.toLowerCase()).includes(word.toLowerCase());
    return result;
}

export function getCorrectTitleCasing(word) {
    console.log(`Checking for unique word: ${word}`);
    const lowerCaseWord = word.toLowerCase();
    console.log(`Checking for unique word (lowercase): ${lowerCaseWord}`);
    const uniqueTermsIndex = CORRECT_TITLE_CASE.findIndex(w => w.toLowerCase() === lowerCaseWord);

    if (uniqueTermsIndex >= 0) {
        console.log(`Found unique word: ${word}`);
        return CORRECT_TITLE_CASE[uniqueTermsIndex];
    }

    console.log(`Did not find unique word: ${word}`);
    console.log(`Returning original word: ${word}`);
    return word;
}

export function correctTerm(word, correctTerms) {
    try {
        if (typeof word !== "string" || word === "") {
            throw new TypeError("Invalid input: word must be a non-empty string.");
        }

        if (!correctTerms || !Array.isArray(correctTerms)) {
            throw new TypeError("Invalid input: correctTerms must be an array.");
        }

        const words = word.split(' ');

        const correctedWords = words.map(w => {
            const lowercasedWord = w.toLowerCase();
            const index = correctTerms.findIndex(t => t.toLowerCase() === lowercasedWord);
            if (index >= 0) {
                return correctTerms[index];
            }
            return w;
        });

        const correctedSentence = correctedWords.join(' ');
        return correctedSentence;
    } catch (error) {
        console.error(error);
    }
}

export function replaceTerm(word, replaceTermsObj) {
    try {
        if (typeof word !== "string" || word === "") {
            throw new TypeError("Invalid input: word must be a non-empty string.");
        }

        const lowercasedWord = word.toLowerCase();

        if (lowercasedWord in replaceTermsObj) {
            const correctedTerm = replaceTermsObj[lowercasedWord];
            console.log(`The word ${word} is in the list of corrected terms.`);
            console.log(`Returning corrected term: ${correctedTerm}`);
            return correctedTerm;
        } else if (word in replaceTermsObj) {
            // Check if original word is in replaceTermsObj (not lowercased)
            const correctedTerm = replaceTermsObj[word];
            console.log(`The word ${word} is in the list of corrected terms.`);
            console.log(`Returning corrected term: ${correctedTerm}`);
            return correctedTerm;
        } else if (word.toUpperCase() in replaceTermsObj) {
            // Check if capitalized version of word is in replaceTermsObj
            const correctedTerm = replaceTermsObj[word.toUpperCase()];
            console.log(`The word ${word} is in the list of corrected terms.`);
            console.log(`Returning corrected term: ${correctedTerm}`);
            return correctedTerm;
        }

        console.log(`The word ${word} is not in the list of corrected terms.`);
        console.log(`Returning original word: ${word}`);
        return word;
    } catch (error) {
        console.error(error);
    }
}

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

export function processHyphenatedWord(word, style) {
    console.log(`Processing hyphenated word: ${word}`);

    const hyphenatedWords = word.split("-");
    console.log(`Hyphenated words: ${hyphenatedWords}`);
    const processedWords = hyphenatedWords.map((hyphenatedWord, j) => {
        console.log(`Processing hyphenated word: ${hyphenatedWord}`);

        if (
            isShortConjunction(hyphenatedWord, style)
            || isArticle(hyphenatedWord, style)
            || isShortPreposition(hyphenatedWord, style)
            || isNeverCapitalized(hyphenatedWord, style)) {
            console.log(`The word ${hyphenatedWord} is a short conjunction, article, preposition, or never capitalized word.`);
            return hyphenatedWord.toLowerCase();
        } else if (isRomanNumeral(hyphenatedWord)) {
            console.log(`The word ${hyphenatedWord} is a roman numeral.`);
            console.log(`Returning the word in uppercase: ${hyphenatedWord.toUpperCase()}`);
            return hyphenatedWord.toUpperCase();
        } else if (
            j > 0 && !isRomanNumeral(hyphenatedWords[j - 1])
        ) {
            console.log(`The word ${hyphenatedWord} is not a short conjunction, article, preposition, or never capitalized word, and the previous word is not a roman numeral.`);
            console.log(`Returning the word in title case: ${hyphenatedWord.charAt(0).toUpperCase() + hyphenatedWord.slice(1).toLowerCase()}`);
            return hyphenatedWord.charAt(0).toUpperCase() + hyphenatedWord.slice(1).toLowerCase();
        } else {
            console.log(`The word ${hyphenatedWord} is not a short conjunction, article, preposition, or never capitalized word, and the previous word is a roman numeral.`);
            console.log(`Returning the word in lowercase: ${hyphenatedWord.toLowerCase()}`);
            return hyphenatedWord.charAt(0).toUpperCase() + hyphenatedWord.slice(1).toLowerCase();
        }
    });

    return processedWords.join("-");
}
