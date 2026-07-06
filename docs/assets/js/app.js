const titleExamples = {
	ap: [
		"nodejs development on aws: an in-depth tutorial on server-side javascript deployment",
		"the us military and uk officials discuss ai policy",
		"inside a high-profile, long-term plan for e-commerce growth",
		"what to know about front-end and back-end engineering teams",
		"it’s up to us to decide how the us responds",
		"on and off again: lessons from a start-up ceo",
	],
	apa: [
		"blockchain technology and cyber security: opportunities and challenges for secure digital transactions",
		"the role of human error in cyber attacks and mitigation strategies",
		"machine learning in cloud computing: a comparative analysis of public and private systems",
		"understanding social media effects on mental health among young adults",
		"how github actions improves a/b testing workflows for ecommerce teams",
		"designing secure node.js applications for server-side javascript deployment",
	],
	nyt: [
		"inside the race to build safer ai tools for public schools",
		"how small businesses are adapting to rising cloud costs",
		"why open source maintainers are rethinking software security",
		"the people behind a new wave of climate technology startups",
		"what a us-uk agreement could mean for digital trade",
		"when social media platforms become search engines",
	],
	quotes: [
		"‘enough!’ says leader after the vote",
		"“the future is open,” says github founder",
		"'this changes everything,' says the ceo",
		"(inside the aws migration) lessons from devops teams",
		"“why now?” asks the editor after the cnn interview",
		"‘the best ideas travel fast,’ says open source maintainer",
		"«bonjour from paris,» says the github contributor",
	],
	wikipedia: [
		"the report cited BBC News, Sky News, Al Jazeera, and the local artist",
		"The surprise guest Donald Trump jr. was a Fox News favorite!",
		"john smith wrote about the surprise guest after the public event",
		"cnn australia and cnn international covered the public event",
		"maeve o'connor discussed apple music on fox business",
		"the article mentioned The Lincoln Project and the local artist",
		"nbc, msnbc, and cnbc covered the technology hearing",
	],
	brands: [
		"reactjs teams build full stack tools with node.js",
		"nextjs developers compare google tensorflow and apple music",
		"the iphone's impact on ebay sellers using github actions",
		"nodejs development on aws with react.js and full stack teams",
		"shopify merchants compare tiktok, snapchat, and instagram campaigns",
		"mcdonalds, coca-cola, and t-mobile launch an ecommerce campaign",
		"vmware teams compare virtualbox and github actions",
		"skoda engineers publish a devops case study on aws",
	],
	acronyms: [
		"mitigating ddos attacks on aws: strategies using github and faqs",
		"from faqs to wow: lessons from ceos and cmos using aws",
		"the future of ai, iot, and saas on aws",
		"a/b testing with github actions for ctos and cmos",
		"us-uk-led talks focus on ai, eu policy, and cloud security",
		"the uk and the us debate iaas rules for government agencies",
		"asap guide to diy node.js deployments on aws",
		"tbd roadmap for apis, faqs, and ddos response teams",
	],
};

