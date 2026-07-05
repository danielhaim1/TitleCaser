import { TitleCaserUtils } from "../src/TitleCaserUtils.js";

describe("TitleCaserUtils – Options", () => {
  test("validateOption should accept only arrays of strings", () => {
    expect(() => TitleCaserUtils.validateOption("articlesList", ["a", "the"])).not.toThrow();
    expect(() => TitleCaserUtils.validateOption("articlesList", "the")).toThrow(TypeError);
    expect(() => TitleCaserUtils.validateOption("articlesList", ["the", 1])).toThrow(TypeError);
  });

  test("validateOptions should validate known option shapes", () => {
    expect(() => TitleCaserUtils.validateOptions({ style: "ap" })).not.toThrow();
    expect(() => TitleCaserUtils.validateOptions({ style: 1 })).toThrow(TypeError);
    expect(() => TitleCaserUtils.validateOptions({ style: "unknown" })).toThrow(TypeError);
    expect(() => TitleCaserUtils.validateOptions({ wordReplacementsList: ["nodejs"] })).not.toThrow();
    expect(() => TitleCaserUtils.validateOptions({ wordReplacementsList: "nodejs" })).toThrow(TypeError);
    expect(() => TitleCaserUtils.validateOptions({ wordReplacementsList: [1] })).toThrow(TypeError);
    expect(() => TitleCaserUtils.validateOptions({ ap: [] })).not.toThrow();
    expect(() => TitleCaserUtils.validateOptions({ unknownOption: [] })).toThrow(TypeError);
  });

  test("getTitleCaseOptions should merge and cache options", () => {
    const defaultOptions = TitleCaserUtils.getTitleCaseOptions();
    const options = TitleCaserUtils.getTitleCaseOptions(
      { style: "ap", smartQuotes: true, replaceTerms: [["api", "API"]] },
      ["via"],
    );
    const cachedOptions = TitleCaserUtils.getTitleCaseOptions(
      { style: "ap", smartQuotes: true, replaceTerms: [["api", "API"]] },
      ["via"],
    );

    expect(defaultOptions.articlesList).toContain("the");
    expect(options).toBe(cachedOptions);
    expect(options.smartQuotes).toBe(true);
    expect(options.articlesList).toContain("the");
    expect(options.articlesList).toContain("via");
    expect(options.replaceTerms).toContainEqual(["api", "API"]);
    expect(options.replaceTerms).toEqual(expect.arrayContaining([expect.objectContaining({ nodejs: "Node.js" })]));
  });
});

describe("TitleCaserUtils – Words", () => {
  test("should identify style-specific lowercase words", () => {
    expect(TitleCaserUtils.capitalizeFirstLetter("title")).toBe("Title");
    expect(TitleCaserUtils.capitalizeFirstLetter("iPhone")).toBe("IPhone");
    expect(TitleCaserUtils.isShortConjunction("and", "ap")).toBe(true);
    expect(TitleCaserUtils.isArticle("the", "ap")).toBe(true);
    expect(TitleCaserUtils.isShortPreposition("on", "ap")).toBe(true);
    expect(TitleCaserUtils.isNeverCapitalized("the", "ap")).toBe(false);
    expect(TitleCaserUtils.isNeverCapitalized("the", "ap")).toBe(false);
    expect(TitleCaserUtils.isShortWord("the", "ap")).toBe(true);
    expect(TitleCaserUtils.isShortWord("development", "ap")).toBe(false);
  });

  test("should validate short-word and word-list helpers", () => {
    expect(() => TitleCaserUtils.isShortWord(1, "ap")).toThrow(TypeError);
    expect(() => TitleCaserUtils.isShortWord("the", "unknown")).toThrow(Error);
    expect(TitleCaserUtils.isWordIgnored("nl2br")).toBe(false);
    expect(TitleCaserUtils.isWordIgnored("the", ["the"])).toBe(true);
    expect(TitleCaserUtils.isWordIgnored("other", ["the"])).toBe(false);
    expect(() => TitleCaserUtils.isWordIgnored("the", "the")).toThrow(TypeError);
    expect(() => TitleCaserUtils.isWordIgnored("", ["the"])).toThrow(TypeError);
    expect(TitleCaserUtils.isWordInArray("aws", ["AWS"])).toBe(true);
    expect(TitleCaserUtils.isWordInArray("aws", "AWS")).toBe(false);
  });
});

