import sharedProperPhrases from "./shared/list-proper-phrases.json";
import { dictionaryCreateProfileModule } from "./profileFactory.js";

const dictionaryModule = dictionaryCreateProfileModule({
  profile: "lite",
  properPhrases: sharedProperPhrases,
});

export const dictionaryDefaultProfile = dictionaryModule.dictionaryDefaultProfile;
export const dictionaryProfilesList = dictionaryModule.dictionaryProfilesList;
export const dictionaryProperPhrases = dictionaryModule.dictionaryProperPhrases;
export const dictionaryNormalizeWord = dictionaryModule.dictionaryNormalizeWord;
export const dictionaryNormalizeProfile = dictionaryModule.dictionaryNormalizeProfile;
export const dictionaryGetProfile = dictionaryModule.dictionaryGetProfile;
export const dictionaryGetProperPhrases = dictionaryModule.dictionaryGetProperPhrases;
export const dictionaryIsNoun = dictionaryModule.dictionaryIsNoun;
export const dictionaryIsVerb = dictionaryModule.dictionaryIsVerb;
export const dictionaryIsAdjective = dictionaryModule.dictionaryIsAdjective;
export const dictionaryIsAdverb = dictionaryModule.dictionaryIsAdverb;
export const dictionaryGetPartOfSpeech = dictionaryModule.dictionaryGetPartOfSpeech;
export const dictionaryIsWord = dictionaryModule.dictionaryIsWord;
