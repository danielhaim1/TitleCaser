import {
    ALLOWED_TITLE_CASE_STYLES,
    TITLE_CASE_DEFAULT_OPTIONS,
    replaceCasing,
    CORRECT_TITLE_CASE,
    IGNORED_WORDS,
}
from "./TitleCaseConsts.js";

export default class TitleCaseHelper {
    static titleCaseOptionsCache = new Map();
    static getTitleCaseOptions(options = {}, lowercaseWords = []) {
        const cacheKey = JSON.stringify({
            options,
            lowercaseWords
        });
        
        if (TitleCaseHelper.titleCaseOptionsCache.has(cacheKey)) {
            return TitleCaseHelper.titleCaseOptionsCache.get(cacheKey);
        }
        
        const mergedOptions = {
            ...TITLE_CASE_DEFAULT_OPTIONS[options.style || "ap"],
            ...options
        };
        const mergedArticles = mergedOptions.articles.concat(lowercaseWords)
            .filter((word, index, array) => array.indexOf(word) === index);
        const mergedShortConjunctions = mergedOptions.shortConjunctions.concat(lowercaseWords)
            .filter((word, index, array) => array.indexOf(word) === index);
        const mergedShortPrepositions = mergedOptions.shortPrepositions.concat(lowercaseWords)
            .filter((word, index, array) => array.indexOf(word) === index);
        const mergedReplaceTerms = [
            ...(mergedOptions.replaceTerms || [])
            .map(([key, value]) => [key.toLowerCase(), value]),
            ...replaceCasing,
        ];
        
        const result = {
            articles: mergedArticles,
            shortConjunctions: mergedShortConjunctions,
            shortPrepositions: mergedShortPrepositions,
            neverCapitalized: [...mergedOptions.neverCapitalized],
            replaceTerms: mergedReplaceTerms,
        };
        
        TitleCaseHelper.titleCaseOptionsCache.set(cacheKey, result);
        return result;
    }
    
    static isNeverCapitalizedCache = new Map();
    
    static isShortConjunction(word, style) {
        const shortConjunctions = [...TitleCaseHelper.getTitleCaseOptions({
                style: style
            })
            .shortConjunctions
        ];
        const wordLowerCase = word.toLowerCase();
        return shortConjunctions.includes(wordLowerCase);
    }
    
    static isArticle(word, style) {
        const articles = TitleCaseHelper.getTitleCaseOptions({
                style: style
            })
            .articles;
        return articles.includes(word.toLowerCase());
    }
    
    static isShortPreposition(word, style) {
        const {
            shortPrepositions
        } = TitleCaseHelper.getTitleCaseOptions({
            style: style
        });
        return shortPrepositions.includes(word.toLowerCase());
    }
    
    static isNeverCapitalized(word, style) {
        const cacheKey = `${style}_${word.toLowerCase()}`;
        
        if (TitleCaseHelper.isNeverCapitalizedCache.has(cacheKey)) {
            return TitleCaseHelper.isNeverCapitalizedCache.get(cacheKey);
        }
        
        const {
            neverCapitalized
        } = TitleCaseHelper.getTitleCaseOptions({
            style
        });
        
        const result = neverCapitalized.includes(word.toLowerCase());
        TitleCaseHelper.isNeverCapitalizedCache.set(cacheKey, result);
        
        return result;
    }
    
    static isShortWord(word, style) {
        if (typeof word !== "string") {
            throw new TypeError(`Invalid input: word must be a string. Received ${typeof word}.`);
        }
        
        if (!ALLOWED_TITLE_CASE_STYLES.includes(style)) {
            throw new Error(`Invalid option: style must be one of ${ALLOWED_TITLE_CASE_STYLES.join(", ")}.`);
        }
        
        return TitleCaseHelper.isShortConjunction(word, style) ||
            TitleCaseHelper.isArticle(word, style) ||
            TitleCaseHelper.isShortPreposition(word, style) ||
            TitleCaseHelper.isNeverCapitalized(word, style);
    }
    
    static hasNumbers(word) {
        return /\d/.test(word);
    }
    
    static hasUppercaseMultiple(word) {
        let count = 0;
        for (let i = 0; i < word.length && count < 2; i++) {
            if (/[A-Z]/.test(word[i])) {
                count++;
            }
        }
        return count >= 2;
    }
    
    static hasUppercaseIntentional(word) {
        return /[A-Z]/.test(word.slice(1)) && /[a-z]/.test(word.slice(0, -1));
    }
    
    static hasSuffix(word) {
        const suffix = "'s";
        return word.length > suffix.length && word.endsWith(suffix);
    }
    
