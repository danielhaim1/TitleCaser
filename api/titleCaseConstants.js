export const ARR_LOWERCASE_TERMS = ['a.m.', 'p.m.', 'adj.', 'adv.', 'al.', 'et al.', 'fig.', 'op. cit.', 'i.e.', 'e.g.', 'ca.', 'cc.', 'cf.', 'cm.', 'co.', 'corp.', 'dept.', 'dist.', 'ed.', 'edn.', 'etc.', 'ex.', 'min.', 'max.', 'pl.', 'pt.', 'rev.', 'sr.', 'st.', 'v.', 'vs.', 'esp.', 'fig.', 'vol.', 'pp.', 'p.', 'ph.d.', 'm.d.', 'd.d.s.', 'd.m.d.', 'd.o.', 'd.c.', 'd.v.m.', 'd.n.p.', 'd.p.m.', 'd.s.w.', 'd.s.n.', 'd.n.sc.', 'd.n.p.', 'd.n.a.', 'd.n.t.', 'd.n.p.t.', 'd.n.o.', 'd.n.m.', 'd.n.e.', 'd.n.s.', 'd.n.p.s.', 'w/', 'w/o', 'and', 'or', 'but', 'nor', 'a', 'an', 'the', 'as', 'at', 'by', 'for', 'in', 'of', 'on', 'to', 'up', 'yet', 'so'];

export const ARR_UNIQUE_TERMS = [
    // Files
    'AVI', 'BMP', 'CSV', 'DAT', 'DMP', 'DOC', 'DOCX', 'EPS', 'FLV', 'GIF', 'HTM', 'HTML', 'HTML5', 'IIQ', 'INDD', 'INI', 'JPEG', 'JPG', 'JSON', 'JSP', 'KEY', 'LOG', 'M4A', 'MKV', 'MOV', 'MP3', 'MP4', 'MPG', 'MRW', 'MSG', 'ODF', 'ODG', 'ODP', 'ODS', 'ODT', 'OGG', 'ORF', 'OTF', 'PDF', 'PEF', 'PNG', 'PPT', 'PPTX', 'PS', 'PSD', 'RAF', 'RAR', 'RAW', 'RGB', 'RW2', 'RWL', 'SITX', 'SQL', 'SVG', 'SYS', 'TAR', 'TEX', 'TMP', 'TTF', 'TXT', 'WAV', 'WAV', 'WEBM', 'WEBP', 'WMV', 'WOFF', 'WOFF2', 'XLS', 'XLSX', 'XML', 'XPI', 'XPS', 'ZIP',

    // Business titles
    'CCO', 'CCOs', 'CDO', 'CDOs', 'CEO', 'CFOs', 'CHRO', 'CHROs', 'CIO', 'CIOs', 'CMO', 'CMOs', 'COO', 'COOs', 'CPO', 'CPOs', 'CRO', 'CROs', 'CSO', 'CSOs', 'CTO', 'CTOs', 'EVP', 'EVPs', 'HR', 'HRs', 'SVP', 'SVPs', 'VP', 'VPs',

    // Programming
    '.NET', 'AJAX', 'API', 'APIs', 'ASCII', 'ASP', 'ASPX', 'AWS', 'CI', 'CircleCI', 'CLI', 'CSS', 'DLL', 'DNS', 'DOM', 'EC2', 'ES6', 'FTP', 'GCP', 'HTML', 'HTTP', 'HTTPs', 'ICMP', 'IDE', 'IP', 'ISP', 'JS', 'JS', 'JSON', 'JSP', 'LPWAN', 'M2M', 'MobX', 'MQTT', 'MySQL', 'OOP', 'PHP', 'REST', 'SCSS', 'SEO', 'SSH', 'SSH', 'SSL', 'TCP', 'UDP', 'URL', 'Vue.js', 'WLAN', 'WYSIWYG', 'XML', 'YAML', 'YML', 'IMAP', 'RSS', 'IaaS', 'PaaS', 'SaaS', 'CaaS', 'FaaS', 'XaaS', 'IoE', 'IoT', 'LoRa', 'NB-IoT', 'RFID', 'RF', 'RFI', 'RFQ', 'MySQL', 'PostgreSQL', 'PyCharm', 'JavaScript', 'ECMAScript', 'GraphQL', 'TypeScript', 'jQuery', 'IO', 'I/O',

    'AI', 'AR', 'ML', 'VR',

    'A/B', 'CPC', 'CTA', 'CTOR', 'CTR', 'KPI', 'PWA', 'ROI', 'SEM', 'SERP', 'SERPs', 'SMM', 'SMO', 'FAQ', 'FAQA', 'FAQS', 'CMS', 'UI', 'UI/UX', 'UX', 'T&C', 'TOS', 'PP', 'CRM',

    'e-Book', 'e-Books', 'E-commerce', 'eBook', 'eBooks', 'eCommerce', 'eMarket', 'eMarketplace', 'eMarketplaces', 'eMarkets', 'eReader', 'eShop', 'eShops', 'eStore', 'eStores',

    // Non-profit organizations
    'NGO', 'NPO', 'UN', 'UNESCO', 'UNICEF', 'UNHCR', 'UNODC', 'UNDP', 'UNFPA', 'UNEP',
    'NGOs', 'NPOs', 'UNDPs', 'UNEPs', 'UNESCOs', 'UNFPAs', 'UNHCRs', 'UNICEFs', 'UNODCs', 'UNs',

    // Brands:
    'IKEA', 'Facebook', 'YouTube', 'Instagram', 'Twitter', 'Google', 'Microsoft', 'Amazon', 'Netflix',
    'LinkedIn', 'Airbnb', 'eBay', 'iPhone', 'iPad', 'iPod', 'PlayStation', 'PayPal', 'GitHub',
    'GitLab', 'Salesforce', 'CodeIgniter', 'WordPress', 'WooCommerce', 'MongoDB', 'JIRA', 'HubSpot',

    // Sports
    'NBA', 'NCAA', 'NFL', 'WWE', 'WWF', 'FIFA',

    // Misc.
    'A11Y', 'PoE', 'PoW', 'PoC', 'DevOps', 'SecOps', 'DDoS', 'VoIP',
    'Ltd.', 'Co.', 'Inc.', 'St.', 'Ave.', 'Bldg.', 'No.',
];

// Plan to deprecate this in favor of the above
export const ARR_CORRECT_CAPITALIZED = [];

export const ARR_CORRECT_TERMS = {
    'phd': 'ph.d.',
    'f.y.i': 'FYI',
    't.b.d': 'TBD',
    'a.k.a': 'AKA',
    'a.s.a.p': 'ASAP',
    'd.i.y': 'DIY',
    'f.a.q': 'FAQ',

    'Angular.js': 'AngularJS',
    'ReactJS': 'React.js',
    'React': 'React.js',
    'VueJS': 'Vue.js',
    'nextjs': 'Next.js',
    'nuxtjs': 'Nuxt.js',

    'full-stack': 'Fullstack',
    'front-end': 'Frontend',
    'back-end': 'Backend',

    'e-book': 'eBook',
    'e-books': 'eBooks',

    'e-commerce': 'eCommerce',
    'ecommerce': 'eCommerce',
    'ecom': 'eCommerce',

    'nodejs': 'Node.js'
};

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
export const IGNORED_TITLE_CASE_WORDS = [];
export const IGNORED_TITLE_CASE_PHRASES = [];