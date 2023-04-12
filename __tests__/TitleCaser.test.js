import { TitleCaser } from '../index.js';

describe ( `
    Test Basic Options`, () => {
	test ( 'Default title case conversion', () => {
		const titleCaser = new TitleCaser ();
		const input = 'hello world';
		const expectedOutput = 'Hello World';
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( 'Customized title case conversion', () => {
		const options = {
			style: 'chicago'
		};
		const titleCaser = new TitleCaser ( options );
		const input = 'the book   of     life';
		const expectedOutput = 'The Book of Life';
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( 'AP-style title case conversion with replacements', () => {
		const titleCaser = new TitleCaser ( {
			style: 'ap'
		} );
		const input = 'nodejs development on aws: an in-depth tutorial on server-side javascript deployment';
		const expectedOutput = 'Node.js Development on AWS: An In-depth Tutorial on Server-side JavaScript Deployment';
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( 'AP-style title case conversion with replacements', () => {
		const titleCaser = new TitleCaser ( {
			style: 'ap'
		} );
		const input = 'louis-iv';
		const expectedOutput = 'Louis-IV';
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( 'Capitalize suffix word in sentence', () => {
		const titleCaser = new TitleCaser ( {
			style: 'ap'
		} );
		const input = "what's to say about this?";
		const expectedOutput = "What's to Say About This?";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
} );

describe ( `
    Test Methods`, () => {
	test ( "removeReplaceTerm", () => {
		const titleCaser = new TitleCaser ( {
			style: 'apa'
		} );
		
		// Set multiple replacement terms using setReplaceTerms()
		titleCaser.setReplaceTerms ( {
			'hello world': 'Hello World',
			'replace me': 'Replace Me'
		} );
		titleCaser.setReplaceTerms ( {
			'apa': 'APA'
		} );
		
		// Use removeReplaceTerm() to remove a replace term
		titleCaser.removeReplaceTerm ( 'hello world' );
		
		// Use descriptive variable names for the input and expected output
		const inputString = "hello world, replace me!";
		const expectedOutput = "Hello World, Replace Me!";
		
		// Call toTitleCase() to convert the input string to title case
		const outputString = titleCaser.toTitleCase ( inputString );
		// Check that the output matches the expected output
		expect ( outputString ).toEqual ( expectedOutput );
	} );
	test ( "setReplaceTerms", () => {
		const titleCaser = new TitleCaser ( {
			style: 'ap'
		} );
		const replaceTerms = [
			{ 'hello world': 'Hello World' },
			{ 'replace me': 'Replace Me' }
		];
		titleCaser.setReplaceTerms ( replaceTerms );
		const input = "hello world, replace me!";
		const expectedOutput = "Hello World, Replace Me!";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput ).toEqual ( expectedOutput );
	} );
} );

describe ( `
    Test Variation Stability`, () => {
	test ( "Hyphenated, colon, and short word replacements", () => {
		const options = {
			style: "chicago"
		};
		const titleCaser = new TitleCaser ( options );
		const input = "nodejs development on aws: an in-depth tutorial on server-side javascript deployment";
		const expectedOutput = "Node.js Development on AWS: An In-Depth Tutorial on Server-Side JavaScript Deployment";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( "Capitalization and word replacements", () => {
		const options = {
			style: "ap"
		};
		const titleCaser = new TitleCaser ( options );
		const input = "GOOgle and VMWARE";
		const expectedOutput = "Google and VMware";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( "AP-style title case with possessive and colon", () => {
		const options = {
			style: "ap"
		};
		const titleCaser = new TitleCaser ( options );
		const input = "the iphone's impact on modern communication: a sociolinguistic analysis";
		const expectedOutput = "The iPhone's Impact on Modern Communication: A Sociolinguistic Analysis";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( "AP-style title case with lowercase back/front-end terms", () => {
		const options = {
			style: "ap"
		};
		const titleCaser = new TitleCaser ( options );
		const input = "BACK-end and front-end";
		const expectedOutput = "Backend and Frontend";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( "Chicago style title case with comparison and colon", () => {
		const options = {
			style: "chicago"
		};
		const titleCaser = new TitleCaser ( options );
		const input = "VMware vs. VirtualBox: a comparative study of virtualization software";
		const expectedOutput = "VMware vs. VirtualBox: A Comparative Study of Virtualization Software";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( "APA style title case with colon", () => {
		const options = {
			style: "apa"
		};
		const titleCaser = new TitleCaser ( options );
		const input = "the art of negotiation: strategies for successful business deals";
		const expectedOutput = "The Art of Negotiation: Strategies for Successful Business Deals";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( "Wikipedia style title case with acronym and hyphen", () => {
		const options = {
			style: "wikipedia"
		};
		const titleCaser = new TitleCaser ( options );
		const input = "The business of fashion: how luxury brands set themselves apart";
		const expectedOutput = "The Business of Fashion: How Luxury Brands Set Themselves Apart";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( "APA style title case with colon and apostrophe", () => {
		const options = {
			style: "apa"
		};
		const titleCaser = new TitleCaser ( options );
		const input = "the science of nutrition: debunking myths and fads";
		const expectedOutput = "The Science of Nutrition: Debunking Myths and Fads";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( "Chicago style title case with custom term replacements", () => {
		const options = {
			style: "chicago"
		};
		const titleCaser = new TitleCaser ( options );
		const input = "Back-End Web Development: Building Scalable APIs with nodejs";
		const expectedOutput = "Backend Web Development: Building Scalable APIs with Node.js";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( "AP-style capitalization test with special terms and colon", () => {
		const options = {
			style: "chicago"
		};
		const titleCaser = new TitleCaser ( options );
		const input = "revolutionizing the publishing industry: insights from a cto on ebook development and innovation";
		const expectedOutput = "Revolutionizing the Publishing Industry: Insights From a CTO on eBook Development and Innovation";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( "NYT-style capitalization test with special terms and colon", () => {
		const options = {
			style: "chicago"
		};
		const titleCaser = new TitleCaser ( options );
		const input = "the future of ai: how iot and machine learning will change the world";
		const expectedOutput = "The Future of AI: How IoT and Machine Learning Will Change the World";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( "APA style capitalization test with short conjunction terms and colon", () => {
		const options = {
			style: "chicago"
		};
		const titleCaser = new TitleCaser ( options );
		const input = "the impact of social media on mental health: a study of instagram, TIKTOK, and SnapChat";
		const expectedOutput = "The Impact of Social Media on Mental Health: A Study of Instagram, TikTok, and Snapchat";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( "Correct phrase casing list testing", () => {
		const options = {
			style: "wikipedia"
		};
		const titleCaser = new TitleCaser ( options );
		const input = "announcing a new collaboration with the cybersmile foundation: how to combat cyberbullying";
		const expectedOutput = "Announcing a New Collaboration With The Cybersmile Foundation: How to Combat Cyberbullying";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( "Wikipedia style capitalization test with special term and colon", () => {
		const options = {
			style: "wikipedia"
		};
		const titleCaser = new TitleCaser ( options );
		const input = "the future of devops: how to prepare for the next era of software development";
		const expectedOutput = "The Future of DevOps: How to Prepare for the Next Era of Software Development";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
} );
describe ( `
    Test Reserved Words`, () => {
	test ( "Reserved word", () => {
		const options = {
			style: "chicago"
		};
		const titleCaser = new TitleCaser ( options );
		const input = "GOOGle tensorflow";
		const expectedOutput = "Google TensorFlow";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( "Reserved word with colon", () => {
		const options = {
			style: "chicago"
		};
		const titleCaser = new TitleCaser ( options );
		const input = "GooGlE vs. VirtualBox: a comparative study of virtualization software";
		const expectedOutput = "Google vs. VirtualBox: A Comparative Study of Virtualization Software";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( "Reserved word, posessive", () => {
		const options = {
			style: "chicago"
		};
		const titleCaser = new TitleCaser ( options );
		const input = "GOOGle's tensorflow";
		const expectedOutput = "Google's TensorFlow";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( "Hyphenated reserved word", () => {
		const options = {
			style: "chicago"
		};
		const titleCaser = new TitleCaser ( options );
		const input = "GOOGle-Tensorflow";
		const expectedOutput = "Google-TensorFlow";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( "Hyphenated reserved word, possessive", () => {
		const options = {
			style: "chicago"
		};
		const titleCaser = new TitleCaser ( options );
		const input = "GOOGle's-Tensorflow";
		const expectedOutput = "Google's-TensorFlow";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( "HTML line break nl2br, <br /> tag", () => {
		const options = { style: "chicago" };
		const titleCaser = new TitleCaser ( options );
		const input = "the future of devops: <br />how to prepare for the next era of software development";
		const expectedOutput = "The Future of DevOps: <br />How to Prepare for the Next Era of Software Development";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( "Ampersand in a sentence should return & and not &Amp\;", () => {
		const options = { style: "chicago" };
		const titleCaser = new TitleCaser ( options );
		const input = "This & That";
		const expectedOutput = "This & That";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
	test ( "Untrimmed white spaces", () => {
		const options = {
			style: "chicago"
		};
		const titleCaser = new TitleCaser ( options );
		const input = `      This    string   has   too   many  spaces  `;
		const expectedOutput = "This String Has Too Many Spaces";
		const actualOutput = titleCaser.toTitleCase ( input );
		expect ( actualOutput )
			.toEqual ( expectedOutput );
	} );
} );
