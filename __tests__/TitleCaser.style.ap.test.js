import { TitleCaser } from "../index.js";
import { runNameHeuristicTitleCaseTests } from "../testHelpers/nameHeuristicCases.js";
import { runRareNounTrapTitleCaseTests } from "../testHelpers/rareNounTrapCases.js";

function runTest(description, input, expected, style = "ap") {
  test(description, () => {
    const titleCaser = new TitleCaser({ style });
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });
}

describe("TitleCaser AP – Regional Acronyms and Pronouns", () => {
  const cases = [
    ['should capitalize "US" when preceded by "the"', "They signed the treaty with the us", "They Signed the Treaty With the US"],
    ['should capitalize "US" in geopolitical context (with comma)', "The us, despite its size, has a significant impact.", "The US, Despite Its Size, Has a Significant Impact."],
    ['should capitalize "US" and "UK" together', "The us and the uk signed the treaty", "The US and the UK Signed the Treaty"],
    ['should capitalize "US" after "from the"', "Support came from the us", "Support Came From the US"],
    ['should capitalize "US" after "via"', "The message was relayed via us", "The Message Was Relayed via US"],
    ['should capitalize "US" before "Military"', "Partnering with the us Military", "Partnering With the US Military"],
    ['should capitalize "US" in "US-backed" phrase', "The us-backed initiative aims to promote sustainability.", "The US-Backed Initiative Aims to Promote Sustainability."],
    ['should capitalize "US" in geopolitical context (repeated case)', "The us, despite its size, has a significant impact.", "The US, Despite Its Size, Has a Significant Impact."],
    ['should capitalize pronoun "us" (case #1)', "It’s up to us to decide.", "It’s Up to Us to Decide."],
    ['should capitalize pronoun "us" (case #2)', "You can partner with us.", "You Can Partner With Us."],
    ['should capitalize pronoun "us" (case #3)', "partner with us", "Partner With Us"],
    ['should capitalize "UK" in geopolitical context (with comma)', "The uk, despite its size, has a significant impact.", "The UK, Despite Its Size, Has a Significant Impact."],
    ["should handle multiple country codes in same sentence", "We visited the uk and the US, and both were memorable.", "We Visited the UK and the US, and Both Were Memorable."],
    ['should capitalize pronoun "us" in a parenthetical phrase', "It has a varied landscape, and us, the citizens, appreciate it.", "It Has a Varied Landscape, and Us, the Citizens, Appreciate It."],
    ['should capitalize "USA" in formal context', "The usa has a varied landscape.", "The USA Has a Varied Landscape."],
    ['should capitalize "US" before "government" (AP style)', "Discussing the us government policies.", "Discussing the US Government Policies."],
    ['should capitalize "US" before "military" (AP style)', "Discussing the us military strategies.", "Discussing the US Military Strategies."],
    ['should capitalize "US" in geopolitical context (policy mention)', "Discussing the us policies.", "Discussing the US Policies."],
    ['should capitalize "US" before "Military" (repeat case)', "Partnering with the us Military", "Partnering With the US Military"],
    ['should capitalize "US" at the end of a sentence', "This policy was created by the us", "This Policy Was Created by the US"],
    ['should capitalize pronoun "us" in casual speech', "They want to talk to us", "They Want to Talk to Us"],
    ['should capitalize pronoun "us" in emotional context', "They really care about us", "They Really Care About Us"],
    ['should capitalize pronoun "us" in passive voice', "The system was built for us", "The System Was Built for Us"],
    ['should capitalize pronoun "us" with a compound verb', "She stood near us", "She Stood Near Us"],
    ['should capitalize pronoun "us" in an inverted clause', "Not everything depends on us", "Not Everything Depends on Us"],
    ['should capitalize pronoun "us" (repeat case #1)', "It\u2019s up to us to decide.", "It\u2019s Up to Us to Decide."],
    ['should capitalize pronoun "us" (repeat case #2)', "You can partner with us.", "You Can Partner With Us."],
    ['should capitalize pronoun "us" before "US Military"', "It\u2019s up to us in the US military to decide.", "It\u2019s Up to Us in the US Military to Decide."],
    ['should capitalize pronoun "us" before "military"', "It\u2019s up to us in the military to decide.", "It\u2019s Up to Us in the Military to Decide."],
    ['should capitalize pronoun "us" in a comma-separated clause', "It has a varied landscape, and us, the citizens, appreciate it.", "It Has a Varied Landscape, and Us, the Citizens, Appreciate It."],
    ['should capitalize "UK" at end of sentence', "This initiative was led by the uk", "This Initiative Was Led by the UK"],
    ['should capitalize "UK" in geopolitical context (repeat with comma)', "The uk, despite its size, has a significant impact.", "The UK, Despite Its Size, Has a Significant Impact."],
    ['should capitalize "UK" before government mention', "The uk, with its strong government, leads the way.", "The UK, With Its Strong Government, Leads the Way."],
    ['should capitalize "UK" before territory mention', "The uk, with its vast territory, has diverse landscapes.", "The UK, With Its Vast Territory, Has Diverse Landscapes."],
    ["should handle multiple country codes and pronouns in one sentence", "We visited the uk and the US, and both were memorable.", "We Visited the UK and the US, and Both Were Memorable."],
    ["should handle multiple codes and pronouns with mention of military", "We visited the uk and the US, and both have strong military forces.", "We Visited the UK and the US, and Both Have Strong Military Forces."],
    ["should handle multiple codes and pronouns with mention of talks", "We visited the uk and the US, and both engage in diplomatic talks.", "We Visited the UK and the US, and Both Engage in Diplomatic Talks."],
    ["should handle multiple codes and pronouns with mention of a bill", "We visited the uk and the US, and both consider a bill for environmental protection.", "We Visited the UK and the US, and Both Consider a Bill for Environmental Protection."],
    ['should capitalize "USA" in formal context (repeat case)', "The usa has a varied landscape.", "The USA Has a Varied Landscape."],
    ['should capitalize "USA" before a bill mention', "The usa introduces a new bill for economic reform.", "The USA Introduces a New Bill for Economic Reform."],
    ['should handle AP-style acronym "U.S." in uppercase context', "URGE U.S. AND CANADIAN GOVERNMENT OFFICIALS TO PROTECT NORTH ATLANTIC RIGHT WHALES", "Urge U.S. And Canadian Government Officials to Protect North Atlantic Right Whales"],
    ['should handle "On & Off" phrases #1', "We Are On & Off The Field", "We Are On & Off the Field"],
    ['should handle "On & Off" phrases #2', "we are on and off the field", "We Are On and Off the Field"],
  ];

  test.each(cases)("%s", (_description, input, expected) => {
    const titleCaser = new TitleCaser({ style: "ap" });
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });
});

