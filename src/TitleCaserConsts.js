export const commonAbbreviationList = [
	'a', 'an', 'the', 'as', 'at', 'by', 'for', 'in', 'of', 'on',
	'to', 'up', 'yet', 'so', 'but', 'nor', 'or', 'and',
];

export const correctTitleCasingList = [
	// Web Technologies
	'AJAX', 'CSS', 'DOM', 'ES6', 'HTML', 'JavaScript', 'jQuery',
	'MobX', 'SCSS', 'TypeScript', 'Vue.js', '.NET', 'ASP', 'ASPX',
	'MySQL', 'PHP', 'PostgresQL', 'Python', 'SQL', 'GraphQL',
	'HTML5',
	
	// Acronyms/Abbreviations
	'API', 'APIs', 'ASCII', 'CI', 'CircleCI', 'CLI', 'DLL', 'DNS',
	'EC2', 'FTP', 'HTTP', 'HTTPs', 'ICMP', 'IDE', 'IP', 'ISP',
	'JSON', 'JSP', 'LPWAN', 'M2M', 'MQTT', 'OOP', 'REST', 'SSH',
	'SSL', 'TCP', 'UDP', 'URL', 'WLAN', 'WYSIWYG', 'XML', 'YAML',
	'YML', 'IMAP', 'RSS', 'IaaS', 'PaaS', 'SaaS', 'CaaS', 'FaaS',
	'XaaS', 'RaaS', 'IoE', 'IoT', 'LoRa', 'NB-IoT', 'RFID', 'RF',
	'RFI', 'RFQ', 'ECMAScript', 'IO', 'I/O', 'DevOps', 'SecOps',
	'DDoS', 'VoIP', 'AI', 'AR', 'ML', 'VR',
	
	// Misc.
	'w/', 'w/o',
	
	// 'eTerms'
	'e-Book', 'e-Books', 'eBook', 'eBooks', 'eCommerce',
	'eMarket', 'eMarketplace', 'eMarketplaces', 'eMarkets',
	'eReader', 'eShop', 'eShops', 'eStore', 'eStores',
	'E-commerce',
	
	// Accounting terms
	'AP', 'COGS', 'EBIT', 'EPS', 'FIFO', 'GAAP', 'LIFO',
	'P&L', 'ROI', 'SOX', 'TCO', 'VAT',
	
	// Investment terms
	'CAGR', 'DCF', 'ETF', 'IPO', 'IRR', 'M&A', 'NAV', 'PE', 'PEG',
	'PPE', 'ROE', 'S&P', 'TVM', 'VC',
	
	// Marketing terms
	'B2B', 'B2C', 'CMO', 'CPA', 'CPC', 'CPL', 'CPM', 'CRM', 'CTA',
	'CTR', 'SEO', 'SEM', 'SMM', 'USP', 'A/B', 'CTA', 'CTOR',
	'CTR', 'KPI', 'PWA', 'SEM', 'SERP', 'SERPs', 'SMM', 'SMO',
	'FAQ', 'FAQA', 'FAQS', 'UI', 'UI/UX', 'UX', 'T&C', 'TOS',
	'PP', 'CRM', 'PoE', 'PoW', 'PoC', 'A11Y', 'PR',
	
	// Sales terms
	'BANT', 'KPI', 'MQL', 'NPS', 'POS', 'SPIN', 'SQL',
	'SWOT',
	
	// Legal terms
	'AFA', 'ADR', 'CCPA', 'CFAA', 'CISG', 'DMCA', 'EULA', 'GDPR',
	'HIPAA', 'NDA', 'SOW', 'TOS',
	
	// Roles and titles
	'CEO', 'CEOs', 'CFO', 'CFOs', 'CIO', 'CIOs', 'CMO', 'CMOs',
	'COO', 'COOs', 'CPO', 'CPOs', 'CRO', 'CROs', 'CSO', 'CSOs',
	'CTO', 'CTOs', 'EVP', 'EVPs', 'HR', 'HRs', 'SVP', 'SVPs',
	'VP', 'VPs',
	
	// Non-profit organizations
	'NGO', 'NPO', 'NGOs', 'NPOs', 'UN', 'UNESCO', 'UNICEF',
	'UNHCR', 'UNODC', 'UNDP', 'UNFPA', 'UNEP',
	
	'Adobe', 'Airbnb', 'Alibaba', 'Allstate', 'American Express', 'Apple',
	'AT&T', 'BMW', 'Boeing', 'Cisco', 'Citigroup', 'Coca', 'Deloitte', 'Disney',
	'Dropbox', 'ExxonMobil', 'Ford', 'GE', 'General', 'Goldman Sachs', 'Google',
	'Hilton', 'HP', 'IBM', 'Intel', 'JPMorgan', 'Johnson & Johnson', 'LinkedIn',
	"McDonald's", 'Mercedes-Benz', 'Microsoft', 'Nestle', 'Nike', 'Nissan',
	'Oracle', 'PepsiCo', 'Pfizer', 'Salesforce', 'Samsung', 'Shell', 'Sony',
	'Tesla', 'Toyota', 'Uber', 'Verizon', 'Visa', 'Walmart', 'Wells Fargo',
	'Yahoo', 'Zara', 'IKEA', 'Facebook', 'YouTube', 'Instagram', 'Twitter',
	'TensorFlow', 'Amazon', 'Netflix', 'eBay', 'iPhone', 'iPad', 'iPod',
	'PlayStation', 'PayPal', 'GitHub', 'GitLab', 'CodeIgniter', 'WordPress',
	'WooCommerce', 'MongoDB', 'JIRA', 'HubSpot', 'AirDrop', 'AirPlay', 'AirPods',
	'AirTags', 'FinalCut', 'GarageBand', 'iBooks', 'iCloud', 'iLife', 'iMac',
	'iMessage', 'iMovie', 'iPhoto', 'iWatch', 'iWork', 'LogicPro', 'macOS',
	'ProTools', 'QuickTime', 'AdWords', 'AdSense', 'TikTok', 'Slack', 'Trello',
	'Zoom', 'Twitch', 'Snapchat', 'WhatsApp', 'Telegram', 'Discord', 'Reddit',
	'Quora', 'StackOverflow', 'StackExchange', 'Coca-Cola',
	'AWS', 'GCP', 'VMware', 'CVS', 'ESL', 'EE',
	
	// Sports
	'NBA', 'NCAA', 'NFL', 'WWE', 'WWF', 'FIFA',
	
	// Time-related, numbers, and measurements: Includes abbreviations for
	'a.m.', 'p.m.', 'ca.', 'cc.', 'fig.', 'pl.', 'pt.', 'rev.',
	'sr.', 'v.', 'vol.', 'et al.', 'pp.', 'p.',
	
	// Professional abbreviations, degrees, and titles: Includes abbreviations
	'ph.d.', 'm.d.', 'd.d.s.', 'd.m.d.', 'd.o.', 'd.c.', 'd.v.m.',
	'd.n.p.', 'd.p.m.', 'd.s.w.', 'd.s.n.', 'd.n.sc.', 'd.n.a.',
	'd.n.t.', 'd.n.p.t.', 'd.n.o.', 'd.n.m.', 'd.n.e.', 'd.n.s.',
	'd.n.p.s.',
	
	// Academic & literary abbreviations: Includes abbreviations for academic
	'adj.', 'adv.', 'cf.', 'cm.', 'co.', 'corp.', 'dept.',
	'dist.', 'ed.', 'edn.', 'esp.', 'etc.', 'ex.', 'i.e.', 'e.g.',
	'op. cit.', 'vs.',
	
	// Commercial
	'Ltd.', 'Co.', 'Inc.', 'St.', 'Ave.', 'Bldg.', 'No.',
];

