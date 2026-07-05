const emptyList = Object.freeze([]);
const dictionaryProfilesList = Object.freeze(["lite", "full"]);

export function dictionaryCreateProfileModule({
  profile,
  nouns = emptyList,
  verbs = emptyList,
  adjectives = emptyList,
  adverbs = emptyList,
  properPhrases = Object.freeze({}),
}) {
  const dictionaryProfileData = Object.freeze({
    [profile]: Object.freeze({
      nouns,
      verbs,
      adjectives,
      adverbs,
      properPhrases,
    }),
  });
  const dictionaryProfileSetCache = new Map();

  function dictionaryNormalizeWord(word) {
    if (typeof word !== "string") return "";

    return word
      .toLowerCase()
      .replace(/^[^a-z]+|[^a-z'-]+$/gi, "")
      .replace(/'s$/i, "");
  }

  function dictionaryNormalizeProfile() {
    return profile;
  }

  function dictionaryGetProfile() {
    return dictionaryProfileData[profile];
  }

  function dictionaryGetProperPhrases() {
    return dictionaryGetProfile().properPhrases;
  }

  function dictionaryGetProfileSets() {
    if (!dictionaryProfileSetCache.has(profile)) {
      const profileData = dictionaryGetProfile();
      dictionaryProfileSetCache.set(profile, {
        nouns: new Set(profileData.nouns),
        verbs: new Set(profileData.verbs),
        adjectives: new Set(profileData.adjectives),
        adverbs: new Set(profileData.adverbs),
      });
    }

    return dictionaryProfileSetCache.get(profile);
  }

  function dictionaryIsNoun(word) {
    return dictionaryGetProfileSets().nouns.has(dictionaryNormalizeWord(word));
  }

  function dictionaryIsVerb(word) {
    return dictionaryGetProfileSets().verbs.has(dictionaryNormalizeWord(word));
  }

  function dictionaryIsAdjective(word) {
    return dictionaryGetProfileSets().adjectives.has(dictionaryNormalizeWord(word));
  }

  function dictionaryIsAdverb(word) {
    return dictionaryGetProfileSets().adverbs.has(dictionaryNormalizeWord(word));
  }

  function dictionaryGetPartOfSpeech(word) {
    const normalizedWord = dictionaryNormalizeWord(word);
    const profileSets = dictionaryGetProfileSets();
    let partOfSpeech = "";

    if (profileSets.nouns.has(normalizedWord)) partOfSpeech += "n";
    if (profileSets.verbs.has(normalizedWord)) partOfSpeech += "v";
    if (profileSets.adjectives.has(normalizedWord)) partOfSpeech += "a";
    if (profileSets.adverbs.has(normalizedWord)) partOfSpeech += "r";

    return partOfSpeech;
  }

  function dictionaryIsWord(word) {
    return dictionaryGetPartOfSpeech(word) !== "";
  }

  return {
    dictionaryDefaultProfile: profile,
    dictionaryProfilesList,
    dictionaryProperPhrases: properPhrases,
    dictionaryNormalizeWord,
    dictionaryNormalizeProfile,
    dictionaryGetProfile,
    dictionaryGetProperPhrases,
    dictionaryIsNoun,
    dictionaryIsVerb,
    dictionaryIsAdjective,
    dictionaryIsAdverb,
    dictionaryGetPartOfSpeech,
    dictionaryIsWord,
  };
}
