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
  // Basic hyphenated compounds
  runTest("should handle multi-hyphen compound with regional acronym", "us-uk-led coalition", "US-UK-Led Coalition");
  runTest("should handle second-position regional acronym", "pro-us policies", "Pro-US Policies");
  runTest("should normalize mixed-case regional acronym in hyphenated word", "Us-backed reforms", "US-Backed Reforms");
  runTest("should normalize dotted acronym in hyphenated word", "u.s.-backed initiative", "U.S.-Backed Initiative");
  runTest("should handle hyphenated regional acronym at start of sentence", "us-backed reforms continue", "US-Backed Reforms Continue");
  runTest("should handle regional acronym in parenthetical hyphen", "(us-backed) initiative", "(US-Backed) Initiative");
  runTest("should handle en dash with regional acronym", "us–backed coalition", "US–Backed Coalition");
  runTest("should handle em dash with regional acronym", "us—backed coalition", "US—Backed Coalition");
  runTest("should handle regional acronym compound with trailing punctuation", "the us-backed initiative.", "The US-Backed Initiative.");
  runTest('should not uppercase "us" inside longer word', "museum-backed initiative", "Museum-Backed Initiative");
  runTest("should not treat random two-letter prefix as regional acronym", "as-backed reforms", "As-Backed Reforms");

  // UK and EU variants
  runTest("should normalize UK in first compound position", "uk-backed reforms", "UK-Backed Reforms");
  runTest("should normalize EU in first compound position", "eu-backed reforms", "EU-Backed Reforms");
  runTest("should normalize UK in second compound position", "pro-uk campaign", "Pro-UK Campaign");
  runTest("should normalize EU in second compound position", "pro-eu campaign", "Pro-EU Campaign");
  runTest("should normalize mixed-case UK compound", "Uk-funded research", "UK-Funded Research");
  runTest("should normalize mixed-case EU compound", "eU-funded research", "EU-Funded Research");
  runTest("should normalize dotted UK acronym in compound", "u.k.-based company", "U.K.-Based Company");
  runTest("should normalize dotted EU acronym in compound", "e.u.-funded program", "E.U.-Funded Program");

  // Multiple regional acronyms
  runTest("should normalize US and UK in the same compound", "us-uk trade agreement", "US-UK Trade Agreement");
  runTest("should normalize US and EU in the same compound", "us-eu security pact", "US-EU Security Pact");
  runTest("should normalize UK and EU in the same compound", "uk-eu negotiations", "UK-EU Negotiations");
  runTest("should normalize three regional acronyms in one compound", "us-uk-eu summit", "US-UK-EU Summit");
  runTest("should normalize three regional acronyms before a participle", "us-uk-eu-backed initiative", "US-UK-EU-Backed Initiative");
  runTest("should normalize mixed dotted and undotted regional acronyms", "u.s.-uk-led talks", "U.S.-UK-Led Talks");
  runTest("should normalize all dotted regional acronyms", "u.s.-u.k.-e.u. talks", "U.S.-U.K.-E.U. Talks");
  runTest("should normalize repeated regional acronyms", "us-us trade dispute", "US-US Trade Dispute");

  // Compound positions
  runTest("should normalize acronym at beginning of three-part compound", "us-government-backed loan", "US-Government-Backed Loan");
  runTest("should normalize acronym in middle of three-part compound", "anti-us-government movement", "Anti-US-Government Movement");
  runTest("should normalize acronym at end of three-part compound", "government-backed-us initiative", "Government-Backed-US Initiative");
  runTest("should normalize acronym between lowercase compound terms", "anti-us-backed campaign", "Anti-US-Backed Campaign");
  runTest("should normalize acronym after numeric prefix", "2026-us-led summit", "2026-US-Led Summit");
  runTest("should normalize acronym before numeric suffix", "us-2026 strategy", "US-2026 Strategy");

  // Prefix compounds
  runTest("should handle anti-US compound", "anti-us sentiment", "Anti-US Sentiment");
  runTest("should handle pro-US compound", "pro-us policies", "Pro-US Policies");
  runTest("should handle non-US compound", "non-us residents", "Non-US Residents");
  runTest("should handle post-US compound", "post-us withdrawal strategy", "Post-US Withdrawal Strategy");
  runTest("should handle pre-US compound", "pre-us expansion plans", "Pre-US Expansion Plans");
  runTest("should handle ex-US compound", "ex-us official speaks", "Ex-US Official Speaks");
  runTest("should handle anti-UK compound", "anti-uk rhetoric", "Anti-UK Rhetoric");
  runTest("should handle pro-EU compound", "pro-eu lawmakers", "Pro-EU Lawmakers");
  runTest("should handle non-EU compound", "non-eu citizens", "Non-EU Citizens");
  runTest("should handle post-Brexit UK compound", "post-brexit uk-eu policy", "Post-Brexit UK-EU Policy");

  // Suffix compounds
  runTest("should handle US-based compound", "us-based company", "US-Based Company");
  runTest("should handle UK-based compound", "uk-based publisher", "UK-Based Publisher");
  runTest("should handle EU-based compound", "eu-based regulator", "EU-Based Regulator");
  runTest("should handle US-led compound", "us-led coalition", "US-Led Coalition");
  runTest("should handle UK-led compound", "uk-led investigation", "UK-Led Investigation");
  runTest("should handle EU-led compound", "eu-led initiative", "EU-Led Initiative");
  runTest("should handle US-funded compound", "us-funded research", "US-Funded Research");
  runTest("should handle UK-funded compound", "uk-funded project", "UK-Funded Project");
  runTest("should handle EU-funded compound", "eu-funded program", "EU-Funded Program");
  runTest("should handle US-owned compound", "us-owned company", "US-Owned Company");
  runTest("should handle UK-owned compound", "uk-owned newspaper", "UK-Owned Newspaper");
  runTest("should handle EU-wide compound", "eu-wide regulation", "EU-Wide Regulation");
  runTest("should handle US-made compound", "us-made hardware", "US-Made Hardware");
  runTest("should handle UK-built compound", "uk-built satellite", "UK-Built Satellite");
  runTest("should handle EU-approved compound", "eu-approved treatment", "EU-Approved Treatment");

  // Compound case normalization
  runTest("should normalize uppercase suffix in regional compound", "US-BACKED reforms", "US-Backed Reforms");
  runTest("should normalize lowercase acronym and uppercase suffix", "us-BACKED reforms", "US-Backed Reforms");
  runTest("should normalize alternating case in compound", "uS-bAcKeD reforms", "US-Backed Reforms");
  runTest("should preserve already canonical compound casing", "US-Backed Reforms", "US-Backed Reforms");
  runTest("should normalize all-uppercase multi-acronym compound", "US-UK-LED COALITION", "US-UK-Led Coalition");
  runTest("should normalize lowercase multi-acronym compound", "us-uk-led coalition", "US-UK-Led Coalition");

  // Punctuation boundaries
  runTest("should normalize compound before comma", "the us-backed, eu-funded initiative", "The US-Backed, EU-Funded Initiative");
  runTest("should normalize compound before semicolon", "the us-backed; eu-funded initiative", "The US-Backed; EU-Funded Initiative");
  runTest("should normalize compound before colon", "the us-backed initiative: an overview", "The US-Backed Initiative: An Overview");
  runTest("should normalize compound before question mark", "is this us-backed?", "Is This US-Backed?");
  runTest("should normalize compound before exclamation mark", "a us-backed victory!", "A US-Backed Victory!");
  runTest("should normalize quoted compound", '"us-backed reforms"', '"US-Backed Reforms"');
  runTest("should normalize single-quoted compound", "'uk-led talks'", "'UK-Led Talks'");
  runTest("should normalize bracketed compound", "[eu-funded program]", "[EU-Funded Program]");
  runTest("should normalize braced compound", "{us-led initiative}", "{US-Led Initiative}");
  runTest("should normalize compound followed by possessive", "the us-backed initiative's failure", "The US-Backed Initiative's Failure");

  // Parenthetical compounds
  runTest("should normalize compound inside parentheses", "reforms (us-backed)", "Reforms (US-Backed)");
  runTest("should normalize compound beginning parenthetical phrase", "(uk-led talks) resume", "(UK-Led Talks) Resume");
  runTest("should normalize multiple compounds inside parentheses", "(us-backed, eu-funded) program", "(US-Backed, EU-Funded) Program");
  runTest("should normalize dotted acronym inside parentheses", "(u.s.-led) operation", "(U.S.-Led) Operation");
  runTest("should normalize nested punctuation around compound", '("us-backed") initiative', '("US-Backed") Initiative');

  // Dash variants
  runTest("should preserve en dash between acronym and suffix", "uk–led talks", "UK–Led Talks");
  runTest("should preserve em dash between acronym and suffix", "eu—funded project", "EU—Funded Project");
  runTest("should normalize mixed dash types", "us-uk–led coalition", "US-UK–Led Coalition");
  runTest("should normalize acronym after spaced en dash", "policy – us-backed reform", "Policy – US-Backed Reform");
  runTest("should normalize acronym after spaced em dash", "policy — eu-backed reform", "Policy — EU-Backed Reform");

  // False-positive protection
  runTest('should not uppercase "us" in museum compound', "museum-backed initiative", "Museum-Backed Initiative");
  runTest('should not uppercase "us" in campus compound', "campus-led campaign", "Campus-Led Campaign");
  runTest('should not uppercase "uk" inside truck compound', "truck-based delivery", "Truck-Based Delivery");
  runTest('should not uppercase "eu" inside neuro compound', "neuro-based treatment", "Neuro-Based Treatment");
  runTest("should not normalize arbitrary two-letter prefix", "as-backed reforms", "As-Backed Reforms");
  runTest("should not normalize arbitrary three-letter prefix", "xyz-backed reforms", "Xyz-Backed Reforms");
  runTest("should not treat lowercase pronoun as acronym without compound boundary", "help us build it", "Help Us Build It");
  runTest("should not treat plural suffix as part of acronym", "uses-backed proposal", "Uses-Backed Proposal");
  runTest("should not normalize substring after apostrophe", "bus-backed route", "Bus-Backed Route");
  runTest("should not normalize substring after slash", "campus/usability-backed study", "Campus/Usability-Backed Study");

  // Slash-separated compounds
  runTest("should normalize slash-separated regional acronyms", "us/uk partnership", "US/UK Partnership");
  runTest("should normalize three slash-separated regional acronyms", "us/uk/eu agreement", "US/UK/EU Agreement");
  runTest("should normalize slash and hyphen combination", "us/uk-led coalition", "US/UK-Led Coalition");
  runTest("should normalize dotted acronym before slash", "u.s./uk agreement", "U.S./UK Agreement");
  runTest("should normalize acronym after slash", "north america/us-led initiative", "North America/US-Led Initiative");

  // Numeric and year compounds
  runTest("should normalize acronym in year-prefixed compound", "2026-us summit", "2026-US Summit");
  runTest("should normalize acronym in numbered compound", "g7-us talks", "G7-US Talks");
  runTest("should normalize acronym with numeric suffix", "us-5 policy group", "US-5 Policy Group");
  runTest("should normalize multi-region year compound", "2026-us-uk summit", "2026-US-UK Summit");
  runTest("should normalize acronym before decade suffix", "us-1990s policy", "US-1990s Policy");

  // Dense headline coverage
  runTest(
    "should normalize multiple regional compounds in one title",
    "us-backed and eu-funded projects support uk-based firms",
    "US-Backed and EU-Funded Projects Support UK-Based Firms",
  );
  runTest(
    "should normalize mixed dotted and undotted compounds in one title",
    "u.s.-led talks produce eu-backed agreement with uk-based firms",
    "U.S.-Led Talks Produce EU-Backed Agreement With UK-Based Firms",
  );
  runTest(
    "should normalize nested multi-region compounds",
    "pro-us-uk coalition backs eu-wide reforms",
    "Pro-US-UK Coalition Backs EU-Wide Reforms",
  );
  runTest(
    "should normalize compound acronyms around conjunctions",
    "us-led, uk-funded and eu-approved projects",
    "US-Led, UK-Funded and EU-Approved Projects",
  );
  runTest(
    "should normalize regional compounds after a colon",
    "global security: us-led and eu-backed initiatives",
    "Global Security: US-Led and EU-Backed Initiatives",
  );
});

