"use client";
import React from "react";
import { PaymentConfirmationEmail } from "@/components/emailTemplates/page";

export default function Page() {
  return (
    
    <PaymentConfirmationEmail
      transactionId="123456"
      totalAmount={9900}
      buyerName="Teste"
    />
  );
}

// tem que resolver isso aí pra pessoa ver conteudo personalizado no email que esta em components