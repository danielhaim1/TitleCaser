/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/TitleCaseConsts.js
var COMMON_ABBREVIATIONS = [
// Articles and prepositions, conjunctions: Includes abbreviations for articles and prepositions, conjunctions, and subordinating conjunctions.
'a', 'an', 'the', 'as', 'at', 'by', 'for', 'in', 'of', 'on', 'to', 'up', 'yet', 'so', 'but', 'nor', 'or', 'and'];
var CORRECT_TITLE_CASE = [
// Web Technologies
'AJAX', 'CSS', 'DOM', 'ES6', 'HTML', 'JavaScript', 'jQuery', 'MobX', 'SCSS', 'TypeScript', 'Vue.js', '.NET', 'ASP', 'ASPX', 'MySQL', 'PHP', 'PostgreSQL', 'Python', 'SQL', 'GraphQL', 'HTML5',
//  Acronyms/Abbreviations:
'API', 'APIs', 'ASCII', 'CI', 'CircleCI', 'CLI', 'DLL', 'DNS', 'EC2', 'FTP', 'HTTP', 'HTTPs', 'ICMP', 'IDE', 'IP', 'ISP', 'JSON', 'JSP', 'LPWAN', 'M2M', 'MQTT', 'OOP', 'REST', 'SSH', 'SSL', 'TCP', 'UDP', 'URL', 'WLAN', 'WYSIWYG', 'XML', 'YAML', 'YML', 'IMAP', 'RSS', 'IaaS', 'PaaS', 'SaaS', 'CaaS', 'FaaS', 'XaaS', 'RaaS', 'IoE', 'IoT', 'LoRa', 'NB-IoT', 'RFID', 'RF', 'RFI', 'RFQ', 'ECMAScript', 'IO', 'I/O', 'DevOps', 'SecOps', 'DDoS', 'VoIP',
// Misc.
'AI', 'AR', 'ML', 'VR',
// 'eTerms'
'e-Book', 'e-Books', 'eBook', 'eBooks', 'eCommerce', 'eMarket', 'eMarketplace', 'eMarketplaces', 'eMarkets', 'eReader', 'eShop', 'eShops', 'eStore', 'eStores', 'E-commerce',
// Accounting terms
'AP', 'AR', 'COGS', 'EBIT', 'EPS', 'FIFO', 'GAAP', 'LIFO', 'P&L', 'ROI', 'SOX', 'TCO', 'VAT',
// Investment terms
'CAGR', 'DCF', 'ETF', 'IPO', 'IRR', 'M&A', 'NAV', 'PE', 'PEG', 'PPE', 'ROE', 'S&P', 'TVM', 'VC',
// Marketing terms
'B2B', 'B2C', 'CMO', 'CPA', 'CPC', 'CPL', 'CPM', 'CRM', 'CTA', 'CTR', 'SEO', 'SEM', 'SMM', 'USP', 'A/B', 'CTA', 'CTOR', 'CTR', 'KPI', 'PWA', 'SEM', 'SERP', 'SERPs', 'SMM', 'SMO', 'FAQ', 'FAQA', 'FAQS', 'UI', 'UI/UX', 'UX', 'T&C', 'TOS', 'PP', 'CRM', 'PoE', 'PoW', 'PoC', 'A11Y', 'PR',
// Sales terms
'BANT', 'GAP', 'KPI', 'MQL', 'NPS', 'POS', 'SPIN', 'SQL', 'SWOT',
// Legal terms
'AFA', 'ADR', 'CCPA', 'CFAA', 'CISG', 'DMCA', 'EULA', 'GDPR', 'HIPAA', 'NDA', 'SOW', 'TOS',
// Roles and titles
'CEO', 'CEOs', 'CFO', 'CFOs', 'CIO', 'CIOs', 'CMO', 'CMOs', 'COO', 'COOs', 'CPO', 'CPOs', 'CRO', 'CROs', 'CSO', 'CSOs', 'CTO', 'CTOs', 'EVP', 'EVPs', 'HR', 'HRs', 'SVP', 'SVPs', 'VP', 'VPs',
// Non-profit organizations
'NGO', 'NPO', 'NGOs', 'NPOs', 'UN', 'UNESCO', 'UNICEF', 'UNHCR', 'UNODC', 'UNDP', 'UNFPA', 'UNEP',
// Brands:
'IKEA', 'Facebook', 'YouTube', 'Instagram', 'Twitter', 'Google', 'TensorFlow', 'Microsoft', 'Amazon', 'Netflix', 'LinkedIn', 'Airbnb', 'eBay', 'iPhone', 'iPad', 'iPod', 'PlayStation', 'PayPal', 'GitHub', 'GitLab', 'Salesforce', 'CodeIgniter', 'WordPress', 'WooCommerce', 'MongoDB', 'JIRA', 'HubSpot', 'AirDrop', 'AirPlay', 'AirPods', 'AirTags', 'FinalCut', 'GarageBand', 'iBooks', 'iCloud', 'iLife', 'iMac', 'iMessage', 'iMovie', 'iPhoto', 'iPod', 'iTunes', 'iWatch', 'iWork', 'iWork', 'LogicPro', 'macOS', 'ProTools', 'QuickTime', 'AdWords', 'AdSense', 'TikTok', 'Uber', 'Dropbox', 'Slack', 'Trello', 'Zoom', 'Twitch', 'Snapchat', 'WhatsApp', 'Telegram', 'Discord', 'Reddit', 'Quora', 'StackOverflow', 'StackExchange', 'Coca-Cola', 'AWS', 'GCP', 'VMware',
// Sports
'NBA', 'NCAA', 'NFL', 'WWE', 'WWF', 'FIFA',
// Time-related, numbers, and measurements: Includes abbreviations for time-related terms, numbers, and measurements.
'a.m.', 'p.m.', 'ca.', 'cc.', 'fig.', 'pl.', 'pt.', 'rev.', 'sr.', 'v.', 'vol.', 'et al.', 'pp.', 'p.',
// Professional abbreviations, degrees, and titles: Includes abbreviations for professional titles, degrees, and certifications.
'ph.d.', 'm.d.', 'd.d.s.', 'd.m.d.', 'd.o.', 'd.c.', 'd.v.m.', 'd.n.p.', 'd.p.m.', 'd.s.w.', 'd.s.n.', 'd.n.sc.', 'd.n.a.', 'd.n.t.', 'd.n.p.t.', 'd.n.o.', 'd.n.m.', 'd.n.e.', 'd.n.s.', 'd.n.p.s.',
// Academic & literary abbreviations: Includes abbreviations for academic and literary terms, such as 'ed.' for 'edition' and 'vol.' for 'volume'.
'adj.', 'adv.', 'cf.', 'cm.', 'co.', 'corp.', 'dept.', 'dist.', 'ed.', 'edn.', 'esp.', 'etc.', 'ex.', 'i.e.', 'e.g.', 'op. cit.', 'vs.',
// Commercial
'Ltd.', 'Co.', 'Inc.', 'St.', 'Ave.', 'Bldg.', 'No.',
// Misc:
'w/', 'w/o'];
var replaceCasing = [{
  'phd': 'ph.d.'
}, {
  'f.y.i': 'FYI'
}, {
  't.b.d': 'TBD'
}, {
  'a.k.a': 'AKA'
}, {
  'a.s.a.p': 'ASAP'
}, {
  'd.i.y': 'DIY'
}, {
  'f.a.q': 'FAQ'
}, {
  'f.a.q.s': 'FAQs'
}, {
  'f.a.q.a': 'FAQs'
}, {
  'angularjs': 'Angular.js'
}, {
  'reactjs': 'React.js'
}, {
  'vuejs': 'Vue.js'
}, {
  'nextjs': 'Next.js'
}, {
  'nuxtjs': 'Nuxt.js'
}, {
  'nodejs': 'Node.js'
}, {
  'full-stack': 'Fullstack'
}, {
  'front-end': 'Frontend'
}, {
  'back-end': 'Backend'
}, {
  'e-book': 'eBook'
}, {
  'e-books': 'eBooks'
}, {
  'e-commerce': 'eCommerce'
}, {
  'ecommerce': 'eCommerce'
}, {
  'ecom': 'eCommerce'
}];
var TITLE_CASE_STYLES = Object.freeze({
  AP: 'ap',
  APA: 'apa',
  BRITISH: 'british',
  CHICAGO: 'chicago',
  NYT: 'nyt',
  WIKIPEDIA: 'wikipedia'
});
var ALLOWED_TITLE_CASE_STYLES = Object.values(TITLE_CASE_STYLES);
var TITLE_CASE_DEFAULT_OPTIONS = Object.freeze({
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
  }
});
var IGNORED_WORDS = [];
var ignorePhrases = (/* unused pure expression or super */ null && ([]));
var CORRECT_PHRASE_CASE = ['The Cybersmile Foundation', 'CO. by Colgate'];
var ARR_UNIQUE_TERMS = (/* unused pure expression or super */ null && ([]));
var ARR_CORRECT_CAPITALIZED = (/* unused pure expression or super */ null && ([]));
;// CONCATENATED MODULE: ./src/TitleCaseHelper.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var TitleCaseHelper = /*#__PURE__*/function () {
  function TitleCaseHelper() {
    _classCallCheck(this, TitleCaseHelper);
  }
  _createClass(TitleCaseHelper, null, [{
    key: "getTitleCaseOptions",
    value: function getTitleCaseOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var lowercaseWords = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var cacheKey = JSON.stringify({
        options: options,
        lowercaseWords: lowercaseWords
      });
      if (TitleCaseHelper.titleCaseOptionsCache.has(cacheKey)) {
        return TitleCaseHelper.titleCaseOptionsCache.get(cacheKey);
      }
      var mergedOptions = _objectSpread(_objectSpread({}, TITLE_CASE_DEFAULT_OPTIONS[options.style || "ap"]), options);
      var mergedArticles = mergedOptions.articles.concat(lowercaseWords).filter(function (word, index, array) {
        return array.indexOf(word) === index;
      });
      var mergedShortConjunctions = mergedOptions.shortConjunctions.concat(lowercaseWords).filter(function (word, index, array) {
        return array.indexOf(word) === index;
      });
      var mergedShortPrepositions = mergedOptions.shortPrepositions.concat(lowercaseWords).filter(function (word, index, array) {
        return array.indexOf(word) === index;
      });
      var mergedReplaceTerms = [].concat(_toConsumableArray((mergedOptions.replaceTerms || []).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
        return [key.toLowerCase(), value];
      })), _toConsumableArray(replaceCasing));
      var result = {
        articles: mergedArticles,
        shortConjunctions: mergedShortConjunctions,
        shortPrepositions: mergedShortPrepositions,
        neverCapitalized: _toConsumableArray(mergedOptions.neverCapitalized),
        replaceTerms: mergedReplaceTerms
      };
      TitleCaseHelper.titleCaseOptionsCache.set(cacheKey, result);
      return result;
    }
  }, {
    key: "isShortConjunction",
    value: function isShortConjunction(word, style) {
      var shortConjunctions = _toConsumableArray(TitleCaseHelper.getTitleCaseOptions({
        style: style
      }).shortConjunctions);
      var wordLowerCase = word.toLowerCase();
      return shortConjunctions.includes(wordLowerCase);
    }
  }, {
    key: "isArticle",
    value: function isArticle(word, style) {
      var articles = TitleCaseHelper.getTitleCaseOptions({
        style: style
      }).articles;
      return articles.includes(word.toLowerCase());
    }
  }, {
    key: "isShortPreposition",
    value: function isShortPreposition(word, style) {
      var _TitleCaseHelper$getT = TitleCaseHelper.getTitleCaseOptions({
          style: style
        }),
        shortPrepositions = _TitleCaseHelper$getT.shortPrepositions;
      return shortPrepositions.includes(word.toLowerCase());
    }
  }, {
    key: "isNeverCapitalized",
    value: function isNeverCapitalized(word, style) {
      var cacheKey = "".concat(style, "_").concat(word.toLowerCase());
      if (TitleCaseHelper.isNeverCapitalizedCache.has(cacheKey)) {
        return TitleCaseHelper.isNeverCapitalizedCache.get(cacheKey);
      }
      var _TitleCaseHelper$getT2 = TitleCaseHelper.getTitleCaseOptions({
          style: style
        }),
        neverCapitalized = _TitleCaseHelper$getT2.neverCapitalized;
      var result = neverCapitalized.includes(word.toLowerCase());
      TitleCaseHelper.isNeverCapitalizedCache.set(cacheKey, result);
      return result;
    }
  }, {
    key: "isShortWord",
    value: function isShortWord(word, style) {
      if (typeof word !== "string") {
        throw new TypeError("Invalid input: word must be a string. Received ".concat(_typeof(word), "."));
      }
      if (!ALLOWED_TITLE_CASE_STYLES.includes(style)) {
        throw new Error("Invalid option: style must be one of ".concat(ALLOWED_TITLE_CASE_STYLES.join(", "), "."));
      }
      return TitleCaseHelper.isShortConjunction(word, style) || TitleCaseHelper.isArticle(word, style) || TitleCaseHelper.isShortPreposition(word, style) || TitleCaseHelper.isNeverCapitalized(word, style);
    }
  }, {
    key: "hasNumbers",
    value: function hasNumbers(word) {
      return /\d/.test(word);
    }
  }, {
    key: "hasUppercaseMultiple",
    value: function hasUppercaseMultiple(word) {
      var count = 0;
      for (var i = 0; i < word.length && count < 2; i++) {
        if (/[A-Z]/.test(word[i])) {
          count++;
        }
      }
      return count >= 2;
    }
  }, {
    key: "hasUppercaseIntentional",
    value: function hasUppercaseIntentional(word) {
      return /[A-Z]/.test(word.slice(1)) && /[a-z]/.test(word.slice(0, -1));
    }
  }, {
    key: "hasSuffix",
    value: function hasSuffix(word) {
      var suffix = "'s";
      return word.length > suffix.length && word.endsWith(suffix);
    }
  }, {
    key: "hasApostrophe",
    value: function hasApostrophe(word) {
      return word.indexOf("'") !== -1;
    }
  }, {
    key: "hasHyphen",
    value: function hasHyphen(word) {
      return word.indexOf('-') !== -1 || word.indexOf('–') !== -1 || word.indexOf('—') !== -1;
    }
  }, {
    key: "hasRomanNumeral",
    value: function hasRomanNumeral(word) {
      if (typeof word !== 'string' || word === '') {
        throw new TypeError('Invalid input: word must be a non-empty string.');
      }
      var romanNumeralRegex = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;
      return romanNumeralRegex.test(word);
    }
  }, {
    key: "hasHyphenRomanNumeral",
    value: function hasHyphenRomanNumeral(word) {
      if (typeof word !== "string" || word === "") {
        throw new TypeError("Invalid input: word must be a non-empty string.");
      }
      var parts = word.split("-");
      for (var i = 0; i < parts.length; i++) {
        if (!TitleCaseHelper.hasRomanNumeral(parts[i])) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: "hasHtmlBreak",
    value: function hasHtmlBreak(word) {
      if (word === "nl2br") {
        return true;
      }
      return false;
    }
  }, {
    key: "startsWithSymbol",
    value: function startsWithSymbol(word) {
      if (typeof word !== 'string') {
        throw new Error("Parameter 'word' must be a string. Received '".concat(_typeof(word), "' instead."));
      }
      if (word.length === 0) {
        return false;
      }
      var firstChar = word.charAt(0);
      return firstChar === '#' || firstChar === '@' || firstChar === '.';
    }
  }, {
    key: "endsWithSymbol",
    value: function endsWithSymbol(word) {
      var symbols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [".", ",", ";", ":", "?", "!"];
      if (typeof word !== "string" || !Array.isArray(symbols)) throw new Error("Invalid arguments");
      return symbols.some(function (symbol) {
        return word.endsWith(symbol);
      }) || symbols.includes(word.slice(-2));
    }
  }, {
    key: "isWordIgnored",
    value: function isWordIgnored(word) {
      var ignoredWords = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : IGNORED_WORDS;
      if (!Array.isArray(ignoredWords)) {
        throw new TypeError("Invalid input: ignoredWords must be an array.");
      }
      if (typeof word !== "string" || word.trim() === "") {
        throw new TypeError("Invalid input: word must be a non-empty string.");
      }
      var lowercasedWord = word.toLowerCase().trim();
      return ignoredWords.includes(lowercasedWord);
    }
  }, {
    key: "isWordInArray",
    value: function isWordInArray(targetWord, wordList) {
      if (!Array.isArray(wordList)) {
        return false;
      }
      return wordList.some(function (word) {
        return word.toLowerCase() === targetWord.toLowerCase();
      });
    }
  }, {
    key: "getCorrectTitleCasing",
    value: function (_getCorrectTitleCasing) {
      function getCorrectTitleCasing(_x) {
        return _getCorrectTitleCasing.apply(this, arguments);
      }
      getCorrectTitleCasing.toString = function () {
        return _getCorrectTitleCasing.toString();
      };
      return getCorrectTitleCasing;
    }(function (word) {
      var includeApostrophe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!word) {
        throw new Error('Word is empty.');
      }
      var lowerCaseWord = word.toLowerCase();
      var uniqueTermsIndex = CORRECT_TITLE_CASE.findIndex(function (w) {
        return w.toLowerCase() === lowerCaseWord;
      });
      if (uniqueTermsIndex >= 0) {
        var correctCase = CORRECT_TITLE_CASE[uniqueTermsIndex];
        if (includeApostrophe && lowerCaseWord.endsWith("'s")) {
          return "".concat(correctCase, "'s");
        } else {
          return correctCase;
        }
      }
      if (includeApostrophe && lowerCaseWord.endsWith("'s")) {
        var baseWord = lowerCaseWord.slice(0, -2);
        var titleCaseBase = getCorrectTitleCasing(baseWord, true);
        return "".concat(titleCaseBase, "'s");
      }
      return lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1);
    })
  }, {
    key: "replaceTerm",
    value: function replaceTerm(word, replaceTermsObj) {
      if (typeof word !== "string" || word === "") {
        throw new TypeError("Invalid input: word must be a non-empty string.");
      }
      if (_typeof(replaceTermsObj) !== "object" || replaceTermsObj === null) {
        throw new TypeError("Invalid input: replaceTermsObj must be a non-null object.");
      }
      var lowercasedWord = word.toLowerCase();
      if (lowercasedWord in replaceTermsObj) {
        return replaceTermsObj[lowercasedWord];
      }
      if (word in replaceTermsObj) {
        return replaceTermsObj[word];
      }
      if (word.toUpperCase() in replaceTermsObj) {
        return replaceTermsObj[word.toUpperCase()];
      }
      return word;
    }
  }, {
    key: "correctSuffix",
    value: function correctSuffix(word, correctTerms) {
      var suffix = "'s";
      var lowerCasedWord = word.toLowerCase();
      if (lowerCasedWord.endsWith(suffix)) {
        var wordWithoutSuffix = word.slice(0, -suffix.length);
        var matchingIndex = correctTerms.findIndex(function (term) {
          return term.toLowerCase() === wordWithoutSuffix.toLowerCase();
        });
        if (matchingIndex >= 0) {
          var correctCase = correctTerms[matchingIndex];
          return correctCase + suffix;
        }
      }
      return word;
    }
  }, {
    key: "correctTerm",
    value: function correctTerm(word, correctTerms) {
      if (typeof word !== "string" || word === "") {
        throw new TypeError("Invalid input: word must be a non-empty string.");
      }
      if (!correctTerms || !Array.isArray(correctTerms)) {
        throw new TypeError("Invalid input: correctTerms must be an array.");
      }
      var parts = word.split(/[-']/);
      var numParts = parts.length;
      var _loop = function _loop() {
        var lowercasedPart = parts[i].toLowerCase();
        var index = correctTerms.findIndex(function (t) {
          return t.toLowerCase() === lowercasedPart;
        });
        if (index >= 0) {
          parts[i] = correctTerms[index];
        }
      };
      for (var i = 0; i < numParts; i++) {
        _loop();
      }
      return parts.join(/[-']/);
    }
  }, {
    key: "correctTermHyphenated",
    value: function correctTermHyphenated(word, style) {
      var hyphenatedWords = word.split("-");
      var capitalizeFirst = function capitalizeFirst(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      };
      var lowercaseRest = function lowercaseRest(word) {
        return word.charAt(0) + word.slice(1).toLowerCase();
      };
      var styleFunctions = {
        ap: function ap(word, index) {
          return index === 0 ? capitalizeFirst(word) : lowercaseRest(word);
        },
        chicago: capitalizeFirst,
        apa: function apa(word, index, length) {
          if (isShortWord(word, style) && index > 0 && index < length - 1) {
            return word.toLowerCase();
          } else {
            return capitalizeFirst(word);
          }
        },
        nyt: function nyt(word, index) {
          return index === 0 ? capitalizeFirst(word) : lowercaseRest(word);
        },
        wikipedia: function wikipedia(word, index) {
          return index === 0 ? capitalizeFirst(word) : lowercaseRest(word);
        }
      };
      var processWord = styleFunctions[style] || lowercaseRest;
      var processedWords = hyphenatedWords.map(function (word, i) {
        var correctedWord = word;
        var lowerCaseWord = word.toLowerCase();
        var uniqueTermsIndex = CORRECT_TITLE_CASE.findIndex(function (w) {
          return w.toLowerCase() === lowerCaseWord;
        });
        if (uniqueTermsIndex >= 0) {
          correctedWord = CORRECT_TITLE_CASE[uniqueTermsIndex];
        } else if (lowerCaseWord.endsWith("'s")) {
          var rootWord = lowerCaseWord.substring(0, lowerCaseWord.length - 2);
          var rootWordIndex = CORRECT_TITLE_CASE.findIndex(function (w) {
            return w.toLowerCase() === rootWord;
          });
          if (rootWordIndex >= 0) {
            correctedWord = "".concat(CORRECT_TITLE_CASE[rootWordIndex], "'s");
          }
        }
        return processWord(correctedWord, i, hyphenatedWords.length);
      });
      return processedWords.join("-");
    }
  }]);
  return TitleCaseHelper;
}(); // export default class TitleCaseValidator {
//     static validateOption(key, value) {
//         if (!Array.isArray(value)) {
//             throw new TypeError(`Invalid option: ${key} must be an array`);
//         }
//         if (!value.every((word) => typeof word === "string")) {
//             throw new TypeError(`Invalid option: ${key} must be an array of strings`);
//         }
//     }
//     static validateOptions(options) {
//         for (const key of Object.keys(options)) {
//             if (key === 'style') {
//                 if (typeof options.style !== 'string') {
//                     throw new TypeError(`Invalid option: ${key} must be a string`);
//                 } else if (!ALLOWED_TITLE_CASE_STYLES.includes(options.style)) {
//                     throw new TypeError(`Invalid option: ${key} must be a string`);
//                 }
//                 continue;
//             }
//             if (key === 'replaceCasing') {
//                 if (!Array.isArray(options.replaceCasing)) {
//                     throw new TypeError(`Invalid option: ${key} must be an array`);
//                 } else {
//                     for (const term of options.replaceCasing) {
//                         if (typeof term !== 'string') {
//                             throw new TypeError(`Invalid option: ${key} must contain only strings`);
//                         }
//                     }
//                 }
//                 continue;
//             }
//             if (!TITLE_CASE_DEFAULT_OPTIONS.hasOwnProperty(key)) {
//                 throw new TypeError(`Invalid option: ${key}`);
//             }
//             TitleCaseValidator.validateOption(key, options[key]);
//         }
//     }
// }
_defineProperty(TitleCaseHelper, "titleCaseOptionsCache", new Map());
_defineProperty(TitleCaseHelper, "isNeverCapitalizedCache", new Map());

;// CONCATENATED MODULE: ./src/TitleCaser.js
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = TitleCaser_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function TitleCaser_toConsumableArray(arr) { return TitleCaser_arrayWithoutHoles(arr) || TitleCaser_iterableToArray(arr) || TitleCaser_unsupportedIterableToArray(arr) || TitleCaser_nonIterableSpread(); }
function TitleCaser_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function TitleCaser_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return TitleCaser_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return TitleCaser_arrayLikeToArray(o, minLen); }
function TitleCaser_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function TitleCaser_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return TitleCaser_arrayLikeToArray(arr); }
function TitleCaser_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function TitleCaser_typeof(obj) { "@babel/helpers - typeof"; return TitleCaser_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, TitleCaser_typeof(obj); }
function TitleCaser_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function TitleCaser_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, TitleCaser_toPropertyKey(descriptor.key), descriptor); } }
function TitleCaser_createClass(Constructor, protoProps, staticProps) { if (protoProps) TitleCaser_defineProperties(Constructor.prototype, protoProps); if (staticProps) TitleCaser_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function TitleCaser_toPropertyKey(arg) { var key = TitleCaser_toPrimitive(arg, "string"); return TitleCaser_typeof(key) === "symbol" ? key : String(key); }
function TitleCaser_toPrimitive(input, hint) { if (TitleCaser_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (TitleCaser_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var TitleCaser = /*#__PURE__*/function () {
  function TitleCaser() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    TitleCaser_classCallCheck(this, TitleCaser);
    this.options = options;
  }
  TitleCaser_createClass(TitleCaser, [{
    key: "toTitleCase",
    value: function toTitleCase(str) {
      try {
        if (typeof str !== 'string') throw new TypeError("Invalid input: input must be a string.");
        if (str.trim().length === 0) throw new TypeError("Invalid input: input must not be empty.");
        if (typeof this.options !== "undefined" && TitleCaser_typeof(this.options) !== "object") throw new TypeError("Invalid options: options must be an object.");
        var _this$options = this.options,
          _this$options$style = _this$options.style,
          style = _this$options$style === void 0 ? "ap" : _this$options$style,
          _this$options$neverCa = _this$options.neverCapitalize,
          neverCapitalize = _this$options$neverCa === void 0 ? [] : _this$options$neverCa;
        var ignoreList = ["nl2br"].concat(TitleCaser_toConsumableArray(neverCapitalize));
        var _TitleCaseHelper$getT = TitleCaseHelper.getTitleCaseOptions(this.options, COMMON_ABBREVIATIONS, replaceCasing),
          articles = _TitleCaseHelper$getT.articles,
          shortConjunctions = _TitleCaseHelper$getT.shortConjunctions,
          shortPrepositions = _TitleCaseHelper$getT.shortPrepositions,
          neverCapitalized = _TitleCaseHelper$getT.neverCapitalized,
          replaceTerms = _TitleCaseHelper$getT.replaceTerms;
        var replaceTermsArray = replaceCasing.map(function (term) {
          return Object.keys(term)[0].toLowerCase();
        });
        var replaceTermsObj = Object.fromEntries(replaceCasing.map(function (term) {
          return [Object.keys(term)[0].toLowerCase(), Object.values(term)[0]];
        }));
        var inputString = str.trim();
        inputString = inputString.replace(/ {2,}/g, function (match) {
          return match.slice(0, 1);
        });
        inputString = inputString.replace(/<br\s*[\/]?>/gi, "nl2br ");
        var words = inputString.split(" ");
        var wordsInTitleCase = words.map(function (word, i) {
          switch (true) {
            case TitleCaseHelper.hasHtmlBreak(word):
              return word;
            case TitleCaseHelper.isWordIgnored(word, ignoreList):
              return word;
            case replaceTermsArray.includes(word.toLowerCase()):
              return replaceTermsObj[word.toLowerCase()];
            case TitleCaseHelper.isWordInArray(word, CORRECT_TITLE_CASE):
              return TitleCaseHelper.correctTerm(word, CORRECT_TITLE_CASE);
            case TitleCaseHelper.hasSuffix(word, style):
              return TitleCaseHelper.correctSuffix(word, CORRECT_TITLE_CASE);
            case TitleCaseHelper.hasHyphen(word):
              return TitleCaseHelper.correctTermHyphenated(word, style);
            case TitleCaseHelper.hasUppercaseIntentional(word):
              return word;
            case TitleCaseHelper.isShortWord(word, style) && i !== 0:
              return i > 0 && TitleCaseHelper.endsWithSymbol(words[i - 1], [':', '?', '!', '.']) ? word.charAt(0).toUpperCase() + word.slice(1) : word.toLowerCase();
            case TitleCaseHelper.endsWithSymbol(word):
              var splitWord = word.split(/([.,\/#!$%\^&\*;:{}=\-_`~()])/g);
              var processedWords = splitWord.map(function (splitWord, j) {
                if (TitleCaseHelper.isWordInArray(splitWord, CORRECT_TITLE_CASE)) return TitleCaseHelper.correctTerm(splitWord, CORRECT_TITLE_CASE);else return j > 0 && TitleCaseHelper.endsWithSymbol(splitWord) ? splitWord.charAt(0).toUpperCase() + splitWord.slice(1) : splitWord.charAt(0).toUpperCase() + splitWord.slice(1);
              });
              return processedWords.join("");
            case TitleCaseHelper.startsWithSymbol(word):
              return !TitleCaseHelper.isWordInArray(word, CORRECT_TITLE_CASE) ? word : TitleCaseHelper.correctTerm(word);
            case TitleCaseHelper.hasRomanNumeral(word):
              return word.toUpperCase();
            case TitleCaseHelper.hasNumbers(word):
              return word;
            default:
              return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          }
        });
        inputString = wordsInTitleCase.join(" ");
        var _iterator = _createForOfIteratorHelper(CORRECT_PHRASE_CASE),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var phrase = _step.value;
            if (inputString.toLowerCase().includes(phrase.toLowerCase())) {
              inputString = inputString.replace(new RegExp(phrase, 'gi'), phrase);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        inputString = inputString.replace(/nl2br /gi, "<br />");
        return inputString;
      } catch (error) {
        throw new Error(error);
      }
    }
  }]);
  return TitleCaser;
}();
/* harmony default export */ const src_TitleCaser = (TitleCaser);

// export function titleCase(nodes = null) {
//     try {
//         if (nodes === null) {
//             nodes = document.querySelectorAll('.title-case');
//         }

//         if (!Array.isArray(nodes)) {
//             nodes = [nodes];
//         }

//         for (const node of nodes) {
//             if (node instanceof HTMLElement) {
//                 const text = node.innerHTML;
//                 const textCase = text.toTitleCase({ style: 'ap', neverCapitalize: ['nl2br'] });
//                 node.innerHTML = textCase;
//             } else {
//                 throw new Error("Invalid argument: nodes must be an array of DOM elements.");
//             }
//         }
//     } catch (error) {
//         throw new Error(error);
//     }
// }
;// CONCATENATED MODULE: ./src/index.js

String.prototype.toTitleCase = function (options) {
  var titleCaser = new src_TitleCaser(options);
  return titleCaser.toTitleCase(this);
};
/******/ })()
;