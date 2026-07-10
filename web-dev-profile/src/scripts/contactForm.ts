type ContactApiResponse = {
  success: boolean;
  message: string;
};

export function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>("#contact-form");

  const status = document.querySelector<HTMLParagraphElement>("#form-status");

  const submitButton = form?.querySelector<HTMLButtonElement>(
    'button[type="submit"]',
  );

  if (!form || !status || !submitButton) {
    return;
  }

  const originalButtonContent = submitButton.innerHTML;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    status.textContent = "";
    status.classList.remove("success", "error");

    if (!form.checkValidity()) {
      form.reportValidity();

      status.textContent = "Please complete all required fields.";

      status.classList.add("error");
      return;
    }

    const formData = new FormData(form);

    const payload = {
      firstName: getFormValue(formData, "firstName"),
      lastName: getFormValue(formData, "lastName"),
      email: getFormValue(formData, "email"),
      subject: getFormValue(formData, "subject"),
      message: getFormValue(formData, "message"),
      website: getFormValue(formData, "website"),
    };

    setSubmittingState(submitButton, true, originalButtonContent);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as ContactApiResponse;

      if (!response.ok || !result.success) {
        throw new Error(result.message || "The message could not be sent.");
      }

      status.textContent = result.message;
      status.classList.add("success");

      form.reset();
    } catch (error: unknown) {
      status.textContent =
        error instanceof Error
          ? error.message
          : "The message could not be sent. Please try again later.";

      status.classList.add("error");
    } finally {
      setSubmittingState(submitButton, false, originalButtonContent);
    }
  });
}

function getFormValue(formData: FormData, fieldName: string): string {
  const value = formData.get(fieldName);

  return typeof value === "string" ? value.trim() : "";
}

function setSubmittingState(
  button: HTMLButtonElement,
  isSubmitting: boolean,
  originalContent: string,
): void {
  button.disabled = isSubmitting;
  button.setAttribute("aria-busy", String(isSubmitting));

  button.innerHTML = isSubmitting
    ? `
        <span>Sending...</span>
        <span
          class="contact-submit-spinner"
          aria-hidden="true"
        ></span>
      `
    : originalContent;
}