describe("TitleCaser Chicago – Style Stability", () => {
  // Colon and subtitle handling
  runTest(
    "should handle colon + comparison phrase in Chicago style",
    "VMware vs. VirtualBox: a comparative study of virtualization software",
    "VMware vs. VirtualBox: A Comparative Study of Virtualization Software",
  );
  runTest(
    "should capitalize the first word after a colon",
    "software architecture: a practical guide",
    "Software Architecture: A Practical Guide",
  );
  runTest(
    "should capitalize an article after a colon",
    "the final release: a complete breakdown",
    "The Final Release: A Complete Breakdown",
  );
  runTest(
    "should capitalize a conjunction after a colon",
    "the missing feature: and why it matters",
    "The Missing Feature: And Why It Matters",
  );
  runTest(
    "should capitalize a preposition after a colon",
    "the path forward: through uncertainty and change",
    "The Path Forward: Through Uncertainty and Change",
  );
  runTest(
    "should handle multiple colons",
    "software architecture: patterns and practices: a field guide",
    "Software Architecture: Patterns and Practices: A Field Guide",
  );
  runTest(
    "should preserve time notation while capitalizing subtitle",
    "release at 10:30: a developer briefing",
    "Release at 10:30: A Developer Briefing",
  );
  runTest(
    "should not treat URL protocol colon as subtitle boundary",
    "visit https://example.com for more information",
    "Visit https://example.com for More Information",
  );

  // Hyphenated terms
  runTest(
    "should capitalize hyphenated terms in Chicago style",
    "nodejs development on aws: an in-depth tutorial on server-side javascript deployment",
    "Node.js Development on AWS: An In-Depth Tutorial on Server-Side JavaScript Deployment",
  );
  runTest("should capitalize both major parts of a compound", "high-speed network", "High-Speed Network");
  runTest("should lowercase minor second element when required", "state-of-the-art systems", "State-of-the-Art Systems");
  runTest("should preserve canonical replacement over hyphen rules", "back-end development", "Backend Development");
  runTest("should normalize mixed-case hyphenated compounds", "HIGH-speed LOW-latency networking", "High-Speed Low-Latency Networking");
  runTest("should handle compound at title end", "building systems that are production-ready", "Building Systems That Are Production-Ready");
  runTest("should handle compound after colon", "deployment strategies: cloud-native architecture", "Deployment Strategies: Cloud-Native Architecture");
  runTest("should handle multi-hyphen phrase", "a state-of-the-art cloud-native system", "A State-of-the-Art Cloud-Native System");

  // Custom replacements
  runTest(
    "should apply custom replacements for brand names in Chicago style",
    "Back-End Web Development: Building Scalable APIs with nodejs",
    "Backend Web Development: Building Scalable APIs With Node.js",
  );
  runTest(
    "should normalize all backend spelling variants",
    "BACK END, back-end and backend systems",
    "Backend, Backend and Backend Systems",
  );
  runTest(
    "should normalize all frontend spelling variants",
    "FRONT END, front-end and frontend systems",
    "Frontend, Frontend and Frontend Systems",
  );
  runTest(
    "should normalize all fullstack spelling variants",
    "FULL STACK, full-stack and fullstack teams",
    "Fullstack, Fullstack and Fullstack Teams",
  );
  runTest(
    "should preserve canonical replacement casing after punctuation",
    "tools: nodejs, reactjs and javascript",
    "Tools: Node.js, React and JavaScript",
  );
  runTest(
    "should normalize replacements in possessive form",
    "nodejs's runtime and reactjs's component model",
    "Node.js's Runtime and React's Component Model",
  );
  runTest(
    "should not replace terms inside larger words",
    "nodejson and prereactjs packages",
    "Nodejson and Prereactjs Packages",
  );

  // Smart quotes
  createTest(
    "Smart quotes enabled",
    { style: "chicago", smartQuotes: true },
    '"Never underestimate the power o\'persistence,"',
    "“Never Underestimate the Power O’Persistence,”",
  );
  createTest(
    "should convert nested apostrophes with smart quotes enabled",
    { style: "chicago", smartQuotes: true },
    '"the developer\'s guide"',
    "“The Developer’s Guide”",
  );
  createTest(
    "should convert single quoted title with smart quotes enabled",
    { style: "chicago", smartQuotes: true },
    "'a guide to nodejs'",
    "‘A Guide to Node.js’",
  );
  createTest(
    "should preserve punctuation inside smart closing quote",
    { style: "chicago", smartQuotes: true },
    '"is this the future?"',
    "“Is This the Future?”",
  );
  createTest(
    "should handle contractions with smart quotes enabled",
    { style: "chicago", smartQuotes: true },
    "what developers don't know",
    "What Developers Don’t Know",
  );
  createTest(
    "should handle leading apostrophe with smart quotes enabled",
    { style: "chicago", smartQuotes: true },
    "'tis the season for coding",
    "’Tis the Season for Coding",
  );

  // Acronyms and canonical casing
  runTest(
    "should keep acronyms in uppercase in Chicago style",
    "I Love Connecting with My Online Friends, but Sometimes I Prefer to Hang Out with My Friends IRL",
    "I Love Connecting With My Online Friends, but Sometimes I Prefer to Hang Out With My Friends IRL",
  );
  runTest("should normalize lowercase technical acronyms", "api and sdk design", "API and SDK Design");
  runTest("should normalize plural technical acronyms", "apis and sdks for developers", "APIs and SDKs for Developers");
  runTest("should normalize possessive technical acronyms", "the api's response and sdk's output", "The API's Response and SDK's Output");
  runTest("should preserve dotted acronyms", "u.s. policy and u.k. trade", "U.S. Policy and U.K. Trade");
  runTest("should normalize leadership acronyms", "ceo, cto, cio and cfo", "CEO, CTO, CIO and CFO");
  runTest("should preserve versioned acronyms", "html5 and css3 development", "HTML5 and CSS3 Development");
  runTest("should preserve mixed alphanumeric brands", "iphone 16 and playstation 5", "iPhone 16 and PlayStation 5");

  // Chicago small words
  runTest("should lowercase articles internally", "war of the worlds", "War of the Worlds");
  runTest("should lowercase coordinating conjunctions internally", "rock and roll", "Rock and Roll");
  runTest("should lowercase short prepositions internally", "a walk in the park", "A Walk in the Park");
  runTest("should capitalize first-position article", "the art of software", "The Art of Software");
  runTest("should capitalize final-position preposition", "what we are fighting for", "What We Are Fighting For");
  runTest("should capitalize small word after colon", "the choice: between two systems", "The Choice: Between Two Systems");
  runTest("should capitalize small word after em dash", "the final option—between us", "The Final Option—Between Us");
  runTest("should lowercase infinitive marker internally", "how to build software", "How to Build Software");
  runTest("should distinguish infinitive and prepositional to", "a guide to learning how to code", "A Guide to Learning How to Code");

  // Brand stability
  runTest("should normalize mixed-case Google", "gOoGlE launches a product", "Google Launches a Product");
  runTest("should normalize mixed-case VMware", "VmWaRe updates its platform", "VMware Updates Its Platform");
  runTest("should normalize Microsoft", "MICROSOFT and google compete", "Microsoft and Google Compete");
  runTest("should preserve iPhone casing", "IPHONE development", "iPhone Development");
  runTest("should preserve iPad casing", "IPAD applications", "iPad Applications");
  runTest("should preserve macOS casing", "MACOS development", "macOS Development");
  runTest("should preserve DevOps casing", "DEVOPS strategy", "DevOps Strategy");
  runTest("should preserve eBook casing", "EBOOK publishing", "eBook Publishing");
  runTest("should preserve JavaScript casing", "JAVASCRIPT development", "JavaScript Development");
  runTest("should preserve TypeScript casing", "TYPESCRIPT development", "TypeScript Development");
  runTest("should preserve GitHub casing", "GITHUB actions", "GitHub Actions");
  runTest("should preserve WordPress casing", "WORDPRESS development", "WordPress Development");

  // Possessives
  runTest("should normalize brand possessive casing", "google's cloud strategy", "Google's Cloud Strategy");
  runTest("should normalize acronym possessive casing", "the ceo's response", "The CEO's Response");
  runTest("should preserve plural possessive punctuation", "developers' tools and teams' workflows", "Developers' Tools and Teams' Workflows");
  runTest("should handle curly possessive apostrophe", "google’s cloud strategy", "Google’s Cloud Strategy");
  runTest("should handle possessive after acronym compound", "the us-backed group's policy", "The US-Backed Group's Policy");

  // Parentheses and brackets
  runTest("should preserve parenthetical title casing", "software design (a practical guide)", "Software Design (A Practical Guide)");
  runTest("should capitalize first word inside parentheses", "software design (the complete guide)", "Software Design (The Complete Guide)");
  runTest("should handle bracketed subtitle", "software design [a practical guide]", "Software Design [A Practical Guide]");
  runTest("should preserve acronym inside parentheses", "cloud systems (aws and api design)", "Cloud Systems (AWS and API Design)");
  runTest("should handle nested punctuation", 'software design ("a practical guide")', 'Software Design ("A Practical Guide")');

  // Slashes and separators
  runTest("should handle slash-separated alternatives", "input/output design", "Input/Output Design");
  runTest("should normalize brands around slash", "nodejs/reactjs development", "Node.js/React Development");
  runTest("should handle spaced slash separator", "hardware / software architecture", "Hardware / Software Architecture");
  runTest("should handle ampersand separator", "research & development", "Research & Development");
  runTest("should handle plus separator", "hardware + software integration", "Hardware + Software Integration");
  runTest("should handle pipe separator", "frontend | backend development", "Frontend | Backend Development");

  // Whitespace and stability
  runTest(
    "should normalize excessive internal whitespace",
    "      This    string   has   too   many  spaces  ",
    "This String Has Too Many Spaces",
  );
  runTest("should normalize tabs", "this\tstring\thas\ttabs", "This String Has Tabs");
  runTest("should normalize mixed tabs and spaces", "  this\t string   has\tmixed whitespace ", "This String Has Mixed Whitespace");
  runTest("should preserve already-correct Chicago title", "The Art of Software Development", "The Art of Software Development");
  runTest(
    "should stabilize aggressively inconsistent casing",
    "gOOGLE BUILDS a NODEJS BACK-END FOR AWS",
    "Google Builds a Node.js Backend for AWS",
  );
});

