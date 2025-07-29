// Main JS logic will go here

// Helper: استخرج اللغة من الـ URL (تم التعليق مؤقتًا)
// function getLangFromUrl() {
//   const match = window.location.pathname.match(/^\/(ar|en)(\/|$)/);
//   return match ? match[1] : 'ar'; // الافتراضي عربي
// }

// Load Navbar and Footer components
function loadComponent(id, url, cb) {
  fetch(url)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (cb) cb();
    });
}

function setLanguage(lang) {
  fetch('lang/' + lang + '.json')
    .then(res => res.json())
    .then(dict => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
      });
      // تغيير اتجاه الصفحة إذا كانت عربية
      if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';
        fixNavbarAuto('rtl');
      } else {
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = 'en';
        fixNavbarAuto('ltr');
      }
    });
}

// دالة لعكس كلاس me-auto/ms-auto حسب اللغة
function fixNavbarAuto(dir) {
  setTimeout(function() {
    var navs = document.querySelectorAll('.navbar-nav');
    navs.forEach(function(nav) {
      nav.classList.remove('me-auto', 'ms-auto');
      if (dir === 'rtl') {
        nav.classList.add('ms-auto');
      } else {
        nav.classList.add('me-auto');
      }
    });
  }, 50);
}

// دالة لتحديث عنوان URL عند تغيير اللغة (تم التعليق مؤقتًا)
// function updateLanguageInUrl(lang) {
//   const path = window.location.pathname;
//   let newPath = path;
//   // إزالة /ar أو /en من البداية إذا موجود
//   newPath = newPath.replace(/^\/(ar|en)(\/|$)/, '/');
//   // أضف /ar أو /en في البداية حسب اللغة
//   if (lang === 'ar') {
//     newPath = '/ar' + newPath;
//   } else {
//     newPath = '/en' + newPath;
//   }
//   // غير عنوان URL بدون إعادة تحميل الصفحة
//   window.history.replaceState({}, '', newPath + window.location.search + window.location.hash);
// }

document.addEventListener('DOMContentLoaded', function() {
  // اللغة الافتراضية: العربية
  loadComponent('navbar-placeholder', 'assets/components/navbar.html', function() {
    setLanguage('ar');
  });
  loadComponent('footer-placeholder', 'assets/components/footer.html', function() {
    setLanguage('ar');
  });
});

// Language switch logic
function switchLanguage(lang) {
    let flag = "";
    let label = "";

    if (lang === 'en') {
      flag = "/assets/images/Flag_of_the_United_States.svg";
      label = "EN";
      document.documentElement.setAttribute("dir", "ltr");
    } else if (lang === 'ar') {
      flag = "/assets/images/flag_eg.svg";
      label = "AR";
      document.documentElement.setAttribute("dir", "rtl");
    }

    // غير الصورة والاسم
    document.getElementById('currentLangFlag').src = flag;
    document.getElementById('currentLangLabel').textContent = label;

    // هنا شغّل بقية الأكشن بتاعك لو عندك تغيير لغة مثلاً i18next أو API
    console.log("Language switched to: " + lang);
  }

  // عند تحميل الصفحة حط اللغة الحالية من localStorage مثلا
  window.addEventListener('DOMContentLoaded', () => {
    let savedLang = localStorage.getItem('lang') || 'en';c
    switchLanguage(savedLang);
  });






    const baseItem = document.querySelector('.item1').cloneNode(true);
  for (let i = 2; i <= 8; i++) {
    const clone = baseItem.cloneNode(true);
    clone.classList.remove('item1');
    clone.classList.add(`item${i}`);
    document.querySelector('.wrapper').appendChild(clone);
  }



  