describe("TitleCaserUtils – Casing", () => {
  test("should detect uppercase casing patterns", () => {
    expect(TitleCaserUtils.hasUppercaseMultiple("USA")).toBe(true);
    expect(TitleCaserUtils.hasUppercaseMultiple("Us")).toBe(false);
    expect(TitleCaserUtils.hasUppercaseIntentional("iPhone")).toBe(true);
    expect(TitleCaserUtils.hasUppercaseIntentional("USA")).toBe(true);
    expect(TitleCaserUtils.hasUppercaseIntentional("Title")).toBe(false);
    expect(TitleCaserUtils.isEntirelyUppercase("NASA")).toBe(true);
    expect(TitleCaserUtils.isEntirelyUppercase("Title")).toBe(false);
    expect(TitleCaserUtils.casingHasInitialCapital("Donald")).toBe(true);
    expect(TitleCaserUtils.casingHasInitialCapital("donald")).toBe(false);
    expect(TitleCaserUtils.casingHasInitialCapital("123")).toBe(false);
    expect(TitleCaserUtils.casingHasInitialCapital(null)).toBe(false);
  });

  test("should normalize style-specific lowercase words", () => {
    expect(TitleCaserUtils.normalizeCasingForWordByStyle("the", "ap")).toBe("the");
    expect(TitleCaserUtils.normalizeCasingForWordByStyle("development", "ap")).toBe(false);
    expect(TitleCaserUtils.normalizeCasingForWordByStyle("", "ap")).toBe(false);
    expect(TitleCaserUtils.normalizeCasingForWordByStyle("the", "unknown")).toBe(false);
  });
});

describe("TitleCaserUtils – Detectors", () => {
  test("should expose language alphabets and regex patterns", () => {
    expect(TitleCaserUtils.detectorGetSupportedLanguages()).toEqual(expect.arrayContaining(["en", "pl", "ru", "vi"]));
    expect(TitleCaserUtils.detectorGetLanguageAlphabet("pl")).toContain("ł");
    expect(TitleCaserUtils.detectorGetLanguageAlphabet("unknown")).toBe("");
    expect(TitleCaserUtils.detectorGetLanguagePattern("en")).toBeInstanceOf(RegExp);
    expect(TitleCaserUtils.detectorGetLanguagePattern("unknown")).toBe(null);
  });

  test("should detect language-specific words and matches", () => {
    expect(TitleCaserUtils.detectorIsLanguageWord("Title", "en")).toBe(true);
    expect(TitleCaserUtils.detectorIsLanguageWord("Zażółć", "pl")).toBe(true);
    expect(TitleCaserUtils.detectorIsLanguageWord("zażółć", "en")).toBe(false);
    expect(TitleCaserUtils.detectorIsLanguageWord("", "en")).toBe(false);
    expect(TitleCaserUtils.detectorFindLanguageMatches("Hello zażółć мир", "pl")).toEqual(["Hello", "zażółć"]);
    expect(TitleCaserUtils.detectorFindLanguageMatches("", "pl")).toEqual([]);
  });

  test("should score and detect language alphabets", () => {
    const polishScore = TitleCaserUtils.detectorScoreLanguage("Zażółć gęślą jaźń", "pl");
    const englishScore = TitleCaserUtils.detectorScoreLanguage("Zażółć gęślą jaźń", "en");
    const detected = TitleCaserUtils.detectorDetectLanguage("Zażółć gęślą jaźń", ["en", "pl"]);

    expect(polishScore.score).toBeGreaterThan(englishScore.score);
    expect(detected.language).toBe("pl");
    expect(TitleCaserUtils.detectorScoreLanguage("", "en")).toEqual({
      language: "en",
      score: 0,
      matchedLetters: 0,
      totalLetters: 0,
    });
  });

  test("should validate utf-8 byte input and replacement characters", () => {
    expect(TitleCaserUtils.detectorIsUtf8("plain string")).toBe(true);
    expect(TitleCaserUtils.detectorIsUtf8(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f]))).toBe(true);
    expect(TitleCaserUtils.detectorIsUtf8(new Uint8Array([0xc3, 0x28]))).toBe(false);
    expect(TitleCaserUtils.detectorIsUtf8({})).toBe(false);
    expect(TitleCaserUtils.detectorHasUtf8ReplacementCharacter("broken � text")).toBe(true);
    expect(TitleCaserUtils.detectorHasUtf8ReplacementCharacter("clean text")).toBe(false);
  });
});

