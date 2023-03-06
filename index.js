const uppercaseRegex = /[A-Z]/;
const abbreviationRegex = /\../;

String.prototype.toTitleCase = function (options) {
  try {
    if (!(this instanceof String)) {
      throw new TypeError("Invalid input: input must be a string.");
    }

    if (typeof options !== "undefined" && typeof options !== "object") {
      throw new TypeError("Invalid options: options must be an object.");
    }

    const defaultOptions = {
      neverCapitalized: ["etc.", "i.e.", "e.g.", "vs.", "etc"],
      shortConjunctions: [
        "and",
        "as",
        "but",
        "for",
        "if",
        "nor",
        "or",
        "so",
        "yet"
      ],
      articles: ["a", "an", "the"],
      shortPrepositions: [
        "as",
        "at",
        "by",
        "for",
        "in",
        "of",
        "off",
        "on",
        "per",
        "to",
        "up",
        "via"
      ]
    };

    const chicagoOptions = {
      neverCapitalized: [
        "a",
        "an",
        "the",
        "and",
        "but",
        "or",
        "for",
        "nor",
        "on",
        "at",
        "to",
        "from",
        "by",
        "with",
        "in",
        "of"
      ],
      shortConjunctions: [],
      articles: ["a", "an", "the"],
      shortPrepositions: ["as", "at", "by", "for", "in", "of", "on", "to", "up"]
    };

    const mergedOptions =
      options?.style === "chicago"
        ? {
            ...defaultOptions,
            ...chicagoOptions
          }
        : {
            ...defaultOptions,
            ...options
          };

    const capitalizeWord = (word) => {
      if (
        mergedOptions.shortConjunctions.includes(word) ||
        mergedOptions.articles.includes(word) ||
        mergedOptions.shortPrepositions.includes(word)
      ) {
        return word.toLowerCase();
      } else if (word.includes(":")) {
        const nextWordIndex = words.indexOf(word) + 1;
        if (nextWordIndex < words.length) {
          words[nextWordIndex] =
            words[nextWordIndex].charAt(0).toUpperCase() +
            words[nextWordIndex].slice(1);
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else if (word.includes("-")) {
        const hyphenatedWord = word.split("-");
        const capitalizedHyphenatedWord = hyphenatedWord
          .map((word, index) => {
            if (
              index === hyphenatedWord.length - 1 &&
              word.match(/^(IV|VI{0,3}|IX|XI{0,3}|XIV|XV|XVI{0,2}|XVII|XIX|[IVX]+)$/i)
            ) {
              return word.toUpperCase();
            } else {
              return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }
          })
          .join("-");
        return capitalizedHyphenatedWord;
      } else {
        if (
          uppercaseRegex.test(word.slice(1)) ||
          abbreviationRegex.test(word.slice(1))
        ) {
          return word;
        } else if (mergedOptions.neverCapitalized.includes(word)) {
          return word.toLowerCase();
        } else {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
      }
    };

    const words = this.split(" ");
    const capitalizedWords = words.map((word, index) => {
      if (index === 0 || index === words.length - 1) {
        return capitalizeWord(word.charAt(0).toUpperCase() + word.slice(1));
      } else {
        return capitalizeWord(word);
      }
    });

    return capitalizedWords.join(" ");
  } catch (error) {
    throw new TypeError(`Invalid argument: ${error.message}`);
  }
};