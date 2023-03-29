function highlight(beforeText, afterText) {
  const beforeWords = beforeText.trim().split(/\s+/);
  const afterWords = afterText.trim().split(/\s+/);
  let text = "";

  const length = Math.min(beforeWords.length, afterWords.length);
  for (let i = 0; i < length; i++) {
    if (afterWords[i] !== beforeWords[i]) {
      text += `<span class="highlight">${afterWords[i]}</span> `;
    } else {
      text += afterWords[i] + " ";
    }
  }

  if (afterWords.length > beforeWords.length) {
    text += afterWords.slice(beforeWords.length).join(" ");
  }

  return text.trim();
}

function convertToTitleCase(inputString) {
    const styleSelect = document.getElementById("styleSelect");
    const styleValue = styleSelect.value;

    const options = { style: styleValue };
    const titleCasedString = inputString.toTitleCase(options);

    return titleCasedString;
}

function processInput(inputString, styleSelect, beforeEl, afterEl) {
    const options = { style: styleSelect.value };
    const titleCasedString = convertToTitleCase(inputString, options);
  beforeEl.textContent = inputString;
  afterEl.textContent = titleCasedString;
  const highlightedText = highlight(beforeEl.textContent, afterEl.textContent);
  afterEl.innerHTML = highlightedText;
}

function handleTitleCase() {
    const textField = document.getElementById("textField");
    if (textField.value === '') {
        return
    };

  const styleSelect = document.getElementById("styleSelect");
  const beforeEl = document.querySelector("#before");
  const afterEl = document.querySelector("#after");
  const titleConvertBtn = document.getElementById("titleConvertBtn");

  titleConvertBtn.addEventListener("click", () => {
    if (textField.value === '') {
        titleConvertBtn.classList.add('is-empty');
        return;
    }
    titleConvertBtn.classList.remove('is-empty');
    const inputString = textField.value;
    processInput(inputString, styleSelect, beforeEl, afterEl);
  });
}

function startTitleCasing() {
  const textField = document.getElementById("textField");
  // textField.value
  if (textField.value === '') return;

  const beforeEl = document.getElementById("before");
  const afterEl = document.getElementById("after");
  let intervalId = null;

    function debounce(func, delay) {
      let timerId;
      return function(...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => func.apply(this, args), delay);
      };
    }

    const debouncedTitleCase = debounce(() => {
      const inputString = textField.value;
      afterEl.innerHTML = '';

      if (inputString === '') return;

      const titleCasedString = convertToTitleCase(inputString);
      beforeEl.textContent = inputString;
      afterEl.textContent = titleCasedString;

      const highlightedText = highlight(beforeEl.textContent, afterEl.textContent);
      afterEl.innerHTML = highlightedText;
    }, 1000);

    textField.addEventListener('input', debouncedTitleCase);

  // textField.addEventListener("focus", handleFocus);

  // function handleFocus() {
  //   let timeLeft = 3;
  //   const timerEl = document.getElementById("timer");
  //   timerEl.textContent = `Time left: ${timeLeft}s`;

  //   intervalId = setInterval(() => {
  //     timeLeft--;
  //     timerEl.textContent = `Time left: ${timeLeft}s`;

  //     if (timeLeft === 0) {
  //       clearInterval(intervalId);

  //       const inputString = textField.value;
  //       afterEl.innerHTML = '';

  //       if (inputString === '') return;

  //       const titleCasedString = convertToTitleCase(inputString);
  //       beforeEl.textContent = inputString;
  //       afterEl.textContent = titleCasedString;

  //       const highlightedText = highlight(beforeEl.textContent, afterEl.textContent);
  //       afterEl.innerHTML = highlightedText;
  //     }
  //   }, 1000);

  //   textField.addEventListener("blur", handleBlur);
  // }

  // function handleBlur() {
  //   clearInterval(intervalId);
  //   textField.removeEventListener("blur", handleBlur);
  //   textField.removeEventListener("focus", handleFocus);
  //   textField.addEventListener("focus", handleFocus);
  // }

  // textField.addEventListener("focus", handleFocus);
}



function clearOutputIfEmpty() {
  const textField = document.getElementById("textField");
  const afterEl = document.getElementById("after");
  const titleConvertBtn = document.getElementById("titleConvertBtn");

  if (document.activeElement === textField && textField.value === '') {
    titleConvertBtn.classList.add("is-empty");
    titleConvertBtn.setAttribute('disabled', '');
    afterEl.innerHTML = '';
  } else {
    titleConvertBtn.classList.remove("is-empty");
    titleConvertBtn.removeAttribute('disabled');
  }
}




const titles = [
    "nodejs development on aws: an in-depth tutorial on server-side javascript deployment",
    "nodejs development on aws: an in-depth tutorial on server-side javascript deployment",
    "GOOgle and VMWare",
    "the iPhone's impact on modern communication: a sociolinguistic analysis",
    "back-end and front-end",
    "VMware vs. VirtualBox: a comparative study of virtualization software",
    "the art of negotiation: strategies for successful business deals",
    "Back-End Web Development: Building Scalable APIs with nodejs",
    "revolutionizing the publishing industry: insights from a cto on ebook development and innovation",
    "the future of ai: how iot and machine learning will change the world",
    "the impact of social media on mental health: a study of instagram, Tiktok, and SnapChat",
    "the future of devops: how to prepare for the next era of software development",
    "GooGlE vs. VirtualBox: a comparative study of virtualization software",
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

let currentIndex = 0;
function shuffleTitles() {
    for (let i = titles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [titles[i], titles[j]] = [titles[j], titles[i]];
    }
    const title = titles[0];
    const textField = document.getElementById("textField");
    textField.value = title;
    document.getElementById("titleConvertBtn").click();
}


function initializeTitleCaser() {
  startTitleCasing();

  const titleConvertBtn = document.getElementById("titleConvertBtn");
  const titleShuffleBtn = document.getElementById("titleShuffleBtn");

  titleConvertBtn.addEventListener("click", handleTitleCase);

  const titleField = document.getElementById("textField");
  titleField.addEventListener("input", clearOutputIfEmpty);

  titleShuffleBtn.addEventListener("click", () => {
    titleConvertBtn.classList.remove("is-empty");
    titleConvertBtn.removeAttribute('disabled');

    shuffleTitles();
    titleField.textContent = titles[0];
    titleConvertBtn.click();
  });

  
  titleShuffleBtn.click();
}

initializeTitleCaser();

