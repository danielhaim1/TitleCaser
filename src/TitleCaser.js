import {
    commonAbbreviationList,
    correctTitleCasingList,
    correctPhraseCasingList,
    wordReplacementsList,
}
    from "./TitleCaseConsts.js";

import TitleCaseHelper from "./TitleCaseHelper.js";

export class TitleCaser {
    constructor (options = {}) {
        this.options = options;
        this.wordReplacementsList = wordReplacementsList;
    }
    toTitleCase(str) {
        try {
            // If input is empty, throw an error.
            if (str.trim().length === 0) throw new TypeError("Invalid input: input must not be empty.");

            // If input is not a string, throw an error.
            if (typeof str !== 'string') throw new TypeError("Invalid input: input must be a string.");

            // If options is not an object, throw an error.
            if (typeof this.options !== "undefined" && typeof this.options !== "object") throw new TypeError("Invalid options: options must be an object.");

            const { 
                style = "ap",
                neverCapitalize = [],
                replaceTermsList = wordReplacementsList
            } = this.options;
            const ignoreList = ["nl2br", ...neverCapitalize];
            const {
                articlesList,
                shortConjunctionsList,
                shortPrepositionsList,
                neverCapitalizedList,
                replaceTerms
          } = TitleCaseHelper.getTitleCaseOptions(this.options, commonAbbreviationList, wordReplacementsList);

          // Prerocess the replaceTerms array to make it easier to search for.
          const replaceTermsArray = replaceTermsList.map(term => Object.keys(term)[0].toLowerCase());
          // Create an object from the replaceTerms array to make it easier to search for.
          const replaceTermsObj = Object.fromEntries(replaceTermsList.map(
            term => [Object.keys(term)[0].toLowerCase(), Object.values(term)[0]]
          ));

        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
          };

            // Remove extra spaces and replace <br> tags with a placeholder.
            let inputString = str.trim();

            // Remove extra spaces and replace <br> tags with a placeholder.
            inputString = inputString.replace(/ {2,}/g, (match) => match.slice(0, 1));

            // Replace <br> tags with a placeholder.
            inputString = inputString.replace(/<br\s*\/?>/gi, "nl2br ");

            // Split the string into an array of words.
            const words = inputString.split(" ");
            
            const wordsInTitleCase = words.map((word, i) => {
                switch (true) {
                    case TitleCaseHelper.isWordAmpersand(word):
                        // if the word is an ampersand, return it as is.
                        return word;
                    case TitleCaseHelper.hasHtmlBreak(word):
                        // If the word is a <br> tag, return it as is.
                        return word;
                    case TitleCaseHelper.isWordIgnored(word, ignoreList):
                        // If the word is in the ignore list, return it as is.
                        return word;
                    case replaceTermsArray.includes(word.toLowerCase()):
                        // If the word is in the replaceTerms array, return the replacement.
                        return replaceTermsObj[word.toLowerCase()];
                    case TitleCaseHelper.isWordInArray(word, correctTitleCasingList):
                        // If the word is in the correctTitleCasingList array, return the correct casing.
                        return TitleCaseHelper.correctTerm(word, correctTitleCasingList);
                    case TitleCaseHelper.hasSuffix(word, style):
                        // If the word has a suffix, return the correct casing.
                        return TitleCaseHelper.correctSuffix(word, correctTitleCasingList);
                    case TitleCaseHelper.hasHyphen(word):
                        // If the word has a hyphen, return the correct casing.
                        return TitleCaseHelper.correctTermHyphenated(word, style);
                    case TitleCaseHelper.hasUppercaseIntentional(word):
                        // If the word has an intentional uppercase letter, return the correct casing.
                        return word;
                    case TitleCaseHelper.isShortWord(word, style) && i !== 0:
                        // If the word is a short word, return the correct casing.
                        return (i > 0 && TitleCaseHelper.endsWithSymbol(words[i - 1],
                            [':', '?', '!', '.'])) ? word.charAt(0).toUpperCase() + word.slice(1) : word.toLowerCase();
                    case TitleCaseHelper.endsWithSymbol(word):
                        // If the word ends with a symbol, return the correct casing.
                        const splitWord = word.split(/([.,\/#!$%\^&\*;:{}=\-_`~()])/g);
                        const processedWords = splitWord.map((splitWord, j) => {
                            // If the word is in the correctTitleCasingList array, return the correct casing.
                            if (TitleCaseHelper.isWordInArray(splitWord, correctTitleCasingList)) return TitleCaseHelper.correctTerm(splitWord, correctTitleCasingList);
                            // Else return the word with the correct casing.
                            else return (j > 0 && TitleCaseHelper.endsWithSymbol(splitWord)) ? splitWord.charAt(0)
                                .toUpperCase() + splitWord.slice(1) : splitWord.charAt(0)
                                    .toUpperCase() + splitWord.slice(1);
                        });
                        // Join the processed words and return them.
                        return processedWords.join("");
                    case TitleCaseHelper.startsWithSymbol(word):
                        // If the word starts with a symbol, return the correct casing.
                        return !TitleCaseHelper.isWordInArray(word, correctTitleCasingList) ? word : TitleCaseHelper.correctTerm(word);
                    case TitleCaseHelper.hasRomanNumeral(word):
                        // If the word has a roman numeral, return the correct casing.
                        return word.toUpperCase();
                    case TitleCaseHelper.hasNumbers(word):
                        // If the word has numbers, return the correct casing.
                        return word;
                    default:
                        // Default to returning the word with the correct casing.
                        return word.charAt(0)
                            .toUpperCase() + word.slice(1)
                                .toLowerCase();
                }
            });

            // Join the words in the array into a string.
            inputString = wordsInTitleCase.join(" ");
            
            for (const phrase of correctPhraseCasingList) {
                // If the phrase is in the input string, replace it with the correct casing.
                if (inputString.toLowerCase()
                    .includes(phrase.toLowerCase())) {
                    inputString = inputString.replace(new RegExp(phrase, 'gi'), phrase);
                }
            }

            // Replace the nl2br placeholder with <br> tags.
            inputString = inputString.replace(/nl2br /gi, "<br />");
            console.log(inputString);

            // Return the string.
            return inputString;
        }
        catch (error) {
            throw new Error(error);
        }
    }

    setReplaceTerms(terms) {
      if (typeof terms !== 'object') {
        throw new TypeError('Invalid argument: replace terms must be an object.');
      }

      // Add the new replace terms to the wordReplacementsList array
      Object.entries(terms).forEach(([term, replacement]) => {
        const index = wordReplacementsList.findIndex(obj => obj[term]);
        if (index !== -1) {
          // If the term already exists in the array, update the replacement value
          wordReplacementsList[index][term] = replacement;
        } else {
          // If the term doesn't exist in the array, add a new object with the term and replacement
          wordReplacementsList.push({ [term]: replacement });
        }
      });

      // Log the updated wordReplacementsList array
      // console.log(wordReplacementsList);

      // Update the replace terms option
      this.options.wordReplacementsList = wordReplacementsList;
    }

    addReplaceTerm(term, replacement) {
        if (typeof term !== 'string' || typeof replacement !== 'string') {
          throw new TypeError('Invalid argument: term and replacement must be strings.');
        }

        const index = this.wordReplacementsList.findIndex(obj => obj[term]);
        
        if (index !== -1) {
          // If the term already exists in the array, update the replacement value
          this.wordReplacementsList[index][term] = replacement;
        } else {
          // If the term doesn't exist in the array, add a new object with the term and replacement
          this.wordReplacementsList.push({ [term]: replacement });
        }

        // Update the replace terms option
        this.options.wordReplacementsList = this.wordReplacementsList;
    }

    removeReplaceTerm(term) {
        if (typeof term !== 'string') {
            throw new TypeError('Invalid argument: term must be a string.');
        }

        // Find the index of the term in the wordReplacementsList array
        const index = this.wordReplacementsList.findIndex(obj => Object.keys(obj)[0] === term);

        // If the term is not found in the array, throw an error
        if (index === -1) {
            throw new Error(`Term '${term}' not found in word replacements list.`);
        }

        // Remove the term from the array
        this.wordReplacementsList.splice(index, 1);

        // Log the updated wordReplacementsList array
        // console.log(this.wordReplacementsList);

        // Update the replace terms option
        this.options.wordReplacementsList = this.wordReplacementsList;
    }

    setStyle(style) {
        if (typeof style !== 'string') {
            throw new TypeError('Invalid argument: style must be a string.');
        }
        
        this.options.style = style;
    }
}

// If the module is being used in a Node environment, export the module.
if (typeof module === 'object' && module.exports) {
    module.exports = { TitleCaser };
}


