import { NextRequest, NextResponse } from "next/server"
import { execute } from "@/lib/db"

// Webhook para receber notificaÃ§Ãµes da BuckPay
// Configure esta URL no painel da BuckPay ou via postbackUrl ao criar a transaÃ§Ã£o

interface BuckPayWebhookPayload {
  event: "transaction.created" | "transaction.processed"
  data: {
    id: string
    status: "pending" | "paid"
    payment_method: string
    total_amount: number
    pix_code?: string
    net_amount: number
    offer?: {
      name: string
      discount_price: number
      quantity: number
    }
    buyer?: {
      name: string
      email: string
      phone?: string
      document?: string
    }
    tracking?: {
      ref: string | null
      src: string | null
      sck: string | null
      utm: {
        source: string | null
        medium: string | null
        campaign: string | null
        id: string | null
        term: string | null
        content: string | null
      }
    }
    created_at: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: BuckPayWebhookPayload = await request.json()

    const { event, data } = body
    const transactionId = data.id
    const status = data.status

    // Evento: transaction.processed = PIX pago
    if (event === "transaction.processed" && status === "paid") {
      console.log(`PIX pago - TransaÃ§Ã£o: ${transactionId}`)
      console.log(`Comprador: ${data.buyer?.name} (${data.buyer?.email})`)
      console.log(`Valor: R$ ${(data.total_amount / 100).toFixed(2)}`)

      if (data.buyer?.email) {
        try {
          await execute(
            `INSERT INTO customers (email, name, transaction_id, status, amount_cents)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (transaction_id) DO UPDATE SET
             email = $1, name = $2, status = $4, amount_cents = $5`,
            [data.buyer.email, data.buyer.name ?? null, transactionId, status, data.total_amount]
          )
        } catch (error) {
          console.error("Erro ao salvar cliente no banco de dados:", error)
        }
      } else {
        console.warn(`TransaÃ§Ã£o paga sem email do comprador: ${transactionId}`)
      }
    }

    // Evento: transaction.created = TransaÃ§Ã£o pendente
    if (event === "transaction.created" && status === "pending") {
      console.log(`TransaÃ§Ã£o criada (pendente): ${transactionId}`)
    }

    // Retorna 200 para confirmar recebimento do webhook
    return NextResponse.json({
      received: true,
      event,
      transactionId,
      status,
    })
  } catch (error) {
    console.error("Erro no webhook:", error)
    // Retorna 200 mesmo com erro para evitar reenvios da BuckPay
    return NextResponse.json({ received: true, error: "Erro ao processar" })
  }
}
