import {
  dictionaryDefaultProfile,
  dictionaryGetProperPhrases,
  dictionaryGetProfile,
  dictionaryGetPartOfSpeech as dictionaryGetPartOfSpeechSource,
  dictionaryIsAdjective as dictionaryIsAdjectiveSource,
  dictionaryIsAdverb as dictionaryIsAdverbSource,
  dictionaryIsNoun as dictionaryIsNounSource,
  dictionaryIsVerb as dictionaryIsVerbSource,
  dictionaryIsWord as dictionaryIsWordSource,
  dictionaryNormalizeWord as dictionaryNormalizeWordSource,
  dictionaryNormalizeProfile as dictionaryNormalizeProfileSource,
  dictionaryProfilesList,
} from "../../data/dictionary/index.js";
import familyNames from "../../data/names/list-family-names.json";
import givenNames from "../../data/names/list-given-names.json";
import { specialTermsList } from "../../TitleCaserConsts.js";

const dictionaryFamilyNameSet = new Set(familyNames);
const dictionaryGivenNameSet = new Set(givenNames);
const dictionaryNameContinuationBlocklist = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "but",
  "by",
  "for",
  "from",
  "in",
  "into",
  "jr",
  "nor",
  "of",
  "off",
  "on",
  "or",
  "over",
  "per",
  "so",
  "sr",
  "the",
  "to",
  "under",
  "via",
  "with",
  "yet",
  "how",
  "what",
  "when",
  "where",
  "whether",
  "which",
  "who",
  "whom",
  "whose",
  "why",
]);
const dictionaryWikipediaContextWords = new Set([
  "a",
  "an",
  "the",
  "this",
  "that",
  "these",
  "those",
  "his",
  "her",
  "its",
  "our",
  "their",
  "my",
  "your",
]);
const dictionaryWikipediaQuestionWords = new Set([
  "how",
  "what",
  "when",
  "where",
  "whether",
  "which",
  "who",
  "whom",
  "whose",
  "why",
]);
const dictionaryWikipediaNounLikeSuffixes = [
  "age",
  "ance",
  "ence",
  "er",
  "or",
  "ism",
  "ist",
  "ity",
  "ment",
  "ness",
  "ship",
  "sion",
  "tion",
  "ure",
];
const dictionaryGenericEntityHeadWords = new Set([
  "agency",
  "association",
  "board",
  "bureau",
  "center",
  "centre",
  "club",
  "college",
  "commission",
  "committee",
  "company",
  "conference",
  "council",
  "department",
  "district",
  "foundation",
  "group",
  "institute",
  "league",
  "office",
  "organization",
  "programme",
  "program",
  "project",
  "school",
  "society",
  "system",
  "team",
  "university",
]);

function dictionaryHasInitialCapital(token) {
  return typeof token === "string" && /^[A-Z]/.test(token);
}

function dictionaryHasLowercaseInitial(token) {
  return typeof token === "string" && /^[a-z]/.test(token);
}

function dictionaryIsKnownNonNounWord(word, profile) {
  return (
    dictionaryIsVerbSource(word, profile) ||
    dictionaryIsAdjectiveSource(word, profile) ||
    dictionaryIsAdverbSource(word, profile) ||
    dictionaryIsVerbSource(word, dictionaryDefaultProfile) ||
    dictionaryIsAdjectiveSource(word, dictionaryDefaultProfile) ||
    dictionaryIsAdverbSource(word, dictionaryDefaultProfile)
  );
}

function dictionaryHasNounLikeSuffix(word) {
  return dictionaryWikipediaNounLikeSuffixes.some((suffix) => (
    word.length > suffix.length + 2 &&
    word.endsWith(suffix)
  ));
}

