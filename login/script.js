import app from "./firebase-config.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const auth = getAuth(app);
  const loginForm = document.getElementById("loginForm");
  const toggleThemeBtn = document.getElementById("toggleTheme");
  const langSwitcher = document.getElementById("langSwitcher");
  const forgotPasswordLink = document.getElementById("forgotPassword");
  const rememberMeCheckbox = document.getElementById("rememberMe");

  // === Theme Toggle ===
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
  toggleThemeBtn.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("light-theme")
      ? "dark"
      : "light";
    setTheme(newTheme);
  });

function setTheme(theme) {
  const logoImg = document.getElementById("logoImg");
  document.body.classList.toggle("light-theme", theme === "light");

  // Set icon and image
  toggleThemeBtn.textContent = theme === "light" ? "☀️" : "🌙";
  logoImg.src = theme === "light" ? "/PR-text.png" : "/PR-white.png";

  // Save preference
  localStorage.setItem("theme", theme);
}


  // === Language Switcher ===
  langSwitcher.value = localStorage.getItem("lang") || "en";
  langSwitcher.addEventListener("change", (e) => {
    const selectedLang = e.target.value;
    localStorage.setItem("lang", selectedLang);
  });

  // === Auto Redirect if Remember Me is enabled ===
  if (localStorage.getItem("rememberMe") === "true") {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        window.location.href = "/Home/Home.html";
      }
    });
  }

  // === Login Form Submit ===
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value;

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (rememberMeCheckbox.checked) {
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberMe");
        }

        // ✅ Store email and password locally
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);

        window.location.href = "/Home/Home.html";
      })
      .catch((error) => {
        alert("❌ " + error.message);
      });
  });

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      if (rememberMeCheckbox.checked) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      // ✅ Save email + password for profile use
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);

      window.location.href = "/Home/Home.html";
    })
    .catch((error) => {
      alert(error.message);
    });

  // === Forgot Password ===
  forgotPasswordLink.addEventListener("click", (e) => {
    e.preventDefault();
    const email = loginForm.email.value.trim();
    if (!email) return alert("Please enter your email first.");
    sendPasswordResetEmail(auth, email)
      .then(() => alert("✅ Password reset email sent!"))
      .catch((err) => alert(err.message));
  });
});
