import {
  shortWordsList,
  specialTermsList,
  phraseReplacementMap,
  wordReplacementsList,
  styleConfigMap,
  REGEX_PATTERNS,
  knownTermCasingMap,
  phrasalVerbList,
  regionalAcronymList,
  wikipediaContextualPhraseCasingMap,
} from "./TitleCaserConsts.js";

import { TitleCaserUtils } from "./TitleCaserUtils.js";

export class TitleCaser {
  constructor(options = {}) {
    if (!TitleCaserUtils.validationIsPlainObject(options)) {
      throw new TypeError("Invalid config: config must be an object.");
    }

    const optionsWithDefaults = {
      style: "ap",
      smartQuotes: false,
      normalizeQuotes: false,
      normalizeWhitespace: true,
      wikipediaPreserveUserCapitalization: false,
      wikipediaPreserveAllCaps: false,
      debug: false,
      allowEmojis: true,
      allowSpecialCharacters: true,
      dictionaryProfile: "full",
      ignoreList: [],
      neverCapitalize: [],
      phraseReplacementList: {},
      wordReplacementsList: [],
      ...options,
    };

    const validatedOptions = TitleCaserUtils.validationValidateConfig(optionsWithDefaults);

    if (!Object.prototype.hasOwnProperty.call(options, "wordReplacementsList")) {
      delete validatedOptions.wordReplacementsList;
    }

    this.options = validatedOptions;
    this.debug = validatedOptions.debug || false;
    this.wordReplacementsList = JSON.parse(JSON.stringify(wordReplacementsList));
    this.phraseReplacementMap = {
      ...JSON.parse(JSON.stringify(phraseReplacementMap)),
      ...(validatedOptions.phraseReplacementList || {}),
    };
  }

  logWarning(message) {
    if (this.debug) {
      console.warn(`Warning: ${message}`);
    }
  }

