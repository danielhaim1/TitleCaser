# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### [1.8.0] (2026-07-05)

#### Added
- Added `TitleCaserConfig`, `createTitleCaserConfig`, and `TITLE_CASER_CONFIG_DEFAULTS` for reusable validated configuration.
- Added runtime configuration options for `dictionaryProfile`, `normalizeQuotes`, `minTitleChars`, `maxTitleChars`, `allowEmojis`, `allowSpecialCharacters`, `phraseReplacementList`, and security policy controls.
- Added defensive input validation for script tags, inline HTML event handlers, unsafe control characters, bidi controls, zero-width characters, emoji handling, special characters, and allowed HTML tags.
- Added dictionary-backed support data for English profiles, including names, family names, curated brands/media entities, geography terms, acronyms, and WordNet-derived dictionary profiles.
- Added Wikipedia sentence-case entity scoring to better distinguish ordinary article-led phrases from names, brands, media entities, and proper phrases.
- Added dictionary-backed handling for Issue #20, preserving recognized or likely proper names such as `Donald Duck` while still lowercasing ordinary Wikipedia sentence-case words.
- Added detector utilities for language/alphabet-aware text checks and UTF-8-oriented validation support.
- Added new curated entities including `Apple Music`, `Snow Crash`, and `The Lincoln Project`.
- Added profile-specific package entry points for `@danielhaim/titlecaser/lite` and `/full`.
- Added profile-focused test helpers and coverage for comparing `lite` and `full` dictionary behavior.

#### Changed
- Reorganized source data into structured `src/data/*` folders for acronyms, dictionary profiles, geography, names, and domain terms.
- Split the large utility surface into structured `src/utils/*` extension modules while preserving the existing `TitleCaserUtils` API.
- Reorganized curated term data into clearer domain files for academic/time, business/finance/legal, ecommerce/digital, marketing/digital, military/defense, specialized/general, and technology/computing terms.
- Updated Wikipedia mode to preserve known media brands and person-name phrases while still lowercasing ordinary words in sentence case.
- Improved phrase replacement ordering and safer replacement boundaries for multi-word proper phrases.
- Simplified dictionary profile handling to the two supported public profiles: `lite` and `full`.
- Updated dictionary profile packaging so profile-specific imports compile with only the selected dictionary data instead of always bundling every profile.
- Removed duplicate root `dist/titlecaser.*.js` bundle output; the root package export now points to the `full` dist build.

#### Fixed
- Fixed Wikipedia mode lowercasing of known person-name phrases such as `Donald Duck`, `John Smith`, and international/apostrophized names.
- Fixed accidental capitalization preservation for ordinary Wikipedia sentence-case phrases such as `The Public Event`, `The Local Artist`, and `The Payment System`.
- Fixed media brand handling for `Fox News`, `CNN International`, `BBC News`, `Sky News`, and related media entities.
- Fixed regional acronym/pronoun stability regressions involving `US`, `UK`, `USA`, and pronoun `us`.
- Fixed HTML `<br>` casing so tags remain lowercase and spacing remains normalized around colon breaks.
- Fixed casing preservation for name tokens such as `McFly` without hardcoding single test scenarios.

#### Tests
- Split style coverage into dedicated AP, APA, Chicago, NYT, and Wikipedia test files.
- Added utility-focused tests for options, words, casing, acronyms, punctuation, quotes, elisions, replacements, validation, detectors, and dictionary helpers.
- Added hygiene tests for runtime config validation and security controls.
- Added cross-style name heuristic tests.
- Added rare noun trap tests across all supported styles to guard dictionary pruning and Wikipedia entity detection.
- Added built-bundle profile parity tests to verify `lite` and `full` match outside Wikipedia and document expected Wikipedia-only divergence.
- Expanded TypeScript definition coverage for the new configuration and runtime options.

### [1.7.13] (2026-02-14)
- **Breaking (TypeScript only):** Standardized option naming from `replaceTermList` to `wordReplacementsList` across all files for consistency
  - Updated `index.d.ts` TypeScript definitions
  - Updated `TitleCaser.js` constructor parameter destructuring
  - Updated all internal references in source code
  - Updated TypeScript test files
- Removed non-existent options from TypeScript definitions:
  - Removed `ignoreWords` (use `neverCapitalize` instead)
  - Removed `acronyms` (acronym handling is built-in and not user-configurable)
