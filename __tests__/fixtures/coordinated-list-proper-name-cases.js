export const titleCaseStyles = ["ap", "apa", "british", "chicago", "nyt", "wikipedia"];

// `contextual-person` is the only classification inferred by the coordinated-list detector.
// The remaining classifications document nearby occurrences that must not be inferred.
export const contextualNameCases = [
  {
    description: "distinguishes a person named Robin from the bird in the same sentence",
    input: "The guests were Alice, robin, Michael, Sarah and David, while a robin landed near the garden gate.",
    expectedOccurrences: [
      { value: "robin", occurrence: 1, classification: "contextual-person" },
      { value: "robin", occurrence: 2, classification: "common-word" },
    ],
  },
  {
    description: "resolves multiple ambiguous names across separate coordinated lists",
    input: "Emma, hope, Daniel, Olivia and James joined Mark, summer, Julia, Ethan and Chloe before discussing hope for a mild summer.",
    expectedOccurrences: [
      { value: "hope", occurrence: 1, classification: "contextual-person" },
      { value: "summer", occurrence: 1, classification: "contextual-person" },
      { value: "hope", occurrence: 2, classification: "common-word" },
      { value: "summer", occurrence: 2, classification: "common-word" },
    ],
  },
  {
    description: "infers Rocky while leaving canonical names and the later adjective alone",
    input: "Jacqueline, jack, rocky, cindy, Frank and Peter arrived after the storm made the road rocky.",
    expectedOccurrences: [
      { value: "jack", occurrence: 1, classification: "canonical-name" },
      { value: "rocky", occurrence: 1, classification: "contextual-person" },
      { value: "cindy", occurrence: 1, classification: "canonical-name" },
      { value: "rocky", occurrence: 2, classification: "common-word" },
    ],
  },
  {
    description: "handles a full-name list without changing the later common rocky",
    input: "Hope Summers and Robin Williams invited Alice, rocky, Michael, Sarah and David to discuss a new film while the road became rocky.",
    expectedOccurrences: [
      { value: "rocky", occurrence: 1, classification: "contextual-person" },
      { value: "rocky", occurrence: 2, classification: "common-word" },
    ],
  },
  {
    description: "recognizes May as a person in a list but not the later calendar month",
    input: "Alice, Robin, Hope and may attended the event in May.",
    expectedOccurrences: [
      { value: "may", occurrence: 1, classification: "contextual-person" },
      { value: "May", occurrence: 2, classification: "calendar-month" },
    ],
  },
  {
    description: "does not infer ambiguous words from common-noun lists",
    input: "The report discussed hope, faith, joy, summer and spring.",
    expectedOccurrences: [
      { value: "hope", occurrence: 1, classification: "common-word" },
      { value: "faith", occurrence: 1, classification: "common-word" },
      { value: "joy", occurrence: 1, classification: "common-word" },
      { value: "summer", occurrence: 1, classification: "common-word" },
    ],
  },
  {
    description: "does not infer ambiguous words without a coordinated list",
    input: "We need hope for a mild summer and must pay the bill.",
    expectedOccurrences: [
      { value: "hope", occurrence: 1, classification: "common-word" },
      { value: "summer", occurrence: 1, classification: "common-word" },
      { value: "bill", occurrence: 1, classification: "common-word" },
    ],
  },
  {
    description: "does not infer a bird as a person without a coordinated list",
    input: "A robin landed near the garden gate.",
    expectedOccurrences: [
      { value: "robin", occurrence: 1, classification: "common-word" },
    ],
  },
  {
    description: "does not infer a name from a capitalized product list",
    input: "The available finishes were Pearl, Rose, jet, Slate and Sand.",
    expectedOccurrences: [
      { value: "Rose", occurrence: 1, classification: "product-term" },
      { value: "jet", occurrence: 1, classification: "common-word" },
    ],
  },
  {
    description: "does not infer a person from intensity-style and title-case nouns",
    input: "Critical, Major, minor, Moderate and Low.",
    expectedOccurrences: [
      { value: "Critical", occurrence: 1, classification: "common-word" },
      { value: "Major", occurrence: 1, classification: "common-word" },
      { value: "minor", occurrence: 1, classification: "common-word" },
      { value: "Moderate", occurrence: 1, classification: "common-word" },
      { value: "Low", occurrence: 1, classification: "common-word" },
    ],
  },
  {
    description: "does not infer a person from a color list",
    input: "The colors were Red, Blue, green and Black.",
    expectedOccurrences: [
      { value: "Red", occurrence: 1, classification: "common-word" },
      { value: "Blue", occurrence: 1, classification: "common-word" },
      { value: "green", occurrence: 1, classification: "common-word" },
      { value: "Black", occurrence: 1, classification: "common-word" },
    ],
  },
  {
    description: "does not treat a capitalized title-like phrase as coordinated-list evidence",
    input: "Hope Summers' new film brings Robin Williams to the festival.",
    expectedOccurrences: [
      { value: "Hope", occurrence: 1, classification: "canonical-name" },
      { value: "Robin", occurrence: 1, classification: "canonical-name" },
    ],
  },
  {
    description: "selects the list member but not URL or common-word rocky occurrences",
    input: "Alice, Bob, rocky, David and Emma reviewed https://example.com/rocky before walking along a rocky trail.",
    expectedOccurrences: [
      { value: "rocky", occurrence: 1, classification: "contextual-person" },
      { value: "rocky", occurrence: 2, classification: "protected-token" },
      { value: "rocky", occurrence: 3, classification: "common-word" },
    ],
  },
  {
    description: "rejects coordinator parsing when a parenthetical interrupts the list",
    input: "Alice (editor), robin, Michael, Sarah and David",
    expectedOccurrences: [
      { value: "robin", occurrence: 1, classification: "common-word" },
    ],
  },
  {
    description: "rejects coordinator parsing when a suffix interrupts the list",
    input: "Alice Jr., robin, Michael, Sarah and David",
    expectedOccurrences: [
      { value: "robin", occurrence: 1, classification: "common-word" },
    ],
  },
  {
    description: "rejects coordinator parsing when a multiword first item includes apostrophe punctuation",
    input: "Alice O'Neil, robin, Michael, Sarah and David",
    expectedOccurrences: [
      { value: "robin", occurrence: 1, classification: "common-word" },
    ],
  },
  {
    description: "rejects coordinator parsing when an item is quoted",
    input: 'Alice, "robin", Michael, Sarah and David',
    expectedOccurrences: [
      { value: "robin", occurrence: 1, classification: "common-word" },
    ],
  },
  {
    description: "does not treat tokens from backtick code spans as list evidence",
    input: "Alice, `robin`, Michael, Sarah and David",
    expectedOccurrences: [
      { value: "robin", occurrence: 1, classification: "common-word" },
    ],
  },
  {
    description: "does not treat camelCase identifiers as list evidence",
    input: "fileId, rocky, Michael, Sarah and David",
    expectedOccurrences: [
      { value: "rocky", occurrence: 1, classification: "common-word" },
    ],
  },
  {
    description: "does not treat file paths as list evidence",
    input: "/tmp/rocky, Michael, Sarah and David",
    expectedOccurrences: [
      { value: "rocky", occurrence: 1, classification: "common-word" },
    ],
  },
  {
    description: "does not infer candidates from URL path segments",
    input: "https://example.com/rocky, Michael, Sarah and David",
    expectedOccurrences: [
      { value: "rocky", occurrence: 1, classification: "common-word" },
    ],
  },
  {
    description: "does not treat email and domain-like tokens as list evidence",
    input: "User@Example.Com, rocky, Michael, Sarah and David",
    expectedOccurrences: [
      { value: "rocky", occurrence: 1, classification: "common-word" },
    ],
  },
  {
    description: "does not treat capitalized non-name multiword peers as strong person evidence",
    input: "Machine Learning, rocky, Michael, Sarah and David",
    expectedOccurrences: [
      { value: "rocky", occurrence: 1, classification: "common-word" },
    ],
  },
  {
    description: "does not treat mountain-like title-cased pairs as full people",
    input: "Rocky Mountain, robin, Michael, Sarah and David",
    expectedOccurrences: [
      { value: "Rocky", occurrence: 1, classification: "common-word" },
      { value: "robin", occurrence: 1, classification: "common-word" },
    ],
  },
  {
    description: "does not treat business noun phrases as people peers",
    input: "Customer Support, robin, Michael, Sarah and David",
    expectedOccurrences: [
      { value: "robin", occurrence: 1, classification: "common-word" },
    ],
  },
  {
    description: "recognizes a full-name peer in an otherwise valid person list",
    input: "Robin Williams, rocky, Michael, Sarah and David attended.",
    expectedOccurrences: [
      { value: "rocky", occurrence: 1, classification: "contextual-person" },
    ],
  },
  {
    description: "requires three recognized person peers",
    input: "Alice, rocky, Michael and spring arrived.",
    expectedOccurrences: [
      { value: "rocky", occurrence: 1, classification: "common-word" },
    ],
  },
  {
    description: "does not let an unrelated code span affect a valid person list",
    input: "Alice, robin, Michael, Sarah and David met after `build` finished.",
    expectedOccurrences: [
      { value: "robin", occurrence: 1, classification: "contextual-person" },
    ],
  },
  {
    description: "does not infer a person from a quoted coordinated list",
    input: '"Alice, robin, Michael, Sarah and David',
    expectedOccurrences: [
      { value: "robin", occurrence: 1, classification: "common-word" },
    ],
  },
];
