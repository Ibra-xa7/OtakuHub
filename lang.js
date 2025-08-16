const translations = {
  en: {
    title: "Welcome to OtakuHub",
    login: "🔑 Login",
    signup: "📝 Sign Up",
    toggleTheme: "Toggle Theme",
    welcome: "Enjoy",
  },
  ar: {
    title: "مرحبًا بك في أوتاكوهب",
    login: "🔑 تسجيل الدخول",
    signup: "📝 إنشاء حساب",
    toggleTheme: "تبديل النمط",
    welcome: "استمتع",
  },
};

function loadLang(lang) {
  const texts = translations[lang];
  if (!texts) return;

  for (const key in texts) {
    const el = document.querySelector(`[data-i18n="${key}"]`);
    if (el) el.textContent = texts[key];
  }

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}
