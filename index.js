const LOWERCASE_COMMON_WORDS = ['a.m.', 'p.m.', 'adj.', 'adv.', 'al.', 'et al.', 'fig.', 'op. cit.', 'i.e.', 'e.g.', 'ca.', 'cc.', 'cf.', 'cm.', 'co.', 'corp.', 'dept.', 'dist.', 'ed.', 'edn.', 'etc.', 'ex.', 'min.', 'max.', 'pl.', 'pt.', 'rev.', 'sr.', 'st.', 'v.', 'vs.', 'esp.', 'fig.', 'vol.', 'pp.', 'p.', 'ph.d.', 'm.d.', 'd.d.s.', 'd.m.d.', 'd.o.', 'd.c.', 'd.v.m.', 'd.n.p.', 'd.p.m.', 'd.s.w.', 'd.s.n.', 'd.n.sc.', 'd.n.p.', 'd.n.a.', 'd.n.t.', 'd.n.p.t.', 'd.n.o.', 'd.n.m.', 'd.n.e.', 'd.n.s.', 'd.n.p.s.', 'w/', 'w/o', 'and', 'or', 'but', 'nor', 'a', 'an', 'the', 'as', 'at', 'by', 'for', 'in', 'of', 'on', 'to', 'up', 'yet', 'so'];

const UPPERCASE_COMMON_WORDS = ['AI', 'A/B', 'A11Y', 'API', 'AR', 'ARI', 'ARW', 'ASP', 'ASPX', 'AVI', 'AWS', 'BAY', 'BIN', 'BMP', 'CAB', 'CER', 'CFG', 'CFM', 'CLI', 'CMX', 'CMS', 'COAP', 'CR2', 'CRDOWNLOAD', 'CRW', 'CRX', 'CSV', 'CSR', 'CSS', 'DMP', 'DAT', 'DIY', 'DLL', 'DMG', 'DOC', 'DOCX', 'DOM', 'DNG', 'DNS', 'EPS', 'ETA', 'EXE', 'FAQ', 'FTP', 'FNT', 'FON', 'FLV', 'GIF', 'HTML', 'HTTP', 'HTTPS', 'HTM', 'IOT', 'ICS', 'IIQ', 'INI', 'INDD', 'IP', 'ISP', 'IDE', 'JAR', 'JPG', 'JPEG', 'JS', 'JSON', 'JSP', 'K25', 'KDC', 'KEY', 'LPWAN', 'LOG', 'M4A', 'MKV', 'MOS', 'MOV', 'MQTT', 'MP3', 'MP4', 'MPG', 'MSG', 'MRW', 'NBA', 'NCAA', 'NFL', 'NGO', 'NPO', 'NB-IOT', 'WLAN', 'RFID', 'BLE', 'M2M', 'NB-IoT', 'NEF', 'NRW', 'NUMBERS', 'OOP', 'ODF', 'ODG', 'ODP', 'ODS', 'ODT', 'OGG', 'ORF', 'OTF', 'PAGES', 'PDF', 'PEF', 'PHP', 'PNG', 'PPT', 'PPTX', 'PoC', 'PoE', 'PoW', 'PS', 'PSD', 'REST', 'RAR', 'RAF', 'RAW', 'RGB', 'RSS', 'RTF', 'RW2', 'RWL', 'SEO', 'SITX', 'SQL', 'SVG', 'SYS', 'SSH', 'SVP', 'TAR', 'TEX', 'TMP', 'TTF', 'TXT', 'UI', 'URL', 'VCARD', 'VSD', 'VR', 'WAV', 'WEBM', 'WEBP', 'WMA', 'WMV', 'WOFF', 'WOFF2', 'WYSIWYG', 'XLS', 'XLSX', 'XML', 'XPI', 'XPS', 'YAML', 'ZIP', 'C#', '.NET', 'CMOO', 'COO', 'CEO', 'CCO', 'CLO', 'CSO', 'CRO', 'CDO', 'CMO', 'CIO', 'CISO', 'CTO', 'CHRO', 'VP', 'EVP', 'AVP', 'HR', 'BOD', 'CCOA', 'CCOE', 'CCOO', 'CPO', 'CQO', 'CSCO', 'CVO', 'NGO', 'NPO', 'ARW', 'SVP'];

