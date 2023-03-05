String.prototype.toTitleCase = function(options) {
    const defaultOptions = {
        neverCapitalized: ["etc.", "i.e.", "e.g.", "vs.", "etc"],
        shortConjunctions: ["and", "as", "but", "for", "if", "nor", "or", "so", "yet"],
        articles: ["a", "an", "the"],
        shortPrepositions: ["as", "at", "by", "for", "in", "of", "off", "on", "per", "to", "up", "via"],
    }
    const mergedOptions = { ...defaultOptions, ...options };
    
    if (this.length === 0) {
        return '';
    }
    const words = this.split(" ");
  
    for (let i = 0; i < words.length; i++) {
      if (mergedOptions.shortConjunctions.includes(words[i]) || mergedOptions.articles.includes(words[i]) || mergedOptions.shortPrepositions.includes(words[i])) {
        if (i === 0 || i === words.length - 1) {
            words[i] = words[i][0].toUpperCase() + words[i].slice(1);
        } else {
            words[i] = words[i].toLowerCase();
        }
      } else if (words[i].includes(":")) {
        const nextWordIndex = i + 1;
          if (nextWordIndex < words.length) {
              words[nextWordIndex] = words[nextWordIndex][0].toUpperCase() + words[nextWordIndex].slice(1);
          }
          words[i] = words[i][0].toUpperCase() + words[i].slice(1);
      } else if (words[i].includes("-")) {
        const hyphenatedWord = words[i].split("-");
        const capitalizedHyphenatedWord = hyphenatedWord.map((word, index) => {
          if (index === hyphenatedWord.length - 1 && word.match(/^(IV|VI{0,3}|IX|XI{0,3}|XIV|XV|XVI{0,2}|XVII|XIX|[IVX]+)$/i)) {
              return word.toUpperCase();
          } else {
            return word[0].toUpperCase() + word.slice(1).toLowerCase();
          }
        }).join("-");
        words[i] = capitalizedHyphenatedWord;
      } else {
          if (words[i].slice(1).search(/[A-Z]|\../) > -1) {
            words[i] = words[i];
          } else if (i === 0 || i === words.length - 1) {
            words[i] = words[i][0].toUpperCase() + words[i].slice(1);
          } else if (mergedOptions.neverCapitalized.includes(words[i])) {
            words[i] = words[i].toLowerCase();
          } else {
            const firstChar = words[i][0];
            const restOfWord = words[i].slice(1);
            words[i] = firstChar.toUpperCase() + restOfWord.toLowerCase();
          }
      }
    }
    
    return words.join(" ");
};