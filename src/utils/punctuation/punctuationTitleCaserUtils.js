export function punctuationExtendTitleCaserUtils(TitleCaserUtils) {
  Object.defineProperties(TitleCaserUtils, {
    // Check if a word has a number
    hasNumbers: {
      value(word) {
        return /\d/.test(word);
      },
      writable: true,
      configurable: true,
    },

    // Check if a word has a possessive suffix
    hasSuffix: {
      value(word) {
        const suffix = "'s";
        return word.length > suffix.length && word.endsWith(suffix);
      },
      writable: true,
      configurable: true,
    },

    // Check if a word has an apostrophe
    hasApostrophe: {
      value(word) {
        return word.indexOf("'") !== -1;
      },
      writable: true,
      configurable: true,
    },

    // Check if a word has a hyphen or dash
    hasHyphen: {
      value(word) {
        return word.indexOf("-") !== -1 || word.indexOf("–") !== -1 || word.indexOf("—") !== -1;
      },
      writable: true,
      configurable: true,
    },

    // Check if a word is a Roman numeral
    hasRomanNumeral: {
      value(word) {
        if (typeof word !== "string" || word === "") {
          throw new TypeError("Invalid input: word must be a non-empty string.");
        }

        const hasApostrophe = word.includes("'");
        const wordParts = hasApostrophe ? word.split("'") : [word];
        const romanNumeralRegex = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;
        const isRomanNumeral = wordParts.every((part) => romanNumeralRegex.test(part));

        return isRomanNumeral;
      },
      writable: true,
      configurable: true,
    },

    // Check if every part of a hyphenated word is a Roman numeral
    hasHyphenRomanNumeral: {
      value(word) {
        if (typeof word !== "string" || word === "") {
          throw new TypeError("Invalid input: word must be a non-empty string.");
        }

        const parts = word.split("-");
        for (let i = 0; i < parts.length; i++) {
          if (!TitleCaserUtils.hasRomanNumeral(parts[i])) {
            return false;
          }
        }
        return true;
      },
      writable: true,
      configurable: true,
    },

    // Check if a word is the HTML break placeholder
    hasHtmlBreak: {
      value(word) {
        return word === "nl2br";
      },
      writable: true,
      configurable: true,
    },

    // Check if a string has Unicode symbols
    hasUnicodeSymbols: {
      value(str) {
        return /[^\x00-\x7F\u00A0-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u02AF\u02B0-\u02FF\u0300-\u036F\u0370-\u03FF\u0400-\u04FF\u0500-\u052F\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u0780-\u07BF\u07C0-\u07FF\u0800-\u083F\u0840-\u085F\u0860-\u087F\u0880-\u08AF\u08B0-\u08FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF]/.test(
          str,
        );
      },
      writable: true,
      configurable: true,
    },

    // Check if a string has currency symbols
    hasCurrencySymbols: {
      value(str) {
        return /[^\x00-\x7F\u00A0-\u00FF\u20AC\u20A0-\u20B9\u20BD\u20A1-\u20A2\u00A3-\u00A5\u058F\u060B\u09F2-\u09F3\u0AF1\u0BF9\u0E3F\u17DB\u20A6\u20A8\u20B1\u2113\u20AA-\u20AB\u20AA\u20AC-\u20AD\u20B9]/.test(
          str,
        );
      },
      writable: true,
      configurable: true,
    },

    // Check if a word is an ampersand
    isWordAmpersand: {
      value(str) {
        return /&amp;|&/.test(str);
      },
      writable: true,
      configurable: true,
    },

    // Check if a word starts with a symbol
    startsWithSymbol: {
      value(word) {
        if (typeof word !== "string") {
          throw new Error(`Parameter 'word' must be a string. Received '${typeof word}' instead.`);
        }

        if (word.length === 0) {
          return false;
        }

        const firstChar = word.charAt(0);

        return firstChar === "#" || firstChar === "@" || firstChar === ".";
      },
      writable: true,
      configurable: true,
    },

    // Get opening quotes or brackets before a word
    getLeadingOpeningPunctuation: {
      value(word) {
        if (typeof word !== "string") {
          throw new Error(`Parameter 'word' must be a string. Received '${typeof word}' instead.`);
        }

        const match = word.match(/^[([{"'“‘«‹„‚]+/);
        return match ? match[0] : "";
      },
      writable: true,
      configurable: true,
    },

    // Get closing quotes or brackets after a word
    getTrailingClosingPunctuation: {
      value(word) {
        if (typeof word !== "string") {
          throw new Error(`Parameter 'word' must be a string. Received '${typeof word}' instead.`);
        }

        const match = word.match(/[)\]}"'”’»›]+$/);
        return match ? match[0] : "";
      },
      writable: true,
      configurable: true,
    },

    // Check if a word ends with a punctuation symbol
    endsWithSymbol: {
      value(word, symbols = [".", ",", ";", ":", "?", "!"]) {
        if (typeof word !== "string" || !Array.isArray(symbols)) throw new Error("Invalid arguments");
        return symbols.some((symbol) => word.endsWith(symbol)) || symbols.includes(word.slice(-2));
      },
      writable: true,
      configurable: true,
    },

    // Escape HTML special characters
    escapeSpecialCharacters: {
      value(str) {
        return str.replace(/[&<>"']/g, function (match) {
          switch (match) {
            case "&":
              return "&amp;";
            case "<":
              return "&lt;";
            case ">":
              return "&gt;";
            case '"':
              return "&quot;";
            case "'":
              return "&#x27;";
          }
        });
      },
      writable: true,
      configurable: true,
    },

    // Unescape HTML special characters
    unescapeSpecialCharacters: {
      value(str) {
        return str.replace(/&amp;|&lt;|&gt;|&quot;|&#x27;/g, function (match) {
          switch (match) {
            case "&amp;":
              return "&";
            case "&lt;":
              return "<";
            case "&gt;":
              return ">";
            case "&quot;":
              return '"';
            case "&#x27;":
              return "'";
          }
        });
      },
      writable: true,
      configurable: true,
    },
  });
}
