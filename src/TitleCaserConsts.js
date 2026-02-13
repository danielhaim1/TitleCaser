import brandList from "./data/brandList.json";
import businessFinanceLegalTerms from "./data/businessFinanceLegalTerms.json";
import eCommerceDigitalTerms from "./data/eCommerceDigitalTerms.json";
import globalGeography from "./data/globalGeography.json";
import marketingMediaTerms from "./data/marketingMediaTerms.json";
import miscSpecializedTerms from "./data/miscSpecializedTerms.json";
import techComputingConcepts from "./data/techComputingConcepts.json";
import timeAcademicTerms from "./data/timeAcademicTerms.json";
import militaryTerms from "./data/militaryTerms.json";

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

const mergedArray = mergeArrays(
  brandList,
  businessFinanceLegalTerms,
  eCommerceDigitalTerms,
  globalGeography,
  marketingMediaTerms,
  miscSpecializedTerms,
  techComputingConcepts,
  timeAcademicTerms,
  militaryTerms,
);

export const specialTermsList = mergedArray;

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
  "between"
];

export const wordReplacementsList = [
  { "a.k.a": "AKA" },
  { "a.s.a.p": "ASAP" },
  { "f.a.q": "FAQ" },
  { "f.a.q.s": "FAQs" },
  { "FAQS": "FAQs" },
  { "f.y.i": "FYI" },
  { "d.i.y": "DIY" },
  { "t.b.d": "TBD" },
  { "back-end": "Backend" },
  { "front-end": "Frontend" },
  { "full-stack": "Fullstack" },
  { "nodejs": "Node.js" },
  { "nextjs": "Next.js" },
  { "nuxtjs": "Nuxt.js" },
  { "reactjs": "React" },
  { "react.js": "React" },
  { "cyber-security": "Cybersecurity" },
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
    shortConjunctionsList: ["and", "but", "or", "nor", "yet", "so", "for"],
    articlesList: ["a", "an", "the"],
    shortPrepositionsList: [
      // Pure prepositions (2–3 letters) safe to lowercase in AP
      "at",   // e.g., "Dinner at Eight"
      "by",   // e.g., "Written by the Author"
      "for",  // e.g., "A Gift for You"
      "in",   // e.g., "Made in America"
      "of",   // e.g., "State of Mind"
      "off",  // e.g., "10% Off Everything"
      "on",   // e.g., "The War on Drugs"
      "out",  // e.g., "Out of Context"
      "per",  // e.g., "As per Usual"
      "to",   // e.g., "Back to the Future"
      "via"   // e.g., "Sent via Email"
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
      "as",   // Subordinating conj. but included per APA convention
      "at",
      "by",
      "for",
      "in",
      "of",
      "off",
      "on",
      "per",
      "to",
      "via"
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
      "out",
      "per",
      "to",
      "via"
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
      "out",
      "per",
      "to",
      "via"
    ],
    neverCapitalizedList: ["etc."],
  },

  nyt: {
    caseStyle: "title",
    // NYT style aligns closely with Chicago/AP
    shortConjunctionsList: ["and", "but", "or", "nor", "yet", "so", "for"],
    articlesList: ["a", "an", "the"],
    shortPrepositionsList: [
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
      "via"
    ],
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
      "via"
    ],
    neverCapitalizedList: [],
  }
});


// * ! ===============================================
// * ! Ignored Words
// * ! ===============================================

export const ignoredWordList = [];

// * ! ===============================================
// * ! Correct Phrase Casing
// * ! ===============================================

export const phraseReplacementMap = {
  'the cybersmile foundation': 'The Cybersmile Foundation',
  'co. by colgate': 'CO. by Colgate',
  "on & off": "On & Off",
  "on and off": "On and Off",
};

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

export const regionalAcronymList = [
  "usa",
  "us",
  "u.s.a",
  "u.s.",
  "u.s",
  "u.s.a.",
  "eu",
  "e.u.",
  "e.u",
  "uk",
  "u.k.",
  "u.k",
];

export const regionalAcronymPrecedingWordsList = [
  "the", "via", "among", "across", "beyond", "outside",
  "alongside", "throughout", "despite", "unlike", "upon"
];

export const regionalAcronymFollowingWordsList = [
  "act", "acts",
  "administration", "administrations",
  "agency", "agencies",
  "agreement", "agreements",
  "airforce", "airforces",
  "aid",
  "alliance", "alliances",
  "ambassador", "ambassadors",
  "authority", "authorities",
  "bill", "bills",
  "bloc", "blocs",
  "budget", "budgets",
  "bureau", "bureaus",
  "cabinet", "cabinets",
  "charter", "charters",
  "command", "commands",
  "commission", "commissions",
  "conference", "conferences",
  "congress", "congresses",
  "convention", "conventions",
  "council", "councils",
  "court", "courts",
  "defense", "defences",
  "defence", "defenses",
  "delegation", "delegations",
  "democracy", "democracies",
  "department", "departments",
  "development", "developments",
  "directive", "directives",
  "diplomacy",
  "division", "divisions",
  "economy", "economies",
  "embassy", "embassies",
  "engagement", "engagements",
  "envoy", "envoys",
  "exports",
  "federation", "federations",
  "finance", "finances",
  "forces",
  "framework", "frameworks",
  "funding",
  "government", "governments",
  "hearing", "hearings",
  "imports",
  "initiative", "initiatives",
  "intel",
  "intelligence",
  "intervention", "interventions",
  "jurisdiction", "jurisdictions",
  "law", "laws",
  "leadership", "leaders",
  "legislation",
  "liaison", "liaisons",
  "mandate", "mandates",
  "markets",
  "marines",
  "military", "militaries",
  "ministry", "ministries",
  "mission", "missions",
  "navy", "navies",
  "negotiations",
  "office", "offices",
  "operations",
  "oversight",
  "parliament", "parliaments",
  "plan", "plans",
  "policies", "policy",
  "policy-makers",
  "precedent", "precedents",
  "presence",
  "program", "programme", "programmes", "programs",
  "project", "projects",
  "protocol", "protocols",
  "province", "provinces",
  "reform", "reforms",
  "regulation", "regulations",
  "regulator", "regulators",
  "relations",
  "representation", "representations",
  "republic", "republics",
  "resolution", "resolutions",
  "ruling", "rulings",
  "sanctions",
  "security", "securities",
  "senate", "senates",
  "service", "services",
  "state", "states",
  "statute", "statutes",
  "strategy", "strategies",
  "summit", "summits",
  "summitry",
  "surveillance",
  "talks",
  "tariffs",
  "territory", "territories",
  "trade", "trades",
  "treasury", "treasuries",
  "treaty", "treaties",
  "tribunal", "tribunals",
  "troops",
  "union", "unions",
  "veterans",
  "warships",
  "zone", "zones"
];