const TitleCaser = require('./TitleCaser')
    .default;
test('should convert string to title case with default options', () => {
    const titleCaser = new TitleCaser();
    const input = 'hello world';
    const expectedOutput = 'Hello World';
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput)
        .toEqual(expectedOutput);
});
test('should convert string to title case with custom options', () => {
    const options = {
        style: 'chicago'
    };
    const titleCaser = new TitleCaser(options);
    const input = 'the book   of     life';
    const expectedOutput = 'The Book of Life';
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput)
        .toEqual(expectedOutput);
});
test('should convert string to title case with AP style formatting, including hyphenated words, word and brand replacement', () => {
    const titleCaser = new TitleCaser({
        style: 'ap'
    });
    const input = 'nodejs development on aws: an in-depth tutorial on server-side javascript deployment';
    const expectedOutput = 'Node.js Development on AWS: An In-depth Tutorial on Server-side JavaScript Deployment';
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput)
        .toEqual(expectedOutput);
});
test("Convert string to title case with Chicago style formatting, including hyphenated words, word and brand replacement", () => {
    const options = {
        style: "chicago"
    };
    const titleCaser = new TitleCaser(options);
    const input = "nodejs development on aws: an in-depth tutorial on server-side javascript deployment";
    const expectedOutput = "Node.js Development on AWS: An In-Depth Tutorial on Server-Side JavaScript Deployment";
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput)
        .toEqual(expectedOutput);
});
test("Convert string to title case with AP style formatting, including custom term replacement for Google and VMware", () => {
    const options = {
        style: "ap"
    };
    const titleCaser = new TitleCaser(options);
    const input = "GOOgle and VMWARE";
    const expectedOutput = "Google and VMware";
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput)
        .toEqual(expectedOutput);
});
test("Convert string to title case with AP style formatting, including a possessive noun and a colon", () => {
    const options = {
        style: "ap"
    };
    const titleCaser = new TitleCaser(options);
    const input = "the iphone's impact on modern communication: a sociolinguistic analysis";
    const expectedOutput = "The iPhone's Impact on Modern Communication: A Sociolinguistic Analysis";
    const actualOutput = titleCaser.toTitleCase(input);
});
test("Convert string to title case with AP style formatting, including lowercase back-end and front-end terms", () => {
    const options = {
        style: "ap"
    };
    const titleCaser = new TitleCaser(options);
    const input = "BACK-end and front-end";
    const expectedOutput = "Backend and Frontend";
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput)
        .toEqual(expectedOutput);
});
test("Convert string to title case with Chicago style formatting, including a comparison and a colon", () => {
    const options = {
        style: "chicago"
    };
    const titleCaser = new TitleCaser(options);
    const input = "VMware vs. VirtualBox: a comparative study of virtualization software";
    const expectedOutput = "VMware vs. VirtualBox: A Comparative Study of Virtualization Software";
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput)
        .toEqual(expectedOutput);
});
test("Convert string to title case with APA style formatting, including a colon", () => {
    const options = {
        style: "apa"
    };
    const titleCaser = new TitleCaser(options);
    const input = "the art of negotiation: strategies for successful business deals";
    const expectedOutput = "The Art of Negotiation: Strategies for Successful Business Deals";
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput)
        .toEqual(expectedOutput);
});
test("Convert string to title case with Wikipedia style formatting, including acronym and hyphen", () => {
    const options = {
        style: "wikipedia"
    };
    const titleCaser = new TitleCaser(options);
    const input = "The business of fashion: how luxury brands set themselves apart";
    const expectedOutput = "The Business of Fashion: How Luxury Brands Set Themselves Apart";
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput)
        .toEqual(expectedOutput);
});
test("Convert string to title case with APA style formatting, including colon and apostrophe", () => {
    const options = {
        style: "apa"
    };
    const titleCaser = new TitleCaser(options);
    const input = "the science of nutrition: debunking myths and fads";
    const expectedOutput = "The Science of Nutrition: Debunking Myths and Fads";
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput)
        .toEqual(expectedOutput);
});
test("Convert string to title case with Chicago style formatting, including special terms such as node.js", () => {
    const options = {
        style: "chicago"
    };
    const titleCaser = new TitleCaser(options);
    const input = "Back-End Web Development: Building Scalable APIs with nodejs";
    const expectedOutput = "Backend Web Development: Building Scalable APIs with Node.js";
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput)
        .toEqual(expectedOutput);
});
test("AP Style capitalization test with special terms eBook and CTO and a colon", () => {
    const options = {
        style: "chicago"
    };
    const titleCaser = new TitleCaser(options);
    const input = "revolutionizing the publishing industry: insights from a cto on ebook development and innovation";
    const expectedOutput = "Revolutionizing the Publishing Industry: Insights From a CTO on eBook Development and Innovation";
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput)
        .toEqual(expectedOutput);
});
test("NYT style capitalization test with special terms IoT and AI and a colon", () => {
    const options = {
        style: "chicago"
    };
    const titleCaser = new TitleCaser(options);
    const input = "the future of ai: how iot and machine learning will change the world";
    const expectedOutput = "The Future of AI: How IoT and Machine Learning Will Change the World";
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput)
        .toEqual(expectedOutput);
});
test("APA Style Capitalization Test with a Colon and Short Conjunction Terms (Instagram, TikTok, and Snapchat)", () => {
    const options = {
        style: "chicago"
    };
    const titleCaser = new TitleCaser(options);
    const input = "the impact of social media on mental health: a study of instagram, TIKTOK, and SnapChat";
    const expectedOutput = "The Impact of Social Media on Mental Health: A Study of Instagram, TikTok, and Snapchat";
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput)
        .toEqual(expectedOutput);
});
test("Testing CORRECT_PHRASE_CASE", () => {
    const options = {
        style: "wikipedia"
    };
    const titleCaser = new TitleCaser(options);
    const input = "announcing a new collaboration with the cybersmile foundation: how to combat cyberbullying";
    const expectedOutput = "Announcing a New Collaboration With The Cybersmile Foundation: How to Combat Cyberbullying";
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput)
        .toEqual(expectedOutput);
});
test("Wikipedia style capitalization test with special term DevOps and a colon", () => {
    const options = {
        style: "wikipedia"
    };
    const titleCaser = new TitleCaser(options);
    const input = "the future of devops: how to prepare for the next era of software development";
    const expectedOutput = "The Future of DevOps: How to Prepare for the Next Era of Software Development";
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput)
        .toEqual(expectedOutput);
});
test("Chicago Style capitalization test with custom term replacement for GooGlE to Google and a comparison with a colon", () => {
    const options = {
        style: "chicago"
    };
    const titleCaser = new TitleCaser(options);
    const input = "GooGlE vs. VirtualBox: a comparative study of virtualization software";
    const expectedOutput = "Google vs. VirtualBox: A Comparative Study of Virtualization Software";
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput)
        .toEqual(expectedOutput);
});
test("Convert string containing a term with mixed case to title case", () => {
    const options = {
        style: "chicago"
    };
    const titleCaser = new TitleCaser(options);
    const input = "GOOGle tensorflow";
    const expectedOutput = "Google TensorFlow";
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput)
        .toEqual(expectedOutput);
});
test("Convert string containing a possessive term with mixed case to title case", () => {
    const options = {
        style: "chicago"
    };
    const titleCaser = new TitleCaser(options);
    const input = "GOOGle's tensorflow";
    const expectedOutput = "Google's TensorFlow";
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput)
        .toEqual(expectedOutput);
});
test("Convert hyphenated word with brand name from GOOgle-Tensorflow to Google-TensorFlow", () => {
    const options = {
        style: "chicago"
    };
    const titleCaser = new TitleCaser(options);
    const input = "GOOGle-Tensorflow";
    const expectedOutput = "Google-TensorFlow";
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput)
        .toEqual(expectedOutput);
});
test("Convert hyphenated word with brand name and possessive from GOOGle's-Tensorflow to Google's-TensorFlow", () => {
    const options = {
        style: "chicago"
    };
    const titleCaser = new TitleCaser(options);
    const input = "GOOGle's-Tensorflow";
    const expectedOutput = "Google's-TensorFlow";
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput)
        .toEqual(expectedOutput);
});
test("Convert string with HTML line break tag to title case with correct spacing", () => {
    const options = {
        style: "chicago"
    };
    const titleCaser = new TitleCaser(options);
    const input = "the future of devops: <br />how to prepare for the next era of software development";
    const expectedOutput = "The Future of DevOps: <br />How to Prepare for the Next Era of Software Development";
    const actualOutput = titleCaser.toTitleCase(input);
    expect(actualOutput)
        .toEqual(expectedOutput);
});
test("Convert string with untrimmed spaces to title case with correct spacing", () => {
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