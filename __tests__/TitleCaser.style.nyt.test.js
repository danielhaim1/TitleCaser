import { TitleCaser } from "../index.js";
import { nytTitleCaseEdgeCases } from "./fixtures/nyt-title-case-edge-cases.js";
import { runNameHeuristicTitleCaseTests } from "./helpers/nameHeuristicCases.js";
import { runPhrasalVerbTitleCaseTests } from "./helpers/phrasalVerbCases.js";
import { runRareNounTrapTitleCaseTests } from "./helpers/rareNounTrapCases.js";

function runTest(description, input, expected) {
  test(description, () => {
    const titleCaser = new TitleCaser({ style: "nyt" });
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });
}

describe("TitleCaser NYT – Style Stability", () => {
  runTest(
    "should handle acronym + colon usage (NYT)",
    "the future of ai: how iot and machine learning will change the world",
    "The Future of AI: How IoT and Machine Learning Will Change the World",
  );
});

runNameHeuristicTitleCaseTests(TitleCaser, "nyt");
describe("TitleCaser NYT - Additional Title Case Coverage", () => {
  test.each(nytTitleCaseEdgeCases)("%s", (_description, input, expected) => {
    const titleCaser = new TitleCaser({ style: "nyt" });

    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });
});
runPhrasalVerbTitleCaseTests(TitleCaser, "nyt");
runRareNounTrapTitleCaseTests(TitleCaser, "nyt");
