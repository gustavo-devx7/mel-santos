import { NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase-admin"
import { setCustomerSession } from "@/lib/auth-session"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Digite um e-mail válido." }, { status: 400 })
    }

    const supabaseAdmin = getSupabaseAdmin()
    const { data: customer, error } = await supabaseAdmin
      .from("customers")
      .select("email, status")
      .eq("email", email)
      .eq("status", "paid")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error("Erro ao buscar cliente no Supabase:", error)
      return NextResponse.json({ error: "Erro ao validar seu acesso." }, { status: 500 })
    }

    if (!customer) {
      return NextResponse.json(
        { error: "Não encontramos um pagamento aprovado para este e-mail." },
        { status: 403 }
      )
    }

    await setCustomerSession(customer.email)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Erro no login:", error)
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 })
  }
}
