# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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