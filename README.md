## TitleCase-JS
### Converts a string to title case

[![npm version](https://badge.fury.io/js/titlecase-js.svg)](https://badge.fury.io/js/titlecase-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dt/titlecase-js.svg)](https://www.npmjs.com/package/titlecase-js)
[![Known Vulnerabilities](https://snyk.io/test/github/gouch/to-title-case/badge.svg)](https://snyk.io/test/github/gouch/to-title-case)

This module provides extensive support for adhering to popular English language conventions and style guides, including AP, APA, Chicago, NY Times, Wikipedia, and British styles. It also offers a customizable style option.

Users can customize article words, conjunctions, prepositions, and words that should not be capitalized, and the module excludes specific words and phrases that should not be capitalized in titles.

Moreover, the module correctly handles various aspects of capitalization, including hyphenated words, suffixes, prefixes, reserved words, and Roman numerals.

Additionally, the module includes a list of unique arrays that should always be title cased in titles, and a set of common terms that require capitalization. It also corrects common terms to their proper case, and provides a CLI for easy building, testing, and minification of the module.

See the module in action in the [demo page](https://codepen.io/danielhaim/pen/oNPGzKw).

## Key Features:

The modules provides the following features for users writing in the English language:

- It conforms to widely recognized style guides, including AP, APA, Chicago, NY Times, Wikipedia, and British, while also allowing for customization of style.
- It provides customization options for article words, conjunctions, prepositions, and words that should not be capitalized.
- The module accurately handles suffixes, prefixes, hyphenated words, and reserved words.
- It excludes specific words and phrases that should not be capitalized in titles, and also handles the capitalization of hyphenated words and Roman numerals.
- It includes a list of unique words that must always be capitalized in titles, as well as a set of common terms that require capitalization.
- The module corrects common terms to their proper case.
- A command-line interface is available for easy building, testing, and minification of the module.
- Pre-defined word lists for articles, conjunctions, prepositions, and words that should not be capitalized in titles are provided.
- The module maintains a list of common phrases that should not be capitalized in titles.

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
const options = {
    style: "ap",
    articles: ["the", "an", "a"],
    shortConjunctions: ["and", "but", "or", "for", "nor", "yet", "so"],
    shortPrepositions: ["in", "on", "at", "by", "to", "up", "as", "of", "off"],
    neverCapitalized: ["and", "or", "but", "nor", "a", "an", "the", "as", "at", "by", "for", "in", "of", "on", "to", "up", "yet", "so"],
};

const input = "JQUery plugins for frontend developers: a comprehensive guide";
const output = input.toTitleCase(options);
// jQuery Plugins for Frontend Developers: A Comprehensive Guide
```

```javascript
const correctCasing = ["Google", "VMware"];
const input = "goOgle and VMWARE ";
input.toTitleCase({
    style: "ap",
    replaceCasing: correctCasing
});
// "Google and VMware"
```

```javascript
const input = "the business of ransomware: a study of raas marketplaces and their impact on cybersecurity";
input.toTitleCase(); 
// "The Business of Ransomware: A Study of RaaS Marketplaces and Their Impact on Cybersecurity"
```

```javascript
const input = "to be or not to be";
const output = input.toTitleCase();
// "To Be or Not to Be"
```

```javascript
const input = "the name of the musical is The Musical";
input.toTitleCase({
    neverCapitalized: ["The Musical"]
});
// "The Name of the Musical Is The Musical"
```

```javascript
const input = "a comprehensive guide to a/b testing with github actions: best practices for optimizing your website!";
input.toTitleCase({
    style: "chicago"
});
// "A Comprehensive Guide to A/B Testing with GitHub Actions: Best Practices for Optimizing Your Website!"
```

```javascript
const input = "JQuEry Plugins for Front-End Developers: A Comprehensive Guide";
input.toTitleCase({
    style: 'apa'
});
// jQuery Plugins for Frontend Developers: A Comprehensive Guide
```

## Tests

```bash
$ npm run test
```

```bash
    ✓ throws TypeError if input is not a string (2 ms)
    ✓ throws TypeError if options is not an object (1 ms)
    ✓ Convert string to title case with AP style formatting, including hyphenated words, word and brand replacement (2 ms)
    ✓ Convert string to title case with Chicago style formatting, including hyphenated words, word and brand replacement
    ✓ Convert string to title case with AP style formatting, including custom term replacement for Google and VMware (1 ms)
    ✓ Convert string to title case with AP style formatting, including a possessive noun and a colon (3 ms)
    ✓ Convert string to title case with AP style formatting, including lowercase back-end and front-end terms
    ✓ Convert string to title case with Chicago style formatting, including a comparison and a colon (1 ms)
    ✓ Convert string to title case with APA style formatting, including a colon
    ✓ Convert string to title case with Wikipedia style formatting, including acronym and hyphen (1 ms)
    ✓ Convert string to title case with APA style formatting, including colon and apostrophe
    ✓ Convert string to title case with Chicago style formatting, including special terms such as node.js
    ✓ AP Style capitalization test with special terms eBook and CTO and a colon
    ✓ NYT style capitalization test with special terms IoT and AI and a colon (1 ms)
    ✓ APA Style Capitalization Test with a Colon and Short Conjunction Terms (Instagram, TikTok, and Snapchat)
    ✓ Wikipedia style capitalization test with special term DevOps and a colon (1 ms)
    ✓ Chicago Style capitalization test with custom term replacement for GooGlE to Google and a comparison with a colon
    ✓ GOOgle -> Google
    ✓ GOOgle's -> Google's
    ✓ GOOgle-Tensorflow -> Google-TensorFlow
    ✓ GOOGle's-Tensorflow -> Google's-TensorFlow
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