import { TitleCaser } from "../src/TitleCaser.js";
import {
  TitleCaserConfig,
  createTitleCaserConfig,
  TITLE_CASER_CONFIG_DEFAULTS,
} from "../src/TitleCaserConfig.js";
import { TitleCaserUtils } from "../src/TitleCaserUtils.js";
import regionalAcronyms from "../src/data/acronyms/list-regional-acronym-rules.json";
import { englishTermDataList } from "../src/data/terms/index.js";

describe("TitleCaser Hygiene – Config", () => {
  test("should create default options that can be passed into TitleCaser", () => {
    const config = new TitleCaserConfig();
    const titleCaser = new TitleCaser(config.toTitleCaserOptions());

    expect(config.minTitleChars).toBe(TITLE_CASER_CONFIG_DEFAULTS.minTitleChars);
    expect(config.maxTitleChars).toBe(TITLE_CASER_CONFIG_DEFAULTS.maxTitleChars);
    expect(config.minTitleLength).toBe(TITLE_CASER_CONFIG_DEFAULTS.minTitleLength);
    expect(config.maxTitleLength).toBe(TITLE_CASER_CONFIG_DEFAULTS.maxTitleLength);
    expect(config.style).toBe("ap");
    expect(config.dictionaryProfile).toBe("full");
    expect(titleCaser.toTitleCase("the future of devops")).toBe("The Future of DevOps");
  });

  test("should validate title length without mutating title content", () => {
    const config = new TitleCaserConfig({ minTitleChars: 5, maxTitleChars: 12 });

    expect(config.isTitleLengthValid("tiny")).toBe(false);
    expect(config.isTitleLengthValid("valid title")).toBe(true);
    expect(config.isTitleLengthValid("this title is too long")).toBe(false);
    expect(config.isTitleLengthValid(null)).toBe(false);
  });

  test("should pass ignore list, phrase replacements, and word replacements into TitleCaser", () => {
    const config = createTitleCaserConfig({
      ignoreList: ["custom"],
      phraseReplacementList: {
        "openai research": "OpenAI Research",
      },
      wordReplacementsList: [
        { api: "API" },
      ],
    });

    const options = config.toTitleCaserOptions();
    const titleCaser = new TitleCaser(options);

    expect(options.neverCapitalize).toEqual(["custom"]);
    expect(titleCaser.toTitleCase("custom openai research api")).toBe("custom OpenAI Research API");
  });

  test("should keep config values isolated from source object mutations", () => {
    const sourceConfig = {
      ignoreList: ["custom"],
      neverCapitalize: ["api"],
      phraseReplacementList: {
        "hello world": "Hello World",
      },
      wordReplacementsList: [
        { nodejs: "Node.js" },
      ],
    };

    const config = new TitleCaserConfig(sourceConfig);
    sourceConfig.ignoreList.push("mutated");
    sourceConfig.neverCapitalize.push("mutated");
    sourceConfig.phraseReplacementList["hello world"] = "Mutated";
    sourceConfig.wordReplacementsList[0].nodejs = "Mutated";

    expect(config.ignoreList).toEqual(["custom"]);
    expect(config.neverCapitalize).toEqual(["api"]);
    expect(config.phraseReplacementList).toEqual({ "hello world": "Hello World" });
    expect(config.wordReplacementsList).toEqual([{ nodejs: "Node.js" }]);
  });

  test("should reject invalid config shapes before TitleCaser receives them", () => {
    expect(() => new TitleCaserConfig(null)).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ unknownOption: true })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ dictionaryPath: "../evil.json" })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ minTitleChars: -1 })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ maxTitleChars: 0 })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ minTitleChars: 10, maxTitleChars: 5 })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ maxTitleChars: 10001 })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ minTitleLength: -1 })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ maxTitleLength: 0 })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ minTitleLength: 10, maxTitleLength: 5 })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ style: "unknown" })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ dictionaryProfile: "unknown" })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ smartQuotes: "yes" })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ normalizeWhitespace: "yes" })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ debug: "yes" })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ ignoreList: "custom" })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ neverCapitalize: [1] })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ phraseReplacementList: [] })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ phraseReplacementList: { test: 1 } })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ phraseReplacementList: { ["a".repeat(501)]: "test" } })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ wordReplacementsList: ["api"] })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ wordReplacementsList: [{ api: 1 }] })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ wordReplacementsList: [{ api: "API", apis: "APIs" }] })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ replaceTerms: [["api", 1]] })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ security: "strict" })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ security: { allowHtml: "yes" } })).toThrow(TypeError);
    expect(() => new TitleCaserConfig({ security: { allowedHtmlTags: "br" } })).toThrow(TypeError);
  });

  test("should reject unsafe TitleCaser constructor options directly", () => {
    expect(() => new TitleCaser("bad")).toThrow(TypeError);
    expect(() => new TitleCaser({ unknownOption: true })).toThrow(TypeError);
    expect(() => new TitleCaser({ dictionaryPath: "../evil.json" })).toThrow(TypeError);
    expect(() => new TitleCaser({ dictionaryProfile: "../full" })).toThrow(TypeError);
    expect(() => new TitleCaser({ phraseReplacementList: { test: 1 } })).toThrow(TypeError);
    expect(() => new TitleCaser({ replaceTerms: [["api", 1]] })).toThrow(TypeError);
  });

  test("should support every public style option", () => {
    const styles = ["ap", "apa", "british", "chicago", "nyt", "wikipedia"];

    styles.forEach((style) => {
      const config = new TitleCaserConfig({ style });
      const titleCaser = new TitleCaser(config.toTitleCaserOptions());

      expect(typeof titleCaser.toTitleCase("the future of devops")).toBe("string");
    });
  });
});

