// Main JS logic will go here

// Load Navbar and Footer components
function loadComponent(id, url, cb) {
  fetch(url)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById(id).innerHTML = html;
      if (cb) cb();
    });
}

function getLangFromURL() {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  return ["ar", "en"].includes(firstSegment) ? firstSegment : "ar";
}

function setLanguage(lang) {
  fetch("lang/" + lang + ".json")
    .then((res) => res.json())
    .then((dict) => {
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) {
          el.textContent = dict[key];
        }
      });

      if (lang === "ar") {
        document.documentElement.dir = "rtl";
        document.documentElement.lang = "ar";
        fixNavbarAuto("rtl");
      } else {
        document.documentElement.dir = "ltr";
        document.documentElement.lang = "en";
        fixNavbarAuto("ltr");
      }

      localStorage.setItem("lang", lang);
    })
    .catch((error) => {
      console.error("Error loading language file:", error);
    });
}

function fixNavbarAuto(dir) {
  setTimeout(function () {
    var navs = document.querySelectorAll(".navbar-nav");
    navs.forEach(function (nav) {
      nav.classList.remove("me-auto", "ms-auto");
      if (dir === "rtl") {
        nav.classList.add("ms-auto");
      } else {
        nav.classList.add("me-auto");
      }
    });
  }, 50);
}

// Language switch logic
function switchLanguage(lang) {
  const currentPath = window.location.pathname.split("/").filter(Boolean);

  let currentLang = getLangFromURL();
  if (["ar", "en"].includes(currentPath[0])) {
    currentPath.shift();
  }

  const newPath = `/${lang}/${currentPath.join("/")}`;

  localStorage.setItem("lang", lang);

  window.location.href = newPath || `/${lang}/`;
}

function updateLanguageUI(lang) {
  const languageDropdown = document.getElementById("");
  if (languageDropdown) {
    const flagImg = languageDropdown.querySelector("img");
    const labelSpan = languageDropdown.querySelector("span");

    if (lang === "en") {
      flagImg.src = "../assets/images/Flag_of_the_United_States.svg";
      labelSpan.textContent = "en";
    } else {
      flagImg.src = "../assets/images/flag_eg.svg";
      labelSpan.textContent = "ar";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const urlLang = getLangFromURL();
  const savedLang = localStorage.getItem("lang");
  const lang = savedLang || urlLang;

  setLanguage(lang);
  updateLanguageUI(lang);

  const navbarId = lang === "en" ? "nav-en" : "navbar-placeholder";
  const navbarPath =
    lang === "en"
      ? "../assets/components/navbar_en.html"
      : "../assets/components/navbar.html";

  loadComponent(navbarId, navbarPath, function () {
    const enOption = document.querySelector(
      "[onclick=\"switchLanguage('en')\"]"
    );
    const arOption = document.querySelector(
      "[onclick=\"switchLanguage('ar')\"]"
    );

    if (enOption)
      enOption.addEventListener("click", () => switchLanguage("en"));
    if (arOption)
      arOption.addEventListener("click", () => switchLanguage("ar"));
  });

  loadComponent("footer-placeholder", "../assets/components/footer.html");
  loadComponent("footer-en", "../assets/components/footer-en.html");
});

// Clone items for dynamic content
document.addEventListener("DOMContentLoaded", function () {
  const baseItem = document.querySelector(".item1");
  if (baseItem) {
    for (let i = 2; i <= 8; i++) {
      const clone = baseItem.cloneNode(true);
      clone.classList.remove("item1");
      clone.classList.add(`item${i}`);
      const wrapper = document.querySelector(".wrapper");
      if (wrapper) {
        wrapper.appendChild(clone);
      }
    }
  }
});

window.addEventListener("scroll", function () {
  const navConst = document.getElementById("nav-const");
  const navAir = document.getElementById("nav-air");

  function handleNavDisplay() {
    if (window.scrollY > 0) {
      navConst.style.setProperty("display", "none", "important");
      navAir.style.display = "block";
    } else {
      navConst.style.display = "block";
      navAir.style.setProperty("display", "none", "important");
    }
  }

  window.addEventListener("DOMContentLoaded", handleNavDisplay);

  window.addEventListener("scroll", handleNavDisplay);
});
