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

    test("Convert string to title case with AP style formatting, including hyphenated words, word and brand replacement", () => {
        const myString = "nodejs development on aws: an in-depth tutorial on server-side javascript deployment";
        expect(myString.toTitleCase({
            style: "ap",
            REPLACE_TERMS: ["nodejs", "aws", "javascript"]
        })).toBe("Node.js Development on AWS: An In-depth Tutorial on Server-side JavaScript Deployment");
    });

    test("Convert string to title case with Chicago style formatting, including hyphenated words, word and brand replacement", () => {
        const myString = "nodejs development on aws: an in-depth tutorial on server-side javascript deployment";
        expect(myString.toTitleCase({
            style: "chicago",
            REPLACE_TERMS: ["nodejs", "aws", "javascript"]
        })).toBe("Node.js Development on AWS: An In-Depth Tutorial on Server-Side JavaScript Deployment");
    });

    test("Convert string to title case with AP style formatting, including custom term replacement for Google and VMware", () => {
        const myString = "GOOgle and VMWare";
        expect(myString.toTitleCase({
            style: "ap",
            REPLACE_TERMS: ["Google", "VMware"]
        })).toBe("Google and VMWare");
    });

    test("Convert string to title case with AP style formatting, including a possessive noun and a colon", () => {
        const myString = "the iPhone's impact on modern communication: a sociolinguistic analysis";
        expect(myString.toTitleCase({
            style: "ap"
        })).toBe("The iPhone's Impact on Modern Communication: A Sociolinguistic Analysis");
    });

    test("Convert string to title case with AP style formatting, including lowercase back-end and front-end terms", () => {
        const myString = "back-end and front-end";
        expect(myString.toTitleCase({
            style: "ap",
            REPLACE_TERMS: ["back-end", "front-end"]
        })).toBe("Backend and Frontend");
    });

    test("Convert string to title case with Chicago style formatting, including a comparison and a colon", () => {
        const myString = "VMware vs. VirtualBox: a comparative study of virtualization software";
        expect(myString.toTitleCase({
            style: "chicago"
        })).toBe("VMware vs. VirtualBox: A Comparative Study of Virtualization Software");
    });

    test("Convert string to title case with APA style formatting, including a colon", () => {
        const myString = "the art of negotiation: strategies for successful business deals";
        expect(myString.toTitleCase({
            style: "apa"
        })).toBe("The Art of Negotiation: Strategies for Successful Business Deals");
    });


    // ----------------- TESTS FOR SPECIAL TERMS ----------------- //
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

    test("AP Style capitalization test with special terms eBook and CTO and a colon", () => {
        const myString = "revolutionizing the publishing industry: insights from a cto on ebook development and innovation";
        expect(myString.toTitleCase({
            style: "ap"
        })).toBe("Revolutionizing the Publishing Industry: Insights From a CTO on eBook Development and Innovation");
    });

    test("NYT style capitalization test with special terms IoT and AI and a colon", () => {
        const myString = "the future of ai: how iot and machine learning will change the world";
        expect(myString.toTitleCase({
            style: "nyt"
        })).toBe("The Future of AI: How IoT and Machine Learning Will Change the World");
    });

    test("APA Style Capitalization Test with a Colon and Short Conjunction Terms (Instagram, TikTok, and Snapchat)", () => {
        const myString = "the impact of social media on mental health: a study of instagram, Tiktok, and SnapChat";
        expect(myString.toTitleCase({
            style: "apa"
        })).toBe("The Impact of Social Media on Mental Health: A Study of Instagram, TikTok, and Snapchat");
    });

    test("Wikipedia style capitalization test with special term DevOps and a colon", () => {
        const myString = "the future of devops: how to prepare for the next era of software development";
        expect(myString.toTitleCase({
            style: "wikipedia"
        })).toBe("The Future of DevOps: How to Prepare for the Next Era of Software Development");
    });

    test("Chicago Style capitalization test with custom term replacement for GooGlE to Google and a comparison with a colon", () => {
        const myString = "GooGlE vs. VirtualBox: a comparative study of virtualization software";
        expect(myString.toTitleCase({
            style: "chicago"
        })).toBe("Google vs. VirtualBox: A Comparative Study of Virtualization Software");
    });

});