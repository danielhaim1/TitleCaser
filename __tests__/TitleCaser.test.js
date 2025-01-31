import { TitleCaser } from '../index.js';
import { AcronymManager } from '../src/TitleCaserUtils';

const createTest = (description, input, expected) => {
    test(description, () => {
        const titleCaser = new TitleCaser({
            style: 'ap'
        });
        const actualOutput = titleCaser.toTitleCase(input);
        expect(actualOutput).toEqual(expected);
    });
};

describe(`
    Testing Combined Words that End with Symbol`, () => {
    createTest('Capitalizes country code "US" correctly in a geopolitical context',
        'Championing Self-Acceptance: Landmark Initiative',
        'Championing Self-Acceptance: Landmark Initiative');
});

describe(`
    Testing Acronym/Pronoun of Alpha2/3 Country Codes`, () => {
    createTest('Capitalizes country code "US" correctly in a geopolitical context',
        'Discussing the us policies.',
        'Discussing the US Policies.');

    createTest('Capitalizes country code "US" correctly in a geopolitical context',
        'Partner with us',
        'Partner With Us');

    createTest('Test phrases "On & Off"',
        'We Are On & Off The Field',
        'We Are On & Off the Field');

    createTest('Test phrases "On & Off"',
        'We Are On and Off The Field',
        'We Are On and Off the Field');

    createTest('Capitalizes country code "US" correctly in a geopolitical context',
        'Partnering with the US Military',
        'Partnering With the US Military');
    
    createTest('1. Does not capitalize "us" when used as a pronoun',
        'It’s up to us to decide.',
        'It’s up to Us to Decide.');

    createTest('2. Does not capitalize "us" when used as a pronoun',
        'You can partner with us.',
        'You Can Partner With Us.');

    createTest('3. Does not capitalize "us" when used as a pronoun',
        'partner with us',
        'Partner With Us');

    createTest('Capitalizes country code "UK" with preceding indicator and trailing comma',
        'The uk, despite its size, has a significant impact.',
        'The UK, Despite Its Size, Has a Significant Impact.');

    createTest('Handles multiple instances of country codes and pronouns',
        'We visited the uk and the US, and both were memorable.',
        'We Visited the UK and the US, and Both Were Memorable.');

    createTest('Does not capitalize "us" when used in common phrases',
        'It has a varied landscape, and us, the citizens, appreciate it.',
        'It Has a Varied Landscape, and Us, the Citizens, Appreciate It.');

    createTest('Capitalizes "USA" in a formal context',
        'The usa has a varied landscape.',
        'The USA Has a Varied Landscape.');

    createTest('Capitalizes "US" before a government-related word',
        'Discussing the us government policies.',
        'Discussing the US Government Policies.');

    createTest('Does not capitalize "us" before a government-related word',
        'It’s up to us in government to decide.',
        'It’s up to Us in Government to Decide.');

    createTest('Capitalizes "UK" with preceding indicator before a government-related word',
        'The uk, with its strong government, leads the way.',
        'The UK, With Its Strong Government, Leads the Way.');

    createTest('Handles multiple instances of country codes and pronouns before government-related words',
        'We visited the uk and the US, and both have strong military forces.',
        'We Visited the UK and the US, and Both Have Strong Military Forces.');

    createTest('Capitalizes "US" before a military-related word',
        'Discussing the us military strategies.',
        'Discussing the US Military Strategies.');

    createTest('Does not capitalize "us" before a military-related word',
        'It’s up to us in military to decide.',
        'It’s up to Us in Military to Decide.');

    createTest('Capitalizes "UK" with preceding indicator before a territory-related word',
        'The UK, with its vast territory, has diverse landscapes.',
        'The UK, With Its Vast Territory, Has Diverse Landscapes.');

    createTest('Handles multiple instances of country codes and pronouns before talks-related words',
        'We visited the uk and the US, and both engage in diplomatic talks.',
        'We Visited the UK and the US, and Both Engage in Diplomatic Talks.');

    createTest('Does not capitalize "us" before a talks-related word',
        'It’s important for us to participate in international talks.',
        'It’s Important for Us to Participate in International Talks.');

    createTest('Capitalizes "USA" in a formal context before a bill-related word',
        'The usa introduces a new bill for economic reform.',
        'The USA Introduces a New Bill for Economic Reform.');

    createTest('Handles multiple instances of country codes and pronouns before a bill-related word',
        'We visited the uk and the US, and both consider a bill for environmental protection.',
        'We Visited the UK and the US, and Both Consider a Bill for Environmental Protection.');
});

