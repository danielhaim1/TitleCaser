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

describe("TitleCaser APA – Adversarial Title Casing", () => {
  runTest(
    "should capitalize major words while preserving short APA prepositions",
    "a theory of power in modern organizations",
    "A Theory of Power in Modern Organizations",
  );

  runTest(
    "should lowercase short conjunctions but capitalize four-letter conjunctions",
    "risk and reward while building secure systems",
    "Risk and Reward While Building Secure Systems",
  );

  runTest(
    "should capitalize short verbs in APA style",
    "why data is hard to protect",
    "Why Data Is Hard to Protect",
  );

  runTest(
    "should capitalize short forms of the verb be",
    "what it means to be ready",
    "What It Means to Be Ready",
  );

  runTest(
    "should keep the infinitive marker to lowercase",
    "how to build and maintain secure software",
    "How to Build and Maintain Secure Software",
  );

  runTest(
    "should distinguish infinitive to from capitalized verbs",
    "what to do when systems are down",
    "What to Do When Systems Are Down",
  );

  runTest(
    "should capitalize the final word even when it is a short preposition",
    "the principles developers build by",
    "The Principles Developers Build By",
  );

  runTest(
    "should capitalize the final article",
    "the question everyone keeps asking is why",
    "The Question Everyone Keeps Asking Is Why",
  );

  runTest(
    "should capitalize a minor word immediately after a colon",
    "security by design: an introduction",
    "Security by Design: An Introduction",
  );

  runTest(
    "should capitalize a minor word immediately after a semicolon",
    "the first experiment failed; the second succeeded",
    "The First Experiment Failed; The Second Succeeded",
  );

  runTest(
    "should capitalize a minor word after an em dash",
    "the hidden vulnerability—an avoidable failure",
    "The Hidden Vulnerability—An Avoidable Failure",
  );

  runTest(
    "should capitalize a minor word after an en dash",
    "the final phase–a controlled rollout",
    "The Final Phase–A Controlled Rollout",
  );

  runTest(
    "should handle multiple subtitle boundaries",
    "security architecture: principles, patterns, and practice: a field guide",
    "Security Architecture: Principles, Patterns, and Practice: A Field Guide",
  );

  runTest(
    "should avoid treating a time colon as a subtitle boundary",
    "deployment at 10:30 am: a production checklist",
    "Deployment at 10:30 AM: A Production Checklist",
  );

  runTest(
    "should normalize dotted regional acronyms",
    "u.s. policy toward the u.k. and the e.u.",
    "U.S. Policy Toward the U.K. and the E.U.",
  );

  runTest(
    "should normalize regional acronyms in hyphenated compounds",
    "us-backed and eu-funded programs in the uk",
    "US-Backed and EU-Funded Programs in the UK",
  );

  runTest(
    "should normalize multiple regional acronyms in one compound",
    "us-uk-eu-led negotiations",
    "US-UK-EU-Led Negotiations",
  );

  runTest(
    "should normalize mixed-case regional acronym compounds",
    "uS-BACKED and eU-fUnDeD initiatives",
    "US-Backed and EU-Funded Initiatives",
  );

  runTest(
    "should not uppercase us when it is a pronoun",
    "what automation can teach us about failure",
    "What Automation Can Teach Us About Failure",
  );

  runTest(
    "should distinguish pronoun us from regional acronym US",
    "what the us can teach us about regulation",
    "What the US Can Teach Us About Regulation",
  );

  runTest(
    "should not normalize regional acronyms inside longer words",
    "museum-backed projects and campus-led research",
    "Museum-Backed Projects and Campus-Led Research",
  );

  runTest(
    "should normalize slash-separated regional acronyms",
    "us/uk/eu policy coordination",
    "US/UK/EU Policy Coordination",
  );

  runTest(
    "should normalize acronym compounds after a slash",
    "north america/us-led security strategy",
    "North America/US-Led Security Strategy",
  );

  runTest(
    "should capitalize ordinary slash-separated words",
    "input/output processing for read/write operations",
    "Input/Output Processing for Read/Write Operations",
  );

  runTest(
    "should normalize technology names around slashes",
    "nodejs/reactjs development with javascript/typescript",
    "Node.js/React Development With JavaScript/TypeScript",
  );

  runTest(
    "should normalize plural technical acronyms",
    "apis, sdks, and ides for modern developers",
    "APIs, SDKs, and IDEs for Modern Developers",
  );

  runTest(
    "should normalize possessive technical acronyms",
    "the api's limits and the sdk's behavior",
    "The API's Limits and the SDK's Behavior",
  );

  runTest(
    "should normalize curly possessive technical acronyms",
    "the api’s limits and the sdk’s behavior",
    "The API’s Limits and the SDK’s Behavior",
  );

  runTest(
    "should preserve versioned technical acronyms",
    "html5, css3, and ecmascript 2026 development",
    "HTML5, CSS3, and ECMAScript 2026 Development",
  );

  runTest(
    "should preserve mixed alphanumeric product casing",
    "iphone 16, playstation 5, and xbox series x",
    "iPhone 16, PlayStation 5, and Xbox Series X",
  );

  runTest(
    "should normalize reserved machine learning brands",
    "GOOGLE tensorflow and meta pytorch in production",
    "Google TensorFlow and Meta PyTorch in Production",
  );

  runTest(
    "should normalize brand possessives",
    "google's tensorflow strategy and microsoft's github investment",
    "Google's TensorFlow Strategy and Microsoft's GitHub Investment",
  );

  runTest(
    "should normalize canonical brands adjacent to punctuation",
    "tools include nodejs, reactjs, wordpress, and github",
    "Tools Include Node.js, React, WordPress, and GitHub",
  );

  runTest(
    "should normalize canonical brands inside parentheses",
    "machine learning systems (google tensorflow and meta pytorch)",
    "Machine Learning Systems (Google TensorFlow and Meta PyTorch)",
  );

  runTest(
    "should capitalize the first word inside parentheses",
    "software architecture (a practical introduction)",
    "Software Architecture (A Practical Introduction)",
  );

  runTest(
    "should capitalize the first word inside brackets",
    "software architecture [an applied introduction]",
    "Software Architecture [An Applied Introduction]",
  );

  runTest(
    "should handle nested quoted subtitles inside parentheses",
    'software architecture ("a practical introduction")',
    'Software Architecture ("A Practical Introduction")',
  );

  runTest(
    "should preserve apostrophes in contractions",
    "what developers don't know about systems that can't fail",
    "What Developers Don't Know About Systems That Can't Fail",
  );

  runTest(
    "should preserve possessive apostrophes in proper brands",
    "mcdonald's strategy and apple's response",
    "McDonald's Strategy and Apple's Response",
  );

  runTest(
    "should preserve possessive apostrophes across brand-like terms",
    "mcdonald's, apple's, google's, and microsoft's strategies",
    "McDonald's, Apple's, Google's, and Microsoft's Strategies",
  );

  runTest(
    "should preserve biological acronyms across slash-separated and comma-separated forms",
    "dna/rna sequencing, dna repair, and rna analysis",
    "DNA/RNA Sequencing, DNA Repair, and RNA Analysis",
  );

  runTest(
    "should normalize full stack, back end, and front end variants",
    "full-stack teams build back-end tools for front end developers",
    "Fullstack Teams Build Backend Tools for Frontend Developers",
  );

  runTest(
    "should normalize repeated spelling replacements consistently",
    "back end, back-end, and backend development",
    "Backend, Backend, and Backend Development",
  );

  runTest(
    "should normalize multiword replacements before applying APA casing",
    "cyber security and e commerce for full stack teams",
    "Cybersecurity and E-Commerce for Fullstack Teams",
  );

  runTest(
    "should lowercase minor words inside multi-hyphen compounds",
    "state-of-the-art and one-of-a-kind systems",
    "State-of-the-Art and One-of-a-Kind Systems",
  );

  runTest(
    "should capitalize major words inside multi-hyphen compounds",
    "high-speed fault-tolerant event-driven systems",
    "High-Speed Fault-Tolerant Event-Driven Systems",
  );

  runTest(
    "should normalize mixed-case multi-hyphen compounds",
    "STATE-OF-THE-ART LOW-latency systems",
    "State-of-the-Art Low-Latency Systems",
  );

  runTest(
    "should preserve scientific notation and measurement units",
    "effects of ph 7 on dna repair at 5 ms intervals",
    "Effects of pH 7 on DNA Repair at 5 ms Intervals",
  );

  runTest(
    "should preserve chemical and biological nomenclature casing",
    "the role of dna, rna, and mrna in gene expression",
    "The Role of DNA, RNA, and mRNA in Gene Expression",
  );

  runTest(
    "should preserve programming language symbols and casing",
    "c++, c#, objective-c, and node.js for api development",
    "C++, C#, Objective-C, and Node.js for API Development",
  );

  runTest(
    "should handle quotation marks around an entire subtitle",
    'software security: "a guide to threat modeling"',
    'Software Security: "A Guide to Threat Modeling"',
  );

  runTest(
    "should remain stable with dense punctuation and replacement terms",
    "google's nodejs-based api: risks, trade-offs, and state-of-the-art defenses",
    "Google's Node.js-Based API: Risks, Trade-Offs, and State-of-the-Art Defenses",
  );
});

