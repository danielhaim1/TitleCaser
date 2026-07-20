import regionalAcronyms from "./data/acronyms/list-regional-acronym-rules.json";
import phrasalVerbs from "./data/grammar/list-phrasal-verbs.json";
import wikipediaContextualPhrases from "./data/wikipedia/list-contextual-phrases.json";
import { brandNames, curatedDataList, geographyCodesAndNames } from "./data/terms/index.js";

function mergeArrays(...arraysOrObjects) {
  const merged = [];

  arraysOrObjects.forEach((item) => {
    if (Array.isArray(item)) {
      // If the item is an array, process each object in the array
      item.forEach((obj) => {
        Object.values(obj).forEach((value) => {
          merged.push(...value);
        });
      });
    } else if (typeof item === "object") {
      // If the item is an object, directly take its values
      Object.values(item).forEach((value) => {
        merged.push(...value);
      });
    }
  });

  return [...new Set(merged)];
}

export function buildPhraseReplacementMap(...arraysOrObjects) {
  const phraseMap = {};
  const terms = mergeArrays(...arraysOrObjects);

  terms.forEach((term) => {
    if (typeof term !== "string") return;
    if (!/\s/.test(term.trim())) return;

    phraseMap[term.toLowerCase()] = term;
  });

  return phraseMap;
}

export function buildKnownTermCasingMap(...arraysOrObjects) {
  const termMap = {};
  const terms = mergeArrays(...arraysOrObjects);

  terms.forEach((term) => {
    if (typeof term !== "string") return;
    if (!hasIntentionalCasing(term)) return;

    termMap[term.toLowerCase()] = term;
  });

  return termMap;
}

export function buildSimpleTermCasingMap(...arraysOrObjects) {
  const termMap = {};
  const terms = mergeArrays(...arraysOrObjects);

  terms.forEach((term) => {
    if (typeof term !== "string") return;

    termMap[term.toLowerCase()] = term;
  });

  return termMap;
}

