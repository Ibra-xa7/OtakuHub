import app from "./signup-firebase-config.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const auth = getAuth(app);
  const signupForm = document.getElementById("signupForm");
  const toggleThemeBtn = document.getElementById("toggleTheme");
  const langSwitcher = document.getElementById("langSwitcher");
  const logoImg = document.querySelector(".logo");

  // === Theme Toggle ===
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  toggleThemeBtn.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light-theme");
    const newTheme = isLight ? "dark" : "light";
    setTheme(newTheme);
  });

  function setTheme(theme) {
    if (theme === "light") {
      document.body.classList.add("light-theme");
      toggleThemeBtn.textContent = "☀️";
      if (logoImg) logoImg.src = "/PR-text.png";
    } else {
      document.body.classList.remove("light-theme");
      toggleThemeBtn.textContent = "🌙";
      if (logoImg) logoImg.src = "/PR-white.png";
    }
    localStorage.setItem("theme", theme);
  }

  // === Language Switcher ===
  const savedLang = localStorage.getItem("lang") || "en";
  langSwitcher.value = savedLang;
  setLanguage(savedLang);

  langSwitcher.addEventListener("change", () => {
    const newLang = langSwitcher.value;
    setLanguage(newLang);
  });

  function setLanguage(lang) {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    if (typeof applyLang === "function") {
      applyLang(lang);
    }
  }

  // === Signup Form Submit ===
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = signupForm.email.value.trim();
    const password = signupForm.password.value;
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const confirmPassword = confirmPasswordInput
      ? confirmPasswordInput.value
      : password;

    if (!email || !password || !confirmPassword) {
      alert("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Signup successful! You can now log in.");
        window.location.href = "../login/login.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
});
