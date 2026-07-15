import { TitleCaser } from "../index.js";
import { runRareNounTrapWikipediaTests } from "../testHelpers/rareNounTrapCases.js";

function runTest(description, input, expected) {
  test(description, () => {
    const titleCaser = new TitleCaser({ style: "wikipedia" });
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });
}

describe("TitleCaser Wikipedia – Sentence Case", () => {
  runTest(
    "should apply Wikipedia style to an entire sentence",
    "Mitigating ddos attacks on aws: strategies for protecting your web infrastructure using github",
    "Mitigating DDoS attacks on AWS: strategies for protecting your web infrastructure using GitHub",
  );
  runTest(
    "should preserve sentence case for Wikipedia style (DevOps example)",
    "the future of devops: how to prepare for the next era of software development",
    "The future of DevOps: how to prepare for the next era of software development",
  );
  runTest(
    "should handle Wikipedia style with colon usage",
    "The business of fashion: how luxury brands set themselves apart",
    "The business of fashion: how luxury brands set themselves apart",
  );
  runTest(
    "should capitalize the first word after an opening quote",
    "‘enough!’ says leader",
    "‘Enough!’ says leader",
  );
  runTest(
    "should normalize spelling replacements without forcing title-case capitalization",
    "blockchain technology and cyber security: opportunities and challenges for secure digital transactions",
    "Blockchain technology and cybersecurity: opportunities and challenges for secure digital transactions",
  );
  runTest(
    "should preserve canonical brand casing from word replacements",
    "the reactjs framework uses nodejs",
    "The React framework uses Node.js",
  );
  runTest(
    "should preserve canonical replacement casing at the start of a sentence",
    "reactjs framework and nodejs tools",
    "React framework and Node.js tools",
  );
  runTest(
    "should preserve canonical replacement casing in the middle of a sentence",
    "developers use reactjs in modern interfaces",
    "Developers use React in modern interfaces",
  );
  runTest(
    "should preserve canonical replacement casing at the end of a sentence",
    "many teams build services with node.js",
    "Many teams build services with Node.js",
  );
  runTest(
    "should normalize full stack by position without preserving title casing",
    "full stack teams hire full-stack developers for full stack",
    "Fullstack teams hire fullstack developers for fullstack",
  );
  runTest(
    "should preserve demonyms and proper adjectives in Wikipedia style",
    "why many americans still cannot access a primary care doctor",
    "Why many Americans still cannot access a primary care doctor",
  );
  runTest(
    "should preserve ethnic and religious identity terms in Wikipedia style",
    "why many latinas, jews, muslims, and sikhs distrust the new policy",
    "Why many Latinas, Jews, Muslims, and Sikhs distrust the new policy",
  );
  runTest(
    "should preserve common demonyms without title-casing ordinary words in Wikipedia style",
    "how mexican, canadian, japanese, and russian voters viewed the debate",
    "How Mexican, Canadian, Japanese, and Russian voters viewed the debate",
  );
  runTest(
    "should preserve a broader demonym set in Wikipedia style",
    "what filipinos, palestinians, ukrainians, senegalese, and new zealanders said next",
    "What Filipinos, Palestinians, Ukrainians, Senegalese, and New Zealanders said next",
  );
  runTest(
    "should preserve religious group terms in Wikipedia style",
    "how christians, hindus, buddhists, catholics, and mormons responded",
    "How Christians, Hindus, Buddhists, Catholics, and Mormons responded",
  );
});

describe("TitleCaser Wikipedia – Dictionary Proper Phrases", () => {
  runTest(
    "should preserve known proper phrases while lowercasing ordinary words in Wikipedia style",
    "the surprise guest was the disney favourite, donald duck",
    "The surprise guest was the Disney favourite, Donald Duck",
  );
  runTest(
    "should preserve known proper phrases while lowercasing ordinary words in Wikipedia style",
    "the surprise guest donald trump jr. was a fox news favorite!",
    "The surprise guest Donald Trump jr. was a Fox News favorite!",
  );

  runTest(
    "should normalize accidental capitals and known proper phrases in Wikipedia style",
    "The Surprise Guest was The Disney Favourite, Donald duck ",
    "The surprise guest was the Disney favourite, Donald Duck",
  );
  runTest(
    "should preserve known person-name phrases in Wikipedia style",
    "John Smith wrote About The surprise Guest",
    "John Smith wrote about the surprise guest",
  );
  runTest(
    "should preserve generated dictionary proper phrases while lowercasing ordinary words in Wikipedia style",
    "the surprise guest won the academy award",
    "The surprise guest won the Academy Award",
  );
  runTest(
    "should normalize accidental capitals and generated dictionary proper phrases in Wikipedia style",
    "The Surprise Guest won The Academy award ",
    "The surprise guest won the Academy Award",
  );
  runTest(
    "should preserve generated dictionary phrases in Wikipedia style",
    "Abstract Expressionism shaped The surprise Guest",
    "Abstract Expressionism shaped the surprise guest",
  );
  runTest(
    "should preserve military operation and conflict names in Wikipedia style",
    "the article compared operation desert storm with the gulf war air campaign",
    "The article compared Operation Desert Storm with the Gulf War air campaign",
  );
});

