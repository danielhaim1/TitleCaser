import { TitleCaser } from "../index.js";

// Reusable test helper
function runTest(description, input, expected, style = "ap") {
  test(description, () => {
    const titleCaser = new TitleCaser({ style });
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput).toBe(expected);
  });
}

const createTest = (description, options, input, expectedOutput) => {
  test(description, () => {
    const titleCaser = new TitleCaser(options);
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput).toEqual(expectedOutput);
  });
};

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
// 2. Disambiguation of Acronym vs. Pronoun (Alpha2/3 Codes)
//
describe("TitleCaser – Disambiguation of Acronym vs. Pronoun (AP Style)", () => {
  //
  // US Acronym – Regional Context
  //
  runTest(
    'should capitalize "US" when preceded by "the"',
    "They signed the treaty with the us",
    "They Signed the Treaty With the US",
  );
  runTest(
    'should capitalize "US" in geopolitical context (with comma)',
    "The us, despite its size, has a significant impact.",
    "The US, Despite Its Size, Has a Significant Impact.",
  );
  runTest(
    'should capitalize "US" and "UK" together',
    "The us and the uk signed the treaty",
    "The US and the UK Signed the Treaty",
  );
  runTest('should capitalize "US" after "from the"', "Support came from the us", "Support Came From the US");
  runTest('should capitalize "US" after "via"', "The message was relayed via us", "The Message Was Relayed via US");
  runTest(
    'should capitalize "US" before "Military"',
    "Partnering with the us Military",
    "Partnering With the US Military",
  );

  // !TODO AP Hyphenation Edge Case:
  // * Current output: "US-backed"
  // * Expected (per AP headline style): "US-backed" OR possibly "US-Backed"
  // * AP guidance on hyphenated compounds in headlines can vary depending on interpretation.
  // * Need to confirm whether AP intends only the first element capitalized,
  // * or both elements when the first is a proper noun/acronym (e.g., "US-backed").
  // * Revisit logic in correctTermHyphenated() once rule is clarified.
  // AP: Hyphenated Compound with Regional Acronym (second element lowercase)
  //   runTest(
  //     'AP: should lowercase second element in "US-backed"',
  //     "The us-backed initiative aims to promote sustainability.",
  //     "The US-Backed Initiative Aims to Promote Sustainability.",
  //     "ap",
  //   );
  //   //   AP: Multi-hyphen compound should only capitalize first major segment
  //   runTest(
  //     "AP: should lowercase trailing elements in multi-hyphen compound",
  //     "us-uk-led coalition",
  //     "US-UK-led Coalition",
  //     "ap",
  //   );

  // ! Test: Hyphenated Compound with Regional Acronym
  runTest(
    'should capitalize "US" in "US-backed" phrase',
    "The us-backed initiative aims to promote sustainability.",
    "The US-Backed Initiative Aims to Promote Sustainability.",
  );
  // ! Test: Multi-Hyphen Compound with Regional Acronym
  runTest(
    "should handle multi-hyphen compound with regional acronym",
    "us-uk-led coalition",
    "US-UK-Led Coalition",
    "chicago",
  );
  // ! Test: Acronym as Second Segment
  runTest("should handle second-position regional acronym", "pro-us policies", "Pro-US Policies", "chicago");
  // ! Test: Mixed-Case Regional Acronym in Hyphenated Word
  runTest(
    "should normalize mixed-case regional acronym in hyphenated word",
    "Us-backed reforms",
    "US-Backed Reforms",
    "chicago",
  );
  // ! Test: Dotted Acronym in Hyphenated Word
  runTest(
    "should normalize dotted acronym in hyphenated word",
    "u.s.-backed initiative",
    "U.S.-Backed Initiative",
    "chicago",
  );
  // ! Test: Hyphenated Regional Acronym at Start of Sentence
  runTest(
    "should handle hyphenated regional acronym at start of sentence",
    "us-backed reforms continue",
    "US-Backed Reforms Continue",
    "chicago",
  );
  // ! Test: Regional Acronym in Parenthetical Hyphen
  runTest(
    "should handle regional acronym in parenthetical hyphen",
    "(us-backed) initiative",
    "(US-Backed) Initiative",
    "chicago",
  );
  // ! Test: Regional Acronym with En/Em Dash
  runTest("should handle en dash with regional acronym", "us–backed coalition", "US–Backed Coalition", "chicago");
  // ! Test: Regional Acronym with Trailing Punctuation
  runTest(
    "should handle regional acronym compound with trailing punctuation",
    "the us-backed initiative.",
    "The US-Backed Initiative.",
    "chicago",
  );
  // ! Test: False Positive Avoidance – "us" as Part of Longer Word
  runTest(
    'should not uppercase "us" inside longer word',
    "museum-backed initiative",
    "Museum-Backed Initiative",
    "chicago",
  );
  // ! Edge Case: Acronym-Like Prefix Not Treated as Regional Acronym
  runTest(
    "should not treat random two-letter prefix as regional acronym",
    "as-backed reforms",
    "As-Backed Reforms",
    "chicago",
  );
  runTest(
    'should capitalize "US" in geopolitical context (repeated case)',
    "The us, despite its size, has a significant impact.",
    "The US, Despite Its Size, Has a Significant Impact.",
  );

  //
  // "us" as a Pronoun Under AP Headline Style
  //
  runTest('should capitalize pronoun "us" (case #1)', "It’s up to us to decide.", "It’s Up to Us to Decide.");
  runTest('should capitalize pronoun "us" (case #2)', "You can partner with us.", "You Can Partner With Us.");
  runTest('should capitalize pronoun "us" (case #3)', "partner with us", "Partner With Us");

  //
  // Additional UK and Mixed Cases
  //
  runTest(
    'should capitalize "UK" in geopolitical context (with comma)',
    "The uk, despite its size, has a significant impact.",
    "The UK, Despite Its Size, Has a Significant Impact.",
  );
  runTest(
    "should handle multiple country codes in same sentence",
    "We visited the uk and the US, and both were memorable.",
    "We Visited the UK and the US, and Both Were Memorable.",
  );
  runTest(
    'should capitalize pronoun "us" in a parenthetical phrase',
    "It has a varied landscape, and us, the citizens, appreciate it.",
    "It Has a Varied Landscape, and Us, the Citizens, Appreciate It.",
  );
  runTest(
    'should capitalize "USA" in formal context',
    "The usa has a varied landscape.",
    "The USA Has a Varied Landscape.",
  );
  runTest(
    'should capitalize "US" before "government" (AP style)',
    "Discussing the us government policies.",
    "Discussing the US Government Policies.",
  );
  runTest(
    'should capitalize "US" before "military" (AP style)',
    "Discussing the us military strategies.",
    "Discussing the US Military Strategies.",
  );
  runTest(
    'should capitalize "US" in geopolitical context (policy mention)',
    "Discussing the us policies.",
    "Discussing the US Policies.",
  );
  runTest(
    'should capitalize "US" before "Military" (repeat case)',
    "Partnering with the us Military",
    "Partnering With the US Military",
  );

  //
  // End of Sentence Handling
  //
  runTest(
    'should capitalize "US" at the end of a sentence',
    "This policy was created by the us",
    "This Policy Was Created by the US",
  );

  //
  // More Pronoun Cases
  //
  runTest('should capitalize pronoun "us" in casual speech', "They want to talk to us", "They Want to Talk to Us");
  runTest(
    'should capitalize pronoun "us" in emotional context',
    "They really care about us",
    "They Really Care About Us",
  );
  runTest(
    'should capitalize pronoun "us" in passive voice',
    "The system was built for us",
    "The System Was Built for Us",
  );
  runTest('should capitalize pronoun "us" with a compound verb', "She stood near us", "She Stood Near Us");
  runTest(
    'should capitalize pronoun "us" in an inverted clause',
    "Not everything depends on us",
    "Not Everything Depends on Us",
  );
  runTest(
    'should capitalize pronoun "us" (repeat case #1)',
    "It\u2019s up to us to decide.",
    "It\u2019s Up to Us to Decide.",
  );
  runTest('should capitalize pronoun "us" (repeat case #2)', "You can partner with us.", "You Can Partner With Us.");
  runTest(
    'should capitalize pronoun "us" before "US Military"',
    "It\u2019s up to us in the US military to decide.",
    "It\u2019s Up to Us in the US Military to Decide.",
  );
  runTest(
    'should capitalize pronoun "us" before "military"',
    "It\u2019s up to us in the military to decide.",
    "It\u2019s Up to Us in the Military to Decide.",
  );
  runTest(
    'should capitalize pronoun "us" in a comma-separated clause',
    "It has a varied landscape, and us, the citizens, appreciate it.",
    "It Has a Varied Landscape, and Us, the Citizens, Appreciate It.",
  );

  //
  // Additional UK/USA Testing
  //
  runTest(
    'should capitalize "UK" at end of sentence',
    "This initiative was led by the uk",
    "This Initiative Was Led by the UK",
  );
  runTest(
    'should capitalize "UK" in geopolitical context (repeat with comma)',
    "The uk, despite its size, has a significant impact.",
    "The UK, Despite Its Size, Has a Significant Impact.",
  );
  runTest(
    'should capitalize "UK" before government mention',
    "The uk, with its strong government, leads the way.",
    "The UK, With Its Strong Government, Leads the Way.",
  );
  runTest(
    'should capitalize "UK" before territory mention',
    "The uk, with its vast territory, has diverse landscapes.",
    "The UK, With Its Vast Territory, Has Diverse Landscapes.",
  );

  //
  // Mixed Acronym/Pronoun Scenarios
  //
  runTest(
    "should handle multiple country codes and pronouns in one sentence",
    "We visited the uk and the US, and both were memorable.",
    "We Visited the UK and the US, and Both Were Memorable.",
  );
  runTest(
    "should handle multiple codes and pronouns with mention of military",
    "We visited the uk and the US, and both have strong military forces.",
    "We Visited the UK and the US, and Both Have Strong Military Forces.",
  );
  runTest(
    "should handle multiple codes and pronouns with mention of talks",
    "We visited the uk and the US, and both engage in diplomatic talks.",
    "We Visited the UK and the US, and Both Engage in Diplomatic Talks.",
  );
  runTest(
    "should handle multiple codes and pronouns with mention of a bill",
    "We visited the uk and the US, and both consider a bill for environmental protection.",
    "We Visited the UK and the US, and Both Consider a Bill for Environmental Protection.",
  );

  //
  // USA and Variants
  //
  runTest(
    'should capitalize "USA" in formal context (repeat case)',
    "The usa has a varied landscape.",
    "The USA Has a Varied Landscape.",
  );
  runTest(
    'should capitalize "USA" before a bill mention',
    "The usa introduces a new bill for economic reform.",
    "The USA Introduces a New Bill for Economic Reform.",
  );

  //
  // AP-Style Example with Mixed Acronyms
  //
  runTest(
    'should handle AP-style acronym "U.S." in uppercase context',
    "URGE U.S. AND CANADIAN GOVERNMENT OFFICIALS TO PROTECT NORTH ATLANTIC RIGHT WHALES",
    "Urge U.S. And Canadian Government Officials to Protect North Atlantic Right Whales",
  );

  //
  // Phrases with Symbols
  //
  runTest('should handle "On & Off" phrases #1', "We Are On & Off The Field", "We Are On & Off the Field");
  runTest('should handle "On & Off" phrases #2', "we are on and off the field", "We Are On and Off the Field");
});

