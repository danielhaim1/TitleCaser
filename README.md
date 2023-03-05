## toTitleCase()
Converts a string to title case APA style

- [APA Grammar Guidelines](https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case). 

```
npm i apa-title-case
```


```javascript
String.prototype.toTitleCase(style, options);
```

## Parameters
- `shortConjunctions`
- `articles`
- `shortPrepositions`
- `neverCapitalized`

### Return value
A new string with the original string converted to title case.

### Examples

```javascript
const input = "the quick brown fox jumps over the lazy dog";
const output = input.toTitleCase(); // "The Quick Brown Fox Jumps Over the Lazy Dog"
```

```javascript
const input = "to be or not to be";
const output = input.toTitleCase(); // "To Be or Not to Be"
```

```javascript
const input = "the name of the musical is The Musical";
const output = input.toTitleCase( { neverCapitalized: ["The Musical"] }); // "The Name of the Musical Is The Musical"
```


## Test

```
npm test

✓ capitalizes the first letter of each word by default (1 ms)
✓ uppercase the first word in the title
✓ checks hyphenated words and last words (1 ms)
✓ checks if the first word is capitalized
✓ checks for small words in the string
✓ check for options
✓ handles empty strings
```

### Notes

1. The `toTitleCase()` function supports multi-word small words and hyphenated words. It also correctly handles non-ASCII characters.
2. The function uses memoization to cache the capitalized version of each word, which can greatly improve performance when the same words appear multiple times in the input string.
3. The function also includes several optimizations to avoid unnecessary work when checking for ignored words, intentionally uppercase words, URLs, hashtags, and handles.