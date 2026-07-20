export const rareNounTrapCases = [
  [
    "should lowercase civic nouns without treating them as entities",
    "The Public Hearing followed The Local Election",
    "The public hearing followed the local election",
    "The Public Hearing Followed the Local Election",
  ],
  [
    "should lowercase medical nouns without treating them as entities",
    "The Medical Report cited The Clinical Trial",
    "The medical report cited the clinical trial",
    "The Medical Report Cited the Clinical Trial",
  ],
  [
    "should lowercase legal nouns without treating them as entities",
    "The Legal Appeal changed The Court Decision",
    "The legal appeal changed the court decision",
    "The Legal Appeal Changed the Court Decision",
  ],
  [
    "should lowercase business nouns without treating them as entities",
    "The Market Analysis shaped The Business Strategy",
    "The market analysis shaped the business strategy",
    "The Market Analysis Shaped the Business Strategy",
  ],
  [
    "should lowercase technology nouns without treating them as entities",
    "The Software Update affected The Payment System",
    "The software update affected the payment system",
    "The Software Update Affected the Payment System",
  ],
  [
    "should lowercase research workflow nouns without treating them as entities",
    "The Research Project entered The Review Stage",
    "The research project entered the review stage",
    "The Research Project Entered the Review Stage",
  ],
  [
    "should lowercase arts nouns without treating them as entities",
    "The Art Exhibition featured The Local Artist",
    "The art exhibition featured the local artist",
    "The Art Exhibition Featured the Local Artist",
  ],
  [
    "should lowercase sports and media nouns without treating them as entities",
    "The Football Match followed The Press Conference",
    "The football match followed the press conference",
    "The Football Match Followed the Press Conference",
  ],
  [
    "should preserve an invented capitalized entity while lowercasing ordinary nouns",
    "The report mentioned Qelvorn Project during The Public Event",
    "The report mentioned Qelvorn Project during the public event",
    "The Report Mentioned Qelvorn Project During the Public Event",
  ],
  [
    "should preserve a known title-like entity while lowercasing ordinary nouns",
    "The article cited Snow Crash after The Public Event",
    "The article cited Snow Crash after the public event",
    "The Article Cited Snow Crash After the Public Event",
  ],
  [
    "should preserve a brand entity while lowercasing ordinary nouns",
    "The report referenced Apple Music after The Market Event",
    "The report referenced Apple Music after the market event",
    "The Report Referenced Apple Music After the Market Event",
  ],
  [
    "should preserve a project entity while lowercasing legal nouns",
    "The case mentioned The Lincoln Project after The Court Hearing",
    "The case mentioned The Lincoln Project after the court hearing",
    "The Case Mentioned The Lincoln Project After the Court Hearing",
  ],
];

export function runRareNounTrapTitleCaseTests(TitleCaser, style) {
  describe(`TitleCaser ${style.toUpperCase()} – Rare Noun Trap Cross-Style Coverage`, () => {
    test.each(rareNounTrapCases)("%s", (_description, input, _wikipediaExpected, titleExpected) => {
      const titleCaser = new TitleCaser({ style });
      expect(titleCaser.toTitleCase(input)).toBe(titleExpected);
    });
  });
}

export function runRareNounTrapWikipediaTests(TitleCaser) {
  describe("TitleCaser Wikipedia – Rare Noun Trap Coverage", () => {
    test.each(rareNounTrapCases)("%s", (_description, input, wikipediaExpected) => {
      const titleCaser = new TitleCaser({ style: "wikipedia" });
      expect(titleCaser.toTitleCase(input)).toBe(wikipediaExpected);
    });
  });
}
