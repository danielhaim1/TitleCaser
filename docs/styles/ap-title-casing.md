---

layout: default

title: AP Title Casing - TitleCaser.js

description: Reference documentation for AP title casing of composition titles, including verified AP guidance, documented behavior, rule precedence, implementation details, and edge cases.

---

# AP Title Casing

This document defines TitleCaser's AP title-casing behavior for composition titles. It distinguishes AP-derived rules from TitleCaser policy where the AP Stylebook does not prescribe a specific outcome.

## Scope and Sources

AP composition-title rules apply to works such as books, films, plays, poems, albums, songs, radio and television programs, lectures, speeches, and works of art. TitleCaser also applies these rules to modern titles such as reports, papers, presentations, and podcasts as a project policy.

AP news headlines generally use sentence case. This document concerns composition titles, not news-headline casing.

### Confidence Levels

- `AP Stylebook verified`: Confirmed against the AP Stylebook's composition-title guidance.
- `Secondary-source verified`: Confirmed by a reputable AP-derived reference; verify against the current Stylebook before treating it as normative.
- `TitleCaser policy`: A documented product decision for behavior not fully specified by AP.

## Rule Precedence

TitleCaser first classifies tokens, then resolves conflicts using the precedence order below. A lower-precedence rule must not override a higher-precedence rule.

### Classification

Before capitalization, TitleCaser identifies unambiguous protected tokens, exact phrases, canonical terms, and ambiguous dotted tokens. Classification is necessary because `node.js` may be a package name while `example.js` may be a domain.

### Level 1: Opaque Tokens

Unambiguous tokens are preserved exactly and are not processed by grammar rules.

- Protocol URLs and `www` URLs
- Bare domains with recognized TLDs
- Email addresses
- Explicit paths and inline-code spans
- Explicitly protected spans

This is a `TitleCaser policy`.

### Level 2: Exact Overrides

User-defined phrase and term replacements win over all lower-precedence rules.

Examples: `AT&T`, `T-Mobile`, `The Home Depot`.

This is a `TitleCaser policy`.

### Level 3: Canonical Terms

Known official casing is applied to brands, products, programming languages, frameworks, acronyms, initialisms, and proper nouns.

Examples: `JavaScript`, `TypeScript`, `Node.js`, `OpenAI`, `GitHub`, `NASA`.

This is a `TitleCaser policy` backed by curated canonical-term data.

### Level 4: Optional User Intent

When enabled, explicitly supplied capitalization may be preserved for unknown words that do not conflict with higher-precedence rules. This never overrides opaque tokens, exact overrides, or canonical terms.

This is a `TitleCaser policy`.

### Level 5: Structural Boundaries

Structural rules establish title boundaries before grammar rules apply.

- First and last word of a title
- First word of a subtitle after a colon
- First word of a quoted or parenthetical subphrase
- Hyphenated and slash-separated compounds

The first and last-word rule is `AP Stylebook verified`; the remaining boundary behavior is `TitleCaser policy` unless separately noted below.

### Level 6: Grammar Rules

Style-specific rules determine the default capitalization of non-protected words. This is where AP, Chicago, APA, NYT, and Wikipedia differ.

### Level 7: Project-Specific Heuristics

Heuristics may handle ambiguous compounds, emerging brands, or unknown technical terms. They must never override a higher-precedence rule.

This is a `TitleCaser policy`.

## Core AP Rules

### Always Capitalize

Capitalize the first and last word of a title, regardless of part of speech. Capitalize nouns, pronouns, verbs, adjectives, adverbs, and subordinating conjunctions.

Examples:

```text
The Lord of the Rings
War and Peace
What We Know
How Things Work
If You Build It, They Will Come
As We Were
A Guide That Works
Better Than Expected
```

Subordinating conjunctions are principal words, not minor words. This includes short forms such as `As`, `If`, `Than`, and `That`.

Confidence: `Secondary-source verified`.

### Prepositions and Coordinating Conjunctions

Lowercase articles and coordinating conjunctions unless they are the first or last word. Lowercase prepositions of three letters or fewer unless they are the first or last word. Capitalize prepositions with four or more letters.

Minor words include `a`, `an`, `the`, `and`, `but`, `for`, `nor`, `or`, `so`, `yet`, `at`, `by`, `in`, `of`, `off`, `on`, `out`, `per`, `to`, `up`, and `via`.

