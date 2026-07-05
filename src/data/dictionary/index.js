import fullNouns from "./full/list-nouns.json";
import sharedAdjectives from "./shared/list-adjectives.json";
import sharedAdverbs from "./shared/list-adverbs.json";
import sharedProperPhrases from "./shared/list-proper-phrases.json";
import sharedVerbs from "./shared/list-verbs.json";

const emptyList = Object.freeze([]);

export const dictionaryDefaultProfile = "full";
export const dictionaryProfilesList = Object.freeze(["lite", "full"]);

const dictionaryProfileData = Object.freeze({
  lite: Object.freeze({
    nouns: emptyList,
    verbs: emptyList,
    adjectives: emptyList,
    adverbs: emptyList,
    properPhrases: sharedProperPhrases,
  }),
  full: Object.freeze({
    nouns: fullNouns,
    verbs: sharedVerbs,
    adjectives: sharedAdjectives,
    adverbs: sharedAdverbs,
    properPhrases: sharedProperPhrases,
  }),
});
const dictionaryProfileSetCache = new Map();

export const dictionaryProperPhrases = dictionaryProfileData[dictionaryDefaultProfile].properPhrases;

export function dictionaryNormalizeWord(word) {
  if (typeof word !== "string") return "";

  return word
    .toLowerCase()
    .replace(/^[^a-z]+|[^a-z'-]+$/gi, "")
    .replace(/'s$/i, "");
}

export function dictionaryNormalizeProfile(profile) {
  return dictionaryProfilesList.includes(profile) ? profile : dictionaryDefaultProfile;
}

export function dictionaryGetProfile(profile = dictionaryDefaultProfile) {
  return dictionaryProfileData[dictionaryNormalizeProfile(profile)];
}

export function dictionaryGetProperPhrases(profile = dictionaryDefaultProfile) {
  return dictionaryGetProfile(profile).properPhrases;
}

function dictionaryGetProfileSets(profile = dictionaryDefaultProfile) {
  const normalizedProfile = dictionaryNormalizeProfile(profile);

  if (!dictionaryProfileSetCache.has(normalizedProfile)) {
    const profileData = dictionaryGetProfile(normalizedProfile);
    dictionaryProfileSetCache.set(normalizedProfile, {
      nouns: new Set(profileData.nouns),
      verbs: new Set(profileData.verbs),
      adjectives: new Set(profileData.adjectives),
      adverbs: new Set(profileData.adverbs),
    });
  }

  return dictionaryProfileSetCache.get(normalizedProfile);
}

export function dictionaryIsNoun(word, profile = dictionaryDefaultProfile) {
  return dictionaryGetProfileSets(profile).nouns.has(dictionaryNormalizeWord(word));
}

export function dictionaryIsVerb(word, profile = dictionaryDefaultProfile) {
  return dictionaryGetProfileSets(profile).verbs.has(dictionaryNormalizeWord(word));
}

export function dictionaryIsAdjective(word, profile = dictionaryDefaultProfile) {
  return dictionaryGetProfileSets(profile).adjectives.has(dictionaryNormalizeWord(word));
}

export function dictionaryIsAdverb(word, profile = dictionaryDefaultProfile) {
  return dictionaryGetProfileSets(profile).adverbs.has(dictionaryNormalizeWord(word));
}

export function dictionaryGetPartOfSpeech(word, profile = dictionaryDefaultProfile) {
  const normalizedWord = dictionaryNormalizeWord(word);
  const profileSets = dictionaryGetProfileSets(profile);
  let partOfSpeech = "";

  if (profileSets.nouns.has(normalizedWord)) partOfSpeech += "n";
  if (profileSets.verbs.has(normalizedWord)) partOfSpeech += "v";
  if (profileSets.adjectives.has(normalizedWord)) partOfSpeech += "a";
  if (profileSets.adverbs.has(normalizedWord)) partOfSpeech += "r";

  return partOfSpeech;
}

export function dictionaryIsWord(word, profile = dictionaryDefaultProfile) {
  return dictionaryGetPartOfSpeech(word, profile) !== "";
}
