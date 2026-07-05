const {
  createBundledProfileTitleCaser,
  createProfileTitleCaser,
  runProfileCases,
  supportedDictionaryProfiles,
} = require("../testHelpers/profileTestHelper");
const fs = require("fs");
const path = require("path");
const { TitleCaserUtils } = require("../src/TitleCaserUtils");

describe("TitleCaser – Dictionary Profiles", () => {
  test("should expose only supported runtime dictionary profiles", () => {
    expect(supportedDictionaryProfiles).toEqual(["lite", "full"]);
  });

  test("should preserve curated proper phrases in both supported profiles", () => {
    runProfileCases([
      {
        profile: "lite",
        input: "the report cited fox news and donald duck",
        expected: "The report cited Fox News and Donald Duck",
      },
      {
        profile: "full",
        input: "the report cited fox news and donald duck",
        expected: "The report cited Fox News and Donald Duck",
      },
    ]);
  });

  test("should expose the lite profile's reduced dictionary surface", () => {
    expect(TitleCaserUtils.dictionaryIsWord("duck", "lite")).toBe(false);
    expect(TitleCaserUtils.dictionaryIsWord("duck", "full")).toBe(true);
    expect(TitleCaserUtils.dictionaryIsAdverb("quickly", "lite")).toBe(false);
    expect(TitleCaserUtils.dictionaryIsAdverb("quickly", "full")).toBe(true);
  });

  test("should build lite and full profile bundles with different sizes", () => {
    const liteBundlePath = path.resolve(__dirname, "../dist/lite/titlecaser.esm.js");
    const fullBundlePath = path.resolve(__dirname, "../dist/full/titlecaser.esm.js");
    const liteBundleSize = fs.statSync(liteBundlePath).size;
    const fullBundleSize = fs.statSync(fullBundlePath).size;

    expect(liteBundleSize).toBeLessThan(250000);
    expect(fullBundleSize).toBeGreaterThan(liteBundleSize);
  });

  describe("Lite and Full Bundle Parity Outside Wikipedia", () => {
    const parityCases = [
      ["ap", "the report cited fox news after the public event"],
      ["apa", "the report cited fox news after the public event"],
      ["chicago", "the report cited fox news after the public event"],
      ["nyt", "the report cited fox news after the public event"],
      ["ap", "donald duck joined apple music after the market event"],
      ["chicago", "donald duck joined apple music after the market event"],
      ["apa", "cnn international covered the qelvorn project after the public event"],
      ["nyt", "bbc news cited sky news after the press conference"],
      ["ap", "maeve o'connor reviewed snow crash after the court decision"],
      ["chicago", "nguyen van binh joined the lincoln project after the local election"],
    ];

    test.each(parityCases)("should match full output in %s for %s", (style, input) => {
      const liteTitleCaser = createBundledProfileTitleCaser("lite", { style });
      const fullTitleCaser = createBundledProfileTitleCaser("full", { style });

      expect(liteTitleCaser.toTitleCase(input)).toBe(fullTitleCaser.toTitleCase(input));
    });
  });

  test("should allow Wikipedia lite and full bundles to diverge on dictionary-heavy sentence case", () => {
    const input = "The Surprise Guest was The Disney Favourite, Donald duck ";
    const liteTitleCaser = createBundledProfileTitleCaser("lite", { style: "wikipedia" });
    const fullTitleCaser = createBundledProfileTitleCaser("full", { style: "wikipedia" });

    expect(liteTitleCaser.toTitleCase(input)).not.toBe(fullTitleCaser.toTitleCase(input));
    expect(fullTitleCaser.toTitleCase(input)).toBe("The surprise guest was the Disney favourite, Donald Duck");
  });
});
