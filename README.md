# TitleCaser

[![npm version](https://img.shields.io/npm/v/@danielhaim/titlecaser)](https://www.npmjs.com/package/@danielhaim/titlecaser)
[![Downloads](https://img.shields.io/npm/dt/@danielhaim/titlecaser.svg)](https://www.npmjs.com/package/@danielhaim/titlecaser)
![GitHub](https://img.shields.io/github/license/danielhaim1/titlecaser)

A powerful utility for converting text to title case with support for multiple style guides and extensive customization options.

<a target="_blank" href="https://danielhaim1.github.io/TitleCaser/"><img src="https://raw.githubusercontent.com/danielhaim1/TitleCaser/main/docs/assets/demo.png" width="100%" height="auto" alt="TitleCaser Demo"></a>

- [TitleCaser](#titlecaser)
  * [Demo](https://danielhaim1.github.io/TitleCaser/)
  * [CodePen Demo 1](https://codepen.io/danielhaim/pen/oNQgjBv)
  * [CodePen Demo 2](https://codepen.io/danielhaim/pen/oNPGzKw)
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
    + [TitleCaser with Default Word Replacement](#titlecaser-with-default-word-replacement)
    + [TitleCaser with Possessive Noun and a Colon](#titlecaser-with-possessive-noun-and-a-colon)
  * [Build Process](#build-process)
  * [Test](#test)
  * [Resources](#resources)
  * [Report Bugs](#report-bugs)
  * [Contributing](CONTRIBUTING.md)
  * [Changelog](CHANGELOG.md)

## Overview

TitleCaser is a comprehensive solution for converting text to title case according to various style guides (AP, APA, Chicago, NYT, Wikipedia, British). It handles special cases like hyphens, apostrophes, Roman numerals, and acronyms, and provides extensive customization options.

## Language Conventions and Style Library

**The comprehensive Language Conventions and Style Library (LCSL)** is specifically designed to assist web content developers in adhering to the latest style guides and English language conventions. This all-inclusive library has various features, including support for numerous style guides such as **AP, APA, Chicago, NY Times, Wikipedia, and British styles** and customizable preferences to tailor to individual needs. **TitleCaser is a component of this library**, and LCSL is set to be open-sourced by the end of 2023.

### Streamlined Workflow
To streamline workflow, modules are available in both **browser and node environment versions** and include a command-line interface for building, testing, and minimizing the module. Additionally, it features a **filter ability** that allows users to ignore certain phrases containing short words, preventing the module from mistakenly flagging instances where short words are used as part of a larger term or phrase.

### Comprehensive Capitalization Handling
The module has been designed to handle various capitalization scenarios, including:
- **Hyphenated words**
- **Prefixes and suffixes**
- **Reserved words**
- **Roman numerals**
- **Proper nouns** that contain lowercase letters
- **Words that require capitalization** in specific contexts

This ensures that your content meets the appropriate style and formatting guidelines, regardless of the context. It also offers **word replacement capabilities**, as well as **ignored phrases** to create consistency in cases where certain terms may be capitalized differently depending on the context.

### Essential Tool for Content Developers
Whether you're developing web content for a major news organization or simply looking to improve your writing skills, this module is an **essential tool** that can help ensure your work is accurate, consistent, and conforms to the latest style guidelines.

### Key Features:
- **Support for popular style guides** and customizable preferences
- **Advanced capitalization handling** for suffixes, prefixes, hyphenated words, and reserved words
- **Support for proper capitalization** of Roman numerals and exclusion of specific words and phrases from title capitalization
- **Word replacement capabilities** for consistency in capitalization
- **Command-line interface** for building, testing, and minimizing the module
- **Pre-defined word lists** for articles, conjunctions, prepositions, and non-capitalized words in titles
- **Exclusion of common phrases** from title capitalization

## Features

- **Multiple Style Support**: AP, APA, Chicago, NYT, Wikipedia, and British title case styles
- **Special Case Handling**: Hyphens, apostrophes, Roman numerals, acronyms, and more
- **Word Replacement**: Replace specific words with their correct forms
- **Exact Phrase Replacement**: Replace exact phrases with their correct forms
- **Smart Quotes**: Optional conversion to smart quotes
- **Extensive Term Lists**: Includes extensive lists of correctly cased terms
- **Customizable Options**: Customize word lists, replacements, and other options

## Installation

```bash
npm install @danielhaim/titlecaser
```

## Usage

The package can be imported and used in both Node.js and browser environments:

```javascript
import { TitleCaser } from '@danielhaim/titlecaser';

// Basic usage with Chicago style
const titleCaser = new TitleCaser({
  style: 'chicago'
});
const result = titleCaser.toTitleCase('the book   of     life');
console.log(result); // "The Book of Life"

// With custom options
const customTitleCaser = new TitleCaser({
  style: 'ap',
  smartQuotes: true,
  ignoredWords: ['a', 'an', 'the'],
  acronyms: ['API', 'JSON', 'XML']
});

const customResult = customTitleCaser.toTitleCase('the api and json data');
console.log(customResult); // "The API and JSON Data"

// Add custom word replacements
titleCaser.addReplaceTerm('js', 'JavaScript');
const jsResult = titleCaser.toTitleCase('js development');
console.log(jsResult); // "JavaScript Development"

// Add exact phrase replacements
titleCaser.addExactPhraseReplacements([
  { 'the correct phrase': 'The Correct Phrase' }
]);
const phraseResult = titleCaser.toTitleCase('this is the correct phrase');
console.log(phraseResult); // "This Is The Correct Phrase"
```

## Usage in the Browser

The function can also be used in a browser environment by including the `TitleCaser.amd.js` script in your HTML file:

```html
<script src="./path/to/TitleCaser.amd.js"></script>
```

After that, the `toTitleCase()` function can be accessed in your JavaScript code like this:

```javascript
const options = { 
  style: 'apa'
};
const input = 'the future of devops: the next era';
const output = input.toTitleCase(options);

console.log(output); // The Future of DevOps: The Next Era
```

### Example with HTML Elements

```html
<h2>nodejs development on aws: an in-depth tutorial on server-side javascript deployment</h2>
<h2>the iphone's impact on modern communication: a sociolinguistic analysis</h2>
<h2>back-end and front-end</h2>
```

```javascript
function applyTitleCaseToH2Elements(options = { style: "apa" }) {
  try {
    const h2Elements = document.querySelectorAll("h2");
    h2Elements.forEach((h2) => {
      const innerHTML = h2.innerHTML;
      const modifiedContent = innerHTML.toTitleCase(options);
      h2.innerHTML = modifiedContent;
    });
  } catch (error) {
    console.error(
      "An error occurred while applying title case transformation:",
      error
    );
  }
}

applyTitleCaseToH2Elements();
```

## Options

The `{options}` parameter is an object that contains the settings for the conversion process.

- `style`: determines the specific title case style to be applied. Permissible values include: `['ap', 'apa', 'british', 'chicago', 'nyt', 'wikipedia']`
- `articlesList` refers to the words that should be treated as articles in title case.
- `shortConjunctionsList` pertains to the words that should be treated as short conjunctions in title case.
- `shortPrepositionsList` relates to the words that should be treated as short prepositions in title case.
- `neverCapitalizedList` contains the words that should never be capitalized in title case.
- `wordReplacementsList` is a map of terms that will be replaced during the title case conversion process.
- `smartQuotes` boolean value that determines whether quotes should be replaced with smart quotes.

## Methods

- `setReplaceTerms(terms)`: Updates the `wordReplacementsList` with new term-replacement pairs. It accepts an array of objects, each containing a single key-value pair representing the term and its replacement.
- `removeReplaceTerm(term)`: Removes a replaced term from the `wordReplacementsList` array in the option object of the `TitleCaser` instance. Throws an error if the term is not found in the array, otherwise removes it from the array and updates the option object.
- `addReplaceTerm(term, replacement)`: Adds a single term-replacement pair to the `wordReplacementsList`. If the term already exists, it updates the replacement value.
- `addExactPhraseReplacements(newPhrases)` - This method allows adding an array of exact phrase replacements to the `TitleCaser` class. Each item in the array should be an object with a single key-value pair, where the key is the phrase to be replaced and the value is the desired replacement.
- `setStyle(style: string)`: Sets the style option in the object of the TitleCaser instance. The method takes a string argument style that specifies the style to use for the title casing. If the argument is not a string, the method throws a TypeError. Otherwise, it updates the style option in the object.
- `smartQuotes(smartQuotes: boolean)`: Specifies whether to replace straight quotes with smart quotes during title casing. Provide a boolean argument smartQuotes to enable or disable this feature.

## Examples

### Basic Usage

```javascript
import { TitleCaser } from '@danielhaim/titlecaser';

const titleCaser = new TitleCaser();
const result = titleCaser.toTitleCase('hello world');
console.log(result); // "Hello World"
```

### Customizing Word Replacements Method

In the example below, we create a new instance of the `TitleCaser` class with the `APA` style option. We then set multiple replacement terms using two separate calls to the `setReplaceTerms()` method. Descriptive variable names are used for the input string and expected output. We call `toTitleCase()` to convert the input string to a title case.

```javascript
import { TitleCaser } from '@danielhaim/titlecaser';

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

```javascript
import { TitleCaser } from '@danielhaim/titlecaser';

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

// Set the input string to be tested
const input = "the basics of nodejs development with mongodb";

// Set the expected output
const expectedOutput = "The Basics of Node.js Development with MongoDB";

// Call the toTitleCase method and store the result in actualOutput
const actualOutput = titleCaser.toTitleCase(input);
```

### TitleCaser with Default Word Replacement

The example below demonstrates how to use the TitleCaser class to convert a string to a title case with AP style formatting, including hyphenated words and word/brand replacement.

```javascript
import { TitleCaser } from '@danielhaim/titlecaser';

// Instantiate a new TitleCaser object with AP style formatting
const titleCaser = new TitleCaser({ style: 'ap' });

// Set the input string to be tested
const input = 'nodejs development on aws: an in-depth tutorial on server-side javascript deployment';

// Set the expected output
const expectedOutput = 'Node.js Development on AWS: An In-depth Tutorial on Server-side JavaScript Deployment';

// Call the toTitleCase method and store the result in actualOutput
const actualOutput = titleCaser.toTitleCase(input);
```

### TitleCaser with Possessive Noun and a Colon

The example below demonstrates how to use the TitleCaser class to convert a string to title case with AP style formatting, including a possessive noun and a colon.

```javascript
import { TitleCaser } from '@danielhaim/titlecaser';

// Instantiate a new TitleCaser object with AP style formatting
const titleCaser = new TitleCaser({ style: "ap" });

// Set the input string to be tested
const input = "the iphone's impact on modern communication: a sociolinguistic analysis";

// Set the expected output
const expectedOutput = "The iPhone's Impact on Modern Communication: A Sociolinguistic Analysis";

// Call the toTitleCase method and store the result in actualOutput
const actualOutput = titleCaser.toTitleCase(input);
```

### TitleCaser with Smart Quotes

The example below demonstrates how to use the TitleCaser with smart quotes.

```javascript
import { TitleCaser } from '@danielhaim/titlecaser';

// Instantiate a new TitleCaser object with AP style formatting and smart quotes enabled
const titleCaser = new TitleCaser({ 
  style: 'ap',
  smartQuotes: true
});

// Set the input string to be tested
const input = '"Never underestimate the power O\' persistence,"';

// Set the expected output
const expectedOutput = '"Never Underestimate the Power O' Persistence,"';

// Call the toTitleCase method and store the result in actualOutput
const actualOutput = titleCaser.toTitleCase(input);
```

## Architecture

TitleCaser is structured into three main components:

1. **TitleCaser.js** - The main class that provides the public API
2. **TitleCaserConsts.js** - Contains constants, configuration, and data structures
3. **TitleCaserUtils.js** - Contains utility functions for text processing

### Data Structure

The package uses several JSON files to store specialized terms:

- **brandList.json**: Brand names and trademarks
- **businessFinanceLegalTerms.json**: Business and legal terminology
- **eCommerceDigitalTerms.json**: E-commerce and digital terms
- **globalGeography.json**: Geographic terms
- **marketingMediaTerms.json**: Marketing and media terms
- **miscSpecializedTerms.json**: Miscellaneous specialized terms
- **techComputingConcepts.json**: Technology and computing terms
- **timeAcademicTerms.json**: Time and academic terms

## API Reference

### Constructor

```javascript
new TitleCaser(options)
```

#### Options

- `style` (string): Title case style ('ap', 'apa', 'chicago', 'nyt', 'wikipedia', 'british')
- `smartQuotes` (boolean): Convert straight quotes to curly quotes
- `ignoredWords` (array): Words to ignore in title casing
- `acronyms` (array): Words to treat as acronyms

### Methods

#### toTitleCase(text)

Converts text to title case according to the selected style.

```javascript
const result = titleCaser.toTitleCase('hello world');
```

#### setReplaceTerms(replaceTerms)

Sets the word replacement list.

```javascript
titleCaser.setReplaceTerms([
  { 'js': 'JavaScript' },
  { 'api': 'API' }
]);
```

#### addReplaceTerm(term, replacement)

Adds a single term replacement.

```javascript
titleCaser.addReplaceTerm('js', 'JavaScript');
```

#### removeReplaceTerm(term)

Removes a term from the replacement list.

```javascript
titleCaser.removeReplaceTerm('js');
```

#### addExactPhraseReplacements(phrases)

Adds exact phrase replacements.

```javascript
titleCaser.addExactPhraseReplacements([
  { 'the correct phrase': 'The Correct Phrase' }
]);
```

#### setStyle(style)

Sets the title case style.

```javascript
titleCaser.setStyle('chicago');
```

## Build Process

```bash
npm run build-package
npm run build-docs
npm run copy-package-to-docs
npm run test
```

## Test

```bash
npm run test
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

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

## Tests

```bash  
Testing Combined Words that End with Symbol
✓ Capitalizes country code "US" correctly in a geopolitical context (4 ms)

Testing Disambiguation of Acronym vs. Pronoun for Alpha2/3 Country Codes ("US", "UK", "EU", etc.)
Includes edge cases, regional context detection, and AP-style title casing rules.

✓ Capitalizes "US" when preceded by "the" (1 ms)
✓ Capitalizes country code "US" correctly in a geopolitical context (1 ms)
✓ Capitalizes country code "US" correctly in a geopolitical context (1 ms)
✓ Capitalizes "US" when preceded by "from the" (1 ms)
✓ Capitalizes "US" when preceded by "via"
✓ Capitalizes country code "US" correctly in a geopolitical context (1 ms)
✓ Capitalizes country code "US" correctly in a geopolitical context (1 ms)
✓ 1. Does not capitalize "us" when used as a pronoun
✓ 2. Does not capitalize "us" when used as a pronoun (1 ms)
✓ 3. Does not capitalize "us" when used as a pronoun
✓ Capitalizes country code "UK" with preceding indicator and trailing comma (1 ms)
✓ Handles multiple instances of country codes and pronouns
✓ Does not capitalize "us" when used in common phrases (2 ms)
✓ Capitalizes "USA" in a formal context
✓ Capitalizes "US" before a government-related word (1 ms)
✓ Capitalizes "US" before a military-related word
✓ Capitalizes "US" correctly in a geopolitical context
✓ Capitalizes "US" correctly in a geopolitical context (1 ms)
✓ Capitalizes "US" as a regional acronym at the end of the sentence
✓ Does not capitalize "us" in casual speech
✓ Does not capitalize "us" in emotional context (1 ms)
✓ Does not capitalize "us" in passive voice
✓ Does not capitalize "us" with compound verb
✓ Does not capitalize "us" in inverted clause
✓ 1. Does not capitalize "us" when used as a pronoun (1 ms)
✓ 2. Does not capitalize "us" when used as a pronoun
✓ Does not capitalize "us" before a government-related word (1 ms)
✓ Does not capitalize "us" before a military-related word
✓ Does not capitalize "us" in common phrases (1 ms)
✓ Capitalizes "UK" at the end with safe context
✓ Capitalizes "UK" with preceding indicator and trailing comma (1 ms)
✓ Capitalizes "UK" with preceding indicator before a government-related word
✓ Capitalizes "UK" with preceding indicator before a territory-related word (1 ms)
✓ Handles multiple instances of country codes and pronouns
✓ Handles multiple instances of country codes and pronouns before government-related words (1 ms)
✓ Handles multiple instances of country codes and pronouns before talks-related words (1 ms)
✓ Handles multiple instances of country codes and pronouns before a bill-related word
✓ Capitalizes "USA" in a formal context (1 ms)
✓ Capitalizes "USA" in a formal context before a bill-related word
✓ AP-style acronym handling (1 ms)
✓ Test phrases "On & Off"
✓ Test phrases "On & Off"
Testing Hyphenated and Apostrophized Word Capitalization
✓ Capitalizes both parts of hyphenated brand name "t-mobile" (1 ms)
✓ Capitalizes both parts of hyphenated brand name "coca-cola"
✓ Capitalizes both parts of general hyphenated term "e-commerce"
✓ Capitalizes word with apostrophe "o'connor"
Test Basic Title Casing Options
✓ Converts basic lowercase phrase to title case (1 ms)
✓ Handles excessive spacing and lowercase articles
✓ AP-style with proper name replacements and brand casing (1 ms)
✓ Preserves correct casing in hyphenated names
✓ Properly capitalizes prepositions beyond 3 letters (1 ms)
Test TitleCaser Class Methods
✓ Wikipedia style title casing (1 ms)
✓ setReplaceTerms applies bulk term replacements
✓ addExactPhraseReplacements overrides specific phrases
✓ removeReplaceTerm deletes a single replacement rule (1 ms)
Test Variation Stability
✓ Capitalization and word replacements
✓ Brand Capitalization with reserved casing
✓ Possessives and colon usage (1 ms)
✓ Hyphenated compound tech terms
✓ Acronym handling and colon (1 ms)
✓ Colon and comparison phrase
✓ Hyphenated tutorial format (1 ms)
✓ Custom replacements and tech brands
✓ Smart quotes enabled (1 ms)
✓ Long informal sentence with acronyms
✓ Colon-separated title in APA style
✓ Colon and apostrophe casing
✓ Short conjunctions and brand normalization (1 ms)
✓ NYT-style acronym and colon usage (1 ms)
✓ Wikipedia style with DevOps capitalization (1 ms)
✓ Wikipedia style capitalization with colon
Test Reserved Words
✓ Transforms single reserved word correctly (1 ms)
✓ Transforms sentence with reserved word and colon
✓ Handles possessive form of reserved word
✓ Handles specific brand name replacements (1 ms)
✓ Handles HTML <br> with colon (spaced)
✓ Handles HTML <br> with full sentence split (1 ms)
✓ Handles <br> with no space after colon
✓ Handles ampersand (&) symbol without encoding
✓ Handles untrimmed white spaces
Test addReplaceTerm Method
✓ Adds a new replacement term correctly
✓ Updates an existing replacement term
```