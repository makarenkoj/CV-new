let myContact = document.getElementsByClassName('contacts-list'),
    phoneId = document.getElementById('phone'),
    emailId = document.getElementById('email'),
    telegramId = document.getElementById('telegram'),
    whatsAppId = document.getElementById('whats_app'),
    skypeId = document.getElementById('skype'),
    linkedinId = document.getElementById('linkedin'),
    githubId = document.getElementById('github'),
    saveBtn = document.getElementById('save'),
    itId = document.getElementById('lang_it'),
    enId = document.getElementById('lang_en'),
    backEndUrl = 'https://clinic-6109.onrender.com/watchings',
    clientUserInfo;

const myPhone = myContact[0],
      myEmail = myContact[1],
      myTelegram = myContact[2],
      myWhatsApp = myContact[3],
      mySkype = myContact[4],
      myLinkedin = myContact[5],
      myGithub = myContact[6],
      saveText = saveBtn.textContent;

console.log("Hello, I'm here! 🔥");

// download PDF
function downloadPdf() {
  saveBtn.textContent = 'Натисни!'
};

function downloadPdfReturn() {
  saveBtn.textContent = saveText
};

// call to phone
function callMe() {
  myPhone.textContent = 'Call Me +380 50 578 22 33'
  };
function callMeReturn() {
    myPhone.textContent = '+380 50 578 22 33'
  };

// write to email
function writeMeEmail() {
  myEmail.textContent = 'Сlick to write me makarenkoj53@gmail.com'
    };
function writeMeEmailReturn() {
  myEmail.textContent = 'makarenkoj53@gmail.com'
    };

// write to telegram
function writeMeTelegram() {
  myTelegram.textContent = 'Сlick to write me @makarenkoj'
    };
function writeMeTelegramReturn() {
  myTelegram.textContent = '@makarenkoj'
    };

// write to whats app
function writeMeWhatsApp() {
  myWhatsApp.textContent = 'Сlick to write me on WhatsApp'
    };
function writeMeWhatsAppReturn() {
  myWhatsApp.textContent = 'WhatsApp'
    };

// write to skype
function writeMeSkype() {
  mySkype.textContent = 'Сlick to write me @makarenkoj'
    };
function writeMeSkypeReturn() {
  mySkype.textContent = 'makarenkoj'
    };
    
// check me out on linkedin
function writeMeLinkedin() {
  myLinkedin.textContent = 'Look at me in linkedin'
    };
function writeMeLinkedinReturn() {
  myLinkedin.textContent = 'My linkedin'
    };

// look at my code in github
function writeMeGithub() {
  myGithub.textContent = 'Look at my code in Github @makarenkoj'
    };
function writeMeGithubReturn() {
  myGithub.textContent = 'makarenkoj'
    };

phoneId.addEventListener('mouseenter', callMe);
phoneId.addEventListener('mouseleave', callMeReturn);

emailId.addEventListener('mouseenter', writeMeEmail);
emailId.addEventListener('mouseleave', writeMeEmailReturn);

telegramId.addEventListener('mouseenter', writeMeTelegram);
telegramId.addEventListener('mouseleave', writeMeTelegramReturn);

whatsAppId.addEventListener('mouseenter', writeMeWhatsApp);
whatsAppId.addEventListener('mouseleave', writeMeWhatsAppReturn);

skypeId.addEventListener('mouseenter', writeMeSkype);
skypeId.addEventListener('mouseleave', writeMeSkypeReturn);

linkedinId.addEventListener('mouseenter', writeMeLinkedin);
linkedinId.addEventListener('mouseleave', writeMeLinkedinReturn);

githubId.addEventListener('mouseenter', writeMeGithub);
githubId.addEventListener('mouseleave', writeMeGithubReturn);

// saveBtn.addEventListener('mouseenter', downloadPdf);
// saveBtn.addEventListener('mouseleave', downloadPdfReturn);

addEventListener('load', (event) => {
  fetchData()
})

// get user data
async function fetchData() {
  try {
  const fetchUserIP = await fetch('https://api.ipify.org?format=json'),
        userIP = await fetchUserIP.json(),
        fetchUserInfo = await fetch(`http://ip-api.com/json/${userIP.ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,proxy,hosting,query`),
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
