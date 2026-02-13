import {
  shortWordsList,
  specialTermsList,
  phraseReplacementMap,
  wordReplacementsList,
  styleConfigMap,
  REGEX_PATTERNS,
} from "./TitleCaserConsts.js";

import { TitleCaserUtils } from "./TitleCaserUtils.js";

export class TitleCaser {
  constructor (options = {}) {
    this.options = options;
    this.debug = options.debug || false;
    this.wordReplacementsList = wordReplacementsList;
    this.phraseReplacementMap = phraseReplacementMap;
  }

  logWarning(message) {
    if (this.debug) {
      console.warn(`Warning: ${message}`);
    }
  }

  toTitleCase(str) {
    try {
      // ! If input is empty, throw an error.
      if (str.trim().length === 0) throw new TypeError("Invalid input: input must not be empty.");

      // ! If input is not a string, throw an error.
      if (typeof str !== "string") throw new TypeError("Invalid input: input must be a string.");

      // ! Input sanitization: limit length to prevent performance issues
      if (str.length > 100000) throw new TypeError("Invalid input: input exceeds maximum length of 100,000 characters.");

      // ! If options is not an object, throw an error.
      if (typeof this.options !== "undefined" && typeof this.options !== "object")
        throw new TypeError("Invalid options: options must be an object.");

      const {
        style = "ap",
        neverCapitalize = [],
        replaceTermList = this.wordReplacementsList,
        smartQuotes = false, // Set to false by default
      } = this.options;

      const styleConfig = styleConfigMap[style] || {};

      const ignoreList = ["nl2br", ...neverCapitalize];
      const {
        articlesList,
        shortConjunctionsList,
        shortPrepositionsList,
        neverCapitalizedList,
        replaceTerms,
        smartQuotes: mergedSmartQuotes,
      } = TitleCaserUtils.getTitleCaseOptions(this.options, shortWordsList, wordReplacementsList);

      // Preprocess the replaceTerms array to make it easier to search for.
      const replaceTermsArray = replaceTermList.map((term) => Object.keys(term)[0].toLowerCase());
      // Create an object from the replaceTerms array to make it easier to search for.
      const replaceTermObj = Object.fromEntries(
        replaceTermList.map((term) => [Object.keys(term)[0].toLowerCase(), Object.values(term)[0]]),
      );

      this.logWarning(`replaceTermsArray: ${replaceTermsArray}`);
      this.logWarning(`this.wordReplacementsList: ${this.wordReplacementsList}`);

      // Remove extra spaces and replace <br> tags with a placeholder.
      let inputString = str.trim();

      // Replace <br> and <br /> tags with a placeholder.
      inputString = inputString.replace(REGEX_PATTERNS.HTML_BREAK, " nl2br ");

      // Remove extra spaces
      inputString = inputString.replace(REGEX_PATTERNS.MULTIPLE_SPACES, ' ');

      // Check if the entire input string is uppercase and normalize it to lowercase
      // before processing if it is. This ensures consistent handling for all-caps text.
      const isEntireStringUppercase = TitleCaserUtils.isEntirelyUppercase(inputString.replace(/[^a-zA-Z]/g, ''));
      if (isEntireStringUppercase) {
        this.logWarning("Input string is entirely uppercase, normalizing to lowercase first");
        inputString = inputString.toLowerCase();
      }

      // Split the string into an array of words.
      const words = inputString.split(" ");

      const wordsInTitleCase = words.map((word, i) => {
        switch (true) {
          case TitleCaserUtils.isWordAmpersand(word):
            // ! if the word is an ampersand, return it as is.
            return word;
          case TitleCaserUtils.hasHtmlBreak(word):
            // ! If the word is a <br> tag, return it as is.
            return word;
          case TitleCaserUtils.isWordIgnored(word, ignoreList):
            // ! If the word is in the ignore list, return it as is.
            return word;
          case replaceTermsArray.includes(word.toLowerCase()):
            // ! If the word is in the replaceTerms array, return the replacement.
            return replaceTermObj[word.toLowerCase()];
          case TitleCaserUtils.isWordInArray(word, specialTermsList):
            // ! If the word is in the specialTermsList array, return the correct casing.
            return TitleCaserUtils.correctTerm(word, specialTermsList);
          case TitleCaserUtils.isElidedWord(word):
            // ! If the word is an elided word, return the correct casing.
            return TitleCaserUtils.normalizeElidedWord(word);
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
            // ! If the word has a suffix, return the correct casing.
            return TitleCaserUtils.correctSuffix(word, specialTermsList);
          case TitleCaserUtils.hasUppercaseIntentional(word):
            // ! If the word has an intentional uppercase letter, return the correct casing.
            return word;
          case TitleCaserUtils.isShortWord(word, style) && i !== 0:
            // ! If the word is a short word, return the correct casing.
            const isAtEndOfSentence = i > 0 && TitleCaserUtils.endsWithSymbol(words[i - 1], [":", "?", "!", "."]);
            if (isAtEndOfSentence) {
              return word.charAt(0).toUpperCase() + word.slice(1);
            }

            const wordCasing = TitleCaserUtils.normalizeCasingForWordByStyle(word, style);
            return wordCasing;
          case TitleCaserUtils.endsWithSymbol(word):
            this.logWarning(`Check if the word ends with a symbol: ${word}`);
            // ! If the word ends with a symbol, return the correct casing.
            const splitWord = word.split(REGEX_PATTERNS.SPLIT_AT_PUNCTUATION);
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
                // ! If it's a word, process it for correct casing
                if (TitleCaserUtils.isWordInArray(part, specialTermsList)) {
                  const correctedTerm = TitleCaserUtils.correctTerm(part, specialTermsList);
                  this.logWarning(`Word is in specialTermsList, corrected term: ${correctedTerm}`);
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
            // ! If the word starts with a symbol, return the correct casing.
            return !TitleCaserUtils.isWordInArray(word, specialTermsList)
              ? word
              : TitleCaserUtils.correctTerm(word);
          case TitleCaserUtils.hasRomanNumeral(word):
            // ! If the word has a roman numeral, return the correct casing.
            return word.toUpperCase();
          case TitleCaserUtils.hasNumbers(word):
            // ! If the word has numbers, return the correct casing.
            return word;
          default:
            // Default to returning the word with the correct casing.
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
      });

      // Join the words in the array into a string.
      inputString = wordsInTitleCase.join(" ");

      // Replace the nl2br placeholder with <br> tags.
      inputString = inputString.replace(/nl2br/gi, "<br>");

      // Convert quotation marks to smart quotes if enabled
      // Refer to: https://github.com/danielhaim1/TitleCaser/issues/4
      if (smartQuotes) {
        inputString = TitleCaserUtils.convertQuotesToCurly(inputString);
      }

      const wordsForAcronyms = inputString.split(" ");
      let firstWord = wordsForAcronyms[0];
      let secondWord = wordsForAcronyms[1] || null;
      
      for (let i = 0; i < wordsForAcronyms.length; i++) {
        const prevWord = i > 0 ? wordsForAcronyms[i - 1] : null;
        let currentWord = wordsForAcronyms[i];
        const nextWord = i < wordsForAcronyms.length - 1 ? wordsForAcronyms[i + 1] : null;

        // Capture punctuation at the end of the word
        const punctuationMatch = currentWord.match(REGEX_PATTERNS.TRAILING_PUNCTUATION);
        let punctuation = "";

        if (punctuationMatch) {
          punctuation = punctuationMatch[0];
          currentWord = currentWord.replace(REGEX_PATTERNS.TRAILING_PUNCTUATION, ""); // Remove punctuation at the end
        }

        if (TitleCaserUtils.isRegionalAcronym(currentWord)) {
          currentWord = TitleCaserUtils.normalizeRegionalAcronym(currentWord);
        }

        if (TitleCaserUtils.isRegionalAcronymNoDot(currentWord, nextWord)) {
          currentWord = TitleCaserUtils.normalizeRegionalAcronym(currentWord);
        }

        // if punctuation is not empty, add it to the end of the word
        if (punctuation !== "") {
          currentWord = currentWord + punctuation;
        }
        
        // NOTE: Deliberately NOT writing back to wordsForAcronyms[i] here.
        // This first pass does naive acronym detection that creates false positives
        // (e.g., pronoun "us" detected as country "US"). Later loops use more  
        // sophisticated context-aware logic to correctly identify regional acronyms.
      }

      inputString = wordsForAcronyms.join(" ");

      const wordsForShortWords = inputString.split(" ");
      for (let i = 1; i < wordsForShortWords.length - 1; i++) {
        const currentWord = wordsForShortWords[i];
        const prevWord = wordsForShortWords[i - 1];
        const nextWord = wordsForShortWords[i + 1];

        if (
          currentWord === currentWord.toUpperCase() ||
          TitleCaserUtils.hasUppercaseIntentional(currentWord)
        ) {
          continue;
        }

        if (TitleCaserUtils.isWordInArray(currentWord, shortWordsList)) {
          wordsForShortWords[i] =
            currentWord.length <= 3
              ? currentWord.toLowerCase()
              : currentWord;
        }
      }

      inputString = wordsForShortWords.join(" ");

      const wordsForFinalPass = inputString.split(" ");
      for (let i = 0; i < wordsForFinalPass.length; i++) {
        let currentWord = wordsForFinalPass[i];
        let nextWord = wordsForFinalPass[i + 1];
        let prevWord = wordsForFinalPass[i - 1];
        if (nextWord && TitleCaserUtils.isRegionalAcronymNoDot(currentWord, nextWord, prevWord)) {
          wordsForFinalPass[i] = currentWord.toUpperCase();
        }
      }

      let finalWord = wordsForFinalPass[wordsForFinalPass.length - 1];
      let wordBeforeFinal = wordsForFinalPass[wordsForFinalPass.length - 2];
      let twoWordsBeforeFinal = wordsForFinalPass[wordsForFinalPass.length - 3];
      
      if (TitleCaserUtils.isRegionalAcronym(firstWord)) {
        this.logWarning(`firstWord is a regional acronym: ${firstWord}`);
        wordsForFinalPass[0] = firstWord.toUpperCase();
      }

      if (TitleCaserUtils.isRegionalAcronymNoDot(firstWord, secondWord)) {
        wordsForFinalPass[0] = firstWord.toUpperCase();
      }

      if (TitleCaserUtils.isFinalWordRegionalAcronym(finalWord, wordBeforeFinal, twoWordsBeforeFinal)) {
        wordsForFinalPass[wordsForFinalPass.length - 1] = finalWord.toUpperCase();
      }

      inputString = wordsForFinalPass.join(" ");

      for (const [phrase, replacement] of Object.entries(this.phraseReplacementMap)) {
        // Create a regular expression for case-insensitive matching of the phrase
        const regex = new RegExp(phrase.replace(REGEX_PATTERNS.REGEX_ESCAPE, "\\$&"), "gi");

        // Replace the phrase in the input string with its corresponding replacement
        inputString = inputString.replace(regex, replacement);
      }
      
      // ! Handle sentence case
      if (styleConfig.caseStyle === "sentence") {
        const words = inputString.split(" ");
        let firstWordFound = false;
      
        for (let i = 0; i < words.length; i++) {
          let word = words[i];
      
          // 1) The first word: Capitalize first letter only, preserve existing brand/case in the rest
          if (!firstWordFound && /[A-Za-z]/.test(word)) {
            // If you want to skip altering brand or acronym, do one more check:
            if (!TitleCaser.shouldKeepCasing(word, specialTermsList)) {
              // "Normal" first word
              words[i] = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }
            // Otherwise, it's a brand/acronym, so leave it
            firstWordFound = true;
            continue;
          }
      
          // 2) For subsequent words, only force-lowercase if we do NOT want to preserve uppercase
          if (!TitleCaser.shouldKeepCasing(word, specialTermsList)) {
            words[i] = word.toLowerCase();
          }
          // else, we keep it exactly as is
        }
      
        inputString = words.join(" ");
      }

      return inputString;

    } catch (error) {
      // Preserve original error information
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(String(error));
      }
    }
  }

  setReplaceTerms(terms) {
    if (!Array.isArray(terms)) {
      throw new TypeError("Invalid argument: setReplaceTerms must be an array of objects.");
    }
    // ! Iterate over each term-replacement object in the array
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

    // ! If the term is not found in the array, throw an error
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
      // ! If the item is an object with a single key-value pair
      if (typeof item === "object" && !Array.isArray(item) && Object.keys(item).length === 1) {
        const key = Object.keys(item)[0];
        const value = item[key];
        if (typeof key === "string" && typeof value === "string") {
          this.phraseReplacementMap[key] = value;
        } else {
          throw new TypeError("Invalid argument: Each key-value pair must contain strings.");
        }
      }
      // ! If the item is already a key-value pair
      else if (typeof item === "object" && !Array.isArray(item)) {
        Object.entries(item).forEach(([key, value]) => {
          if (typeof key === "string" && typeof value === "string") {
            this.phraseReplacementMap[key] = value;
          } else {
            throw new TypeError("Invalid argument: Each key-value pair must contain strings.");
          }
        });
      }
      // ! Invalid format
      else {
        throw new TypeError("Invalid argument: Each item must be an object with a single key-value pair.");
      }
    });

    this.logWarning(`Log the this.phraseReplacementMap: ${this.phraseReplacementMap}`);
  }

  setStyle(style) {
    if (typeof style !== "string") {
      throw new TypeError("Invalid argument: style must be a string.");
    }

    this.options.style = style;
  }

  /**
   * Determines if a word should keep its existing casing
   * @param {string} word - The word to check
   * @param {Array<string>} specialTermsList - List of terms to preserve
   * @returns {boolean} True if word should keep its casing
   */
  static shouldKeepCasing(word, specialTermsList) {
    // If it's an acronym
    if (TitleCaserUtils.isRegionalAcronym(word)) return true;
    // If it has known "intentional uppercase" patterns
    if (TitleCaserUtils.hasUppercaseIntentional(word)) return true;
    // If it's in the brand/specialTermsList
    if (TitleCaserUtils.isWordInArray(word, specialTermsList)) return true;
  
    // Otherwise, no. It's safe to lowercase.
    return false;
  }
}