- Fixed option format documentation in README to show correct object structure: `{ 'term': 'replacement' }`

### Changed
- All references to `replaceTermList` now consistently use `wordReplacementsList` throughout the codebase

## [1.7.12] (2026-02-13)

### Added
- TypeScript test coverage for type definitions
- Missing options to TypeScript definitions: `neverCapitalize`, `wordReplacementsList`, `debug`
- Missing `setStyle` method to TypeScript definitions
- `british` style option to TypeScript definitions

### Changed
- **Breaking:** Renamed exported constants for consistency:
  - `correctTitleCasingList` → `specialTermsList`
  - `commonShortWords` → `shortWordsList`
  - `titleCaseStylesList` → `TITLE_CASE_STYLES`
  - `allowedTitleCaseStylesList` → `allowedStylesList`
  - `titleCaseDefaultOptionsList` → `styleConfigMap`
  - `correctPhraseCasingList` → `phraseReplacementMap`
  - `regionalAcronymPrecedingWords` → `regionalAcronymPrecedingWordsList`
  - `directFollowingIndicatorsRegionalAcronym` → `regionalAcronymFollowingWordsList`
- Standardized naming convention: arrays use `List` suffix, objects use `Map` suffix, constants use `SCREAMING_SNAKE_CASE`
- Optimized cache key generation using string interpolation instead of JSON.stringify (10-100x faster)
- Added documentation for intentional "lost mutations" in multi-pass processing algorithm

### Fixed
- Corrected `validateOption` method implementation
- Fixed TypeScript type definitions for constructor options

## [1.7.6] - 2025-04-10

### Fixed
- Resolved security warnings related to dev dependencies (transitive vulnerabilities) through dependency updates and overrides.
- Hotfix: Corrected an edge case in title casing where certain acronyms and smart quotes were not being transformed as expected.
- Resolved an issue causing inconsistent capitalization in specific phrases.
- Fixed minor bugs related to whitespace handling and punctuation in output.

## [1.7.5] - 2025-04-10

### Added
- New `caseStyle` property in `titleCaseDefaultOptionsList` to clearly distinguish sentence case vs. headline case
- Enhanced test coverage for pronouns like “us” and regional acronyms under AP style

### Changed
- Refined test naming and grouping for clarity (e.g., “should capitalize pronoun ‘us’…”)
- Updated defaults so `smartQuotes` is fully supported in Chicago style when enabled
- Further aligned short-word rules for each style, ensuring consistent minor-word handling

### Fixed
- Corrected several test cases that mismatched titles vs. expected output
- Addressed parentheses/bracket errors causing TypeError in some smart quotes tests
- Resolved minor inconsistencies in brand-name replacements within the test suite

*Note: This hotfix release addresses critical issues found after the 1.7.4 release without introducing breaking changes.*

## [1.7.4] - 2025-04-09

### Changed
- Unified logic across all styles for more consistent title casing
- Refined APA Title Case rules: removed four-letter words like “about,” “among,” and “against” from minor-word list
- Aligned short-word rules for AP, Chicago, and NYT to use three-letter-or-fewer words as minor
- Preserved sentence case for Wikipedia (`caseStyle: 'sentence'`) as per style guide
- Ensured proper handling of acronyms (e.g., “US” always capitalized)
- Verified clear differentiation between sentence case (Wikipedia) and title case (others)

### Fixed
- Corrected style-specific casing logic
- Fixed tests and updated bundled output
- Removed outdated logic from docs

## [1.7.3] - 2025-04-09

### Changed
- Add missing types declaration

### Fixed
- Corrected style-specific casing logic
- Fixed tests and updated bundled output
- Removed outdated logic from docs

## [1.7.1] - 2025-04-05

### Added
- Regional acronym handling and normalization
- Enhanced edge case handling for acronyms

### Fixed
- Inconsistencies in title case style lists for APA, Chicago, and Wikipedia styles
- Updated preposition lists for better style compliance

## [1.7.0] - 2024-03-31

### Added
- Support for multiple title case styles (AP, APA, Chicago, Wikipedia, NYT)
- Custom word replacement functionality
- Acronym handling
- Browser and Node.js compatibility
- Comprehensive test suite

### Changed
- Improved build process with webpack
- Enhanced documentation

### Fixed
- Various bug fixes and improvements 
