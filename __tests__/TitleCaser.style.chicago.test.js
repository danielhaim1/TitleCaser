import { TitleCaser } from "../index.js";
import { runNameHeuristicTitleCaseTests } from "../testHelpers/nameHeuristicCases.js";
import { runRareNounTrapTitleCaseTests } from "../testHelpers/rareNounTrapCases.js";

function runTest(description, input, expected, style = "chicago") {
  test(description, () => {
    const titleCaser = new TitleCaser({ style });
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });
}

function createTest(description, options, input, expectedOutput) {
  test(description, () => {
    const titleCaser = new TitleCaser(options);
    expect(titleCaser.toTitleCase(input)).toEqual(expectedOutput);
  });
}

describe("TitleCaser Chicago – Regional Acronym Compounds", () => {
  runTest("should handle multi-hyphen compound with regional acronym", "us-uk-led coalition", "US-UK-Led Coalition");
  runTest("should handle second-position regional acronym", "pro-us policies", "Pro-US Policies");
  runTest("should normalize mixed-case regional acronym in hyphenated word", "Us-backed reforms", "US-Backed Reforms");
  runTest("should normalize dotted acronym in hyphenated word", "u.s.-backed initiative", "U.S.-Backed Initiative");
  runTest("should handle hyphenated regional acronym at start of sentence", "us-backed reforms continue", "US-Backed Reforms Continue");
  runTest("should handle regional acronym in parenthetical hyphen", "(us-backed) initiative", "(US-Backed) Initiative");
  runTest("should handle en dash with regional acronym", "us–backed coalition", "US–Backed Coalition");
  runTest("should handle regional acronym compound with trailing punctuation", "the us-backed initiative.", "The US-Backed Initiative.");
  runTest('should not uppercase "us" inside longer word', "museum-backed initiative", "Museum-Backed Initiative");
  runTest("should not treat random two-letter prefix as regional acronym", "as-backed reforms", "As-Backed Reforms");
});

describe("TitleCaser Chicago – Style Stability", () => {
  runTest(
    "should handle colon + comparison phrase (Chicago)",
    "VMware vs. VirtualBox: a comparative study of virtualization software",
    "VMware vs. VirtualBox: A Comparative Study of Virtualization Software",
  );
  runTest(
    "should capitalize hyphenated terms (Chicago)",
    "nodejs development on aws: an in-depth tutorial on server-side javascript deployment",
    "Node.js Development on AWS: An In-Depth Tutorial on Server-Side JavaScript Deployment",
  );
  runTest(
    "should apply custom replacements for brand names (Chicago)",
    "Back-End Web Development: Building Scalable APIs with nodejs",
    "Backend Web Development: Building Scalable APIs With Node.js",
  );
  createTest(
    "Smart quotes enabled",
    { style: "chicago", smartQuotes: true },
    '"Never underestimate the power o\'persistence,"',
    "“Never Underestimate the Power O’Persistence,”",
  );
  runTest(
    "should keep acronyms in uppercase (Chicago)",
    "I Love Connecting with My Online Friends, but Sometimes I Prefer to Hang Out with My Friends IRL",
    "I Love Connecting With My Online Friends, but Sometimes I Prefer to Hang Out With My Friends IRL",
  );
});

describe("TitleCaser Chicago – Reserved Words and Special Handling", () => {
  test("should transform a single reserved word correctly", () => {
    const titleCaser = new TitleCaser({ style: "chicago" });
    expect(titleCaser.toTitleCase("GOOGle tensorflow")).toBe("Google TensorFlow");
  });

  test("should transform sentence with reserved word + colon", () => {
    const titleCaser = new TitleCaser({ style: "chicago" });
    expect(titleCaser.toTitleCase("GooGlE vs. VirtualBox: a comparative study of virtualization software")).toBe(
      "Google vs. VirtualBox: A Comparative Study of Virtualization Software",
    );
  });

  test("should handle possessive form of reserved word", () => {
    const titleCaser = new TitleCaser({ style: "chicago" });
    expect(titleCaser.toTitleCase("GOOGle's tensorflow")).toBe("Google's TensorFlow");
  });

  test("should apply custom brand and spelling replacements", () => {
    const titleCaser = new TitleCaser({ style: "chicago" });
    titleCaser.setReplaceTerms([
      { mcdonalds: "McDonald's" },
      { skoda: "Škoda" },
      { "cyber-security": "cybersecurity" },
    ]);

    [
      { input: "cyber-security", expected: "Cybersecurity" },
      { input: "skoda", expected: "Škoda" },
      { input: "mcdonalds", expected: "McDonald's" },
    ].forEach(({ input, expected }) => {
      expect(titleCaser.toTitleCase(input)).toBe(expected);
    });
  });

  test("should handle HTML <br> with colon (spaced)", () => {
    const titleCaser = new TitleCaser({ style: "chicago" });
    const input = "Exploring the future of devops:<br>Preparing for the next era of software development";
    const expected = "Exploring the Future of DevOps: <br> Preparing for the Next Era of Software Development";
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });

  test("should handle HTML <br> with full sentence split", () => {
    const titleCaser = new TitleCaser({ style: "chicago" });
    const input =
      "Exploring the Future of DevOps:<br>Guidelines for Preparing for the Next Era in Software Development";
    const expected =
      "Exploring the Future of DevOps: <br> Guidelines for Preparing for the Next Era in Software Development";
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });

  test("should handle <br> with no space after colon", () => {
    const titleCaser = new TitleCaser({ style: "chicago" });
    const input = "The future of DevOps:<br>How to prepare for the next era of software development";
    const expected = "The Future of DevOps: <br> How to Prepare for the Next Era of Software Development";
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });

  test('should handle ampersand "&" symbol', () => {
    const titleCaser = new TitleCaser({ style: "chicago" });
    expect(titleCaser.toTitleCase("This & That")).toBe("This & That");
  });

  test("should handle excessive whitespace", () => {
    const titleCaser = new TitleCaser({ style: "chicago" });
    expect(titleCaser.toTitleCase("      This    string   has   too   many  spaces  ")).toBe(
      "This String Has Too Many Spaces",
    );
  });
});

runNameHeuristicTitleCaseTests(TitleCaser, "chicago");
runRareNounTrapTitleCaseTests(TitleCaser, "chicago");
