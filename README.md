## toTitleCase()
### Converts a string to title case

[![npm version](https://badge.fury.io/js/titlecase-js.svg)](https://badge.fury.io/js/titlecase-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dt/titlecase-js.svg)](https://www.npmjs.com/package/titlecase-js)
[![Known Vulnerabilities](https://snyk.io/test/github/gouch/to-title-case/badge.svg)](https://snyk.io/test/github/gouch/to-title-case)

The repository contains a module that converts a string to title case using a set of rules based on the most common styles guides and English language conventions. The module provides a toTitleCase() method that can be used on any string to convert it to title case.

the [demo page](https://codepen.io/danielhaim/pen/oNPGzKw) only shows default option (AP style) and Chicago style for now.

## Features
- Supports the most common English language conventions and style guides, including AP, APA, Chicago, NY Times, Wikipedia, and British, as well as a custom style.
- Customizable options for article words, conjunctions, prepositions, and words that should never be capitalized.
- Ignores certain words and phrases that should not be capitalized in titles.
- Handles hyphenated words and capitalization of Roman numerals.
- Includes a list of unique words that should always be capitalized in titles.
- Corrects certain common terms to their correct casing.

## Installation

```bash
npm install titlecase-js
```

## CLI

```bash
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
- `validateOption`: validates if an option is an array and if its elements are all strings.
- `validateOptions`: validates if an object's keys correspond to valid options and if their values are valid.
- `getTitleCaseOptions`: returns an object containing the options for converting a word to title case.
- `isShortConjunction`: determines whether a word is a short conjunction.
- `isArticle`: determines whether a word is an article.
- `isShortPreposition`: determines whether a word is a short preposition.
- `isNeverCapitalized`: determines whether a word should never be capitalized in title case.
- `hasNumbersInWord`: determines whether a word contains a number.
- `hasMultipleUppercaseLetters`: determines whether a word has two or more consecutive uppercase letters.
- `hasIntentionalUppercase`: determines whether a word intentionally uses uppercase letters.
- `hasHyphen`: determines whether a word contains a hyphen.
- `startsWithHashtag`: determines whether a word starts with a hashtag (#).
- `startsWithAtSymbol`: determines whether a word starts with an at symbol (@).
- `endsWithSymbol`: determines whether a word ends with a symbol.
- `capitalizeWord`: capitalizes the first letter of a word.
- `isFirst`: determines whether a word is the first word in an array.
- `isLast`: determines whether a word is the last word in an array.
- `isFirstOrLast`: determines whether a word is either the first or last word in an array.
- `isRomanNumeral`: determines whether a word is a Roman numeral.
- `hasHyphenRomanNumeral`: determines whether a hyphenated word contains a Roman numeral.
- `isWordIgnored`: determines whether a word is in a list of ignored words.
- `isWordInArray`: determines whether a word is in an array.
- `getUniqueCapitalizedWord`: returns a capitalized unique word.
- `correctTerm`: corrects a term to its proper spelling.
- `isIncorrectTerm`: determines whether a word is not spelled correctly.
- `isPhraseIgnored`: determines whether a phrase is in a list of ignored phrases.
- `processHyphenatedWord`: processes a hyphenated word to be converted to title case.
- `String.prototype.toTitleCase`: converts a string to title case based on the options passed to it.

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
"JQuery Plugins for Front-End Developers: A Comprehensive Guide".toTitleCase({ style: 'apa' });
// converts JQuery to jQuery, even if it's the first word, 
// replaces Front-End with Frontend (see correctCapitalization)
```

## Tests
```bash
npm test
```

```bash
  String.prototype.toTitleCase
    ✓ throws TypeError if input is not a string (2 ms)
    ✓ throws TypeError if options is not an object (1 ms)
    ✓ AP style (1 ms)
    ✓ Chicago style (1 ms)
    ✓ APA style (1 ms)
    ✓ NYT style (2 ms)
    ✓ Wikipedia style
    ✓ Reserved keyword (jQuery, Frontend) (1 ms)
    ✓ Reserved keyword, correct capitalization (Back-End > Backend) (1 ms)
    ✓ Complex title with various formatting (1 ms)
    ✓ Colonization of mars with mixed case and possessive (2 ms)
    ✓ Cryptocurrencies with all caps and ampersand
    ✓ Technology and mental health with question mark and quotes (1 ms)
    ✓ Fashion with acronym and hyphen (1 ms)
    ✓ Nutrition with colon and apostrophe
    ✓ Correct capitalization for special terms (1 ms)
    ✓ Correct capitalization for special terms

Test Suites: 1 passed, 1 total
Tests:       17 passed, 17 total
Snapshots:   0 total
Time:        0.636 s
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