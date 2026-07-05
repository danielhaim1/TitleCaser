import { TitleCaser } from "../index.js";
import { runNameHeuristicTitleCaseTests } from "../testHelpers/nameHeuristicCases.js";
import { runRareNounTrapTitleCaseTests } from "../testHelpers/rareNounTrapCases.js";

function runTest(description, input, expected) {
  test(description, () => {
    const titleCaser = new TitleCaser({ style: "apa" });
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });
}

describe("TitleCaser APA – Style Stability", () => {
  runTest(
    "should capitalize after colon (APA)",
    "the art of negotiation: strategies for successful business deals",
    "The Art of Negotiation: Strategies for Successful Business Deals",
  );
  runTest(
    "should handle colon and apostrophes (APA)",
    "the science of nutrition: debunking myths and fads",
    "The Science of Nutrition: Debunking Myths and Fads",
  );
  runTest(
    "should handle short conjunctions and brand normalization (APA)",
    "the impact of social media on mental health: a study of instagram, TIKTOK, and SnapChat",
    "The Impact of Social Media on Mental Health: A Study of Instagram, TikTok, and Snapchat",
  );
});

runNameHeuristicTitleCaseTests(TitleCaser, "apa");
runRareNounTrapTitleCaseTests(TitleCaser, "apa");
