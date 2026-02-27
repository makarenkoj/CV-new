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
let backEndUrl;

if (url.includes('127.0.0.1:5500') || url.includes('127.0.0.1:5501')) {
    backEndUrl = 'http://localhost:3000/lookeds/get_address';
} else {
    backEndUrl = 'https://secret-santa.165.227.148.3.sslip.io/lookeds/get_address';
}

console.log("Hello, I'm here! 🔥");

function getClientData() {
  return {
    current_url: window.location.href,
    referrer: document.referrer || 'Direct',
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    color_depth: window.screen.colorDepth,
    local_time: new Date().toString(),
    browser_language: navigator.language || navigator.userLanguage,    
    cpu_cores: navigator.hardwareConcurrency || null,
    device_memory_gb: navigator.deviceMemory || null,
    is_dark_mode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
    is_touch_screen: navigator.maxTouchPoints > 0,
    network_type: navigator.connection ? navigator.connection.effectiveType : 'unknown'
  };
}

window.addEventListener('load', () => {
  notifyBackend();
});

async function notifyBackend() {
  const payload = {
    lookeds: {
      ...getClientData(),
      lang: document.documentElement.lang || 'en'
    }
  };

  try {
    const response = await fetch(backEndUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });
    
    // console.log('Successfully pinged Rails backend, status:', response.status);
  } catch (error) {
    // console.error('Error pinging backend:', error);
  }
}