describe('Testing Hyphen and Apostrophe Bug Fix', () => {
    createTest('Correctly formats hyphenated word "t-mobile"',
        't-mobile',
        'T-Mobile');

    createTest('Correctly formats hyphenated word "coca-cola"',
        'coca-cola',
        'Coca-Cola');

    createTest('Correctly formats hyphenated word "e-commerce"',
        'e-commerce',
        'E-Commerce');

    createTest('Correctly formats word with apostrophe "o\'connor"',
        "o'connor",
        "O'connor");
});

describe(`
    Test Basic Options`, () => {
    const createTest = (description, input, expected) => {
        test(description, () => {
            const titleCaser = new TitleCaser();
            const actualOutput = titleCaser.toTitleCase(input);
            expect(actualOutput).toEqual(expected);
        });
    };

    createTest('Default title case conversion',
        'hello world',
        'Hello World');

    createTest('Customized title case conversion',
        'the book   of     life',
        'The Book of Life');

    createTest('AP-style title case conversion with replacements',
        'nodejs development on aws: an in-depth tutorial on server-side javascript deployment',
        'Node.js Development on AWS: An In-depth Tutorial on Server-side JavaScript Deployment');

    createTest('AP-style title case conversion with replacements',
        'louis-iv',
        'Louis-IV');

    createTest('Capitalize suffix word in sentence',
        "what's to say about this?",
        "What's to Say About This?");
});

describe(`
    Test Methods`, () => {
    test("setReplaceTerms", () => {
        const titleCaser = new TitleCaser({
            style: 'ap'
        });
        const replaceTerms = [
            { 'hi': 'Hello' },
            { 'globe': 'World' },
            { 'two': 'One' },
        ];
        titleCaser.setReplaceTerms(replaceTerms);
        const input = "hi globe, two";
        const expectedOutput = "Hello World, One";
        const actualOutput = titleCaser.toTitleCase(input);
        expect(actualOutput).toEqual(expectedOutput);
    });
    test("addExactPhraseReplacements", () => {
        const titleCaser = new TitleCaser({
            style: 'ap'
        });

        const newPhrase = [
            { 'the correct phrase': 'ThE CoRrEcT Way' }
        ];
        titleCaser.addExactPhraseReplacements(newPhrase);
        const input = "this is the correct phrase";
        const expectedOutput = "This Is ThE CoRrEcT Way";
        const actualOutput = titleCaser.toTitleCase(input);
        expect(actualOutput).toEqual(expectedOutput);
    });
    test("removeReplaceTerm", () => {
        const titleCaser = new TitleCaser({
            style: 'apa'
        });

        const replaceTerms = [
            { 'x': 'Y' },
            { 'y': 'X' }
        ];

        // Set multiple replacement terms using setReplaceTerms()
        titleCaser.setReplaceTerms(replaceTerms);

        // Use removeReplaceTerm() to remove a replace term
        titleCaser.removeReplaceTerm('x');

        // Use descriptive variable names for the input and expected output
        const inputString = "x should be y";
        const expectedOutput = "X Should Be X";

        // Call toTitleCase() to convert the input string to title case
        const outputString = titleCaser.toTitleCase(inputString);
        // Check that the output matches the expected output
        expect(outputString).toEqual(expectedOutput);
    });
});