//
// 3. Hyphenated and Apostrophized Words
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
  runTest(
    "should handle brand casing with AP-style logic",
    "nodejs development on aws: an in-depth tutorial on server-side javascript deployment",
    "Node.js Development on AWS: An In-depth Tutorial on Server-side JavaScript Deployment",
  );
  runTest('should preserve correct casing in hyphenated names like "louis-iv"', "louis-iv", "Louis-IV");
  runTest(
    "should properly capitalize prepositions beyond 3 letters",
    "what's to say about this?",
    "What's to Say About This?",
  );
});

//
// 5. TitleCaser Class Methods
//
describe("TitleCaser – Class Methods (setReplaceTerms, addExactPhraseReplacements, etc.)", () => {
  test("should apply Wikipedia style to an entire sentence", () => {
    const titleCaser = new TitleCaser({ style: "wikipedia" });
    const input = "Mitigating ddos attacks on aws: strategies for protecting your web infrastructure using github";
    const expected = "Mitigating DDoS attacks on AWS: strategies for protecting your web infrastructure using GitHub";
    const output = titleCaser.toTitleCase(input);
    expect(output).toBe(expected);
  });

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

//
// 6. Variation Stability Across Styles
//
describe("TitleCaser – Variation Stability Tests (AP, Chicago, APA, NYT, Wikipedia)", () => {
  // AP Style
  runTest('should correctly handle brand names with "ap" style', "GOOgle and VMWARE", "Google and VMware", "ap");
  runTest('should handle brand name "NERDs Candy" with AP style', "NERDs Candy", "NERDs Candy", "ap");
  runTest(
    "should handle possessives and colons (AP style)",
    "the iphone's impact on modern communication: a sociolinguistic analysis",
    "The iPhone's Impact on Modern Communication: A Sociolinguistic Analysis",
    "ap",
  );
  runTest('should handle hyphenated "BACK-end" with AP style', "BACK-end and front-end", "Backend and Frontend", "ap");
  runTest(
    "should handle acronym with colon (AP style)",
    "revolutionizing the publishing industry: insights from a cto on ebook development and innovation",
    "Revolutionizing the Publishing Industry: Insights From a CTO on eBook Development and Innovation",
    "ap",
  );

  // Chicago Style
  runTest(
    "should handle colon + comparison phrase (Chicago)",
    "VMware vs. VirtualBox: a comparative study of virtualization software",
    "VMware vs. VirtualBox: A Comparative Study of Virtualization Software",
    "chicago",
  );
  runTest(
    "should capitalize hyphenated terms (Chicago)",
    "nodejs development on aws: an in-depth tutorial on server-side javascript deployment",
    "Node.js Development on AWS: An In-Depth Tutorial on Server-Side JavaScript Deployment",
    "chicago",
  );
  runTest(
    "should apply custom replacements for brand names (Chicago)",
    "Back-End Web Development: Building Scalable APIs with nodejs",
    "Backend Web Development: Building Scalable APIs With Node.js",
    "chicago",
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
    "chicago",
  );

  // APA Style
  runTest(
    "should capitalize after colon (APA)",
    "the art of negotiation: strategies for successful business deals",
    "The Art of Negotiation: Strategies for Successful Business Deals",
    "apa",
  );
  runTest(
    "should handle colon and apostrophes (APA)",
    "the science of nutrition: debunking myths and fads",
    "The Science of Nutrition: Debunking Myths and Fads",
    "apa",
  );
  runTest(
    "should handle short conjunctions and brand normalization (APA)",
    "the impact of social media on mental health: a study of instagram, TIKTOK, and SnapChat",
    "The Impact of Social Media on Mental Health: A Study of Instagram, TikTok, and Snapchat",
    "apa",
  );

  // NYT Style
  runTest(
    "should handle acronym + colon usage (NYT)",
    "the future of ai: how iot and machine learning will change the world",
    "The Future of AI: How IoT and Machine Learning Will Change the World",
    "nyt",
  );

  // Wikipedia (Sentence Case)
  runTest(
    "should preserve sentence case for Wikipedia style (DevOps example)",
    "the future of devops: how to prepare for the next era of software development",
    "The future of DevOps: how to prepare for the next era of software development",
    "wikipedia",
  );
  runTest(
    "should handle Wikipedia style with colon usage",
    "The business of fashion: how luxury brands set themselves apart",
    "The business of fashion: how luxury brands set themselves apart",
    "wikipedia",
  );
});

//
// 7. Reserved Words & Special Handling
//
describe("TitleCaser – Reserved Words & Special Handling", () => {
  const style = "chicago";

  test("should transform a single reserved word correctly", () => {
    const titleCaser = new TitleCaser({ style });
    const input = "GOOGle tensorflow";
    const expected = "Google TensorFlow";
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });

  test("should transform sentence with reserved word + colon", () => {
    const titleCaser = new TitleCaser({ style });
    const input = "GooGlE vs. VirtualBox: a comparative study of virtualization software";
    const expected = "Google vs. VirtualBox: A Comparative Study of Virtualization Software";
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });

  test("should handle possessive form of reserved word", () => {
    const titleCaser = new TitleCaser({ style });
    const input = "GOOGle's tensorflow";
    const expected = "Google's TensorFlow";
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });

  test('should apply brand replacements (e.g., "mcdonalds" → "McDonald\'s")', () => {
    const titleCaser = new TitleCaser({ style });
    titleCaser.setReplaceTerms([
      { mcdonalds: "McDonald's" },
      { skoda: "Škoda" },
      { "cyber-security": "Cybersecurity" },
    ]);

    const testCases = [
      { input: "cyber-security", expected: "Cybersecurity" },
      { input: "skoda", expected: "Škoda" },
      { input: "mcdonalds", expected: "McDonald's" },
    ];

    testCases.forEach(({ input, expected }) => {
      expect(titleCaser.toTitleCase(input)).toBe(expected);
    });
  });

  test("should handle HTML <br> with colon (spaced)", () => {
    const titleCaser = new TitleCaser({ style });
    const input = "Exploring the future of devops:<br>Preparing for the next era of software development";
    const expected = "Exploring the Future of DevOps: <br> Preparing for the Next Era of Software Development";
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });

  test("should handle HTML <br> with full sentence split", () => {
    const titleCaser = new TitleCaser({ style });
    const input =
      "Exploring the Future of DevOps:<br>Guidelines for Preparing for the Next Era in Software Development";
    const expected =
      "Exploring the Future of DevOps: <br> Guidelines for Preparing for the Next Era in Software Development";
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });

  test("should handle <br> with no space after colon", () => {
    const titleCaser = new TitleCaser({ style });
    const input = "The future of DevOps:<br>How to prepare for the next era of software development";
    const expected = "The Future of DevOps: <br> How to Prepare for the Next Era of Software Development";
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });

  test('should handle ampersand "&" symbol', () => {
    const titleCaser = new TitleCaser({ style });
    const input = "This & That";
    const expected = "This & That";
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });

  test("should handle excessive whitespace", () => {
    const titleCaser = new TitleCaser({ style });
    const input = "      This    string   has   too   many  spaces  ";
    const expected = "This String Has Too Many Spaces";
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });
});

//
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
