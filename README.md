# TitleCaser

[![npm version](https://img.shields.io/npm/v/@danielhaim/titlecaser)](https://www.npmjs.com/package/@danielhaim/titlecaser)
[![Downloads](https://img.shields.io/npm/dt/@danielhaim/titlecaser.svg)](https://www.npmjs.com/package/@danielhaim/titlecaser)
![GitHub](https://img.shields.io/github/license/danielhaim1/titlecaser)

A style-guide–aware title case engine for JavaScript that implements **AP**, **APA**, **Chicago**, **NYT**, **Wikipedia**, and **British** styles with contextual acronym disambiguation and 1,000+ curated domain terms.

<a target="_blank" href="https://danielhaim1.github.io/TitleCaser/"><img src="https://raw.githubusercontent.com/danielhaim1/TitleCaser/main/docs/assets/demo.png" width="100%" height="auto" alt="TitleCaser Demo"></a>

---

## Links

- [Demo](https://danielhaim1.github.io/TitleCaser/)
- [CodePen Demo 1](https://codepen.io/danielhaim/pen/oNQgjBv)
- [CodePen Demo 2](https://codepen.io/danielhaim/pen/oNPGzKw)
- [Contributing](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)
- [License](LICENSE)

---

## Introduction

TitleCaser is a deterministic, style-guide–aware title casing engine built for production publishing systems. It implements major editorial standards with rule-driven capitalization logic, including acronym disambiguation, hyphenated compounds, possessives, punctuation sensitivity, and curated domain-specific term normalization across finance, marketing, academia, military, and technology.

Its multi-pass processing architecture ensures consistent output while supporting custom word overrides, exact phrase preservation, brand enforcement, and controlled vocabulary rules. Designed for both Node.js and browser environments, TitleCaser integrates cleanly into CMS pipelines, build systems, and automated content workflows where precision and repeatability are required.

---

## Key Features

### Multi-Style Editorial Engine
Built-in rule systems for **AP**, **APA**, **Chicago**, **NYT**, **Wikipedia** (sentence case), and **British** styles. Each style applies its own logic for minor words, hyphenated compounds, possessives, colon capitalization, and acronym handling, producing deterministic and repeatable output.

### Contextual Acronym & Pronoun Disambiguation
Distinguishes regional acronyms from identical lowercase words using positional and surrounding-word heuristics.

For example:

```javascript
"It’s up to us in the US military to decide."
→ "It’s Up to Us in the US Military to Decide."

"us-uk-led coalition"
→ "US-UK-Led Coalition"
```

- Supports US, UK, EU, USA (dotted and undotted forms)
- Handles hyphenated compounds (US-Backed, US-UK-Led)
- Works in parenthetical and comma-separated contexts
- Detects end-of-sentence acronyms
- Avoids false positives inside longer words

### Structured Vocabulary Normalization
Includes **1,000+ curated terms** across brands, technology, geography, business, marketing, defense, academia, finance, and legal domains.

- Mixed-case normalization (`GOOGle → Google`)
- Intentional lowercase brands (`iPhone`, `eBay`)
- Roman numerals (`Louis-IV`)
- Unicode names (`Škoda`)
- Possessive handling (`GOOGle's tensorflow → Google's TensorFlow`)
- Runtime custom term overrides
- Exact phrase replacements

### Advanced Hyphenation & Compound Handling
Intelligent processing of hyphenated compounds with style-specific rules:

- Multi-hyphen compounds (`US-UK-Led Coalition`)
- Style-specific compound rules (AP vs Chicago)
- En dash and em dash normalization
- Acronym-first compound logic
- Roman numerals inside compounds
- Brand casing preservation inside compounds

### Multi-Pass Deterministic Processing
Layered multi-pass processing for stable handling of complex inputs:

- Input normalization (spacing and `<br>` handling)
- Style-aware casing pass
- Acronym resolution pass
- Short-word correction pass
- Final contextual correction pass
- Optional smart quote conversion
- Exact phrase override pass

### HTML-Safe & CMS-Ready
Designed for integration into publishing workflows, CMS pipelines, and automated content systems.

- Preserves `<br>` tags
- Normalizes spacing around colon + `<br>`
- Retains ampersands and symbols
- Handles excessive whitespace safely

### Runtime & Build Support
The AMD/browser build extends `String.prototype.toTitleCase()` for direct string usage in client environments.

- Node.js (ES modules)
- Browser (prototype extension via AMD build)
- AMD distribution build
- CLI build and test scripts

---

## Quick Start

```bash
npm install @danielhaim/titlecaser
```

```javascript
import { TitleCaser } from '@danielhaim/titlecaser';

const titleCaser = new TitleCaser({ style: 'ap' });

titleCaser.toTitleCase('the quick brown fox'); // → "The Quick Brown Fox"
titleCaser.toTitleCase('nodejs development on aws'); // → "Node.js Development on AWS"
titleCaser.toTitleCase('let us know about the us military'); // → "Let Us Know About the US Military"
```

---

## Core Usage

### Editorial-Grade Transformation (AP Example)
Handles brand normalization, acronyms, hyphenation, possessives, and colon rules:

```javascript
import { TitleCaser } from '@danielhaim/titlecaser';

const titleCaser = new TitleCaser({ style: 'ap' });

titleCaser.toTitleCase(
  "nodejs development on aws: an in-depth tutorial on server-side javascript deployment"
); // → "Node.js Development on AWS: An In-depth Tutorial on Server-side JavaScript Deployment"
```

### Custom Term Normalization
```javascript
titleCaser.addReplaceTerm('js', 'JavaScript');
titleCaser.toTitleCase('js development'); // → "JavaScript Development"
```

### Exact Phrase Replacement
```javascript
titleCaser.addExactPhraseReplacements([
  { 'the correct phrase': 'The Correct Phrase' }
]);

titleCaser.toTitleCase('this is the correct phrase'); // → "This Is The Correct Phrase"
```

### Smart Quotes
```javascript
const tc = new TitleCaser({
  style: 'ap',
  smartQuotes: true
});

tc.toTitleCase('"never underestimate the power o\' persistence,"'); // → “Never Underestimate the Power O’ Persistence,”
```

### Browser Usage
```html
<script src="./path/to/TitleCaser.amd.js"></script>
```

```javascript
const output = "the future of devops: the next era"
  .toTitleCase({ style: 'apa' });

console.log(output); // → "The Future of DevOps: The Next Era"
```

### Real-World DOM Example
Automatically normalize editorial headings in a publishing workflow:

```html
<h2>nodejs development on aws: an in-depth tutorial on server-side javascript deployment</h2>
<h2>the iphone's impact on modern communication: a sociolinguistic analysis</h2>
<h2>back-end and front-end</h2>
```
```javascript
function applyTitleCaseToH2Elements(options = { style: "apa" }) {
  const h2Elements = document.querySelectorAll("h2");

  h2Elements.forEach((h2) => {
    h2.innerHTML = h2.innerHTML.toTitleCase(options);
  });
}

applyTitleCaseToH2Elements();
```

---

## API Reference
### Constructor
```javascript
new TitleCaser(options)
```

### Options

| Option                 | Type        | Default | Description |
|------------------------|------------|---------|-------------|
| `style`                | string     | `'ap'`  | Editorial style: `'ap' \| 'apa' \| 'chicago' \| 'nyt' \| 'wikipedia' \| 'british'` |
| `smartQuotes`          | boolean    | `false` | Converts straight quotes (`' "`) to typographic curly quotes |
| `neverCapitalize`      | string[]   | `[]`    | Additional words that should remain lowercase (merged with style defaults) |
| `wordReplacementsList` | object[]   | internal defaults | Array of `{ 'term': 'replacement' }` objects used for term normalization |
| `debug`                | boolean    | `false` | Enables internal warning logs during processing |

### Methods

#### toTitleCase(text)
```javascript
titleCaser.toTitleCase('hello world'); // → "Hello World"
```

#### addReplaceTerm(term, replacement)
```javascript
titleCaser.addReplaceTerm('js', 'JavaScript');
```

#### removeReplaceTerm(term)
```javascript
titleCaser.removeReplaceTerm('js');
```

#### setReplaceTerms(terms)
```javascript
titleCaser.setReplaceTerms([
  { 'js': 'JavaScript' },
  { 'aws': 'AWS' }
]);
```

#### addExactPhraseReplacements(phrases)
```javascript
titleCaser.addExactPhraseReplacements([
  { 'the correct phrase': 'The Correct Phrase' },
  { 'another phrase': 'Another Phrase' }
]);
```

#### setStyle(style)
```javascript
titleCaser.setStyle('chicago');
```

---

## Test Coverage

```bash
npm run test
```

- Extensive unit test coverage
- Cross-style validation (AP, Chicago, APA, NYT, Wikipedia)
- Acronym disambiguation edge cases
- Hyphenation edge cases
- Brand normalization

---

## Resources

Useful materials for improving your knowledge of writing and language style guides. These resources include various books and manuals, such as the Publication Manual of the American Psychological Association, the Chicago Manual of Style, and the AP Stylebook, which are widely recognized as authoritative sources on grammar, punctuation, and capitalization rules.

- [AP Stylebook, 56th Edition](https://store.stylebooks.com/ap-stylebook-56th-edition-print.html)
- [Publication Manual of the American Psychological Association, Seventh Edition (2020)](https://apastyle.apa.org/products/publication-manual-7th-edition)
- [Chicago Manual of Style: Capitalization](https://www.chicagomanualofstyle.org/book/ed17/part2/ch08/psec022.html)
- [The Bluebook: A Uniform System of Citation. 21st ed. Cambridge: Harvard Law Review Association, 2020](https://open.mitchellhamline.edu/cgi/viewcontent.cgi?article=2782&context=wmlr)
- [The Chicago Manual of Style, 17th Edition](https://press.uchicago.edu/ucp/books/book/chicago/C/bo25956703.html)
- [The New York Times Manual of Style and Usage](https://www.worldcat.org/title/946964415)
- [Wikipedia: Letter case](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Capital_letters)
- [Wikipedia:Manual of Style/Titles of works](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Titles_of_works#Capital_letters)

---

## Report Bugs

If you encounter any bugs or issues while using the library or the demo page, please report them by opening a new issue in the repository's issue tracker. 

When reporting a bug, please provide as much detail as possible, including the steps to reproduce the issue and any error messages that you see. I appreciate any contribution to improving this library.

---

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

---

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.