    static hasApostrophe(word) {
        return word.indexOf("'") !== -1;
    }
    
    static hasHyphen(word) {
        return word.indexOf('-') !== -1 || word.indexOf('–') !== -1 || word.indexOf('—') !== -1;
    }
    
    static hasRomanNumeral(word) {
        if (typeof word !== 'string' || word === '') {
            throw new TypeError('Invalid input: word must be a non-empty string.');
        }
        
        const romanNumeralRegex = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;
        return romanNumeralRegex.test(word);
    }
    
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
    
    static hasHtmlBreak(word) {
        if (word === "nl2br") {
            return true;
        }
        
        return false;
    }
    
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
    
    static endsWithSymbol(word, symbols = [".", ",", ";", ":", "?", "!"]) {
        if (typeof word !== "string" || !Array.isArray(symbols))
            throw new Error("Invalid arguments");
        return symbols.some(symbol => word.endsWith(symbol)) || symbols.includes(word.slice(-2));
    }
    
    static isWordIgnored(word, ignoredWords = IGNORED_WORDS) {
        if (!Array.isArray(ignoredWords)) {
            throw new TypeError("Invalid input: ignoredWords must be an array.");
        }
        
        if (typeof word !== "string" || word.trim() === "") {
            throw new TypeError("Invalid input: word must be a non-empty string.");
        }
        
        const lowercasedWord = word.toLowerCase()
            .trim();
        
        return ignoredWords.includes(lowercasedWord);
    }
    
    static isWordInArray(targetWord, wordList) {
        if (!Array.isArray(wordList)) {
            return false;
        }
        
        return wordList.some((word) => word.toLowerCase() === targetWord.toLowerCase());
    }
    
    static replaceTerm(word, replaceTermsObj) {
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
    
    static correctSuffix(word, correctTerms) {
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
            } else {
                const firstLetter = wordWithoutSuffix.charAt(0);
                const capitalizedWord = firstLetter.toUpperCase() + wordWithoutSuffix.slice(1);
                return capitalizedWord + suffix;
            }
        }

        return word;
    }
    
    static correctTerm(word, correctTerms) {
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
    
    static correctTermHyphenated(word, style) {
        const hyphenatedWords = word.split("-");
        const capitalizeFirst = (word) => word.charAt(0)
            .toUpperCase() + word.slice(1);
        const lowercaseRest = (word) => word.charAt(0) + word.slice(1)
            .toLowerCase();
        
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
        
        const processWord = styleFunctions[style] || lowercaseRest;
        const processedWords = hyphenatedWords.map((word, i) => {
            let correctedWord = word;
            const lowerCaseWord = word.toLowerCase();
            const uniqueTermsIndex = CORRECT_TITLE_CASE.findIndex((w) => w.toLowerCase() === lowerCaseWord);
            if (uniqueTermsIndex >= 0) {
                correctedWord = CORRECT_TITLE_CASE[uniqueTermsIndex];
            }
            else if (lowerCaseWord.endsWith("'s")) {
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
}

// export default class TitleCaseValidator {
//     static validateOption(key, value) {
//         if (!Array.isArray(value)) {
//             throw new TypeError(`Invalid option: ${key} must be an array`);
//         }
//         if (!value.every((word) => typeof word === "string")) {
//             throw new TypeError(`Invalid option: ${key} must be an array of strings`);
//         }
//     }

//     static validateOptions(options) {
//         for (const key of Object.keys(options)) {
//             if (key === 'style') {
//                 if (typeof options.style !== 'string') {
//                     throw new TypeError(`Invalid option: ${key} must be a string`);
//                 } else if (!ALLOWED_TITLE_CASE_STYLES.includes(options.style)) {
//                     throw new TypeError(`Invalid option: ${key} must be a string`);
//                 }
//                 continue;
//             }
//             if (key === 'replaceCasing') {
//                 if (!Array.isArray(options.replaceCasing)) {
//                     throw new TypeError(`Invalid option: ${key} must be an array`);
//                 } else {
//                     for (const term of options.replaceCasing) {
//                         if (typeof term !== 'string') {
//                             throw new TypeError(`Invalid option: ${key} must contain only strings`);
//                         }
//                     }
//                 }
//                 continue;
//             }
//             if (!TITLE_CASE_DEFAULT_OPTIONS.hasOwnProperty(key)) {
//                 throw new TypeError(`Invalid option: ${key}`);
//             }
//             TitleCaseValidator.validateOption(key, options[key]);
//         }
//     }
// }