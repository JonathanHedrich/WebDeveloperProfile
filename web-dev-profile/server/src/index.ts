import "dotenv/config";

import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { rateLimit } from "express-rate-limit";
import nodemailer from "nodemailer";

type ContactRequestBody = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;

  // Unsichtbares Honeypot-Feld gegen einfache Bots.
  website?: unknown;
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

const app = express();

const port = Number(process.env.PORT ?? 3001);

const allowedSubjects = new Set(["project", "job", "collaboration", "other"]);

/* ==================================================
   GLOBAL MIDDLEWARE
================================================== */

app.disable("x-powered-by");

app.use(
  express.json({
    limit: "20kb",
  }),
);

/* ==================================================
   CONTACT RATE LIMIT
================================================== */

const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many messages were submitted. Please try again later.",
  },
});

/* ==================================================
   SMTP CONFIGURATION
================================================== */

const smtpPort = Number(process.env.SMTP_PORT ?? 587);

const transporter = nodemailer.createTransport({
  host: requireEnvironmentVariable("SMTP_HOST"),
  port: smtpPort,
  secure: process.env.SMTP_SECURE === "true" || smtpPort === 465,
  auth: {
    user: requireEnvironmentVariable("SMTP_USER"),
    pass: requireEnvironmentVariable("SMTP_PASSWORD"),
  },
});

/* ==================================================
   HEALTH CHECK
================================================== */

app.get("/api/health", (_request: Request, response: Response) => {
  response.status(200).json({
    success: true,
    message: "Contact server is running.",
  });
});

/* ==================================================
   CONTACT ENDPOINT
================================================== */

app.post(
  "/api/contact",
  contactRateLimit,
  async (
    request: Request<Record<string, never>, unknown, ContactRequestBody>,
    response: Response,
  ) => {
    const validation = validateContactRequest(request.body);

    if (!validation.success) {
      response.status(400).json({
        success: false,
        message: validation.message,
      });

      return;
    }

    const contact = validation.data;

    const subjectLabel = getSubjectLabel(contact.subject);
    const senderName = `${contact.firstName} ${contact.lastName}`;

    try {
      await transporter.sendMail({
        from: requireEnvironmentVariable("SMTP_FROM"),
        to: requireEnvironmentVariable("CONTACT_TO"),

        /*
         * Reply-To zeigt auf den Formular-Absender.
         * Dadurch kannst du in deinem Mailprogramm direkt antworten.
         */
        replyTo: {
          name: senderName,
          address: contact.email,
        },

        subject: `[Portfolio] ${subjectLabel} from ${senderName}`,

        text: createPlainTextEmail(contact, subjectLabel),

        html: createHtmlEmail(contact, subjectLabel),
      });

      response.status(200).json({
        success: true,
        message: "Thank you! Your message has been sent successfully.",
      });
    } catch (error: unknown) {
      console.error("Contact email could not be sent:", error);

      response.status(500).json({
        success: false,
        message:
          "Your message could not be sent. Please try again later or contact me directly by email.",
      });
    }
  },
);

/* ==================================================
   NOT FOUND
================================================== */

app.use((_request: Request, response: Response) => {
  response.status(404).json({
    success: false,
    message: "Endpoint not found.",
  });
});

/* ==================================================
   ERROR HANDLER
================================================== */

app.use(
  (
    error: unknown,
    _request: Request,
    response: Response,
    _next: NextFunction,
  ) => {
    console.error("Unhandled server error:", error);

    response.status(500).json({
      success: false,
      message: "An unexpected server error occurred.",
    });
  },
);

/* ==================================================
   SERVER START
================================================== */

async function startServer(): Promise<void> {
  try {
    await transporter.verify();

    console.log("SMTP connection verified.");

    app.listen(port, () => {
      console.log(`Contact server running on http://localhost:${port}`);
    });
  } catch (error: unknown) {
    console.error("Could not connect to the SMTP server:", error);
    process.exit(1);
  }
}

void startServer();

/* ==================================================
   VALIDATION
================================================== */

function validateContactRequest(body: ContactRequestBody): ValidationResult {
  /*
   * Ein echter Nutzer sieht dieses Feld nicht.
   * Bots füllen häufig jedes vorhandene Feld aus.
   */
  const honeypot = normalizeString(body.website);

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
  if (email.length > 254) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ==================================================
   EMAIL CONTENT
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

function createHtmlEmail(contact: ContactData, subjectLabel: string): string {
  const safeFirstName = escapeHtml(contact.firstName);
  const safeLastName = escapeHtml(contact.lastName);
  const safeEmail = escapeHtml(contact.email);
  const safeSubject = escapeHtml(subjectLabel);
  const safeMessage = escapeHtml(contact.message).replace(/\n/g, "<br />");

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>New portfolio message</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 32px;
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
                  padding: 8px 16px 8px 0;
                  color: #94a3b8;
                "
              >
                Name
              </td>

              <td style="padding: 8px 0; color: #ffffff;">
                ${safeFirstName} ${safeLastName}
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding: 8px 16px 8px 0;
                  color: #94a3b8;
                "
              >
                Email
              </td>

              <td style="padding: 8px 0;">
                <a
                  href="mailto:${safeEmail}"
                  style="color: #67e8f9;"
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
                "
              >
                Subject
              </td>

              <td style="padding: 8px 0; color: #ffffff;">
                ${safeSubject}
              </td>
            </tr>
          </table>

          <div
            style="
              padding: 20px;
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

function escapeHtml(value: string): string {
  const characters: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return value.replace(/[&<>"']/g, (character) => {
    return characters[character] ?? character;
  });
}

/* ==================================================
   ENVIRONMENT
================================================== */

function requireEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`The required environment variable "${name}" is missing.`);
  }

  return value;
}
