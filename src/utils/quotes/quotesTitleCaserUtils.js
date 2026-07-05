export function quotesExtendTitleCaserUtils(TitleCaserUtils) {
  Object.defineProperties(TitleCaserUtils, {
    // Convert straight quotes to curly quotes
    convertQuotesToCurly: {
      value(input) {
        const curlyQuotes = {
          "'": ["\u2018", "\u2019"],
          '"': ["\u201C", "\u201D"],
        };

        let replacedText = "";

        for (let i = 0; i < input.length; i++) {
          const char = input[i];
          const curlyQuotePair = curlyQuotes[char];

          if (curlyQuotePair) {
            const prevChar = input[i - 1];
            const nextChar = input[i + 1];

            const isLeftAligned = !prevChar || prevChar === " " || prevChar === "\n";
            const curlyQuote = isLeftAligned ? curlyQuotePair[0] : curlyQuotePair[1];
            replacedText += curlyQuote;

            if (curlyQuote === curlyQuotePair[1] && /[.,;!?()\[\]{}:]/.test(nextChar)) {
              replacedText += nextChar;
              i++;
            }
          } else {
            replacedText += char;
          }
        }

        return replacedText;
      },
      writable: true,
      configurable: true,
    },
  });
}
