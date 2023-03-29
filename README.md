## TitleCase-JS
### Converts a string to title case

[![npm version](https://badge.fury.io/js/titlecase-js.svg?t=1623709119)](https://badge.fury.io/js/titlecase-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dt/titlecase-js.svg)](https://www.npmjs.com/package/titlecase-js)
[![Known Vulnerabilities](https://snyk.io/test/github/gouch/to-title-case/badge.svg)](https://snyk.io/test/github/gouch/to-title-case)

<a target="_blank" href="https://danielhaim1.github.io/titlecase-js/"><img src="dist/img.png" width="100%" height="auto"></a>

This module helps writers follow English language conventions and style guides such as AP, APA, Chicago, NY Times, Wikipedia, and British styles. It also allows users to customize their own style. Users can change article words, conjunctions, prepositions, and words that should not be capitalized. The module also knows which words and phrases should not be capitalized in titles.

The module can handle capitalization in different scenarios, including hyphenated words, suffixes, prefixes, reserved words, and Roman numerals. It also has a list of specific arrays that should always be in title case and common terms that require capitalization. The module corrects common terms to their proper case.

There is a command-line interface (CLI) for building, testing, and minimizing the module.

See the module in action in the [demo page](https://www.danielhaim.com/tools/titlecaser/).

## Key Features:

This module provides the following features for English writers:

- It follows popular style guides (AP, APA, Chicago, NY Times, Wikipedia, British) and allows for customization.
- You can customize article words, conjunctions, prepositions, and uncapitalized words.
- The module handles suffixes, prefixes, hyphenated words, and reserved words.
- Specific words and phrases that should not be capitalized in titles are excluded, along with the capitalization of hyphenated words and Roman numerals.
- It has a list of unique words and common terms that require capitalization and corrects common terms to their proper case.
- A command-line interface is available for building, testing, and minimizing the module.
- Pre-defined word lists for articles, conjunctions, prepositions, and uncapitalized words in titles are provided.
- Common phrases that should not be capitalized in titles are maintained.

## Installation

```bash
$ npm install titlecase-js
```

## Usage

```javascript
const toTitleCase = require('titlecase-js');

const input = 'the quick brown fox jumps over the lazy dog';
const options = { style: 'apa' };
const output = input.toTitleCase(options);

console.log(output);
```

## API

- The `options` parameter is an object that contains the settings for the conversion process.
- The `style` parameter is a string that determines the specific title case style to be applied. Permissible values include: `'ap'`, `'apa'`, `'british'`, `'chicago'`, `'nyt'`, and `'wikipedia'`.
- `articles` refers to the words that should be treated as articles in title case.
- `shortConjunctions` pertains to the words that should be treated as short conjunctions in title case.
- `shortPrepositions` relates to the words that should be treated as short prepositions in title case.
- `neverCapitalized` contains the words that should never be capitalized in title case.
- `replaceCasing` is a map of terms that will be replaced during the title case conversion process.

### API Examples:

```javascript
test('should convert string to title case with custom options', () => {
  const options = { style: 'chicago' };
  const titleCaser = new TitleCaser(options);
  const input = 'the book   of     life';
  const expectedOutput = 'The Book of Life';
  const actualOutput = titleCaser.toTitleCase(input);
  expect(actualOutput).toEqual(expectedOutput);
});

test('should convert string to title case with AP style formatting, including hyphenated words, word and brand replacement', () => {
  const titleCaser = new TitleCaser({ style: 'ap' });
  const input = 'nodejs development on aws: an in-depth tutorial on server-side javascript deployment';
  const expectedOutput = 'Node.js Development on AWS: An In-depth Tutorial on Server-side JavaScript Deployment';
  const actualOutput = titleCaser.toTitleCase(input);
  expect(actualOutput).toEqual(expectedOutput);
});

test("Convert string to title case with Chicago style formatting, including hyphenated words, word and brand replacement", () => {
    const options = { style: "chicago" };
    const titleCaser = new TitleCaser(options);
    const input = "nodejs development on aws: an in-depth tutorial on server-side javascript deployment";
    const expectedOutput = "Node.js Development on AWS: An In-Depth Tutorial on Server-Side JavaScript Deployment";
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput).toEqual(expectedOutput);
});

test("Convert string to title case with AP style formatting, including custom term replacement for Google and VMware", () => {
    const options = { style: "ap", replaceTerms = {} };
    const titleCaser = new TitleCaser(options);
    const input = "GOOgle and VMWARE";
    const expectedOutput = "Google and VMware";
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput).toEqual(expectedOutput);
});

test("Convert string to title case with AP style formatting, including a possessive noun and a colon", () => {
    const options = { style: "ap" };
    const titleCaser = new TitleCaser(options);
    const input = "the iphone's impact on modern communication: a sociolinguistic analysis";
    const expectedOutput = "The iPhone's Impact on Modern Communication: A Sociolinguistic Analysis";
    const actualOutput = titleCaser.toTitleCase(input);
});


test("Convert string to title case with AP style formatting, including lowercase back-end and front-end terms", () => {
    const options = { style: "ap" };
    const titleCaser = new TitleCaser(options);
    const input = "BACK-end and front-end";
    const expectedOutput = "Backend and Frontend";
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput).toEqual(expectedOutput);
});
```

## CLI

```bash
$ npm run build-package
```

```bash
$ npm run test
```

```bash
  ✓ should convert string to title case with default options (2 ms)
  ✓ should convert string to title case with custom options
  ✓ should convert string to title case with AP style formatting, including hyphenated words, word and brand replacement (1 ms)
  ✓ Convert string to title case with Chicago style formatting, including hyphenated words, word and brand replacement (1 ms)
  ✓ Convert string to title case with AP style formatting, including custom term replacement for Google and VMware
  ✓ Convert string to title case with AP style formatting, including a possessive noun and a colon
  ✓ Convert string to title case with AP style formatting, including lowercase back-end and front-end terms
  ✓ Convert string to title case with Chicago style formatting, including a comparison and a colon
  ✓ Convert string to title case with APA style formatting, including a colon (1 ms)
  ✓ Convert string to title case with Wikipedia style formatting, including acronym and hyphen
  ✓ Convert string to title case with APA style formatting, including colon and apostrophe (1 ms)
  ✓ Convert string to title case with Chicago style formatting, including special terms such as node.js
  ✓ AP Style capitalization test with special terms eBook and CTO and a colon (1 ms)
  ✓ NYT style capitalization test with special terms IoT and AI and a colon
  ✓ APA Style Capitalization Test with a Colon and Short Conjunction Terms (Instagram, TikTok, and Snapchat)
  ✓ Testing CORRECT_PHRASE_CASE
  ✓ Wikipedia style capitalization test with special term DevOps and a colon
  ✓ Chicago Style capitalization test with custom term replacement for GooGlE to Google and a comparison with a colon (1 ms)
  ✓ Convert string containing a term with mixed case to title case
  ✓ Convert string containing a possessive term with mixed case to title case
  ✓ Convert hyphenated word with brand name from GOOgle-Tensorflow to Google-TensorFlow
  ✓ Convert hyphenated word with brand name and possessive from GOOGle's-Tensorflow to Google's-TensorFlow
  ✓ Convert string with HTML line break tag to title case with correct spacing
  ✓ Convert string with untrimmed spaces to title case with correct spacing (1 ms)
```

## Resources

Useful materials for improving your knowledge of writing and language style guides. These resources include various books and manuals, such as the Publication Manual of the American Psychological Association, the Chicago Manual of Style, and the AP Stylebook, which are widely recognized as authoritative sources on grammar, punctuation, and capitalization rules.

- [AP Stylebook, 56th Edition](https://store.stylebooks.com/ap-stylebook-56th-edition-print.html)
- [Publication Manual of the American Psychological Association, Seventh Edition (2020)](https://apastyle.apa.org/products/publication-manual-7th-edition)
- [Chicago Manual of Style: Capitalization](https://chat.openai.com/chat/643828ec-d4b5-4f21-b035-62946dd2cec3#:~:text=Chicago%20Manual%20of%20Style%3A%20Capitalization)
- [The Bluebook: A Uniform System of Citation. 21st ed. Cambridge: Harvard Law Review Association, 2020](https://open.mitchellhamline.edu/cgi/viewcontent.cgi?article=2782&context=wmlr)
- [The Chicago Manual of Style, 17th Edition](https://press.uchicago.edu/ucp/books/book/chicago/C/bo25956703.html)
- [The New York Times Manual of Style and Usage](https://www.worldcat.org/title/946964415)
- [Wikipedia: Letter case](https://chat.openai.com/chat/643828ec-d4b5-4f21-b035-62946dd2cec3#:~:text=Wikipedia%3A%20Letter%20case)
- [Wikipedia:Manual of Style/Titles of works](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Titles_of_works#Capital_letters)

## Report Bugs

If you encounter any bugs or issues while using the library or the demo page, please report them by opening a new issue in the repository's issue tracker. When reporting a bug, please provide as much detail as possible, including the steps to reproduce the issue and any error messages that you see. We appreciate your help in improving the library and making it as bug-free as possible.