describe("TitleCaser Chicago – Reserved Words and Special Handling", () => {
  describe("Reserved brand terms", () => {
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

    test("should normalize multiple reserved words in one title", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("GOOGLE uses TENSORFLOW with NODEJS")).toBe(
        "Google Uses TensorFlow With Node.js",
      );
    });

    test("should normalize reserved words next to punctuation", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("GOOGLE, TENSORFLOW and NODEJS")).toBe(
        "Google, TensorFlow and Node.js",
      );
    });

    test("should normalize reserved words inside parentheses", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("machine learning (GOOGLE tensorflow)")).toBe(
        "Machine Learning (Google TensorFlow)",
      );
    });

    test("should normalize reserved word possessives with curly apostrophes", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("GOOGLE’s tensorflow platform")).toBe(
        "Google’s TensorFlow Platform",
      );
    });

    test("should not replace reserved terms inside larger words", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("googler and tensorflowing examples")).toBe(
        "Googler and Tensorflowing Examples",
      );
    });
  });

  describe("Custom replacement terms", () => {
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

    test("should apply custom replacements case-insensitively", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      titleCaser.setReplaceTerms([
        { mcdonalds: "McDonald's" },
        { skoda: "Škoda" },
      ]);

      [
        { input: "MCDONALDS", expected: "McDonald's" },
        { input: "McDonalds", expected: "McDonald's" },
        { input: "SKODA", expected: "Škoda" },
        { input: "sKoDa", expected: "Škoda" },
      ].forEach(({ input, expected }) => {
        expect(titleCaser.toTitleCase(input)).toBe(expected);
      });
    });

    test("should apply replacements within a full title", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      titleCaser.setReplaceTerms([
        { mcdonalds: "McDonald's" },
        { skoda: "Škoda" },
        { "cyber-security": "cybersecurity" },
      ]);

      expect(titleCaser.toTitleCase("mcdonalds adopts cyber-security tools from skoda")).toBe(
        "McDonald's Adopts Cybersecurity Tools From Škoda",
      );
    });

    test("should apply replacements next to punctuation", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      titleCaser.setReplaceTerms([
        { mcdonalds: "McDonald's" },
        { skoda: "Škoda" },
      ]);

      expect(titleCaser.toTitleCase("brands: mcdonalds, skoda and google")).toBe(
        "Brands: McDonald's, Škoda and Google",
      );
    });

    test("should apply replacement in possessive form", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      titleCaser.setReplaceTerms([{ skoda: "Škoda" }]);

      expect(titleCaser.toTitleCase("skoda's expansion strategy")).toBe("Škoda's Expansion Strategy");
    });

    test("should preserve curly apostrophe in replacement possessive", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      titleCaser.setReplaceTerms([{ skoda: "Škoda" }]);

      expect(titleCaser.toTitleCase("skoda’s expansion strategy")).toBe("Škoda’s Expansion Strategy");
    });

    test("should prefer longest custom replacement match", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      titleCaser.setReplaceTerms([
        { cyber: "Cyber" },
        { "cyber-security": "cybersecurity" },
      ]);

      expect(titleCaser.toTitleCase("cyber-security strategy")).toBe("Cybersecurity Strategy");
    });

    test("should not replace a custom term inside a longer word", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      titleCaser.setReplaceTerms([{ skoda: "Škoda" }]);

      expect(titleCaser.toTitleCase("skodafication strategy")).toBe("Skodafication Strategy");
    });

    test("should allow replacement values with punctuation", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      titleCaser.setReplaceTerms([{ att: "AT&T" }]);

      expect(titleCaser.toTitleCase("att expands its network")).toBe("AT&T Expands Its Network");
    });

    test("should allow replacement values with internal capitals", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      titleCaser.setReplaceTerms([{ devopspro: "DevOpsPro" }]);

      expect(titleCaser.toTitleCase("devopspro platform launch")).toBe("DevOpsPro Platform Launch");
    });

    test("should allow replacement values with accented characters", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      titleCaser.setReplaceTerms([{ skoda: "Škoda" }]);

      expect(titleCaser.toTitleCase("the history of skoda")).toBe("The History of Škoda");
    });
  });

  describe("HTML break handling", () => {
    test("should handle HTML <br> with colon spaced", () => {
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

    test("should normalize uppercase BR tag", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      const input = "the future of software:<BR>what comes next";
      const expected = "The Future of Software: <br> What Comes Next";

      expect(titleCaser.toTitleCase(input)).toBe(expected);
    });

    test("should normalize self-closing br tag", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      const input = "the future of software:<br/>what comes next";
      const expected = "The Future of Software: <br> What Comes Next";

      expect(titleCaser.toTitleCase(input)).toBe(expected);
    });

    test("should normalize spaced self-closing br tag", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      const input = "the future of software:<br />what comes next";
      const expected = "The Future of Software: <br> What Comes Next";

      expect(titleCaser.toTitleCase(input)).toBe(expected);
    });

    test("should normalize whitespace surrounding br tag", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      const input = "the future of software:   <br>   what comes next";
      const expected = "The Future of Software: <br> What Comes Next";

      expect(titleCaser.toTitleCase(input)).toBe(expected);
    });

    test("should handle multiple br tags", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      const input = "part one<br>part two<br>part three";
      const expected = "Part One <br> Part Two <br> Part Three";

      expect(titleCaser.toTitleCase(input)).toBe(expected);
    });

    test("should capitalize a minor word after br", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      const input = "the first line<br>and the second line";
      const expected = "The First Line <br> And the Second Line";

      expect(titleCaser.toTitleCase(input)).toBe(expected);
    });

    test("should preserve acronym casing around br", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      const input = "nodejs and aws<br>api development";
      const expected = "Node.js and AWS <br> API Development";

      expect(titleCaser.toTitleCase(input)).toBe(expected);
    });

    test("should handle br inside quoted title", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      const input = '"the first line<br>the second line"';
      const expected = '"The First Line <br> The Second Line"';

      expect(titleCaser.toTitleCase(input)).toBe(expected);
    });
  });

  describe("Symbols and punctuation", () => {
    test('should handle ampersand "&" symbol', () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("This & That")).toBe("This & That");
    });

    test("should preserve plus symbol", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("hardware + software")).toBe("Hardware + Software");
    });

    test("should preserve slash symbol", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("input/output systems")).toBe("Input/Output Systems");
    });

    test("should preserve pipe separator", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("frontend | backend")).toBe("Frontend | Backend");
    });

    test("should preserve registered trademark symbol", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("google® cloud platform")).toBe("Google® Cloud Platform");
    });

    test("should preserve trademark symbol", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("tensorflow™ platform")).toBe("TensorFlow™ Platform");
    });

    test("should preserve copyright symbol", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("copyright © 2026 google")).toBe("Copyright © 2026 Google");
    });

    test("should preserve ellipsis", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("and then... there was code")).toBe("And Then... There Was Code");
    });

    test("should preserve Unicode ellipsis", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("and then… there was code")).toBe("And Then… There Was Code");
    });

    test("should preserve question and exclamation marks", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("what happened?!")).toBe("What Happened?!");
    });

    test("should preserve repeated punctuation", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("wait... what???")).toBe("Wait... What???");
    });

    test("should preserve version periods", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("node.js v2.4.0 release")).toBe("Node.js v2.4.0 Release");
    });
  });

  describe("Whitespace normalization", () => {
    test("should handle excessive whitespace", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("      This    string   has   too   many  spaces  ")).toBe(
        "This String Has Too Many Spaces",
      );
    });

    test("should trim leading whitespace", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("      leading whitespace")).toBe("Leading Whitespace");
    });

    test("should trim trailing whitespace", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("trailing whitespace      ")).toBe("Trailing Whitespace");
    });

    test("should collapse tabs", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("this\tstring\thas\ttabs")).toBe("This String Has Tabs");
    });

    test("should collapse newlines", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("this\nstring\nhas\nnewlines")).toBe("This String Has Newlines");
    });

    test("should collapse carriage returns", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("this\rstring\rhas\rreturns")).toBe("This String Has Returns");
    });

    test("should collapse mixed whitespace", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase(" \t this \n string \r has   mixed whitespace \t ")).toBe(
        "This String Has Mixed Whitespace",
      );
    });

    test("should normalize whitespace around punctuation", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("software   :   a practical guide")).toBe(
        "Software: A Practical Guide",
      );
    });

    test("should normalize whitespace around hyphens", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("cloud - native systems")).toBe("Cloud-Native Systems");
    });

    test("should normalize whitespace around ampersand", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("research  &  development")).toBe("Research & Development");
    });
  });

  describe("Input stability", () => {
    test("should handle an empty string", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("")).toBe("");
    });

    test("should handle whitespace-only input", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("     ")).toBe("");
    });

    test("should handle a single lowercase word", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("software")).toBe("Software");
    });

    test("should handle a single uppercase word", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("SOFTWARE")).toBe("Software");
    });

    test("should preserve a single acronym", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("api")).toBe("API");
    });

    test("should preserve numeric-only input", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("2026")).toBe("2026");
    });

    test("should preserve punctuation-only input", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("...")).toBe("...");
    });

    test("should preserve an already-correct title", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      expect(titleCaser.toTitleCase("The Art of Software Development")).toBe(
        "The Art of Software Development",
      );
    });

    test("should return the same result when applied twice", () => {
      const titleCaser = new TitleCaser({ style: "chicago" });
      const firstPass = titleCaser.toTitleCase(
        "nodejs development on aws: an in-depth guide to api design",
      );

      expect(titleCaser.toTitleCase(firstPass)).toBe(firstPass);
    });
  });
});

runNameHeuristicTitleCaseTests(TitleCaser, "chicago");
runRareNounTrapTitleCaseTests(TitleCaser, "chicago");
