'use strict';

/* ─────────────────────────────────────────────
   SRAB Minecraft Server – i18n (EN / AR)
   Arabic dialect: Saudi Arabian colloquial
   ───────────────────────────────────────────── */

const TRANSLATIONS = {
  en: {
    // ── Status card ──────────────────────────
    serverStatus:   'Server Status',
    checking:       'Checking...',
    server1:        'Server 1',
    server2:        'Server 2',
    clickToCopy:    'Click to copy',
    copied:         'Copied!',
    playersOnline:  'Players Online',
    version:        'Version',
    lastUpdated:    'Last Updated',
    motdLabel:      'Message of the Day',
    onlinePlayers:  'Online Players',
    refreshingIn:   (s) => s > 0 ? `Refreshing in ${s}s` : 'Refreshing...',
    online:         'Online',
    offline:        'Offline',
    errorPrefix:    'Could not reach the server —',

    // ── Discord statuses ─────────────────────
    statusOnline:   'Online',
    statusIdle:     'Idle',
    statusDnd:      'Do Not Disturb',
    statusOffline:  'Offline',
    loading:        'Loading...',
    playing:        'Playing',
    listeningSpotify: 'Listening to Spotify',

    // ── Getting Started ──────────────────────
    gettingStarted: 'Getting Started',
    step1Title:     'Install Fabric Loader',
    step1Badge:     'Step 1',
    step1Desc:      'Download and install <strong>Fabric Loader</strong> for Minecraft Java Edition <strong>1.21</strong>. This is required before adding any mods.',
    step1Link:      'Download Fabric',
    step2Title:     'Download the Modpack',
    step2Badge:     'Step 2',
    step2Desc:      'Get the required mods for this server. Place them inside your <code>.minecraft/mods</code> folder after installing Fabric.',
    step2Link:      'Open Google Drive',
    step3Title:     'Connect & Play',
    step3Badge:     'Step 3',
    step3Desc:      'Launch Minecraft with the Fabric profile, add the server address, and join. Mods-free players can also connect using the vanilla client.',

    // ── Contact / footer ─────────────────────
    contactHelp:    'Need help or want to know more?',
    contactLink:    "Visit SRAB's page",
    visitPage:      "Visit SRAB's page",
    footerStatus:   'Server status updates every 30 seconds',
    footerLove:     'Made with ❤️ by SRAB',
    footerGithub:   'SRAB-9 on GitHub',

    // ── Time ago ─────────────────────────────
    timeAgo: (diff) => {
      if (diff < 60)    return `${diff}s ago`;
      if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
      return `${Math.floor(diff / 86400)}d ago`;
    },
  },

  ar: {
    // ── Status card ──────────────────────────
    serverStatus:   'حالة السيرفر',
    checking:       'يحمّل...',
    server1:        'سيرفر 1',
    server2:        'سيرفر 2',
    clickToCopy:    'اضغط تنسخ',
    copied:         'تم النسخ!',
    playersOnline:  'اللاعبين الحين',
    version:        'الإصدار',
    lastUpdated:    'آخر تحديث',
    motdLabel:      'رسالة اليوم',
    onlinePlayers:  'اللاعبين اللي عليه',
    refreshingIn:   (s) => s > 0 ? `يتحدث بعد ${s} ثانية` : 'يتحدث...',
    online:         'شغّال',
    offline:        'أوفلاين',
    errorPrefix:    'ما قدرنا نوصل للسيرفر —',

    // ── Discord statuses ─────────────────────
    statusOnline:   'أونلاين',
    statusIdle:     'شبه موجود',
    statusDnd:      'لا تزعجني',
    statusOffline:  'أوفلاين',
    loading:        'يحمّل...',
    playing:        'يلعب',
    listeningSpotify: 'يسمع سبوتيفاي',

    // ── Getting Started ──────────────────────
    gettingStarted: 'كيف تبدأ',
    step1Title:     'نزّل Fabric Loader',
    step1Badge:     'الخطوة الأولى',
    step1Desc:      'نزّل وثبّت <strong>Fabric Loader</strong> لـ Minecraft Java Edition <strong>1.21</strong>. لازم تسويها قبل ما تضيف أي مودات.',
    step1Link:      'نزّل Fabric',
    step2Title:     'نزّل الموداكل',
    step2Badge:     'الخطوة الثانية',
    step2Desc:      'جيب الموداكل اللي يحتاجها السيرفر. حطهم في فولدر <code>.minecraft/mods</code> بعد ما تنزّل Fabric.',
    step2Link:      'افتح Google Drive',
    step3Title:     'اتصل وألعب',
    step3Badge:     'الخطوة الثالثة',
    step3Desc:      'شغّل Minecraft بروفايل Fabric، ضيف عنوان السيرفر واتصل. اللاعبين بدون موداكل يقدرون يدخلون بالكلاينت العادي.',

    // ── Contact / footer ─────────────────────
    contactHelp:    'تحتاج مساعدة أو تبي تعرف أكثر؟',
    contactLink:    'زور صفحة SRAB',
    visitPage:      'زور صفحة SRAB',
    footerStatus:   'حالة السيرفر تتحدث كل 30 ثانية',
    footerLove:     'سويتها بـ ❤️ SRAB',
    footerGithub:   'SRAB-9 على GitHub',

    // ── Time ago ─────────────────────────────
    timeAgo: (diff) => {
      if (diff < 60)    return `منذ ${diff} ثانية`;
      if (diff < 3600)  return `منذ ${Math.floor(diff / 60)} دقيقة`;
      if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} ساعة`;
      return `منذ ${Math.floor(diff / 86400)} يوم`;
    },
  },
};

// ── State ──────────────────────────────────────

let _currentLang = localStorage.getItem('srab_lang') || 'en';

// ── Public API ─────────────────────────────────

/**
 * Get a translated string (or call a translator function).
 * @param {string} key
 * @param {...any} args - forwarded to function-valued translations
 */
window.t = function (key, ...args) {
  const dict = TRANSLATIONS[_currentLang] || TRANSLATIONS.en;
  const val  = dict[key] ?? TRANSLATIONS.en[key] ?? key;
  return typeof val === 'function' ? val(...args) : val;
};

/** Returns the active language code ('en' | 'ar'). */
window.getLang = function () { return _currentLang; };

/** Translated time-ago helper (used by serverinfo.js). */
window.timeAgoTranslated = function (unixStr) {
  const diff = Math.floor(Date.now() / 1000) - parseInt(unixStr, 10);
  return window.t('timeAgo', diff);
};

// ── DOM apply ─────────────────────────────────

function applyTranslations() {
  // Static text nodes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = window.t(el.dataset.i18n);
  });

  // Nodes with inner HTML (e.g. <strong>, <code> inside descriptions)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = window.t(el.dataset.i18nHtml);
  });

  // aria-label attributes
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    el.setAttribute('aria-label', window.t(el.dataset.i18nAria));
  });
}

// ── Direction + font ──────────────────────────

function applyDirection(lang) {
  const isRTL = lang === 'ar';
  document.documentElement.setAttribute('lang', isRTL ? 'ar' : 'en');
  document.documentElement.setAttribute('dir',  isRTL ? 'rtl' : 'ltr');
  document.body.classList.toggle('lang-ar', isRTL);
}

// ── Toggle button ─────────────────────────────

function createToggle() {
  const btn = document.createElement('button');
  btn.id        = 'langToggle';
  btn.className = 'lang-toggle';
  btn.setAttribute('aria-label', 'Switch language / تغيير اللغة');
  btn.innerHTML = `
    <span class="lt-en">EN</span>
    <span class="lt-sep">|</span>
    <span class="lt-ar">ع</span>`;
  btn.addEventListener('click', toggleLang);
  document.body.appendChild(btn);
  updateToggleUI(btn);
  return btn;
}

function updateToggleUI(btn) {
  if (!btn) return;
  btn.querySelector('.lt-en').classList.toggle('lt-active', _currentLang === 'en');
  btn.querySelector('.lt-ar').classList.toggle('lt-active', _currentLang === 'ar');
}

function toggleLang() {
  _currentLang = _currentLang === 'en' ? 'ar' : 'en';
  localStorage.setItem('srab_lang', _currentLang);
  applyDirection(_currentLang);
  applyTranslations();
  updateToggleUI(document.getElementById('langToggle'));
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: _currentLang } }));
}

// ── Boot ──────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  applyDirection(_currentLang);
  createToggle();
  applyTranslations();
});
