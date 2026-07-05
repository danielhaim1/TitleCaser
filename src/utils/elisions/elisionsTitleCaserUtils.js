export function elisionsExtendTitleCaserUtils(TitleCaserUtils) {
  Object.defineProperties(TitleCaserUtils, {
    // Check if a word is an elided word
    isElidedWord: {
      value(word) {
        if (typeof word !== "string" || word.trim() === "") {
          throw new TypeError("Invalid input: word must be a non-empty string.");
        }

        const knownElidedPrefixes = new Set(["o’", "fo’", "ne’er", "e’er", "’tis", "’twas", "’n’"]);
        const normalized = word.trim().toLowerCase().replace(/'/g, "’");

        for (const prefix of knownElidedPrefixes) {
          if (normalized.startsWith(prefix)) {
            return true;
          }
        }

        return false;
      },
      writable: true,
      configurable: true,
    },

    // Normalize an elided word to title case
    normalizeElidedWord: {
      value(word) {
        if (typeof word !== "string" || word.trim() === "") {
          throw new TypeError("Invalid input: word must be a non-empty string.");
        }

        const knownElidedPrefixes = new Set(["o’", "fo’", "ne’er", "e’er", "’tis", "’twas", "’n’"]);
        const original = word.trim();
        const normalized = original.replace(/'/g, "’").toLowerCase();

        for (const prefix of knownElidedPrefixes) {
          if (normalized.startsWith(prefix)) {
            const prefixLength = prefix.length;
            const rest = original.slice(prefixLength);

            const fixedPrefix = prefix.charAt(0).toUpperCase() + prefix.slice(1);
            const fixedRest = rest.length > 0 ? rest.charAt(0).toUpperCase() + rest.slice(1) : "";

            return fixedPrefix + fixedRest;
          }
        }

        return false;
      },
      writable: true,
      configurable: true,
    },
  });
}
