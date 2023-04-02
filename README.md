## TitleCase-JS

Transform any text to proper title case format using popular style guides such as APA, AP, Chicago, NYT, Wikipedia, and British. Customize options to achieve greater flexibility and consistency.

## Demo

<a target="_blank" href="https://danielhaim1.github.io/titlecase-js/"><img src="dist/demo.png" width="100%" height="auto"></a>

[![npm version](https://badge.fury.io/js/titlecase-js.svg?t=1623701119)](https://badge.fury.io/js/titlecase-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dt/titlecase-js.svg)](https://www.npmjs.com/package/titlecase-js)

The Language Conventions and Style Module is a comprehensive library designed to help web content developers adhere to the latest style guides and English language conventions. It offers a wide range of features, including support for various style guides such as AP, APA, Chicago, NY Times, Wikipedia, and British styles, and customizable preferences to suit your specific needs.

To streamline workflow, the Language Conventions and Style Module is available in both browser and node environment versions and includes a command-line interface for building, testing, and minimizing the module. Additionally, it features a filter ability that allows users to ignore certain phrases containing short words, preventing the module from mistakenly flagging instances where short words are used as part of a larger term or phrase.

The module has been designed to handle various capitalization scenarios, including hyphenated words, prefixes, suffixes, reserved words, Roman numerals, proper nouns that contain lowercase letters, and words that require capitalization in specific contexts. This ensures that your content meets the appropriate style and formatting guidelines, regardless of the context. It also offers word replacement capabilities, as well as ignored phrases to create consistency in cases where certain terms may be capitalized differently depending on the context, such as converting variations of gOogle to Google, front-end to Frontend.

So whether you're developing web content for a major news organization or simply looking to improve your writing skills, the Language Conventions and Style Module is an essential tool that can help ensure your work is accurate, consistent, and conforms to the latest style guidelines.

## Key Features:

- Support for popular style guides and customizable preferences
- Advanced capitalization handling for suffixes, prefixes, hyphenated words, and reserved words
- Support for proper capitalization of Roman numerals and exclusion of specific words and phrases from title capitalization
- Word replacement capabilities for consistency in capitalization
Command-line interface for building, testing, and minimizing the module
- Pre-defined word lists for articles, conjunctions, prepositions, and uncapitalized words in titles
- Exclusion of common phrases from title capitalization

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
- `articlesList` refers to the words that should be treated as articles in title case.
- `shortConjunctionsList` pertains to the words that should be treated as short conjunctions in title case.
- `shortPrepositionsList` relates to the words that should be treated as short prepositions in title case.
- `neverCapitalizedList` contains the words that should never be capitalized in title case.
- `wordReplacementsList` is a map of terms that will be replaced during the title case conversion process.

## Examples

The example below demonstrates how to use the TitleCaser class to convert a string to title case with custom options.

```js
// Set the options to Chicago style
const options = { style: 'chicago' };

// Instantiate a new TitleCaser object with the options
const titleCaser = new TitleCaser(options);

// Set the input string to test
const input = 'the    Book  of  lIfe';

// Set the expected output
const expectedOutput = 'The Book of Life';

// Call the toTitleCase method and store the result in actualOutput
const actualOutput = titleCaser.toTitleCase(input);

// Log the actual output
console.log(actualOutput);
```

The example below demonstrates how to use the TitleCaser class to convert a string to title case with specific settings.

```js
// Set the options object
const options = {
  style: "nyt",
  wordReplacementsList: {
    "nodejs": "Node.js",
    "javascript": "JavaScript",
    "mongodb": "MongoDB"
  }
};

// Instantiate a new TitleCaser object with the options
const titleCaser = new TitleCaser(options);

// Set the input string to test
const input = "the basics of nodejs development with mongodb";

// Set the expected output
const expectedOutput = "The Basics of Node.js Development with MongoDB";

// Call the toTitleCase method and store the result in actualOutput
const actualOutput = titleCaser.toTitleCase(input);

// Log the actual output
console.log(actualOutput);
```

The example below demonstrates how to use the TitleCaser class to convert a string to title case with AP style formatting, including hyphenated words and word/brand replacement.

```js
// Instantiate a new TitleCaser object with AP style formatting
const titleCaser = new TitleCaser({ style: 'ap' });

// Set the input string to test
const input = 'nodejs development on aws: an in-depth tutorial on server-side javascript deployment';

// Set the expected output
const expectedOutput = 'Node.js Development on AWS: An In-depth Tutorial on Server-side JavaScript Deployment';

// Call the toTitleCase method and store the result in actualOutput
const actualOutput = titleCaser.toTitleCase(input);

// Log the actual output
console.log(actualOutput);
```

The example below demonstrates how to use the TitleCaser class to convert a string to title case with AP style formatting, including a possessive noun and a colon.

```js
// Instantiate a new TitleCaser object with AP style formatting
const titleCaser = new TitleCaser({ style: "ap" });

// Set the input string to test
const input = "the iphone's impact on modern communication: a sociolinguistic analysis";

// Set the expected output
const expectedOutput = "The iPhone's Impact on Modern Communication: A Sociolinguistic Analysis";

// Call the toTitleCase method and store the result in actualOutput
const actualOutput = titleCaser.toTitleCase(input);

// Log the actual output
console.log(actualOutput);
```

The example below demonstrates how to use the TitleCaser class to convert a string to title case with AP style formatting, including lowercase back-end and front-end terms.

```js
// Instantiate a new TitleCaser object with AP style formatting
const titleCaser = new TitleCaser({ style: "ap" });

// Set the input string to test
const input = "BACK-end and front-end";

// Set the expected output
const expectedOutput = "Backend and Frontend";

// Call the toTitleCase method and store the result in actualOutput
const actualOutput = titleCaser.toTitleCase(input);

// Log the actual output
console.log(actualOutput);
```

## Command Line

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
  ✓ Testing correctPhraseCasingListList
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

If you encounter any bugs or issues while using the library or the demo page, please report them by opening a new issue in the repository's issue tracker. 

When reporting a bug, please provide as much detail as possible, including the steps to reproduce the issue and any error messages that you see. I appreciate any contribution to improve this library.