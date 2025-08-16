document.addEventListener("DOMContentLoaded", () => {
  const toggleThemeBtn = document.getElementById("toggleTheme");
  const siteLogo = document.getElementById("siteLogo");
  const langSwitcher = document.getElementById("langSwitcher");
  const uploadPic = document.getElementById("uploadPic");
  const profilePic = document.getElementById("profilePic");
  const userEmailEl = document.getElementById("userEmail");
  const userPasswordEl = document.getElementById("userPassword");
  const togglePassBtn = document.getElementById("togglePassBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const notificationsDropdown = document.querySelector(
    ".notifications-dropdown"
  );
  const aboutCharacter = document.getElementById("aboutCharacter");

  const dict = {
    en: {
      home: "Home",
      portfolio: "Portfolio",
      about: "About",
      blog: "Blog",
      anime: "Anime",
      movies: "Movies",
      contact: "Contact",
      uploadPic: "Upload Picture",
      changeAccount: "Change Account",
      logout: "Logout",
      welcomeText: "Welcome to OtakuHub!",
      aboutTitle: "About Me",
      aboutText:
        "Hi! I'm an Otaku and passionate about movies and anime. Here you will find my projects and blog posts about the latest in the Otaku world.",
      blogTitle: "Blog",
      blogText: "Check out my latest articles and updates.",
      contactTitle: "Contact Me",
      contactNameLabel: "Name",
      contactEmailLabel: "Email",
      contactMessageLabel: "Message",
      contactSendBtn: "Send",
      portfolioApp: "Portfolio",
      coffeeApp: "Coffee Web",
      gameApp: "Game Web Valorant",
      noNotifications: "No new notifications",
    },
    ar: {
      home: "الرئيسية",
      portfolio: "الأعمال",
      about: "معلومات عني",
      blog: "مدونة",
      anime: "أنمي",
      movies: "أفلام",
      contact: "اتصل بي",
      uploadPic: "رفع صورة",
      changeAccount: "تغيير الحساب",
      logout: "تسجيل خروج",
      welcomeText: "مرحبًا بك في أوتاكوهب!",
      aboutTitle: "معلومات عني",
      aboutText:
        "مرحبًا! أنا أوتاكو ومتحمس للأفلام والأنمي. هنا ستجد مشاريعي ومقالات مدونتي حول أحدث ما في عالم الأوتاكو.",
      blogTitle: "مدونة",
      blogText: "اطلع على أحدث المقالات والتحديثات.",
      contactTitle: "اتصل بي",
      contactNameLabel: "الاسم",
      contactEmailLabel: "البريد الإلكتروني",
      contactMessageLabel: "الرسالة",
      contactSendBtn: "إرسال",
      portfolioApp: "الأعمال",
      coffeeApp: "موقع القهوة",
      gameApp: "موقع لعبة فالورانت",
      noNotifications: "لا توجد إشعارات جديدة",
    },
  };

  // THEME TOGGLE
  const currentTheme = localStorage.getItem("theme") || "dark";

  function updateCharacterImage(theme) {
    if (!aboutCharacter) return;
    if (theme === "dark") {
      aboutCharacter.src = "/charactre-white.png";
    } else {
      aboutCharacter.src = "/charactre.png";
    }
  }

  function setTheme(theme) {
    document.body.classList.toggle("light-theme", theme === "light");
    toggleThemeBtn.textContent = theme === "light" ? "☀️" : "🌙";
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      siteLogo.src = "/PR-white.png";
    } else {
      siteLogo.src = "/PR-text.png";
    }

    updateCharacterImage(theme);
  }

  setTheme(currentTheme);

  toggleThemeBtn.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("light-theme")
      ? "dark"
      : "light";
    setTheme(newTheme);
  });

  // LANGUAGE SWITCHER
  let currentLang = localStorage.getItem("lang") || "en";
  if (langSwitcher) {
    langSwitcher.value = currentLang;
    langSwitcher.addEventListener("change", (e) => {
      currentLang = e.target.value;
      localStorage.setItem("lang", currentLang);
      applyLang(currentLang);
    });
  }

  function applyLang(lang) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[lang] && dict[lang][key]) {
        el.textContent = dict[lang][key];
      }
    });
  }
  applyLang(currentLang);

  // PROFILE PICTURE UPLOAD AND LOAD
  if (uploadPic && profilePic) {
    uploadPic.addEventListener("change", () => {
      const file = uploadPic.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        profilePic.src = reader.result;
        localStorage.setItem("profilePic", reader.result);
      };
      reader.readAsDataURL(file);
    });

    const savedPic = localStorage.getItem("profilePic");
    if (savedPic) {
      profilePic.src = savedPic;
    }
  }

  // USER DATA
  if (!localStorage.getItem("userEmail"))
    localStorage.setItem("userEmail", "user@example.com");
  if (!localStorage.getItem("userPassword"))
    localStorage.setItem("userPassword", "mypassword123");

  const savedEmail = localStorage.getItem("userEmail");
  const savedPassword = localStorage.getItem("userPassword");

  if (userEmailEl) userEmailEl.textContent = savedEmail || "Not Logged In";
  if (userPasswordEl)
    userPasswordEl.textContent = savedPassword ? "*******" : "";

  // TOGGLE PASSWORD VISIBILITY
  if (togglePassBtn && userPasswordEl) {
    let passVisible = false;
    togglePassBtn.addEventListener("click", () => {
      if (!savedPassword) return;
      passVisible = !passVisible;
      userPasswordEl.textContent = passVisible ? savedPassword : "*******";
      togglePassBtn.textContent = passVisible ? "🙈" : "👁️";
    });
  }

  // LOGOUT
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userPassword");
      localStorage.removeItem("profilePic");
      alert("Logged out! Redirecting to login page...");
      window.location.href = "/login/login.html"; // Adjust as needed
    });
  }

  // REDIRECT if not logged in
  if (!savedEmail || !savedPassword) {
    setTimeout(() => {
      alert("Please log in to access the page.");
      window.location.href = "/login/login.html"; // Adjust as needed
    }, 300);
  }

  // SCROLL TO TOP BUTTON
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("scroll", () => {
      scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });
  }

  // NOTIFICATIONS
  const notifications = [
    "New blog post published!",
    "Portfolio updated with new projects.",
    "Coffee web launched!",
    "Valorant game web live now.",
  ];
  function renderNotifications() {
    if (!notificationsDropdown) return;
    notificationsDropdown.innerHTML = "";
    if (notifications.length === 0) {
      const noNoteText =
        dict[currentLang]?.noNotifications || "No new notifications";
      notificationsDropdown.innerHTML = `<p>${noNoteText}</p>`;
      return;
    }
    notifications.forEach((note) => {
      const p = document.createElement("p");
      p.textContent = note;
      notificationsDropdown.appendChild(p);
    });
  }
  renderNotifications();
});
