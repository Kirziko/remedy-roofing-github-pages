(function () {
  const endpoint = "https://formspree.io/f/mbdnpavn";
  const phone = "(859) 800-7388";

  function setSubmitLabel(button, label) {
    if (button instanceof HTMLInputElement) {
      button.value = label;
    } else {
      button.textContent = label;
    }
  }

  function showMessage(container, type, text) {
    if (!container) return;

    container.className = `messages alert alert-${type}`;
    container.setAttribute("role", type === "success" ? "status" : "alert");
    container.textContent = text;
    container.hidden = false;
  }

  function getErrorMessage(response, data) {
    if (response.status === 429) {
      return `Too many requests were sent at once. Please wait a moment and try again, or call ${phone}.`;
    }

    if (data && Array.isArray(data.errors) && data.errors.length) {
      return data.errors.map(function (error) {
        return error.message;
      }).filter(Boolean).join(" ");
    }

    return `We couldn't send your request. Please try again, or call ${phone}.`;
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("form#contact-form").forEach(function (form) {
      form.setAttribute("action", endpoint);
      form.setAttribute("method", "post");
      form.removeAttribute("enctype");

      const messageContainer = form.querySelector(".messages");
      const submitButton = form.querySelector('[type="submit"]');

      if (messageContainer) {
        messageContainer.hidden = true;
        messageContainer.setAttribute("aria-live", "polite");
      }

      if (!form.querySelector('[name="_gotcha"]')) {
        const honeypot = document.createElement("input");
        honeypot.type = "text";
        honeypot.name = "_gotcha";
        honeypot.autocomplete = "off";
        honeypot.tabIndex = -1;
        honeypot.hidden = true;
        honeypot.setAttribute("aria-hidden", "true");
        form.appendChild(honeypot);
      }

      form.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        const originalLabel = submitButton
          ? (submitButton instanceof HTMLInputElement ? submitButton.value : submitButton.textContent)
          : "";

        if (submitButton) {
          submitButton.disabled = true;
          setSubmitLabel(submitButton, "Sending...");
        }

        if (messageContainer) {
          messageContainer.hidden = true;
          messageContainer.textContent = "";
        }

        const formData = new FormData(form);
        formData.set("subject", "New free roof inspection request from {{ name }}");
        formData.set("page", window.location.pathname);

        try {
          const response = await fetch(endpoint, {
            method: "POST",
            body: formData,
            headers: {
              Accept: "application/json"
            }
          });

          let data = null;
          try {
            data = await response.json();
          } catch (error) {
            data = null;
          }

          if (response.ok) {
            form.reset();
            window.location.assign("thankyou.html");
            return;
          } else {
            showMessage(messageContainer, "danger", getErrorMessage(response, data));
          }
        } catch (error) {
          showMessage(
            messageContainer,
            "danger",
            `We couldn't send your request. Please check your connection and try again, or call ${phone}.`
          );
        } finally {
          if (submitButton) {
            submitButton.disabled = false;
            setSubmitLabel(submitButton, originalLabel);
          }
        }
      });
    });
  });
})();
