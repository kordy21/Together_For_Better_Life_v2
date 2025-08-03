// Main JS logic will go here

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
      // تحديث جميع العناصر التي تحتوي على data-i18n
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
          el.textContent = dict[key];
        }
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
      
      // حفظ اللغة في localStorage
      localStorage.setItem("lang", lang);
    })
    .catch(error => {
      console.error('Error loading language file:', error);
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

// Language switch logic
function switchLanguage(lang) {
  let flag = "";
  let label = "";

  if (lang === "en") {
    flag = "/assets/images/Flag_of_the_United_States.svg";
    label = "EN";
  } else if (lang === "ar") {
    flag = "/assets/images/flag_eg.svg";
    label = "AR";
  }

  // تحديث الصورة والاسم في القائمة المنسدلة
  const currentLangFlag = document.getElementById("currentLangFlag");
  const currentLangLabel = document.getElementById("currentLangLabel");
  
  if (currentLangFlag) {
    currentLangFlag.src = flag;
  }
  if (currentLangLabel) {
    currentLangLabel.textContent = label;
  }

  // نادِ الدالة التي تترجم النصوص
  setLanguage(lang);

  console.log("Language switched to: " + lang);
}

// دالة لتحديث واجهة تبديل اللغة
function updateLanguageUI(lang) {
  const languageDropdown = document.getElementById("languageDropdown");
  if (languageDropdown) {
    const flagImg = languageDropdown.querySelector('img');
    const labelSpan = languageDropdown.querySelector('span');
    
    if (lang === "en") {
      flagImg.src = "/assets/images/Flag_of_the_United_States.svg";
      labelSpan.textContent = "EN";
    } else {
      flagImg.src = "/assets/images/flag_eg.svg";
      labelSpan.textContent = "AR";
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // تحميل المكونات
  loadComponent('navbar-placeholder', 'assets/components/navbar.html', function() {
    let savedLang = localStorage.getItem("lang") || "ar";
    setLanguage(savedLang);
    
    // تحديث واجهة تبديل اللغة بعد تحميل النافبار
    setTimeout(() => {
      updateLanguageUI(savedLang);
    }, 100);
  });
  
  loadComponent('footer-placeholder', 'assets/components/footer.html', function() {
    let savedLang = localStorage.getItem("lang") || "ar";
    setLanguage(savedLang);
  });
});

// Clone items for dynamic content
document.addEventListener('DOMContentLoaded', function() {
  const baseItem = document.querySelector('.item1');
  if (baseItem) {
    for (let i = 2; i <= 8; i++) {
      const clone = baseItem.cloneNode(true);
      clone.classList.remove('item1');
      clone.classList.add(`item${i}`);
      const wrapper = document.querySelector('.wrapper');
      if (wrapper) {
        wrapper.appendChild(clone);
      }
    }
  }
});