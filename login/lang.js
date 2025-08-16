const translations = {
  en: {
    loginTitle: "Login to OtakuHub",
    emailLabel: "Email",
    passwordLabel: "Password",
    rememberMe: "Remember Me",
    forgotPassword: "Forgot Password?",
    login: "Login",
    noAccount: "Don't have an account?",
    signupHere: "Sign up here",
  },
  ar: {
    loginTitle: "تسجيل الدخول إلى أوتاكوهب",
    emailLabel: "البريد الإلكتروني",
    passwordLabel: "كلمة المرور",
    rememberMe: "تذكرني",
    forgotPassword: "هل نسيت كلمة المرور؟",
    login: "تسجيل الدخول",
    noAccount: "ليس لديك حساب؟",
    signupHere: "سجّل الآن",
  },
};

function applyLang(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[lang][key] || key;
  });

  // Direction (RTL or LTR)
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

// Initial load
const selectedLang = localStorage.getItem("lang") || "en";
applyLang(selectedLang);

// On language switch
document.getElementById("langSwitcher").addEventListener("change", (e) => {
  const newLang = e.target.value;
  localStorage.setItem("lang", newLang);
  applyLang(newLang);
});