describe("TitleCaser Hygiene – Security", () => {
  test("should map deprecated title length aliases to character limits", () => {
    const config = new TitleCaserConfig({ minTitleLength: 2, maxTitleLength: 12 });
    const options = config.toTitleCaserOptions();

    expect(config.minTitleChars).toBe(2);
    expect(config.maxTitleChars).toBe(12);
    expect(config.minTitleLength).toBe(2);
    expect(config.maxTitleLength).toBe(12);
    expect(options.minTitleChars).toBe(2);
    expect(options.maxTitleChars).toBe(12);
  });

  test("should reject titles beyond configured character limits", () => {
    const titleCaser = new TitleCaser({ maxTitleChars: 10 });

    expect(() => titleCaser.toTitleCase("this title is too long")).toThrow(TypeError);
  });

  test("should allow supported HTML breaks but reject unsafe HTML by default", () => {
    const titleCaser = new TitleCaser();

    expect(() => titleCaser.toTitleCase("hello <br> world")).not.toThrow();
    expect(() => titleCaser.toTitleCase("hello <script>alert(1)</script>")).toThrow(TypeError);
    expect(() => titleCaser.toTitleCase('<img src="x" onerror="alert(1)"> hello')).toThrow(TypeError);
    expect(() => titleCaser.toTitleCase("<iframe>hello</iframe>")).toThrow(TypeError);
  });

  test("should validate emoji and special-character options", () => {
    expect(() => new TitleCaser().toTitleCase("hello 😀")).not.toThrow();
    expect(() => new TitleCaser({ allowEmojis: false }).toTitleCase("hello 😀")).toThrow(TypeError);
    expect(() => new TitleCaser().toTitleCase("hello © world")).not.toThrow();
    expect(() => new TitleCaser({ allowSpecialCharacters: false }).toTitleCase("hello © world")).toThrow(TypeError);
  });

  test("should reject invisible or unsafe control characters when configured", () => {
    expect(() => new TitleCaser().toTitleCase("hello\u0007world")).toThrow(TypeError);
    expect(() => new TitleCaser().toTitleCase("hello\u202Eworld")).toThrow(TypeError);
    expect(() => new TitleCaser().toTitleCase("hello\u200Bworld")).not.toThrow();
    expect(() => new TitleCaser({
      security: { rejectZeroWidthCharacters: true },
    }).toTitleCase("hello\u200Bworld")).toThrow(TypeError);
  });

  test("should normalize quote characters when requested", () => {
    expect(TitleCaserUtils.validationNormalizeQuotes("“hello” and ‘world’")).toBe("\"hello\" and 'world'");
    expect(() => new TitleCaser({ normalizeQuotes: true }).toTitleCase("“hello world”")).not.toThrow();
  });

  test("should treat regex-looking phrase replacements as literal text", () => {
    const titleCaser = new TitleCaser({
      phraseReplacementList: {
        ".*": "Literal Dot Star",
      },
    });

    expect(titleCaser.toTitleCase("hello world")).toBe("Hello World");
    expect(titleCaser.toTitleCase("literal .* token")).toBe("Literal Literal Dot Star Token");
  });
});

describe("TitleCaser Hygiene – Curated Data", () => {
  test("should keep English term data in organized data groups", () => {
    const mergedTerms = englishTermDataList.flatMap((termGroup) => Object.values(termGroup).flat());
    const uniqueTerms = [...new Set(mergedTerms)];

    expect(englishTermDataList).toHaveLength(9);
    expect(uniqueTerms.length).toBeGreaterThan(1150);
    expect(uniqueTerms).toEqual(expect.arrayContaining([
      "AWS",
      "DevOps",
      "Fox News",
      "CNN Australia",
      "CNN International",
      "GitHub",
      "Google",
      "MSNBC",
      "NBC News",
    ]));
  });

  test("should keep regional acronym rules as structured data", () => {
    expect(regionalAcronyms.regionalAcronymList).toEqual(expect.arrayContaining(["us", "uk", "eu"]));
    expect(regionalAcronyms.regionalAcronymPrecedingWordsList).toContain("via");
    expect(regionalAcronyms.regionalAcronymFollowingWordsList).toEqual(
      expect.arrayContaining(["military", "government", "policy", "union"]),
    );
  });

  test("should not contain duplicate regional acronym context entries", () => {
    const lists = [
      regionalAcronyms.regionalAcronymList,
      regionalAcronyms.regionalAcronymPrecedingWordsList,
      regionalAcronyms.regionalAcronymFollowingWordsList,
    ];

    lists.forEach((list) => {
      expect(new Set(list).size).toBe(list.length);
      expect(list.every((word) => typeof word === "string" && word.length > 0)).toBe(true);
    });
  });
});
