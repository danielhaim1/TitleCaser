const {
    describe,
    test,
    expect
} = require('@jest/globals');

const {
    toTitleCase
} = require('../index');

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
        console.log(typeof myString); // debug information
        console.log(myString); // debug information
        expect(myString.toTitleCase({ style: "ap" })).toBe("The iPhone's Impact on Modern Communication: A Sociolinguistic Analysis");
      });
      

    test("Chicago style", () => {
        const myString = "VMware vs. VirtualBox: a comparative study of virtualization software";
        expect(myString.toTitleCase({ style: "chicago" })).toBe("VMware vs. VirtualBox: A Comparative Study of Virtualization Software");
    });
    
    test("APA style", () => {
        const myString = "the art of negotiation: strategies for successful business deals";
        expect(myString.toTitleCase({ style: "apa" })).toBe("The Art of Negotiation: Strategies for Successful Business Deals");
    });
    
    test("NYT style", () => {
        const myString = "the future of gaming: virtual reality and beyond";
        expect(myString.toTitleCase({ style: "nyt" })).toBe("The Future of Gaming: Virtual Reality and Beyond");
    });
    
    test("Wikipedia style", () => {
        const myString = "the role of AI in digital marketing: a case study of Google AdWords";
        expect(myString.toTitleCase({ style: "wikipedia" })).toBe("The Role of AI in Digital Marketing: A Case Study of Google AdWords");
    });

    test("Reserved keyword (jQuery, Frontend)", () => {
        const myString = "jquery Plugins for Front-end Developers: A Comprehensive Guide";
        expect(myString.toTitleCase({ style: "chicago" })).toBe("jQuery Plugins for Frontend Developers: A Comprehensive Guide");
    });

    test("Reserved keyword, correct capitalization (Back-End > Backend)", () => {
        const myString = "Building Robust Back-End Systems: Best Practices for Handling High Traffic and Scale";
        expect(myString.toTitleCase({ style: "chicago" })).toBe("Building Robust Backend Systems: Best Practices for Handling High Traffic and Scale");
    });
    
    test("Complex title with various formatting", () => {
        const myString = "Building a better workplace: strategies for effective team management";
        expect(myString.toTitleCase({ style: "apa" })).toBe("Building a Better Workplace: Strategies for Effective Team Management");
    });
    
    
    test("Colonization of mars with mixed case and possessive", () => {
        const myString = "The Colonization of Mars: Challenges and Opportunities for SpaceX";
        expect(myString.toTitleCase({ style: "ap" })).toBe("The Colonization of Mars: Challenges and Opportunities for SpaceX");
    });
    
    test("Cryptocurrencies with all caps and ampersand", () => {
        const myString = "The Rise of Cryptocurrencies: A Case Study of Bitcoin and Ethereum";
        expect(myString.toTitleCase({ style: "chicago" })).toBe("The Rise of Cryptocurrencies: A Case Study of Bitcoin and Ethereum");
    });
    
    test("Technology and mental health with question mark and quotes", () => {
        const myString = "The Effects of Social Media on Mental Health: A Study of Instagram and Snapchat?";
        expect(myString.toTitleCase({ style: "nyt" })).toBe("The Effects of Social Media on Mental Health: A Study of Instagram and Snapchat?");
    });
    
    test("Fashion with acronym and hyphen", () => {
        const myString = "The Business of Fashion: How Luxury Brands Set Themselves Apart";
        expect(myString.toTitleCase({ style: "wikipedia" })).toBe("The Business of Fashion: How Luxury Brands Set Themselves Apart");
    });
    
    test("Nutrition with colon and apostrophe", () => {
        const myString = "The Science of Nutrition: Debunking Myths and Fads";
        expect(myString.toTitleCase({ style: "apa" })).toBe("The Science of Nutrition: Debunking Myths and Fads");
    });
    
    test("Correct capitalization for special terms", () => {
        const myString = "Back-End Web Development: Building Scalable APIs with nodejs";
        expect(myString.toTitleCase({ style: "chicago" })).toBe("Backend Web Development: Building Scalable APIs with Node.js");
    });    
    test("Correct capitalization for special terms", () => {
        const myString = "Back-End Web Development: Building Scalable APIs with nodejs";
        expect(myString.toTitleCase({ style: "chicago" })).toBe("Backend Web Development: Building Scalable APIs with Node.js");
    });    
      
});