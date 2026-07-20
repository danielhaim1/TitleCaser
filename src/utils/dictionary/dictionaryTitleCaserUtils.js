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
import ambiguousGivenNames from "../../data/names/list-ambiguous-given-names.json";
import { specialTermsList } from "../../TitleCaserConsts.js";

const dictionaryFamilyNameSet = new Set(familyNames);
const dictionaryGivenNameSet = new Set(givenNames);
const dictionaryAmbiguousGivenNameSet = new Set(ambiguousGivenNames);
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

function dictionaryCollectBacktickCodeRanges(input) {
  const ranges = [];
  const codeSpanPattern = /`[^`]*`/g;
  let match;

  while ((match = codeSpanPattern.exec(input || ""))) {
    ranges.push([match.index, codeSpanPattern.lastIndex]);
  }

  return ranges;
}

function dictionaryIsInsideRange(ranges, tokenStart, tokenEnd) {
  if (!Array.isArray(ranges)) return false;

  return ranges.some(([rangeStart, rangeEnd]) =>
    tokenStart >= rangeStart && tokenEnd <= rangeEnd,
  );
}

function dictionaryIsLikelyIdentifierLikeToken(token) {
  return /^[a-z][a-z0-9_]*[A-Z][a-zA-Z0-9_]*$/.test(token);
}

function dictionaryLooksLikeProtectedTokenContext(input, token, tokenStart, codeRanges) {
  if (!token || tokenStart < 0) return true;

  const tokenEnd = tokenStart + token.length;
  const previousChar = tokenStart > 0 ? input[tokenStart - 1] : "";
  const nextChar = input[tokenEnd] || "";
  const isTerminalPeriod = nextChar === "." &&
    (tokenEnd + 1 >= input.length || /\s/.test(input[tokenEnd + 1]));
  const pathBoundaryPattern = /[./@_\\:'"“”‘’`(){}\[\]\-&=%?\/]/;

  if (dictionaryIsInsideRange(codeRanges, tokenStart, tokenEnd)) return true;

  return pathBoundaryPattern.test(previousChar) ||
    (pathBoundaryPattern.test(nextChar) && !isTerminalPeriod) ||
    dictionaryIsLikelyIdentifierLikeToken(token);
}

