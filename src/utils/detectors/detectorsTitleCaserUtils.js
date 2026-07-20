const detectorLanguagePatterns = {
  en: "[A-Za-z]+",
  pl: "[A-Za-zęĘóÓąĄśŚłŁżŻźŹćĆńŃ]+",
  ru: "[АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя]+",
  uk: "[АаБбВвГгҐґДдЕеЄєЖжЗзИиІіЇїЙйКкЛлМмНнОоПпРрСсТУуФфХхЦцЧчШшЩщЬЮюЯя]+",
  tr: "[a-zA-ZçÇğĞüÜöÖşŞıİ]+",
  es: "[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+",
  pt: "[a-zA-ZãáàâçéêíõóôúüÃÁÀÂÇÉÊÍÕÓÔÚÜ]+",
  cs: "[AÁBCČDĎEÉĚFGHIÍJKLMNŇOÓPQRŘSŠTŤUÚŮVWXYÝZŽaábcčdďeéěfghiíjklmnňoópqrřsštťuúůvwxyýzž]+",
  el: "[α-ωΑ-ΩίϊΐόάέύϋΰήώΊΪΌΆΈΎΫΉΏ]+",
  it: "[a-zA-ZãáàâçéêíõóôúüÃÁÀÂÇÉÊÍÕÓÔÚÜ]+",
  fr: "[a-zA-ZãáàâçéêíõóôúüÃÁÀÂÇÉÊÍÕÓÔÚÜ]+",
  vi: "[a-zA-ZàáạảãÀÁẠẢÃằắặẳẵẰẮẶẲẴầấậẩẫẦẤẬẨẪèéẹẻẽÈÉẸẺẼềếệểễỀẾỆỂỄìíịỉĩÌÍỊỈĨòóọỏõÒÓỌỎÕồốộổỗỒỐỘỔỖờớợởỡỜỚỢỞỠùúụủũÙÚỤỦŨừứựửữỪỨỰỬỮỳýỵỷỹỲÝỴỶỸ]+",
};

const detectorLanguageAlphabets = {
  en: "abcdefghijklmnopqrstuvwxyz",
  pl: "abcdefghijklmnopqrstuvwxyzęóąśłżźćń",
  ru: "шиюынжсяплзухтвкйеобмцьёгдщэарчфъ",
  uk: "фагксщроємшплуьцнжхїйювязтибґідеч",
  tr: "abcçdefgğhıijklmnoöprsştuüvyzqwxÇĞİÜÖ",
  es: "abcdefghijklmnopqrstuvwxyzáéíóúüñ",
  pt: "abcdefghijklmnopqrstuvwxyzãáàâçéêíõóôúü",
  cs: "aábcčdďeéěfghiíjklmnňoópqrřsštťuúůvwxyýzž",
  el: "αβγδεζηθικλμνξοπρςτυφχψωίϊΐόάέύϋΰήώ",
  it: "abcdefghijklmnopqrstuvwxzyãáàâçéêíõóôúü",
  fr: "abcdefghijklmnopqrstuvwxzyãáàâçéêíõóôúü",
  vi: "aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz",
};

function detectorNormalizeLanguage(language) {
  return typeof language === "string" ? language.toLowerCase() : "";
}

function detectorGetPatternSource(language) {
  return detectorLanguagePatterns[detectorNormalizeLanguage(language)] || "";
}

function detectorGetAlphabetSet(language) {
  const alphabet = detectorLanguageAlphabets[detectorNormalizeLanguage(language)] || "";

  return new Set(alphabet.toLowerCase().split(""));
}

function detectorGetLetterCharacters(value) {
  return String(value).match(/\p{L}/gu) || [];
}

function detectorIsValidUtf8Bytes(bytes) {
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i];

    if (byte <= 0x7f) continue;

    let continuationBytes = 0;
    let minimumCodePoint = 0;
    let codePoint = 0;

    if (byte >= 0xc2 && byte <= 0xdf) {
      continuationBytes = 1;
      minimumCodePoint = 0x80;
      codePoint = byte & 0x1f;
    } else if (byte >= 0xe0 && byte <= 0xef) {
      continuationBytes = 2;
      minimumCodePoint = 0x800;
      codePoint = byte & 0x0f;
    } else if (byte >= 0xf0 && byte <= 0xf4) {
      continuationBytes = 3;
      minimumCodePoint = 0x10000;
      codePoint = byte & 0x07;
    } else {
      return false;
    }

    if (i + continuationBytes >= bytes.length) return false;

    for (let j = 0; j < continuationBytes; j++) {
      const continuationByte = bytes[++i];
      if ((continuationByte & 0xc0) !== 0x80) return false;
      codePoint = (codePoint << 6) | (continuationByte & 0x3f);
    }

    if (codePoint < minimumCodePoint) return false;
    if (codePoint >= 0xd800 && codePoint <= 0xdfff) return false;
    if (codePoint > 0x10ffff) return false;
  }

  return true;
}