function dictionaryCapitalizeNameToken(token) {
  const match = typeof token === "string"
    ? token.match(/^([A-Za-z][A-Za-z'.-]*)([^A-Za-z'.-]*)$/)
    : null;

  if (!match) return token;

  const normalizedToken = match[1].replace(/[A-Za-z]+/g, (part) => {
    const lowerPart = part.toLowerCase();

    if (/^mc[a-z]{2,}$/.test(lowerPart)) {
      return `Mc${lowerPart.charAt(2).toUpperCase()}${lowerPart.slice(3)}`;
    }

    return `${part.charAt(0).toUpperCase()}${part.slice(1).toLowerCase()}`;
  });

  return `${normalizedToken}${match[2]}`;
}

function dictionaryGetPreviousWordToken(tokens, startIndex) {
  for (let i = startIndex - 1; i >= 0; i--) {
    if (/^\s+$/.test(tokens[i] || "")) continue;
    return tokens[i];
  }

  return "";
}

function dictionaryHasEntityBoundaryBefore(tokens, startIndex) {
  const previousToken = dictionaryGetPreviousWordToken(tokens, startIndex);

  return !previousToken || /[,;:([{"']$/.test(previousToken);
}

export function buildDictionaryProperPhraseIndex(properPhrases) {
  const phraseIndex = Object.entries(properPhrases)
    .reduce((index, [phrase, replacement]) => {
      const words = phrase.split(" ");
      if (words.length < 2) return index;

      const firstWord = words[0];

      if (!index.has(firstWord)) index.set(firstWord, []);

      index.get(firstWord).push({ words, replacement });
      return index;
    }, new Map());

  for (const entries of phraseIndex.values()) {
    entries.sort((a, b) => b.words.length - a.words.length);
  }

  return phraseIndex;
}

export function dictionaryExtendTitleCaserUtils(TitleCaserUtils) {
  Object.defineProperties(TitleCaserUtils, {
    // Normalize a word for dictionary lookup
    dictionaryNormalizeWord: {
      value(word) {
        return dictionaryNormalizeWordSource(word);
      },
    },

    // Check if a word is a known given name
    dictionaryIsGivenName: {
      value(word) {
        return dictionaryGivenNameSet.has(dictionaryNormalizeWordSource(word));
      },
    },

    // Check if a word is a known family name
    dictionaryIsFamilyName: {
      value(word) {
        return dictionaryFamilyNameSet.has(dictionaryNormalizeWordSource(word));
      },
    },

    // Normalize casing for a likely personal-name token
    dictionaryCapitalizeNameToken: {
      value(word) {
        return dictionaryCapitalizeNameToken(word);
      },
    },

    // Check if a word is too common or structural to start or continue an entity phrase
    dictionaryIsEntityBlocklistedWord: {
      value(word) {
        const normalizedWord = dictionaryNormalizeWordSource(word);

        return (
          normalizedWord.length < 2 ||
          dictionaryNameContinuationBlocklist.has(normalizedWord)
        );
      },
    },

    // Check if a word can plausibly start a detected entity phrase
    dictionaryIsLikelyEntityStart: {
      value(word, profile = dictionaryDefaultProfile) {
        const normalizedWord = dictionaryNormalizeWordSource(word);

        if (TitleCaserUtils.dictionaryIsEntityBlocklistedWord(normalizedWord)) {
          return false;
        }

        if (TitleCaserUtils.dictionaryIsGivenName(normalizedWord)) {
          return true;
        }

        if (TitleCaserUtils.isWordInArray(normalizedWord, specialTermsList)) {
          return false;
        }

        return !dictionaryIsWordSource(normalizedWord, profile) &&
          !dictionaryIsWordSource(normalizedWord, dictionaryDefaultProfile);
      },
    },

    // Check if a word can plausibly continue a detected entity phrase
    dictionaryIsLikelyEntityContinuation: {
      value(word, profile = dictionaryDefaultProfile) {
        const normalizedWord = dictionaryNormalizeWordSource(word);

        if (TitleCaserUtils.dictionaryIsEntityBlocklistedWord(normalizedWord)) {
          return false;
        }

        return (
          TitleCaserUtils.dictionaryIsGivenName(normalizedWord) ||
          TitleCaserUtils.dictionaryIsFamilyName(normalizedWord) ||
          (
            dictionaryHasInitialCapital(word) &&
            (
              !dictionaryIsWordSource(normalizedWord, dictionaryDefaultProfile) ||
              dictionaryIsNounSource(normalizedWord, profile) ||
              dictionaryIsNounSource(normalizedWord, dictionaryDefaultProfile)
            )
          )
        );
      },
    },

    // Check if a word is a generic organization/project-style entity head
    dictionaryIsGenericEntityHeadWord: {
      value(word) {
        return dictionaryGenericEntityHeadWords.has(dictionaryNormalizeWordSource(word));
      },
    },

    // Check if a word can plausibly continue a personal name phrase
    dictionaryIsLikelyNameContinuation: {
      value(word, profile = dictionaryDefaultProfile) {
        return TitleCaserUtils.dictionaryIsLikelyEntityContinuation(word, profile);
      },
    },

    // Score whether Wikipedia sentence case should preserve the user's capitalization
    dictionaryGetWikipediaCasingDecision: {
      value(context = {}) {
        const {
          originalWord = "",
          previousOriginalWord = "",
          previousTwoOriginalWord = "",
          nextOriginalWord = "",
          profile = dictionaryDefaultProfile,
          style = "wikipedia",
        } = context;
        const normalizedWord = dictionaryNormalizeWordSource(originalWord);
        const previousWord = dictionaryNormalizeWordSource(previousOriginalWord);
        const previousTwoWord = dictionaryNormalizeWordSource(previousTwoOriginalWord);
        const nextWord = dictionaryNormalizeWordSource(nextOriginalWord);
        const hasOriginalCapitalization = dictionaryHasInitialCapital(originalWord);
        const hasOriginalLowercase = dictionaryHasLowercaseInitial(originalWord);
        const isKnownNoun =
          dictionaryIsNounSource(normalizedWord, profile) ||
          dictionaryIsNounSource(normalizedWord, dictionaryDefaultProfile);
        const isKnownNonNoun = dictionaryIsKnownNonNounWord(normalizedWord, profile);
        const isKnownWord = isKnownNoun || isKnownNonNoun;
        const previousIsContextWord = dictionaryWikipediaContextWords.has(previousWord);
        const previousTwoIsContextWord = dictionaryWikipediaContextWords.has(previousTwoWord);
        const previousIsQuestionWord = dictionaryWikipediaQuestionWords.has(previousWord);
        const previousIsModifier =
          dictionaryIsAdjectiveSource(previousWord, profile) ||
          dictionaryIsAdjectiveSource(previousWord, dictionaryDefaultProfile) ||
          dictionaryIsVerbSource(previousWord, profile) ||
          dictionaryIsVerbSource(previousWord, dictionaryDefaultProfile);
        const previousIsUnknownCapitalized =
          dictionaryHasInitialCapital(previousOriginalWord) &&
          previousWord &&
          !dictionaryIsKnownNonNounWord(previousWord, profile) &&
          !dictionaryWikipediaContextWords.has(previousWord) &&
          !dictionaryWikipediaQuestionWords.has(previousWord);
        let commonWordScore = 0;
        let entityScore = 0;

        if (!normalizedWord) {
          return {
            commonWordScore,
            entityScore,
            shouldPreserve: false,
          };
        }

        if (hasOriginalLowercase) commonWordScore += 4;
        if (isKnownNoun) commonWordScore += 4;
        if (isKnownNonNoun) commonWordScore += 3;
        if (previousIsContextWord) commonWordScore += 4;
        if (previousTwoIsContextWord) commonWordScore += 5;
        if (previousTwoIsContextWord && previousIsModifier) commonWordScore += 4;
        if (previousIsQuestionWord) commonWordScore += 3;
        if (dictionaryHasNounLikeSuffix(normalizedWord)) commonWordScore += 2;
        if (nextWord && dictionaryHasLowercaseInitial(nextOriginalWord)) commonWordScore += 1;

        if (hasOriginalCapitalization) entityScore += 2;
        if (!isKnownWord) entityScore += 2;
        if (TitleCaserUtils.dictionaryIsGivenName(normalizedWord)) entityScore += 3;
        if (TitleCaserUtils.dictionaryIsFamilyName(normalizedWord)) entityScore += 2;
        if (dictionaryGenericEntityHeadWords.has(normalizedWord) && previousIsUnknownCapitalized) {
          entityScore += 4;
        }
        if (nextWord && dictionaryHasInitialCapital(nextOriginalWord)) entityScore += 1;

        if (TitleCaserUtils.isShortWord(originalWord, style)) {
          commonWordScore += 3;
        }

        return {
          commonWordScore,
          entityScore,
          shouldPreserve: hasOriginalCapitalization && entityScore > commonWordScore,
        };
      },
    },

    // Find a likely entity phrase starting at the token index
    dictionaryGetLikelyEntityPhraseMatch: {
      value(tokens, startIndex, profile = dictionaryDefaultProfile) {
        const firstToken = tokens[startIndex];

        if (!TitleCaserUtils.dictionaryIsPhraseWordToken(firstToken)) {
          return null;
        }

        const firstIsGivenName = TitleCaserUtils.dictionaryIsGivenName(firstToken);
        const firstHasUserCapitalization = dictionaryHasInitialCapital(firstToken);
        const firstIsLikelyEntityStart = TitleCaserUtils.dictionaryIsLikelyEntityStart(firstToken, profile);

        if (!firstIsLikelyEntityStart) {
          return null;
        }

        if (
          !firstIsGivenName &&
          !firstHasUserCapitalization &&
          !dictionaryHasEntityBoundaryBefore(tokens, startIndex)
        ) {
          return null;
        }

        let tokenIndex = startIndex;
        let wordCount = 1;
        let lastWordTokenIndex = startIndex;

        while (wordCount < 4) {
          const nextWhitespace = tokens[tokenIndex + 1] || "";
          const nextToken = tokens[tokenIndex + 2] || "";

          if (!/^\s+$/.test(nextWhitespace)) break;
          if (!TitleCaserUtils.dictionaryIsPhraseWordToken(nextToken)) break;
          if (!TitleCaserUtils.dictionaryIsLikelyEntityContinuation(nextToken, profile)) break;

          tokenIndex += 2;
          lastWordTokenIndex = tokenIndex;
          wordCount++;
        }

        if (wordCount < 2) {
          return null;
        }

        return lastWordTokenIndex;
      },
    },

    // Normalize a dictionary profile name
    dictionaryNormalizeProfile: {
      value(profile) {
        return dictionaryNormalizeProfileSource(profile);
      },
    },

    // Get the active dictionary profile data
    dictionaryGetProfile: {
      value(profile = dictionaryDefaultProfile) {
        return dictionaryGetProfile(profile);
      },
    },

    // Get supported dictionary profile names
    dictionaryGetProfilesList: {
      value() {
        return [...dictionaryProfilesList];
      },
    },

    // Get the dictionary part-of-speech flags for a word
    dictionaryGetPartOfSpeech: {
      value(word, profile = dictionaryDefaultProfile) {
        return dictionaryGetPartOfSpeechSource(word, profile);
      },
    },

    // Check if a word exists in the dictionary
    dictionaryIsWord: {
      value(word, profile = dictionaryDefaultProfile) {
        return dictionaryIsWordSource(word, profile);
      },
    },

    // Check if a word exists as a dictionary noun
    dictionaryIsNoun: {
      value(word, profile = dictionaryDefaultProfile) {
        return dictionaryIsNounSource(word, profile);
      },
    },

    // Check if a word exists as a dictionary verb
    dictionaryIsVerb: {
      value(word, profile = dictionaryDefaultProfile) {
        return dictionaryIsVerbSource(word, profile);
      },
    },

    // Check if a word exists as a dictionary adjective
    dictionaryIsAdjective: {
      value(word, profile = dictionaryDefaultProfile) {
        return dictionaryIsAdjectiveSource(word, profile);
      },
    },

    // Check if a word exists as a dictionary adverb
    dictionaryIsAdverb: {
      value(word, profile = dictionaryDefaultProfile) {
        return dictionaryIsAdverbSource(word, profile);
      },
    },

    // Build a first-word index for proper phrase normalization
    dictionaryGetProperPhraseIndex: {
      value(profile = dictionaryDefaultProfile) {
        const normalizedProfile = TitleCaserUtils.dictionaryNormalizeProfile(profile);
        if (!TitleCaserUtils.dictionaryProperPhraseIndex) {
          TitleCaserUtils.dictionaryProperPhraseIndex = new Map();
        }

        if (!TitleCaserUtils.dictionaryProperPhraseIndex.has(normalizedProfile)) {
          const properPhrases = dictionaryGetProperPhrases(normalizedProfile);
          TitleCaserUtils.dictionaryProperPhraseIndex.set(
            normalizedProfile,
            buildDictionaryProperPhraseIndex(properPhrases),
          );
        }

        return TitleCaserUtils.dictionaryProperPhraseIndex.get(normalizedProfile);
      },
    },

    // Check if a token can be part of a dictionary phrase
    dictionaryIsPhraseWordToken: {
      value(token) {
        if (typeof token !== "string") return false;

        return /^[A-Za-z][A-Za-z'.-]*$/.test(token);
      },
    },

    // Check if tokens match a dictionary proper phrase
    dictionaryMatchesProperPhrase: {
      value(tokens, startIndex, words) {
        let tokenIndex = startIndex;
        let lastWordTokenIndex = startIndex;

        for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
          const token = tokens[tokenIndex];

          if (
            !TitleCaserUtils.dictionaryIsPhraseWordToken(token) ||
            token.toLowerCase() !== words[wordIndex]
          ) {
            return null;
          }

          lastWordTokenIndex = tokenIndex;

          if (wordIndex < words.length - 1) {
            if (!/^\s+$/.test(tokens[tokenIndex + 1] || "")) return null;
            tokenIndex += 2;
          }
        }

        return lastWordTokenIndex;
      },
    },

    // Normalize known dictionary proper phrases in a string
    dictionaryNormalizeKnownProperPhrases: {
      value(str, profile = dictionaryDefaultProfile) {
        const tokens = str.match(/[A-Za-z][A-Za-z'.-]*|\s+|[^A-Za-z\s]+/g) || [];
        const phraseIndex = TitleCaserUtils.dictionaryGetProperPhraseIndex(profile);
        const result = [];

        for (let i = 0; i < tokens.length;) {
          const token = tokens[i];

          if (!TitleCaserUtils.dictionaryIsPhraseWordToken(token)) {
            result.push(token);
            i++;
            continue;
          }

          const candidates = phraseIndex.get(token.toLowerCase()) || [];
          const match = candidates.find((candidate) =>
            TitleCaserUtils.dictionaryMatchesProperPhrase(tokens, i, candidate.words) !== null,
          );

          if (!match) {
            const entityEndIndex = TitleCaserUtils.dictionaryGetLikelyEntityPhraseMatch(tokens, i, profile);

            if (entityEndIndex !== null) {
              for (let tokenIndex = i; tokenIndex <= entityEndIndex; tokenIndex++) {
                const entityToken = tokens[tokenIndex];
                result.push(
                  TitleCaserUtils.dictionaryIsPhraseWordToken(entityToken)
                    ? dictionaryCapitalizeNameToken(entityToken)
                    : entityToken,
                );
              }

              i = entityEndIndex + 1;
              continue;
            }

            result.push(token);
            i++;
            continue;
          }

          const endIndex = TitleCaserUtils.dictionaryMatchesProperPhrase(tokens, i, match.words);
          result.push(match.replacement);
          i = endIndex + 1;
        }

        return result.join("");
      },
    },
  });
}
