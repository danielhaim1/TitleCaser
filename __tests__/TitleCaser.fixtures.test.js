import { TitleCaser } from "../index.js";
import { historicalRegressionCases } from "./fixtures/historical-regression-cases.js";
import {
  canonicalDottedTermCases,
  protectedTokenCases,
  titleCaseStyles,
} from "./fixtures/protected-token-cases.js";

describe("TitleCaser - Historical Fixture Coverage", () => {
  test.each(historicalRegressionCases)(
    "%s: %s",
    (style, _description, input, expected) => {
      const titleCaser = style === "default"
        ? new TitleCaser()
        : new TitleCaser({ style });

      expect(titleCaser.toTitleCase(input)).toBe(expected);
    },
  );
});

describe("TitleCaser - Protected Token Fixture Coverage", () => {
  test.each(titleCaseStyles)("%s preserves opaque tokens", (style) => {
    const titleCaser = new TitleCaser({ style });

    protectedTokenCases.forEach(({ input, expectedTokens }) => {
      const output = titleCaser.toTitleCase(input);
      expectedTokens.forEach((token) => expect(output).toContain(token));
    });
  });

  test.each(titleCaseStyles)("%s preserves canonical dotted terms", (style) => {
    const titleCaser = new TitleCaser({ style });

    canonicalDottedTermCases.forEach(({ input, expectedByStyle, expectedTokens }) => {
      const output = titleCaser.toTitleCase(input);

      if (expectedByStyle) {
        expect(output).toBe(expectedByStyle[style]);
      }

      expectedTokens?.forEach((token) => expect(output).toContain(token));
    });
  });
});
