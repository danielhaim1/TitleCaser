import { TitleCaser } from '../index.js';

const createTest = (description, input, expected) => {
    test(description, () => {
        const titleCaser = new TitleCaser({ style: 'ap' });
        const actualOutput = titleCaser.toTitleCase(input);

        if (actualOutput !== expected) {
            throw new Error(`\n  Expected: "${expected}"\n  Received: "${actualOutput}"`);
        }
    });
};

describe(`
    Testing Combined Words that End with Symbol`, () => {
    createTest('Capitalizes country code "US" correctly in a geopolitical context',
        'Championing Self-Acceptance: Landmark Initiative',
        'Championing Self-Acceptance: Landmark Initiative');
});

describe(`
    Testing Disambiguation of Acronym vs. Pronoun for Alpha2/3 Country Codes ("US", "UK", "EU", etc.)
    Includes edge cases, regional context detection, and AP-style title casing rules.
  `, () => {

    // --- US Acronym - Regional Context ---
    createTest('Capitalizes "US" when preceded by "the"',
        'They signed the treaty with the us',
        'They Signed the Treaty with the US');

    createTest('Capitalizes "US" when preceded by "from the"',
        'Support came from the us',
        'Support Came from the US');

    createTest('Capitalizes "US" when preceded by "via"',
        'The message was relayed via us',
        'The Message Was Relayed via US');

    createTest('Capitalizes "US" when preceded by "among the"',
        'There was strong collaboration among the us',
        'There Was Strong Collaboration among the US');

    createTest('Capitalizes "US" before a government-related word',
        'Discussing the us government policies.',
        'Discussing the US Government Policies.');

    createTest('Capitalizes "US" before a military-related word',
        'Discussing the us military strategies.',
        'Discussing the US Military Strategies.');

    createTest('Capitalizes "US" correctly in a geopolitical context',
        'Discussing the us policies.',
        'Discussing the US Policies.');

    createTest('Capitalizes "US" correctly in a geopolitical context',
        'Partnering with the us Military',
        'Partnering with the US Military');

    // --- US Acronym - End of Sentence ---
    createTest('Capitalizes "US" as a regional acronym at the end of the sentence',
        'This policy was created by the us',
        'This Policy Was Created by the US');

    // --- "us" as Pronoun ---
    createTest('Does not capitalize "us" in casual speech',
        'They want to talk to us',
        'They Want to Talk to Us');

    createTest('Does not capitalize "us" in emotional context',
        'They really care about us',
        'They Really Care About Us');

    createTest('Does not capitalize "us" in passive voice',
        'The system was built for us',
        'The System Was Built for Us');

    createTest('Does not capitalize "us" with compound verb',
        'She stood near us',
        'She Stood Near Us');

    createTest('Does not capitalize "us" in inverted clause',
        'Not everything depends on us',
        'Not Everything Depends on Us');

    createTest('1. Does not capitalize "us" when used as a pronoun',
        'It\u2019s up to us to decide.',
        'It\u2019s up to Us to Decide.');

    createTest('2. Does not capitalize "us" when used as a pronoun',
        'You can partner with us.',
        'You Can Partner with Us.');

    createTest('Does not capitalize "us" before a government-related word',
        'It\u2019s up to us in the US military to decide.',
        'It\u2019s up to Us in the US Military to Decide.');

    createTest('Does not capitalize "us" before a military-related word',
        'It\u2019s up to us in the military to decide.',
        'It\u2019s up to Us in the Military to Decide.');

    createTest('Does not capitalize "us" in common phrases',
        'It has a varied landscape, and us, the citizens, appreciate it.',
        'It Has a Varied Landscape, and Us, the Citizens, Appreciate It.');

    // --- UK and Other Regional Acronyms ---
    createTest('Capitalizes "UK" at the end with safe context',
        'This initiative was led by the uk',
        'This Initiative Was Led by the UK');

    createTest('Capitalizes "UK" with preceding indicator and trailing comma',
        'The uk, despite its size, has a significant impact.',
        'The UK, Despite Its Size, Has a Significant Impact.');

    createTest('Capitalizes "UK" with preceding indicator before a government-related word',
        'The uk, with its strong government, leads the way.',
        'The UK, with Its Strong Government, Leads the Way.');

    createTest('Capitalizes "UK" with preceding indicator before a territory-related word',
        'The uk, with its vast territory, has diverse landscapes.',
        'The UK, with Its Vast Territory, Has Diverse Landscapes.');

    // --- Mixed Acronym/Pronoun Scenarios ---
    createTest('Handles multiple instances of country codes and pronouns',
        'We visited the uk and the US, and both were memorable.',
        'We Visited the UK and the US, and Both Were Memorable.');

    createTest('Handles multiple instances of country codes and pronouns before government-related words',
        'We visited the uk and the US, and both have strong military forces.',
        'We Visited the UK and the US, and Both Have Strong Military Forces.');

    createTest('Handles multiple instances of country codes and pronouns before talks-related words',
        'We visited the uk and the US, and both engage in diplomatic talks.',
        'We Visited the UK and the US, and Both Engage in Diplomatic Talks.');

    createTest('Handles multiple instances of country codes and pronouns before a bill-related word',
        'We visited the uk and the US, and both consider a bill for environmental protection.',
        'We Visited the UK and the US, and Both Consider a Bill for Environmental Protection.');

    // --- USA and Acronym Variants ---
    createTest('Capitalizes "USA" in a formal context',
        'The usa has a varied landscape.',
        'The USA Has a Varied Landscape.');

    createTest('Capitalizes "USA" in a formal context before a bill-related word',
        'The usa introduces a new bill for economic reform.',
        'The USA Introduces a New Bill for Economic Reform.');

    createTest('AP-style acronym handling',
        'URGE U.S. AND CANADIAN GOVERNMENT OFFICIALS TO PROTECT NORTH ATLANTIC RIGHT WHALES',
        'Urge U.S. And Canadian Government Officials to Protect North Atlantic Right Whales');

    // --- Phrase and Style Edge Cases ---
    createTest('Test phrases "On & Off"',
        'We Are On & Off The Field',
        'We Are On & Off the Field');

    createTest('Test phrases "On & Off"',
        'we are on and off the field',
        'We Are On and Off the Field');
});

