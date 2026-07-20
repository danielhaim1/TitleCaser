import { TitleCaser } from "../index.js";
import { runRareNounTrapWikipediaTests } from "./helpers/rareNounTrapCases.js";

function runTest(description, input, expected) {
  test(description, () => {
    const titleCaser = new TitleCaser({ style: "wikipedia" });
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });
}

function runTestWithOptions(input, expected, options = {}) {
  const titleCaser = new TitleCaser({ style: "wikipedia", ...options });
  expect(titleCaser.toTitleCase(input)).toBe(expected);
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
    "should preserve the first-person pronoun alongside coordinated-name normalization",
    "we are going to the rocky mountains, rocky and I are going",
    "We are going to the Rocky Mountains, rocky and I are going",
  );
  runTest(
    "should capitalize Walt Disney without an article or company suffix",
    "walt disney announced a new film",
    "Walt Disney announced a new film",
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
  describe("TitleCaser Wikipedia – Sentence-ending punctuation", () => {
    const sentenceBoundaryCases = [
      ["should capitalize after a question mark", "when? right now", "When? Right now"],
      ["should capitalize after an exclamation mark", "when! right now", "When! Right now"],
      ["should capitalize after a period", "it worked. good work", "It worked. Good work"],
      ["should capitalize after multiple sentence-ending punctuations", "what? when? where?", "What? When? Where?"],
      ["should capitalize after quoted punctuation", "the question? \"right now!\" \"okay.\" \"good\"", "The question? \"Right now!\" \"Okay.\" \"Good\""],
      ["should capitalize quoted segments made from ASCII and curly punctuation", "what? «right now!» «okay.» «good»", "What? «Right now!» «Okay.» «Good»"],
      ["should capitalize with quoted sentence punctuation in single quotes", "'when?' 'right now!' 'okay.' 'good'", "'When?' 'Right now!' 'Okay.' 'Good'"],
      ["should capitalize with smart quotes around each quoted segment", "‘when?’ ‘right now!’ ‘okay.’ ‘good’", "‘When?’ ‘Right now!’ ‘Okay.’ ‘Good’"],
      ["should capitalize after quoted segments before another quote", "that? \"right now!\" \"okay?\" \"good\" again", "That? \"Right now!\" \"Okay?\" \"Good\" again"],
      ["should capitalize quoted phrases after quoted sentence punctuation and continue with quoted phrase", "the signal? \"red.\" \"yellow.\" \"green!\" then", "The signal? \"Red.\" \"Yellow.\" \"Green!\" Then"],
      ["should capitalize in a chained sentence", "first this. next line? then now! end", "First this. Next line? Then now! End"],
      ["should keep sentence case for words after newline-separated punctuation", "first.\nsecond starts here. third", "First. Second starts here. Third"],
      ["should capitalize after punctuation inside parentheses", "(when?) this happened", "(When?) This happened"],
      ["should capitalize after punctuation and keep following noun capitalization", "a test (really!). next phrase says yes", "A test (really!). Next phrase says yes"],
      ["should capitalize after punctuation before quotes", "when? \"right now\" said she. \"okay?\" he replied", "When? \"Right now\" said she. \"Okay?\" He replied"],
    ];

    test.each(sentenceBoundaryCases)("%s", (description, input, expected) => {
      const titleCaser = new TitleCaser({ style: "wikipedia" });
      expect(titleCaser.toTitleCase(input)).toBe(expected);
    });
  });

  describe("TitleCaser Wikipedia – User capitalization mode", () => {
    const userCapitalizationCases = [
      ["should ignore non-user capitalizations when preserve mode is off",
        "went to Disneyland and Magic Mountain",
        "Went to Disneyland and magic mountain",
        {}],
      ["should infer Rocky from Chris's lowercase name-list context",
        "went to the movies with jenny, jack, rocky, cindy, frank and peter",
        "Went to the movies with Jenny, Jack, Rocky, Cindy, Frank and Peter",
        {}],
      ["should normalize lowercase names across introductory and invited person lists",
        "william, robin, and hope summers invited alice, rocky, michael, Sarah and David",
        "William, Robin, and Hope Summers invited Alice, Rocky, Michael, Sarah and David",
        {}],
      ["should not promote ambiguous common words without a coordinated list",
        "We need hope for a mild summer and must pay the bill.",
        "We need hope for a mild summer and must pay the bill.",
        {}],
      ["should not promote a bird name without a coordinated list",
        "A robin landed near the garden gate.",
        "A robin landed near the garden gate.",
        {}],
      ["should preserve user-cased names in mixed words", "went to Disneyland and Magic Mountain",
        "Went to Disneyland and Magic Mountain",
        { wikipediaPreserveUserCapitalization: true }],
      ["should match user-cased name-list example exactly",
        "Went to the movies with Jenny, daniel, Rocky, Cindy, Frank and Peter",
        "Went to the movies with Jenny, Daniel, Rocky, Cindy, Frank and Peter",
        { wikipediaPreserveUserCapitalization: true }],
      ["should promote a lower-case Rocky outlier in a coordinated person list",
        "Went to the movies with Jacqueline, Jack, rocky, Cindy, Frank and Peter",
        "Went to the movies with Jacqueline, Jack, Rocky, Cindy, Frank and Peter",
        {}],
      ["should promote list-member Rocky without changing a later common-noun rocky",
        "Hope Summers and Robin Williams invited Alice, rocky, Michael, Sarah and David to discuss a new film while the road became rocky.",
        "Hope Summers and Robin Williams invited Alice, Rocky, Michael, Sarah and David to discuss a new film while the road became rocky.",
        {}],
      ["should preserve explicit user casing alongside normalized known given names",
        "went to the movies with Jenny, christopher, rocky, Cindy, Frank and Peter",
        "Went to the movies with Jenny, Christopher, Rocky, Cindy, Frank and Peter",
        { wikipediaPreserveUserCapitalization: true }],
      ["should infer Rocky while preserving known given names and a later adjectival rocky",
        "Jacqueline, jack, rocky, cindy, Frank and Peter arrived after the storm made the road rocky.",
        "Jacqueline, Jack, Rocky, Cindy, Frank and Peter arrived after the storm made the road rocky.",
        { wikipediaPreserveUserCapitalization: true }],
      ["should keep a quoted sentence-capitalized segment chain when user case preservation is enabled",
        "when? \"right now!\" \"okay.\" \"good\"",
        "When? \"Right now!\" \"Okay.\" \"Good\"",
        { wikipediaPreserveUserCapitalization: true }],
      ["should normalize all-caps canonical terms when preserve-all-caps is disabled",
        "went to DISNEYLAND",
        "Went to Disneyland",
        { wikipediaPreserveUserCapitalization: true }],
      ["should preserve all-caps words when preserve-all-caps mode is enabled",
        "went to DISNEYLAND and Magic Mountain",
        "Went to DISNEYLAND and Magic Mountain",
        { wikipediaPreserveUserCapitalization: true, wikipediaPreserveAllCaps: true }],
      ["should preserve a wholly all-caps title when preserve-all-caps mode is enabled",
        "WENT TO DISNEYLAND",
        "WENT TO DISNEYLAND",
        { wikipediaPreserveUserCapitalization: true, wikipediaPreserveAllCaps: true }],
      ["should preserve mixed-cap user capitalization while preserving sentence boundaries",
        "that? \"right now!\" \"okay?\" \"good\" again",
        "That? \"Right now!\" \"Okay?\" \"Good\" again",
        { wikipediaPreserveUserCapitalization: true }],
      ["should keep user capitalization after quoted punctuation and before more quoted text",
        "when? \"right now\" said she. \"okay?\" he replied",
        "When? \"Right now\" said she. \"Okay?\" He replied",
        { wikipediaPreserveUserCapitalization: true }],
      ["should keep user capitalization for AI-like all-caps abbreviations when configured",
        "can we use AI to predict the habits of the ai sloth",
        "Can we use AI to predict the habits of the ai sloth",
        { wikipediaPreserveUserCapitalization: true, wikipediaPreserveAllCaps: true }],
      ["should retain canonical casing when user casing is not explicit",
        "can we use ai to predict the habits of the ai sloth",
        "Can we use AI to predict the habits of the ai sloth",
        { wikipediaPreserveUserCapitalization: true, wikipediaPreserveAllCaps: false }],
    ];

    test.each(userCapitalizationCases)("%s", (description, input, expected, options) => {
      runTestWithOptions(input, expected, options);
    });
  });

  runTest(
    "should distinguish the AI acronym from the contextual ai sloth name",
    "can we use ai to predict the habits of the ai sloth",
    "Can we use AI to predict the habits of the ai sloth",
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

describe("TitleCaser Wikipedia – Demonyms and Identity Terms", () => {
  const identityCases = [
    ["why many americans still cannot access care", "Why many Americans still cannot access care"],
    ["latinas led the campaign for better housing", "Latinas led the campaign for better housing"],
    ["latinos organized across the city", "Latinos organized across the city"],
    ["latinx students challenged the policy", "Latinx students challenged the policy"],
    ["jews reported rising security concerns", "Jews reported rising security concerns"],
    ["jewish leaders met with city officials", "Jewish leaders met with city officials"],
    ["muslims described barriers to voting", "Muslims described barriers to voting"],
    ["sikhs opened a new community center", "Sikhs opened a new community center"],
    ["christians debated the proposal", "Christians debated the proposal"],
    ["hindus marked the festival downtown", "Hindus marked the festival downtown"],
    ["buddhists rebuilt the temple after the storm", "Buddhists rebuilt the temple after the storm"],
    ["catholics responded to the report", "Catholics responded to the report"],
    ["mormons expanded relief efforts", "Mormons expanded relief efforts"],
    ["mexicans voted in record numbers", "Mexicans voted in record numbers"],
    ["canadians faced new travel rules", "Canadians faced new travel rules"],
    ["japanese officials revised the forecast", "Japanese officials revised the forecast"],
    ["russians questioned the official account", "Russians questioned the official account"],
    ["ukrainians rebuilt schools near the front", "Ukrainians rebuilt schools near the front"],
    ["palestinians described worsening shortages", "Palestinians described worsening shortages"],
    ["filipinos sent remittances after the typhoon", "Filipinos sent remittances after the typhoon"],
    ["senegalese voters returned to the polls", "Senegalese voters returned to the polls"],
    ["new zealanders protested the mining plan", "New Zealanders protested the mining plan"],
    ["native americans sued over water rights", "Native Americans sued over water rights"],
    ["south africans demanded an inquiry", "South Africans demanded an inquiry"],
    ["central africans fled renewed fighting", "Central Africans fled renewed fighting"],
    ["sri lankans waited for election results", "Sri Lankans waited for election results"],
    ["sierra leoneans celebrated the court ruling", "Sierra Leoneans celebrated the court ruling"],
    ["costa ricans debated the energy plan", "Costa Ricans debated the energy plan"],
    ["argentinians protested austerity measures", "Argentinians protested austerity measures"],
    ["brazilians marched against corruption", "Brazilians marched against corruption"],
    ["chileans approved the referendum", "Chileans approved the referendum"],
    ["colombians questioned the peace deal", "Colombians questioned the peace deal"],
    ["venezuelans crossed the border for medicine", "Venezuelans crossed the border for medicine"],
    ["haitians rebuilt after the earthquake", "Haitians rebuilt after the earthquake"],
    ["jamaicans prepared for the hurricane", "Jamaicans prepared for the hurricane"],
    ["nigerians challenged the court order", "Nigerians challenged the court order"],
    ["kenyans counted ballots overnight", "Kenyans counted ballots overnight"],
    ["ethiopians welcomed the ceasefire", "Ethiopians welcomed the ceasefire"],
    ["egyptians questioned the new restrictions", "Egyptians questioned the new restrictions"],
    ["iraqis returned to damaged neighborhoods", "Iraqis returned to damaged neighborhoods"],
    ["iranians protested the sentence", "Iranians protested the sentence"],
    ["israelis waited for coalition talks", "Israelis waited for coalition talks"],
    ["turks voted in a close election", "Turks voted in a close election"],
    ["greeks faced another round of cuts", "Greeks faced another round of cuts"],
    ["romanians challenged the corruption law", "Romanians challenged the corruption law"],
    ["roma communities demanded recognition", "Roma communities demanded recognition"],
  ];

  test.each(identityCases)("%s -> %s", (input, expected) => {
    const titleCaser = new TitleCaser({ style: "wikipedia" });
    expect(titleCaser.toTitleCase(input)).toBe(expected);
  });
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
