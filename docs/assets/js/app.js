/**
 * Highlight the characters that are different between two strings.
 *
 * @param {string} beforeText - The original string.
 * @param {string} afterText - The updated string.
 * @param {boolean} ignoreCase - Whether to ignore case when comparing characters.
 *
 * @returns {string} A new string with the changed characters wrapped in a <span class="highlight"> element.
 */
function highlight ( beforeText, afterText, ignoreCase = false ) {
	const textArr = []; // create an empty array to store the characters
	const minLength = Math.min ( beforeText.length, afterText.length ); // get the length of the shorter string
	
	// loop through each character in the shorter string
	for ( let i = 0; i < minLength; i++ ) {
		const beforeChar = ignoreCase
			? beforeText.charAt ( i ).toLowerCase ()
			: beforeText.charAt ( i ); // get the character at the current index of the original string
		const afterChar = ignoreCase
			? afterText.charAt ( i ).toLowerCase ()
			: afterText.charAt ( i ); // get the character at the current index of the updated string
		
		// check if the characters are different and not a dash
		if ( beforeChar !== afterChar && beforeChar !== "-" && afterChar !== "-" ) {
			// wrap the changed character in a <span class="highlight"> an element and add it to the array
			textArr.push ( `<span class="highlight">${ afterChar }</span>` );
		} else {
			textArr.push ( afterChar ); // add the unchanged character to the array
		}
	}
	
	// check if the updated string is longer than the original string
	if ( afterText.length > beforeText.length ) {
		textArr.push (
			`<span class="highlight">${ afterText.slice ( beforeText.length ) }</span>`
		); // wrap the added characters in a <span class="highlight"> an element and add them to the array
	}
	
	return textArr.join ( "" ); // join the characters in the array into a string and return it
}

/**
 * Converts the input string to title case using the selected style from radio buttons.
 *
 * @param {string} inputString - The input string to convert to title case.
 * @returns {string} The converted string in title case.
 */
function convertToTitleCase(inputString, options) {
	console.log("[convertToTitleCase] Input:", inputString);
	console.log("[convertToTitleCase] Options:", options);

	const result = inputString.toTitleCase(options);
	console.log("[convertToTitleCase] Result:", result);
	return result;
}

/**
 * Processes the input string and updates the before and after elements.
 * @param {string} inputString - The input string to be processed.
 * @param {HTMLElement} styleSelect - The select element containing the style option.
 * @param {HTMLElement} beforeEl - The element where the input string is displayed.
 * @param {HTMLElement} afterEl - The element where the processed string is displayed.
 * @throws {Error} Invalid input if any of the input parameters are missing.
 */
function processInput(inputString, styleValue, beforeEl, afterEl) {
	console.log("[processInput] Input String:", inputString);
	console.log("[processInput] Style Value:", styleValue);

	if (!inputString || !styleValue || !beforeEl || !afterEl) {
		console.error("[processInput] - Invalid input");
		throw new Error("Invalid input");
	}

	const options = { style: styleValue };
	const titleCasedString = convertToTitleCase(inputString, options);

	console.log("[processInput] Title Cased String:", titleCasedString);

	beforeEl.textContent = inputString;
	afterEl.innerHTML = highlight(inputString, titleCasedString);
}

/**
 * Handles the "Convert" button click event by retrieving the input text from the textarea,
 * getting the selected title case style from the radio buttons, and passing them to the processInput function.
 * Updates the "Convert" button style if the textarea is empty.
 */
function handleTitleCase () {
	const textField = document.getElementById("textField");
	const beforeEl = document.querySelector("#before");
	const afterEl = document.querySelector("#after");
	const titleConvertBtn = document.getElementById("titleConvertBtn");

	if (!textField || !beforeEl || !afterEl || !titleConvertBtn) return;

	const inputString = textField.value.trim();

	if (inputString === "") {
		titleConvertBtn.classList.add("is-empty");
		return;
	}

	titleConvertBtn.classList.remove("is-empty");

	const styleSelect = document.querySelector('input[name="styleSelect"]:checked');
	if (!styleSelect) {
		console.error("[handleTitleCase] - No style selected");
		return;
	}

	processInput(inputString, styleSelect.value, beforeEl, afterEl);
}


/**
 * Sets up the title casing functionality on the input field.
 */
