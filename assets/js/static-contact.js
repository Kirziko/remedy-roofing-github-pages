(function () {
  const email = "remedyroofingky@gmail.com";
  const phone = "(859) 800-7388";

  function read(form, name) {
    const field = form.querySelector(`[name="${name}"]`);
    return field ? field.value.trim() : "";
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('form[action="contact.php"], form#contact-form').forEach(function (form) {
      form.setAttribute("action", `mailto:${email}`);
      form.setAttribute("method", "post");
      form.setAttribute("enctype", "text/plain");

      form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = read(form, "name");
        const fromEmail = read(form, "email");
        const customerPhone = read(form, "phone");
        const message = read(form, "message");

        const subject = encodeURIComponent("Free estimate request from remedyroofingky.com");
        const body = encodeURIComponent(
          [
            "Free estimate request",
            "",
            `Name: ${name}`,
            `Email: ${fromEmail}`,
            `Phone: ${customerPhone}`,
            "",
            "Message:",
            message,
            "",
            `If the email window does not open, please call ${phone}.`
          ].join("\n")
        );

        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      });
    });
  });
})();
