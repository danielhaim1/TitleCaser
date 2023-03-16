const {
    describe,
    test,
    expect
} = require('@jest/globals');

const {
    toTitleCase
} = require('../api/titleCase.js');

describe('String.prototype.toTitleCase', () => {
    test('throws TypeError if input is not a string', () => {
        expect(() => toTitleCase()).toThrow(TypeError);
        expect(() => toTitleCase(123)).toThrow(TypeError);
        expect(() => toTitleCase(true)).toThrow(TypeError);
    });

    test('throws TypeError if options is not an object', () => {
        expect(() => toTitleCase('hello', 'world')).toThrow(TypeError);
        expect(() => toTitleCase('hello', 123)).toThrow(TypeError);
        expect(() => toTitleCase('hello', true)).toThrow(TypeError);
    });

    test("AP style", () => {
        const myString = "the iPhone's impact on modern communication: a sociolinguistic analysis";
        expect(myString.toTitleCase({
            style: "ap"
        })).toBe("The iPhone's Impact on Modern Communication: A Sociolinguistic Analysis");
    });

    test("Replace term back-end, front-end", () => {
        const myString = "back-end and front-end";
        expect(myString.toTitleCase({
            style: "ap"
        })).toBe("Backend and Frontend");
    });

    test("Chicago style", () => {
        const myString = "VMware vs. VirtualBox: a comparative study of virtualization software";
        expect(myString.toTitleCase({
            style: "chicago"
        })).toBe("VMware vs. VirtualBox: A Comparative Study of Virtualization Software");
    });

    test("APA style", () => {
        const myString = "the art of negotiation: strategies for successful business deals";
        expect(myString.toTitleCase({
            style: "apa"
        })).toBe("The Art of Negotiation: Strategies for Successful Business Deals");
    });

    test("NYT style", () => {
        const myString = "the future of gaming: virtual reality and beyond";
        expect(myString.toTitleCase({
            style: "nyt"
        })).toBe("The Future of Gaming: Virtual Reality and Beyond");
    });

    test("Wikipedia style", () => {
        const myString = "the role of AI in digital marketing: a case study of Google AdWords";
        expect(myString.toTitleCase({
            style: "wikipedia"
        })).toBe("The Role of AI in Digital Marketing: A Case Study of Google AdWords");
    });

    test("Replace incorrect capitalization for reserved words, replace reserved words (Jquery>jQuery, Front-End>Frontend)", () => {
        const myString = "JQUERY Plugins for Front-end Developers: A Comprehensive Guide";
        expect(myString.toTitleCase({
            style: "chicago"
        })).toBe("jQuery Plugins for Frontend Developers: A Comprehensive Guide");
    });

    test("Reserved keyword, correct capitalization (Back-End > Backend)", () => {
        const myString = "Building Robust Back-End Systems: Best Practices for Handling High Traffic and Scale";
        expect(myString.toTitleCase({
            style: "chicago"
        })).toBe("Building Robust Backend Systems: Best Practices for Handling High Traffic and Scale");
    });

    test("Convert string to title case with APA style formatting", () => {
        const myString = "Building a better workplace: strategies for effective team management";
        expect(myString.toTitleCase({
            style: "apa"
        })).toBe("Building a Better Workplace: Strategies for Effective Team Management");
    });

    test("Convert string to title case with AP style formatting, including possessive", () => {
        const myString = "The Colonization of Mars: Challenges and Opportunities for SpaceX";
        expect(myString.toTitleCase({
            style: "ap"
        })).toBe("The Colonization of Mars: Challenges and Opportunities for SpaceX");
    });

    test("Convert string to title case with Chicago style formatting, including all-caps and ampersand", () => {
        const myString = "The Rise of Cryptocurrencies: A Case Study of Bitcoin and Ethereum";
        expect(myString.toTitleCase({
            style: "chicago"
        })).toBe("The Rise of Cryptocurrencies: A Case Study of Bitcoin and Ethereum");
    });

    test("Convert string to title case with NYT style formatting, including question mark and quotes", () => {
        const myString = "The Effects of Social Media on Mental Health: A Study of Instagram and Snapchat?";
        expect(myString.toTitleCase({
            style: "nyt"
        })).toBe("The Effects of Social Media on Mental Health: A Study of Instagram and Snapchat?");
    });

    test("Convert string to title case with Wikipedia style formatting, including acronym and hyphen", () => {
        const myString = "The Business of Fashion: How Luxury Brands Set Themselves Apart";
        expect(myString.toTitleCase({
            style: "wikipedia"
        })).toBe("The Business of Fashion: How Luxury Brands Set Themselves Apart");
    });

    test("Convert string to title case with APA style formatting, including colon and apostrophe", () => {
        const myString = "The Science of Nutrition: Debunking Myths and Fads";
        expect(myString.toTitleCase({
            style: "apa"
        })).toBe("The Science of Nutrition: Debunking Myths and Fads");
    });

    test("Convert string to title case with Chicago style formatting, including special terms such as node.js", () => {
        const myString = "Back-End Web Development: Building Scalable APIs with nodejs";
        expect(myString.toTitleCase({
            style: "chicago"
        })).toBe("Backend Web Development: Building Scalable APIs with Node.js");
    });

    test("Convert string to title case with AP style formatting, including special terms such as eBook, CTO", () => {
        const myString = "revolutionizing the publishing industry: insights from a cto on ebook development and innovation";
        expect(myString.toTitleCase({
            style: "ap"
        })).toBe("Revolutionizing the Publishing Industry: Insights From a CTO on eBook Development and Innovation");
    });

    test("Convert string to title case with NYT style formatting, including special terms such as IoT, AI", () => {
        const myString = "the future of ai: how iot and machine learning will change the world";
        expect(myString.toTitleCase({
            style: "nyt"
        })).toBe("The Future of AI: How IoT and Machine Learning Will Change the World");
    });

    test("Convert string to title case with APA style formatting, including colon and short conjunctions", () => {
        const myString = "the impact of social media on mental health: a study of instagram and snapchat";
        expect(myString.toTitleCase({
            style: "apa"
        })).toBe("The Impact of Social Media on Mental Health: A Study of Instagram and Snapchat");
    });

    test("Convert string to title case with Wikipedia style formatting, including special terms such as DevOps", () => {
        const myString = "the future of devops: how to prepare for the next era of software development";
        expect(myString.toTitleCase({
            style: "wikipedia"
        })).toBe("The Future of DevOps: How to Prepare for the Next Era of Software Development");
    });

    test("Convert string to title case with Chicago style formatting, including reserved terms GooGlE to Google", () => {
        const myString = "GooGlE vs. VirtualBox: a comparative study of virtualization software";
        expect(myString.toTitleCase({
            style: "chicago"
        })).toBe("Google vs. VirtualBox: A Comparative Study of Virtualization Software");
    });

    test("mastering node.js on aws: an advanced guide to server-side javascript development", () => {
        const myString = "mastering node.js on aws: an advanced guide to server-side javascript development";
        expect(myString.toTitleCase({
            style: "chicago"
        })).toBe("Mastering Node.js on AWS: An Advanced Guide to Server-Side JavaScript Development");
    });

    // create test for:
    // mastering node.js on aws: an advanced guide to server-side javascript development
    // saas vs. on-premises on aws: a comparative analysis of cloud computing solutions for business

});