describe("TitleCaserUtils – Acronyms", () => {
  test("should detect regional acronym context", () => {
    expect(TitleCaserUtils.isRegionalAcronym("us")).toBe(true);
    expect(TitleCaserUtils.isRegionalAcronym("u")).toBe(false);
    expect(() => TitleCaserUtils.isRegionalAcronym(1)).toThrow(TypeError);
    expect(TitleCaserUtils.isRegionalAcronymNoDot("us", "military", "the")).toBe(true);
    expect(TitleCaserUtils.isRegionalAcronymNoDot("us", "military")).toBe(true);
    expect(TitleCaserUtils.isRegionalAcronymNoDot(1, "military")).toBe(false);
    expect(TitleCaserUtils.isRegionalAcronymNoDot("us", 1)).toBe(false);
    expect(TitleCaserUtils.isRegionalAcronymNoDot("us", "banana")).toBe(false);
  });

  test("should normalize and detect final regional acronyms", () => {
    expect(TitleCaserUtils.isFinalWordRegionalAcronym("uk", "the", "from")).toBe(true);
    expect(TitleCaserUtils.isFinalWordRegionalAcronym("uk", "via")).toBe(true);
    expect(TitleCaserUtils.isFinalWordRegionalAcronym("uk", "banana")).toBe(false);
    expect(TitleCaserUtils.isFinalWordRegionalAcronym("xx", "from")).toBe(false);
    expect(TitleCaserUtils.isFinalWordRegionalAcronym(1, "from")).toBe(false);
    expect(TitleCaserUtils.normalizeRegionalAcronym("us")).toBe("US");
    expect(() => TitleCaserUtils.normalizeRegionalAcronym(1)).toThrow(TypeError);
    expect(TitleCaserUtils.normalizeAcronymKey("U.S.")).toBe("us");
  });
});

