import { NextRequest, NextResponse } from "next/server"

const BUCKPAY_API_URL = process.env.BUCKPAY_API_URL
const BUCKPAY_API_KEY = process.env.BUCKPAY_API_KEY
const BUCKPAY_USER_AGENT = process.env.BUCKPAY_USER_AGENT

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ transactionId: string }> }
) {
  try {
    const { transactionId } = await params

    if (!BUCKPAY_API_URL || !BUCKPAY_API_KEY || !BUCKPAY_USER_AGENT) {
      return NextResponse.json(
        { error: "Credenciais da API não configuradas" },
        { status: 500 }
      )
    }

    // Consulta o status da transação na BuckPay
    const response = await fetch(`${BUCKPAY_API_URL}/v1/transactions/${transactionId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${BUCKPAY_API_KEY}`,
        "User-Agent": BUCKPAY_USER_AGENT,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Erro ao consultar status" },
        { status: response.status }
      )
    }

    // Mapeia o status da BuckPay
    // Ajuste conforme os status reais retornados pela API
    const transactionData = data.data || data
    const status = transactionData.status?.toLowerCase() || "pending"

    return NextResponse.json({
      transactionId,
      status,
      isPaid: status === "paid" || status === "approved" || status === "completed",
    })

  } catch (error) {
    console.error("Erro ao consultar status:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
