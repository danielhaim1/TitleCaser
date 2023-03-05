## toTitleCase()

Converts a string to title case APA (default) or Chicago style
 
`apa-title-case` is a Node.js package that converts a string to APA or Chicago-style title case. APA follows the first letter of each major word capitalized while Chicago capitalizes every word except for short conjunctions and prepositions.

## Installation

You can install `title-case` using npm:

```bash
npm install apa-title-case
```

Alternatively, you can also install it using yarn:

```yarn
yarn add apa-title-case
```

After installing the package, you can use it in your code by importing it:

```javascript
const toTitleCase = require('apa-title-case');
```

Or if you're using ES6 syntax:

```javascript
import { toTitleCase } from 'apa-title-case';
```

```javascript
String.prototype.toTitleCase(style, options);
```

## Parameters
- `shortConjunctions`: An array of short conjunctions that should not be capitalized, such as "and", "but", and "if"
- `articles`: An array of articles that should not be capitalized, such as "a", "an", and "the".
- `shortPrepositions`: An array of short prepositions that should not be capitalized, such as "of", "to", and "by".
- `neverCapitalized`: An array of words that should never be capitalized, such as "etc.", "i.e.", and "vs.".

### Return value
A new string with the original string converted to title case.

### Examples

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

## Tests

```bash
npm test
```

```bash
  String.prototype.toTitleCase
    ✓ throws TypeError if input is not a string (3 ms)
    ✓ throws TypeError if options is not an object (3 ms)
    ✓ capitalizes the first letter of each word in a sentence
    ✓ capitalizes the first letter of the first word in a sentence (2 ms)
    ✓ handles hyphenated words and last words in a sentence
    ✓ capitalizes the first word of a sentence
    ✓ capitalizes all significant words in a sentence
    ✓ excludes specific words from capitalization
    ✓ capitalizes significant words with Chicago style
    ✓ does not modify already capitalized words (1 ms)
    ✓ returns an empty string for empty input

Test Suites: 1 passed, 1 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        0.134 s, estimated 1 s
```

## Resources

- [APA Style Grammar Guidelines: Capitalization](https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case)
- [Chicago Manual of Style: Capitalization](https://chat.openai.com/chat/643828ec-d4b5-4f21-b035-62946dd2cec3#:~:text=Chicago%20Manual%20of%20Style%3A%20Capitalization)
- [Wikipedia: Letter case](https://chat.openai.com/chat/643828ec-d4b5-4f21-b035-62946dd2cec3#:~:text=Wikipedia%3A%20Letter%20case)
- [Grammarly Handbook: Title Case](https://www.grammarly.com/blog/title-case/) - an overview of title case and its rules
- [Title Capitalization Rules for Writers](https://www.scribendi.com/advice/title_capitalization_rules.en.html) - a guide to title case with examples and exceptions.

### Notes

- The toTitleCase() function correctly capitalizes the first letter of each word in a string, while handling various exceptions and rules.
- The function supports several optional configuration options, such as specifying words that should never be capitalized, short conjunctions that should not be capitalized, and short prepositions that should not be capitalized.
- The function also supports two style options: APA style and Chicago style.
- The function is optimized to improve performance by memoizing capitalized versions of words and avoiding unnecessary work when checking for ignored words, intentionally uppercase words, URLs, hashtags, and handles.
- The function correctly handles multi-word small words and hyphenated words, as well as non-ASCII characters.
- The function includes unit tests to ensure proper functionality and prevent regressions.