const titleArray = [
	"They signed the treaty with the us",
	"PARTNERING with the us Military",
	"It has a varied landscape, and us, the citizens, appreciate it.",
	"discussing the us policies.",
	"it’s up to us to decide.",
	"the uk, despite its size, has a significant impact.",
	"we visited the uk and the US, and both were memorable.",
	"it has a varied landscape, and US, the citizens, appreciate it.",
	"the usa has a varied landscape.",
	"discussing the us government policies.",
	"it’s up to us in government to decide.",
	"the uk, with its strong government, leads the way.",
	"we visited the uk and the US, and both have strong military forces.",
	"discussing the us military strategies.",
	"it’s up to us in military to decide.",
	"the uk, with its vast territory, has diverse landscapes.",
	"we visited the uk and the US, and both engage in diplomatic talks.",
	"it’s important for us to participate in international talks.",
	"the usa introduces a new bill for economic reform.",
	"we visited the uk and the US, and both consider a bill for environmental protection.",
	"the book of life",
	"node.js development on aws: an in-depth tutorial on server-side javascript deployment",
	"louis-iv extravaganza: a culinary journey with kellogss delights",
	"what's to say about this?",
	"google tensorflow",
	"the iphone's impact on modern communication: a sociolinguistic analysis",
	"backend and frontend",
	"back end and full stack developers",
	"vmware vs. virtualbox: a comparative study of virtualization software",
	"the science of nutrition: debunking myths and fads",
	"backend web development: building scalable apis with node.js",
	"nodejs development on aws: an in-depth tutorial on server-side javascript deployment",
	"the iphone's impact on modern communication: a sociolinguistic analysis",
	"back-end and front-end",
	"the art of negotiation: strategies for successful business deals",
	"Back-End Web Development: Building Scalable APIs with nodejs",
	"revolutionizing the publishing industry: insights from a cto on ebook development and innovation",
	"the future of ai: how iot and machine learning will change the world",
	"the impact of social media on mental health: a study of instagram, Tiktok, and SnapChat",
	"the future of devops: how to prepare for the next era of software development",
	"the business of ransomware: a study of raas marketplaces and their impact on cybersecurity",
	"ransomware attack patterns and detection techniques: a comparative analysis of machine learning and statistical approaches",
	"ransomware mitigation strategies in critical infrastructure: a framework for securing public and private sectors against cyber attacks",
	"cybersecurity threats and countermeasures: an overview of modern techniques and best practices",
	"the economics of cybersecurity: a study of the market forces driving information security strategies",
	"blockchain technology and cyber security: opportunities and challenges for secure digital transactions",
	"assessing cybersecurity risks in cloud computing environments: a comparative study of public and private clouds",
	"cybersecurity and human factors: understanding the role of human error in cyber attacks and mitigation strategies",
	"a comprehensive guide to a/b testing with github actions: best practices for optimizing your website!",
	"demystifying devops with aws and github: best practices for front-end and back-end development processes",
	"from faqs to wow: techniques for crafting effective customer support articles using github and aws",
	"the rise of saas on aws: exploring the future of cloud computing in business environments",
	"iaas or bust: how aws and infrastructure as code can enhance organizational performance",
	"mitigating ddos attacks on aws: strategies for protecting your web infrastructure using github",
	"maximizing organizational performance with aws: an examination of the roles of ceos and cmos",
	"mastering node.js on aws: an advanced guide to server-side javascript development",
	"building a basic web application on aws: a guide to back-end development for novices using github",
	"essential strategies for successful devops with aws and github: best practices for efficient software development",
	"web development for novices on aws: getting started with front-end development using github",
	"understanding ddos attacks on aws: a comprehensive introduction to denial of service attacks using github",
	"optimizing your website with aws: best practices and emerging techniques for a/b testing using github",
	"the future of devops on aws: emerging trends and predictions for the next decade",
	"the ultimate guide to iaas on aws: an in-depth examination of infrastructure as a service",
	"successful saas with aws: strategies for ctos",
	"cmos unleashed: leveraging the power of marketing in the digital age on aws",
	"devops and agile on aws: synergies and challenges for software development processes using github",
];

const titles = Array.from(new Set(titleArray));
const previousExamples = {};

