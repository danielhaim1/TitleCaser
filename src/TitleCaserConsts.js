export const commonAbbreviationList = [
  "a",
  "an",
  "the",
  "as",
  "at",
  "by",
  "for",
  "in",
  "of",
  "on",
  "to",
  "up",
  "yet",
  "so",
  "but",
  "nor",
  "or",
  "and",
];

import brandList from "./data/brandList.json";
import businessFinanceLegalTerms from "./data/businessFinanceLegalTerms.json";
import eCommerceDigitalTerms from "./data/eCommerceDigitalTerms.json";
import globalGeography from "./data/globalGeography.json";
import marketingMediaTerms from "./data/marketingMediaTerms.json";
import miscSpecializedTerms from "./data/miscSpecializedTerms.json";
import techComputingConcepts from "./data/techComputingConcepts.json";
import timeAcademicTerms from "./data/timeAcademicTerms.json";

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
);

export const correctTitleCasingList = mergedArray;

export const wordReplacementsList = [
  { "e-book": "eBook" },
  { "e-books": "eBooks" },
  { "e-commerce": "eCommerce" },
  { ecom: "eCommerce" },
  { ecommerce: "eCommerce" },
  { "a.k.a": "AKA" },
  { "a.s.a.p": "ASAP" },
  { "f.a.q": "FAQ" },
  { "f.a.q.a": "FAQs" },
  { "f.a.q.s": "FAQs" },
  { "f.y.i": "FYI" },
  { "d.i.y": "DIY" },
  { "t.b.d": "TBD" },
  { phd: "Ph.D." },
  { "back-end": "Backend" },
  { "front-end": "Frontend" },
  { "full-stack": "Fullstack" },
  { angularjs: "Angular.js" },
  { nextjs: "Next.js" },
  { nodejs: "Node.js" },
  { nuxtjs: "Nuxt.js" },
  { reactjs: "React.js" },
  { vuejs: "Vue.js" },
  { "cyber-security": "Cybersecurity" },
  { skoda: "Škoda" },
  { mcdonalds: "McDonald's" },
  { sainsburys: "Sainsbury's" },
  { hersheys: "Hershey's" },
  { kellogs: "Kellogg's" },
  { dominos: "Domino's" },
];

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
    shortPrepositionsList: ["as", "at", "by", "in", "of", "on", "to", "up", "via"],
    neverCapitalizedList: [],
  },
  apa: {
    shortConjunctionsList: ["and", "as", "but", "by", "for", "in", "nor", "of", "on", "or", "so", "to", "yet"],
    articlesList: ["a", "an", "the"],
    shortPrepositionsList: ["as", "at", "by", "for", "in", "of", "on", "to", "up", "via"],
    neverCapitalizedList: [],
  },
  british: {
    shortConjunctionsList: ["and", "but", "or", "for", "nor", "yet", "so"],
    articlesList: ["a", "an", "the"],
    shortPrepositionsList: ["as", "at", "by", "in", "of", "on", "to", "up", "via"],
    neverCapitalizedList: [],
  },
  chicago: {
    shortConjunctionsList: ["and", "but", "or", "for", "nor", "yet", "so"],
    articlesList: ["a", "an", "the"],
    shortPrepositionsList: ["as", "at", "by", "for", "in", "of", "on", "to", "up", "with", "via"],
    neverCapitalizedList: ["etc."],
  },
  nyt: {
    shortConjunctionsList: ["and", "but", "or", "for", "nor", "yet", "so"],
    articlesList: ["a", "an", "the"],
    shortPrepositionsList: ["as", "at", "by", "in", "of", "on", "to", "up", "via"],
    neverCapitalizedList: [],
  },
  wikipedia: {
    shortConjunctionsList: ["and", "as", "but", "for", "if", "nor", "or", "so", "yet"],
    articlesList: ["a", "an", "the"],
    shortPrepositionsList: ["as", "at", "by", "in", "of", "on", "to", "up", "via"],
    neverCapitalizedList: [],
  },
});

export const ignoredWordList = [];
export const correctPhraseCasingList = {
  'the cybersmile foundation': 'The Cybersmile Foundation',
  'co. by colgate': 'CO. by Colgate'
};

