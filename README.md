## toTitleCase()
Converts a string to title case APA style

- [APA Grammar Guidelines](https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case).

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

### Notes

1. The `toTitleCase()` function supports multi-word small words and hyphenated words. It also correctly handles non-ASCII characters.
2. The function uses memoization to cache the capitalized version of each word, which can greatly improve performance when the same words appear multiple times in the input string.
3. The function also includes several optimizations to avoid unnecessary work when checking for ignored words, intentionally uppercase words, URLs, hashtags, and handles.