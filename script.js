// Apply saved theme or default to light
const savedTheme = localStorage.getItem("theme") || "light";
document.body.classList.toggle("light", savedTheme === "light");
document.getElementById("toggleTheme").textContent =
  savedTheme === "light" ? "☀️" : "🌙";

// Set the correct logo image on load
const logoImg = document.querySelector(".logo");
if (logoImg) {
  logoImg.src = savedTheme === "light" ? "/PR-text.png" : "/PR-white.png";
}

// Apply saved language or default to English
const savedLang = localStorage.getItem("lang") || "en";
document.getElementById("langSwitcher").value = savedLang;
loadLang(savedLang);

// Theme toggle
document.getElementById("toggleTheme").addEventListener("click", () => {
  const isLight = !document.body.classList.contains("light");
  document.body.classList.toggle("light", isLight);

  // Update icon
  document.getElementById("toggleTheme").textContent = isLight ? "☀️" : "🌙";

  // Update logo based on new theme
  if (logoImg) {
    logoImg.src = isLight ? "/PR-text.png" : "/PR-white.png";
  }

  // Save theme
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// Language switch
document.getElementById("langSwitcher").addEventListener("change", (e) => {
  const lang = e.target.value;
  localStorage.setItem("lang", lang);
  loadLang(lang);
});