function hasIntentionalCasing(term) {
  const trimmedTerm = term.trim();

  if (/\s/.test(trimmedTerm)) return true;
  if (/[a-z][A-Z]/.test(trimmedTerm)) return true;
  if (/[.+#]/.test(trimmedTerm)) return true;
  if (/[^\x00-\x7F]/.test(trimmedTerm)) return true;

  const lettersOnly = trimmedTerm.replace(/[^A-Za-z]/g, "");
  return lettersOnly.length > 1 && lettersOnly === lettersOnly.toUpperCase();
}

const mergedArray = mergeArrays(curatedDataList);

export const specialTermsList = mergedArray;
export const phrasalVerbList = phrasalVerbs;
export const knownTermCasingMap = {
  ...buildKnownTermCasingMap(curatedDataList),
  ...buildSimpleTermCasingMap(brandNames, geographyCodesAndNames),
};

export const shortWordsList = [
  "the",
  "in",
  "to",
  "within",
  "towards",
  "into",
  "at",
  "of",
  "for",
  "by",
  "on",
  "from",
  "with",
  "through",
  "about",
  "across",
  "over",
  "under",
  "between",
];

export const wordReplacementsList = [
  { "a.k.a": "AKA" },
  { "a.s.a.p": "ASAP" },
  { "f.a.q": "FAQ" },
  { "f.a.q.s": "FAQs" },
  { FAQS: "FAQs" },
  { "f.y.i": "FYI" },
  { "d.i.y": "DIY" },
  { "t.b.d": "TBD" },
  { "back end": "backend" },
  { "back-end": "backend" },
  { "front end": "frontend" },
  { "front-end": "frontend" },
  { "full stack": "fullstack" },
  { "full-stack": "fullstack" },
  { nodejs: "Node.js" },
  { "node.js": "Node.js" },
  { nextjs: "Next.js" },
  { nuxtjs: "Nuxt.js" },
  { reactjs: "React" },
  { "react.js": "React" },
  { skoda: "Škoda" },
  { ecommerce: "E-Commerce" },
  { "e-commerce": "E-Commerce" },
  { "e commerce": "E-Commerce" },
  { "cyber security": "cybersecurity" },
  { "cyber-security": "cybersecurity" },
  // { 'twitter': 'Twitter, formerly known as 𝕏' }
];

// * ! ===============================================
// * ! Title Case Styles
// * ! ===============================================

export const TITLE_CASE_STYLES = Object.freeze({
  AP: "ap",
  APA: "apa",
  BRITISH: "british",
  CHICAGO: "chicago",
  NYT: "nyt",
  WIKIPEDIA: "wikipedia",
});

export const allowedStylesList = Object.values(TITLE_CASE_STYLES);

export const styleConfigMap = Object.freeze({
  ap: {
    caseStyle: "title",
    // AP: Capitalize all words 4+ letters and all verbs/adverbs
    shortConjunctionsList: ["and", "but", "or", "nor", "yet", "so", "for", "v", "v.", "vs", "vs."],
    articlesList: ["a", "an", "the"],
    shortPrepositionsList: [
      // Pure prepositions (2–3 letters) safe to lowercase in AP
      "at", // e.g., "Dinner at Eight"
      "by", // e.g., "Written by the Author"
      "for", // e.g., "A Gift for You"
      "in", // e.g., "Made in America"
      "of", // e.g., "State of Mind"
      "off", // e.g., "10% Off Everything"
      "on", // e.g., "The War on Drugs"
      "out", // e.g., "Out of Context"
      "per", // e.g., "As per Usual"
      "to", // e.g., "Back to the Future"
      "via", // e.g., "Sent via Email"
    ],
    neverCapitalizedList: [],
  },

  apa: {
    caseStyle: "title",
    // APA: Minor words are ≤3 letters, regardless of function
    shortConjunctionsList: ["and", "as", "but", "for", "if", "nor", "or", "so", "yet"],
    articlesList: ["a", "an", "the"],
    shortPrepositionsList: [
      // Strictly ≤3-letter prepositions per APA 7th edition
      "as", // Subordinating conj. but included per APA convention
      "at",
      "by",
      "for",
      "in",
      "of",
      "off",
      "on",
      "out",
      "per",
      "to",
      "via",
    ],
    neverCapitalizedList: [],
  },

  british: {
    caseStyle: "title",
    // British English typically follows Chicago or APA rules
    shortConjunctionsList: ["and", "but", "or", "for", "nor", "yet", "so"],
    articlesList: ["a", "an", "the"],
    shortPrepositionsList: [
      // Safe lowercasing set, similar to APA
      "at",
      "by",
      "for",
      "in",
      "of",
      "off",
      "on",
      "per",
      "to",
      "via",
    ],
    neverCapitalizedList: [],
  },

  chicago: {
    caseStyle: "title",
    // Chicago: Similar to AP, but may capitalize some longer preps
    shortConjunctionsList: ["and", "but", "or", "for", "nor", "yet", "so"],
    articlesList: ["a", "an", "the"],
    shortPrepositionsList: [
      // Filtered to exclude questionable entries like "up", "under", etc.
      "at",
      "by",
      "for",
      "in",
      "of",
      "off",
      "on",
      "per",
      "to",
      "via",
    ],
    neverCapitalizedList: ["etc."],
  },

  nyt: {
    caseStyle: "title",
    // NYT-derived minor words, including legal-versus abbreviations
    shortConjunctionsList: ["and", "as", "but", "for", "if", "nor", "or", "so", "yet", "v", "v.", "vs", "vs."],
    articlesList: ["a", "an", "the"],
    shortPrepositionsList: ["at", "by", "en", "for", "in", "of", "off", "on", "out", "per", "to", "via"],
    neverCapitalizedList: [],
  },

  wikipedia: {
    caseStyle: "sentence",
    // Sentence case: first word + acronyms only, preps list for completeness
    shortConjunctionsList: ["and", "as", "but", "for", "nor", "or", "so", "yet"],
    articlesList: ["a", "an", "the"],
    shortPrepositionsList: [
      // No impact unless sentence case logic is bypassed
      "at",
      "by",
      "for",
      "in",
      "of",
      "off",
      "on",
      "out",
      "per",
      "to",
      "via",
    ],
    neverCapitalizedList: [],
  },
});

// * ! ===============================================
// * ! Ignored Words
// * ! ===============================================

export const ignoredWordList = [];

// * ! ===============================================
// * ! Correct Phrase Casing
// * ! ===============================================

export const phraseReplacementMap = {
  ...buildPhraseReplacementMap(curatedDataList),
  ...buildPhraseReplacementMap(brandNames),
  "the cybersmile foundation": "The Cybersmile Foundation",
  "co. by colgate": "CO. by Colgate",
  "on & off": "On & Off",
  "on and off": "On and Off",
};

export const wikipediaContextualPhraseCasingMap = Object.freeze({
  ...wikipediaContextualPhrases,
});

// * ! ===============================================
// * ! Regex Patterns
// * ! ===============================================

export const REGEX_PATTERNS = Object.freeze({
  // Punctuation at end of word
  TRAILING_PUNCTUATION: /[.,!?;:]+$/,
  // Split word at punctuation while preserving delimiters
  SPLIT_AT_PUNCTUATION: /([.,\/#!$%\^&\*;:{}=\-_`~()?])/g,
  // Match HTML break tags
  HTML_BREAK: /<\s*br\s*\/?\s*>/gi,
  // Multiple consecutive spaces
  MULTIPLE_SPACES: / {2,}/g,
  // Regex escape special characters
  REGEX_ESCAPE: /[.*+?^${}()|[\]\\]/g,
});

// * ! ===============================================
// * ! Acronym Replacements
// * ! ===============================================

export const regionalAcronymList = regionalAcronyms.regionalAcronymList;
export const regionalAcronymPrecedingWordsList = regionalAcronyms.regionalAcronymPrecedingWordsList;
export const regionalAcronymFollowingWordsList = regionalAcronyms.regionalAcronymFollowingWordsList;