describe("TitleCaserUtils – Punctuation", () => {
  test("should detect punctuation and symbols", () => {
    expect(TitleCaserUtils.hasNumbers("Title2")).toBe(true);
    expect(TitleCaserUtils.hasNumbers("Title")).toBe(false);
    expect(TitleCaserUtils.hasSuffix("Apple's")).toBe(true);
    expect(TitleCaserUtils.hasSuffix("Apple")).toBe(false);
    expect(TitleCaserUtils.hasApostrophe("O'Connor")).toBe(true);
    expect(TitleCaserUtils.hasApostrophe("OConnor")).toBe(false);
    expect(TitleCaserUtils.hasHyphen("server-side")).toBe(true);
    expect(TitleCaserUtils.hasHyphen("server–side")).toBe(true);
    expect(TitleCaserUtils.hasHyphen("server side")).toBe(false);
    expect(TitleCaserUtils.hasHtmlBreak("nl2br")).toBe(true);
    expect(TitleCaserUtils.hasHtmlBreak("br")).toBe(false);
    expect(TitleCaserUtils.isWordAmpersand("&")).toBe(true);
    expect(TitleCaserUtils.isWordAmpersand("and")).toBe(false);
  });

  test("should detect Roman numerals", () => {
    expect(TitleCaserUtils.hasRomanNumeral("IV")).toBe(true);
    expect(TitleCaserUtils.hasRomanNumeral("Title")).toBe(false);
    expect(TitleCaserUtils.hasRomanNumeral("IV'V")).toBe(true);
    expect(() => TitleCaserUtils.hasRomanNumeral("")).toThrow(TypeError);
    expect(TitleCaserUtils.hasHyphenRomanNumeral("IV-V")).toBe(true);
    expect(TitleCaserUtils.hasHyphenRomanNumeral("IV-Title")).toBe(false);
    expect(() => TitleCaserUtils.hasHyphenRomanNumeral("")).toThrow(TypeError);
  });

  test("should detect and transform special characters", () => {
    expect(TitleCaserUtils.hasUnicodeSymbols("🙂")).toBe(true);
    expect(TitleCaserUtils.hasUnicodeSymbols("abc")).toBe(false);
    expect(TitleCaserUtils.hasCurrencySymbols("₿")).toBe(true);
    expect(TitleCaserUtils.hasCurrencySymbols("$")).toBe(false);
    expect(TitleCaserUtils.startsWithSymbol("@name")).toBe(true);
    expect(TitleCaserUtils.startsWithSymbol("name")).toBe(false);
    expect(TitleCaserUtils.startsWithSymbol("")).toBe(false);
    expect(() => TitleCaserUtils.startsWithSymbol(1)).toThrow(Error);
    expect(TitleCaserUtils.endsWithSymbol("hello!")).toBe(true);
    expect(TitleCaserUtils.endsWithSymbol("hello")).toBe(false);
    expect(() => TitleCaserUtils.endsWithSymbol("hello", "!")).toThrow(Error);
  });

  test("should escape and unescape special characters", () => {
    const escaped = TitleCaserUtils.escapeSpecialCharacters("&<>\"'");

    expect(escaped).toBe("&amp;&lt;&gt;&quot;&#x27;");
    expect(TitleCaserUtils.unescapeSpecialCharacters(escaped)).toBe("&<>\"'");
    expect(TitleCaserUtils.escapeSpecialCharacters("plain")).toBe("plain");
    expect(TitleCaserUtils.unescapeSpecialCharacters("plain")).toBe("plain");
  });
});

describe("TitleCaserUtils – Quotes", () => {
  test("should convert straight quotes to curly quotes", () => {
    expect(TitleCaserUtils.convertQuotesToCurly('"hello"')).toBe("\u201Chello\u201D");
    expect(TitleCaserUtils.convertQuotesToCurly('"hello", she said')).toBe("\u201Chello\u201D, she said");
    expect(TitleCaserUtils.convertQuotesToCurly("it's")).toBe("it\u2019s");
  });
});

describe("TitleCaserUtils – Elisions", () => {
  test("should detect and normalize elided words", () => {
    expect(TitleCaserUtils.isElidedWord("o'connor")).toBe(true);
    expect(TitleCaserUtils.isElidedWord("title")).toBe(false);
    expect(() => TitleCaserUtils.isElidedWord("")).toThrow(TypeError);
    expect(TitleCaserUtils.normalizeElidedWord("o'connor")).toBe("O’Connor");
    expect(TitleCaserUtils.normalizeElidedWord("o'")).toBe("O’");
    expect(TitleCaserUtils.normalizeElidedWord("title")).toBe(false);
    expect(() => TitleCaserUtils.normalizeElidedWord("")).toThrow(TypeError);
  });
});

