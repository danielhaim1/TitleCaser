import {
    COMMON_ABBREVIATIONS,
    CORRECT_TITLE_CASE,
    replaceCasing,
    CORRECT_PHRASE_CASE,
}
from "./TitleCaseConsts.js";

import TitleCaseHelper from "./TitleCaseHelper.js";

class TitleCaser {
    constructor(options = {}) {
        this.options = options;
    }
    toTitleCase(str) {
        try {
            if (typeof str !== 'string') throw new TypeError("Invalid input: input must be a string.");
            if (str.trim()
                .length === 0) throw new TypeError("Invalid input: input must not be empty.");
            if (typeof this.options !== "undefined" && typeof this.options !== "object") throw new TypeError("Invalid options: options must be an object.");
            const {
                style = "ap",
                    neverCapitalize = []
            } = this.options;
            const ignoreList = ["nl2br", ...neverCapitalize];
            const {
                articles,
                shortConjunctions,
                shortPrepositions,
                neverCapitalized,
                replaceTerms
            } = TitleCaseHelper.getTitleCaseOptions(this.options, COMMON_ABBREVIATIONS, replaceCasing);
            const replaceTermsArray = replaceCasing.map(term => Object.keys(term)[0].toLowerCase());
            const replaceTermsObj = Object.fromEntries(replaceCasing.map(term => [Object.keys(term)[0].toLowerCase(),
                Object.values(term)[0]
            ]));
            let inputString = str.trim();
            inputString = inputString.replace(/ {2,}/g, (match) => match.slice(0, 1));
            inputString = inputString.replace(/<br\s*[\/]?>/gi, "nl2br ");
            const words = inputString.split(" ");
            const wordsInTitleCase = words.map((word, i) => {
                switch (true) {
                    case TitleCaseHelper.hasHtmlBreak(word):
                        return word;
                    case TitleCaseHelper.isWordIgnored(word, ignoreList):
                        return word;
                    case replaceTermsArray.includes(word.toLowerCase()):
                        return replaceTermsObj[word.toLowerCase()];
                    case TitleCaseHelper.isWordInArray(word, CORRECT_TITLE_CASE):
                        return TitleCaseHelper.correctTerm(word, CORRECT_TITLE_CASE);
                    case TitleCaseHelper.hasSuffix(word, style):
                        return TitleCaseHelper.correctSuffix(word, CORRECT_TITLE_CASE);
                    case TitleCaseHelper.hasHyphen(word):
                        return TitleCaseHelper.correctTermHyphenated(word, style);
                    case TitleCaseHelper.hasUppercaseIntentional(word):
                        return word;
                    case TitleCaseHelper.isShortWord(word, style) && i !== 0:
                        return (i > 0 && TitleCaseHelper.endsWithSymbol(words[i - 1],
                                [':', '?', '!', '.'])) ? word.charAt(0)
                            .toUpperCase() + word.slice(1) : word.toLowerCase();
                    case TitleCaseHelper.endsWithSymbol(word):
                        const splitWord = word.split(/([.,\/#!$%\^&\*;:{}=\-_`~()])/g);
                        const processedWords = splitWord.map((splitWord, j) => {
                            if (TitleCaseHelper.isWordInArray(splitWord, CORRECT_TITLE_CASE)) return TitleCaseHelper.correctTerm(splitWord,
                                CORRECT_TITLE_CASE);
                            else return (j > 0 && TitleCaseHelper.endsWithSymbol(splitWord)) ? splitWord.charAt(0)
                                .toUpperCase() + splitWord.slice(1) : splitWord.charAt(0)
                                .toUpperCase() + splitWord.slice(1);
                        });
                        return processedWords.join("");
                    case TitleCaseHelper.startsWithSymbol(word):
                        return !TitleCaseHelper.isWordInArray(word, CORRECT_TITLE_CASE) ? word : TitleCaseHelper.correctTerm(word);
                    case TitleCaseHelper.hasRomanNumeral(word):
                        return word.toUpperCase();
                    case TitleCaseHelper.hasNumbers(word):
                        return word;
                    default:
                        return word.charAt(0)
                            .toUpperCase() + word.slice(1)
                            .toLowerCase();
                }
            });
            inputString = wordsInTitleCase.join(" ");
            for (const phrase of CORRECT_PHRASE_CASE) {
                if (inputString.toLowerCase()
                    .includes(phrase.toLowerCase())) {
                    inputString = inputString.replace(new RegExp(phrase, 'gi'), phrase);
                }
            }
            inputString = inputString.replace(/nl2br /gi, "<br />");
            return inputString;
        }
        catch (error) {
            throw new Error(error);
        }
    }
}

export default TitleCaser;