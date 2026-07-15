import { TitleCaser } from "../src/TitleCaser.js";
import {
  TITLE_CASER_CONFIG_DEFAULTS,
  TitleCaserConfig,
} from "../src/TitleCaserConfig.js";
import { TitleCaserUtils } from "../src/TitleCaserUtils.js";
import {
  dictionaryGetProfile,
  dictionaryGetProperPhrases,
  dictionaryIsAdjective,
  dictionaryIsNoun,
  dictionaryIsVerb,
  dictionaryIsWord,
} from "../src/data/dictionary/index.js";

const { createBundledProfileTitleCaser } = require("../testHelpers/profileTestHelper");

function createCompleteValidationConfig(overrides = {}) {
  return {
    ...TITLE_CASER_CONFIG_DEFAULTS,
    ...overrides,
    security: {
      ...TITLE_CASER_CONFIG_DEFAULTS.security,
      ...(overrides.security || {}),
    },
  };
}

describe("Coverage – public entrypoint side effects", () => {
  let originalToTitleCaseDescriptor;
  let originalWindowTitleCaser;

  beforeEach(() => {
    originalToTitleCaseDescriptor = Object.getOwnPropertyDescriptor(String.prototype, "toTitleCase");
    originalWindowTitleCaser = window.TitleCaser;
    delete String.prototype.toTitleCase;
    delete window.TitleCaser;
  });

  afterEach(() => {
    delete String.prototype.toTitleCase;

    if (originalToTitleCaseDescriptor) {
      Object.defineProperty(String.prototype, "toTitleCase", originalToTitleCaseDescriptor);
    }

    if (originalWindowTitleCaser) {
      window.TitleCaser = originalWindowTitleCaser;
    } else {
      delete window.TitleCaser;
    }
  });

  test("installs the string helper and browser export when missing", () => {
    jest.isolateModules(() => {
      const exported = require("../index.js");

      expect("hello world".toTitleCase({ style: "ap" })).toBe("Hello World");
      expect(window.TitleCaser).toBe(exported.TitleCaser);
    });
  });
});

describe("Coverage – TitleCaser defensive and rare branches", () => {
  test("logs debug warnings only when debug mode is enabled", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const debugTitleCaser = new TitleCaser({ debug: true });
    const quietTitleCaser = new TitleCaser();

    debugTitleCaser.logWarning("debug branch");
    quietTitleCaser.logWarning("quiet branch");

    expect(warnSpy).toHaveBeenCalledWith("Warning: debug branch");
    expect(warnSpy).toHaveBeenCalledTimes(1);
    warnSpy.mockRestore();
  });

  test("handles replacement terms inside hyphenated tokens", () => {
    const titleCaser = new TitleCaser({ style: "ap" });
    titleCaser.setReplaceTerms([{ ai: "AI" }]);

    expect(titleCaser.toTitleCase("inside an ai-led plan")).toBe("Inside an AI-Led Plan");
  });

  test("preserves dictionary names before trailing punctuation and tokens with numbers", () => {
    const titleCaser = new TitleCaser({ style: "ap" });

    expect(titleCaser.toTitleCase("donald, version 2fast")).toBe("Donald, Version 2fast");
  });

  test("normalizes regional acronyms in first-word contexts", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const titleCaser = new TitleCaser({ style: "ap", debug: true });

    expect(titleCaser.toTitleCase("us military planning")).toBe("US Military Planning");
    expect(warnSpy).toHaveBeenCalledWith("Warning: firstWord is a regional acronym: Us");
    warnSpy.mockRestore();
  });

  test("skips malformed phrase replacement entries found after construction", () => {
    const titleCaser = new TitleCaser({ style: "ap" });
    titleCaser.phraseReplacementMap[""] = "Empty Phrase";
    titleCaser.phraseReplacementMap["a".repeat(501)] = "Too Long";
    titleCaser.phraseReplacementMap["broken phrase"] = 1;

    expect(titleCaser.toTitleCase("broken phrase should not throw")).toBe("Broken Phrase Should Not Throw");
  });

  test("wraps non-Error exceptions raised during conversion", () => {
    const originalValidateInput = TitleCaserUtils.validationValidateInput;
    TitleCaserUtils.validationValidateInput = () => {
      throw "string failure";
    };

    expect(() => new TitleCaser().toTitleCase("hello world")).toThrow("string failure");
    TitleCaserUtils.validationValidateInput = originalValidateInput;
  });

  test("validates replacement mutation methods", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const titleCaser = new TitleCaser();

    expect(() => titleCaser.setReplaceTerms("bad")).toThrow(TypeError);
    titleCaser.setReplaceTerms([null]);
    expect(warnSpy).toHaveBeenCalledWith("Invalid entry in terms array:", null);

    titleCaser.wordReplacementsList = Array.from({ length: 2001 }, (_, index) => ({ [`term${index}`]: "Term" }));
    expect(() => titleCaser.setReplaceTerms([])).toThrow("Too many replacement rules.");

    titleCaser.wordReplacementsList = Array.from({ length: 2000 }, (_, index) => ({ [`term${index}`]: "Term" }));
    expect(() => titleCaser.addReplaceTerm("overflow", "Overflow")).toThrow("Too many replacement rules.");

    expect(() => titleCaser.addReplaceTerm("term", 1)).toThrow(TypeError);
    expect(() => titleCaser.removeReplaceTerm(1)).toThrow(TypeError);
    expect(() => titleCaser.removeReplaceTerm("missing")).toThrow("Term 'missing' not found");
    warnSpy.mockRestore();
  });

  test("validates exact phrase replacement and style mutation inputs", () => {
    const titleCaser = new TitleCaser();

    expect(() => titleCaser.addExactPhraseReplacements("bad")).toThrow(TypeError);
    expect(() => titleCaser.addExactPhraseReplacements([{ phrase: 1 }])).toThrow(TypeError);
    expect(() => titleCaser.addExactPhraseReplacements([{ good: "Good", bad: 1 }])).toThrow(TypeError);
    expect(() => titleCaser.addExactPhraseReplacements([1])).toThrow(TypeError);
    expect(() => titleCaser.setStyle(1)).toThrow(TypeError);
  });
});

