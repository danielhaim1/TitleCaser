# TitleCaser

[![npm version](https://img.shields.io/npm/v/@danielhaim/titlecaser)](https://www.npmjs.com/package/@danielhaim/titlecaser)
[![Downloads](https://img.shields.io/npm/dt/@danielhaim/titlecaser.svg)](https://www.npmjs.com/package/@danielhaim/titlecaser)
![GitHub](https://img.shields.io/github/license/danielhaim1/titlecaser)

Transform any text to proper title case format using popular style guides such as APA, AP, Chicago, NYT, Wikipedia, and British. Customize options to achieve greater flexibility and consistency.

## Demo

<a target="_blank" href="https://danielhaim1.github.io/TitleCaser/"><img src="https://raw.githubusercontent.com/danielhaim1/TitleCaser/main/docs/assets/demo.png" width="100%" height="auto" alt="TitleCaser Demo"></a>

## Table of Contents

- [TitleCaser](#titlecaser)
  * [Demo](#demo)
  * [Table of Contents](#table-of-contents)
  * [Introduction](#introduction)
  * [Key Features:](#key-features)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Usage in the Browser](#usage-in-the-browser)
  * [Options](#options)
  * [Methods](#methods)
  * [Examples](#examples)
    + [Basic Usage](#basic-usage)
    + [Customizing Word Replacements Method](#customizing-word-replacements-method)
    + [Customizing TitleCaser](#customizing-titlecaser)
    + [TitleCaser With Default Word Replacement](#titlecaser-with-default-word-replacement)
    + [TitleCaser With Possessive Noun and a Colon](#titlecaser-with-possessive-noun-and-a-colon)
  * [Build Process](#build-process)
  * [Test](#test)
  * [Resources](#resources)
  * [Report Bugs](#report-bugs)

## Introduction

The comprehensive Language Conventions and Style Library is specifically designed to assist web content developers in adhering to the latest style guides and English language conventions. This all-inclusive library has various features, including support for numerous style guides such as AP, APA, Chicago, NY Times, Wikipedia, and British styles and customizable preferences to tailor to individual needs. TitleCaser is a component of this library, and LCSL is set to be open-sourced by the end of 2023

To streamline workflow, modules are available in both browser and node environment versions and include a command-line interface for building, testing, and minimizing the module. Additionally, it features a filter ability that allows users to ignore certain phrases containing short words, preventing the module from mistakenly flagging instances where short words are used as part of a larger term or phrase.

The module has been designed to handle various capitalization scenarios, including hyphenated words, prefixes, suffixes, reserved words, Roman numerals, proper nouns that contain lowercase letters, and words that require capitalization in specific contexts. This ensures that your content meets the appropriate style and formatting guidelines, regardless of the context. It also offers word replacement capabilities, as well as ignored phrases to create consistency in cases where certain terms may be capitalized differently depending on the context.

Whether you're developing web content for a major news organization or simply looking to improve your writing skills, this module is an essential tool that can help ensure your work is accurate, consistent, and conforms to the latest style guidelines.

## Key Features:

- Support for popular style guides and customizable preferences
- Advanced capitalization handling for suffixes, prefixes, hyphenated words, and reserved words
- Support for proper capitalization of Roman numerals and exclusion of specific words and phrases from title capitalization
- Word replacement capabilities for consistency in capitalization
Command-line interface for building, testing, and minimizing the module
- Pre-defined word lists for articles, conjunctions, prepositions, and non-capitalized words in titles
- Exclusion of common phrases from title capitalization

## Installation
You can install this module via npm:

```bash
$ npm i @danielhaim/titlecaser
```

## Usage

The package can be imported and used in both Node.js and browser environments using the following syntax:

```js
import { TitleCaser } from './path/to/@danielhaim/titlecaser';

const options = {
  style: 'chicago'
};

const titleCaser = new TitleCaser(options);

const input = 'the book   of     life';
const output = titleCaser.toTitleCase(input);

console.log(output); // 'The Book of Life'
```

## Usage in the Browser

The function can also be used in a browser environment by including the `titlecaser.amd.js` script in your HTML file:

Here's an example of how to use the modulate function:

```html
<script src="./path/to/titlecaser.amd.js"></script>
```

After that, the `toTitleCase()` function can be accessed in your JavaScript code like this:

```js
const options = { 
  style: 'apa'
};
const input = 'the future of devops: the next era';
const output = input.toTitleCase(options);

console.log(output); // The Future of DevOps: The Next Era
```

## Options

The `{options}` parameter is an object that contains the settings for the conversion process.

- `style`: determines the specific title case style to be applied. Permissible values include: `['ap', 'apa', 'british', 'chicago', 'nyt', 'wikipedia']`
- `articlesList` refers to the words that should be treated as articles in title case.
- `shortConjunctionsList` pertains to the words that should be treated as short conjunctions in title case.
- `shortPrepositionsList` relates to the words that should be treated as short prepositions in title case.
- `neverCapitalizedList` contains the words that should never be capitalized in title case.
- `wordReplacementsList` is a map of terms that will be replaced during the title case conversion process.

## Methods

- `setReplaceTerms(terms: object)`: Sets word replacement terms to be used during title casing. Multiple calls can be made to add or update multiple word replacements.
- `removeReplaceTerm(term: string)`: Removes a replaced term from the `wordReplacementsList` array in the option object of the `TitleCaser` instance. Throws an error if the term is not found in the array, otherwise removes it from the array and updates the option object.
- `addReplaceTerm(term: string, replacement: string)`: Adds a new term to the `wordReplacementsList` array in the options object of the TitleCaser instance. The method takes two string arguments: term specifies the word to be replaced, and replacement specifies the replacement for the word. If the term already exists in the array, the method updates its replacement value. Otherwise, it adds a new object with the term and replacement to the array. The method then updates the wordReplacementsList property in the object.
- `setStyle(style: string)`: Sets the style option in the object of the TitleCaser instance. The method takes a string argument style that specifies the style to use for the title casing. If the argument is not a string, the method throws a TypeError. Otherwise, it updates the style option in the object.

## Examples

The example below demonstrates how to use the TitleCaser class to convert a string to title case with custom options.

### Customizing Word Replacements Method

In the example below, we create a new instance of the `TitleCaser` class with the `APA` style option. We then set multiple replacement terms using two separate calls to the `setReplaceTerms()` method. Descriptive variable names are used for the input string and expected output. We call `toTitleCase()` to convert the input string to a title case.

```js
import { TitleCaser } from './path/to/@danielhaim/titlecaser';

const titleCaser = new TitleCaser({
  style: 'apa'
});

// Set multiple replacement terms using two separate calls to setReplaceTerms()
titleCaser.setReplaceTerms({ 
  'hello world': 'Hello World', 
  'replace me': 'Replace Me' 
});
titleCaser.setReplaceTerms({ 
  'apa': 'APA' 
});

// Use descriptive variable names for the input and expected output
const inputString = "hello world, replace me!";
const expectedOutput = "Hello World, Replace Me!";

// Call toTitleCase() to convert the input string to title case
const outputString = titleCaser.toTitleCase(inputString);
```

### Customizing TitleCaser

The example below demonstrates how to use the TitleCaser class to convert a string to a title case with specific settings.

```js
import { TitleCaser } from './path/to/@danielhaim/titlecaser';

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
```

### TitleCaser With Default Word Replacement  

The example below demonstrates how to use the TitleCaser class to convert a string to a title case with AP style formatting, including hyphenated words and word/brand replacement.

```js
import { TitleCaser } from './path/to/@danielhaim/titlecaser';

// Instantiate a new TitleCaser object with AP style formatting
const titleCaser = new TitleCaser({ style: 'ap' });

// Set the input string to test
const input = 'nodejs development on aws: an in-depth tutorial on server-side javascript deployment';

// Set the expected output
const expectedOutput = 'Node.js Development on AWS: An In-depth Tutorial on Server-side JavaScript Deployment';

// Call the toTitleCase method and store the result in actualOutput
const actualOutput = titleCaser.toTitleCase(input);
```

### TitleCaser With Possessive Noun and a Colon 

The example below demonstrates how to use the TitleCaser class to convert a string to title case with AP style formatting, including a possessive noun and a colon.

```js
import { TitleCaser } from './path/to/@danielhaim/titlecaser';

// Instantiate a new TitleCaser object with AP style formatting
const titleCaser = new TitleCaser({ style: "ap" });

// Set the input string to test
const input = "the iphone's impact on modern communication: a sociolinguistic analysis";

// Set the expected output
const expectedOutput = "The iPhone's Impact on Modern Communication: A Sociolinguistic Analysis";

// Call the toTitleCase method and store the result in actualOutput
const actualOutput = titleCaser.toTitleCase(input);
```

## Build Process

```bash
$ npm run build-package
$ npm run build-docs
$ npm run copy-package-to-docs
$ npm run test
```

## Test

```bash
$ npm run test
```

```bash
Test Basic Options
✓ Default title case conversion (2 ms)
✓ Customized title case conversion (1 ms)
✓ AP-style title case conversion with replacements (1 ms)
✓ AP-style title case conversion with replacements
✓ Capitalize suffix word in sentence (1 ms)

Test Methods
✓ removeReplaceTerm
✓ setReplaceTerms

Test Variation Stability
✓ Hyphenated, colon, and short word replacements (1 ms)
✓ Capitalization and word replacements
✓ AP-style title case with possessive and colon
✓ AP-style title case with lowercase back/front-end terms
✓ Chicago style title case with comparison and colon
✓ APA style title case with colon (3 ms)
✓ Wikipedia style title case with acronym and hyphen (1 ms)
✓ APA style title case with colon and apostrophe
✓ Chicago style title case with custom term replacements
✓ AP-style capitalization test with special terms and colon (1 ms)
✓ NYT-style capitalization test with special terms and colon
✓ APA style capitalization test with short conjunction terms and colon (1 ms)
✓ Correct phrase casing list testing
✓ Wikipedia style capitalization test with special term and colon (1 ms)

Test Reserved Words
✓ Reserved word
✓ Reserved word with colon
✓ Reserved word, posessive
✓ Hyphenated reserved word (1 ms)
✓ Hyphenated reserved word, possessive
✓ HTML line break nl2br, <br /> tag
✓ Ampersand in a sentence should return & and not &Amp;
✓ Untrimmed white spaces (1 ms)
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

When reporting a bug, please provide as much detail as possible, including the steps to reproduce the issue and any error messages that you see. I appreciate any contribution to improving this library.
