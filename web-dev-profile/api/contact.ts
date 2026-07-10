import nodemailer from "nodemailer";

type ContactRequestBody = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;

  /*
   * Muss mit dem Namen deines Honeypot-Feldes im Frontend
   * übereinstimmen.
   */
  secondaryAddress?: unknown;
};

type ContactData = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

type ValidationResult =
  | {
      success: true;
      data: ContactData;
    }
  | {
      success: false;
      message: string;
    };

type ApiResponse = {
  success: boolean;
  message: string;
};

const allowedSubjects = new Set(["project", "job", "collaboration", "other"]);

/* ==================================================
   VERCEL FUNCTION
================================================== */

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== "POST") {
      return jsonResponse(
        {
          success: false,
          message: "Method not allowed.",
        },
        405,
        {
          Allow: "POST",
        },
      );
    }

    const contentType = request.headers.get("content-type") ?? "";

    if (!contentType.includes("application/json")) {
      return jsonResponse(
        {
          success: false,
          message: "Content-Type must be application/json.",
        },
        415,
      );
    }

    /*
     * Verhindert unnötig große Requests.
     * Content-Length kann fehlen, deshalb validieren wir zusätzlich
     * später die einzelnen Textlängen.
     */
    const contentLength = Number(request.headers.get("content-length") ?? 0);

    if (contentLength > 20_000) {
      return jsonResponse(
        {
          success: false,
          message: "The submitted request is too large.",
        },
        413,
      );
    }

    try {
      const body = (await request.json()) as ContactRequestBody;
      const validation = validateContactRequest(body);

      if (!validation.success) {
        return jsonResponse(
          {
            success: false,
            message: validation.message,
          },
          400,
        );
      }

      const contact = validation.data;
      const subjectLabel = getSubjectLabel(contact.subject);
      const senderName = `${contact.firstName} ${contact.lastName}`;

      const smtpPort = parsePort(requireEnvironmentVariable("SMTP_PORT"));

      const transporter = nodemailer.createTransport({
        host: requireEnvironmentVariable("SMTP_HOST"),
        port: smtpPort,

        secure: process.env.SMTP_SECURE === "true" || smtpPort === 465,

        auth: {
          user: requireEnvironmentVariable("SMTP_USER"),
          pass: requireEnvironmentVariable("SMTP_PASSWORD"),
        },

        /*
         * Verhindert, dass eine SMTP-Verbindung endlos wartet.
         */
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 15_000,
      });

      await transporter.sendMail({
        from: requireEnvironmentVariable("SMTP_FROM"),
        to: requireEnvironmentVariable("CONTACT_TO"),

        /*
         * Beim Antworten wird direkt die E-Mail-Adresse
         * des Formular-Absenders verwendet.
         */
        replyTo: {
          name: senderName,
          address: contact.email,
        },

        subject: `[Portfolio] ${subjectLabel} from ${senderName}`,

        text: createPlainTextEmail(contact, subjectLabel),

        html: createHtmlEmail(contact, subjectLabel),
      });

      return jsonResponse(
        {
          success: true,
          message: "Thank you! Your message has been sent successfully.",
        },
        200,
      );
    } catch (error: unknown) {
      /*
       * Keine Passwörter oder vollständigen Request-Daten loggen.
       */
      console.error("Vercel contact function failed:", getErrorMessage(error));

      return jsonResponse(
        {
          success: false,
          message:
            "Your message could not be sent. Please try again later or contact me directly by email.",
        },
        500,
      );
    }
  },
};

/* ==================================================
   VALIDATION
================================================== */

