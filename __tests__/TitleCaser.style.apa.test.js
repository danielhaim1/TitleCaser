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
  runTest(
    "should normalize spelling replacements and apply APA casing",
    "blockchain technology and cyber security: opportunities and challenges for secure digital transactions",
    "Blockchain Technology and Cybersecurity: Opportunities and Challenges for Secure Digital Transactions",
  );
  runTest(
    "should normalize full stack by position and apply APA casing",
    "full stack teams hire full-stack developers for full stack",
    "Fullstack Teams Hire Fullstack Developers for Fullstack",
  );
  runTest(
    "should preserve canonical replacement casing by position in APA style",
    "reactjs teams build tools with node.js and reactjs",
    "React Teams Build Tools With Node.js and React",
  );
});

runNameHeuristicTitleCaseTests(TitleCaser, "apa");
runRareNounTrapTitleCaseTests(TitleCaser, "apa");
