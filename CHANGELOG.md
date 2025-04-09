# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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