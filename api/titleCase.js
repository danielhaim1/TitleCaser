import {
    COMMON_ABBREVIATIONS,
    CORRECT_TITLE_CASE,
    REPLACE_TERMS,
    IGNORED_TITLE_CASE_PHRASES,
} from "./titleCaseConstants.js";

import {
    isWordInArray,
    isWordIgnored,
    hasIntentionalUppercase,
    hasHyphen,
    startsWithHashtag,
    startsWithAtSymbol,
    hasNumbersInWord,
    isRomanNumeral,
    endsWithSymbol,
    startsWithDot,
    processHyphenatedWord,
    correctTerm,
    isShortWord,
    getTitleCaseOptions
} from "./titleCaseUtils.js";


String.prototype.toTitleCase = function(options = {}) {
    try {

        if(typeof this !== 'string') {
            throw new TypeError("Invalid input: input must be a string.");
        }

        if(typeof options !== "undefined" && typeof options !== "object") {
            throw new TypeError("Invalid options: options must be an object.");
        }

        const style = options.style || "ap";
        const {
            articles = [], shortConjunctions = [], shortPrepositions = [], neverCapitalized = [], replaceTerms = []
        } = getTitleCaseOptions(options ? options : {}, COMMON_ABBREVIATIONS, REPLACE_TERMS);

        // Create replaceTermsArray and replaceTermsObj once
        const replaceTermsArray = REPLACE_TERMS.map(term => Object.keys(term)[0].toLowerCase());
        const replaceTermsObj = Object.fromEntries(REPLACE_TERMS.map(term => [Object.keys(term)[0].toLowerCase(), Object.values(term)[0]]));

        const words = this.split(" ");

        const result = words.map((word, i) => {
            console.log(`Word: ${word}`);

            if(isWordIgnored(word)) {
                return word;
            }

            if(replaceTermsArray.includes(word.toLowerCase())) {
                const correctedTerm = replaceTermsObj[word.toLowerCase()];
                return correctedTerm;
            }

            if(isWordInArray(word, CORRECT_TITLE_CASE)) {
                console.log(`Correcting ${word} to ${correctTerm(word, CORRECT_TITLE_CASE)}`);
                const correctedWord = correctTerm(word, CORRECT_TITLE_CASE);
                return correctedWord;
            }

            if(hasIntentionalUppercase(word) ||
                hasIntentionalUppercase(word)) {
                return word;
            }

            if(isShortWord(word, style) && i !== 0) {

                if(i > 0 && endsWithSymbol(words[i - 1], [':', '?', '!', '.'])) {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                }

                return word.toLowerCase();
            }

            if(endsWithSymbol(word)) {
                console.log(`Word ends with symbol: ${word}`);
                const splitWord = word.split(/([.,\/#!$%\^&\*;:{}=\-_`~()])/g);
                const processedWords = splitWord.map((splitWord, j) => {
                    if(isWordInArray(splitWord, CORRECT_TITLE_CASE)) {
                        const correctedWord = correctTerm(splitWord, CORRECT_TITLE_CASE);
                        return correctedWord;
                    } else {
                        if(j > 0 && endsWithSymbol(splitWord)) {
                            return splitWord.charAt(0).toUpperCase() + splitWord.slice(1);
                        }

                        return splitWord.charAt(0).toUpperCase() + splitWord.slice(1);
                    }
                });

                return processedWords.join("");
            }

            if(hasHyphen(word) &&
                !isWordInArray(word, CORRECT_TITLE_CASE) &&
                !isWordIgnored(word) &&
                !isWordIgnored(word, IGNORED_TITLE_CASE_PHRASES) &&
                !isWordInArray(word, REPLACE_TERMS) &&
                !isWordInArray(word, COMMON_ABBREVIATIONS)) {
                word = processHyphenatedWord(word, style);
                return word;
            }

            if(
                startsWithHashtag(word) ||
                startsWithAtSymbol(word) ||
                startsWithDot(word)) {
                if(!isWordInArray(word, CORRECT_TITLE_CASE)) {
                    return word;
                } else {
                    return correctTerm(word);
                }
            }

            if(isRomanNumeral(word)) {
                return word.toUpperCase();
            }

            if(hasNumbersInWord(word)) {
                return word;
            }

            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });

        return result.join(" ");

    } catch (error) {
        console.log(error);
    }
};