function validateContactRequest(body: ContactRequestBody): ValidationResult {
  /*
   * Honeypot:
   * Ein normaler Besucher sieht dieses Feld nicht.
   * Bots füllen häufig alle vorhandenen Eingabefelder aus.
   */
  const honeypot = normalizeString(body.secondaryAddress);

  if (honeypot.length > 0) {
    return {
      success: false,
      message: "The message could not be submitted.",
    };
  }

  const firstName = normalizeString(body.firstName);
  const lastName = normalizeString(body.lastName);
  const email = normalizeString(body.email).toLowerCase();
  const subject = normalizeString(body.subject);
  const message = normalizeString(body.message);

  if (firstName.length < 2 || firstName.length > 60) {
    return {
      success: false,
      message: "The first name must contain between 2 and 60 characters.",
    };
  }

  if (lastName.length < 2 || lastName.length > 60) {
    return {
      success: false,
      message: "The last name must contain between 2 and 60 characters.",
    };
  }

  if (!isValidEmail(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  if (!allowedSubjects.has(subject)) {
    return {
      success: false,
      message: "Please select a valid subject.",
    };
  }

  if (message.length < 10 || message.length > 3000) {
    return {
      success: false,
      message: "The message must contain between 10 and 3000 characters.",
    };
  }

  return {
    success: true,
    data: {
      firstName,
      lastName,
      email,
      subject,
      message,
    },
  };
}

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string): boolean {
  if (email.length === 0 || email.length > 254) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ==================================================
   SUBJECTS
================================================== */

function getSubjectLabel(subject: string): string {
  const labels: Record<string, string> = {
    project: "Project inquiry",
    job: "Job opportunity",
    collaboration: "Collaboration",
    other: "Other inquiry",
  };

  return labels[subject] ?? "Portfolio inquiry";
}

/* ==================================================
   PLAIN-TEXT EMAIL
================================================== */

function createPlainTextEmail(
  contact: ContactData,
  subjectLabel: string,
): string {
  return [
    "New portfolio contact request",
    "",
    `Name: ${contact.firstName} ${contact.lastName}`,
    `Email: ${contact.email}`,
    `Subject: ${subjectLabel}`,
    "",
    "Message:",
    contact.message,
  ].join("\n");
}

/* ==================================================
   HTML EMAIL
================================================== */

function createHtmlEmail(contact: ContactData, subjectLabel: string): string {
  const safeFirstName = escapeHtml(contact.firstName);
  const safeLastName = escapeHtml(contact.lastName);
  const safeEmail = escapeHtml(contact.email);
  const safeSubject = escapeHtml(subjectLabel);

  const safeMessage = escapeHtml(contact.message).replace(/\r?\n/g, "<br />");

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        <title>New portfolio message</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 32px 16px;
          background: #020617;
          color: #e2e8f0;
          font-family: Arial, Helvetica, sans-serif;
        "
      >
        <div
          style="
            max-width: 680px;
            margin: 0 auto;
            padding: 32px;
            border: 1px solid #312e81;
            border-radius: 18px;
            background: #0f172a;
          "
        >
          <p
            style="
              margin: 0 0 8px;
              color: #a78bfa;
              font-size: 13px;
              font-weight: 700;
              letter-spacing: 2px;
              text-transform: uppercase;
            "
          >
            Portfolio contact
          </p>

          <h1
            style="
              margin: 0 0 28px;
              color: #ffffff;
              font-size: 28px;
              line-height: 1.2;
            "
          >
            New contact request
          </h1>

          <table
            role="presentation"
            style="
              width: 100%;
              margin-bottom: 28px;
              border-collapse: collapse;
            "
          >
            <tr>
              <td
                style="
                  width: 100px;
                  padding: 8px 16px 8px 0;
                  color: #94a3b8;
                  vertical-align: top;
                "
              >
                Name
              </td>

              <td
                style="
                  padding: 8px 0;
                  color: #ffffff;
                "
              >
                ${safeFirstName} ${safeLastName}
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding: 8px 16px 8px 0;
                  color: #94a3b8;
                  vertical-align: top;
                "
              >
                Email
              </td>

              <td style="padding: 8px 0;">
                <a
                  href="mailto:${safeEmail}"
                  style="
                    color: #67e8f9;
                    text-decoration: none;
                  "
                >
                  ${safeEmail}
                </a>
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding: 8px 16px 8px 0;
                  color: #94a3b8;
                  vertical-align: top;
                "
              >
                Subject
              </td>

              <td
                style="
                  padding: 8px 0;
                  color: #ffffff;
                "
              >
                ${safeSubject}
              </td>
            </tr>
          </table>

          <div
            style="
              padding: 20px;
              border: 1px solid rgba(139, 92, 246, 0.25);
              border-radius: 12px;
              background: #020617;
              color: #cbd5e1;
              line-height: 1.7;
            "
          >
            ${safeMessage}
          </div>
        </div>
      </body>
    </html>
  `;
}

/* ==================================================
   HTML ESCAPING
================================================== */

function escapeHtml(value: string): string {
  const characters: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return value.replace(
    /[&<>"']/g,
    (character) => characters[character] ?? character,
  );
}

/* ==================================================
   RESPONSES
================================================== */

function jsonResponse(
  body: ApiResponse,
  status: number,
  additionalHeaders: Record<string, string> = {},
): Response {
  return Response.json(body, {
    status,

    headers: {
      "Cache-Control": "no-store",
      ...additionalHeaders,
    },
  });
}

/* ==================================================
   ENVIRONMENT VARIABLES
================================================== */

function requireEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`The required environment variable "${name}" is missing.`);
  }

  return value;
}

function parsePort(value: string): number {
  const port = Number(value);

  if (!Number.isInteger(port) || port <= 0 || port > 65_535) {
    throw new Error(`The SMTP port "${value}" is invalid.`);
  }

  return port;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}
