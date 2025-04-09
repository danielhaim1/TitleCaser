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

export const correctTitleCasingList = mergedArray;

export const commonShortWords = [
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

export const titleCaseStylesList = Object.freeze({
  AP: "ap",
  APA: "apa",
  BRITISH: "british",
  CHICAGO: "chicago",
  NYT: "nyt",
  WIKIPEDIA: "wikipedia",
});

export const allowedTitleCaseStylesList = Object.values(titleCaseStylesList);
export const titleCaseDefaultOptionsList = Object.freeze({
  ap: {
    shortConjunctionsList: ["and", "but", "or", "for", "nor", "yet", "so"],
    articlesList: ["a", "an", "the"],
    shortPrepositionsList: ["as", "at", "by", "in", "into", "of", "off", "on", "onto", "out", "over", "to", "up", "via", "with", "from", "under", "upon", "among"],
    neverCapitalizedList: [],
  },
  apa: {
    shortConjunctionsList: ["and", "but", "by", "for", "in", "nor", "of", "on", "or", "so", "to", "yet"],
    articlesList: ["a", "an", "the"],
    shortPrepositionsList: [
      "about", "above", "across", "after", "against", "along", "among", "around",
      "as", "at", "before", "behind", "below", "beneath", "beside", "between",
      "beyond", "by", "despite", "down", "during", "except", "for", "from", "in",
      "inside", "into", "like", "near", "of", "off", "on", "onto", "out", "outside",
      "over", "past", "since", "through", "throughout", "till", "to", "toward",
      "under", "underneath", "until", "up", "upon", "via", "with", "within", "without"
    ],    
    neverCapitalizedList: [],
  },
  british: {
    shortConjunctionsList: ["and", "but", "or", "for", "nor", "yet", "so"],
    articlesList: ["a", "an", "the"],
    shortPrepositionsList: ["as", "at", "by", "in", "into", "of", "off", "on", "onto", "out", "over", "to", "up", "via", "with", "from", "under", "upon"],
    neverCapitalizedList: [],
  },
  chicago: {
    shortConjunctionsList: ["and", "but", "or", "for", "nor", "yet", "so"],
    articlesList: ["a", "an", "the"],
    shortPrepositionsList: ["as", "at", "by", "in", "into", "of", "off", "on", "onto", "out", "over", "to", "up", "via", "with", "from", "under", "upon"],
    neverCapitalizedList: ["etc."],
  },
  nyt: {
    shortConjunctionsList: ["and", "but", "or", "for", "nor", "yet", "so"],
    articlesList: ["a", "an", "the"],
    shortPrepositionsList: ["as", "at", "by", "in", "into", "of", "off", "on", "onto", "out", "over", "to", "up", "via", "with", "from", "under", "upon"],
    neverCapitalizedList: [],
  },
  wikipedia: {
    shortConjunctionsList: ["and", "as", "but", "for", "nor", "or", "so", "yet"],
    articlesList: ["a", "an", "the"],
    shortPrepositionsList: ["as", "at", "by", "in", "into", "of", "off", "on", "onto", "out", "over", "to", "up", "via", "with", "from", "under", "upon"],
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

export const correctPhraseCasingList = {
  'the cybersmile foundation': 'The Cybersmile Foundation',
  'co. by colgate': 'CO. by Colgate',
  "on & off": "On & Off",
  "on and off": "On and Off",
};

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

export const regionalAcronymPrecedingWords = [
  "the", "via", "among", "across", "beyond", "outside",
  "alongside", "throughout", "despite", "unlike", "upon"
];

export const directFollowingIndicatorsRegionalAcronym = [
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

