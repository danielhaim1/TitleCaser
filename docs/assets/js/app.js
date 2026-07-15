const titleExamples = {
	ap: [
		"inside the pentagon’s race to secure ai systems before the next crisis",
		"inside a high-profile, long-term plan for e-commerce growth",
		"what the us learned from nato drills in the baltic sea",
		"how apple, google, and microsoft are rewriting the rules of ai",
		"why the next chip shortage may start far from silicon valley",
		"the fight over water rights in a hotter american west",
		"how hospitals are preparing for a new wave of ransomware attacks",
		"what to know about the us-uk defense pact",
	],
	apa: [
		"artificial intelligence in public schools: governance, risk, and classroom practice",
		"cloud security after a major breach: lessons for public and private institutions",
		"civilian harm in modern warfare: evidence from urban conflict zones",
		"supply chain resilience after the pandemic: a comparative study of ports and rail networks",
		"the economics of electric vehicle adoption in rural communities",
		"privacy, surveillance, and facial recognition in democratic societies",
		"disinformation during elections: platform policy and public trust",
		"climate adaptation finance for cities facing extreme heat",
	],
	nyt: [
		"inside the race to build safer ai tools for public schools",
		"how nato’s eastern flank became a proving ground for drone warfare",
		"why open-source maintainers are rethinking software security",
		"the people behind a new wave of climate technology start-ups",
		"what a us-uk agreement could mean for digital trade",
		"when social media platforms become the new search engines",
		"how a small city became a test case for the clean energy transition",
		"why the future of work still runs through the office",
	],
	quotes: [
		"“we are not ready,” says former nato commander after cyber review",
		"‘this changes the map,’ officials say after the cease-fire vote",
		"'the cloud bill came due,' says the city’s technology chief",
		"(inside the aws migration) lessons from a public records crisis",
		"“why now?” asks the editor after the cnn interview",
		"‘the best ideas travel fast,’ says open-source maintainer",
		"«bonjour from paris,» says the github contributor",
	],
	wikipedia: [
		"the report cited BBC News, Sky News, Al Jazeera, and the public hearing",
		"The article compared Operation Desert Storm with the Gulf War air campaign",
		"the committee cited The Washington Post after the public event",
		"cnn international and BBC News covered the technology hearing",
		"the article mentioned The Lincoln Project and the local election",
		"nbc, msnbc, and cnbc covered the antitrust hearing",
		"the report compared the Treaty of Versailles with the Geneva Conventions",
	],
	brands: [
		"how apple’s iphone changed the economics of mobile payments",
		"inside amazon’s push to make aws the backbone of public-sector ai",
		"why google, microsoft, and openai are fighting over search habits",
		"shopify merchants test tiktok, instagram, and snapchat campaigns",
		"how github actions became critical infrastructure for open-source teams",
		"tesla, toyota, and byd race to lower the cost of electric vehicles",
		"vmware teams compare virtualbox and kubernetes migration plans",
		"why mcdonalds and coca-cola still matter in global brand strategy",
	],
	acronyms: [
		"mitigating ddos attacks on aws after a hospital network outage",
		"from faqs to filings: what ceos and cmos told investors about ai",
		"the future of ai, iot, and saas in industrial supply chains",
		"a/b testing with github actions for ctos and product teams",
		"us-uk-led talks focus on ai, eu policy, and cloud security",
		"the uk and the us debate iaas rules for government agencies",
		"asap repairs, diy radios, and nato logistics after the flood",
		"tbd roadmap for apis, faqs, and ddos response teams",
	],
};

