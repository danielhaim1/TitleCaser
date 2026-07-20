import { TitleCaser } from "../index.js";

const styles = ["ap", "apa", "british", "chicago", "nyt"];
const allStyles = [...styles, "wikipedia"];
const punctuationCases = [
  ["should keep apostrophized sentence output unchanged", "the question? she said, \"right now!\" \"good.\""],
  ["should preserve quoted punctuation behavior", "what? \"left.\" \"right!\" \"then?\""],
  ["should preserve quoted sentence chains", "start with a quote: \"good.\" \"better!\" \"best?\""],
  ["should preserve nested punctuation and capitals with option flags", "if it rains, go in. the dog barks"],
  ["should not alter acronym-sensitive replacements", "the ai strategy was developed by openai"],
  ["should keep whole-title all-caps handling stable", "THE AI STRATEGY WAS DEVELOPED BY OPENAI"],
  ["should keep names and parenthetical text stable", "we met at the us embassy. this is a disney park story."],
];

describe("TitleCaser – Non-Wikipedia Style Stability", () => {
  test.each(punctuationCases)("%s", (description, input) => {
    styles.forEach((style) => {
      const defaultOutput = new TitleCaser({ style }).toTitleCase(input);
      const preserveUserOutput = new TitleCaser({
        style,
        wikipediaPreserveUserCapitalization: true,
      }).toTitleCase(input);
      const preserveAllOutput = new TitleCaser({
        style,
        wikipediaPreserveUserCapitalization: true,
        wikipediaPreserveAllCaps: true,
      }).toTitleCase(input);
      const disabledPreserveOutput = new TitleCaser({
        style,
        wikipediaPreserveUserCapitalization: false,
      }).toTitleCase(input);

      expect(preserveUserOutput).toBe(defaultOutput);
      expect(preserveAllOutput).toBe(defaultOutput);
      expect(disabledPreserveOutput).toBe(defaultOutput);
    });
  });

  test.each(styles)("%s should ignore Wikipedia-only options in full-title examples", (style) => {
    const input = "when? Right now said she. \"better?\" he replied.";
    const defaultOutput = new TitleCaser({ style }).toTitleCase(input);
    const preserveAllOutput = new TitleCaser({
      style,
      wikipediaPreserveUserCapitalization: true,
      wikipediaPreserveAllCaps: true,
    }).toTitleCase(input);
    const preserveUserOutput = new TitleCaser({
      style,
      wikipediaPreserveUserCapitalization: true,
    }).toTitleCase(input);
    const preserveUserDisabledOutput = new TitleCaser({
      style,
      wikipediaPreserveUserCapitalization: false,
      wikipediaPreserveAllCaps: true,
    }).toTitleCase(input);

    expect(preserveAllOutput).toBe(defaultOutput);
    expect(preserveUserOutput).toBe(defaultOutput);
    expect(preserveUserDisabledOutput).toBe(defaultOutput);
  });
});

describe("TitleCaser – Shared Style Contracts", () => {
  test.each(allStyles)("%s preserves explicit exact replacements", (style) => {
    const titleCaser = new TitleCaser({ style });
    titleCaser.addExactPhraseReplacements([{ raw: "CuStOm" }]);

    expect(titleCaser.toTitleCase("a raw guide")).toContain("CuStOm");
  });

  test.each(allStyles)("%s preserves whitespace when normalization is disabled", (style) => {
    const output = new TitleCaser({ style, normalizeWhitespace: false })
      .toTitleCase("  api\tguide\nfor nodejs  ");

    expect(output).toMatch(/^  /);
    expect(output).toContain("\t");
    expect(output).toContain("\n");
    expect(output).toMatch(/  $/);
  });

  test.each(allStyles)("%s normalizes whitespace by default", (style) => {
    const output = new TitleCaser({ style }).toTitleCase("  api\tguide\nfor nodejs  ");

    expect(output).not.toMatch(/^\s|\s$/);
    expect(output).not.toMatch(/[\t\n]| {2,}/);
  });

  test.each(allStyles)("%s normalizes curly quotes when requested", (style) => {
    const output = new TitleCaser({ style, normalizeQuotes: true })
      .toTitleCase("“api” and ‘nodejs’");

    expect(output).toMatch(/["']/);
    expect(output).not.toMatch(/[“”‘’]/);
  });

  test.each(allStyles)("%s keeps protocol URLs intact", (style) => {
    const output = new TitleCaser({ style })
      .toTitleCase("api guide at https://example.co.uk/API?format=SDK#top");

    expect(output).toContain("https://example.co.uk/API?format=SDK#top");
  });

  test.each(allStyles)("%s preserves an all-caps URL", (style) => {
    const url = "HTTPS://EXAMPLE.COM/API?FORMAT=SDK#TOP";

    expect(new TitleCaser({ style }).toTitleCase(url)).toBe(url);
  });

  test.each([
    "www.example.io/path",
    "https://docs.example.dev/v2",
    "ftp://registry.example.xn--p1ai/package",
    "http://localhost:3000/api",
    "http://127.0.0.1:8080/api",
  ])("preserves unambiguous URL %s across styles", (url) => {
    allStyles.forEach((style) => {
      const output = new TitleCaser({ style }).toTitleCase(`visit ${url} for docs`);

      expect(output).toContain(url);
    });
  });

  test.each([
    ["node.js", "Node.js"],
    ["react.js", "React"],
    ["battle.net", "Battle.net"],
  ])("does not treat known term %s as a URL", (input, expected) => {
    allStyles.forEach((style) => {
      const output = new TitleCaser({ style }).toTitleCase(`using ${input} today`);

      expect(output).toContain(expected);
    });
  });

  test.each(allStyles)("%s permits line breaks and rejects unsafe HTML", (style) => {
    const titleCaser = new TitleCaser({ style });

    expect(titleCaser.toTitleCase("api<br>guide")).toContain("<br>");
    expect(() => titleCaser.toTitleCase("api <script>alert(1)</script> guide")).toThrow(TypeError);
  });
});
