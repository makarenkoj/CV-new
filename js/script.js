// url heandler
function getCurrentURL () {
  return window.location.href
}

const url = getCurrentURL(),
      htmlLang = document.documentElement.lang;

let myContact = document.getElementsByClassName('contacts-list'),
    phoneId = document.getElementById('phone'),
    emailId = document.getElementById('email'),
    telegramId = document.getElementById('telegram'),
    whatsAppId = document.getElementById('whats_app'),
    skypeId = document.getElementById('skype'),
    linkedinId = document.getElementById('linkedin'),
    githubId = document.getElementById('github'),
    saveBtn = document.getElementById('save'),
    saveBtnText = saveBtn.textContent,
    itId = document.getElementById('lang_it'),
    enId = document.getElementById('lang_en'),
    apiKey = 'f6b2f6d81b934d4a99388d30de19365f',
    address = 'https://api.ipgeolocation.io/ipgeo?apiKey=API_KEY&ip=8.8.8.8',
    clientUserInfo;

if (url == 'http://127.0.0.1:5500/index.html' || url == 'http://127.0.0.1:5500/index_en.html' || url == 'http://127.0.0.1:5500/index_it.html') {
    backEndUrl = 'http://localhost:3000/watchings';
} else {
    backEndUrl = 'https://clinic-6109.onrender.com/watchings';
}

// text data
const text = {
              phone: { 
                  'ua': { default: '+38 050 578 22 33', hover: 'Зателефонуйте мені +38 050 578 22 33' },
                  'it': { default: '+39 351 334 42 16', hover: 'Chiamami +39 351 334 42 16' },
                  'en': { default: '+38 050 578 22 33', hover: 'Call Me +38 050 578 22 33' }
              },
              email: { 
                  ua: { default: 'makarenkoj53@gmail.com', hover: 'Натисніть, щоб написати мені email' },
                  it: { default: 'makarenkoj53@gmail.com', hover: 'Clicca per scrivermi email' },
                  en: { default: 'makarenkoj53@gmail.com', hover: 'Сlick to write me email' }
              },
              telegram: {
                  ua: { default: '@makarenkoj', hover: 'Натисніть, щоб написати мені y Telegram' },
                  it: { default: '@makarenkoj', hover: 'Fare clic per avviare una chat di Telegram' },
                  en: { default: '@makarenkoj', hover: 'Сlick to write me on Telegram' }
              },
              whatsApp: {
                  ua: { default: 'WhatsApp', hover: 'Натисніть, щоб написати мені у WhatsApp' },
                  it: { default: 'WhatsApp', hover: 'Fare clic per avviare una chat di WhatsApp' },
                  en: { default: 'WhatsApp', hover: 'Сlick to write me on WhatsApp' },
              },
              skype: {
                  ua: { default: 'makarenkoj', hover: 'Натисніть, щоб написати мені y Skype' },
                  it: { default: 'makarenkoj', hover: 'Clicca per scrivermi in Skype' },
                  en: { default: 'makarenkoj', hover: 'Сlick to write me on Skype' },
              },
              linkedin: {
                  ua: { default: 'My linkedin', hover: 'Подивіться на мене в Linkedin' },
                  it: { default: 'My linkedin', hover: 'Guardami su Linkedin' },
                  en: { default: 'My linkedin', hover: 'Look at me in Linkedin' },
              },
              github: {
                  ua: { default: 'makarenkoj', hover: 'Подивіться мій код на Github' },
                  it: { default: 'makarenkoj', hover: 'Guarda il mio codice su Github' },
                  en: { default: 'makarenkoj', hover: 'Look at my code in Github' },
              },
              save: {
                  ua: { default: 'Зберегти в PDF', hover: 'Зберегти в PDF' },
                  it: { default: 'Salva in PDF', hover: 'Salva in PDF' },
                  en: { default: 'Save to PDF', hover: 'Save to PDF' },
              }
          };

// new functions
const contacts = document.getElementsByClassName('contacts-list');

function toggleContactText(element, data) {
    element.textContent = element.textContent === data.default ? data.hover : data.default;
}

for (const contact of contacts) {
    const contactId = contact.id;
    const contactElement = document.getElementById(contactId);
  
    contactElement.addEventListener('mouseenter', () => toggleContactText(contactElement, text[contactId][htmlLang]));
    contactElement.addEventListener('mouseleave', () => toggleContactText(contactElement, text[contactId][htmlLang]));
};

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
