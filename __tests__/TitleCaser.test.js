import { TitleCaser } from "../index.js";

// Reusable test helper
function runTest(description, input, expected, style = "ap") {
  test(description, () => {
    const titleCaser = new TitleCaser({ style });
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput).toBe(expected);
  });
}

//
// 1. Combined Words / Symbol Edge Cases
//
describe("TitleCaser – Combined Words Ending with Symbol", () => {
  // Original single test
  runTest(
    'should preserve punctuation in "Championing Self-Acceptance: Landmark Initiative"',
    "Championing Self-Acceptance: Landmark Initiative",
    "Championing Self-Acceptance: Landmark Initiative",
  );
});

//
// 2. Hyphenated and Apostrophized Words
//
describe("TitleCaser – Hyphenated & Apostrophized Words", () => {
  runTest('should capitalize both parts of "t-mobile"', "t-mobile", "T-Mobile");
  runTest('should capitalize "coca-cola"', "coca-cola", "Coca-Cola");
  runTest('should capitalize general hyphenated term "e-commerce"', "e-commerce", "E-Commerce");
  runTest('should capitalize apostrophe word "o\'connor"', "o'connor", "O’Connor");
});

//
// 4. Basic Title Casing Options
//
describe("TitleCaser – Basic Title Casing Options (Default Style)", () => {
  // This block had its own "createTest" inline; now standardized
  runTest(
    "should convert a basic lowercase phrase to title case",
    "hello world",
    "Hello World",
    // default style 'ap'
  );
  runTest("should handle excessive spacing and lowercase articles", "the book   of     life", "The Book of Life");
  runTest('should preserve correct casing in hyphenated names like "louis-iv"', "louis-iv", "Louis-IV");
  runTest(
    "should properly capitalize prepositions beyond 3 letters",
    "what's to say about this?",
    "What's to Say About This?",
  );
});

//
// 4A. Whitespace Normalization
//
describe("TitleCaser – Whitespace Normalization", () => {

  test("should collapse multiple internal spaces by default", () => {
    const titleCaser = new TitleCaser({ style: "ap" });
    const input = "the   quick     brown   fox";
    const expected = "The Quick Brown Fox";
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });

  test("should trim leading and trailing whitespace by default", () => {
    const titleCaser = new TitleCaser({ style: "ap" });
    const input = "     hello world     ";
    const expected = "Hello World";
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });

  test("should collapse mixed tabs and spaces", () => {
    const titleCaser = new TitleCaser({ style: "ap" });
    const input = "hello\t\tworld   again";
    const expected = "Hello World Again";
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });

  test("should collapse newline spacing", () => {
    const titleCaser = new TitleCaser({ style: "ap" });
    const input = "hello\n\nworld";
    const expected = "Hello World";
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });

  test("should preserve whitespace when normalizeWhitespace is false", () => {
    const titleCaser = new TitleCaser({ style: "ap", normalizeWhitespace: false });
    const input = "the   book     of     life";
    const expected = "The   Book     of     Life";
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });

  test("should preserve leading/trailing whitespace when normalizeWhitespace is false", () => {
    const titleCaser = new TitleCaser({ style: "ap", normalizeWhitespace: false });
    const input = "   hello world   ";
    const expected = "   Hello World   ";
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });

  test("should return empty string for whitespace-only input by default", () => {
    const titleCaser = new TitleCaser({ style: "ap" });
    expect(titleCaser.toTitleCase("     ")).toBe("");
  });

  test("should preserve whitespace-only input when normalizeWhitespace is false", () => {
    const titleCaser = new TitleCaser({ style: "ap", normalizeWhitespace: false });
    expect(titleCaser.toTitleCase("     ")).toBe("     ");
  });

  test("whitespace-only string (default normalization)", () => {
    const tc = new TitleCaser({ style: "ap" });
    expect(tc.toTitleCase("     ")).toBe("");
  });

  test("whitespace-only string with normalizeWhitespace: false", () => {
    const tc = new TitleCaser({ style: "ap", normalizeWhitespace: false });
    expect(tc.toTitleCase("     ")).toBe("     ");
  });

});