describe("TitleCaser APA – Extreme Structural Stress Test", () => {
  runTest(
    "should survive deeply nested punctuation, compounds, acronyms, brands, URLs, quotes, HTML, and possessives",
    `the ceo's "state-of-the-art" us/uk-led ai-security initiative: why google's nodejs-based api—described as 'an end-to-end, zero-trust system'—failed at 10:30 p.m. (despite eu-funded research, sdk/api reviews, and https://example.com/docs/v2?source=us-uk#post-launch findings)<br>and what mcdonald's, skoda, tensorflow™, iphone 16, c++, c#, objective-c, dna/rna, and full-stack teams can learn from it`,
    `The CEO's "State-of-the-Art" US/UK-Led AI-Security Initiative: Why Google's Node.js-Based API—Described as 'An End-to-End, Zero-Trust System'—Failed at 10:30 p.m. (Despite EU-Funded Research, SDK/API Reviews, and https://example.com/docs/v2?source=us-uk#post-launch Findings) <br> And What McDonald's, Škoda, TensorFlow™, iPhone 16, C++, C#, Objective-C, DNA/RNA, and Fullstack Teams Can Learn From It`,
  );
});

runNameHeuristicTitleCaseTests(TitleCaser, "apa");
runRareNounTrapTitleCaseTests(TitleCaser, "apa");