export function detectorsExtendTitleCaserUtils(TitleCaserUtils) {
  Object.defineProperties(TitleCaserUtils, {
    // Get the language codes supported by the detector helpers
    detectorGetSupportedLanguages: {
      value() {
        return Object.keys(detectorLanguagePatterns);
      },
    },

    // Get the configured alphabet for a language
    detectorGetLanguageAlphabet: {
      value(language) {
        return detectorLanguageAlphabets[detectorNormalizeLanguage(language)] || "";
      },
    },

    // Get a reusable word-matching regex for a language
    detectorGetLanguagePattern: {
      value(language, flags = "gu") {
        const patternSource = detectorGetPatternSource(language);

        return patternSource ? new RegExp(patternSource, flags) : null;
      },
    },

    // Check if a full word matches the configured language alphabet
    detectorIsLanguageWord: {
      value(word, language) {
        if (typeof word !== "string" || !word) return false;

        const patternSource = detectorGetPatternSource(language);
        if (!patternSource) return false;

        return new RegExp(`^(?:${patternSource})$`, "u").test(word);
      },
    },

    // Find language-specific word matches inside text
    detectorFindLanguageMatches: {
      value(text, language) {
        if (typeof text !== "string" || !text) return [];

        const pattern = TitleCaserUtils.detectorGetLanguagePattern(language, "gu");
        return pattern ? text.match(pattern) || [] : [];
      },
    },

    // Score how much of the letter content belongs to a language alphabet
    detectorScoreLanguage: {
      value(text, language) {
        if (typeof text !== "string" || !text) {
          return { language: detectorNormalizeLanguage(language), score: 0, matchedLetters: 0, totalLetters: 0 };
        }

        const alphabetSet = detectorGetAlphabetSet(language);
        const letters = detectorGetLetterCharacters(text);

        if (!alphabetSet.size || !letters.length) {
          return { language: detectorNormalizeLanguage(language), score: 0, matchedLetters: 0, totalLetters: letters.length };
        }

        const matchedLetters = letters.filter((letter) => alphabetSet.has(letter.toLowerCase())).length;

        return {
          language: detectorNormalizeLanguage(language),
          score: matchedLetters / letters.length,
          matchedLetters,
          totalLetters: letters.length,
        };
      },
    },

    // Pick the best language detector score for a text
    detectorDetectLanguage: {
      value(text, languages = TitleCaserUtils.detectorGetSupportedLanguages()) {
        const scores = languages
          .map((language) => TitleCaserUtils.detectorScoreLanguage(text, language))
          .sort((a, b) => b.score - a.score || b.matchedLetters - a.matchedLetters);

        return scores[0] || { language: "", score: 0, matchedLetters: 0, totalLetters: 0 };
      },
    },

    // Check whether raw bytes can be decoded as valid UTF-8
    detectorIsUtf8: {
      value(value) {
        if (typeof value === "string") return true;

        const bytes = value instanceof ArrayBuffer
          ? new Uint8Array(value)
          : ArrayBuffer.isView(value)
            ? new Uint8Array(value.buffer, value.byteOffset, value.byteLength)
            : null;

        return bytes ? detectorIsValidUtf8Bytes(bytes) : false;
      },
    },

    // Check if a string already contains the Unicode replacement character
    detectorHasUtf8ReplacementCharacter: {
      value(value) {
        return typeof value === "string" && value.includes("\uFFFD");
      },
    },

    // Check whether a token ends a sentence for Wikipedia sentence-case behavior
    isSentenceBoundaryToken: {
      value(token, nextToken = "", previousToken = "") {
        if (!token || typeof token !== "string") {
          return false;
        }

        const trailingClosingPunctuation = TitleCaserUtils.getTrailingClosingPunctuation(token);
        const tokenWithoutClosingPunctuation = trailingClosingPunctuation
          ? token.slice(0, -trailingClosingPunctuation.length)
          : token;
        const hasEndingSentencePunctuation = /[.!?]$/.test(tokenWithoutClosingPunctuation);
        const hasAbbreviationLikePeriods = /^([A-Za-z]\.){2,}$/i.test(tokenWithoutClosingPunctuation);
        const hasSingleLetterOrSyllableAbbreviation = /^[A-Za-z]{1,2}\.$/.test(tokenWithoutClosingPunctuation);
        const isClosingQuotedToken = /["'”’«»‹›]+$/.test(token);
        const nextWordLeadingOpeningPunctuation = nextToken
          ? TitleCaserUtils.getLeadingOpeningPunctuation(nextToken)
          : "";
        const nextWordStartsWithQuote = nextWordLeadingOpeningPunctuation.length > 0;
        const previousTokenHasClosingPunctuation = previousToken
          ? /[.!?]$/.test(
              (TitleCaserUtils.getTrailingClosingPunctuation(previousToken)
                ? previousToken.slice(0, -TitleCaserUtils.getTrailingClosingPunctuation(previousToken).length)
                : previousToken
              )
            )
          : false;
        const previousTokenHasSentenceEnding = previousTokenHasClosingPunctuation;

        if (!hasEndingSentencePunctuation) {
          return false;
        }

        if (isClosingQuotedToken && /[.!?]$/.test(tokenWithoutClosingPunctuation)) {
          if (!nextWordStartsWithQuote) {
            return previousTokenHasSentenceEnding;
          }

          return true;
        }

        return hasEndingSentencePunctuation &&
          !hasAbbreviationLikePeriods &&
          !hasSingleLetterOrSyllableAbbreviation;
      },
    },
  });
}
