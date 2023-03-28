export const COMMON_ABBREVIATIONS = [
    // Articles and prepositions, conjunctions: Includes abbreviations for articles and prepositions, conjunctions, and subordinating conjunctions.
    'a', 'an', 'the', 'as', 'at', 'by', 'for', 'in', 'of', 'on', 'to', 'up', 'yet', 'so', 'but', 'nor', 'or', 'and',
];

export const CORRECT_TITLE_CASE = [
    // Web Technologies
    'AJAX', 'CSS', 'DOM', 'ES6', 'HTML', 'JavaScript', 'jQuery', 'MobX', 'SCSS', 'TypeScript', 'Vue.js', '.NET', 'ASP', 'ASPX', 'MySQL', 'PHP', 'PostgreSQL', 'Python', 'SQL', 'GraphQL', 'HTML5',

    //  Acronyms/Abbreviations:
    'API', 'APIs', 'ASCII', 'AWS', 'CI', 'CircleCI', 'CLI', 'DLL', 'DNS', 'EC2', 'FTP', 'HTTP', 'HTTPs', 'ICMP', 'IDE', 'IP', 'ISP', 'JSON', 'JSP', 'LPWAN', 'M2M', 'MQTT', 'OOP', 'REST', 'SSH', 'SSL', 'TCP', 'UDP', 'URL', 'WLAN', 'WYSIWYG', 'XML', 'YAML', 'YML', 'IMAP', 'RSS', 'IaaS', 'PaaS', 'SaaS', 'CaaS', 'FaaS', 'XaaS', 'RaaS',
    'IoE', 'IoT', 'LoRa', 'NB-IoT', 'RFID', 'RF', 'RFI', 'RFQ', 'ECMAScript', 'IO', 'I/O', 'DevOps', 'SecOps', 'DDoS', 'VoIP',

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
    'IKEA', 'Facebook', 'YouTube', 'Instagram', 'Twitter', 'Google', 'TensorFlow', 'Microsoft', 'Amazon', 'Netflix', 'LinkedIn', 'Airbnb', 'eBay', 'iPhone', 'iPad', 'iPod', 'PlayStation', 'PayPal', 'GitHub', 'GitLab', 'Salesforce', 'CodeIgniter', 'WordPress', 'WooCommerce', 'MongoDB', 'JIRA', 'HubSpot', 'AirDrop', 'AirPlay', 'AirPods', 'AirTags', 'FinalCut', 'GarageBand', 'iBooks', 'iCloud', 'iLife', 'iMac', 'iMessage', 'iMovie', 'iPhoto', 'iPod', 'iTunes', 'iWatch', 'iWork', 'iWork', 'LogicPro', 'macOS', 'ProTools', 'QuickTime', 'AdWords', 'AdSense', 'TikTok', 'Uber', 'Dropbox', 'Slack', 'Trello', 'Zoom', 'Twitch', 'Snapchat', 'WhatsApp', 'Telegram', 'Discord', 'Reddit', 'Quora', 'StackOverflow', 'StackExchange', 'Coca-Cola', 'AWS', 'GCP', 

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
    'w/', 'w/o'
];

export const replaceCasing = [
    { 'phd': 'ph.d.' },
    { 'f.y.i': 'FYI' },
    { 't.b.d': 'TBD' },
    { 'a.k.a': 'AKA' },
    { 'a.s.a.p': 'ASAP' },
    { 'd.i.y': 'DIY' },
    { 'f.a.q': 'FAQ' },
    { 'f.a.q.s': 'FAQs' },
    { 'f.a.q.a': 'FAQs' },
    { 'angularjs': 'Angular.js' },
    { 'reactjs': 'React.js' },
    { 'vuejs': 'Vue.js' },
    { 'nextjs': 'Next.js' },
    { 'nuxtjs': 'Nuxt.js' },
    { 'nodejs': 'Node.js' },
    { 'full-stack': 'Fullstack' },
    { 'front-end': 'Frontend' },
    { 'back-end': 'Backend' },
    { 'e-book': 'eBook' },
    { 'e-books': 'eBooks' },
    { 'e-commerce': 'eCommerce' },
    { 'ecommerce': 'eCommerce' },
    { 'ecom': 'eCommerce' }
];

export const TITLE_CASE_STYLES = Object.freeze({
    AP: 'ap',
    APA: 'apa',
    BRITISH: 'british',
    CHICAGO: 'chicago',
    NYT: 'nyt',
    WIKIPEDIA: 'wikipedia'
});
export const ALLOWED_TITLE_CASE_STYLES = Object.values(TITLE_CASE_STYLES);
export const TITLE_CASE_DEFAULT_OPTIONS = Object.freeze({
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


export const IGNORED_WORDS = [];
export const ignorePhrases = [];

export const CORRECT_PHRASE_CASE = [
    'The Cybersmile Foundation',
    'CO. by Colgate',
];

export const ARR_UNIQUE_TERMS = [];
export const ARR_CORRECT_CAPITALIZED = [];