describe("TitleCaserUtils – Replacements", () => {
  test("should replace mapped terms by lowercase, original, and uppercase keys", () => {
    expect(TitleCaserUtils.replaceTerm("nodejs", { nodejs: "Node.js" })).toBe("Node.js");
    expect(TitleCaserUtils.replaceTerm("NodeJS", { NodeJS: "Node.js" })).toBe("Node.js");
    expect(TitleCaserUtils.replaceTerm("faq", { FAQ: "FAQ" })).toBe("FAQ");
    expect(TitleCaserUtils.replaceTerm("plain", { nodejs: "Node.js" })).toBe("plain");
    expect(() => TitleCaserUtils.replaceTerm("", {})).toThrow(TypeError);
    expect(() => TitleCaserUtils.replaceTerm("nodejs", null)).toThrow(TypeError);
  });

  test("should correct possessive suffixes and known terms", () => {
    expect(TitleCaserUtils.correctSuffix("apple's", ["Apple"])).toBe("Apple's");
    expect(TitleCaserUtils.correctSuffix("banana's", ["Apple"])).toBe("Banana's");
    expect(TitleCaserUtils.correctSuffix("banana", ["Apple"])).toBe("banana");
    expect(() => TitleCaserUtils.correctSuffix("", ["Apple"])).toThrow(TypeError);
    expect(() => TitleCaserUtils.correctSuffix("apple's", [1])).toThrow(TypeError);
    expect(TitleCaserUtils.correctTerm("aws", ["AWS"])).toBe("AWS");
    expect(TitleCaserUtils.correctTerm("server-side", ["Server"])).toBe("Server-Side");
    expect(TitleCaserUtils.correctTerm("o'connor", ["O"])).toBe("O'Connor");
    expect(TitleCaserUtils.correctTerm("node:js", ["Node"], ":")).toBe("Node[Js");
    expect(TitleCaserUtils.correctTerm("node/js", ["Node"], ["/"])).toBe("Node[Js");
    expect(() => TitleCaserUtils.correctTerm("", ["AWS"])).toThrow(TypeError);
    expect(() => TitleCaserUtils.correctTerm("aws", null)).toThrow(TypeError);
    expect(() => TitleCaserUtils.correctTerm("aws", ["AWS"], 1)).toThrow(TypeError);
  });

  test("should correct hyphenated terms by style", () => {
    expect(TitleCaserUtils.correctTermHyphenated("server-side", "chicago")).toBe("Server-Side");
    expect(TitleCaserUtils.correctTermHyphenated("server-side", "ap")).toBe("Server-side");
    expect(TitleCaserUtils.correctTermHyphenated("server-side", "apa")).toBe("Server-Side");
    expect(TitleCaserUtils.correctTermHyphenated("state-of-art", "apa")).toBe("State-of-Art");
    expect(TitleCaserUtils.correctTermHyphenated("server-side", "wikipedia")).toBe("Server-side");
    expect(TitleCaserUtils.correctTermHyphenated("server-side", "unknown")).toBe("server-side");
    expect(TitleCaserUtils.correctTermHyphenated("plain", "ap")).toBe("plain");
    expect(TitleCaserUtils.correctTermHyphenated("us-backed", "ap")).toBe("US-Backed");
    expect(TitleCaserUtils.correctTermHyphenated("iv-v", "chicago")).toBe("IV-V");
    expect(TitleCaserUtils.correctTermHyphenated("aws-backed", "chicago")).toBe("AWS-Backed");
  });
});