const titleArray = [
	"inside the race to secure ai systems before the next cyberattack",
	"how apple’s iphone changed the economics of mobile payments",
	"why google, microsoft, and openai are fighting over search habits",
	"the chip war’s next front may be advanced packaging",
	"how github actions became critical infrastructure for open-source teams",
	"inside amazon’s push to make aws the backbone of public-sector ai",
	"why cloud costs are forcing start-ups to rethink their architecture",
	"how ransomware gangs turned help desks into a security risk",
	"the quiet fight over who owns the data inside smart cars",
	"why hospitals still struggle to defend against ddos attacks",
	"how ai search could change the business of online publishing",
	"inside the open-source battle over software supply chains",
	"why cybersecurity teams are hiring more writers and translators",
	"what quantum computing means for today’s encryption systems",
	"how tiktok, instagram, and youtube compete for the same news audience",
	"why edge computing is returning to the factory floor",
	"inside the race to cool the next generation of data centers",
	"how electric utilities are preparing for ai-driven demand",
	"why digital wallets are becoming a new front in consumer banking",
	"the next wave of fraud may begin with synthetic voices",
	"how satellite internet is changing disaster response",
	"why chip designers are betting on specialized processors",
	"inside the battle to keep children’s data out of ad markets",
	"how the password finally started to lose its grip",
	"why a software update can ground an airline",
	"inside the effort to make government websites usable again",
	"how ai tools are reshaping the work of paralegals",
	"why small businesses are moving away from one-size-fits-all software",
	"the hidden energy cost of training large ai models",
	"how blockchain moved from hype to back-office infrastructure",
	"why cloud outages now look like public infrastructure failures",
	"inside the push to audit algorithms before they reach courtrooms",
	"how developers are using node.js in public-sector data projects",
	"why the browser may become the next operating system",
	"inside the fight over app store fees and mobile competition",
	"how cybersecurity insurance changed the way companies disclose breaches",
	"why cities are building digital twins of roads, bridges, and water systems",
	"the new politics of facial recognition at airports",
	"how e-commerce sellers are preparing for a return to slower growth",
	"why legacy code still runs the global financial system",
	"inside the market for zero-day vulnerabilities",
	"how autonomous trucks are changing the economics of freight",
	"why software teams are bringing documentation back into the workflow",
	"inside the race to make batteries safer, cheaper, and easier to recycle",
	"how artificial intelligence is changing weather forecasting",
	"why remote work made identity security harder",
	"inside the fight to standardize usb-c charging rules",
	"how public libraries became front-line technology centers",
	"why the next privacy fight may be about location data",
	"inside the effort to keep open-source maintainers from burning out",
	"how nato’s eastern flank became a proving ground for drone warfare",
	"inside the pentagon’s lessons from the war in ukraine",
	"why taiwan strait exercises matter to global supply chains",
	"how the us navy is adapting to unmanned surface vessels",
	"inside operation neptune spear and the limits of special operations secrecy",
	"why the warsaw pact still shapes europe’s security map",
	"what operation desert storm taught planners about air power",
	"how nato logistics depend on rail lines, ports, and fuel depots",
	"inside the new debate over missile defense in eastern europe",
	"why the south china sea remains a test of maritime law",
	"how veterans are changing the politics of burn pit legislation",
	"inside the effort to modernize the defense industrial base",
	"why the arctic is becoming a military planning problem",
	"how the geneva conventions apply to cyber operations",
	"inside the race to protect undersea cables from sabotage",
	"why operation overlord still shapes military planning",
	"how drones changed artillery tactics on the front line",
	"inside the debate over cluster munitions and civilian harm",
	"why the north atlantic treaty still anchors european defense",
	"how the us coast guard became central to pacific strategy",
	"inside the lessons of operation allied force for modern air campaigns",
	"why military recruitment is becoming a labor-market story",
	"how defense contractors are competing for ai procurement deals",
	"inside the push to harden bases against extreme weather",
	"why the persian gulf remains central to energy security",
	"how the treaty of versailles shaped the century that followed",
	"inside the fragile politics of cease-fire monitoring",
	"why military families are fighting for better housing oversight",
	"how nato exercises test bridges, roads, and civilian infrastructure",
	"inside the intelligence challenge of commercial satellite imagery",
	"why the korean dmz remains one of the world’s most dangerous borders",
	"how the us army is rethinking long-range fires",
	"inside the air force’s plan for next-generation refueling",
	"why the marines are redesigning units for island warfare",
	"how the five eyes alliance adapted to the age of cyber espionage",
	"inside the renewed debate over the open skies treaty",
	"why the chemical weapons convention still matters",
	"how operation inherent resolve changed counterterrorism partnerships",
	"inside the challenge of clearing mines after a cease-fire",
	"why nato standardization can decide what reaches the battlefield",
	"how the nuclear non-proliferation treaty survived repeated crises",
	"inside the legal fight over autonomous weapons",
	"why the senkaku islands remain a flashpoint in east asia",
	"how operation desert shield reshaped us deployments in the gulf",
	"inside the competition to build cheaper counter-drone systems",
	"why military medicine is studying trauma care from urban battles",
	"how the biological weapons convention struggles with new science",
	"inside the pressure to expand ammunition production in europe",
	"why the taiwan strait is a shipping story as much as a military one",
	"how the ottawa treaty changed the politics of land mines",
	"inside the effort to train pilots for a drone-heavy battlefield",
	"why command posts are moving, hiding, and getting smaller",
	"how climate change is altering defense planning in the pacific",
	"inside the politics of reconstruction after urban warfare",
	"why the next defense budget fight will start with shipyards",
	"how the chicago river became a case study in urban adaptation",
	"why rural hospitals are fighting to keep maternity wards open",
	"inside the battle over school funding formulas",
	"how a heat wave exposed the limits of the power grid",
	"why renters are organizing against algorithmic pricing",
	"inside the new politics of public transit after the pandemic",
	"how college sports became a test case for labor law",
	"why local newspapers are turning to nonprofit ownership",
	"inside the fight over water rights in the american west",
	"how climate risk is changing the insurance market",
	"why teachers are rethinking homework in the age of ai",
	"inside the effort to bring grocery stores back to food deserts",
	"how the opioid settlement money is being spent",
	"why public defenders say court backlogs are a constitutional crisis",
	"inside the debate over congestion pricing in big cities",
	"how state legislatures became the center of voting rights fights",
	"why libraries are on the front line of free speech battles",
	"inside the revival of american manufacturing policy",
	"how the farm bill became a climate policy vehicle",
	"why salmon recovery has become a fight over dams and data",
	"inside the debate over who pays for wildfire prevention",
	"how the housing shortage reshaped local politics",
	"why child care costs are becoming an economic growth problem",
	"inside the rise of union campaigns at universities",
	"how museums are rethinking the return of cultural artifacts",
	"why public health agencies are rebuilding trust one clinic at a time",
	"inside the fight over clean water rules",
	"how the supreme court changed the map of environmental regulation",
	"why independent bookstores are thriving in some downtowns",
	"inside the economics of stadium subsidies",
	"how the pandemic changed the way americans think about sick leave",
	"why state budgets are bracing for slower tax revenue",
	"inside the debate over fare-free buses",
	"how immigrant workers keep the food system running",
	"why emergency rooms became the safety net for mental health care",
	"inside the fight to regulate short-term rentals",
	"how school nurses became central to public health planning",
	"why drought is forcing cities to rethink lawns",
	"inside the push to make heat waves eligible for disaster aid",
	"how tribal nations are reclaiming land and water authority",
	"why the future of downtown depends on housing",
	"inside the campaign to make insulin affordable",
	"how bankruptcy courts became a forum for mass-tort settlements",
	"why states are racing to rewrite privacy laws",
	"inside the debate over police drones and public oversight",
	"how a new rail tunnel could reshape regional commuting",
	"why college admissions are changing after affirmative action",
	"inside the fight over sports betting advertising",
	"how public schools are adapting to declining enrollment",
	"why restaurant workers are pushing for predictable schedules",
	"inside the economics of live music after the ticketing backlash",
	"how sea-level rise is changing mortgage risk",
	"why cities are planting trees as public health infrastructure",
	"inside the politics of disaster recovery after a hurricane",
	"how the census shapes the fight for federal money",
	"why rural broadband remains a civil rights issue",
	"inside the debate over private equity in health care",
	"how families navigate the maze of elder care",
	"why the cost of college textbooks keeps rising",
	"inside the effort to make public meetings less hostile",
	"how farmers are using soil data to manage drought",
	"why prison education programs are getting a second look",
	"inside the fight over bilingual education",
	"how local election offices prepare for misinformation",
	"why climate migration is already changing school districts",
	"inside the effort to restore passenger rail service",
	"how hospital mergers change prices for patients",
	"why the debate over zoning has moved to state capitals",
	"inside the campaign to protect night-shift workers",
	"how the national parks are managing record crowds",
	"why food banks are serving more working families",
	"inside the fight over library e-book pricing",
	"how court reporters became a bottleneck in the justice system",
	"why farmers markets are becoming small-business incubators",
	"inside the effort to preserve historically black colleges",
	"how the politics of vaccination changed pediatric care",
	"why the next water crisis may begin with aging pipes",
	"inside the rise of climate litigation against major polluters",
	"how small towns are using arts funding to rebuild main streets",
	"why wildfire smoke changed the conversation about indoor air",
	"inside the effort to map every lead pipe in america",
	"how public universities are balancing research and affordability",
	"why older americans are returning to the workforce",
	"inside the fight over medical debt on credit reports",
	"how the film industry is adapting to a changing theater business",
	"why professional women’s sports are entering a new investment era",
	"inside the debate over school phone bans",
	"how state courts are shaping abortion access",
	"why community colleges are central to workforce policy",
	"inside the politics of high-speed rail",
	"how chefs are redesigning menus for climate-conscious diners",
	"why animal shelters are struggling after the adoption boom",
	"inside the new economics of local television news",
	"how cities are converting empty offices into apartments",
	"why family farms are turning to agritourism",
	"inside the effort to make elections easier to audit",
	"how public defenders use data to challenge cash bail",
	"why school lunch programs became a national policy fight",
	"inside the movement to bring back neighborhood pharmacies",
	"how flood maps are reshaping the real estate market",
	"why the arts are returning to downtown recovery plans",
	"inside the debate over four-day school weeks",
	"how pediatric hospitals are planning for climate-related illness",
	"why many americans still cannot access a primary care doctor",
	"inside the economics of college football realignment",
	"how labor shortages changed the restaurant reservation",
	"why city councils are debating noise as a public health issue",
	"inside the effort to restore trust in public statistics",
	"how the rise of heat insurance could change climate adaptation",
	"why historians are reexamining the legacy of the new deal",
	"inside the fight over who controls the colorado river",
	"how rural libraries became hubs for telehealth appointments",
	"why the future of recycling depends on packaging design",
	"inside the campaign to expand access to dental care",
	"how teachers use local history to rebuild civic education",
	"why the next housing fight may be over parking minimums",
	"inside the effort to protect poll workers from harassment",
	"how public art became part of infrastructure planning",
	"why hospitals are redesigning emergency rooms for extreme heat",
	"inside the debate over artificial turf and youth sports",
	"how cities are preparing cooling centers before the next heat dome",
	"why the future of newspapers may depend on state tax credits",
	"inside the fight over rent control in fast-growing cities",
	"how school districts are using solar panels to cut energy bills",
	"why medical schools are changing how they teach nutrition",
	"inside the effort to make disaster aid easier to apply for",
	"how the next generation of farmers is learning climate adaptation",
	"why a single bridge can decide the fate of a regional economy",
	"inside the new politics of public bathrooms",
	"how the cost of veterinary care became a family budget issue",
	"why states are reconsidering juvenile sentencing laws",
	"inside the push to make playgrounds safer in extreme heat",
	"how local governments are preparing for an aging population",
	"why the next big education fight may be over absenteeism",
	"inside the campaign to preserve indigenous languages",
	"how regional theaters are rebuilding audiences after the pandemic",
	"why the economics of recycling still depend on global markets",
	"inside the effort to make sidewalks part of climate policy",
	"how nurses are reshaping hospital staffing debates",
	"why the future of public radio may depend on local membership",
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