  toTitleCase(str) {
    try {
      if (str === "") {
        return "";
      }

      const runtimeConfig = TitleCaserUtils.validationCreateRuntimeConfig(this.options);
      TitleCaserUtils.validationValidateInput(str, runtimeConfig);

      const {
        style = "ap",
        neverCapitalize = [],
        wordReplacementsList: configuredWordReplacementsList,
        smartQuotes = false, // Set to false by default
        wikipediaPreserveUserCapitalization = false,
        wikipediaPreserveAllCaps = false,
        normalizeQuotes = false,
        normalizeWhitespace = true,
        dictionaryProfile = "full",
      } = runtimeConfig;
      const activeWordReplacementsList =
        configuredWordReplacementsList && configuredWordReplacementsList.length > 0
          ? configuredWordReplacementsList
          : this.wordReplacementsList;

      const styleConfig = styleConfigMap[style] || {};

      const ignoreList = ["nl2br", ...neverCapitalize];
      // Preprocess the replaceTerms array to make it easier to search for.
      const replaceTermsArray = activeWordReplacementsList.map((term) => Object.keys(term)[0].toLowerCase());
      const replaceTermEntries = activeWordReplacementsList.map((term) => [
        Object.keys(term)[0].toLowerCase(),
        Object.values(term)[0],
      ]);
      const replacePhraseEntries = replaceTermEntries
        .filter(([term]) => /\s/.test(term))
        .sort(([termA], [termB]) => termB.length - termA.length);
      const replacementCasingMap = Object.fromEntries(
        replaceTermEntries
          .map(([, replacement]) => replacement)
          .filter((replacement) => replacement !== replacement.toLowerCase())
          .map((replacement) => [replacement.toLowerCase(), replacement]),
      );
      // Create an object from the replaceTerms array to make it easier to search for.
      const replaceTermObj = Object.fromEntries(replaceTermEntries);

      this.logWarning(`replaceTermsArray: ${replaceTermsArray}`);
      this.logWarning(`this.wordReplacementsList: ${this.wordReplacementsList}`);

      const applyWordReplacementPhrases = (value) => {
        let replacedValue = value;

        for (const [phrase, replacement] of replacePhraseEntries) {
          const escapedPhrase = phrase.replace(REGEX_PATTERNS.REGEX_ESCAPE, "\\$&");
          const regex = new RegExp(`(^|[^A-Za-z0-9'])(${escapedPhrase})(['\u2019]s)?(?=$|[^A-Za-z0-9'])`, "gi");

          replacedValue = replacedValue.replace(
            regex,
            (_, prefix, _phrase, possessiveSuffix = "") => `${prefix}${replacement}${possessiveSuffix}`,
          );
        }

        return replacedValue;
      };

      const getNextNonWhitespaceToken = (tokenList, currentIndex) => {
        for (let j = currentIndex + 1; j < tokenList.length; j++) {
          if (!/^\s+$/.test(tokenList[j])) {
            return tokenList[j];
          }
        }

        return "";
      };

      const getPreviousNonWhitespaceToken = (tokenList, currentIndex) => {
        for (let j = currentIndex - 1; j >= 0; j--) {
          if (!/^\s+$/.test(tokenList[j])) {
            return tokenList[j];
          }
        }

        return "";
      };

      const normalizeTokenForDictionaryLookup = (token) =>
        token
          .replace(/^[^A-Za-z]+/, "")
          .replace(/[^A-Za-z]+$/, "")
          .toLowerCase();

      const isApInfinitiveTo = (word, tokenList, currentIndex) => {
        if (style !== "ap" || word.toLowerCase() !== "to") return false;

        const previousWord = normalizeTokenForDictionaryLookup(getPreviousNonWhitespaceToken(tokenList, currentIndex));
        let previousTwoWord = "";
        let foundPreviousWord = false;
        for (let j = currentIndex - 1; j >= 0; j--) {
          if (/^\s+$/.test(tokenList[j])) continue;
          if (!foundPreviousWord) {
            foundPreviousWord = true;
            continue;
          }
          previousTwoWord = normalizeTokenForDictionaryLookup(tokenList[j]);
          break;
        }
        const nextWord = normalizeTokenForDictionaryLookup(getNextNonWhitespaceToken(tokenList, currentIndex));

        return (
          nextWord !== "" &&
          previousTwoWord !== "from" &&
          !/['\u2019]s$/i.test(previousWord) &&
          TitleCaserUtils.dictionaryIsVerb(nextWord, dictionaryProfile)
        );
      };

      const isPhrasalVerbParticle = (word, tokenList, currentIndex) => {
        if (style === "wikipedia") return false;

        const particle = normalizeTokenForDictionaryLookup(word);
        const verb = normalizeTokenForDictionaryLookup(getPreviousNonWhitespaceToken(tokenList, currentIndex));

        return phrasalVerbList.some(
          ([phrasalVerb, phrasalParticle]) => verb === phrasalVerb && particle === phrasalParticle,
        );
      };

      const toDisplayReplacement = (replacement) => {
        if (replacement !== replacement.toLowerCase()) return replacement;
        return replacement.charAt(0).toUpperCase() + replacement.slice(1).toLowerCase();
      };

      const getCanonicalTokenReplacement = (word) => {
        const punctuationMatch = word.match(REGEX_PATTERNS.TRAILING_PUNCTUATION);
        const punctuation = punctuationMatch ? punctuationMatch[0] : "";
        const wordWithoutPunctuation = punctuation ? word.slice(0, -punctuation.length) : word;
        const symbolMatch = wordWithoutPunctuation.match(/[™®©]+$/);
        const symbolSuffix = symbolMatch ? symbolMatch[0] : "";
        const wordWithoutSymbol = symbolSuffix
          ? wordWithoutPunctuation.slice(0, -symbolSuffix.length)
          : wordWithoutPunctuation;
        const possessiveMatch = wordWithoutSymbol.match(/(['\u2019]s)$/i);
        const possessiveSuffix = possessiveMatch ? possessiveMatch[0] : "";
        const baseWord = possessiveSuffix ? wordWithoutSymbol.slice(0, -possessiveSuffix.length) : wordWithoutSymbol;
        const normalizedBaseWord = baseWord.toLowerCase();
        const replacement = replaceTermObj[normalizedBaseWord] || knownTermCasingMap[normalizedBaseWord];

        return replacement
          ? `${toDisplayReplacement(replacement)}${possessiveSuffix}${symbolSuffix}${punctuation}`
          : null;
      };

      const capitalizeShortWordToken = (word) => {
        const punctuationMatch = word.match(REGEX_PATTERNS.TRAILING_PUNCTUATION);
        const punctuation = punctuationMatch ? punctuationMatch[0] : "";
        const wordWithoutPunctuation = punctuation ? word.slice(0, -punctuation.length) : word;

        return (
          wordWithoutPunctuation.charAt(0).toUpperCase() + wordWithoutPunctuation.slice(1).toLowerCase() + punctuation
        );
      };

      const isTechnologyDisciplineIt = (word, tokenList, currentIndex) => {
        if (word.toLowerCase() !== "it") return false;

        const previousWord = normalizeTokenForDictionaryLookup(getPreviousNonWhitespaceToken(tokenList, currentIndex));
        let nextWord = "";

        for (let j = currentIndex + 1; j < tokenList.length; j++) {
          if (/^\s+$/.test(tokenList[j])) continue;

          const normalizedToken = normalizeTokenForDictionaryLookup(tokenList[j]);
          if (normalizedToken === "and") {
            continue;
          }

          nextWord = normalizedToken;
          break;
        }

        return (
          ["in", "for", "of"].includes(previousWord) &&
          ["cybersecurity", "technology", "tech", "software", "systems"].includes(nextWord)
        );
      };

      const normalizeRegionalAcronymSegment = (segment) => {
        const normalizedSegment = segment.toLowerCase();
        if (regionalAcronymList.includes(normalizedSegment)) {
          return segment.toUpperCase();
        }
        return null;
      };

      const isDottedAcronymToken = (token = "") => {
        const normalizedToken = token.replace(/^[("'“‘[{]+/, "").replace(/["'”’)\]},;:!?]+$/, "");

        return /^(?:[A-Za-z]\.){2,}$/.test(normalizedToken);
      };

      const isSubtitleBoundaryToken = (token) => {
        if (!token || (style !== "ap" && isDottedAcronymToken(token))) return false;

        const boundarySymbols = style === "apa" ? [":", ";", "?", "!", "."] : [":", "?", "!", "."];

        return (
          TitleCaserUtils.endsWithSymbol(token, boundarySymbols) ||
          token.toLowerCase() === "<br>" ||
          TitleCaserUtils.hasHtmlBreak(token)
        );
      };

      const isTimeMeridiemToken = (word, tokenList, currentIndex) => {
        const punctuationMatch = word.match(REGEX_PATTERNS.TRAILING_PUNCTUATION);
        const punctuation = punctuationMatch ? punctuationMatch[0] : "";
        const baseWord = punctuation ? word.slice(0, -punctuation.length) : word;
        if (!/^(am|pm)$/i.test(baseWord)) return null;

        const previousToken = getPreviousNonWhitespaceToken(tokenList, currentIndex);
        return /^\d{1,2}:\d{2}$/.test(previousToken) ? `${baseWord.toUpperCase()}${punctuation}` : null;
      };

      const isMillisecondMeasurementToken = (word, tokenList, currentIndex) => {
        const punctuationMatch = word.match(REGEX_PATTERNS.TRAILING_PUNCTUATION);
        const punctuation = punctuationMatch ? punctuationMatch[0] : "";
        const baseWord = punctuation ? word.slice(0, -punctuation.length) : word;
        if (baseWord.toLowerCase() !== "ms") return null;

        const previousToken = getPreviousNonWhitespaceToken(tokenList, currentIndex);
        return /^\d+(?:\.\d+)?$/.test(previousToken) ? `ms${punctuation}` : null;
      };

      const normalizeHyphenatedCanonicalSegments = (word) => {
        if (!/[A-Za-z0-9]/.test(word)) return word;

        const normalizedWord = word
          .split(/([-–—])/)
          .map((part, index) => {
            if (index % 2 === 1) {
              return style === "ap" ? "-" : part;
            }

            const canonicalReplacement = getCanonicalTokenReplacement(part);
            return canonicalReplacement || part;
          })
          .join("");

        return TitleCaserUtils.correctTermHyphenated(normalizedWord, style);
      };

      const normalizeSlashSeparatedToken = (word) => {
        if (!word.includes("/") || /^[a-z]+:\/\//i.test(word)) return null;

        return word
          .split(/(\/)/)
          .map((part) => {
            if (part === "/") return part;

            const regionalAcronym = normalizeRegionalAcronymSegment(part);
            if (regionalAcronym) return regionalAcronym;

            const canonicalReplacement = getCanonicalTokenReplacement(part);
            if (canonicalReplacement) return canonicalReplacement;

            if (TitleCaserUtils.hasHyphen(part)) {
              return TitleCaserUtils.correctTermHyphenated(part, style);
            }

            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
          })
          .join("");
      };

      // Normalize HTML breaks and optionally normalize whitespace (see normalizeWhitespace option).
      let inputString = str;

      if (normalizeQuotes) {
        inputString = TitleCaserUtils.validationNormalizeQuotes(inputString);
      }

      // Replace <br> and <br /> tags with a placeholder.
      inputString = inputString.replace(REGEX_PATTERNS.HTML_BREAK, " nl2br ");

      const preservedUrls = [];
      const preserveUrlTokens = (value) =>
        value.replace(/\S+/g, (token) => {
          const leadingPunctuation = token.match(/^[([{\"'“‘«‹]+/)?.[0] || "";
          const tokenWithoutLeadingPunctuation = token.slice(leadingPunctuation.length);
          const trailingPunctuation = tokenWithoutLeadingPunctuation.match(/[)\]}\"'”’»›,.;:!?]+$/)?.[0] || "";
          const url = trailingPunctuation
            ? tokenWithoutLeadingPunctuation.slice(0, -trailingPunctuation.length)
            : tokenWithoutLeadingPunctuation;

          if (!TitleCaserUtils.isUrlLikeToken(url)) {
            return token;
          }

          const placeholder = `\uE000${preservedUrls.length}\uE001`;
          preservedUrls.push(url);
          return `${leadingPunctuation}${placeholder}${trailingPunctuation}`;
        });
      const restoreUrlTokens = (value) =>
        value.replace(/\uE000(\d+)\uE001/g, (_placeholder, index) => {
          return preservedUrls[Number(index)];
        });

      inputString = preserveUrlTokens(inputString);

      // Check if the non-URL text is entirely uppercase and normalize it to lowercase
      // before processing. URLs remain opaque and keep their original casing.
      const isEntireStringUppercase = TitleCaserUtils.isEntirelyUppercase(inputString.replace(/[^a-zA-Z]/g, ""));
      const shouldPreserveEntireUppercaseWikipediaInput =
        style === "wikipedia" && wikipediaPreserveUserCapitalization && wikipediaPreserveAllCaps;
      if (isEntireStringUppercase && !shouldPreserveEntireUppercaseWikipediaInput) {
        this.logWarning("Input string is entirely uppercase, normalizing to lowercase first");
        inputString = inputString.toLowerCase();
      }

      inputString = applyWordReplacementPhrases(inputString);

      // Tokenize preserving whitespace
      const tokens = inputString.split(/(\s+)/);
      const originalNonWhitespaceTokens = tokens.filter((token) => token && !/^\s+$/.test(token));
      const coordinatedListCandidateWordIndexes = new Set(
        TitleCaserUtils.dictionaryGetCoordinatedListProperNameCandidates({
          input: inputString,
          style,
          includeConfirmedListMembers: style === "wikipedia",
        }).map(
          ({ wordIndex }) => wordIndex,
        ),
      );

      const transformToken = (word, tokenIndex, wordPosition) => {
        if (TitleCaserUtils.isUrlLikeToken(word)) {
          return word;
        }

        const leadingOpeningPunctuation = TitleCaserUtils.getLeadingOpeningPunctuation(word);
        if (leadingOpeningPunctuation) {
          const innerWord = word.slice(leadingOpeningPunctuation.length);
          const trailingClosingPunctuation = TitleCaserUtils.getTrailingClosingPunctuation(innerWord);
          const innerWordWithoutClosingPunctuation = trailingClosingPunctuation
            ? innerWord.slice(0, -trailingClosingPunctuation.length)
            : innerWord;

          if (/^[A-Za-z]/.test(innerWordWithoutClosingPunctuation)) {
            const shouldCapitalizeBracketedWord =
              /[([{]/.test(leadingOpeningPunctuation) &&
              !(
                style === "ap" &&
                innerWordWithoutClosingPunctuation.toLowerCase() === "in" &&
                normalizeTokenForDictionaryLookup(getNextNonWhitespaceToken(tokens, tokenIndex)) === "the"
              );
            const quotedWordPosition =
              (/["'“‘«‹„‚]/.test(leadingOpeningPunctuation) || shouldCapitalizeBracketedWord) &&
              !trailingClosingPunctuation
                ? 0
                : wordPosition;

            return (
              leadingOpeningPunctuation +
              transformToken(innerWordWithoutClosingPunctuation, tokenIndex, quotedWordPosition) +
              trailingClosingPunctuation
            );
          }
        }

        const trailingClosingPunctuation = TitleCaserUtils.getTrailingClosingPunctuation(word);
        if (trailingClosingPunctuation) {
          const innerWord = word.slice(0, -trailingClosingPunctuation.length);
          if (/^[A-Za-z]/.test(innerWord)) {
            return transformToken(innerWord, tokenIndex, wordPosition) + trailingClosingPunctuation;
          }
        }

        if (isApInfinitiveTo(word, tokens, tokenIndex)) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }

        if (isPhrasalVerbParticle(word, tokens, tokenIndex)) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }

        if (isTechnologyDisciplineIt(word, tokens, tokenIndex)) {
          return "IT";
        }

        const timeMeridiem = isTimeMeridiemToken(word, tokens, tokenIndex);
        if (timeMeridiem) {
          return timeMeridiem;
        }

        const millisecondMeasurement = isMillisecondMeasurementToken(word, tokens, tokenIndex);
        if (millisecondMeasurement) {
          return millisecondMeasurement;
        }

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
            const replacement = replaceTermObj[word.toLowerCase()];
            return replacement.toLowerCase() === word.toLowerCase()
              ? replacement
              : transformToken(replacement, tokenIndex, wordPosition);
          case getCanonicalTokenReplacement(word) !== null:
            return getCanonicalTokenReplacement(word);
          case TitleCaserUtils.isWordInArray(word, specialTermsList):
            // ! If the word is in the specialTermsList array, return the correct casing.
            return TitleCaserUtils.correctTerm(word, specialTermsList);
          case TitleCaserUtils.isElidedWord(word):
            // ! If the word is an elided word, return the correct casing.
            return TitleCaserUtils.normalizeElidedWord(word);
          case normalizeSlashSeparatedToken(word) !== null:
            return normalizeSlashSeparatedToken(word);
          case TitleCaserUtils.hasHyphen(word):
            return normalizeHyphenatedCanonicalSegments(word);
          case TitleCaserUtils.hasSuffix(word, style):
            // ! If the word has a suffix, return the correct casing.
            return TitleCaserUtils.correctSuffix(word, specialTermsList);
          case TitleCaserUtils.isShortWord(word, style) && wordPosition !== 0:
            // Find previous non-whitespace token
            let prevToken = null;
            for (let j = tokenIndex - 1; j >= 0; j--) {
              if (!/^\s+$/.test(tokens[j])) {
                prevToken = tokens[j];
                break;
              }
            }

            if (isSubtitleBoundaryToken(prevToken)) {
              return word.charAt(0).toUpperCase() + word.slice(1);
            }

            const wordCasing = TitleCaserUtils.normalizeCasingForWordByStyle(word, style);
            return wordCasing;
          case TitleCaserUtils.hasUppercaseIntentional(word):
            // ! If the word has an intentional uppercase letter, return the correct casing.
            return word;
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
                } else if (
                  TitleCaserUtils.dictionaryIsGivenName(part) ||
                  TitleCaserUtils.dictionaryIsFamilyName(part)
                ) {
                  return TitleCaserUtils.dictionaryCapitalizeNameToken(part);
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
            return !TitleCaserUtils.isWordInArray(word, specialTermsList) ? word : TitleCaserUtils.correctTerm(word);
          case TitleCaserUtils.hasRomanNumeral(word):
            // ! If the word has a roman numeral, return the correct casing.
            return word.toUpperCase();
          case TitleCaserUtils.hasNumbers(word):
            // ! If the word has numbers, return the correct casing.
            return word;
          default:
            // Default to returning the word with the correct casing.
            if (TitleCaserUtils.dictionaryIsGivenName(word) || TitleCaserUtils.dictionaryIsFamilyName(word)) {
              return TitleCaserUtils.dictionaryCapitalizeNameToken(word);
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
      };

      let wordPosition = -1;
      const wordsInTitleCase = tokens.map((token, i) => {
        if (!token || /^\s+$/.test(token)) return token;
        wordPosition += 1;
        return transformToken(token, i, wordPosition);
      });

      // Join the words in the array into a string.
      inputString = wordsInTitleCase.join("");

      // Replace the nl2br placeholder with <br> tags.
      inputString = inputString.replace(/nl2br/gi, "<br>");

      // Convert quotation marks to smart quotes if enabled
      // Refer to: https://github.com/danielhaim1/TitleCaser/issues/4
      if (smartQuotes) {
        inputString = TitleCaserUtils.convertQuotesToCurly(inputString);
      }

      const wordsForAcronyms = inputString.split(/(\s+)/);

      // Extract non-whitespace words for first/second detection

      // Extract non-whitespace words for first/second detection
      const nonWhitespaceWords = wordsForAcronyms.filter((t) => !/^\s+$/.test(t));
      let firstWord = nonWhitespaceWords[0] || null;
      let secondWord = nonWhitespaceWords[1] || null;

      for (let i = 0; i < wordsForAcronyms.length; i++) {
        if (/^\s+$/.test(wordsForAcronyms[i])) continue;

        // Find previous non-whitespace word
        let prevWord = null;
        for (let j = i - 1; j >= 0; j--) {
          if (!/^\s+$/.test(wordsForAcronyms[j])) {
            prevWord = wordsForAcronyms[j];
            break;
          }
        }

        // Find next non-whitespace word
        let nextWord = null;
        for (let j = i + 1; j < wordsForAcronyms.length; j++) {
          if (!/^\s+$/.test(wordsForAcronyms[j])) {
            nextWord = wordsForAcronyms[j];
            break;
          }
        }

        let currentWord = wordsForAcronyms[i];

        const punctuationMatch = currentWord.match(REGEX_PATTERNS.TRAILING_PUNCTUATION);
        let punctuation = "";

        if (punctuationMatch) {
          punctuation = punctuationMatch[0];
          currentWord = currentWord.replace(REGEX_PATTERNS.TRAILING_PUNCTUATION, "");
        }

        if (TitleCaserUtils.isRegionalAcronymNoDot(currentWord, nextWord, prevWord)) {
          currentWord = TitleCaserUtils.normalizeRegionalAcronym(currentWord);
        }

        if (punctuation !== "") {
          currentWord = currentWord + punctuation;
        }

        wordsForAcronyms[i] = currentWord;
      }

      inputString = wordsForAcronyms.join("");

      const wordsForShortWords = inputString.split(/(\s+)/);
      const shortWordTokenIndexes = wordsForShortWords
        .map((token, index) => (/^\s+$/.test(token) || token === "" ? null : index))
        .filter((index) => index !== null);
      const firstShortWordTokenIndex = shortWordTokenIndexes[0];
      const lastShortWordTokenIndex = shortWordTokenIndexes[shortWordTokenIndexes.length - 1];

      for (let i = 0; i < wordsForShortWords.length; i++) {
        if (i === firstShortWordTokenIndex || i === lastShortWordTokenIndex) continue;

        const currentWord = wordsForShortWords[i];
        let prevWord = wordsForShortWords[i - 1];
        const nextWord = wordsForShortWords[i + 1];

        for (let j = i - 1; j >= 0; j--) {
          if (!/^\s+$/.test(wordsForShortWords[j])) {
            prevWord = wordsForShortWords[j];
            break;
          }
        }

        if (currentWord === currentWord.toUpperCase() || TitleCaserUtils.hasUppercaseIntentional(currentWord)) {
          continue;
        }

        if (isApInfinitiveTo(currentWord, wordsForShortWords, i)) {
          wordsForShortWords[i] = currentWord.charAt(0).toUpperCase() + currentWord.slice(1);
          continue;
        }

        if (isPhrasalVerbParticle(currentWord, wordsForShortWords, i)) {
          wordsForShortWords[i] = currentWord.charAt(0).toUpperCase() + currentWord.slice(1);
          continue;
        }

        const closingQuoteMatch = currentWord.match(/^(.*?)(["'”’»›]+)$/);
        if (
          closingQuoteMatch &&
          TitleCaserUtils.isShortWord(closingQuoteMatch[1], style) &&
          !TitleCaserUtils.hasUppercaseIntentional(closingQuoteMatch[1])
        ) {
          wordsForShortWords[i] = `${capitalizeShortWordToken(closingQuoteMatch[1])}${closingQuoteMatch[2]}`;
          continue;
        }

        if (isSubtitleBoundaryToken(prevWord) && TitleCaserUtils.isWordInArray(currentWord, shortWordsList)) {
          wordsForShortWords[i] = capitalizeShortWordToken(currentWord);
          continue;
        }

        if (TitleCaserUtils.isWordInArray(currentWord, shortWordsList)) {
          wordsForShortWords[i] = currentWord.length <= 3 ? currentWord.toLowerCase() : currentWord;
        }
      }

      inputString = wordsForShortWords.join("");

      const wordsForFinalPass = inputString.split(/(\s+)/);
      for (let i = 0; i < wordsForFinalPass.length; i++) {
        if (/^\s+$/.test(wordsForFinalPass[i])) continue;

        let currentWord = wordsForFinalPass[i];

        // Find previous non-whitespace word
        let prevWord = null;
        for (let j = i - 1; j >= 0; j--) {
          if (!/^\s+$/.test(wordsForFinalPass[j])) {
            prevWord = wordsForFinalPass[j];
            break;
          }
        }

        // Find next non-whitespace word
        let nextWord = null;
        for (let j = i + 1; j < wordsForFinalPass.length; j++) {
          if (!/^\s+$/.test(wordsForFinalPass[j])) {
            nextWord = wordsForFinalPass[j];
            break;
          }
        }

        if (nextWord && TitleCaserUtils.isRegionalAcronymNoDot(currentWord, nextWord, prevWord)) {
          wordsForFinalPass[i] = currentWord.toUpperCase();
        }
      }

      const nonWhitespaceFinal = wordsForFinalPass.filter((t) => !/^\s+$/.test(t));

      let finalWord = nonWhitespaceFinal[nonWhitespaceFinal.length - 1];
      let wordBeforeFinal = nonWhitespaceFinal[nonWhitespaceFinal.length - 2];
      let twoWordsBeforeFinal = nonWhitespaceFinal[nonWhitespaceFinal.length - 3];

      if (firstWord && TitleCaserUtils.isRegionalAcronym(firstWord)) {
        this.logWarning(`firstWord is a regional acronym: ${firstWord}`);
        wordsForFinalPass[0] = firstWord.toUpperCase();
      }

      if (firstWord && secondWord && TitleCaserUtils.isRegionalAcronymNoDot(firstWord, secondWord)) {
        wordsForFinalPass[0] = firstWord.toUpperCase();
      }

      if (
        finalWord &&
        wordBeforeFinal &&
        TitleCaserUtils.isFinalWordRegionalAcronym(finalWord, wordBeforeFinal, twoWordsBeforeFinal)
      ) {
        wordsForFinalPass[wordsForFinalPass.length - 1] = finalWord.toUpperCase();
      } else if (
        finalWord &&
        TitleCaserUtils.isShortWord(finalWord.replace(REGEX_PATTERNS.TRAILING_PUNCTUATION, ""), style) &&
        !TitleCaserUtils.hasUppercaseIntentional(finalWord)
      ) {
        const finalWordIndex = wordsForFinalPass.lastIndexOf(finalWord);
        wordsForFinalPass[finalWordIndex] = capitalizeShortWordToken(finalWord);
      }

      inputString = wordsForFinalPass.join("");

      const applyPhraseReplacements = (value) => {
        let replacedValue = value;
        const phraseReplacementEntries = Object.entries(this.phraseReplacementMap).sort(
          ([phraseA], [phraseB]) => phraseB.length - phraseA.length,
        );

        for (const [phrase, replacement] of phraseReplacementEntries) {
          if (
            typeof phrase !== "string" ||
            typeof replacement !== "string" ||
            phrase.length === 0 ||
            phrase.length > 500
          ) {
            continue;
          }

          // Create a regular expression for case-insensitive matching of the phrase
          const escapedPhrase = phrase.replace(REGEX_PATTERNS.REGEX_ESCAPE, "\\$&");
          const regex = new RegExp(`(^|[^A-Za-z0-9'])(${escapedPhrase})(?=$|[^A-Za-z0-9'])`, "gi");

          // Replace the phrase in the input string with its corresponding replacement
          replacedValue = replacedValue.replace(regex, (_, prefix) => `${prefix}${replacement}`);
        }

        return replacedValue;
      };

      const applyWikipediaContextualPhraseCasing = (value) => {
        let replacedValue = value;
        const phraseEntries = Object.entries(wikipediaContextualPhraseCasingMap).sort(
          ([phraseA], [phraseB]) => phraseB.length - phraseA.length,
        );

        for (const [phrase, replacement] of phraseEntries) {
          const escapedPhrase = phrase.replace(REGEX_PATTERNS.REGEX_ESCAPE, "\\$&");
          const regex = new RegExp(`(^|[^A-Za-z0-9'])(${escapedPhrase})(?=$|[^A-Za-z0-9'])`, "gi");

          replacedValue = replacedValue.replace(regex, (_, prefix) => `${prefix}${replacement}`);
        }

        return replacedValue;
      };

      const applyKnownTermCasing = (value) => {
        return value.replace(/[A-Za-z][A-Za-z0-9.+#-]*[.,!?;:]?/g, (token) => {
          const punctuationMatch = token.match(REGEX_PATTERNS.TRAILING_PUNCTUATION);
          const punctuation = punctuationMatch ? punctuationMatch[0] : "";
          const baseToken = punctuation ? token.slice(0, -punctuation.length) : token;
          const matchingTerm =
            replacementCasingMap[baseToken.toLowerCase()] || knownTermCasingMap[baseToken.toLowerCase()];

          return matchingTerm ? `${matchingTerm}${punctuation}` : token;
        });
      };

      inputString = applyPhraseReplacements(inputString);

      // ! Handle sentence case
      if (styleConfig.caseStyle === "sentence") {
        const words = inputString.split(/(\s+)/);
        const sentenceWordEntries = [];
        let sentenceOriginalWordIndex = 0;
        let originalWordIndex = 0;
        let previousWord = "";
        let previousWordBefore = "";

        for (let i = 0; i < words.length; i++) {
          if (!words[i] || /^\s+$/.test(words[i])) continue;

          sentenceWordEntries.push({
            tokenIndex: i,
            word: words[i],
            originalWord: originalNonWhitespaceTokens[sentenceOriginalWordIndex] || "",
          });
          sentenceOriginalWordIndex++;
        }

        const sentenceNameTokenIndexes = new Set();
        for (let i = 0; i < sentenceWordEntries.length; i++) {
          const currentEntry = sentenceWordEntries[i];
          const currentOriginalWord = currentEntry.originalWord || currentEntry.word;
          const previousEntry = sentenceWordEntries[i - 1];
          const previousOriginalWord = previousEntry ? previousEntry.originalWord || previousEntry.word : "";
          const currentIsGivenName = TitleCaserUtils.dictionaryIsGivenName(currentOriginalWord);
          const currentHasOriginalCapitalization = TitleCaserUtils.casingHasInitialCapital(currentOriginalWord);
          const currentFollowsArticle = previousOriginalWord && TitleCaserUtils.isArticle(previousOriginalWord, style);
          const currentIsKnownName = currentIsGivenName || TitleCaserUtils.dictionaryIsFamilyName(currentOriginalWord);
          const currentIsKnownWord =
            TitleCaserUtils.dictionaryIsWord(currentOriginalWord, dictionaryProfile) ||
            TitleCaserUtils.dictionaryIsWord(currentOriginalWord);
          const currentHasEntityBoundaryBefore = !previousOriginalWord || /[,;:([{"']$/.test(previousOriginalWord);
          const isPossessiveName = currentIsKnownName && /(?:'s|’s)$/i.test(currentOriginalWord);
          const entityTokens = [];
          const tokenIndexes = [];

          if (isPossessiveName) {
            sentenceNameTokenIndexes.add(currentEntry.tokenIndex);
            continue;
          }

          if (!TitleCaserUtils.dictionaryIsLikelyEntityStart(currentOriginalWord, dictionaryProfile)) {
            continue;
          }

          if (currentFollowsArticle && !currentIsGivenName) {
            continue;
          }

          if (!currentIsGivenName && !currentHasOriginalCapitalization && !currentHasEntityBoundaryBefore) {
            continue;
          }

          entityTokens.push(currentOriginalWord);
          tokenIndexes.push(currentEntry.tokenIndex);

          for (let j = i + 1; j < sentenceWordEntries.length && entityTokens.length < 4; j++) {
            const nextEntry = sentenceWordEntries[j];
            const nextWord = nextEntry.originalWord || nextEntry.word;
            const nextIsGenericEntityHead = TitleCaserUtils.dictionaryIsGenericEntityHeadWord(nextWord);
            const canUseGenericEntityHead =
              nextIsGenericEntityHead &&
              entityTokens.length === 1 &&
              currentHasOriginalCapitalization &&
              !currentIsKnownName &&
              !currentIsKnownWord;

            if (
              !canUseGenericEntityHead &&
              !TitleCaserUtils.dictionaryIsLikelyEntityContinuation(nextWord, dictionaryProfile)
            ) {
              break;
            }

            entityTokens.push(nextWord);
            tokenIndexes.push(nextEntry.tokenIndex);
          }

          if (entityTokens.length > 1) {
            tokenIndexes.forEach((tokenIndex) => sentenceNameTokenIndexes.add(tokenIndex));
          }
        }

        for (let i = 0; i < words.length; i++) {
          let word = words[i];
          if (!word || /^\s+$/.test(word)) continue;

          if (TitleCaserUtils.isUrlLikeToken(word)) {
            words[i] = word;
            previousWordBefore = previousWord;
            previousWord = word;
            continue;
          }

          const leadingOpeningPunctuation = TitleCaserUtils.getLeadingOpeningPunctuation(word);
          const isStartOfSentence =
            !previousWord || TitleCaserUtils.isSentenceBoundaryToken(previousWord, word, previousWordBefore);

          const wordWithoutOpeningPunctuation = leadingOpeningPunctuation
            ? word.slice(leadingOpeningPunctuation.length)
            : word;
          const trailingClosingPunctuation =
            TitleCaserUtils.getTrailingClosingPunctuation(wordWithoutOpeningPunctuation);
          const wordForSentenceCasing = trailingClosingPunctuation
            ? wordWithoutOpeningPunctuation.slice(0, -trailingClosingPunctuation.length)
            : wordWithoutOpeningPunctuation;
          const canonicalWordCasing =
            replacementCasingMap[wordForSentenceCasing.toLowerCase()] ||
            knownTermCasingMap[wordForSentenceCasing.toLowerCase()];
          const originalWord = originalNonWhitespaceTokens[originalWordIndex] || "";
          const originalLeadingOpeningPunctuation = originalWord
            ? TitleCaserUtils.getLeadingOpeningPunctuation(originalWord)
            : "";
          const originalWordWithoutOpeningPunctuation = originalLeadingOpeningPunctuation
            ? originalWord.slice(originalLeadingOpeningPunctuation.length)
            : originalWord;
          const originalTrailingClosingPunctuation = originalWordWithoutOpeningPunctuation
            ? TitleCaserUtils.getTrailingClosingPunctuation(originalWordWithoutOpeningPunctuation)
            : "";
          const originalWordForSentenceCasing = originalWordWithoutOpeningPunctuation
            ? originalTrailingClosingPunctuation
              ? originalWordWithoutOpeningPunctuation.slice(0, -originalTrailingClosingPunctuation.length)
              : originalWordWithoutOpeningPunctuation
            : "";
          const isAllCapsOriginalWord = TitleCaserUtils.isEntirelyUppercase(originalWordForSentenceCasing);
          const shouldPreserveWikipediaUserCapitalization =
            wikipediaPreserveUserCapitalization &&
            TitleCaser.shouldPreserveUserCasingInWikipedia(originalWordForSentenceCasing, wikipediaPreserveAllCaps);
          const originalWordPosition = originalWordIndex;
          originalWordIndex++;
          const shouldPromoteCoordinatedListCandidate =
            style === "wikipedia" && coordinatedListCandidateWordIndexes.has(originalWordPosition);
          const wikipediaCasingDecision = TitleCaserUtils.dictionaryGetWikipediaCasingDecision({
            originalWord,
            previousOriginalWord: originalNonWhitespaceTokens[originalWordPosition - 1] || "",
            previousTwoOriginalWord: originalNonWhitespaceTokens[originalWordPosition - 2] || "",
            nextOriginalWord: originalNonWhitespaceTokens[originalWordPosition + 1] || "",
            profile: dictionaryProfile,
            style,
          });

          // 1) The first word: Capitalize first letter only, preserve existing brand/case in the rest
          if (isStartOfSentence && /[A-Za-z]/.test(wordForSentenceCasing)) {
            if (shouldPreserveWikipediaUserCapitalization) {
              words[i] = leadingOpeningPunctuation + originalWordForSentenceCasing + trailingClosingPunctuation;
            } else if (
              (wikipediaPreserveUserCapitalization && !wikipediaPreserveAllCaps && isAllCapsOriginalWord) ||
              !TitleCaser.shouldKeepCasing(wordForSentenceCasing, replacementCasingMap)
            ) {
              words[i] =
                leadingOpeningPunctuation +
                (canonicalWordCasing ||
                  wordForSentenceCasing.charAt(0).toUpperCase() + wordForSentenceCasing.slice(1).toLowerCase()) +
                trailingClosingPunctuation;
            }
            previousWordBefore = previousWord;
            previousWord = word;
            continue;
          }

          // 2) For subsequent words, only force-lowercase if we do NOT want to preserve uppercase.
          const isAllCapsWord = isAllCapsOriginalWord;
          const shouldPreserveByWikipediaHeuristics =
            wikipediaPreserveUserCapitalization && !wikipediaPreserveAllCaps && isAllCapsWord
              ? false
              : wikipediaCasingDecision.shouldPreserve;

          if (shouldPreserveWikipediaUserCapitalization) {
            words[i] = leadingOpeningPunctuation + originalWordForSentenceCasing + trailingClosingPunctuation;
          } else if (wordForSentenceCasing.toLowerCase() === "i") {
            words[i] = leadingOpeningPunctuation + "I" + trailingClosingPunctuation;
          } else if (shouldPromoteCoordinatedListCandidate) {
            words[i] =
              leadingOpeningPunctuation +
              wordForSentenceCasing.charAt(0).toUpperCase() +
              wordForSentenceCasing.slice(1).toLowerCase() +
              trailingClosingPunctuation;
          } else if (wikipediaPreserveUserCapitalization && !wikipediaPreserveAllCaps && isAllCapsWord) {
            words[i] =
              leadingOpeningPunctuation +
              (canonicalWordCasing || wordForSentenceCasing.toLowerCase()) +
              trailingClosingPunctuation;
          } else if (
            !sentenceNameTokenIndexes.has(i) &&
            !shouldPreserveByWikipediaHeuristics &&
            !TitleCaser.shouldKeepCasing(wordForSentenceCasing, replacementCasingMap)
          ) {
            words[i] = leadingOpeningPunctuation + wordForSentenceCasing.toLowerCase() + trailingClosingPunctuation;
          }
          previousWordBefore = previousWord;
          previousWord = word;
          // else, we keep it exactly as is
        }

        const wordsJoined = words.join("");
        if (!wikipediaPreserveUserCapitalization) {
          inputString = TitleCaserUtils.dictionaryNormalizeKnownProperPhrases(wordsJoined, dictionaryProfile);
          inputString = applyKnownTermCasing(inputString);
        } else {
          inputString = TitleCaserUtils.dictionaryNormalizeKnownProperPhrases(wordsJoined, dictionaryProfile);
        }
        inputString = applyPhraseReplacements(inputString);
        inputString = applyWikipediaContextualPhraseCasing(inputString);
      }

      inputString = restoreUrlTokens(inputString);

      if (normalizeWhitespace) {
        inputString = inputString
          .replace(/\s*<br>\s*/gi, " <br> ")
          .replace(/\s+([:;,.!?])/g, "$1")
          .replace(/\s*-\s*/g, "-")
          .replace(/\s+/g, " ")
          .trim();

        if (style === "ap") {
          inputString = inputString.replace(/\s*\/\s*(?![A-Za-z0-9._-]+(?:\/|$))/g, "/");
        }
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

    // Added check to prevent excessive number of replacement rules which could lead to performance issues
    if (this.wordReplacementsList.length > 2000) {
      throw new Error("Too many replacement rules.");
    }

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

    if (this.wordReplacementsList.length > 2000) {
      throw new Error("Too many replacement rules.");
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
  static shouldKeepCasing(word, replacementCasingMap = {}) {
    // If it's an acronym
    if (TitleCaserUtils.isRegionalAcronym(word)) return true;
    // If it has known "intentional uppercase" patterns
    if (TitleCaserUtils.hasUppercaseIntentional(word)) return true;
    // If it came from a canonical-cased replacement
    if (replacementCasingMap[word.toLowerCase()]) return true;
    // If it has known canonical casing
    if (knownTermCasingMap[word.toLowerCase()]) return true;

    // Otherwise, no. It's safe to lowercase.
    return false;
  }

  /**
   * Determines if Wikipedia mode should preserve user-provided casing for a word
   * @param {string} word - The word to check
   * @param {boolean} preserveAllCaps - If true, preserve all-caps words; otherwise, normalize them to lowercase
   * @param {string} profile - The dictionary profile to use for user-capitalization checks
   * @returns {boolean} True if user-provided casing should be preserved
   */
  static shouldPreserveUserCasingInWikipedia(word, preserveAllCaps = false) {
    if (!word || !/[A-Za-z]/.test(word)) {
      return false;
    }

    if (TitleCaserUtils.isEntirelyUppercase(word) && !preserveAllCaps) {
      return false;
    }

    return TitleCaserUtils.casingHasInitialCapital(word) || TitleCaserUtils.hasUppercaseIntentional(word);
  }
}
