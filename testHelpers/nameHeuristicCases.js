export const nameHeuristicTitleCaseCases = [
  [
    "should preserve a lowercase given-name and family-name phrase",
    "the report cited john smith after the public event",
    "The Report Cited John Smith After the Public Event",
  ],
  [
    "should preserve a lowercase given-name and family-name phrase with a common-word surname",
    "the report cited john snow after the public event",
    "The Report Cited John Snow After the Public Event",
  ],
  [
    "should preserve a lowercase given-name and uncommon family-name phrase",
    "the report cited donald mcfly after the public event",
    "The Report Cited Donald McFly After the Public Event",
  ],
  [
    "should preserve a lowercase fictional given-name and family-name phrase",
    "the report cited donald duck after the public event",
    "The Report Cited Donald Duck After the Public Event",
  ],
  [
    "should preserve a lowercase literary given-name and family-name phrase",
    "the report cited mary shelley after the public event",
    "The Report Cited Mary Shelley After the Public Event",
  ],
  [
    "should preserve a lowercase technology given-name and family-name phrase",
    "the report cited alan turing after the public event",
    "The Report Cited Alan Turing After the Public Event",
  ],
  [
    "should preserve a lowercase historical given-name and family-name phrase",
    "the report cited ada lovelace after the public event",
    "The Report Cited Ada Lovelace After the Public Event",
  ],
  [
    "should preserve a lowercase given-name and family-name phrase before a verb",
    "the report said donald duck optimized the public event",
    "The Report Said Donald Duck Optimized the Public Event",
  ],
  [
    "should preserve a lowercase given-name and family-name phrase before an adverb",
    "the report said donald duck quickly left the public event",
    "The Report Said Donald Duck Quickly Left the Public Event",
  ],
  [
    "should preserve a lowercase given-name and family-name phrase before a preposition",
    "the report said donald duck in the meeting discussed disney",
    "The Report Said Donald Duck in the Meeting Discussed Disney",
  ],
  [
    "should preserve only the lowercase given-name and family-name phrase before an ordinary noun",
    "the report said donald duck project notes mentioned disney",
    "The Report Said Donald Duck Project Notes Mentioned Disney",
  ],
  [
    "should preserve a lowercase apostrophized family-name phrase",
    "the report cited maeve o'connor after the public event",
    "The Report Cited Maeve O’Connor After the Public Event",
  ],
  [
    "should preserve a lowercase international given-name and family-name phrase",
    "the report cited saoirse ronan after the public event",
    "The Report Cited Saoirse Ronan After the Public Event",
  ],
  [
    "should title-case a lowercase given name followed by a verb",
    "the report said donald optimized the disney favourite",
    "The Report Said Donald Optimized the Disney Favourite",
  ],
  [
    "should title-case a lowercase given name followed by an adverb",
    "the report said donald quickly optimized the disney favourite",
    "The Report Said Donald Quickly Optimized the Disney Favourite",
  ],
  [
    "should title-case a lowercase given name followed by a preposition",
    "the report said donald in the meeting discussed disney",
    "The Report Said Donald in the Meeting Discussed Disney",
  ],
  [
    "should title-case a lowercase given name followed by an ordinary noun",
    "the report said donald project notes mentioned disney",
    "The Report Said Donald Project Notes Mentioned Disney",
  ],
  [
    "should title-case a lowercase given name followed by an adjective",
    "the report said mary major update mentioned disney",
    "The Report Said Mary Major Update Mentioned Disney",
  ],
  [
    "should title-case a lowercase given name followed by an ordinary common noun",
    "the report said john market analysis mentioned disney",
    "The Report Said John Market Analysis Mentioned Disney",
  ],
  [
    "should title-case a lowercase given name followed by a gerund",
    "the report said martin building plans mentioned disney",
    "The Report Said Martin Building Plans Mentioned Disney",
  ],
  [
    "should title-case a lowercase given name followed by a plural noun",
    "the report said ada systems failed after the public event",
    "The Report Said Ada Systems Failed After the Public Event",
  ],
  [
    "should title-case a lowercase given name followed by a common expression",
    "the report said grace period rules changed after the event",
    "The Report Said Grace Period Rules Changed After the Event",
  ],
  [
    "should title-case a lowercase given name followed by a phrasal verb",
    "the report said mark down the changes after the event",
    "The Report Said Mark Down the Changes After the Event",
  ],
  [
    "should title-case a lowercase given name followed by a service noun",
    "the report said carol service planning changed after the event",
    "The Report Said Carol Service Planning Changed After the Event",
  ],
  [
    "should preserve a valid name phrase without extending through a following ordinary noun",
    "the report said john smith project details changed after the event",
    "The Report Said John Smith Project Details Changed After the Event",
  ],
  [
    "should preserve a valid name phrase without extending through a following adjective",
    "the report said mary shelley major update arrived after the event",
    "The Report Said Mary Shelley Major Update Arrived After the Event",
  ],
  [
    "should preserve a valid name phrase without extending through a following adverb",
    "the report said alan turing quickly changed the proposal",
    "The Report Said Alan Turing Quickly Changed the Proposal",
  ],
  [
    "should preserve a valid name phrase without extending through a following preposition",
    "the report said ada lovelace in the meeting changed the proposal",
    "The Report Said Ada Lovelace in the Meeting Changed the Proposal",
  ],
  [
    "should title-case an unknown lowercase product-like pair",
    "the report said qelvorn mastro changed the public event",
    "The Report Said Qelvorn Mastro Changed the Public Event",
  ],
  [
    "should preserve an already capitalized unknown two-token person-like phrase",
    "the report said Qelvorn Mastro changed The Public Event",
    "The Report Said Qelvorn Mastro Changed the Public Event",
  ],
  [
    "should title-case a lowercase invented word followed by a known family name",
    "the report said qelvorn smith changed the public event",
    "The Report Said Qelvorn Smith Changed the Public Event",
  ],
  [
    "should title-case a known given name followed by a lowercase invented word",
    "the report said john qelvorn changed the public event",
    "The Report Said John Qelvorn Changed the Public Event",
  ],
];

export function runNameHeuristicTitleCaseTests(TitleCaser, style) {
  describe(`TitleCaser ${style.toUpperCase()} – Name Heuristic Cross-Style Coverage`, () => {
    test.each(nameHeuristicTitleCaseCases)("%s", (_description, input, expected) => {
      const titleCaser = new TitleCaser({ style });
      expect(titleCaser.toTitleCase(input)).toBe(expected);
    });
  });
}
