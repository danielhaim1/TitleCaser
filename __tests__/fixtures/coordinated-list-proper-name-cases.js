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
    description: "does not infer a name from a capitalized product list",
    input: "The available finishes were Pearl, Rose, jet, Slate and Sand.",
    expectedOccurrences: [
      { value: "Rose", occurrence: 1, classification: "product-term" },
      { value: "jet", occurrence: 1, classification: "common-word" },
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
];
