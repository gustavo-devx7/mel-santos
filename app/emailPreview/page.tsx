import React from "react"
import { PaymentConfirmationEmail } from "@/components/emailTemplates/page"

export default function Page() {
  return (
    <PaymentConfirmationEmail
      transactionId="123456"
      totalAmount={9900}
      buyerName="Teste"
    />
  )
}