export const wordReplacementsList = [
	{ 'a.k.a': 'AKA' },
	{ 'a.s.a.p': 'ASAP' },
	{ 'angularjs': 'Angular.js' },
	{ 'back-end': 'Backend' },
	{ 'd.i.y': 'DIY' },
	{ 'e-book': 'eBook' },
	{ 'e-books': 'eBooks' },
	{ 'e-commerce': 'eCommerce' },
	{ 'ecom': 'eCommerce' },
	{ 'ecommerce': 'eCommerce' },
	{ 'f.a.q': 'FAQ' },
	{ 'f.a.q.a': 'FAQs' },
	{ 'f.a.q.s': 'FAQs' },
	{ 'f.y.i': 'FYI' },
	{ 'front-end': 'Frontend' },
	{ 'full-stack': 'Fullstack' },
	{ 'nextjs': 'Next.js' },
	{ 'nodejs': 'Node.js' },
	{ 'nuxtjs': 'Nuxt.js' },
	{ 'reactjs': 'React.js' },
	{ 't.b.d': 'TBD' },
	{ 'vuejs': 'Vue.js' },
	{ 'phd': 'ph.d.' },
];

// ! TODO
// const wordReplacementsList = [
//     { word: 'a.k.a', replacement: 'AKA' },
//     { word: 'a.s.a.p', replacement: 'ASAP' },
//     { word: 'angularjs', replacement: 'Angular.js' },
//     { word: 'back-end', replacement: 'Backend' },
//     { word: 'd.i.y', replacement: 'DIY' },
//     { word: 'e-book', replacement: 'eBook' },
//     { word: 'e-books', replacement: 'eBooks' },
//     { word: 'e-commerce', replacement: 'eCommerce' },
//     { word: 'ecom', replacement: 'eCommerce' },
//     { word: 'ecommerce', replacement: 'eCommerce' },
//     { word: 'f.a.q', replacement: 'FAQ' },
//     { word: 'f.a.q.a', replacement: 'FAQs' },
//     { word: 'f.a.q.s', replacement: 'FAQs' },
//     { word: 'f.y.i', replacement: 'FYI' },
//     { word: 'front-end', replacement: 'Frontend' },
//     { word: 'full-stack', replacement: 'Fullstack' },
//     { word: 'nextjs', replacement: 'Next.js' },
//     { word: 'nodejs', replacement: 'Node.js' },
//     { word: 'nuxtjs', replacement: 'Nuxt.js' },
//     { word: 'reactjs', replacement: 'React.js' },
//     { word: 't.b.d', replacement: 'TBD' },
//     { word: 'vuejs', replacement: 'Vue.js' },
//     { word: 'phd', replacement: 'ph.d.' },
// ];