describe("TitleCaserUtils – Validation", () => {
  test("should validate primitive config helper shapes", () => {
    expect(TitleCaserUtils.validationIsPlainObject({})).toBe(true);
    expect(TitleCaserUtils.validationIsPlainObject([])).toBe(false);
    expect(TitleCaserUtils.validationIsPlainObject(null)).toBe(false);
    expect(TitleCaserUtils.validationIsStringArray(["a", "b"])).toBe(true);
    expect(TitleCaserUtils.validationIsStringArray(["a", 1])).toBe(false);
    expect(TitleCaserUtils.validationIsReplacementList([{ api: "API" }])).toBe(true);
    expect(TitleCaserUtils.validationIsReplacementList([{ api: "API", apis: "APIs" }])).toBe(false);
    expect(TitleCaserUtils.validationIsPhraseReplacementMap({ "openai research": "OpenAI Research" })).toBe(true);
    expect(TitleCaserUtils.validationIsPhraseReplacementMap({ "openai research": 1 })).toBe(false);
  });

  test("should detect emoji, special characters, HTML, and unsafe controls", () => {
    expect(TitleCaserUtils.validationHasEmoji("hello 😀")).toBe(true);
    expect(TitleCaserUtils.validationHasEmoji("hello")).toBe(false);
    expect(TitleCaserUtils.validationHasSpecialCharacters("hello © world")).toBe(true);
    expect(TitleCaserUtils.validationHasSpecialCharacters("hello, world!")).toBe(false);
    expect(TitleCaserUtils.validationHasHtml("hello <br> world")).toBe(true);
    expect(TitleCaserUtils.validationHasAllowedHtmlOnly("hello <br> world", ["br"])).toBe(true);
    expect(TitleCaserUtils.validationHasAllowedHtmlOnly("hello <iframe></iframe>", ["br"])).toBe(false);
    expect(TitleCaserUtils.validationHasScriptTag("<script>alert(1)</script>")).toBe(true);
    expect(TitleCaserUtils.validationHasHtmlEventHandler('<img src="x" onerror="alert(1)">')).toBe(true);
    expect(TitleCaserUtils.validationHasControlCharacters("hello\u0007world")).toBe(true);
    expect(TitleCaserUtils.validationHasBidiControls("hello\u202Eworld")).toBe(true);
    expect(TitleCaserUtils.validationHasZeroWidthCharacters("hello\u200Bworld")).toBe(true);
  });

  test("should normalize runtime config and validate input security rules", () => {
    const runtimeConfig = TitleCaserUtils.validationCreateRuntimeConfig({
      minTitleLength: 2,
      maxTitleLength: 12,
      security: { rejectZeroWidthCharacters: true },
    });

    expect(runtimeConfig.minTitleChars).toBe(2);
    expect(runtimeConfig.maxTitleChars).toBe(12);
    expect(runtimeConfig.security.allowedHtmlTags).toEqual(["br"]);
    expect(TitleCaserUtils.validationNormalizeQuotes("“hello” and ‘world’")).toBe("\"hello\" and 'world'");
    expect(() => TitleCaserUtils.validationValidateInput("hello", runtimeConfig)).not.toThrow();
    expect(() => TitleCaserUtils.validationValidateInput("this title is too long", runtimeConfig)).toThrow(TypeError);
    expect(() => TitleCaserUtils.validationValidateInput("hello\u200Bworld", runtimeConfig)).toThrow(TypeError);
    expect(() => TitleCaserUtils.validationValidateInput("<script>alert(1)</script>", runtimeConfig)).toThrow(TypeError);
  });
});