describe('Testing Hyphenated and Apostrophized Word Capitalization', () => {

    // --- Hyphenated Words ---
    createTest('Capitalizes both parts of hyphenated brand name "t-mobile"',
        't-mobile',
        'T-Mobile');

    createTest('Capitalizes both parts of hyphenated brand name "coca-cola"',
        'coca-cola',
        'Coca-Cola');

    createTest('Capitalizes both parts of general hyphenated term "e-commerce"',
        'e-commerce',
        'E-Commerce');

    // --- Apostrophized Words ---
    createTest('Capitalizes word with apostrophe "o\'connor"',
        "o'connor",
        "O’Connor");
});

describe('Test Basic Title Casing Options', () => {
    const createTest = (description, input, expected) => {
        test(description, () => {
            const titleCaser = new TitleCaser();
            const actualOutput = titleCaser.toTitleCase(input);
            expect(actualOutput).toEqual(expected);
        });
    };

    createTest('Converts basic lowercase phrase to title case',
        'hello world',
        'Hello World');

    createTest('Handles excessive spacing and lowercase articles',
        'the book   of     life',
        'The Book of Life');

    createTest('AP-style with proper name replacements and brand casing',
        'nodejs development on aws: an in-depth tutorial on server-side javascript deployment',
        'Node.js Development on AWS: An In-depth Tutorial on Server-side JavaScript Deployment');

    createTest('Preserves correct casing in hyphenated names',
        'louis-iv',
        'Louis-IV');

    createTest('Properly capitalizes prepositions beyond 3 letters',
        "what's to say about this?",
        "What's to Say About This?");
});

describe('Test TitleCaser Class Methods', () => {

    test('setReplaceTerms applies bulk term replacements', () => {
        const titleCaser = new TitleCaser({ style: 'ap' });
        const replaceTerms = [
            { 'hi': 'Hello' },
            { 'globe': 'World' },
            { 'two': 'One' },
        ];
        titleCaser.setReplaceTerms(replaceTerms);

        const input = 'hi globe, two';
        const expected = 'Hello World, One';
        const output = titleCaser.toTitleCase(input);

        expect(output).toEqual(expected);
    });

    test('addExactPhraseReplacements overrides specific phrases', () => {
        const titleCaser = new TitleCaser({ style: 'ap' });
        const phraseReplacement = [
            { 'the correct phrase': 'ThE CoRrEcT Way' }
        ];
        titleCaser.addExactPhraseReplacements(phraseReplacement);

        const input = 'this is the correct phrase';
        const expected = 'This Is ThE CoRrEcT Way';
        const output = titleCaser.toTitleCase(input);

        expect(output).toEqual(expected);
    });

    test('removeReplaceTerm deletes a single replacement rule', () => {
        const titleCaser = new TitleCaser({ style: 'apa' });
        titleCaser.setReplaceTerms([
            { 'x': 'Y' },
            { 'y': 'X' }
        ]);

        titleCaser.removeReplaceTerm('x');

        const input = 'x should be y';
        const expected = 'X Should Be X';
        const output = titleCaser.toTitleCase(input);

        expect(output).toEqual(expected);
    });
});

