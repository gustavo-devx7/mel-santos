import { NextRequest, NextResponse } from "next/server"

// Webhook para receber notificações da BuckPay
// Configure esta URL no painel da BuckPay ou via postbackUrl ao criar a transação

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
      // Aqui você pode:
      // 1. Atualizar o banco de dados marcando a transação como paga
      // 2. Enviar email de confirmação para o comprador
      // 3. Liberar o produto/serviço (entregável)
      // 4. Notificar outros sistemas via API

      console.log(`PIX pago - Transação: ${transactionId}`)
      console.log(`Comprador: ${data.buyer?.name} (${data.buyer?.email})`)
      console.log(`Valor: R$ ${(data.total_amount / 100).toFixed(2)}`)
      
      // TODO: Implementar lógica de entrega do produto/serviço aqui
    }

    // Evento: transaction.created = Transação pendente
    if (event === "transaction.created" && status === "pending") {
      console.log(`Transação criada (pendente): ${transactionId}`)
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
