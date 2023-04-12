(()=>{var e={429:(e,t,r)=>{var n,o;e=r.nmd(e),n=[t,r(485),r(858)],void 0===(o=function(r,n,o){"use strict";var i;function a(e,t,r){return(t=d(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,i,a,s=[],u=!0,l=!1;try{if(i=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=i.call(r)).done)&&(s.push(n.value),s.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return s}}(e,t)||l(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e){return function(e){if(Array.isArray(e))return c(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||l(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){if(e){if("string"==typeof e)return c(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?c(e,t):void 0}}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function p(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,d(n.key),n)}}function d(e){var t=function(e,t){if("object"!==f(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!==f(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===f(t)?t:String(t)}Object.defineProperty(r,"__esModule",{value:!0}),t.TitleCaser=void 0,o=(i=o)&&i.__esModule?i:{default:i};var y=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options=t,this.wordReplacementsList=n.wordReplacementsList}var t,r,i;return t=e,r=[{key:"toTitleCase",value:function(e){try{if(0===e.trim().length)throw new TypeError("Invalid input: input must not be empty.");if("string"!=typeof e)throw new TypeError("Invalid input: input must be a string.");if(void 0!==this.options&&"object"!==f(this.options))throw new TypeError("Invalid options: options must be an object.");var t=this.options,r=t.style,i=void 0===r?"ap":r,a=t.neverCapitalize,s=void 0===a?[]:a,c=t.replaceTermList,p=void 0===c?n.wordReplacementsList:c,d=["nl2br"].concat(u(s)),y=o.default.getTitleCaseOptions(this.options,n.commonAbbreviationList,n.wordReplacementsList),m=(y.articlesList,y.shortConjunctionsList,y.shortPrepositionsList,y.neverCapitalizedList,y.replaceTerms,p.map((function(e){return Object.keys(e)[0].toLowerCase()}))),h=Object.fromEntries(p.map((function(e){return[Object.keys(e)[0].toLowerCase(),Object.values(e)[0]]}))),v=e.trim(),b=(v=(v=v.replace(/ {2,}/g,(function(e){return e.slice(0,1)}))).replace(/<br\s*\/?>/gi,"nl2br ")).split(" ");v=b.map((function(e,t){switch(!0){case o.default.isWordAmpersand(e):case o.default.hasHtmlBreak(e):case o.default.isWordIgnored(e,d):return e;case m.includes(e.toLowerCase()):return h[e.toLowerCase()];case o.default.isWordInArray(e,n.correctTitleCasingList):return o.default.correctTerm(e,n.correctTitleCasingList);case o.default.hasSuffix(e,i):return o.default.correctSuffix(e,n.correctTitleCasingList);case o.default.hasHyphen(e):return o.default.correctTermHyphenated(e,i);case o.default.hasUppercaseIntentional(e):return e;case o.default.isShortWord(e,i)&&0!==t:return t>0&&o.default.endsWithSymbol(b[t-1],[":","?","!","."])?e.charAt(0).toUpperCase()+e.slice(1):e.toLowerCase();case o.default.endsWithSymbol(e):var r=e.split(/([.,\/#!$%\^&\*;:{}=\-_`~()])/g).map((function(e,t){return o.default.isWordInArray(e,n.correctTitleCasingList)?o.default.correctTerm(e,n.correctTitleCasingList):(t>0&&o.default.endsWithSymbol(e),e.charAt(0).toUpperCase()+e.slice(1))}));return r.join("");case o.default.startsWithSymbol(e):return o.default.isWordInArray(e,n.correctTitleCasingList)?o.default.correctTerm(e):e;case o.default.hasRomanNumeral(e):return e.toUpperCase();case o.default.hasNumbers(e):return e;default:return e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()}})).join(" ");var C,w=function(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=l(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,s=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return a=e.done,e},e:function(e){s=!0,i=e},f:function(){try{a||null==r.return||r.return()}finally{if(s)throw i}}}}(n.correctPhraseCasingList);try{for(w.s();!(C=w.n()).done;){var g=C.value;v.toLowerCase().includes(g.toLowerCase())&&(v=v.replace(new RegExp(g,"gi"),g))}}catch(e){w.e(e)}finally{w.f()}return v=v.replace(/nl2br /gi,"<br />")}catch(e){throw new Error(e)}}},{key:"setReplaceTerms",value:function(e){if("object"!==f(e))throw new TypeError("Invalid argument: replace terms must be an object.");Object.entries(e).forEach((function(e){var t=s(e,2),r=t[0],o=t[1],i=n.wordReplacementsList.findIndex((function(e){return e[r]}));-1!==i?n.wordReplacementsList[i][r]=o:n.wordReplacementsList.push(a({},r,o))})),this.options.wordReplacementsList=n.wordReplacementsList}},{key:"addReplaceTerm",value:function(e,t){if("string"!=typeof e||"string"!=typeof t)throw new TypeError("Invalid argument: term and replacement must be strings.");var r=this.wordReplacementsList.findIndex((function(t){return t[e]}));-1!==r?this.wordReplacementsList[r][e]=t:this.wordReplacementsList.push(a({},e,t)),this.options.wordReplacementsList=this.wordReplacementsList}},{key:"removeReplaceTerm",value:function(e){if("string"!=typeof e)throw new TypeError("Invalid argument: term must be a string.");var t=this.wordReplacementsList.findIndex((function(t){return Object.keys(t)[0]===e}));if(-1===t)throw new Error("Term '".concat(e,"' not found in word replacements list."));this.wordReplacementsList.splice(t,1),this.options.wordReplacementsList=this.wordReplacementsList}},{key:"setStyle",value:function(e){if("string"!=typeof e)throw new TypeError("Invalid argument: style must be a string.");this.options.style=e}}],r&&p(t.prototype,r),i&&p(t,i),Object.defineProperty(t,"prototype",{writable:!1}),e}();t.TitleCaser=y,"object"===f(e)&&e.exports&&(e.exports={TitleCaser:y})}.apply(t,n))||(e.exports=o)},485:(e,t)=>{var r;void 0===(r=function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),t.wordReplacementsList=t.titleCaseStylesList=t.titleCaseDefaultOptionsList=t.ignoredWordList=t.correctTitleCasingList=t.correctPhraseCasingList=t.commonAbbreviationList=t.allowedTitleCaseStylesList=void 0;t.commonAbbreviationList=["a","an","the","as","at","by","for","in","of","on","to","up","yet","so","but","nor","or","and"];t.correctTitleCasingList=["AJAX","CSS","DOM","ES6","HTML","JavaScript","jQuery","MobX","SCSS","TypeScript","Vue.js",".NET","ASP","ASPX","MySQL","PHP","PostgresQL","Python","SQL","GraphQL","HTML5","API","APIs","ASCII","CI","CircleCI","CLI","DLL","DNS","EC2","FTP","HTTP","HTTPs","ICMP","IDE","IP","ISP","JSON","JSP","LPWAN","M2M","MQTT","OOP","REST","SSH","SSL","TCP","UDP","URL","WLAN","WYSIWYG","XML","YAML","YML","IMAP","RSS","IaaS","PaaS","SaaS","CaaS","FaaS","XaaS","RaaS","IoE","IoT","LoRa","NB-IoT","RFID","RF","RFI","RFQ","ECMAScript","IO","I/O","DevOps","SecOps","DDoS","VoIP","AI","AR","ML","VR","w/","w/o","e-Book","e-Books","eBook","eBooks","eCommerce","eMarket","eMarketplace","eMarketplaces","eMarkets","eReader","eShop","eShops","eStore","eStores","E-commerce","AP","COGS","EBIT","EPS","FIFO","GAAP","LIFO","P&L","ROI","SOX","TCO","VAT","CAGR","DCF","ETF","IPO","IRR","M&A","NAV","PE","PEG","PPE","ROE","S&P","TVM","VC","B2B","B2C","CMO","CPA","CPC","CPL","CPM","CRM","CTA","CTR","SEO","SEM","SMM","USP","A/B","CTA","CTOR","CTR","KPI","PWA","SEM","SERP","SERPs","SMM","SMO","FAQ","FAQA","FAQS","UI","UI/UX","UX","T&C","TOS","PP","CRM","PoE","PoW","PoC","A11Y","PR","BANT","KPI","MQL","NPS","POS","SPIN","SQL","SWOT","AFA","ADR","CCPA","CFAA","CISG","DMCA","EULA","GDPR","HIPAA","NDA","SOW","TOS","CEO","CEOs","CFO","CFOs","CIO","CIOs","CMO","CMOs","COO","COOs","CPO","CPOs","CRO","CROs","CSO","CSOs","CTO","CTOs","EVP","EVPs","HR","HRs","SVP","SVPs","VP","VPs","NGO","NPO","NGOs","NPOs","UN","UNESCO","UNICEF","UNHCR","UNODC","UNDP","UNFPA","UNEP","Adobe","Airbnb","Alibaba","Allstate","American Express","Apple","AT&T","BMW","Boeing","Cisco","Citigroup","Coca","Deloitte","Disney","Dropbox","ExxonMobil","Ford","GE","General","Goldman Sachs","Google","Hilton","HP","IBM","Intel","JPMorgan","Johnson & Johnson","LinkedIn","McDonald's","Mercedes-Benz","Microsoft","Nestle","Nike","Nissan","Oracle","PepsiCo","Pfizer","Salesforce","Samsung","Shell","Sony","Tesla","Toyota","Uber","Verizon","Visa","Walmart","Wells Fargo","Yahoo","Zara","IKEA","Facebook","YouTube","Instagram","Twitter","TensorFlow","Amazon","Netflix","eBay","iPhone","iPad","iPod","PlayStation","PayPal","GitHub","GitLab","CodeIgniter","WordPress","WooCommerce","MongoDB","JIRA","HubSpot","AirDrop","AirPlay","AirPods","AirTags","FinalCut","GarageBand","iBooks","iCloud","iLife","iMac","iMessage","iMovie","iPhoto","iWatch","iWork","LogicPro","macOS","ProTools","QuickTime","AdWords","AdSense","TikTok","Slack","Trello","Zoom","Twitch","Snapchat","WhatsApp","Telegram","Discord","Reddit","Quora","StackOverflow","StackExchange","Coca-Cola","AWS","GCP","VMware","CVS","ESL","EE","NBA","NCAA","NFL","WWE","WWF","FIFA","a.m.","p.m.","ca.","cc.","fig.","pl.","pt.","rev.","sr.","v.","vol.","et al.","pp.","p.","ph.d.","m.d.","d.d.s.","d.m.d.","d.o.","d.c.","d.v.m.","d.n.p.","d.p.m.","d.s.w.","d.s.n.","d.n.sc.","d.n.a.","d.n.t.","d.n.p.t.","d.n.o.","d.n.m.","d.n.e.","d.n.s.","d.n.p.s.","adj.","adv.","cf.","cm.","co.","corp.","dept.","dist.","ed.","edn.","esp.","etc.","ex.","i.e.","e.g.","op. cit.","vs.","Ltd.","Co.","Inc.","St.","Ave.","Bldg.","No."];t.wordReplacementsList=[{"a.k.a":"AKA"},{"a.s.a.p":"ASAP"},{angularjs:"Angular.js"},{"back-end":"Backend"},{"d.i.y":"DIY"},{"e-book":"eBook"},{"e-books":"eBooks"},{"e-commerce":"eCommerce"},{ecom:"eCommerce"},{ecommerce:"eCommerce"},{"f.a.q":"FAQ"},{"f.a.q.a":"FAQs"},{"f.a.q.s":"FAQs"},{"f.y.i":"FYI"},{"front-end":"Frontend"},{"full-stack":"Fullstack"},{nextjs:"Next.js"},{nodejs:"Node.js"},{nuxtjs:"Nuxt.js"},{reactjs:"React.js"},{"t.b.d":"TBD"},{vuejs:"Vue.js"},{phd:"ph.d."}];var r=Object.freeze({AP:"ap",APA:"apa",BRITISH:"british",CHICAGO:"chicago",NYT:"nyt",WIKIPEDIA:"wikipedia"});t.titleCaseStylesList=r;var n=Object.values(r);t.allowedTitleCaseStylesList=n;var o=Object.freeze({ap:{shortConjunctionsList:["and","but","or","for","nor","yet","so"],articlesList:["a","an","the"],shortPrepositionsList:["as","at","by","in","of","on","to","up","via"],neverCapitalizedList:[]},apa:{shortConjunctionsList:["and","as","but","by","for","in","nor","of","on","or","so","to","yet"],articlesList:["a","an","the"],shortPrepositionsList:["as","at","by","for","in","of","on","to","up","via"],neverCapitalizedList:[]},british:{shortConjunctionsList:["and","but","or","for","nor","yet","so"],articlesList:["a","an","the"],shortPrepositionsList:["as","at","by","in","of","on","to","up","via"],neverCapitalizedList:[]},chicago:{shortConjunctionsList:["and","but","or","for","nor","yet","so"],articlesList:["a","an","the"],shortPrepositionsList:["as","at","by","for","in","of","on","to","up","with","via"],neverCapitalizedList:["etc."]},nyt:{shortConjunctionsList:["and","but","or","for","nor","yet","so"],articlesList:["a","an","the"],shortPrepositionsList:["as","at","by","in","of","on","to","up","via"],neverCapitalizedList:[]},wikipedia:{shortConjunctionsList:["and","as","but","for","if","nor","or","so","yet"],articlesList:["a","an","the"],shortPrepositionsList:["as","at","by","in","of","on","to","up","via"],neverCapitalizedList:[]}});t.titleCaseDefaultOptionsList=o;t.ignoredWordList=[];t.correctPhraseCasingList=["The Cybersmile Foundation","CO. by Colgate","The Simpsons"]}.apply(t,[t]))||(e.exports=r)},858:(e,t,r)=>{var n,o;n=[t,r(485)],void 0===(o=function(e,r){"use strict";function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,i,a,s=[],u=!0,l=!1;try{if(i=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=i.call(r)).done)&&(s.push(n.value),s.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return s}}(e,t)||l(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e){return function(e){if(Array.isArray(e))return c(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||l(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){p(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=l(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,s=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return a=e.done,e},e:function(e){s=!0,i=e},f:function(){try{a||null==r.return||r.return()}finally{if(s)throw i}}}}function l(e,t){if(e){if("string"==typeof e)return c(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?c(e,t):void 0}}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function f(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,d(n.key),n)}}function p(e,t,r){return(t=d(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function d(e){var t=function(e,t){if("object"!==n(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!==n(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===n(t)?t:String(t)}Object.defineProperty(e,"__esModule",{value:!0}),t.default=void 0;var y=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,a,l;return t=e,l=[{key:"validateOption",value:function(e,t){if(!Array.isArray(t))throw new TypeError("Invalid option: ".concat(e," must be an array"));if(!t.every((function(e){return"string"==typeof e})))throw new TypeError("Invalid option: ".concat(e," must be an array of strings"))}},{key:"validateOptions",value:function(e){for(var t=0,n=Object.keys(e);t<n.length;t++){var o=n[t];if("style"!==o)if("wordReplacementsList"!==o){if(!r.titleCaseDefaultOptionsList.hasOwnProperty(o))throw new TypeError("Invalid option: ".concat(o));this.TitleCaseValidator.validateOption(o,e[o])}else{if(!Array.isArray(e.wordReplacementsList))throw new TypeError("Invalid option: ".concat(o," must be an array"));var i,a=u(e.wordReplacementsList);try{for(a.s();!(i=a.n()).done;)if("string"!=typeof i.value)throw new TypeError("Invalid option: ".concat(o," must contain only strings"))}catch(e){a.e(e)}finally{a.f()}}else{if("string"!=typeof e.style)throw new TypeError("Invalid option: ".concat(o," must be a string"));if(!r.allowedTitleCaseStylesList.includes(e.style))throw new TypeError("Invalid option: ".concat(o," must be a string"))}}}},{key:"getTitleCaseOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],a=JSON.stringify({options:t,lowercaseWords:n});if(e.titleCaseOptionsCache.has(a))return e.titleCaseOptionsCache.get(a);var u=s(s({},r.titleCaseDefaultOptionsList[t.style||"ap"]),t),l=u.articlesList.concat(n).filter((function(e,t,r){return r.indexOf(e)===t})),c=u.shortConjunctionsList.concat(n).filter((function(e,t,r){return r.indexOf(e)===t})),f=u.shortPrepositionsList.concat(n).filter((function(e,t,r){return r.indexOf(e)===t})),p=[].concat(i((u.replaceTerms||[]).map((function(e){var t=o(e,2),r=t[0],n=t[1];return[r.toLowerCase(),n]}))),i(r.wordReplacementsList)),d={articlesList:l,shortConjunctionsList:c,shortPrepositionsList:f,neverCapitalizedList:i(u.neverCapitalizedList),replaceTerms:p};return e.titleCaseOptionsCache.set(a,d),d}},{key:"isShortConjunction",value:function(t,r){var n=i(e.getTitleCaseOptions({style:r}).shortConjunctionsList),o=t.toLowerCase();return n.includes(o)}},{key:"isArticle",value:function(t,r){return e.getTitleCaseOptions({style:r}).articlesList.includes(t.toLowerCase())}},{key:"isShortPreposition",value:function(t,r){return e.getTitleCaseOptions({style:r}).shortPrepositionsList.includes(t.toLowerCase())}},{key:"isNeverCapitalized",value:function(t,r){var n="".concat(r,"_").concat(t.toLowerCase());if(e.isNeverCapitalizedCache.has(n))return e.isNeverCapitalizedCache.get(n);var o=e.getTitleCaseOptions({style:r}).neverCapitalizedList.includes(t.toLowerCase());return e.isNeverCapitalizedCache.set(n,o),o}},{key:"isShortWord",value:function(t,o){if("string"!=typeof t)throw new TypeError("Invalid input: word must be a string. Received ".concat(n(t),"."));if(!r.allowedTitleCaseStylesList.includes(o))throw new Error("Invalid option: style must be one of ".concat(r.allowedTitleCaseStylesList.join(", "),"."));return e.isShortConjunction(t,o)||e.isArticle(t,o)||e.isShortPreposition(t,o)||e.isNeverCapitalized(t,o)}},{key:"hasNumbers",value:function(e){return/\d/.test(e)}},{key:"hasUppercaseMultiple",value:function(e){for(var t=0,r=0;r<e.length&&t<2;r++)/[A-Z]/.test(e[r])&&t++;return t>=2}},{key:"hasUppercaseIntentional",value:function(e){return/[A-Z]/.test(e.slice(1))&&/[a-z]/.test(e.slice(0,-1))}},{key:"hasSuffix",value:function(e){return e.length>"'s".length&&e.endsWith("'s")}},{key:"hasApostrophe",value:function(e){return-1!==e.indexOf("'")}},{key:"hasHyphen",value:function(e){return-1!==e.indexOf("-")||-1!==e.indexOf("–")||-1!==e.indexOf("—")}},{key:"hasRomanNumeral",value:function(e){if("string"!=typeof e||""===e)throw new TypeError("Invalid input: word must be a non-empty string.");return/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i.test(e)}},{key:"hasHyphenRomanNumeral",value:function(t){if("string"!=typeof t||""===t)throw new TypeError("Invalid input: word must be a non-empty string.");for(var r=t.split("-"),n=0;n<r.length;n++)if(!e.hasRomanNumeral(r[n]))return!1;return!0}},{key:"hasHtmlBreak",value:function(e){return"nl2br"===e}},{key:"hasUnicodeSymbols",value:function(e){return/[^\x00-\x7F\u00A0-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u02AF\u02B0-\u02FF\u0300-\u036F\u0370-\u03FF\u0400-\u04FF\u0500-\u052F\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u0780-\u07BF\u07C0-\u07FF\u0800-\u083F\u0840-\u085F\u0860-\u087F\u0880-\u08AF\u08B0-\u08FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF]/.test(e)}},{key:"hasCurrencySymbols",value:function(e){return/[^\x00-\x7F\u00A0-\u00FF\u20AC\u20A0-\u20B9\u20BD\u20A1-\u20A2\u00A3-\u00A5\u058F\u060B\u09F2-\u09F3\u0AF1\u0BF9\u0E3F\u17DB\u20A6\u20A8\u20B1\u2113\u20AA-\u20AB\u20AA\u20AC-\u20AD\u20B9]/.test(e)}},{key:"isWordAmpersand",value:function(e){return/&amp;|&/.test(e)}},{key:"startsWithSymbol",value:function(e){if("string"!=typeof e)throw new Error("Parameter 'word' must be a string. Received '".concat(n(e),"' instead."));if(0===e.length)return!1;var t=e.charAt(0);return"#"===t||"@"===t||"."===t}},{key:"escapeSpecialCharacters",value:function(e){return e.replace(/[&<>"']/g,(function(e){switch(e){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"'":return"&#x27;";default:return e}}))}},{key:"unescapeSpecialCharacters",value:function(e){return e.replace(/&amp;|&lt;|&gt;|&quot;|&#x27;/g,(function(e){switch(e){case"&amp;":return"&";case"&lt;":return"<";case"&gt;":return">";case"&quot;":return'"';case"&#x27;":return"'";default:return e}}))}},{key:"endsWithSymbol",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[".",",",";",":","?","!"];if("string"!=typeof e||!Array.isArray(t))throw new Error("Invalid arguments");return t.some((function(t){return e.endsWith(t)}))||t.includes(e.slice(-2))}},{key:"isWordIgnored",value:function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r.ignoredWordList;if(!Array.isArray(n))throw new TypeError("Invalid input: ignoredWords must be an array.");if("string"!=typeof e||""===e.trim())throw new TypeError("Invalid input: word must be a non-empty string.");return t=e.toLowerCase().trim(),n.includes(t)}},{key:"isWordInArray",value:function(e,t){return!!Array.isArray(t)&&t.some((function(t){return t.toLowerCase()===e.toLowerCase()}))}},{key:"replaceTerm",value:function(e,t){if("string"!=typeof e||""===e)throw new TypeError("Invalid input: word must be a non-empty string.");if(!t||"object"!==n(t))throw new TypeError("Invalid input: replaceTermObj must be a non-null object.");var r;if(r=e.toLowerCase(),t.hasOwnProperty(r))return t[r];if(t.hasOwnProperty(e))return t[e];var o=e.toUpperCase();return t.hasOwnProperty(o)?t[o]:e}},{key:"correctSuffix",value:function(e,t){if("string"!=typeof e||""===e)throw new TypeError("Invalid input: word must be a non-empty string.");if(!t||!Array.isArray(t)||t.some((function(e){return"string"!=typeof e})))throw new TypeError("Invalid input: correctTerms must be an array of strings.");if(/'s$/i.test(e)){var r=e.slice(0,-2),n=t.findIndex((function(e){return e.toLowerCase()===r.toLowerCase()}));if(n>=0){var o=t[n];return"".concat(o,"'s")}var i=r.charAt(0).toUpperCase()+r.slice(1);return"".concat(i,"'s")}return e}},{key:"correctTerm",value:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:/[-']/;if("string"!=typeof e||""===e)throw new TypeError("Invalid input: word must be a non-empty string.");if(!t||!Array.isArray(t))throw new TypeError("Invalid input: correctTerms must be an array.");if(!("string"==typeof r||Array.isArray(r)||r instanceof RegExp))throw new TypeError("Invalid input: delimiters must be a string, an array of strings, or a regular expression.");"string"==typeof r?r=new RegExp("[".concat(r,"]")):Array.isArray(r)&&(r=new RegExp("[".concat(r.join(""),"]")));for(var n=e.split(r),o=n.length,i=function(){var e=n[a].toLowerCase(),r=t.findIndex((function(t){return t.toLowerCase()===e}));r>=0&&(n[a]=t[r])},a=0;a<o;a++)i();return n.join(r.source.charAt(0))}},{key:"correctTermHyphenated",value:function(t,n){var o=t.split("-"),i=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},a=function(e){return e.charAt(0)+e.slice(1).toLowerCase()},s={ap:function(e,t){return 0===t?i(e):a(e)},chicago:i,apa:function(t,r,o){return e.isShortWord(t,n)&&r>0&&r<o-1?t.toLowerCase():i(t)},nyt:function(e,t){return 0===t?i(e):a(e)},wikipedia:function(e,t){return 0===t?i(e):a(e)}},u=s[n]||a,l=o.map((function(e,t){if(/^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i.test(e))return e.toUpperCase();var n=e,i=e.toLowerCase(),a=r.correctTitleCasingList.findIndex((function(e){return e.toLowerCase()===i}));if(a>=0)n=r.correctTitleCasingList[a];else if(i.endsWith("'s")){var s=i.substring(0,i.length-2),l=r.correctTitleCasingList.findIndex((function(e){return e.toLowerCase()===s}));l>=0&&(n="".concat(r.correctTitleCasingList[l],"'s"))}return u(n,t,o.length)}));return l.join("-")}}],(a=null)&&f(t.prototype,a),l&&f(t,l),Object.defineProperty(t,"prototype",{writable:!1}),e}();t.default=y,p(y,"TitleCaseValidator",void 0),p(y,"titleCaseOptionsCache",new Map),p(y,"isNeverCapitalizedCache",new Map)}.apply(t,n))||(e.exports=o)},352:(e,t,r)=>{var n,o;n=[t,r(429)],void 0===(o=function(e,t){"use strict";function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"TitleCaser",{enumerable:!0,get:function(){return t.TitleCaser}}),"function"!=typeof String.prototype.toTitleCase&&(String.prototype.toTitleCase=function(e){return new t.TitleCaser(e).toTitleCase(this)}),"object"===("undefined"==typeof window?"undefined":r(window))&&(window.TitleCaser=t.TitleCaser)}.apply(t,n))||(e.exports=o)}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={id:n,loaded:!1,exports:{}};return e[n](i,i.exports,r),i.loaded=!0,i.exports}r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e);r(352)})();