describe(`
    Test Variation Stability`, () => {
    const createTest = (description, options, input, expectedOutput) => {
        test(description, () => {
            const titleCaser = new TitleCaser(options);
            const actualOutput = titleCaser.toTitleCase(input);
            expect(actualOutput).toEqual(expectedOutput);
        });
    };

    createTest(
        "Capitalization and word replacements",
        { style: "ap" },
        "GOOgle and VMWARE",
        "Google and VMware"
    );

    createTest(
        "Brand Capitalization and word replacements",
        { style: "ap" },
        "NERDs Candy",
        "NERDs Candy"
    );

    createTest(
        "AP-style title case with possessive and colon",
        { style: "ap" },
        "the iphone's impact on modern communication: a sociolinguistic analysis",
        "The iPhone's Impact on Modern Communication: A Sociolinguistic Analysis"
    );

    createTest(
        "AP-style title case with lowercase back/front-end terms",
        { style: "ap" },
        "BACK-end and front-end",
        "Backend and Frontend"
    );

    createTest(
        "Chicago style title case with comparison and colon",
        { style: "chicago" },
        "VMware vs. VirtualBox: a comparative study of virtualization software",
        "VMware vs. VirtualBox: A Comparative Study of Virtualization Software"
    );

    createTest(
        "APA style title case with colon",
        { style: "apa" },
        "the art of negotiation: strategies for successful business deals",
        "The Art of Negotiation: Strategies for Successful Business Deals"
    );

    createTest(
        "Wikipedia style title case with acronym and hyphen",
        { style: "wikipedia" },
        "The business of fashion: how luxury brands set themselves apart",
        "The Business of Fashion: How Luxury Brands Set Themselves Apart"
    );

    createTest(
        "Hyphenated, colon, and short word replacements",
        { style: "chicago" },
        "nodejs development on aws: an in-depth tutorial on server-side javascript deployment",
        "Node.js Development on AWS: An In-Depth Tutorial on Server-Side JavaScript Deployment"
    );

    createTest(
        "I Love Connecting with My Online Friends, but Sometimes I Prefer to Hang Out with My Friends IRL",
        { style: "chicago" },
        "I Love Connecting with My Online Friends, but Sometimes I Prefer to Hang Out with My Friends IRL",
        "I Love Connecting with My Online Friends, but Sometimes I Prefer to Hang Out with My Friends IRL"
    );

    createTest(
        "Test Smart Quotes",
        { style: "chicago", smartQuotes: true },
        '"Never underestimate the power O\' persistence,"',
        "“Never Underestimate the Power O’ Persistence,”"
    );

    createTest(
        "Wikipedia style capitalization test with special term and colon",
        { style: "wikipedia" },
        "the future of devops: how to prepare for the next era of software development",
        "The Future of DevOps: How to Prepare for the Next Era of Software Development"
    );

    createTest(
        "APA style title case with colon and apostrophe",
        { style: "apa" },
        "the science of nutrition: debunking myths and fads",
        "The Science of Nutrition: Debunking Myths and Fads"
    );

    createTest(
        "Chicago style title case with custom term replacements",
        { style: "chicago" },
        "Back-End Web Development: Building Scalable APIs with nodejs",
        "Backend Web Development: Building Scalable APIs with Node.js"
    );

    createTest(
        "AP-style capitalization test with special terms and colon",
        { style: "ap" },
        "revolutionizing the publishing industry: insights from a cto on ebook development and innovation",
        "Revolutionizing the Publishing Industry: Insights From a CTO on eBook Development and Innovation"
    );

    createTest(
        "NYT-style capitalization test with special terms and colon",
        { style: "nyt" },
        "the future of ai: how iot and machine learning will change the world",
        "The Future of AI: How IoT and Machine Learning Will Change the World"
    );

    createTest(
        "APA style title case with short conjunction terms and colon",
        { style: "apa" },
        "the impact of social media on mental health: a study of instagram, TIKTOK, and SnapChat",
        "The Impact of Social Media on Mental Health: A Study of Instagram, TikTok, and Snapchat"
    );

    createTest(
        "Correct phrase casing list testing",
        { style: "wikipedia" },
        "announcing a new collaboration with the cybersmile foundation: how to combat cyberbullying",
        "Announcing a New Collaboration With The Cybersmile Foundation: How to Combat Cyberbullying"
    );
});

