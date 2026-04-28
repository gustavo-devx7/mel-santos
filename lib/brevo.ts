const BREVO_API_KEY = process.env.BREVO_API_KEY || process.env.API_KEY_BREVO
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL
const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME ?? "Seu time"

interface SendBrevoEmailProps {
  toEmail: string
  toName?: string
  subject: string
  htmlContent: string
  textContent?: string
}

export async function sendBrevoEmail({
  toEmail,
  toName,
  subject,
  htmlContent,
  textContent,
}: SendBrevoEmailProps) {
  if (!BREVO_API_KEY) {
    return { ok: false, error: "BREVO_API_KEY não configurada" }
  }

  if (!BREVO_SENDER_EMAIL) {
    return { ok: false, error: "BREVO_SENDER_EMAIL não configurada" }
  }

  const payload = {
    sender: {
      email: BREVO_SENDER_EMAIL,
      name: BREVO_SENDER_NAME,
    },
    to: [
      {
        email: toEmail,
        name: toName ?? "Cliente",
      },
    ],
    subject,
    htmlContent,
    textContent,
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    return {
      ok: false,
      error: data?.message || `Brevo retornou status ${response.status}`,
      response: data,
    }
  }

  return { ok: true, response: data }
}