describe("TitleCaser Wikipedia – Entity Heuristic Boundaries", () => {
  runTest(
    "should not preserve accidental capitalization for ordinary dictionary words",
    "The Surprise Guest met The Local Artist after The Public Event",
    "The surprise guest met the local artist after the public event",
  );

  runTest(
    "should not infer an invented lowercase word before a common noun as a proper phrase",
    "the qelvorn project was delayed after the public event",
    "The qelvorn project was delayed after the public event",
  );

  runTest(
    "should preserve an already capitalized unknown entity before a common noun",
    "The report mentioned Qelvorn Project during The Public Event",
    "The report mentioned Qelvorn Project during the public event",
  );

  runTest(
    "should preserve an international two-token name without requiring the name to exist in givenNames",
    "Saoirse Ronan joined The Surprise Guest after The Public Event",
    "Saoirse Ronan joined the surprise guest after the public event",
  );

  runTest(
    "should preserve an international three-token name without treating later ordinary words as names",
    "Nguyen Van Binh met The Local Artist at The Public Event",
    "Nguyen Van Binh met the local artist at the public event",
  );

  runTest(
    "should preserve apostrophized capitalized names while lowercasing ordinary words around them",
    "Maeve O'Connor wrote About The Surprise Guest",
    "Maeve O’Connor wrote about the surprise guest",
  );

  runTest(
    "should preserve a lowercase known-name phrase after punctuation without preserving accidental caps elsewhere",
    "The Surprise Guest was The Disney Favourite, donald duck",
    "The surprise guest was the Disney favourite, Donald Duck",
  );

  runTest(
    "should not treat a given name followed by a verb as a proper-name phrase",
    "donald optimized the disney favourite after the public event",
    "Donald optimized the Disney favourite after the public event",
  );

  runTest(
    "should not treat a given name followed by an adverb as a proper-name phrase",
    "donald quickly optimized the disney favourite",
    "Donald quickly optimized the Disney favourite",
  );

  runTest(
    "should not treat a given name followed by a preposition as a proper-name phrase",
    "donald in the meeting discussed the disney favourite",
    "Donald in the meeting discussed the Disney favourite",
  );

  runTest(
    "should not infer a lowercase given name followed by an ordinary noun as a proper-name phrase",
    "donald project was delayed after the public event",
    "Donald project was delayed after the public event",
  );

  runTest(
    "should preserve a lowercase given name followed by an uncommon family name",
    "donald mcfly visited disney after the public event",
    "Donald McFly visited Disney after the public event",
  );

  runTest(
    "should preserve a lowercase given name followed by a family name that is also a common word",
    "john snow wrote about disney after the public event",
    "John Snow wrote about Disney after the public event",
  );

  runTest(
    "should preserve a lowercase literary person name",
    "mary shelley wrote about disney after the public event",
    "Mary Shelley wrote about Disney after the public event",
  );

  describe("Name Heuristic Contradictions", () => {
    runTest(
      "should preserve a lowercase given-name and family-name phrase",
      "the report cited john smith after the public event",
      "The report cited John Smith after the public event",
    );

    runTest(
      "should preserve a lowercase given-name and family-name phrase with a common-word surname",
      "the report cited john snow after the public event",
      "The report cited John Snow after the public event",
    );

    runTest(
      "should preserve a lowercase given-name and uncommon family-name phrase",
      "the report cited donald mcfly after the public event",
      "The report cited Donald McFly after the public event",
    );

    runTest(
      "should preserve a lowercase fictional given-name and family-name phrase",
      "the report cited donald duck after the public event",
      "The report cited Donald Duck after the public event",
    );

    runTest(
      "should preserve a lowercase literary given-name and family-name phrase",
      "the report cited mary shelley after the public event",
      "The report cited Mary Shelley after the public event",
    );

    runTest(
      "should preserve a lowercase technology given-name and family-name phrase",
      "the report cited alan turing after the public event",
      "The report cited Alan Turing after the public event",
    );

    runTest(
      "should preserve a lowercase historical given-name and family-name phrase",
      "the report cited ada lovelace after the public event",
      "The report cited Ada Lovelace after the public event",
    );

    runTest(
      "should preserve a lowercase given-name and family-name phrase before a verb",
      "the report said donald duck optimized the public event",
      "The report said Donald Duck optimized the public event",
    );

    runTest(
      "should preserve a lowercase given-name and family-name phrase before an adverb",
      "the report said donald duck quickly left the public event",
      "The report said Donald Duck quickly left the public event",
    );

    runTest(
      "should preserve a lowercase given-name and family-name phrase before a preposition",
      "the report said donald duck in the meeting discussed disney",
      "The report said Donald Duck in the meeting discussed Disney",
    );

    runTest(
      "should preserve only the lowercase given-name and family-name phrase before an ordinary noun",
      "the report said donald duck project notes mentioned disney",
      "The report said Donald Duck project notes mentioned Disney",
    );

    runTest(
      "should preserve a lowercase apostrophized family-name phrase",
      "the report cited maeve o'connor after the public event",
      "The report cited Maeve O’Connor after the public event",
    );

    runTest(
      "should preserve a lowercase international given-name and family-name phrase",
      "the report cited saoirse ronan after the public event",
      "The report cited Saoirse Ronan after the public event",
    );

    runTest(
      "should not promote a lowercase given name followed by a verb",
      "the report said donald optimized the disney favourite",
      "The report said donald optimized the Disney favourite",
    );

    runTest(
      "should not promote a lowercase given name followed by an adverb",
      "the report said donald quickly optimized the disney favourite",
      "The report said donald quickly optimized the Disney favourite",
    );

    runTest(
      "should not promote a lowercase given name followed by a preposition",
      "the report said donald in the meeting discussed disney",
      "The report said donald in the meeting discussed Disney",
    );

    runTest(
      "should not promote a lowercase given name followed by an ordinary noun",
      "the report said donald project notes mentioned disney",
      "The report said donald project notes mentioned Disney",
    );

    runTest(
      "should not promote a lowercase given name followed by an adjective",
      "the report said mary major update mentioned disney",
      "The report said mary major update mentioned Disney",
    );

    runTest(
      "should not promote a lowercase given name followed by an ordinary common noun",
      "the report said john market analysis mentioned disney",
      "The report said john market analysis mentioned Disney",
    );

    runTest(
      "should not promote a lowercase given name followed by a gerund",
      "the report said martin building plans mentioned disney",
      "The report said martin building plans mentioned Disney",
    );

    runTest(
      "should not promote a lowercase given name followed by a plural noun",
      "the report said ada systems failed after the public event",
      "The report said ada systems failed after the public event",
    );

    runTest(
      "should not promote a lowercase given name followed by a common expression",
      "the report said grace period rules changed after the event",
      "The report said grace period rules changed after the event",
    );

    runTest(
      "should not promote a lowercase given name followed by a phrasal verb",
      "the report said mark down the changes after the event",
      "The report said mark down the changes after the event",
    );

    runTest(
      "should not promote a lowercase given name followed by a service noun",
      "the report said carol service planning changed after the event",
      "The report said carol service planning changed after the event",
    );

    runTest(
      "should preserve a valid name phrase without extending through a following ordinary noun",
      "the report said john smith project details changed after the event",
      "The report said John Smith project details changed after the event",
    );

    runTest(
      "should preserve a valid name phrase without extending through a following adjective",
      "the report said mary shelley major update arrived after the event",
      "The report said Mary Shelley major update arrived after the event",
    );

    runTest(
      "should preserve a valid name phrase without extending through a following adverb",
      "the report said alan turing quickly changed the proposal",
      "The report said Alan Turing quickly changed the proposal",
    );

    runTest(
      "should preserve a valid name phrase without extending through a following preposition",
      "the report said ada lovelace in the meeting changed the proposal",
      "The report said Ada Lovelace in the meeting changed the proposal",
    );

    runTest(
      "should not infer an unknown lowercase product-like pair as a person name",
      "the report said qelvorn mastro changed the public event",
      "The report said qelvorn mastro changed the public event",
    );

    runTest(
      "should preserve an already capitalized unknown two-token person-like phrase",
      "the report said Qelvorn Mastro changed The Public Event",
      "The report said Qelvorn Mastro changed the public event",
    );

    runTest(
      "should not infer a lowercase invented word followed by a known family name as a person name",
      "the report said qelvorn smith changed the public event",
      "The report said qelvorn smith changed the public event",
    );

    runTest(
      "should not infer a known given name followed by a lowercase invented word as a person name",
      "the report said john qelvorn changed the public event",
      "The report said john qelvorn changed the public event",
    );
  });

  test.todo("should distinguish lowercase fictional names from lowercase invented product labels without entity data");
  test.todo("should not promote lowercase unknown phrases after punctuation when they are not named entities");
  test.todo("should resolve fully lowercase international personal names without a names corpus");
});

describe("TitleCaser Wikipedia – Media Brands", () => {
  runTest(
    "should preserve Fox News as a media brand in sentence case",
    "the interview aired on fox news after the public event",
    "The interview aired on Fox News after the public event",
  );

  runTest(
    "should preserve cable news acronyms and media sub-brands",
    "nbc, msnbc, and cnbc covered the fox business story",
    "NBC, MSNBC, and CNBC covered the Fox Business story",
  );

  runTest(
    "should preserve CNN regional and international channel names",
    "cnn australia and cnn international covered the story",
    "CNN Australia and CNN International covered the story",
  );

  runTest(
    "should preserve mixed global media outlets without preserving ordinary accidental capitals",
    "The Report cited bbc news, sky news, al jazeera, and The Local Artist",
    "The report cited BBC News, Sky News, Al Jazeera, and the local artist",
  );
});

runRareNounTrapWikipediaTests(TitleCaser);