describe('Test Variation Stability', () => {
    const createTest = (description, options, input, expectedOutput) => {
        test(description, () => {
            const titleCaser = new TitleCaser(options);
            const actualOutput = titleCaser.toTitleCase(input);
            expect(actualOutput).toEqual(expectedOutput);
        });
    };

    // --- AP Style ---
    createTest('Capitalization and word replacements', { style: 'ap' },
        'GOOgle and VMWARE',
        'Google and VMware');

    createTest('Brand Capitalization with reserved casing', { style: 'ap' },
        'NERDs Candy',
        'NERDs Candy');

    createTest('Possessives and colon usage', { style: 'ap' },
        "the iphone's impact on modern communication: a sociolinguistic analysis",
        "The iPhone's Impact on Modern Communication: A Sociolinguistic Analysis");

    createTest('Hyphenated compound tech terms', { style: 'ap' },
        'BACK-end and front-end',
        'Backend and Frontend');

    createTest('Acronym handling and colon', { style: 'ap' },
        'revolutionizing the publishing industry: insights from a cto on ebook development and innovation',
        'Revolutionizing the Publishing Industry: Insights from a CTO on eBook Development and Innovation');

    // --- Chicago Style ---
    createTest('Colon and comparison phrase', { style: 'chicago' },
        'VMware vs. VirtualBox: a comparative study of virtualization software',
        'VMware vs. VirtualBox: A Comparative Study of Virtualization Software');

    createTest('Hyphenated tutorial format', { style: 'chicago' },
        'nodejs development on aws: an in-depth tutorial on server-side javascript deployment',
        'Node.js Development on AWS: An In-Depth Tutorial on Server-Side JavaScript Deployment');

    createTest('Custom replacements and tech brands', { style: 'chicago' },
        'Back-End Web Development: Building Scalable APIs with nodejs',
        'Backend Web Development: Building Scalable APIs with Node.js');

    createTest('Smart quotes enabled', { style: 'chicago', smartQuotes: true },
        "\"Never underestimate the power o'persistence,\"",
        '“Never Underestimate the Power O’Persistence,”');

    createTest('Long informal sentence with acronyms', { style: 'chicago' },
        'I Love Connecting with My Online Friends, but Sometimes I Prefer to Hang Out with My Friends IRL',
        'I Love Connecting with My Online Friends, but Sometimes I Prefer to Hang Out with My Friends IRL');

    // --- APA Style ---
    createTest('Colon-separated title in APA style', { style: 'apa' },
        'the art of negotiation: strategies for successful business deals',
        'The Art of Negotiation: Strategies for Successful Business Deals');

    createTest('Colon and apostrophe casing', { style: 'apa' },
        'the science of nutrition: debunking myths and fads',
        'The Science of Nutrition: Debunking Myths and Fads');

    createTest('Short conjunctions and brand normalization', { style: 'apa' },
        'the impact of social media on mental health: a study of instagram, TIKTOK, and SnapChat',
        'The Impact of Social Media on Mental Health: A Study of Instagram, TikTok, and Snapchat');

    // --- NYT & Wikipedia Style ---
    createTest('NYT-style acronym and colon usage', { style: 'nyt' },
        'the future of ai: how iot and machine learning will change the world',
        'The Future of AI: How IoT and Machine Learning Will Change the World');

    createTest('Wikipedia style with DevOps capitalization', { style: 'wikipedia' },
        'the future of devops: how to prepare for the next era of software development',
        'The Future of DevOps: How to Prepare for the Next Era of Software Development');

    createTest('Wikipedia style capitalization with colon', { style: 'wikipedia' },
        'The business of fashion: how luxury brands set themselves apart',
        'The Business of Fashion: How Luxury Brands Set Themselves Apart');
});

