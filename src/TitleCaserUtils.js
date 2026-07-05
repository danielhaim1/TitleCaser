import { acronymsExtendTitleCaserUtils } from "./utils/acronyms/acronymsTitleCaserUtils.js";
import { casingExtendTitleCaserUtils } from "./utils/casing/casingTitleCaserUtils.js";
import { detectorsExtendTitleCaserUtils } from "./utils/detectors/detectorsTitleCaserUtils.js";
import { dictionaryExtendTitleCaserUtils } from "./utils/dictionary/dictionaryTitleCaserUtils.js";
import { elisionsExtendTitleCaserUtils } from "./utils/elisions/elisionsTitleCaserUtils.js";
import { optionsExtendTitleCaserUtils } from "./utils/options/optionsTitleCaserUtils.js";
import { punctuationExtendTitleCaserUtils } from "./utils/punctuation/punctuationTitleCaserUtils.js";
import { quotesExtendTitleCaserUtils } from "./utils/quotes/quotesTitleCaserUtils.js";
import { replacementsExtendTitleCaserUtils } from "./utils/replacements/replacementsTitleCaserUtils.js";
import { validationExtendTitleCaserUtils } from "./utils/validation/validationTitleCaserUtils.js";
import { wordsExtendTitleCaserUtils } from "./utils/words/wordsTitleCaserUtils.js";

export class TitleCaserUtils {}

const titleCaserUtilityExtensions = [
  optionsExtendTitleCaserUtils,
  wordsExtendTitleCaserUtils,
  casingExtendTitleCaserUtils,
  detectorsExtendTitleCaserUtils,
  acronymsExtendTitleCaserUtils,
  punctuationExtendTitleCaserUtils,
  quotesExtendTitleCaserUtils,
  elisionsExtendTitleCaserUtils,
  replacementsExtendTitleCaserUtils,
  dictionaryExtendTitleCaserUtils,
  validationExtendTitleCaserUtils,
];

titleCaserUtilityExtensions.forEach((extendTitleCaserUtils) => {
  extendTitleCaserUtils(TitleCaserUtils);
});
