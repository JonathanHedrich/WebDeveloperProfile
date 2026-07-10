export function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>("#contact-form");
  const status = document.querySelector<HTMLParagraphElement>("#form-status");

  if (!form || !status) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();

      status.textContent =
        "Please complete all required fields before sending.";

      status.classList.remove("success");
      status.classList.add("error");

      return;
    }

    status.textContent =
      "The form design is ready. Connect a backend or form service to send messages.";

    status.classList.remove("error");
    status.classList.add("success");
  });
}