describe('Test Reserved Words', () => {
    const options = { style: 'chicago' };

    // --- Reserved Word Handling ---
    test('Transforms single reserved word correctly', () => {
        const titleCaser = new TitleCaser(options);
        const input = 'GOOGle tensorflow';
        const expected = 'Google TensorFlow';
        expect(titleCaser.toTitleCase(input)).toEqual(expected);
    });

    test('Transforms sentence with reserved word and colon', () => {
        const titleCaser = new TitleCaser(options);
        const input = 'GooGlE vs. VirtualBox: a comparative study of virtualization software';
        const expected = 'Google vs. VirtualBox: A Comparative Study of Virtualization Software';
        expect(titleCaser.toTitleCase(input)).toEqual(expected);
    });

    test('Handles possessive form of reserved word', () => {
        const titleCaser = new TitleCaser(options);
        const input = "GOOGle's tensorflow";
        const expected = "Google's TensorFlow";
        expect(titleCaser.toTitleCase(input)).toEqual(expected);
    });

    // --- Brand Name Replacements ---
    test('Handles specific brand name replacements', () => {
        const titleCaser = new TitleCaser(options);
        titleCaser.setReplaceTerms([
            { mcdonalds: "McDonald's" },
            { skoda: "Škoda" },
            { 'cyber-security': 'Cybersecurity' },
        ]);

        const testCases = [
            { input: 'cyber-security', expected: 'Cybersecurity' },
            { input: 'skoda', expected: 'Škoda' },
            { input: 'mcdonalds', expected: "McDonald's" },
        ];

        testCases.forEach(({ input, expected }) => {
            expect(titleCaser.toTitleCase(input)).toEqual(expected);
        });
    });

    // --- HTML <br> Line Breaks ---
    test('Handles HTML <br> with colon (spaced)', () => {
        const titleCaser = new TitleCaser(options);
        const input = 'Exploring the future of devops:<br>Preparing for the next era of software development';
        const expected = 'Exploring the Future of DevOps: <br> Preparing for the Next Era of Software Development';
        expect(titleCaser.toTitleCase(input)).toEqual(expected);
    });

    test('Handles HTML <br> with full sentence split', () => {
        const titleCaser = new TitleCaser(options);
        const input = 'Exploring the Future of DevOps:<br>Guidelines for Preparing for the Next Era in Software Development';
        const expected = 'Exploring the Future of DevOps: <br> Guidelines for Preparing for the Next Era in Software Development';
        expect(titleCaser.toTitleCase(input)).toEqual(expected);
    });

    test('Handles <br> with no space after colon', () => {
        const titleCaser = new TitleCaser(options);
        const input = 'The future of DevOps:<br>How to prepare for the next era of software development';
        const expected = 'The Future of DevOps: <br> How to Prepare for the Next Era of Software Development';
        expect(titleCaser.toTitleCase(input)).toEqual(expected);
    });

    // --- Special Characters & Whitespace ---
    test('Handles ampersand (&) symbol without encoding', () => {
        const titleCaser = new TitleCaser(options);
        const input = 'This & That';
        const expected = 'This & That';
        expect(titleCaser.toTitleCase(input)).toEqual(expected);
    });

    test('Handles untrimmed white spaces', () => {
        const titleCaser = new TitleCaser(options);
        const input = `      This    string   has   too   many  spaces  `;
        const expected = 'This String Has Too Many Spaces';
        expect(titleCaser.toTitleCase(input)).toEqual(expected);
    });
});

describe('Test addReplaceTerm Method', () => {
    let titleCaser;

    beforeEach(() => {
        titleCaser = new TitleCaser({ style: 'ap' });
    });

    test('Adds a new replacement term correctly', () => {
        const term = 'js';
        const replacement = 'JavaScript';

        expect(titleCaser.wordReplacementsList.some(obj => term in obj)).toBeFalsy();
        titleCaser.addReplaceTerm(term, replacement);
        expect(titleCaser.wordReplacementsList.some(obj => obj[term] === replacement)).toBeTruthy();
    });

    test('Updates an existing replacement term', () => {
        const term = 'js';
        const initial = 'JavaScript';
        const updated = 'JS';

        titleCaser.addReplaceTerm(term, initial);
        expect(titleCaser.wordReplacementsList.some(obj => obj[term] === initial)).toBeTruthy();

        titleCaser.addReplaceTerm(term, updated);
        expect(titleCaser.wordReplacementsList.some(obj => obj[term] === updated)).toBeTruthy();
    });
});