const UNIQUE_WORDS = ['IoT', 'OAuth', 'IaaS', 'PaaS', 'SaaS', 'DDoS', 'VoIP', 'PoC', 'PoW', 'JavaScript', 'jQuery', 'MongoDB', 'MySQL', 'PostgreSQL', 'GraphQL', 'DevOps', 'SecOps', 'Frontend', 'Front-end', 'Front end', 'Backend', 'Back-end', 'Back end', 'Fullstack', 'Full-stack', 'Full stack', 'eBook', 'eBooks', 'eReader', 'eCommerce', 'E-commerce', 'eShop', 'eShops', 'eStore', 'eStores', 'eMarket', 'eMarkets', 'eMarketplace', 'eMarketplaces', 'Ltd.', 'Co.', 'Inc.', 'St.', 'Ave.', 'Bldg.', 'No.', 'LoRa', 'NB-IoT', 'Node.j'];

const CORRECTED_TITLE_CASE_TERMS = {'PhD': 'ph.d.','F.Y.I': 'FYI','T.B.D': 'TBD','A.K.A': 'AKA','A.S.A.P': 'ASAP','D.I.Y': 'DIY','F.A.Q': 'FAQ','U.K.': 'UK','U.S.': 'US','U.S.A.': 'USA','U.S.A': 'USA','U.K': 'UK','U.S': 'US','Full-stack': 'Fullstack','Full Stack': 'Fullstack','Front-End': 'Frontend','Back-End': 'Backend','e-Book': 'eBook','e-Books': 'eBooks','e-Commerce': 'eCommerce','ecom': 'eCommerce','ecommerce': 'eCommerce','nodejs': 'Node.js'};

const TITLE_CASE_STYLES = Object.freeze({
    AP: 'ap',
    APA: 'apa',
    BRITISH: 'british',
    CHICAGO: 'chicago',
    NYT: 'nyt',
    WIKIPEDIA: 'wikipedia'
});
const ALLOWED_TITLE_CASE_STYLES = Object.values(TITLE_CASE_STYLES);
const TITLE_CASE_DEFAULT_OPTIONS = Object.freeze({
    ap: {
        shortConjunctions: ['and', 'but', 'or', 'for', 'nor', 'yet', 'so'],
        articles: ['a', 'an', 'the'],
        shortPrepositions: ['as', 'at', 'by', 'in', 'of', 'on', 'to', 'up', 'via'],
        neverCapitalized: []
    },
    apa: {
        shortConjunctions: ['and', 'as', 'but', 'by', 'for', 'in', 'nor', 'of', 'on', 'or', 'so', 'to', 'yet'],
        articles: ['a', 'an', 'the'],
        shortPrepositions: ['as', 'at', 'by', 'for', 'in', 'of', 'on', 'to', 'up', 'via'],
        neverCapitalized: []
    },
    british: {
        shortConjunctions: ['and', 'but', 'or', 'for', 'nor', 'yet', 'so'],
        articles: ['a', 'an', 'the'],
        shortPrepositions: ['as', 'at', 'by', 'in', 'of', 'on', 'to', 'up', 'via'],
        neverCapitalized: []
    },
    chicago: {
        shortConjunctions: ['and', 'but', 'or', 'for', 'nor', 'yet', 'so'],
        articles: ['a', 'an', 'the'],
        shortPrepositions: ['as', 'at', 'by', 'for', 'in', 'of', 'on', 'to', 'up', 'with', 'via'],
        neverCapitalized: ['etc.']
    },
    nyt: {
        shortConjunctions: ['and', 'but', 'or', 'for', 'nor', 'yet', 'so'],
        articles: ['a', 'an', 'the'],
        shortPrepositions: ['as', 'at', 'by', 'in', 'of', 'on', 'to', 'up', 'via'],
        neverCapitalized: []
    },
    wikipedia: {
        shortConjunctions: ['and', 'as', 'but', 'for', 'if', 'nor', 'or', 'so', 'yet'],
        articles: ['a', 'an', 'the'],
        shortPrepositions: ['as', 'at', 'by', 'in', 'of', 'on', 'to', 'up', 'via'],
        neverCapitalized: []
    },
});
const IGNORED_TITLE_CASE_WORDS = [];
const IGNORED_TITLE_CASE_PHRASES = [];

