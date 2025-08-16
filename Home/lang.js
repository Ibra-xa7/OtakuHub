document.addEventListener("DOMContentLoaded", () => {
  const langSwitcher = document.getElementById("langSwitcher");

  langSwitcher.addEventListener("change", (e) => {
    const lang = e.target.value;
    localStorage.setItem("lang", lang);
    applyLang(lang);
  });

  const currentLang = localStorage.getItem("lang") || "en";
  langSwitcher.value = currentLang;
  applyLang(currentLang);

  function applyLang(lang) {
    const dict = {
      en: {
        welcomeText: "Welcome to OtakuHub!",
        aboutSection: "About Me",
        blogSection: "Blog",
        contactSection: "Contact Me",
        contactSendBtn: "Send",
        portfolio: "Portfolio",
        // add all other keys here
      },
      ar: {
        welcomeText: "مرحبًا بك في أوتاكوهب!",
        aboutSection: "معلومات عني",
        blogSection: "مدونة",
        contactSection: "اتصل بي",
        contactSendBtn: "أرسل",
        portfolio: "الأعمال",
        // add all other keys here
      },
    };

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = dict[lang][key] || el.textContent;
    });
  }
});
