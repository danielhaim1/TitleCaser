## toTitleCase()
### Converts a string to title case

[![npm version](https://badge.fury.io/js/titlecase-js.svg)](https://badge.fury.io/js/titlecase-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dt/titlecase-js.svg)](https://www.npmjs.com/package/titlecase-js)
[![Known Vulnerabilities](https://snyk.io/test/github/gouch/to-title-case/badge.svg)](https://snyk.io/test/github/gouch/to-title-case)

The repository contains a module that converts a string to title case using a set of rules based on the most common styles, guides, and English language conventions. 

The module provides a `toTitleCase()` method that can be used on any string to convert it to title case.

The [demo page](https://codepen.io/danielhaim/pen/oNPGzKw) shows two default options (AP, Chicago) for now, with word replacement and custom options.

## Features
- Supports the most common English language conventions and style guides, including AP, APA, Chicago, NY Times, Wikipedia, and British, as well as a custom style.
- Customizable options for article words, conjunctions, prepositions, and words that should never be capitalized.
- Ignores certain words and phrases that should not be capitalized in titles.
- Handles hyphenated words and capitalization of Roman numerals.
- Includes a list of unique words that should always be capitalized in titles.
- Corrects certain common terms to their correct casing.
- Includes a CLI for building, testing, and minifying the module.
- Includes word lists for articles, conjunctions, prepositions, and words that should never be capitalized.
- Includes a list of unique words that should always be capitalized in titles.
- Includes a list of common terms that should be capitalized in titles.
- Includes a list of common phrases that should not be capitalized in titles.

## Installation

```bash
npm install titlecase-js
```

## CLI

```bash
$ npx webpack

$ npm run build
$ npm run build-min
$ npm run test
```

## Usage

```javascript
const toTitleCase = require('titlecase-js');

const title = 'the quick brown fox jumps over the lazy dog';
const options = { style: 'apa' };
const result = title.toTitleCase(options);

console.log(result); // "The Quick Brown Fox Jumps over the Lazy Dog"
```

## API

- `options` (Object): An object containing the options for the conversion.
- `style` (String): The style of title case to apply. Allowed values are `'ap'`, `'apa'`, `'british'`, `'chicago'`, `'nyt'`, and `'wikipedia'`. Default is `'ap'`.
- `articles` (Array<String>): An array of words to be treated as articles in title case.
- `shortConjunctions` (Array<String>): An array of words to be treated as short conjunctions in title case.
- `shortPrepositions` (Array<String>): An array of words to be treated as short prepositions in title case.
- `neverCapitalized` (Array<String>): An array of words to never capitalize in title case.

## Functions
- `validateOption:` Validates if the input option is an array of strings.
- `validateOptions:` Validates if all options passed to it are valid.
- `getTitleCaseOptions:` Returns an object with options to use for title casing strings.
- `isShortConjunction:` Returns true if the word is a short conjunction.
- `isArticle:` Returns true if the word is an article.
- `isShortPreposition:` Returns true if the word is a short preposition.
- `isNeverCapitalized:` Returns true if the word is never capitalized.
- `isShortWord:` Returns true if the word is a short word (a conjunction, an article, a preposition or a never capitalized word).
- `hasNumbersInWord:` Returns true if the word contains any number.
- `hasMultipleUppercaseLetters:` Returns true if the word contains multiple uppercase letters.
- `hasIntentionalUppercase:` Returns true if the word has intentional uppercase.
- `hasHyphen:` Returns true if the word contains a hyphen.
- `startsWithHashtag:` Returns true if the word starts with a hashtag.
- `startsWithAtSymbol:` Returns true if the word starts with an at symbol.
- `startsWithDot:` Returns true if the word starts with a dot.
- `endsWithSymbol:` Returns true if the word ends with a symbol.
- `capitalizeWord:` Returns the word with the first letter capitalized.
- `isFirst:` Returns true if the word is the first element in the array.
- `isLast:` Returns true if the word is the last element in the array.
- `isFirstOrLast:` Returns true if the word is the first or last element in the array.
- `isRomanNumeral:` Returns true if the word is a valid Roman numeral.
- `hasHyphenRomanNumeral:` Returns true if the word is a hyphenated Roman numeral.
- `isWordIgnored:` Returns true if the word is in the list of ignored words.
- `isWordInArray:` Returns true if the word is in the given array.
- `getCorrectTitleCasing:` Returns the correctly capitalized version of the word if it's a known unique term, otherwise returns the original word.
- `correctTerm:` Replaces any instances of a word in a sentence with the correct version, given a list of correctly spelled words.
- `replaceTerm:` Replaces any instances of a word in a sentence with a replacement term, given a map of terms to replace.
- `isIncorrectTerm:` Returns true if the word is a known term that is spelled incorrectly.
- `isPhraseIgnored:` Returns true if any phrase is in the list of ignored title case phrases.
- `processHyphenatedWord` is a function that takes a hyphenated word and a title case style as input and processes it according to the rules of the specified title case style.`

## Examples
```javascript
"Back-End Web Development: Building Scalable APIs with Node.js".toTitleCase();
"Exploring Back-End Frameworks: Comparing Django, Ruby on Rails, and Laravel".toTitleCase({ style: 'chicago' });
"Mastering Front-End Web Design: Tips and Tricks for Creating Responsive Layouts".toTitleCase({ style: 'nyt' });
"Back-End Security: Best Practices for Securing Your Web Applications".toTitleCase({ style: 'wikipedia' });
"Advanced jQuery Techniques: Tips and Tricks for Experienced Front-End Developers".toTitleCase({ style: 'british' });
"The Future of Back-End Development: Trends and Technologies to Watch".toTitleCase({ style: 'ap' });
"Front-End Performance Optimization: Tools and Techniques for Faster Websites".toTitleCase({ style: 'apa' });
```

```javascript
const title = "the quick brown fox jumps over the lazy dog";

const options = {
  style: "ap",
  articles: ["the", "an", "a"],
  shortConjunctions: ["and", "but", "or", "for", "nor", "yet", "so"],
  shortPrepositions: ["in", "on", "at", "by", "to", "up", "as", "of", "off"],
  neverCapitalized: ["and", "or", "but", "nor", "a", "an", "the", "as", "at", "by", "for", "in", "of", "on", "to", "up", "yet", "so"],
};

const titleCased = title.toTitleCase(options);

console.log(titleCased); // The Quick Brown Fox Jumps over the Lazy Dog
```

```javascript
// Example 1: Default title case
const input = "the quick brown fox jumps over the lazy dog";
const output = input.toTitleCase(); // "The Quick Brown Fox Jumps Over the Lazy Dog"
```

```javascript
// Example 2: Title case with small words not capitalized
const input = "to be or not to be";
const output = input.toTitleCase(); // "To Be or Not to Be"
```

```javascript
// Example 3: Title case with specific words not capitalized
const input = "the name of the musical is The Musical";
const output = input.toTitleCase( { neverCapitalized: ["The Musical"] }); // "The Name of the Musical Is The Musical"
```

```javascript
// Example 4: Chicago style title case
const input = "the quick rabbit together with the brown fox jumped over the dog";
const output = input.toTitleCase({ style: "chicago" }); // "The Quick Rabbit Together with the Brown Fox Jumped Over the Dog"
```

```javascript
// Example 5: WordReplacement:
const myArray = ["Google"];
const input = "goOgle";
input.toTitleCase({ style: "ap", ARR_WORD_REPLACEMENT: myArray }); // "Google"
```

```javascript
"JQuEry Plugins for Front-End Developers: A Comprehensive Guide".toTitleCase({ style: 'apa' }); // jQuery Plugins for Front-End Developers: A Comprehensive Guide
```

## Tests
```bash
npm test
```

```bash
    ✓ throws TypeError if input is not a string (3 ms)
    ✓ throws TypeError if options is not an object (1 ms)
    ✓ AP style (27 ms)
    ✓ Replace term back-end, front-end (6 ms)
    ✓ Chicago style (9 ms)
    ✓ APA style (8 ms)
    ✓ NYT style (10 ms)
    ✓ Wikipedia style (17 ms)
    ✓ Replace incorrect capitalization for reserved words, replace reserved words (Jquery>jQuery, Front-End>Frontend) (10 ms)
    ✓ Reserved keyword, correct capitalization (Back-End > Backend) (13 ms)
    ✓ Convert string to title case with APA style formatting (6 ms)
    ✓ Convert string to title case with AP style formatting, including possessive (9 ms)
    ✓ Convert string to title case with Chicago style formatting, including all-caps and ampersand (8 ms)
    ✓ Convert string to title case with NYT style formatting, including question mark and quotes (16 ms)
    ✓ Convert string to title case with Wikipedia style formatting, including acronym and hyphen (8 ms)
    ✓ Convert string to title case with APA style formatting, including colon and apostrophe (7 ms)
    ✓ Convert string to title case with Chicago style formatting, including special terms such as node.js (5 ms)
    ✓ Convert string to title case with AP style formatting, including special terms such as eBook, CTO (12 ms)
    ✓ Convert string to title case with NYT style formatting, including special terms such as IoT, AI (8 ms)
    ✓ Convert string to title case with APA style formatting, including colon and short conjunctions (12 ms)
    ✓ Convert string to title case with Wikipedia style formatting, including special terms such as DevOps (12 ms)
    ✓ Convert string to title case with Chicago style formatting, including reserved terms GooGlE to Google (7 ms)

Test Suites: 1 passed, 1 total
Tests:       22 passed, 22 total
Snapshots:   0 total
Time:        1.172 s, estimated 2 s
```

## Resources
- [AP Stylebook, 56th Edition](https://store.stylebooks.com/ap-stylebook-56th-edition-print.html)
- [Publication Manual of the American Psychological Association, Seventh Edition (2020)](https://apastyle.apa.org/products/publication-manual-7th-edition)
- [Chicago Manual of Style: Capitalization](https://chat.openai.com/chat/643828ec-d4b5-4f21-b035-62946dd2cec3#:~:text=Chicago%20Manual%20of%20Style%3A%20Capitalization)
- [The Bluebook: A Uniform System of Citation. 21st ed. Cambridge: Harvard Law Review Association, 2020](https://open.mitchellhamline.edu/cgi/viewcontent.cgi?article=2782&context=wmlr)
- [The Chicago Manual of Style, 17th Edition](https://press.uchicago.edu/ucp/books/book/chicago/C/bo25956703.html)
- [The New York Times Manual of Style and Usage](https://www.worldcat.org/title/946964415)
- [Wikipedia: Letter case](https://chat.openai.com/chat/643828ec-d4b5-4f21-b035-62946dd2cec3#:~:text=Wikipedia%3A%20Letter%20case)
- [Wikipedia:Manual of Style/Titles of works](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Titles_of_works#Capital_letters)