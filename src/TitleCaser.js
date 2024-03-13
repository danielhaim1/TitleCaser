import {
  commonAbbreviationList,
  correctTitleCasingList,
  correctPhraseCasingList,
  wordReplacementsList,
} from "./TitleCaserConsts.js";

import { TitleCaserUtils } from "./TitleCaserUtils.js";

export class TitleCaser {
  constructor(options = {}) {
    this.options = options;
    this.debug = options.debug || false;
    this.wordReplacementsList = wordReplacementsList;
    this.correctPhraseCasingList = correctPhraseCasingList;
  }

  logWarning(message) {
    if (this.debug) {
      console.warn(`Warning: ${message}`);
    }
  }

  toTitleCase(str) {
    try {
      // If input is empty, throw an error.
      if (str.trim().length === 0) throw new TypeError("Invalid input: input must not be empty.");

      // If input is not a string, throw an error.
      if (typeof str !== "string") throw new TypeError("Invalid input: input must be a string.");

      // If options is not an object, throw an error.
      if (typeof this.options !== "undefined" && typeof this.options !== "object")
        throw new TypeError("Invalid options: options must be an object.");

      const {
        style = "ap",
        neverCapitalize = [],
        replaceTermList = this.wordReplacementsList,
        smartQuotes = false, // Set to false by default
      } = this.options;

      const ignoreList = ["nl2br", ...neverCapitalize];
      const {
        articlesList,
        shortConjunctionsList,
        shortPrepositionsList,
        neverCapitalizedList,
        replaceTerms,
        smartQuotes: mergedSmartQuotes, // Rename for clarity
      } = TitleCaserUtils.getTitleCaseOptions(this.options, commonAbbreviationList, wordReplacementsList);

      // Prerocess the replaceTerms array to make it easier to search for.
      const replaceTermsArray = replaceTermList.map((term) => Object.keys(term)[0].toLowerCase());
      // Create an object from the replaceTerms array to make it easier to search for.
      const replaceTermObj = Object.fromEntries(
        replaceTermList.map((term) => [Object.keys(term)[0].toLowerCase(), Object.values(term)[0]]),
      );

      this.logWarning(`replaceTermsArray: ${replaceTermsArray}`);
      this.logWarning(`this.wordReplacementsList: ${this.wordReplacementsList}`);

      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        // '\u2018': '\u2019', // Smart single quote
        // '\u201C': '\u201D', // Smart double quote
        '"': "&quot;",
        "'": "&#039;",
      };

      // Remove extra spaces and replace <br> tags with a placeholder.
      let inputString = str.trim();

      // Replace <br> and <br /> tags with a placeholder.
      inputString = inputString.replace(/<\s*br\s*\/?\s*>/gi, " nl2br ");

      // Remove extra spaces and replace <br> tags with a placeholder.
      inputString = inputString.replace(/ {2,}/g, (match) => match.slice(0, 1));

      // Split the string into an array of words.
      const words = inputString.split(" ");

      const wordsInTitleCase = words.map((word, i) => {
        switch (true) {
          case TitleCaserUtils.isWordAmpersand(word):
            // if the word is an ampersand, return it as is.
            return word;
          case TitleCaserUtils.hasHtmlBreak(word):
            // If the word is a <br> tag, return it as is.
            return word;
          case TitleCaserUtils.isWordIgnored(word, ignoreList):
            // If the word is in the ignore list, return it as is.
            return word;
          case replaceTermsArray.includes(word.toLowerCase()):
            // If the word is in the replaceTerms array, return the replacement.
            return replaceTermObj[word.toLowerCase()];
          case TitleCaserUtils.isWordInArray(word, correctTitleCasingList):
            // If the word is in the correctTitleCasingList array, return the correct casing.
            return TitleCaserUtils.correctTerm(word, correctTitleCasingList);
          case TitleCaserUtils.hasHyphen(word):
            // Separate the base word from any trailing punctuation
            const baseWord = word.replace(/[\W_]+$/, "");
            const trailingPunctuation = word.slice(baseWord.length);

            // Split the base word at the hyphen and process each part
            const parts = baseWord.split("-");
            const replacedParts = parts.map((part) => {
              const lowerCasePart = part.toLowerCase();
              if (replaceTermsArray.includes(lowerCasePart)) {
                return replaceTermObj[lowerCasePart];
              }
              return part;
            });

            // Determine if any part was replaced
            const isReplaced = !replacedParts.every((part, index) => part === parts[index]);

            // Reassemble the word with the hyphen, reattach trailing punctuation, and return
            const processedWord = isReplaced ? replacedParts.join("-") : TitleCaserUtils.correctTermHyphenated(word, style);
            return processedWord.endsWith(trailingPunctuation) ? processedWord : processedWord + trailingPunctuation;
          case TitleCaserUtils.hasSuffix(word, style):
            // If the word has a suffix, return the correct casing.
            return TitleCaserUtils.correctSuffix(word, correctTitleCasingList);
          case TitleCaserUtils.hasUppercaseIntentional(word):
            // If the word has an intentional uppercase letter, return the correct casing.
            return word;
          case TitleCaserUtils.isShortWord(word, style) && i !== 0:
            // If the word is a short word, return the correct casing.
            return i > 0 && TitleCaserUtils.endsWithSymbol(words[i - 1], [":", "?", "!", "."])
              ? word.charAt(0).toUpperCase() + word.slice(1)
              : word.toLowerCase();
          case TitleCaserUtils.endsWithSymbol(word):
            this.logWarning(`Check if the word ends with a symbol: ${word}`);
            // If the word ends with a symbol, return the correct casing.
            const splitWord = word.split(/([.,\/#!$%\^&\*;:{}=\-_`~()?])/g);
            this.logWarning(`Splitting word at symbols, result: ${splitWord}`);
            // Process each part for correct casing
            const processedWords = splitWord.map((part) => {
              this.logWarning(`Processing part: ${part}`);
              // Check if part is a symbol
              if (TitleCaserUtils.endsWithSymbol(part)) {
                this.logWarning(`Part is a symbol: ${part}`);
                return part;
              } else {
                this.logWarning(`Part is a word: ${part}`);
                // If it's a word, process it for correct casing
                if (TitleCaserUtils.isWordInArray(part, correctTitleCasingList)) {
                  const correctedTerm = TitleCaserUtils.correctTerm(part, correctTitleCasingList);
                  this.logWarning(`Word is in correctTitleCasingList, corrected term: ${correctedTerm}`);
                  return correctedTerm;
                } else if (replaceTermsArray.includes(part)) {
                  const replacement = replaceTermObj[part];
                  this.logWarning(`Word is in replaceTermsArray, replacement: ${replacement}`);
                  return replacement;
                } else {
                  const titledWord = part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
                  this.logWarning(`Applying title casing to word: ${titledWord}`);
                  return titledWord;
                }
              }
            });

            // Join the processed words and return them.
            return processedWords.join("");
          case TitleCaserUtils.startsWithSymbol(word):
            // If the word starts with a symbol, return the correct casing.
            return !TitleCaserUtils.isWordInArray(word, correctTitleCasingList)
              ? word
              : TitleCaserUtils.correctTerm(word);
          case TitleCaserUtils.hasRomanNumeral(word):
            // If the word has a roman numeral, return the correct casing.
            return word.toUpperCase();
          case TitleCaserUtils.hasNumbers(word):
            // If the word has numbers, return the correct casing.
            return word;
          default:
            // Default to returning the word with the correct casing.
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
      });

      // Join the words in the array into a string.
      inputString = wordsInTitleCase.join(" ");

      for (const [phrase, replacement] of Object.entries(this.correctPhraseCasingList)) {
        // Create a regular expression for case-insensitive matching of the phrase
        const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");

        // Replace the phrase in the input string with its corresponding replacement
        inputString = inputString.replace(regex, replacement);
      }

      // Replace the nl2br placeholder with <br> tags.
      inputString = inputString.replace(/nl2br/gi, "<br>");

      // Convert quotation marks to smart quotes if enabled
      // Refer to: https://github.com/danielhaim1/TitleCaser/issues/4
      if (smartQuotes) {
        inputString = TitleCaserUtils.convertQuotesToCurly(inputString);
      }

      const newWords = inputString.split(" ");

      for (let i = 0; i < newWords.length; i++) {
        const prevWord = i > 0 ? newWords[i - 1] : null;
        let currentWord = newWords[i];
        const nextWord = i < newWords.length - 1 ? newWords[i + 1] : null;

        // Capture punctuation at the end of the word
        const punctuationMatch = currentWord.match(/[.,!?;:]+$/);
        let punctuation = "";

        if (punctuationMatch) {
          punctuation = punctuationMatch[0];
          currentWord = currentWord.replace(/[.,!?;:]+$/, ""); // Remove punctuation at the end
        }

        let cleanCurrentWord = currentWord.replace(/[.,!?;:]/g, "");
        let cleanNextWord = nextWord ? nextWord.replace(/[.,!?;:]/g, "") : nextWord;

        if (cleanCurrentWord === "Us") {
          if (TitleCaserUtils.isAcronym(currentWord, prevWord, nextWord)) {
            if (punctuation === "") {
              newWords[i] = "US";
            } else {
              newWords[i] = "US" + punctuation;
            }
        } else {
            if (punctuation === "") {
              newWords[i] = "Us";
            } else {
              newWords[i] = "Us" + punctuation;
            }
          }
        }
      }

      inputString = newWords.join(" ");

      return inputString;
    } catch (error) {
      throw new Error(error);
    }
  }

  setReplaceTerms(terms) {
    if (!Array.isArray(terms)) {
      throw new TypeError("Invalid argument: setReplaceTerms must be an array of objects.");
    }
    // Iterate over each term-replacement object in the array
    terms.forEach((termObject) => {
      if (termObject && typeof termObject === "object") {
        const [term, replacement] = Object.entries(termObject)[0];
        const index = this.wordReplacementsList.findIndex((obj) => obj.hasOwnProperty(term));
        if (index !== -1) {
          // Update the existing term
          this.wordReplacementsList[index][term] = replacement;
        } else {
          // Add the new term
          this.wordReplacementsList.push({ [term]: replacement });
        }
      } else {
        // Handle non-object entries in the array, if required
        console.warn("Invalid entry in terms array:", termObject);
      }
    });

    this.options.wordReplacementsList = this.wordReplacementsList;

    this.logWarning(`Log the updated this.wordReplacementsList: ${this.wordReplacementsList}`);
  }

  addReplaceTerm(term, replacement) {
    if (typeof term !== "string" || typeof replacement !== "string") {
      throw new TypeError("Invalid argument: term and replacement must be strings.");
    }

    const index = this.wordReplacementsList.findIndex((obj) => Object.keys(obj)[0] === term);

    if (index !== -1) {
      this.wordReplacementsList[index][term] = replacement;
    } else {
      this.wordReplacementsList.push({ [term]: replacement });
    }

    this.options.wordReplacementsList = this.wordReplacementsList;
  }

  removeReplaceTerm(term) {
    if (typeof term !== "string") {
      throw new TypeError("Invalid argument: term must be a string.");
    }

    // Find the index of the term in the wordReplacementsList array
    const index = this.wordReplacementsList.findIndex((obj) => Object.keys(obj)[0] === term);

    // If the term is not found in the array, throw an error
    if (index === -1) {
      throw new Error(`Term '${term}' not found in word replacements list.`);
    }

    // Remove the term from the array
    this.wordReplacementsList.splice(index, 1);

    // Update the replace terms option
    this.options.wordReplacementsList = this.wordReplacementsList;

    this.logWarning(`Log the updated this.wordReplacementsList: ${this.wordReplacementsList}`);
  }

  addExactPhraseReplacements(newPhrases) {
    if (!Array.isArray(newPhrases)) {
      throw new TypeError("Invalid argument: newPhrases must be an array.");
    }

    newPhrases.forEach((item) => {
      // If the item is an object with a single key-value pair
      if (typeof item === "object" && !Array.isArray(item) && Object.keys(item).length === 1) {
        const key = Object.keys(item)[0];
        const value = item[key];
        if (typeof key === "string" && typeof value === "string") {
          this.correctPhraseCasingList[key] = value;
        } else {
          throw new TypeError("Invalid argument: Each key-value pair must contain strings.");
        }
      }
      // If the item is already a key-value pair
      else if (typeof item === "object" && !Array.isArray(item)) {
        Object.entries(item).forEach(([key, value]) => {
          if (typeof key === "string" && typeof value === "string") {
            this.correctPhraseCasingList[key] = value;
          } else {
            throw new TypeError("Invalid argument: Each key-value pair must contain strings.");
          }
        });
      }
      // Invalid format
      else {
        throw new TypeError("Invalid argument: Each item must be an object with a single key-value pair.");
      }
    });

    this.logWarning(`Log the this.correctPhraseCasingList: ${this.correctPhraseCasingList}`);
  }

  setStyle(style) {
    if (typeof style !== "string") {
      throw new TypeError("Invalid argument: style must be a string.");
    }

    this.options.style = style;
  }
}
