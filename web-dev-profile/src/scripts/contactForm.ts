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

  form.addEventListener("submit", async (event: SubmitEvent) => {
    event.preventDefault();

    clearStatus(status);

    if (!form.checkValidity()) {
      form.reportValidity();

      showStatus(status, "Please complete all required fields.", "error");

      return;
    }

    const formData = new FormData(form);

    const payload = {
      firstName: getFormValue(formData, "firstName"),

      lastName: getFormValue(formData, "lastName"),

      email: getFormValue(formData, "email"),

      subject: getFormValue(formData, "subject"),

      message: getFormValue(formData, "message"),

      secondaryAddress: getFormValue(formData, "secondaryAddress"),
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

      const result = await readApiResponse(response);

      if (!response.ok || !result.success) {
        throw new Error(result.message || "The message could not be sent.");
      }

      showStatus(status, result.message, "success");

      form.reset();
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "The message could not be sent. Please try again later.";

      showStatus(status, message, "error");
    } finally {
      setSubmittingState(submitButton, false, originalButtonContent);
    }
  });
}

async function readApiResponse(
  response: Response,
): Promise<ContactApiResponse> {
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    const responseText = await response.text();

    console.error("Contact API returned a non-JSON response:", responseText);

    if (response.status === 404) {
      throw new Error("The contact API could not be found.");
    }

    throw new Error("The contact service returned an invalid response.");
  }

  return (await response.json()) as ContactApiResponse;
}

function getFormValue(formData: FormData, fieldName: string): string {
  const value = formData.get(fieldName);

  return typeof value === "string" ? value.trim() : "";
}

function clearStatus(status: HTMLParagraphElement): void {
  status.textContent = "";
  status.classList.remove("success", "error");
}

function showStatus(
  status: HTMLParagraphElement,
  message: string,
  type: "success" | "error",
): void {
  status.textContent = message;
  status.classList.remove("success", "error");
  status.classList.add(type);
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