/**
 * Validates an option
 * 
 * @param {string} key
 * @param {string[]} value
 * 
 * @returns {void}
 * 
 */
 function validateOption(key, value) {
    if(!Array.isArray(value)) {
        throw new TypeError(`Invalid option: ${key} must be an array`);
    }
    if(!value.every((word) => typeof word === "string")) {
        throw new TypeError(`Invalid option: ${key} must be an array of strings`);
    }
}

/**
 * Validates the title case options
 * 
 * @param {object} options
 * @param {string} options.style
 * @param {string[]} options.articles
 * @param {string[]} options.shortConjunctions
 * @param {string[]} options.shortPrepositions
 * @param {string[]} options.neverCapitalized
 * 
 * @returns {void}
 */
function validateOptions(options) {
    for(const key of Object.keys(options)) {
        if(key === 'style') {
            if(typeof options.style !== 'string') {
                throw new TypeError(`Invalid option: ${key} must be a string`);
            } else if(!ALLOWED_TITLE_CASE_STYLES.includes(options.style)) {
                throw new TypeError(`Invalid option: ${key}`);
            }
            continue;
        }
        if(!TITLE_CASE_DEFAULT_OPTIONS.hasOwnProperty(key)) {
            throw new TypeError(`Invalid option: ${key}`);
        }
        validateOption(key, options[key]);
    }
}

/**
 * Gets the title case options for a given style
 * 
 * @param {object} options
 * @param {string} options.style
 * 
 * @returns {object}
 * 
 */
function getTitleCaseOptions(options = {}, lowercaseWords = LOWERCASE_COMMON_WORDS) {
    validateOptions(options);
    const style = options.style || "ap";
    const defaultOptions = TITLE_CASE_DEFAULT_OPTIONS[style];
    const articles = options.articles || defaultOptions.articles;
    const shortConjunctions = options.shortConjunctions || defaultOptions.shortConjunctions;
    const shortPrepositions = options.shortPrepositions || defaultOptions.shortPrepositions;
    const neverCapitalized = options.neverCapitalized || defaultOptions.neverCapitalized;
    return {
        articles: [...new Set([...articles, ...lowercaseWords.filter(word => !defaultOptions.articles.includes(word))])],
        shortConjunctions: [...new Set([...shortConjunctions, ...lowercaseWords.filter(word => !defaultOptions.shortConjunctions.includes(word))])],
        shortPrepositions: [...new Set([...shortPrepositions, ...lowercaseWords.filter(word => !defaultOptions.shortPrepositions.includes(word))])],
        neverCapitalized: [...neverCapitalized],
    };
}

/**
 * Checks if a word is a short conjunction
 * 
 * @param {string} word
 * @param {string} style
 * 
 * @returns {boolean}
 * 
 */
function isShortConjunction(word, style) {
    const shortConjunctions = [...getTitleCaseOptions({
        style: style
    }).shortConjunctions];
    const wordLowerCase = word.toLowerCase();
    return shortConjunctions.includes(wordLowerCase);
}

/**
 * Checks if a word is an article
 * 
 * @param {string} word
 * @param {string} style
 * 
 * @returns {boolean}
 *
 */
function isArticle(word, style) {
    const articles = getTitleCaseOptions({
        style: style
    }).articles;
    return articles.includes(word.toLowerCase());
}

/**
 * Checks if a word is a short preposition
 * 
 * @param {string} word
 * @param {string} style
 * 
 * @returns {boolean}
 * 
 */
function isShortPreposition(word, style) {
    if(typeof word !== 'string') {
        throw new Error(`Parameter 'word' must be a string. Received '${typeof word}' instead.`);
    }
    if(!ALLOWED_TITLE_CASE_STYLES.includes(style)) {
        throw new Error(`Invalid option: style must be one of ${ALLOWED_TITLE_CASE_STYLES.join(", ")}`);
    }
    const shortPrepositions = [...getTitleCaseOptions({
        style: style
    }).shortPrepositions];
    const isShort = shortPrepositions.includes(word.toLowerCase());
    return isShort;
}

/**
 * Checks if a word is never capitalized.
 * 
 * @param {string} word - The word to check.
 * @param {string} style - The style to use.
 * @returns {boolean} - Returns true if the word is never capitalized, false otherwise.
 * 
 */
