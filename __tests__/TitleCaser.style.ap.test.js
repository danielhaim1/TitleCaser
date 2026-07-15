import { TitleCaser } from "../index.js";
import { runNameHeuristicTitleCaseTests } from "../testHelpers/nameHeuristicCases.js";
import { runRareNounTrapTitleCaseTests } from "../testHelpers/rareNounTrapCases.js";

function runTest(description, input, expected, style = "ap") {
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

describe("TitleCaser AP – Regional Acronyms and Pronouns", () => {
  const cases = [
    ['should capitalize "US" when preceded by "the"', "They signed the treaty with the us", "They Signed the Treaty With the US"],
    ['should capitalize "US" in geopolitical context (with comma)', "The us, despite its size, has a significant impact.", "The US, Despite Its Size, Has a Significant Impact."],
    ['should capitalize "US" and "UK" together', "The us and the uk signed the treaty", "The US and the UK Signed the Treaty"],
    ['should capitalize "US" after "from the"', "Support came from the us", "Support Came From the US"],
    ['should capitalize "US" after "via"', "The message was relayed via us", "The Message Was Relayed via US"],
    ['should capitalize "US" before "Military"', "Partnering with the us Military", "Partnering With the US Military"],
    ['should capitalize "US" in "US-backed" phrase', "The us-backed initiative aims to promote sustainability.", "The US-Backed Initiative Aims To Promote Sustainability."],
    ['should capitalize "US" in geopolitical context (repeated case)', "The us, despite its size, has a significant impact.", "The US, Despite Its Size, Has a Significant Impact."],
    ['should capitalize pronoun "us" (case #1)', "It’s up to us to decide.", "It’s Up to Us To Decide."],
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
    ['should capitalize pronoun "us" in casual speech', "They want to talk to us", "They Want To Talk to Us"],
    ['should capitalize pronoun "us" in emotional context', "They really care about us", "They Really Care About Us"],
    ['should capitalize pronoun "us" in passive voice', "The system was built for us", "The System Was Built for Us"],
    ['should capitalize pronoun "us" with a compound verb', "She stood near us", "She Stood Near Us"],
    ['should capitalize pronoun "us" in an inverted clause', "Not everything depends on us", "Not Everything Depends on Us"],
    ['should capitalize pronoun "us" (repeat case #1)', "It\u2019s up to us to decide.", "It\u2019s Up to Us To Decide."],
    ['should capitalize pronoun "us" (repeat case #2)', "You can partner with us.", "You Can Partner With Us."],
    ['should capitalize pronoun "us" before "US Military"', "It\u2019s up to us in the US military to decide.", "It\u2019s Up to Us in the US Military To Decide."],
    ['should capitalize pronoun "us" before "military"', "It\u2019s up to us in the military to decide.", "It\u2019s Up to Us in the Military To Decide."],
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
    ['should handle AP-style acronym "U.S." in uppercase context', "URGE U.S. AND CANADIAN GOVERNMENT OFFICIALS TO PROTECT NORTH ATLANTIC RIGHT WHALES", "Urge U.S. And Canadian Government Officials To Protect North Atlantic Right Whales"],
    ['should handle "On & Off" phrases #1', "We Are On & Off The Field", "We Are On & Off the Field"],
    ['should handle "On & Off" phrases #2', "we are on and off the field", "We Are On and Off the Field"],
  ];

  test.each(cases)("%s", (_description, input, expected) => {
    const titleCaser = new TitleCaser({ style: "ap" });
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });
});

describe("TitleCaser AP – Final Regional Acronyms After The", () => {
  const finalRegionalAcronymCases = [
    // Basic
    ["from the uk", "From the UK"],
    ["from the us", "From the US"],
    ["from the eu", "From the EU"],
    ["in the uk", "In the UK"],
    ["in the us", "In the US"],
    ["in the eu", "In the EU"],
    ["across the uk", "Across the UK"],
    ["across the us", "Across the US"],
    ["across the eu", "Across the EU"],

    // End of title
    ["support came from the uk", "Support Came From the UK"],
    ["support came from the us", "Support Came From the US"],
    ["support came from the eu", "Support Came From the EU"],
    ["investment rose in the uk", "Investment Rose in the UK"],
    ["investment rose in the us", "Investment Rose in the US"],
    ["investment rose in the eu", "Investment Rose in the EU"],
    ["policy shifted across the uk", "Policy Shifted Across the UK"],
    ["policy shifted across the us", "Policy Shifted Across the US"],
    ["policy shifted across the eu", "Policy Shifted Across the EU"],
    ["trade expanded from the uk", "Trade Expanded From the UK"],
    ["trade expanded from the us", "Trade Expanded From the US"],
    ["trade expanded from the eu", "Trade Expanded From the EU"],
    ["talks resumed in the uk", "Talks Resumed in the UK"],
    ["talks resumed in the us", "Talks Resumed in the US"],
    ["talks resumed in the eu", "Talks Resumed in the EU"],
    ["security rules changed across the uk", "Security Rules Changed Across the UK"],
    ["security rules changed across the us", "Security Rules Changed Across the US"],
    ["security rules changed across the eu", "Security Rules Changed Across the EU"],
    ["new sanctions came from the uk", "New Sanctions Came From the UK"],
    ["new sanctions came from the us", "New Sanctions Came From the US"],
    ["new sanctions came from the eu", "New Sanctions Came From the EU"],

    // Longer real-world headlines
    ["apple expands manufacturing in the us", "Apple Expands Manufacturing in the US"],
    ["microsoft invests across the eu", "Microsoft Invests Across the EU"],
    ["tesla imports batteries from the uk", "Tesla Imports Batteries From the UK"],
    ["google launches ai services in the eu", "Google Launches AI Services in the EU"],
    ["amazon hires thousands across the us", "Amazon Hires Thousands Across the US"],
    ["nvidia opens research centre in the uk", "NVIDIA Opens Research Centre in the UK"],
    ["meta faces new privacy rules in the eu", "Meta Faces New Privacy Rules in the EU"],
    ["intel expands chip production in the us", "Intel Expands Chip Production in the US"],
    ["spotify grows subscriptions across the eu", "Spotify Grows Subscriptions Across the EU"],
    ["openai signs partnership in the uk", "OpenAI Signs Partnership in the UK"],

    // Multiple occurrences
    ["trade between the us and the eu", "Trade Between the US and the EU"],
    ["relations between the uk and the us", "Relations Between the UK and the US"],
    ["exports from the eu to the us", "Exports From the EU to the US"],
    ["imports from the uk into the eu", "Imports From the UK Into the EU"],
    ["leaders from the us met officials from the eu", "Leaders From the US Met Officials From the EU"],
    ["companies in the uk expanded into the us", "Companies in the UK Expanded Into the US"],

    // Mixed punctuation
    ["what happened in the us?", "What Happened in the US?"],
    ["breaking: elections in the uk", "Breaking: Elections in the UK"],
    ["report: inflation across the eu", "Report: Inflation Across the EU"],
    ["live updates from the us:", "Live Updates From the US:"],
    ["analysis — growth in the eu", "Analysis — Growth in the EU"],

    // Quotes
    ['"made in the us"', '"Made in the US"'],
    ["'built in the uk'", "'Built in the UK'"],
    ['officials called it "the future of the eu"', 'Officials Called It "The Future of the EU"'],

    // Parentheses
    ["new regulations (from the eu)", "New Regulations (From the EU)"],
    ["expansion plans (in the us)", "Expansion Plans (in the US)"],
    ["investment (across the uk)", "Investment (Across the UK)"],

    // Hyphenated phrases
    ["uk-based firms expanded in the us", "UK-Based Firms Expanded in the US"],
    ["eu-funded projects in the uk", "EU-Funded Projects in the UK"],
    ["us-backed investment across the eu", "US-Backed Investment Across the EU"],

    // Numbers
    ["10 factories opened in the us", "10 Factories Opened in the US"],
    ["5 new offices across the eu", "5 New Offices Across the EU"],
    ["2026 elections in the uk", "2026 Elections in the UK"],

    // Acronym not at end
    ["investment in the us surged again", "Investment in the US Surged Again"],
    ["companies across the eu reported profits", "Companies Across the EU Reported Profits"],
    ["growth from the uk exceeded forecasts", "Growth From the UK Exceeded Forecasts"],

    // All three in one title
    [
      "leaders from the uk met officials in the eu before travelling to the us",
      "Leaders From the UK Met Officials in the EU Before Travelling to the US",
    ],
    [
      "trade across the eu, the uk and the us increased",
      "Trade Across the EU, the UK and the US Increased",
    ],
  ];

  test.each(finalRegionalAcronymCases)("%s -> %s", (input, expected) => {
    const titleCaser = new TitleCaser({ style: "ap" });
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });
});

describe("TitleCaser AP – Style Stability", () => {
  // Brand normalization
  runTest('should normalize mixed-case brand names with "ap" style', "GOOgle and VMWARE", "Google and VMware");
  runTest('should preserve canonical brand casing regardless of input casing', "gOoGlE, vmware and MICROSOFT", "Google, VMware and Microsoft");
  runTest('should normalize brands at the beginning, middle and end of a title', "GOOGLE compares VMWARE with microsoft", "Google Compares VMware With Microsoft");
  runTest('should normalize possessive brand names', "GOOGLE's response to VMWARE's announcement", "Google's Response to VMware's Announcement");
  runTest('should normalize brand names adjacent to punctuation', "GOOGLE: VMWARE, microsoft and apple", "Google: VMware, Microsoft and Apple");

  // Case-sensitive names
  runTest('should handle brand name "NERDs Candy" with AP style', "NERDs Candy", "NERDs Candy");
  runTest('should preserve canonical internal capitals in names', "NERDS candy and nerds candy", "NERDs Candy and NERDs Candy");
  runTest('should preserve international brand casing with "ap" style', "skoda", "Škoda");
  runTest('should normalize uppercase international brand casing', "SKODA expands in europe", "Škoda Expands in Europe");
  runTest('should preserve international characters in possessives', "skoda's new strategy", "Škoda's New Strategy");
  runTest('should preserve international brand casing after punctuation', "automakers: skoda, saab and volvo", "Automakers: Škoda, Saab and Volvo");

  // Possessives and punctuation
  runTest(
    "should handle possessives and colons in AP style",
    "the iphone's impact on modern communication: a sociolinguistic analysis",
    "The iPhone's Impact on Modern Communication: A Sociolinguistic Analysis",
  );
  runTest(
    "should preserve possessive apostrophes while normalizing brand casing",
    "apple's iphone and google's android strategy",
    "Apple's iPhone and Google's Android Strategy",
  );
  runTest(
    "should capitalize the first word after a colon",
    "software architecture: a practical guide to scalable systems",
    "Software Architecture: A Practical Guide to Scalable Systems",
  );
  runTest(
    "should capitalize a normally lowercase word after a colon",
    "the final decision: to build or to buy",
    "The Final Decision: To Build or To Buy",
  );
  runTest(
    "should handle multiple punctuation boundaries",
    "apple's strategy: hardware, software and services: a complete analysis",
    "Apple's Strategy: Hardware, Software and Services: A Complete Analysis",
  );

  // Compound normalization
  runTest('should handle hyphenated "BACK-end" with AP style', "BACK-end and front-end", "Backend and Frontend");
  runTest('should normalize inconsistent backend spelling and casing', "BACK END, back-end and backend", "Backend, Backend and Backend");
  runTest('should normalize inconsistent frontend spelling and casing', "FRONT END, front-end and frontend", "Frontend, Frontend and Frontend");
  runTest(
    "should normalize spelling replacements before applying AP casing",
    "back end and full stack developers",
    "Backend and Fullstack Developers",
  );
  runTest(
    "should normalize replacements adjacent to punctuation",
    "back-end, front end and full-stack: a developer guide",
    "Backend, Frontend and Fullstack: A Developer Guide",
  );
  runTest(
    "should normalize replacement terms in possessive form",
    "the back end's performance and the full stack's complexity",
    "The Backend's Performance and the Fullstack's Complexity",
  );
  runTest(
    "should normalize full stack by position and apply AP casing",
    "full stack teams hire full-stack developers for full stack",
    "Fullstack Teams Hire Fullstack Developers for Fullstack",
  );
  runTest(
    "should normalize every supported full stack variant",
    "FULL STACK, full-stack, Full Stack and fullstack",
    "Fullstack, Fullstack, Fullstack and Fullstack",
  );
  runTest(
    "should not partially normalize unrelated compound words",
    "the stack overflow backend discussion",
    "The Stack Overflow Backend Discussion",
  );

  // Canonical technology replacements
  runTest(
    "should preserve canonical replacement casing by position in AP style",
    "reactjs teams build tools with node.js and reactjs",
    "React Teams Build Tools With Node.js and React",
  );
  runTest(
    "should normalize multiple React aliases",
    "REACTJS, react.js and reactjs applications",
    "React, React and React Applications",
  );
  runTest(
    "should normalize multiple Node.js aliases",
    "NODEJS, nodejs and node.js services",
    "Node.js, Node.js and Node.js Services",
  );
  runTest(
    "should preserve canonical technology casing next to punctuation",
    "tools include reactjs; nodejs; javascript; and typescript",
    "Tools Include React; Node.js; JavaScript; and TypeScript",
  );
  runTest(
    "should preserve canonical technology casing in possessives",
    "nodejs's runtime model and reactjs's component model",
    "Node.js's Runtime Model and React's Component Model",
  );
  runTest(
    "should not replace technology names inside larger words",
    "the nodejson parser and prereactjs package",
    "The Nodejson Parser and Prereactjs Package",
  );

  // Acronyms
  runTest(
    "should handle acronym with colon in AP style",
    "revolutionizing the publishing industry: insights from a cto on ebook development and innovation",
    "Revolutionizing the Publishing Industry: Insights From a CTO on eBook Development and Innovation",
  );
  runTest(
    "should normalize acronyms regardless of input casing",
    "a ceo, cto and cio discuss ai",
    "A CEO, CTO and CIO Discuss AI",
  );
  runTest(
    "should normalize plural acronyms",
    "cios and ctos discuss apis",
    "CIOs and CTOs Discuss APIs",
  );
  runTest(
    "should normalize possessive acronyms",
    "the ceo's response to the cto's proposal",
    "The CEO's Response to the CTO's Proposal",
  );
  runTest(
    "should preserve acronym casing at punctuation boundaries",
    "leadership changes: ceo, cto, cio and cfo",
    "Leadership Changes: CEO, CTO, CIO and CFO",
  );
  runTest(
    "should distinguish canonical acronyms from ordinary lowercase words",
    "the radio host met the cio",
    "The Radio Host Met the CIO",
  );

  // Technology and platform casing
  runTest(
    "should handle brand casing with AP-style logic",
    "nodejs development on aws: an in-depth tutorial on server-side javascript deployment",
    "Node.js Development on AWS: An In-Depth Tutorial on Server-Side JavaScript Deployment",
  );
  runTest(
    "should normalize technology casing in a dense technical title",
    "javascript, typescript, nodejs and aws for api development",
    "JavaScript, TypeScript, Node.js and AWS for API Development",
  );
  runTest(
    "should preserve canonical casing after hyphens",
    "aws-based nodejs deployment for javascript applications",
    "AWS-Based Node.js Deployment for JavaScript Applications",
  );
  runTest(
    "should preserve eBook casing in singular and plural forms",
    "ebook development and ebooks for schools",
    "eBook Development and eBooks for Schools",
  );
  runTest(
    "should preserve e-commerce casing across input variants",
    "ECOMMERCE, eCommerce and e-commerce growth",
    "E-Commerce, E-Commerce and E-Commerce Growth",
  );

  // False-positive acronym protection
  runTest(
    'should not force ordinary "plan" to military acronym casing',
    "inside a high-profile, long-term plan for e-commerce growth",
    "Inside a High-Profile, Long-Term Plan for E-Commerce Growth",
  );
  runTest(
    'should preserve ordinary words that contain known acronym sequences',
    "a company plans to expand its apiary",
    "A Company Plans To Expand Its Apiary",
  );
  runTest(
    'should not convert "us" to an acronym when used as a pronoun',
    "what technology can teach us about work",
    "What Technology Can Teach Us About Work",
  );
  runTest(
    'should convert "us" when context identifies the country',
    "technology investment in the us",
    "Technology Investment in the US",
  );
  runTest(
    'should not convert "it" to an acronym when used as a pronoun',
    "how it works and why it matters",
    "How It Works and Why It Matters",
  );
  runTest(
    'should convert "IT" when used as the technology discipline',
    "careers in it and cybersecurity",
    "Careers in IT and Cybersecurity",
  );

  // Infinitive and prepositional "to"
  runTest(
    'should capitalize "to" in AP infinitives',
    "how to succeed in business without trying",
    "How To Succeed in Business Without Trying",
  );
  runTest(
    'should capitalize consecutive infinitive uses of "to"',
    "how to plan, to build and to launch",
    "How To Plan, To Build and To Launch",
  );
  runTest(
    'should capitalize infinitive "to" after punctuation',
    "the objective: to reduce costs",
    "The Objective: To Reduce Costs",
  );
  runTest(
    'should capitalize infinitive "to" before a phrasal verb',
    "how to scale up without burning out",
    "How To Scale Up Without Burning Out",
  );
  runTest(
    'should keep prepositional "to" lowercase in AP style',
    "back to the future",
    "Back to the Future",
  );
  runTest(
    'should keep directional "to" lowercase',
    "from london to paris",
    "From London to Paris",
  );
  runTest(
    'should keep recipient "to" lowercase',
    "a letter to the editor",
    "A Letter to the Editor",
  );
  runTest(
    'should distinguish prepositional and infinitive uses of "to" in one title',
    "a guide to learning how to code",
    "A Guide to Learning How To Code",
  );
  runTest(
    'should distinguish directional and infinitive uses of "to" in one title',
    "from idea to execution: how to launch",
    "From Idea to Execution: How To Launch",
  );

  // AP small-word stability
  runTest(
    "should keep coordinating conjunctions lowercase",
    "hardware and software or services but not support",
    "Hardware and Software or Services but Not Support",
  );
  runTest(
    "should keep short prepositions lowercase",
    "a guide for teams with tools from experts",
    "A Guide for Teams With Tools From Experts",
  );
  runTest(
    "should capitalize small words at the beginning",
    "and then there were none",
    "And Then There Were None",
  );
  runTest(
    "should capitalize small words at the end",
    "what are we waiting for",
    "What Are We Waiting For",
  );
  runTest(
    "should capitalize small words after a colon",
    "the missing feature: and why it matters",
    "The Missing Feature: And Why It Matters",
  );

  // Idempotence and already-correct input
  runTest(
    "should preserve an already correctly cased AP title",
    "Node.js Development on AWS: An In-Depth Tutorial",
    "Node.js Development on AWS: An In-Depth Tutorial",
  );
  runTest(
    "should preserve canonical brands and acronyms in correct input",
    "Google and VMware Expand AI Operations in the US",
    "Google and VMware Expand AI Operations in the US",
  );
  runTest(
    "should stabilize aggressively inconsistent casing",
    "gOOGLE BUILDS a NODEJS BACK-end FOR the US MARKET",
    "Google Builds a Node.js Backend for the US Market",
  );

  // Gaming and platform brands
  runTest(
    "should preserve gaming platform brand casing",
    "xbox game pass and playstation 5 compete with nintendo switch",
    "Xbox Game Pass and PlayStation 5 Compete With Nintendo Switch",
  );
  runTest(
    "should preserve major game title casing",
    "call of duty and the last of us lead console sales",
    "Call of Duty and The Last of Us Lead Console Sales",
  );
  runTest(
    "should preserve game engine and store casing",
    "unreal engine, steam deck and xbox game pass shape indie games",
    "Unreal Engine, Steam Deck and Xbox Game Pass Shape Indie Games",
  );
  runTest(
    "should preserve publisher and studio casing",
    "activision blizzard, epic games and riot games expand esports",
    "Activision Blizzard, Epic Games and Riot Games Expand Esports",
  );
  runTest(
    "should preserve gaming punctuation and symbols",
    "battle.net updates arrive for call of duty: warzone",
    "Battle.net Updates Arrive for Call of Duty: Warzone",
  );
});

describe("TitleCaser AP – Failed Chicago Regression Coverage", () => {
  // Regional acronym compounds
  runTest(
    "should normalize uppercase suffix in regional compound",
    "US-BACKED reforms",
    "US-Backed Reforms",
  );
  runTest(
    "should normalize lowercase acronym and uppercase suffix",
    "us-BACKED reforms",
    "US-Backed Reforms",
  );
  runTest(
    "should normalize alternating casing in regional compound",
    "uS-bAcKeD reforms",
    "US-Backed Reforms",
  );
  runTest(
    "should normalize multiple malformed regional compounds",
    "US-BACKED, uk-FuNdEd and eU-LED projects",
    "US-Backed, UK-Funded and EU-Led Projects",
  );
  runTest(
    "should normalize mixed dash types in regional compound",
    "us-uk–led coalition",
    "US-UK-Led Coalition",
  );
  runTest(
    "should normalize regional acronym compound using an en dash",
    "us–backed coalition",
    "US-Backed Coalition",
  );
  runTest(
    "should normalize regional acronym compound using an em dash",
    "eu—funded initiative",
    "EU-Funded Initiative",
  );

  // Slash-separated acronyms and words
  runTest(
    "should capitalize an ordinary word after a slash",
    "campus/usability-backed study",
    "Campus/Usability-Backed Study",
  );
  runTest(
    "should normalize slash-separated regional acronyms",
    "us/uk partnership",
    "US/UK Partnership",
  );
  runTest(
    "should normalize three slash-separated regional acronyms",
    "us/uk/eu agreement",
    "US/UK/EU Agreement",
  );
  runTest(
    "should normalize slash-separated regional acronyms followed by a compound",
    "us/uk-led coalition",
    "US/UK-Led Coalition",
  );
  runTest(
    "should normalize dotted regional acronym before a slash",
    "u.s./uk agreement",
    "U.S./UK Agreement",
  );
  runTest(
    "should normalize regional acronym after a slash",
    "north america/us-led initiative",
    "North America/US-Led Initiative",
  );
  runTest(
    "should normalize reserved technology terms around a slash",
    "nodejs/reactjs development",
    "Node.js/React Development",
  );
  runTest(
    "should capitalize slash-separated alternatives",
    "input/output design",
    "Input/Output Design",
  );
  runTest(
    "should capitalize multiple slash-separated alternatives",
    "input/output/read/write operations",
    "Input/Output/Read/Write Operations",
  );

  // URL preservation
  runTest(
    "should preserve lowercase HTTPS protocol",
    "visit https://example.com for more information",
    "Visit https://example.com for More Information",
  );
  runTest(
    "should preserve lowercase HTTP protocol",
    "read http://example.com before continuing",
    "Read http://example.com Before Continuing",
  );
  runTest(
    "should preserve URL protocol and path casing",
    "visit https://example.com/api/v2 for sdk documentation",
    "Visit https://example.com/api/v2 for SDK Documentation",
  );
  runTest(
    "should preserve a URL inside parentheses",
    "documentation (https://example.com/api) for developers",
    "Documentation (https://example.com/api) for Developers",
  );
  runTest(
    "should preserve URL query parameters",
    "visit https://example.com/search?q=nodejs for more information",
    "Visit https://example.com/search?q=nodejs for More Information",
  );
  runTest(
    "should preserve URL fragments",
    "read https://example.com/docs#api before continuing",
    "Read https://example.com/docs#api Before Continuing",
  );

  // Hyphenated compounds
  runTest(
    "should normalize uppercase compound elements",
    "HIGH-speed LOW-latency networking",
    "High-Speed Low-Latency Networking",
  );
  runTest(
    "should normalize alternating-case compound elements",
    "hIgH-sPeEd lOw-LaTeNcY networking",
    "High-Speed Low-Latency Networking",
  );
  runTest(
    "should normalize uppercase multi-hyphen compound",
    "STATE-OF-THE-ART systems",
    "State-of-the-Art Systems",
  );
  runTest(
    "should lowercase minor elements inside multi-hyphen compounds",
    "state-of-the-art systems",
    "State-of-the-Art Systems",
  );
  runTest(
    "should normalize multiple multi-hyphen compounds",
    "state-of-the-art and one-of-a-kind systems",
    "State-of-the-Art and One-of-a-Kind Systems",
  );
  runTest(
    "should normalize a multi-hyphen phrase within a title",
    "a state-of-the-art cloud-native system",
    "A State-of-the-Art Cloud-Native System",
  );
  runTest(
    "should normalize uppercase regional and ordinary compound elements together",
    "US-GOVERNMENT-BACKED reforms",
    "US-Government-Backed Reforms",
  );
  runTest(
    "should preserve minor words inside a regional multi-hyphen compound",
    "us-state-of-the-art technology",
    "US-State-of-the-Art Technology",
  );

  // Technical acronyms
  runTest(
    "should normalize lowercase technical acronyms",
    "api and sdk design",
    "API and SDK Design",
  );
  runTest(
    "should normalize plural technical acronyms",
    "apis and sdks for developers",
    "APIs and SDKs for Developers",
  );
  runTest(
    "should normalize possessive technical acronyms",
    "the api's response and sdk's output",
    "The API's Response and SDK's Output",
  );
  runTest(
    "should normalize curly possessive technical acronyms",
    "the api’s response and sdk’s output",
    "The API’s Response and SDK’s Output",
  );
  runTest(
    "should normalize technical acronyms around punctuation",
    "tools include api, sdk, css3 and html5",
    "Tools Include API, SDK, CSS3 and HTML5",
  );
  runTest(
    "should normalize technical acronyms around slashes",
    "api/sdk development",
    "API/SDK Development",
  );
  runTest(
    "should preserve versioned technical acronyms",
    "html5 and css3 development",
    "HTML5 and CSS3 Development",
  );

  // Canonical brands and reserved terms
  runTest(
    "should preserve canonical PlayStation casing",
    "iphone 16 and playstation 5",
    "iPhone 16 and PlayStation 5",
  );
  runTest(
    "should normalize mixed-case PlayStation",
    "PLAYSTATION and IPHONE gaming",
    "PlayStation and iPhone Gaming",
  );
  runTest(
    "should normalize reserved words inside parentheses",
    "machine learning (GOOGLE tensorflow)",
    "Machine Learning (Google TensorFlow)",
  );
  runTest(
    "should normalize reserved terms before trademark symbols",
    "tensorflow™ platform",
    "TensorFlow™ Platform",
  );
  runTest(
    "should normalize multiple reserved terms beside symbols",
    "tensorflow™ and google® cloud tools",
    "TensorFlow™ and Google® Cloud Tools",
  );
  runTest(
    "should normalize reserved terms inside brackets",
    "machine learning [google tensorflow]",
    "Machine Learning [Google TensorFlow]",
  );
  runTest(
    "should normalize Node.js inside parentheses",
    "development (nodejs and reactjs)",
    "Development (Node.js and React)",
  );

  // Parenthetical and bracket boundaries
  runTest(
    "should capitalize the first word inside parentheses",
    "software design (a practical guide)",
    "Software Design (A Practical Guide)",
  );
  runTest(
    "should capitalize an article inside parentheses",
    "software design (the complete guide)",
    "Software Design (The Complete Guide)",
  );
  runTest(
    "should capitalize the first word inside brackets",
    "software design [a practical guide]",
    "Software Design [A Practical Guide]",
  );
  runTest(
    "should capitalize a conjunction inside parentheses",
    "software design (and why it matters)",
    "Software Design (And Why It Matters)",
  );
  runTest(
    "should capitalize a preposition inside brackets",
    "software design [from concept to launch]",
    "Software Design [From Concept to Launch]",
  );
  runTest(
    "should handle nested quotes inside parentheses",
    'software design ("a practical guide")',
    'Software Design ("A Practical Guide")',
  );

  // HTML break boundaries
  runTest(
    "should capitalize a minor word after an HTML break",
    "the first line<br>and the second line",
    "The First Line <br> And the Second Line",
  );
  runTest(
    "should capitalize a minor word after a self-closing HTML break",
    "the first line<br/>and the second line",
    "The First Line <br> And the Second Line",
  );
  runTest(
    "should capitalize a minor word after an uppercase HTML break",
    "the first line<BR>and the second line",
    "The First Line <br> And the Second Line",
  );
  runTest(
    "should capitalize text after an HTML break inside quotes",
    '"the first line<br>the second line"',
    '"The First Line <br> The Second Line"',
  );
  runTest(
    "should preserve technical acronym casing around an HTML break",
    "nodejs and aws<br>api and sdk development",
    "Node.js and AWS <br> API and SDK Development",
  );

  // Whitespace around punctuation
  runTest(
    "should normalize whitespace around a colon",
    "software   :   a practical guide",
    "Software: A Practical Guide",
  );
  runTest(
    "should normalize whitespace around a hyphen",
    "cloud - native systems",
    "Cloud-Native Systems",
  );
  runTest(
    "should normalize whitespace around multiple hyphens",
    "state - of - the - art systems",
    "State-of-the-Art Systems",
  );
  runTest(
    "should normalize whitespace around a slash",
    "input / output design",
    "Input/Output Design",
  );
  runTest(
    "should normalize whitespace around punctuation and preserve acronyms",
    "api   /   sdk   :   a practical guide",
    "API/SDK: A Practical Guide",
  );

  // Smart quotes and apostrophes
  createTest(
    "should normalize Node.js inside smart single quotes",
    { style: "ap", smartQuotes: true },
    "'a guide to nodejs'",
    "‘A Guide to Node.js’",
  );
  createTest(
    "should convert a leading apostrophe to a closing smart apostrophe",
    { style: "ap", smartQuotes: true },
    "'tis the season for coding",
    "’Tis the Season for Coding",
  );
  createTest(
    "should distinguish a leading apostrophe from an opening quote",
    { style: "ap", smartQuotes: true },
    "'twas the night before deployment",
    "’Twas the Night Before Deployment",
  );
  createTest(
    "should preserve an actual single-quoted title",
    { style: "ap", smartQuotes: true },
    "'the future of software'",
    "‘The Future of Software’",
  );
  createTest(
    "should normalize reserved terms inside smart quotes",
    { style: "ap", smartQuotes: true },
    '"google tensorflow and nodejs"',
    "“Google TensorFlow and Node.js”",
  );
});

runNameHeuristicTitleCaseTests(TitleCaser, "ap");
runRareNounTrapTitleCaseTests(TitleCaser, "ap");