Examples:

```text
The History of Rome
War and Peace
Development With Node.js
Journey Into Space
Road to Success
```

Confidence: `AP Stylebook verified`.

### Infinitive To

Capitalize `To` when it begins an infinitive; lowercase it when it is a preposition.

```text
How To Cook
Things To Know
Road to Success
Guide to JavaScript
```

Confidence: `AP Stylebook verified`.

### Phrasal Verbs

Capitalize particles that are part of phrasal verbs because they function with the verb rather than as standalone prepositions.

```text
Sign Up
Log In
Turn Off
Shut Down
Back Up
Check Out
```

Confidence: `Secondary-source verified`.

## Structural Rules

### Subtitles and Punctuation

Punctuation is preserved, but a colon introducing a subtitle creates a capitalization boundary. Capitalize the first word after that colon, even when it is normally minor.

```text
JavaScript: The Complete Guide
A Guide to Testing: A Practical Reference
```

Quoted and parenthetical subphrases are treated as title boundaries by TitleCaser.

```text
"An Example Inside Quotes"
The Rule (A Practical Example)
```

Colon handling is `Secondary-source verified`; quote and parenthesis handling is `TitleCaser policy`.

### Hyphenated Compounds

Apply AP grammar to each element of a compound. Capitalize principal words; keep internal minor words lowercase. For two-part compounds beginning with a minor word, TitleCaser capitalizes the initial element as a compound boundary.

```text
Server-Side Rendering
Well-Known Author
State-of-the-Art Technology
Step-by-Step Guide
In-Depth Guide
Mother-in-Law
```

This is a `TitleCaser policy` informed by AP examples and guidance.

### Slash Compounds

Capitalize each side of a slash when each is a principal word.

```text
Could/Should We Test Before/After Deployment?
```

This is a `TitleCaser policy`.

## Proper Names and Protected Terms

Use canonical casing for proper nouns, brands, trademarks, acronyms, and initialisms where it is known.

```text
JavaScript
WordPress
GitHub
Node.js
Q&A
AT&T
O'Connor
Apple's Buyer's Guide
```

This is a combination of AP's proper-name principle and `TitleCaser policy` for its canonical-term dictionary.

### URLs, Domains, Emails, Paths, and Files

Preserve opaque tokens exactly when they can be identified unambiguously.

```text
https://example.com/docs
example.co.uk
user@example.com
/var/run
package-lock.json
```

Bare domains must use a recognized TLD and must not override a known canonical term such as `Node.js` or `Battle.net`.

This is a `TitleCaser policy`.

## Numbers

Numerals remain unchanged. Spelled-out numbers follow normal title-casing rules. Ordinals, units, ranges, versions, percentages, and Roman numerals require token-aware handling.

```text
10 Ways To Improve Performance
7 Habits of Highly Effective People
The 2nd Guide to Version 3.0
Louis-IV
```

This is a `TitleCaser policy` for token-aware cases beyond ordinary numerals.

## Fixture Metadata

Every data-driven case should record the rule, decisive precedence level, source, and confidence. Supporting rules may also be recorded when structural context contributes to the result.

```json
{
  "style": "ap",
  "input": "node.js development on aws",
  "expected": "Node.js Development on AWS",
  "decisiveRule": "Canonical terms",
  "precedence": 3,
  "supportingRules": ["AP grammar"],
  "source": "Canonical term dictionary",
  "confidence": "verified"
}
```

## Summary

| Rule | Action | Confidence |
| --- | --- | --- |
| First and last word | Capitalize | AP Stylebook verified |
| Principal words | Capitalize | AP Stylebook verified |
| Subordinating conjunctions | Capitalize regardless of length | Secondary-source verified |
| Prepositions with 4+ letters | Capitalize | AP Stylebook verified |
| Infinitive `To` | Capitalize | AP Stylebook verified |
| Articles, short prepositions, coordinating conjunctions | Lowercase unless first or last | AP Stylebook verified |
| Colon subtitle boundary | Capitalize first subtitle word | Secondary-source verified |
| Quotes, parentheses, hyphens, slashes | Apply documented TitleCaser policy | TitleCaser policy |
| Protected tokens and canonical terms | Preserve or normalize before grammar | TitleCaser policy |