describe("Coverage – config aliases and cloning", () => {
  test("clones replaceTerms into config instances and exported options", () => {
    const config = new TitleCaserConfig({
      replaceTerms: [["api", "API"]],
    });
    const options = config.toTitleCaserOptions();

    expect(config.replaceTerms).toEqual([["api", "API"]]);
    expect(options.replaceTerms).toEqual([["api", "API"]]);

    config.replaceTerms[0][1] = "Mutated";
    expect(options.replaceTerms).toEqual([["api", "API"]]);
  });
});

describe("Coverage – dictionary data and entity helpers", () => {
  test("exercises dictionary profile accessors and unknown profile fallback", () => {
    expect(dictionaryGetProfile("lite").nouns).toEqual([]);
    expect(dictionaryGetProperPhrases("unknown")).toEqual(expect.objectContaining({
      "academy award": "Academy Award",
    }));
    expect(dictionaryIsNoun("duck")).toBe(true);
    expect(dictionaryIsVerb("run")).toBe(true);
    expect(dictionaryIsAdjective("beautiful")).toBe(true);
    expect(dictionaryIsWord("notawordnetword")).toBe(false);
  });

  test("scores wikipedia casing decisions across empty, common, and entity-like inputs", () => {
    expect(TitleCaserUtils.dictionaryGetWikipediaCasingDecision({ originalWord: "!!!" })).toEqual({
      commonWordScore: 0,
      entityScore: 0,
      shouldPreserve: false,
    });

    const commonDecision = TitleCaserUtils.dictionaryGetWikipediaCasingDecision({
      originalWord: "economic",
      previousTwoOriginalWord: "public",
      previousOriginalWord: "policy",
      nextOriginalWord: "growth",
    });
    const entityDecision = TitleCaserUtils.dictionaryGetWikipediaCasingDecision({
      originalWord: "Qelvorn",
      nextOriginalWord: "Atlas",
    });

    expect(commonDecision.commonWordScore).toBeGreaterThan(commonDecision.entityScore);
    expect(entityDecision.shouldPreserve).toBe(true);
  });

  test("matches entity phrases at boundaries and rejects single-token entities", () => {
    expect(TitleCaserUtils.dictionaryIsEntityBlocklistedWord("a")).toBe(true);
    expect(TitleCaserUtils.dictionaryIsGenericEntityHeadWord("project")).toBe(true);
    expect(TitleCaserUtils.dictionaryIsLikelyNameContinuation("Smith")).toBe(true);
    expect(TitleCaserUtils.dictionaryGetProfile("lite").nouns).toEqual([]);
    expect(TitleCaserUtils.dictionaryGetLikelyEntityPhraseMatch(["!"], 0)).toBe(null);
    expect(TitleCaserUtils.dictionaryGetLikelyEntityPhraseMatch(["qelvorn", " ", "Project"], 0)).toBe(2);
    expect(TitleCaserUtils.dictionaryGetLikelyEntityPhraseMatch(["Qelvorn"], 0)).toBe(null);
  });
});

