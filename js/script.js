// url hendler
function getCurrentURL () {
  return window.location.href
}

const url = getCurrentURL()
console.log('current url:', url);
const lang = document.documentElement.lang;
console.log('current lang:', lang);

const phoneId = document.getElementById('phone');
const emailId = document.getElementById('email');
const telegramId = document.getElementById('telegram');
const whatsAppId = document.getElementById('whats_app');
const teamsId = document.getElementById('teams');
const linkedinId = document.getElementById('linkedin');
const githubId = document.getElementById('github');
const saveBtn = document.getElementById('save');

const translations = {
  en: {
    phone_hover: "Call Me +380 50 578 22 33",
    phone_default: "+380 50 578 22 33",
    email_hover: "Click to write me makarenkoj53@gmail.com",
    email_default: "makarenkoj53@gmail.com",
    telegram_hover: "Click to write me @makarenkoj",
    telegram_default: "@makarenkoj",
    whatsapp_hover: "Click to write me on WhatsApp",
    whatsapp_default: "WhatsApp",
    teams_hover: "Click to write me in Microsoft Teams",
    teams_default: "Microsoft Teams",
    linkedin_hover: "Look at me on LinkedIn",
    linkedin_default: "My LinkedIn",
    github_hover: "Look at my code on GitHub @makarenkoj",
    github_default: "makarenkoj"
  },
  uk: {
    phone_hover: "Подзвони мені +380 50 578 22 33",
    phone_default: "+380 50 578 22 33",
    email_hover: "Напиши мені на makarenkoj53@gmail.com",
    email_default: "makarenkoj53@gmail.com",
    telegram_hover: "Напиши мені у Telegram @makarenkoj",
    telegram_default: "@makarenkoj",
    whatsapp_hover: "Напиши мені у WhatsApp",
    whatsapp_default: "WhatsApp",
    teams_hover: "Напиши мені у Microsoft Teams",
    teams_default: "Microsoft Teams",
    linkedin_hover: "Подивись мій профіль у LinkedIn",
    linkedin_default: "Мій LinkedIn",
    github_hover: "Подивись мій код на GitHub @makarenkoj",
    github_default: "makarenkoj"
  },
  it: {
    phone_hover: "Chiamami +39 351 334 42 16",
    phone_default: "+39 351 334 42 16",
    email_hover: "Scrivimi a makarenkoj53@gmail.com",
    email_default: "makarenkoj53@gmail.com",
    telegram_hover: "Scrivimi su Telegram @makarenkoj",
    telegram_default: "@makarenkoj",
    whatsapp_hover: "Scrivimi su WhatsApp",
    whatsapp_default: "WhatsApp",
    teams_hover: "Scrivimi in Microsoft Teams",
    teams_default: "Microsoft Teams",
    linkedin_hover: "Guarda il mio profilo su LinkedIn",
    linkedin_default: "Il mio LinkedIn",
    github_hover: "Guarda il mio codice su GitHub @makarenkoj",
    github_default: "makarenkoj"
  }
};

const t = translations[lang] || translations.en;

function addHoverEffect(el, hoverText, defaultText) {
  if (!el) return;
  const link = el.querySelector(".contacts-list");
  if (!link) return;

  el.addEventListener("mouseenter", () => link.textContent = hoverText);
  el.addEventListener("mouseleave", () => link.textContent = defaultText);
}

addHoverEffect(phoneId, t.phone_hover, t.phone_default);
addHoverEffect(emailId, t.email_hover, t.email_default);
addHoverEffect(telegramId, t.telegram_hover, t.telegram_default);
addHoverEffect(whatsAppId, t.whatsapp_hover, t.whatsapp_default);
addHoverEffect(teamsId, t.teams_hover, t.teams_default);
addHoverEffect(linkedinId, t.linkedin_hover, t.linkedin_default);
addHoverEffect(githubId, t.github_hover, t.github_default);

// resolve data parts
const apiKey = 'f6b2f6d81b934d4a99388d30de19365f',
      address = 'https://api.ipgeolocation.io/ipgeo?apiKey=API_KEY&ip=8.8.8.8';

let clientUserInfo,
    backEndUrl;

if (url == 'http://127.0.0.1:5500/index.html' || url == 'http://127.0.0.1:5500/index_en.html' || url == 'http://127.0.0.1:5500/index_it.html') {
    backEndUrl = 'http://localhost:3000/watchings';
} else {
    backEndUrl = 'https://clinic-6109.onrender.com/watchings';
}

console.log("Hello, I'm here! 🔥");

addEventListener('load', (event) => {
  fetchData()
})

// get user data
async function fetchData() {
  try {
  const fetchUserIP = await fetch('https://api.ipify.org?format=json'),
        userIP = await fetchUserIP.json(),
        // fetchUserInfo = await fetch(`http://ip-api.com/json/${userIP.ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,proxy,hosting,query`),
        fetchUserInfo = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${userIP.ip}`),
        userInfo = await fetchUserInfo.json();

  userInfo.ip = userIP.ip;
  clientUserInfo = userInfo;
  console.log(clientUserInfo);

  sendData(userInfo);
  } catch (error) {
    console.error('Error get data:', error);
  }
};

// change data for send to back-end
function camelToSnake(camelStr) {
  return camelStr.replace(/([A-Z])/g, '_$1').toLowerCase();
}

function keysToSnakeCase(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => keysToSnakeCase(item));
  }

  return Object.keys(obj).reduce((acc, key) => {
    const snakeKey = camelToSnake(key);
    acc[snakeKey] = keysToSnakeCase(obj[key]);
    return acc;
  }, {});
}

// send data 
function sendData(data) {
  const snakeCaseData = keysToSnakeCase(data);
  const result = fetch(backEndUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify({watching: snakeCaseData})
  })
  console.log('some', result);
}
