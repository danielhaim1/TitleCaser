## toTitleCase()
### Converts a string to title case

[![npm version](https://badge.fury.io/js/titlecase-js.svg)](https://badge.fury.io/js/titlecase-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dt/titlecase-js.svg)](https://www.npmjs.com/package/titlecase-js)
[![Known Vulnerabilities](https://snyk.io/test/github/gouch/to-title-case/badge.svg)](https://snyk.io/test/github/gouch/to-title-case)

The repository contains a module that converts a string to title case using a set of rules based on the most common styles, guides, and English language conventions. 

The module provides a `toTitleCase()` method that can be used on any string to convert it to title case.

The [demo page](https://codepen.io/danielhaim/pen/oNPGzKw) shows two default options (AP, Chicago) for now, with word replacement and custom options.

## Key Features:
- Supports popular English language conventions and style guides, such as AP, APA, Chicago, NY Times, Wikipedia, and British, along with a customizable style option.
- Allows customization of article words, conjunctions, prepositions, and words that should not be capitalized.
- Excludes specific words and phrases that should not be capitalized in titles.
- Handles hyphenated words and capitalization of Roman numerals correctly.
- Includes a list of unique words that should always be capitalized in titles, along with a set of common terms that require capitalization.
- Corrects common terms to their proper case.
- Offers a CLI for easy building, testing, and minification of the module.
- Provides pre-defined word lists for articles, conjunctions, prepositions, and words that should not be capitalized in titles.
- Maintains a list of common phrases that should not be capitalized in titles.

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
- `style` (String): The style of title case to apply. Allowed values are `'ap'`, `'apa'`, `'british'`, `'chicago'`, `'nyt'`, and `'wikipedia'`
- `articles`: words to be treated as articles in title case
- `shortConjunctions`: words to be treated as short conjunctions in title case
- `shortPrepositions`: words to be treated as short prepositions in title case
- `neverCapitalized`: words to never capitalize in title case
- `REPLACE_TERMS`: a map of terms to replace in title case

### API Examples:

```javascript
const options = {
  style: "ap",
  articles: ["the", "an", "a"],
  shortConjunctions: ["and", "but", "or", "for", "nor", "yet", "so"],
  shortPrepositions: ["in", "on", "at", "by", "to", "up", "as", "of", "off"],
  neverCapitalized: ["and", "or", "but", "nor", "a", "an", "the", "as", "at", "by", "for", "in", "of", "on", "to", "up", "yet", "so"],
};

const string = "jquery plugins for frontend developers: a comprehensive guide";
string.toTitleCase(options);
// jQuery Plugins for Frontend Developers: A Comprehensive Guide
```

```javascript
const myTerms = ["Google", "VMware"];
const myString = "goOgle and VMWARE ";
myString.toTitleCase({ style: "ap", REPLACE_TERMS: myTerms });
// "Google and VMware"
```

```javascript
const input = "the business of ransomware: a study of raas marketplaces and their impact on cybersecurity";
input.toTitleCase(); 
// "The Business of Ransomware: A Study of RaaS Marketplaces and Their Impact on Cybersecurity"
```

```javascript
const myString = "to be or not to be";
input.toTitleCase();
// "To Be or Not to Be"
```

```javascript
const myString = "the name of the musical is The Musical";
myString.toTitleCase( { neverCapitalized: ["The Musical"] });
// "The Name of the Musical Is The Musical"
```

```javascript
const myString = "a comprehensive guide to a/b testing with github actions: best practices for optimizing your website!";
myString.toTitleCase({ style: "chicago" });
// "A Comprehensive Guide to A/B Testing with GitHub Actions: Best Practices for Optimizing Your Website!"
```

```javascript
const myString = "JQuEry Plugins for Front-End Developers: A Comprehensive Guide";
myString.toTitleCase({ style: 'apa' }); 
// jQuery Plugins for Frontend Developers: A Comprehensive Guide
```

## Tests

```bash
$ npm run test
```

```bash
    ✓ throws TypeError if input is not a string (3 ms)
    ✓ throws TypeError if options is not an object
    ✓ Convert string to title case with AP style formatting, including hyphenated words, word and brand replacement (28 ms)
    ✓ Convert string to title case with Chicago style formatting, including hyphenated words, word and brand replacement (10 ms)
    ✓ Convert string to title case with AP style formatting, including custom term replacement for Google and VMware (7 ms)
    ✓ Convert string to title case with AP style formatting, including a possessive noun and a colon (8 ms)
    ✓ Convert string to title case with AP style formatting, including lowercase back-end and front-end terms (2 ms)
    ✓ Convert string to title case with Chicago style formatting, including a comparison and a colon (11 ms)
    ✓ Convert string to title case with APA style formatting, including a colon (12 ms)
    ✓ Convert string to title case with Wikipedia style formatting, including acronym and hyphen (10 ms)
    ✓ Convert string to title case with APA style formatting, including colon and apostrophe (10 ms)
    ✓ Convert string to title case with Chicago style formatting, including special terms such as node.js (9 ms)
    ✓ AP Style capitalization test with special terms eBook and CTO and a colon (10 ms)
    ✓ NYT style capitalization test with special terms IoT and AI and a colon (12 ms)
    ✓ APA Style Capitalization Test with a Colon and Short Conjunction Terms (Instagram, TikTok, and Snapchat) (14 ms)
    ✓ Wikipedia style capitalization test with special term DevOps and a colon (11 ms)
    ✓ Chicago Style capitalization test with custom term replacement for GooGlE to Google and a comparison with a colon (6 ms)
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