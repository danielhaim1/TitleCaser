import { TitleCaser } from "../index.js";

const historicalRegressionCases = [
  [
    "default",
    "capitalizes a basic two-word title",
    "hello world",
    "Hello World",
  ],
  [
    "default",
    "normalizes repeated whitespace while applying title case",
    "the book   of     life",
    "The Book of Life",
  ],
  [
    "default",
    "normalizes technology names, acronyms, and hyphenated compounds",
    "nodejs development on aws: an in-depth tutorial on server-side javascript deployment",
    "Node.js Development on AWS: An In-depth Tutorial on Server-side JavaScript Deployment",
  ],
  [
    "ap",
    "keeps us as a pronoun before a government-related phrase",
    "It's up to us in government to decide.",
    "It's Up to Us in Government to Decide.",
  ],
  [
    "ap",
    "recognizes UK in a government-related clause",
    "The uk, with its strong government, leads the way.",
    "The UK, With Its Strong Government, Leads the Way.",
  ],
  [
    "ap",
    "distinguishes UK and US country codes in a military context",
    "We visited the uk and the US, and both have strong military forces.",
    "We Visited the UK and the US, and Both Have Strong Military Forces.",
  ],
  [
    "ap",
    "keeps us as a pronoun before a military-related phrase",
    "It's up to us in military to decide.",
    "It's Up to Us in Military to Decide.",
  ],
  [
    "ap",
    "preserves UK in a territory-related clause",
    "The UK, with its vast territory, has diverse landscapes.",
    "The UK, With Its Vast Territory, Has Diverse Landscapes.",
  ],
  [
    "ap",
    "recognizes UK and US country codes in a diplomatic context",
    "We visited the uk and the US, and both engage in diplomatic talks.",
    "We Visited the UK and the US, and Both Engage in Diplomatic Talks.",
  ],
  [
    "ap",
    "keeps us as a pronoun before an international activity",
    "It's important for us to participate in international talks.",
    "It's Important for Us to Participate in International Talks.",
  ],
  [
    "ap",
    "recognizes USA before a legislative term",
    "The usa introduces a new bill for economic reform.",
    "The USA Introduces a New Bill for Economic Reform.",
  ],
  [
    "ap",
    "recognizes UK and US country codes in a legislative context",
    "We visited the uk and the US, and both consider a bill for environmental protection.",
    "We Visited the UK and the US, and Both Consider a Bill for Environmental Protection.",
  ],
  [
    "chicago",
    "normalizes Google capitalization in a comparison title",
    "GooGlE vs. VirtualBox: a comparative study of virtualization software",
    "Google vs. VirtualBox: A Comparative Study of Virtualization Software",
  ],
  [
    "chicago",
    "normalizes a possessive Google brand name and TensorFlow",
    "GOOGle's tensorflow",
    "Google's TensorFlow",
  ],
  [
    "chicago",
    "trims surrounding whitespace and collapses repeated internal spaces",
    "      This    string   has   too   many  spaces  ",
    "This String Has Too Many Spaces",
  ],
  [
    "wikipedia",
    "preserves a known organization while applying Wikipedia sentence case",
    "announcing a new collaboration with the cybersmile foundation: how to combat cyberbullying",
    "Announcing a new collaboration with The Cybersmile Foundation: how to combat cyberbullying",
  ],
];

describe("TitleCaser - Historical Regression Coverage", () => {
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