export const titleCaseStylesList = Object.freeze ( {
	AP: 'ap',
	APA: 'apa',
	BRITISH: 'british',
	CHICAGO: 'chicago',
	NYT: 'nyt',
	WIKIPEDIA: 'wikipedia'
} );
export const allowedTitleCaseStylesList = Object.values ( titleCaseStylesList );
export const titleCaseDefaultOptionsList = Object.freeze ( {
	ap: {
		shortConjunctionsList: [ 'and', 'but', 'or', 'for', 'nor', 'yet', 'so' ],
		articlesList: [ 'a', 'an', 'the' ],
		shortPrepositionsList: [ 'as', 'at', 'by', 'in', 'of', 'on', 'to', 'up', 'via' ],
		neverCapitalizedList: []
	},
	apa: {
		shortConjunctionsList: [ 'and', 'as', 'but', 'by', 'for', 'in', 'nor', 'of', 'on', 'or', 'so', 'to', 'yet' ],
		articlesList: [ 'a', 'an', 'the' ],
		shortPrepositionsList: [ 'as', 'at', 'by', 'for', 'in', 'of', 'on', 'to', 'up', 'via' ],
		neverCapitalizedList: []
	},
	british: {
		shortConjunctionsList: [ 'and', 'but', 'or', 'for', 'nor', 'yet', 'so' ],
		articlesList: [ 'a', 'an', 'the' ],
		shortPrepositionsList: [ 'as', 'at', 'by', 'in', 'of', 'on', 'to', 'up', 'via' ],
		neverCapitalizedList: []
	},
	chicago: {
		shortConjunctionsList: [ 'and', 'but', 'or', 'for', 'nor', 'yet', 'so' ],
		articlesList: [ 'a', 'an', 'the' ],
		shortPrepositionsList: [ 'as', 'at', 'by', 'for', 'in', 'of', 'on', 'to', 'up', 'with', 'via' ],
		neverCapitalizedList: [ 'etc.' ]
	},
	nyt: {
		shortConjunctionsList: [ 'and', 'but', 'or', 'for', 'nor', 'yet', 'so' ],
		articlesList: [ 'a', 'an', 'the' ],
		shortPrepositionsList: [ 'as', 'at', 'by', 'in', 'of', 'on', 'to', 'up', 'via' ],
		neverCapitalizedList: []
	},
	wikipedia: {
		shortConjunctionsList: [ 'and', 'as', 'but', 'for', 'if', 'nor', 'or', 'so', 'yet' ],
		articlesList: [ 'a', 'an', 'the' ],
		shortPrepositionsList: [ 'as', 'at', 'by', 'in', 'of', 'on', 'to', 'up', 'via' ],
		neverCapitalizedList: []
	},
} );

export const ignoredWordList = [];
export const correctPhraseCasingList = [
	'The Cybersmile Foundation',
	'CO. by Colgate',
	"The Simpsons",
];