function isNeverCapitalized(word, style) {
    if(!ALLOWED_TITLE_CASE_STYLES.includes(style)) {
        return false;
    }
    const neverCapitalized = [...getTitleCaseOptions({
        style: style
    }).neverCapitalized];
    const lowerWord = word.toLowerCase();
    if(neverCapitalized.includes(lowerWord)) {
        return true;
    }
    return false;
}

/**
 * Checks if a word has a number in it.
 * 
 * @param {string} word - The word to check.
 * @returns {boolean} - Returns true if the word has a number in it, false otherwise.
 * 
 * hasNumbersInWord("VMware"); // false
 * hasNumbersInWord("asf8"); // true
 */
function hasNumbersInWord(word) {
    return /\d/.test(word);
}

/**
 * Checks if a word has more than 2 uppercase letters in it.
 * 
 * @param {string} word - The word to check.
 * @returns {boolean} - Returns true if the word has multiple uppercase letters, false otherwise.
 * 
 * hasMultipleUppercaseLetters("VMware"); // true
 * hasMultipleUppercaseLetters("iPhone"); // true
 * hasMultipleUppercaseLetters("ALL"); // true
 * 
 */
function hasMultipleUppercaseLetters(word) {
    let count = 0;
    for(let i = 0; i < word.length; i++) {
        if(/[A-Z]/.test(word[i])) {
            count++;
            if(count >= 2) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Checks if a word has any intentional uppercase letter in it, i.e., an uppercase letter that is not the first letter of the word.
 * 
 * @param {string} word - The word to check.
 * @returns {boolean} - Returns true if the word has an intentional uppercase letter, false otherwise.
 * 
 * hasIntentionalUppercase("VMware"); // true
 * hasIntentionalUppercase("iPhone"); // true
 * hasIntentionalUppercase("ALL"); // true
 * 
 */
function hasIntentionalUppercase(word) {
    for(let i = 1; i < word.length; i++) {
        // Check if the current character is uppercase.
        if(/[A-Z]/.test(word[i])) {
            // Check if the previous character is also uppercase or a lowercase letter.
            if(/[A-Za-z]/.test(word[i - 1])) {
                // The uppercase letter is intentional.
                return true;
            }
            return true;
        }
    }
    // No intentional uppercase letter found.
    return false;
}

/**
 * Checks if a word contains a hyphen.
 *
 * @param {string} word - The word to check.
 * @returns {boolean} - True if the word contains a hyphen, false otherwise.
 * 
 * hasHyphen('hello-world'); // true
 * hasHyphen('foo'); // false
 * hasHyphen('foo-bar-baz'); // true
 * hasHyphen('foo–bar'); // true
 * hasHyphen('foo—bar'); // true
 * hasHyphen('foo-bar_baz'); // false
 * 
 */
function hasHyphen(word) {
    return word.includes('-') || word.includes('–') || word.includes('—');
}

/**
 * Checks if a word starts with a hashtag.
 * 
 * @param {string} word - The word to check.
 * @returns {boolean} - True if the word starts with a hashtag, false otherwise.
 * 
 * startsWithHashtag('#hello'); // true
 * startsWithHashtag('hello'); // false
 * startsWithHashtag('hello#'); // false
 *  
 */
function startsWithHashtag(word) {
    return word.startsWith('#');
}

/**
 * Checks if a word starts with an at symbol.
 * 
 * @param {string} word - The word to check.
 * @returns {boolean} - True if the word starts with an at symbol, false otherwise.
 * 
 * startsWithAtSymbol('@hello'); // true
 * startsWithAtSymbol('hello'); // false
 * startsWithAtSymbol('hello@'); // false
 * 
 */
function startsWithAtSymbol(word) {
    return word.charAt(0) === '@';
}

/**
 * Checks if a word ends with a symbol.
 *
 * @param {string} word - The word to check.
 * @param {string[]} symbols - An array of symbols to check for.
 * 
 * @returns {boolean} - True if the word ends with a symbol, false otherwise.
 * 
 * endsWithSymbol('hello.'); // true
 * endsWithSymbol('hello?'); // true
 * endsWithSymbol('hello!'); // true
 * endsWithSymbol('hello,'); // true
 * endsWithSymbol('hello'); // false
 * endsWithSymbol('hello', ['.', ',', ';', ':', '?', '!', ']', ')', '}']); // true
 * 
 */
function endsWithSymbol(word, symbols = [".", ";", ":", "?", "!", "]", ")", "}"]) {
    return symbols.some(symbol => word.endsWith(symbol)) || symbols.some(symbol => word.endsWith(` ${symbol}`));
}

/**
 * Capitalizes the first letter of a word and returns the result.
 * 
 * @param {string} word - The word to capitalize.
 * @returns {string} - The capitalized word.
 * 
 * capitalize('hello'); // 'Hello'
 * capitalize('HeLlO'); // 'Hello'
 * 
 */
function capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Checks if a word is the first word in an array of words.
 *  
 * @param {string} word - The word to check.
 * @param {string[]} wordsArray - The array of words to check against.
 * 
 * @returns {boolean} - True if the word is the first word in the array, false otherwise.
 * 
 * isFirst('hello', ['hello', 'world']); // true
 * isFirst('world', ['hello', 'world']); // false
 * 
 */
function isFirst(word, wordsArray) {
    return word === wordsArray[0];
}

/**
 * Checks if a word is the last word in an array of words.
 * 
 * @param {string} word - The word to check.
 * @param {string[]} wordsArray - The array of words to check against.
 *  
 * @returns {boolean} - True if the word is the last word in the array, false otherwise.
 *  
 * isLast('hello', ['hello', 'world']); // false
 * isLast('world', ['hello', 'world']); // true
 * 
 */
function isLast(word, wordsArray) {
    return word === wordsArray[wordsArray.length - 1];
}

/**
 * Checks if a word is the first or last word in an array of words.
 * 
 * @param {string} word - The word to check.
 * @param {string[]} wordsArray - The array of words to check against.
 *  
 * @returns {boolean} - True if the word is the first or last word in the array, false otherwise.
 * 
 * isFirstOrLast('hello', ['hello', 'world']); // true
 * isFirstOrLast('world', ['hello', 'world']); // true
 * isFirstOrLast('foo', ['hello', 'world']); // false
 */
function isFirstOrLast(wordsArray, word) {
    return isFirst(word, wordsArray) || isLast(word, wordsArray);
}

/**
 * Checks if a word is a roman numeral.
 * 
 * @param {string} word - The word to check.
 * @returns {boolean} - True if the word is a roman numeral, false otherwise.
 * 
 * isRomanNumeral('I'); // true
 * isRomanNumeral('II'); // true
 * isRomanNumeral('III'); // true
 * isRomanNumeral('IV'); // true
 */
function isRomanNumeral(word) {
    return /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i.test(word);
}
/**
 * Checks if a word is a roman numeral
 * 
 * @param {string} word - The word to check.
 * @returns {boolean} - True if the word is a roman numeral, false otherwise.
 *  
 * isRomanNumeral('I'); // true
 * isRomanNumeral('II'); // true
 * isRomanNumeral('III'); // true
 * isRomanNumeral('IV'); // true
 */
function hasHyphenRomanNumeral(word) {
    const parts = word.split('-');
    for(let i = 0; i < parts.length; i++) {
        if(!/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i.test(parts[i])) {
            return false;
        }
    }
    return true;
}
/**
 * Checks if a word is in the list of ignored words.
 * 
 * @param {string} word - The word to check.
 * @param {string[]} list - The list of ignored words.
 * 
 * @returns {boolean} - True if the word is in the list of ignored words, false otherwise.
 * 
 * isWordIgnored('hello', ['hello', 'world']); // true
 * isWordIgnored('world', ['hello', 'world']); // true
 * isWordIgnored('foo', ['hello', 'world']); // false
 * 
 */
function isWordIgnored(word, list) {
    const ignoreList = Array.isArray(list) ? list : [];
    const result = ignoreList.includes(word.toLowerCase());
    return result;
}

/**
 * Checks if a word is in an array of words.
 * 
 * @param {string} word - The word to check.
 * @param {string[]} list - The array of words to check against.
 * 
 * @returns {boolean} - True if the word is in the array of words, false otherwise.
 * 
 * isWordInArray('hello', ['hello', 'world']); // true
 * isWordInArray('world', ['hello', 'world']); // true
 * isWordInArray('foo', ['hello', 'world']); // false
 */
function isWordInArray(word, list) {
    const array = Array.isArray(list) ? list : [];
    const result = array.map(word => word.toLowerCase()).includes(word.toLowerCase());
    return result;
}

/**
 * Returns the index of a word in the unique words array.
 * 
 * @param {string} word - The word to check.
 * @param {string[]} list - The array of words to check against.
 * 
 * @returns {number} - The index of the word in the array of words, -1 if not found.
 *
 * getUniqueWordIndex('hello', ['hello', 'world']); // 0
 * getUniqueWordIndex('world', ['hello', 'world']); // 1
 * getUniqueWordIndex('foo', ['hello', 'world']); // -1
 *  
 */
function getUniqueCapitalizedWord(word) {
    const lowerCaseWord = word.toLowerCase();
    const uniqueWordIndex = UNIQUE_WORDS.findIndex(w => w.toLowerCase() === lowerCaseWord);
    if(uniqueWordIndex >= 0) {
        return UNIQUE_WORDS[uniqueWordIndex];
    } else {
        return null;
    }
}

/**
 * Returns the corrected term for a word in the list of corrected terms.
 * 
 * @param {string} word - The word to check.
 * @param {string[]} list - The array of words to check against.
 * 
 * @returns {string} - The corrected term for the word, or the original word if not found.
 * 
 * correctTerm('hello', ['hello', 'world']); // 'Hello'
 * correctTerm('world', ['hello', 'world']); // 'World'
 * correctTerm('foo', ['hello', 'world']); // 'foo'
 * 
 */
function correctTerm(word, arr) {
    const lowerCaseWord = word.toLowerCase();
    const correctWordIndex = arr.findIndex(w => w.toLowerCase() === lowerCaseWord);
    if(correctWordIndex >= 0) {
        const correctedTerm = Object.values(CORRECTED_TITLE_CASE_TERMS)[correctWordIndex];
        return correctedTerm;
    } else {
        return word;
    }
}

/**
 * Checks if a word is an incorrect term.
 * 
 * @param {string} word - The word to check.
 * @param {string[]} list - The array of words to check against.
 * 
 * @returns {boolean} - True if the word is an incorrect term, false otherwise.
 * 
 * isIncorrectTerm('hello', ['hello', 'world']); // true
 * isIncorrectTerm('world', ['hello', 'world']); // true
 * isIncorrectTerm('foo', ['hello', 'world']); // false
 */
function isIncorrectTerm(word, arr) {
    const lowerCaseWord = word.toLowerCase();
    const correctWordIndex = arr.findIndex(w => w.toLowerCase() === lowerCaseWord);
    if(correctWordIndex >= 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * Checks if a phrase is in the list of ignored phrases.
 * 
 * @param {string[]} words - The words to check.
 * @param {string[]} IGNORED_TITLE_CASE_PHRASES - The list of ignored phrases.
 * 
 * @returns {boolean} - True if the phrase is in the list of ignored phrases, false otherwise.
 * 
 * isPhraseIgnored(['hello', 'world'], ['hello world']); // true
 * isPhraseIgnored(['hello', 'world'], ['hello', 'world']); // true
 * isPhraseIgnored(['hello', 'world'], ['foo', 'bar']); // false
 */
function isPhraseIgnored(words, IGNORED_TITLE_CASE_PHRASES) {
    for(let i = 0; i < words.length; i++) {
        const currentWord = words[i];
        const ignorePhrase = IGNORED_TITLE_CASE_PHRASES.find(phrase => phrase.toLowerCase() === currentWord.toLowerCase() || phrase.toLowerCase()
            .startsWith(
                currentWord.toLowerCase() + ' '));
        if(ignorePhrase) {
            const remainingWords = words.slice(i + 1);
            const remainingIgnorePhrases = IGNORED_TITLE_CASE_PHRASES.filter(phrase => phrase.toLowerCase().startsWith(ignorePhrase.toLowerCase() +
                ' '));
            if(remainingIgnorePhrases.length > 0) {
                const result = isPhraseIgnored(remainingWords, remainingIgnorePhrases);
                return result;
            } else {
                return true;
            }
        }
    }
    return false;
}

/**
 * Checks and processes a hyphenated word
 * 
 * @param {string} word - The word to check.
 * @param {string} style - The style to use.
 *  
 * @returns {string} - The processed word.
 * 
 * processHyphenatedWord('hello-world', 'title'); // 'Hello-World'
 * processHyphenatedWord('louis-iv', 'sentence'); // 'louis-IV'
 */
function processHyphenatedWord(word, style) {
    const hyphenatedWords = word.split("-");
    const processedWords = hyphenatedWords.map((hyphenatedWord, j) => {
        if(isShortConjunction(hyphenatedWord, style) || isArticle(hyphenatedWord, style) || isShortPreposition(hyphenatedWord, style) ||
            isNeverCapitalized(hyphenatedWord, style)) {
            return hyphenatedWord.toLowerCase();
        } else if(isRomanNumeral(hyphenatedWord)) {
            return hyphenatedWord.toUpperCase();
        } else if(j > 0 && !isRomanNumeral(hyphenatedWords[j - 1])) {
            return hyphenatedWord.charAt(0).toUpperCase() + hyphenatedWord.slice(1).toLowerCase();
        } else {
            return hyphenatedWord.charAt(0).toUpperCase() + hyphenatedWord.slice(1).toLowerCase();
        }
    });
    return processedWords.join("-");
}

/**
 * toTitleCase function
 * 
 * @param {string} options - The options to use.
 * @returns {string} - The string with the title case applied.
 * 
 */
String.prototype.toTitleCase = function(options = {
    style: "ap"
}) {
    try {
        if (typeof this !== 'string') {
            throw new TypeError("Invalid input: input must be a string.");
          }
          
        if(typeof options !== "undefined" && typeof options !== "object") {
            throw new TypeError("Invalid options: options must be an object.");
        }
        const style = options && options.style && ALLOWED_TITLE_CASE_STYLES.includes(options.style) ? options.style : "ap";
        const {
            articles = [], shortConjunctions = [], shortPrepositions = [], neverCapitalized = []
        } = getTitleCaseOptions(options ? options : {}, LOWERCASE_COMMON_WORDS);
        const words = this.split(" ");
        const result = words.map((word, i) => {
            if(word.length === 0) {
                return word;
            }
            if(isWordIgnored(word, IGNORED_TITLE_CASE_WORDS)) {
                return word;
            }
            if(isIncorrectTerm(word, Object.keys(CORRECTED_TITLE_CASE_TERMS))) {
                const correctWordIndex = Object.keys(CORRECTED_TITLE_CASE_TERMS).findIndex(w => w.toLowerCase() === word
                    .toLowerCase());
                const correctedTerm = Object.values(CORRECTED_TITLE_CASE_TERMS)[correctWordIndex];
                return correctedTerm;
            }
            if(isWordInArray(word, UNIQUE_WORDS) || isWordInArray(word, UPPERCASE_COMMON_WORDS)) {
                if(isWordInArray(word, UNIQUE_WORDS)) {
                    word = getUniqueCapitalizedWord(word);
                }
                if(isWordInArray(word, UPPERCASE_COMMON_WORDS)) {
                    word = word.toUpperCase();
                }
                return word;
            }
            if(hasIntentionalUppercase(word) || hasIntentionalUppercase(word)) {
                return word;
            }
            if(isShortConjunction(word, style) || isArticle(word, style) || isShortPreposition(word, style) ||
                isNeverCapitalized(word, style)) {
                if(i > 0 && endsWithSymbol(words[i - 1])) {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                }
                return word.toLowerCase();
            }
            if(hasHyphen(word)) {
                return processHyphenatedWord(word, style);
            }
            if(startsWithHashtag(word) || startsWithAtSymbol(word) || hasNumbersInWord(word)) {
                return word;
            }
            if(isRomanNumeral(word)) {
                return word.toUpperCase();
            }
            if(isFirstOrLast(words, word) && !isWordIgnored(word, IGNORED_TITLE_CASE_WORDS)) {
                word = word.charAt(0).toUpperCase() + word.slice(1);
                return word;
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });

        if(result.length > 0 && !isWordIgnored(result[0], IGNORED_TITLE_CASE_WORDS) && !isWordInArray(result[0], UNIQUE_WORDS) && !isWordInArray(result[0], UPPERCASE_COMMON_WORDS) && !hasIntentionalUppercase(result[0]) && !hasIntentionalUppercase(result[0]) && !startsWithHashtag(result[0]) && !startsWithAtSymbol(result[0]) && !hasNumbersInWord(result[0]) && !isRomanNumeral(result[0])) {
            const capitalizedFirstChar = result[0].charAt(0).toUpperCase() + result[0].slice(1);
            result[0] = capitalizedFirstChar;
        }

        return result.join(" ");
    } catch (error) {
        throw error;
    }
};