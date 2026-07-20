export const titleCaseStyles = ["ap", "apa", "british", "chicago", "nyt", "wikipedia"];

export const protectedTokenCases = [
  {
    description: "preserves lowercase bare domains and email addresses",
    input: "visit example.com and api.example.co.uk/path?format=json#overview and example.technology/docs and registry.example.xn--p1ai/package and support@example.co.uk for details",
    expectedTokens: [
      "example.com",
      "api.example.co.uk/path?format=json#overview",
      "example.technology/docs",
      "registry.example.xn--p1ai/package",
      "support@example.co.uk",
    ],
  },
  {
    description: "preserves user casing in bare domains and email addresses",
    input: "visit EXAMPLE.TECHNOLOGY and USER@EXAMPLE.CO.UK",
    expectedTokens: ["EXAMPLE.TECHNOLOGY", "USER@EXAMPLE.CO.UK"],
  },
];

export const canonicalDottedTermCases = [
  {
    description: "normalizes Node.js without treating it as a domain",
    input: "node.js guide",
    expectedByStyle: {
      ap: "Node.js Guide",
      apa: "Node.js Guide",
      british: "Node.js Guide",
      chicago: "Node.js Guide",
      nyt: "Node.js Guide",
      wikipedia: "Node.js guide",
    },
  },
  {
    description: "normalizes Battle.net without treating it as a domain",
    input: "battle.net guide",
    expectedTokens: ["Battle.net"],
  },
];