describe("Coverage – detector edge cases", () => {
  test("validates multi-byte UTF-8 byte sequences and rejection cases", () => {
    expect(TitleCaserUtils.detectorIsUtf8(new Uint8Array([0xe2, 0x82, 0xac]))).toBe(true);
    expect(TitleCaserUtils.detectorIsUtf8(new Uint8Array([0xf0, 0x9f, 0x98, 0x80]))).toBe(true);
    expect(TitleCaserUtils.detectorIsUtf8(new Uint8Array([0xc2]))).toBe(false);
    expect(TitleCaserUtils.detectorIsUtf8(new Uint8Array([0xe0, 0x80, 0x80]))).toBe(false);
    expect(TitleCaserUtils.detectorIsUtf8(new Uint8Array([0xed, 0xa0, 0x80]))).toBe(false);
    expect(TitleCaserUtils.detectorIsUtf8(new Uint8Array([0xf4, 0x90, 0x80, 0x80]))).toBe(false);
    expect(TitleCaserUtils.detectorIsUtf8(new Uint8Array([0xff]))).toBe(false);
  });

  test("scores unsupported languages and text without letters", () => {
    expect(TitleCaserUtils.detectorScoreLanguage("hello", "unknown")).toEqual({
      language: "unknown",
      score: 0,
      matchedLetters: 0,
      totalLetters: 5,
    });
    expect(TitleCaserUtils.detectorScoreLanguage("123", "en")).toEqual({
      language: "en",
      score: 0,
      matchedLetters: 0,
      totalLetters: 0,
    });
  });

  test("detects final regional acronyms after small linking words", () => {
    expect(TitleCaserUtils.isFinalWordRegionalAcronym("uk", "the", "via")).toBe(true);
  });
});

describe("Coverage – validation boundaries", () => {
  test("covers invalid validation helper boundaries", () => {
    expect(TitleCaserUtils.validationIsReplacementList("bad")).toBe(false);
    expect(TitleCaserUtils.validationIsReplacementList([{ api: "API" }], 0)).toBe(false);
    expect(TitleCaserUtils.validationIsPhraseReplacementMap({ phrase: "Phrase" }, 0)).toBe(false);
    expect(TitleCaserUtils.validationHasAllowedHtmlOnly("hello < 3 > world", ["br"])).toBe(false);
    expect(TitleCaserUtils.validationNormalizeQuotes(null)).toBe(null);
    expect(() => TitleCaserUtils.validationCreateRuntimeConfig(null)).toThrow(TypeError);
    expect(() => TitleCaserUtils.validationValidateConfig(null)).toThrow(TypeError);

    try {
      TitleCaserUtils.validationValidateConfig(createCompleteValidationConfig({
        security: { custom: true },
      }));
    } catch (error) {
      expect(error.message).toContain("security.custom");
    }

    try {
      TitleCaserUtils.validationValidateConfig(createCompleteValidationConfig({
        security: { allowedHtmlTags: [1] },
      }));
    } catch (error) {
      expect(error.message).toContain("security.allowedHtmlTags");
    }

    const originalIsPlainObject = TitleCaserUtils.validationIsPlainObject;
    TitleCaserUtils.validationIsPlainObject = (value) => {
      if (value && value.forceInvalidSecurityObject) return false;
      return originalIsPlainObject(value);
    };

    try {
      TitleCaserUtils.validationValidateConfig(createCompleteValidationConfig({
        security: { forceInvalidSecurityObject: true },
      }));
    } catch (error) {
      expect(error.message).toContain("security must be an object");
    } finally {
      TitleCaserUtils.validationIsPlainObject = originalIsPlainObject;
    }
  });

  test("covers direct input validation failures", () => {
    expect(() => TitleCaserUtils.validationValidateInput(1)).toThrow("input must be a string");
    expect(() => TitleCaserUtils.validationValidateInput("")).toThrow("input must not be empty");
    expect(() => TitleCaserUtils.validationValidateInput("a", { minTitleChars: 2 })).toThrow("at least 2 characters");
    expect(() => TitleCaserUtils.validationValidateInput("hello 😀", { allowEmojis: false })).toThrow("emojis");
    expect(() => TitleCaserUtils.validationValidateInput("hello ©", { allowSpecialCharacters: false })).toThrow(
      "special characters",
    );
  });
});

describe("Coverage – profile helper defensive branch", () => {
  test("rejects unsupported bundled dictionary profiles", () => {
    expect(() => createBundledProfileTitleCaser("unknown")).toThrow("Unsupported bundled profile");
  });
});