describe(`
    Test Reserved Words`, () => {

    test("Title case transformation for a single reserved word", () => {
        const options = {
            style: "chicago"
        };
        const titleCaser = new TitleCaser(options);
        const input = "GOOGle tensorflow";
        const expectedOutput = "Google TensorFlow";
        const actualOutput = titleCaser.toTitleCase(input);
        expect(actualOutput).toEqual(expectedOutput);
    });

    test("Title case transformation for a sentence with a reserved word and colon", () => {
        const options = {
            style: "chicago"
        };
        const titleCaser = new TitleCaser(options);
        const input = "GooGlE vs. VirtualBox: a comparative study of virtualization software";
        const expectedOutput = "Google vs. VirtualBox: A Comparative Study of Virtualization Software";
        const actualOutput = titleCaser.toTitleCase(input);
        expect(actualOutput).toEqual(expectedOutput);
    });

    test("Title case transformation for a reserved word with a possessive form", () => {
        const options = {
            style: "chicago"
        };
        const titleCaser = new TitleCaser(options);
        const input = "GOOGle's tensorflow";
        const expectedOutput = "Google's TensorFlow";
        const actualOutput = titleCaser.toTitleCase(input);
        expect(actualOutput).toEqual(expectedOutput);
    });

    test("Title case transformation for specific brand names", () => {
        const options = {
            style: "chicago"
        };
        const replaceTerms = [
            { 'mcdonalds': 'McDonald\'s' },
            { 'skoda': 'Škoda' },
            { 'cyber-security': 'Cybersecurity' },
        ];
        const titleCaser = new TitleCaser(options);
        titleCaser.setReplaceTerms(replaceTerms);

        // Test data with brand names and their expected title-cased versions
        const testData = [
            { input: "cyber-security", expectedOutput: "Cybersecurity" },
            { input: "skoda", expectedOutput: "Škoda" },
            { input: "mcdonalds", expectedOutput: "McDonald's" },
        ];

        testData.forEach(({ input, expectedOutput }) => {
            const actualOutput = titleCaser.toTitleCase(input);
            expect(actualOutput).toEqual(expectedOutput);
        });
    });

    test("Title case transformation for a sentence with HTML line break (nl2br) using <br> tag", () => {
        const options = {
            style: "chicago"
        };
        const titleCaser = new TitleCaser(options);
        const input = "Exploring the future of devops:<br>Preparing for the next era of software development";
        const expectedOutput = "Exploring the Future of DevOps: <br> Preparing for the Next Era of Software Development";
        const actualOutput = titleCaser.toTitleCase(input);
        expect(actualOutput).toEqual(expectedOutput);
    });

    test("Title case transformation for a sentence with untrimmed white spaces", () => {
        const options = {
            style: "chicago"
        };
        const titleCaser = new TitleCaser(options);
        const input = `      This    string   has   too   many  spaces  `;
        const expectedOutput = "This String Has Too Many Spaces";
        const actualOutput = titleCaser.toTitleCase(input);
        expect(actualOutput).toEqual(expectedOutput);
    });

    test("Title case transformation for a sentence with HTML line break (nl2br) using <br> tag", () => {
        const options = {
            style: "chicago"
        };
        const titleCaser = new TitleCaser(options);
        const input = "Exploring the Future of DevOps:<br>Guidelines for Preparing for the Next Era in Software Development";
        const expectedOutput = "Exploring the Future of DevOps: <br> Guidelines for Preparing for the Next Era in Software Development";
        const actualOutput = titleCaser.toTitleCase(input);
        expect(actualOutput).toEqual(expectedOutput);
    });

    test("Title case transformation for a sentence with HTML line break (nl2br) without space after colon using <br> tag", () => {
        const options = {
            style: "chicago"
        };
        const titleCaser = new TitleCaser(options);
        const input = "The future of DevOps:<br>How to prepare for the next era of software development";
        const expectedOutput = "The Future of DevOps: <br> How to Prepare for the Next Era of Software Development";
        const actualOutput = titleCaser.toTitleCase(input);
        expect(actualOutput).toEqual(expectedOutput);
    });

    test("Ampersand in a sentence should return & and not &Amp;", () => {
        const options = {
            style: "chicago"
        };
        const titleCaser = new TitleCaser(options);
        const input = "This & That";
        const expectedOutput = "This & That";
        const actualOutput = titleCaser.toTitleCase(input);
        expect(actualOutput).toEqual(expectedOutput);
    });

    test("Untrimmed white spaces", () => {
        const options = {
            style: "chicago"
        };
        const titleCaser = new TitleCaser(options);
        const input = `      This    string   has   too   many  spaces  `;
        const expectedOutput = "This String Has Too Many Spaces";
        const actualOutput = titleCaser.toTitleCase(input);
        expect(actualOutput)
            .toEqual(expectedOutput);
    });
});

describe('Test addReplaceTerm Method', () => {
    let titleCaser;

    // Setup a new TitleCaser instance before each test
    beforeEach(() => {
        titleCaser = new TitleCaser({ style: 'ap' });
    });

    test('adds a new replacement term correctly', () => {
        const term = 'js';
        const replacement = 'JavaScript';

        // Initially, ensure the term does not exist in the replacement list
        expect(titleCaser.wordReplacementsList.some((obj) => obj.hasOwnProperty(term))).toBeFalsy();

        // Add the new replacement term
        titleCaser.addReplaceTerm(term, replacement);

        // Verify the term now exists in the replacement list with the correct replacement value
        expect(titleCaser.wordReplacementsList.some((obj) => obj[term] === replacement)).toBeTruthy();
    });

    test('updates an existing replacement term correctly', () => {
        const initialTerm = 'js';
        const initialReplacement = 'JavaScript';
        const newReplacement = 'JS';

        // Add an initial replacement term
        titleCaser.addReplaceTerm(initialTerm, initialReplacement);

        // Verify the term exists with the initial replacement value
        expect(titleCaser.wordReplacementsList.some((obj) => obj[initialTerm] === initialReplacement)).toBeTruthy();

        // Update the replacement term
        titleCaser.addReplaceTerm(initialTerm, newReplacement);

        // Verify the term now exists with the new replacement value
        expect(titleCaser.wordReplacementsList.some((obj) => obj[initialTerm] === newReplacement)).toBeTruthy();
    });
});