function dictionaryIsLikelyCoordinatedListStart(input, listStartIndex) {
  let previousIndex = listStartIndex - 1;

  while (previousIndex >= 0 && /\s/.test(input[previousIndex])) {
    previousIndex -= 1;
  }

  if (previousIndex < 0) return true;

  const previousChar = input[previousIndex];

  if (/["'“”‘’`\]\[(){}]/.test(previousChar)) {
    return false;
  }

  if (previousChar === ",") {
    return false;
  }

  return true;
}

function dictionaryGetCoordinatedListPeerNameSignal(words) {
  if (!Array.isArray(words) || !words.length) return 0;

  const normalizedWords = words
    .map((word) => (typeof word === "string" ? word.toLowerCase() : ""))
    .filter(Boolean);
  if (!normalizedWords.length) return 0;

  if (normalizedWords.length === 1) {
    const normalizedWord = normalizedWords[0];
    if (dictionaryNameContinuationBlocklist.has(normalizedWord)) return 0;

    return dictionaryGivenNameSet.has(normalizedWord) || dictionaryFamilyNameSet.has(normalizedWord)
      ? 1
      : 0;
  }

  if (normalizedWords.length !== 2) return 0;

  const [firstWord, lastWord] = normalizedWords;

  if (dictionaryNameContinuationBlocklist.has(firstWord)) return 0;
  if (dictionaryNameContinuationBlocklist.has(lastWord)) return 0;

  return dictionaryGivenNameSet.has(firstWord) && dictionaryFamilyNameSet.has(lastWord) ? 1 : 0;
}

function dictionaryIsLikelyPersonNamePair(words) {
  if (!Array.isArray(words) || words.length !== 2) return false;

  const [firstWord, lastWord] = words;
  const normalizedFirst = firstWord.toLowerCase();
  const normalizedLast = lastWord.toLowerCase();
  const hasApostrophes = /['’]/.test(firstWord) || /['’]/.test(lastWord);

  return (
    !hasApostrophes &&
    /^[A-Z]/.test(firstWord) &&
    /^[A-Z]/.test(lastWord) &&
    dictionaryGivenNameSet.has(normalizedFirst) &&
    dictionaryFamilyNameSet.has(normalizedLast)
  );
}

function dictionaryCanDropLeadingTwoWordCapture(words) {
  if (!Array.isArray(words) || words.length !== 2) return false;

  return (
    /^[a-z]/.test(words[0]) &&
    !dictionaryIsLikelyPersonNamePair(words)
  );
}

function dictionaryGetCoordinatedListCandidatesFromItems(items) {
  if (!Array.isArray(items) || items.length < 3) return [];

  const listStartItem = items[0];
  if (!dictionaryGetCoordinatedListPeerNameSignal(listStartItem.words)) return [];

  const lowercaseSingleWordNameItems = items.filter(({ words, candidateEntry }) =>
    words.length === 1 &&
    /^[a-z]/.test(words[0]) &&
    candidateEntry &&
    (
      dictionaryGivenNameSet.has(candidateEntry.word) ||
      dictionaryAmbiguousGivenNameSet.has(candidateEntry.word)
    )
  );

  const ambiguousLowercaseSingleWordItems = lowercaseSingleWordNameItems.filter(({ candidateEntry }) =>
    dictionaryAmbiguousGivenNameSet.has(candidateEntry.word),
  );

  const candidateItems = lowercaseSingleWordNameItems.length === 1
    ? lowercaseSingleWordNameItems
    : ambiguousLowercaseSingleWordItems;

  if (candidateItems.length !== 1) return [];

  const [candidateItem] = candidateItems;
  const peerItems = items.filter((item) => item !== candidateItem);
  const peerNameSignalCount = peerItems.filter(({ words }) =>
    dictionaryGetCoordinatedListPeerNameSignal(words) > 0,
  ).length;

  if (
    peerItems.length >= 3 &&
    peerNameSignalCount >= 3
  ) {
    return [{ ...candidateItem.candidateEntry, classification: "contextual-person" }];
  }

  return [];
}

function dictionaryIsLikelyContextualPersonNamePair(words) {
  if (!Array.isArray(words) || words.length !== 2) return false;

  const [firstWord, lastWord] = words;
  const normalizedFirst = firstWord.toLowerCase();
  const normalizedLast = lastWord.toLowerCase();

  return (
    dictionaryGivenNameSet.has(normalizedFirst) &&
    !dictionaryNameContinuationBlocklist.has(normalizedLast) &&
    /^[A-Za-z][A-Za-z'’-]*$/.test(lastWord)
  );
}

function dictionaryGetCoordinatedListConfirmedMemberEntries(items) {
  if (!Array.isArray(items) || items.length < 3) return [];

  const strongPersonItems = items.filter(({ words }) =>
    dictionaryGetCoordinatedListPeerNameSignal(words) > 0 ||
    dictionaryIsLikelyContextualPersonNamePair(words),
  );
  if (strongPersonItems.length < 3) return [];

  return items.flatMap(({ words, wordEntries = [] }) => {
    const isSingleKnownName =
      words.length === 1 &&
      (
        dictionaryGivenNameSet.has(words[0].toLowerCase()) ||
        dictionaryFamilyNameSet.has(words[0].toLowerCase()) ||
        dictionaryAmbiguousGivenNameSet.has(words[0].toLowerCase())
      );
    const isContextualPersonNamePair = dictionaryIsLikelyContextualPersonNamePair(words);

    if (!isSingleKnownName && !isContextualPersonNamePair) return [];

    return wordEntries.filter(({ originalWord }) => /^[a-z]/.test(originalWord));
  });
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

    // Return structural matches used by the contextual person-name detector.
    dictionaryGetCoordinatedListMatches: {
      value({ input = "" } = {}) {
        if (typeof input !== "string" || !input) return [];

        const listItemPattern = "[A-Za-z][A-Za-z'’-]*(?:\\s+[A-Za-z][A-Za-z'’-]*){0,1}";
        const listPattern = new RegExp(
          `\\b${listItemPattern}(?:\\s*,\\s*${listItemPattern}){1,}\\s*,?\\s+(?:and|or)\\s+${listItemPattern}\\b`,
          "gi",
        );

        return Array.from(input.matchAll(listPattern))
          .filter((listMatch) => dictionaryIsLikelyCoordinatedListStart(input, listMatch.index))
          .map((listMatch) => ({
            listText: listMatch[0],
            startIndex: listMatch.index,
          }));
      },
    },

    // Infer a single ambiguous lowercase given name only when a strict coordinated list
    // with people-like peer evidence exists. This is intentionally scoped to this
    // exact structural pattern and is not a general named-entity-recognition pass.
    dictionaryGetCoordinatedListProperNameCandidates: {
      value({ input = "", includeConfirmedListMembers = false } = {}) {
        if (typeof input !== "string" || !input) return [];

        const wordPattern = /[A-Za-z][A-Za-z'’-]*/g;
        const wordEntries = Array.from(input.matchAll(wordPattern)).map((match, wordIndex) => ({
          word: match[0].toLowerCase(),
          originalWord: match[0],
          startIndex: match.index,
          wordIndex,
        }));
        const wordEntryByStart = new Map(
          wordEntries.map((entry) => [entry.startIndex, entry]),
        );
        const candidates = [];
        const confirmedListMembers = [];
        const codeRanges = dictionaryCollectBacktickCodeRanges(input);

        const listItemsMatchPattern = /\s*,\s*(?:and|or)\s+|\s*,\s*|\s+(?:and|or)\s+/gi;

        const parseItemsFromListText = (listText, listTextStartIndex) => {
          const listItems = [];
          let itemStartIndex = 0;
          let separatorMatch;
          listItemsMatchPattern.lastIndex = 0;

          while ((separatorMatch = listItemsMatchPattern.exec(listText))) {
            const rawItem = listText.slice(itemStartIndex, separatorMatch.index);
            const leadingWhitespaceLength = rawItem.search(/\S/);

            if (leadingWhitespaceLength !== -1) {
              listItems.push({
                rawItem: rawItem.trim(),
                startIndex: listTextStartIndex + itemStartIndex + leadingWhitespaceLength,
              });
            }

            itemStartIndex = separatorMatch.index + separatorMatch[0].length;
          }

          const finalRawItem = listText.slice(itemStartIndex);
          const finalLeadingWhitespaceLength = finalRawItem.search(/\S/);

          if (finalLeadingWhitespaceLength !== -1) {
            listItems.push({
              rawItem: finalRawItem.trim(),
              startIndex: listTextStartIndex + itemStartIndex + finalLeadingWhitespaceLength,
            });
          }

          let listHasMalformedItem = false;
          const parsedListItems = listItems
            .map(({ rawItem, startIndex }, itemIndex) => {
              let wordMatches = Array.from(rawItem.matchAll(wordPattern));
              const trailingWord = wordMatches.length === 2
                ? wordMatches[1][0].toLowerCase()
                : "";

              if (
                itemIndex === listItems.length - 1 &&
                wordMatches.length === 2 &&
                (
                  dictionaryNameContinuationBlocklist.has(trailingWord) ||
                  /(?:ed|ing)$/.test(trailingWord)
                )
              ) {
                wordMatches = wordMatches.slice(0, 1);
              }

              const words = wordMatches.map((match) => match[0]);
              const isLikelyPersonNamePair = dictionaryIsLikelyPersonNamePair(words);
              const isLikelyContextualPersonNamePair =
                dictionaryIsLikelyContextualPersonNamePair(words);
              const canDropLeadingTwoWordCapture =
                !isLikelyContextualPersonNamePair &&
                dictionaryCanDropLeadingTwoWordCapture(words);
              const isMalformedTwoWordItem =
                words.length === 2 &&
                !isLikelyPersonNamePair &&
                !isLikelyContextualPersonNamePair;

              const wordStarts = wordMatches.map((match) => startIndex + match.index);
              const hasUnsafeWord = words.some((word, wordIndex) =>
                dictionaryLooksLikeProtectedTokenContext(
                  input,
                  word,
                  wordStarts[wordIndex],
                  codeRanges,
                ),
              );

              if (hasUnsafeWord) {
                listHasMalformedItem = true;
                return null;
              }

              if (isMalformedTwoWordItem && !canDropLeadingTwoWordCapture) {
                listHasMalformedItem = true;
                return null;
              }

              const firstNameWordIndex = canDropLeadingTwoWordCapture
                ? wordMatches.length - 1
                : 0;

              return {
                words: words.slice(firstNameWordIndex),
                startIndex: wordStarts[firstNameWordIndex],
                canDropLeadingTwoWordCapture,
                wordEntries: wordMatches.slice(firstNameWordIndex).map((match, index) =>
                  wordEntryByStart.get(wordStarts[firstNameWordIndex + index]),
                ).filter(Boolean),
                candidateEntry: wordStarts.length
                  ? wordEntryByStart.get(wordStarts[firstNameWordIndex])
                  : null,
              };
            })
            .filter(Boolean);

          return {
            parsedListItems,
            listHasMalformedItem,
            listItems,
          };
        };

        for (const { listText, startIndex } of TitleCaserUtils.dictionaryGetCoordinatedListMatches({ input })) {
          const { parsedListItems, listHasMalformedItem, listItems } = parseItemsFromListText(
            listText,
            startIndex,
          );

          if (
            listHasMalformedItem ||
            !parsedListItems.length
          ) {
            continue;
          }

          for (let listStartOffset = 0; listStartOffset < parsedListItems.length - 2; listStartOffset++) {
            const alignedItems = parsedListItems.slice(listStartOffset);
            if (!alignedItems.length) continue;

            const listStartItem = alignedItems[0];
            const leadingItems = parsedListItems.slice(0, listStartOffset);
            const canShiftToLeadingItems = leadingItems.every((item) => item.canDropLeadingTwoWordCapture);

            if (
              !canShiftToLeadingItems &&
              !dictionaryIsLikelyCoordinatedListStart(input, listStartItem.startIndex)
            ) {
              continue;
            }

            const newCandidates = dictionaryGetCoordinatedListCandidatesFromItems(alignedItems);
            const newConfirmedListMembers = dictionaryGetCoordinatedListConfirmedMemberEntries(
              alignedItems,
            );

            if (newConfirmedListMembers.length) {
              confirmedListMembers.push(...newConfirmedListMembers);
            }
            if (newCandidates.length) {
              candidates.push(...newCandidates);
            }

            if (newCandidates.length || newConfirmedListMembers.length) break;
          }
        }

        if (!includeConfirmedListMembers) return candidates;

        const confirmedMembersByWordIndex = new Map(
          confirmedListMembers.map((entry) => [entry.wordIndex, entry]),
        );

        return Array.from(confirmedMembersByWordIndex.values())
          .map((entry) => ({ ...entry, classification: "contextual-person" }));
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