describe("TitleCaser – normalizeWhitespace Option", () => {

  test("default behavior collapses internal spacing", () => {
    const titleCaser = new TitleCaser({ style: "ap" });
    expect(titleCaser.toTitleCase("hello   world")).toBe("Hello World");
  });

  test("default behavior trims leading and trailing whitespace", () => {
    const titleCaser = new TitleCaser({ style: "ap" });
    expect(titleCaser.toTitleCase("   hello world   ")).toBe("Hello World");
  });

  test("normalizeWhitespace: false preserves internal spacing", () => {
    const titleCaser = new TitleCaser({ style: "ap", normalizeWhitespace: false });
    expect(titleCaser.toTitleCase("hello   world")).toBe("Hello   World");
  });

  test("normalizeWhitespace: false preserves leading/trailing whitespace", () => {
    const titleCaser = new TitleCaser({ style: "ap", normalizeWhitespace: false });
    expect(titleCaser.toTitleCase("   hello world   ")).toBe("   Hello World   ");
  });

  test("normalizeWhitespace: false preserves newlines", () => {
    const titleCaser = new TitleCaser({ style: "ap", normalizeWhitespace: false });
    expect(titleCaser.toTitleCase("hello\n\nworld")).toBe("Hello\n\nWorld");
  });

});

//
// 5. TitleCaser Class Methods
//
describe("TitleCaser – Class Methods (setReplaceTerms, addExactPhraseReplacements, etc.)", () => {
  test("should apply multiple term replacements via setReplaceTerms()", () => {
    const titleCaser = new TitleCaser({ style: "ap" });
    titleCaser.setReplaceTerms([{ hi: "Hello" }, { globe: "World" }, { two: "One" }]);

    const input = "hi globe, two";
    const expected = "Hello World, One";
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });

  test("should apply exact phrase replacements", () => {
    const titleCaser = new TitleCaser({ style: "ap" });
    titleCaser.addExactPhraseReplacements([{ "the correct phrase": "ThE CoRrEcT Way" }]);

    const input = "this is the correct phrase";
    const expected = "This Is ThE CoRrEcT Way";
    const output = titleCaser.toTitleCase(input);
    expect(output).toBe(expected);
  });

  test("should remove a single replacement rule via removeReplaceTerm()", () => {
    const titleCaser = new TitleCaser({ style: "apa" });
    titleCaser.setReplaceTerms([{ x: "Y" }, { y: "X" }]);

    // Remove "x" => "Y"
    titleCaser.removeReplaceTerm("x");

    const input = "x should be y";
    const expected = "X Should Be X"; // "x" no longer replaced by "Y"
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });
});

// 8. addReplaceTerm Method
//
describe("TitleCaser – addReplaceTerm Method", () => {
  let titleCaser;

  beforeEach(() => {
    titleCaser = new TitleCaser({ style: "ap" });
  });

  test("should add a new replacement term", () => {
    const term = "js";
    const replacement = "JavaScript";

    expect(titleCaser.wordReplacementsList.some((obj) => term in obj)).toBe(false);
    titleCaser.addReplaceTerm(term, replacement);
    expect(titleCaser.wordReplacementsList.some((obj) => obj[term] === replacement)).toBe(true);
  });

  test("should update an existing replacement term", () => {
    const term = "js";
    const initial = "JavaScript";
    const updated = "JS";

    titleCaser.addReplaceTerm(term, initial);
    expect(titleCaser.wordReplacementsList.some((obj) => obj[term] === initial)).toBe(true);

    titleCaser.addReplaceTerm(term, updated);
    expect(titleCaser.wordReplacementsList.some((obj) => obj[term] === updated)).toBe(true);
  });
});