function startTitleCasing () {
	const textField = document.getElementById ( "textField" );
	// Check if text field is empty
	if ( textField.value === "" ) return;
	
	const beforeEl = document.getElementById ( "before" );
	const afterEl = document.getElementById ( "after" );
	let intervalId = null;
	
	// Define debounce function to limit the frequency of title casing
	function debounce ( func, delay ) {
		let timerId;
		return function ( ...args ) {
			clearTimeout ( timerId );
			timerId = setTimeout ( () => func.apply ( this, args ), delay );
		};
	}
	
	// Apply debounce to the title casing function to prevent it from running too often
	const debouncedTitleCase = debounce ( () => {
		const inputString = textField.value;
		afterEl.innerHTML = "";
		// Check if input is empty before processing
		if ( inputString === "" ) return;
		
		const titleCasedString = convertToTitleCase ( inputString );
		beforeEl.textContent = inputString;
		afterEl.textContent = titleCasedString;
		
		afterEl.innerHTML = highlight ( beforeEl.textContent, afterEl.textContent );
	}, 1000 );
	
	// Attach event listener to text field to trigger title casing
	textField.addEventListener ( "input", debouncedTitleCase );
}

/**
 * Clear the output element if the input field is empty.
 * Toggle the 'is-empty' class and the 'disabled' attribute of the 'titleConvertBtn'.
 * @throws {Error} If there is an error while executing the function.
 * @returns {void}
 */
function clearOutputIfEmpty () {
	try {
		const { value } = document.getElementById ( "textField" );
		const afterEl = document.getElementById ( "after" );
		const titleConvertBtn = document.getElementById ( "titleConvertBtn" );
		
		titleConvertBtn.classList.toggle ( "is-empty", value === "" );
		titleConvertBtn.toggleAttribute ( "disabled", value === "" );
		
		if ( document.activeElement === textField && value === "" ) {
			afterEl.innerHTML = "";
		}
	} catch ( err ) {
		console.error ( "Error in clearOutputIfEmpty function:", err );
		throw err;
	}
}

function shuffleTitles () {
	for ( let i = titles.length - 1; i > 0; i-- ) {
		const j = Math.floor ( Math.random () * (i + 1) );
		[ titles[i], titles[j] ] = [ titles[j], titles[i] ];
	}

	const title = titles[0];
	const textField = document.getElementById ( "textField" );
	textField.value = title;
}


/**
 * Initializes the title caser by adding event listeners to the appropriate elements
 * and calling the necessary functions.
 */
function initializeTitleCaser () {
	startTitleCasing();

	const titleConvertBtn = document.getElementById("titleConvertBtn");
	const titleShuffleBtn = document.getElementById("titleShuffleBtn");
	const titleField = document.getElementById("textField");

	// Replace convert button to prevent stacked listeners
	const newConvertBtn = titleConvertBtn.cloneNode(true);
	titleConvertBtn.parentNode.replaceChild(newConvertBtn, titleConvertBtn);
	newConvertBtn.addEventListener("click", handleTitleCase);

	titleField.addEventListener("input", clearOutputIfEmpty);

	titleShuffleBtn.addEventListener("click", () => {
		shuffleTitles(); // sets textField.value
		newConvertBtn.classList.remove("is-empty");
		newConvertBtn.removeAttribute("disabled");
		handleTitleCase();
	});

	// Shuffle once and convert on load (no duplicate trigger)
	shuffleTitles();
	handleTitleCase();
}


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
	"louis-iv Extravaganza: A Culinary Journey with kellogss Delights",
	"what's to say about this?",
	"google tensorflow",
	"the iphone\'s impact on modern communication: a sociolinguistic analysis",
	"backend and frontend",
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
	"blockchain technology and cybersecurity: opportunities and challenges for secure digital transactions",
	"assessing cybersecurity risks in cloud computing environments: a comparative study of public and private clouds",
	"cybersecurity and human factors: understanding the role of human error in cyber attacks and mitigation strategies",
	"a comprehensive guide to a/b testing with github actions: best practices for optimizing your website!",
	"nodejs development on aws: an in-depth tutorial on server-side javascript deployment",
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
	"devops and agile on aws: synergies and challenges for software development processes using github"
];
const titles = Array.from(new Set(titleArray));

initializeTitleCaser ();
