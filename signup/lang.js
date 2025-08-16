// /signup/lang.js

const translations = {
  en: {
    signupTitle: "Create your account",
    emailLabel: "Email",
    passwordLabel: "Password",
    confirmPasswordLabel: "Confirm Password",
    signup: "Sign Up",
    haveAccount: "Already have an account?",
    loginHere: "Login here",
    emailPlaceholder: "Enter your email",
    passwordPlaceholder: "Enter your password",
    confirmPasswordPlaceholder: "Re-enter your password",
  },
  ar: {
    signupTitle: "إنشاء حساب جديد",
    emailLabel: "البريد الإلكتروني",
    passwordLabel: "كلمة المرور",
    confirmPasswordLabel: "تأكيد كلمة المرور",
    signup: "سجل الآن",
    haveAccount: "هل لديك حساب بالفعل؟",
    loginHere: "تسجيل الدخول",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    passwordPlaceholder: "أدخل كلمة المرور",
    confirmPasswordPlaceholder: "أعد إدخال كلمة المرور",
  },
};

function applyLang(lang) {
  const texts = translations[lang];

  // Apply textContent to elements with data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (texts[key]) {
      el.textContent = texts[key];
    }
  });

  // Apply placeholders if data-placeholder-i18n exists
  document.querySelectorAll("[data-placeholder-i18n]").forEach((el) => {
    const key = el.getAttribute("data-placeholder-i18n");
    if (texts[key]) {
      el.placeholder = texts[key];
    }
  });

  // Set HTML lang and direction
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

// Detect and apply stored language or fallback to "en"
const selectedLang = localStorage.getItem("lang") || "en";
applyLang(selectedLang);

// Switcher logic
const langSwitcher = document.getElementById("langSwitcher");
if (langSwitcher) {
  langSwitcher.value = selectedLang;
  langSwitcher.addEventListener("change", (e) => {
    const newLang = e.target.value;
    localStorage.setItem("lang", newLang);
    applyLang(newLang);
  });
}