describe("TitleCaserUtils – Dictionary", () => {
  test("should identify dictionary words by part of speech", () => {
    expect(TitleCaserUtils.dictionaryNormalizeWord("Duck's!")).toBe("duck");
    expect(TitleCaserUtils.dictionaryNormalizeWord(null)).toBe("");
    expect(TitleCaserUtils.dictionaryIsWord("duck")).toBe(true);
    expect(TitleCaserUtils.dictionaryIsWord("notawordnetword")).toBe(false);
    expect(TitleCaserUtils.dictionaryIsNoun("duck")).toBe(true);
    expect(TitleCaserUtils.dictionaryIsVerb("run")).toBe(true);
    expect(TitleCaserUtils.dictionaryIsAdjective("beautiful")).toBe(true);
    expect(TitleCaserUtils.dictionaryIsAdverb("quickly")).toBe(true);
    expect(TitleCaserUtils.dictionaryGetPartOfSpeech("duck")).toContain("n");
    expect(TitleCaserUtils.dictionaryGetPartOfSpeech("good")).toContain("a");
    expect(TitleCaserUtils.dictionaryGetPartOfSpeech("good")).toContain("r");
    expect(TitleCaserUtils.dictionaryCapitalizeNameToken("mcfly")).toBe("McFly");
    expect(TitleCaserUtils.dictionaryCapitalizeNameToken("o'connor")).toBe("O'Connor");
  });

  test("should resolve dictionary words through configured profiles", () => {
    expect(TitleCaserUtils.dictionaryGetProfilesList()).toEqual(["lite", "full"]);
    expect(TitleCaserUtils.dictionaryNormalizeProfile("unknown")).toBe("full");
    expect(TitleCaserUtils.dictionaryIsWord("quickly", "lite")).toBe(false);
    expect(TitleCaserUtils.dictionaryIsAdverb("quickly", "full")).toBe(true);
    expect(TitleCaserUtils.dictionaryIsNoun("taco", "full")).toBe(true);
    expect(TitleCaserUtils.dictionaryGetPartOfSpeech("duck", "lite")).toBe("");
    expect(TitleCaserUtils.dictionaryGetPartOfSpeech("duck", "full")).toBe("nv");
  });

  test("should match and normalize known proper phrases", () => {
    const tokens = ["donald", " ", "duck"];

    expect(TitleCaserUtils.dictionaryIsPhraseWordToken("donald")).toBe(true);
    expect(TitleCaserUtils.dictionaryIsPhraseWordToken("!")).toBe(false);
    expect(TitleCaserUtils.dictionaryIsPhraseWordToken(null)).toBe(false);
    expect(TitleCaserUtils.dictionaryMatchesProperPhrase(tokens, 0, ["donald", "duck"])).toBe(2);
    expect(TitleCaserUtils.dictionaryMatchesProperPhrase(tokens, 0, ["donald", "smith"])).toBe(null);
    expect(TitleCaserUtils.dictionaryMatchesProperPhrase(["donald", "-", "duck"], 0, ["donald", "duck"])).toBe(null);
    expect(TitleCaserUtils.dictionaryNormalizeKnownProperPhrases("donald duck met john smith")).toBe(
      "Donald Duck met John Smith",
    );
    expect(TitleCaserUtils.dictionaryNormalizeKnownProperPhrases("! donald duck")).toBe("! Donald Duck");
    expect(TitleCaserUtils.dictionaryNormalizeKnownProperPhrases("donald duck", "lite")).toBe("Donald Duck");
  });

  test("should detect likely entity phrases without treating every common capitalized phrase as an entity", () => {
    const capitalizedUnknownEntity = ["Qelvorn", " ", "Project"];
    const capitalizedCommonPhrase = ["Surprise", " ", "Guest"];
    const lowercaseUnknownCommonPhrase = ["the", " ", "qelvorn", " ", "project"];
    const punctuatedKnownName = ["guest", ",", " ", "donald", " ", "duck"];

    expect(TitleCaserUtils.dictionaryGetLikelyEntityPhraseMatch(capitalizedUnknownEntity, 0)).toBe(2);
    expect(TitleCaserUtils.dictionaryGetLikelyEntityPhraseMatch(capitalizedCommonPhrase, 0)).toBe(null);
    expect(TitleCaserUtils.dictionaryGetLikelyEntityPhraseMatch(lowercaseUnknownCommonPhrase, 2)).toBe(null);
    expect(TitleCaserUtils.dictionaryGetLikelyEntityPhraseMatch(punctuatedKnownName, 3)).toBe(5);
  });

  test("should normalize likely entity phrases while leaving ordinary unknown lowercase phrases alone", () => {
    expect(TitleCaserUtils.dictionaryNormalizeKnownProperPhrases("Qelvorn Project met Saoirse Ronan")).toBe(
      "Qelvorn Project met Saoirse Ronan",
    );
    expect(TitleCaserUtils.dictionaryNormalizeKnownProperPhrases("the qelvorn project was delayed")).toBe(
      "the qelvorn project was delayed",
    );
    expect(TitleCaserUtils.dictionaryNormalizeKnownProperPhrases("guest, donald duck")).toBe(
      "guest, Donald Duck",
    );
  });

  test("should match and normalize generated dictionary proper phrases", () => {
    expect(TitleCaserUtils.dictionaryNormalizeKnownProperPhrases("academy award and abstract expressionism")).toBe(
      "Academy Award and Abstract Expressionism",
    );
    expect(TitleCaserUtils.dictionaryNormalizeKnownProperPhrases("plain title")).toBe("plain title");
    expect(TitleCaserUtils.dictionaryNormalizeKnownProperPhrases("! academy award")).toBe("! Academy Award");
    expect(TitleCaserUtils.dictionaryNormalizeKnownProperPhrases("academy award", "lite")).toBe("Academy Award");
  });
});
