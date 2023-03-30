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
    enId = document.getElementById('lang_en');

const myPhone = myContact[0],
      myEmail = myContact[1],
      myTelegram = myContact[2],
      myWhatsApp = myContact[3],
      mySkype = myContact[4],
      myLinkedin = myContact[5],
      myGithub = myContact[6],
      saveText = saveBtn.textContent;

console.log(myContact);

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
