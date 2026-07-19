const root = document.documentElement;
const languageButtons = document.querySelectorAll('[data-set-lang]');

function setLanguage(language) {
  const isEnglish = language === 'en';
  root.classList.toggle('lang-en', isEnglish);
  root.lang = isEnglish ? 'en' : 'zh-CN';
  document.title = isEnglish ? 'Shimin Li | Academic Homepage' : '李世民 | 个人学术主页';

  languageButtons.forEach((button) => {
    const active = button.dataset.setLang === language;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  try {
    localStorage.setItem('preferred-language', language);
  } catch (_) {
    // The page remains functional when storage is unavailable.
  }
}

languageButtons.forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.setLang));
});

let initialLanguage = 'zh';
try {
  const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
  initialLanguage = requestedLanguage || localStorage.getItem('preferred-language') || 'zh';
} catch (_) {
  initialLanguage = 'zh';
}
setLanguage(initialLanguage === 'en' ? 'en' : 'zh');
