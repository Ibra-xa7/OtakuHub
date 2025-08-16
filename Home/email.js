document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("leK6-2GxZ8e6wGNPw"); // Replace with your public key

  const form = document.getElementById("contactForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_Ibr_xa7", "template_dm7bqir", form)
      .then(() => {
        alert("✅ Message sent successfully!");
        form.reset();
      })
      .catch((error) => {
        alert("❌ Failed to send message: " + error.text);
      });
  });
});
