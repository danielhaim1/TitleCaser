import { TitleCaser } from "../index.js";

describe("TitleCaser – Style-specific infinitive handling", () => {
  test.each([
    ["ap", "It’s Up to Us in the US Military To Decide."],
    ["apa", "It’s Up to Us in the US Military to Decide."],
    ["chicago", "It’s Up to Us in the US Military to Decide."],
    ["nyt", "It’s Up to Us in the US Military to Decide."],
  ])(
    "handles AP-only infinitive capitalization for %s style",
    (style, expected) => {
      const titleCaser = new TitleCaser({ style });

      expect(
        titleCaser.toTitleCase("it’s up to us in the us military to decide.")
      ).toBe(expected);
    }
  );
});