function escapeHtml(value) {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

function splitComparableWords(value) {
	return value.match(/\s+|[^\s]+/g) || [];
}

function getComparableTokenIndexes(parts) {
	return parts.reduce((indexes, part, index) => {
		if (!/^\s+$/.test(part)) {
			indexes.push(index);
		}

		return indexes;
	}, []);
}

function createTokenAlignment(beforeParts, afterParts) {
	const beforeIndexes = getComparableTokenIndexes(beforeParts);
	const afterIndexes = getComparableTokenIndexes(afterParts);
	const beforeTokens = beforeIndexes.map((index) => beforeParts[index].toLowerCase());
	const afterTokens = afterIndexes.map((index) => afterParts[index].toLowerCase());
	const table = Array.from({ length: beforeTokens.length + 1 }, () => (
		Array(afterTokens.length + 1).fill(0)
	));

	for (let beforeIndex = beforeTokens.length - 1; beforeIndex >= 0; beforeIndex -= 1) {
		for (let afterIndex = afterTokens.length - 1; afterIndex >= 0; afterIndex -= 1) {
			table[beforeIndex][afterIndex] = beforeTokens[beforeIndex] === afterTokens[afterIndex]
				? table[beforeIndex + 1][afterIndex + 1] + 1
				: Math.max(table[beforeIndex + 1][afterIndex], table[beforeIndex][afterIndex + 1]);
		}
	}

	const alignment = new Map();
	let beforeIndex = 0;
	let afterIndex = 0;

	while (beforeIndex < beforeTokens.length && afterIndex < afterTokens.length) {
		if (beforeTokens[beforeIndex] === afterTokens[afterIndex]) {
			alignment.set(afterIndexes[afterIndex], beforeIndexes[beforeIndex]);
			beforeIndex += 1;
			afterIndex += 1;
		} else if (table[beforeIndex + 1][afterIndex] >= table[beforeIndex][afterIndex + 1]) {
			beforeIndex += 1;
		} else {
			afterIndex += 1;
		}
	}

	return alignment;
}

function highlight(beforeText, afterText) {
	const beforeParts = splitComparableWords(beforeText);
	const afterParts = splitComparableWords(afterText);
	const alignment = createTokenAlignment(beforeParts, afterParts);

	return afterParts.map((part, index) => {
		const escapedPart = escapeHtml(part);

		if (/^\s+$/.test(part)) {
			return escapedPart;
		}

		const beforeIndex = alignment.get(index);
		const beforePart = beforeIndex === undefined ? "" : beforeParts[beforeIndex];

		return beforePart === part
			? escapedPart
			: `<span class="highlight">${escapedPart}</span>`;
	}).join("");
}

function getSelectedStyle() {
	const selectedStyle = document.querySelector('input[name="styleSelect"]:checked');
	return selectedStyle ? selectedStyle.value : "apa";
}

function convertToTitleCase(inputString, styleValue) {
	return inputString.toTitleCase({ style: styleValue });
}

function processInput() {
	const textField = document.getElementById("textField");
	const beforeEl = document.getElementById("before");
	const afterEl = document.getElementById("after");
	const titleConvertBtn = document.getElementById("titleConvertBtn");

	if (!textField || !beforeEl || !afterEl || !titleConvertBtn) return;

	const inputString = textField.value.trim();
	titleConvertBtn.toggleAttribute("disabled", inputString === "");

	if (inputString === "") {
		beforeEl.textContent = "";
		afterEl.textContent = "";
		return;
	}

	const titleCasedString = convertToTitleCase(inputString, getSelectedStyle());
	beforeEl.textContent = inputString;
	afterEl.dataset.value = titleCasedString;
	afterEl.innerHTML = highlight(inputString, titleCasedString);
}

function setExample(value, style) {
	const textField = document.getElementById("textField");
	if (!textField) return;

	textField.value = value;

	if (style) {
		const styleInput = document.querySelector(`input[name="styleSelect"][value="${style}"]`);
		if (styleInput) {
			styleInput.checked = true;
		}
	}

	processInput();
}

function getExampleValue(key) {
	const examples = titleExamples[key];

	if (!Array.isArray(examples)) {
		return examples;
	}

	const availableExamples = examples.filter((example) => example !== previousExamples[key]);
	const pool = availableExamples.length > 0 ? availableExamples : examples;
	const value = pool[Math.floor(Math.random() * pool.length)];
	previousExamples[key] = value;

	return value;
}

function shuffleTitles() {
	const title = titles[Math.floor(Math.random() * titles.length)];
	setExample(title);
}

async function copyOutput() {
	const afterEl = document.getElementById("after");
	const copyOutputBtn = document.getElementById("copyOutputBtn");
	if (!afterEl || !copyOutputBtn) return;

	const value = afterEl.dataset.value || afterEl.textContent;
	if (!value) return;

	try {
		await navigator.clipboard.writeText(value);
	} catch (error) {
		const fallback = document.createElement("textarea");
		fallback.value = value;
		fallback.setAttribute("readonly", "");
		fallback.style.position = "absolute";
		fallback.style.left = "-9999px";
		document.body.appendChild(fallback);
		fallback.select();
		document.execCommand("copy");
		document.body.removeChild(fallback);
	}

	copyOutputBtn.textContent = "Copied";
	copyOutputBtn.classList.add("is-copied");

	window.setTimeout(() => {
		copyOutputBtn.textContent = "Copy";
		copyOutputBtn.classList.remove("is-copied");
	}, 1400);
}

function initializeTitleCaser() {
	const textField = document.getElementById("textField");
	const titleConvertBtn = document.getElementById("titleConvertBtn");
	const titleShuffleBtn = document.getElementById("titleShuffleBtn");
	const copyOutputBtn = document.getElementById("copyOutputBtn");

	if (!textField || !titleConvertBtn || !titleShuffleBtn || !copyOutputBtn) return;

	textField.addEventListener("input", processInput);
	titleConvertBtn.addEventListener("click", processInput);
	titleShuffleBtn.addEventListener("click", shuffleTitles);
	copyOutputBtn.addEventListener("click", copyOutput);

	document.querySelectorAll('input[name="styleSelect"]').forEach((input) => {
		input.addEventListener("change", processInput);
	});

	document.querySelectorAll(".example-chip[data-example]").forEach((button) => {
		button.addEventListener("click", () => {
			const key = button.dataset.example;
			const preferredStyleByExample = {
				ap: "ap",
				apa: "apa",
				nyt: "nyt",
				wikipedia: "wikipedia",
			};
			const preferredStyle = preferredStyleByExample[key] || null;
			setExample(getExampleValue(key), preferredStyle);
		});
	});

	setExample(getExampleValue("brands"), "apa");
}

initializeTitleCaser();