describe("TitleCaser AP – Style Stability", () => {
  runTest('should correctly handle brand names with "ap" style', "GOOgle and VMWARE", "Google and VMware");
  runTest('should handle brand name "NERDs Candy" with AP style', "NERDs Candy", "NERDs Candy");
  runTest(
    "should handle possessives and colons (AP style)",
    "the iphone's impact on modern communication: a sociolinguistic analysis",
    "The iPhone's Impact on Modern Communication: A Sociolinguistic Analysis",
  );
  runTest('should handle hyphenated "BACK-end" with AP style', "BACK-end and front-end", "Backend and Frontend");
  runTest(
    "should normalize spelling replacements before applying AP casing",
    "back end and full stack developers",
    "Backend and Fullstack Developers",
  );
  runTest(
    "should normalize full stack by position and apply AP casing",
    "full stack teams hire full-stack developers for full stack",
    "Fullstack Teams Hire Fullstack Developers for Fullstack",
  );
  runTest(
    "should preserve canonical replacement casing by position in AP style",
    "reactjs teams build tools with node.js and reactjs",
    "React Teams Build Tools With Node.js and React",
  );
  runTest(
    "should handle acronym with colon (AP style)",
    "revolutionizing the publishing industry: insights from a cto on ebook development and innovation",
    "Revolutionizing the Publishing Industry: Insights From a CTO on eBook Development and Innovation",
  );
  runTest(
    "should handle brand casing with AP-style logic",
    "nodejs development on aws: an in-depth tutorial on server-side javascript deployment",
    "Node.js Development on AWS: An In-depth Tutorial on Server-side JavaScript Deployment",
  );
  runTest(
    'should not force ordinary "plan" to military acronym casing',
    "inside a high-profile, long-term plan for e-commerce growth",
    "Inside a High-profile, Long-term Plan for E-Commerce Growth",
  );
});

runNameHeuristicTitleCaseTests(TitleCaser, "ap");
runRareNounTrapTitleCaseTests(TitleCaser, "ap");
