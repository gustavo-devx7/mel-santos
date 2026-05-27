import { AdminPageClient } from "@/app/admin/(protected)/admin-page-client"
import { buildAdminDashboardData } from "@/lib/admin-metrics"
import { query } from "@/lib/db"

export const dynamic = "force-dynamic"

function getAdminLoadErrorMessage(error: unknown) {
  if (!(error instanceof Error)) {
    return "Não foi possível carregar os clientes no momento."
  }
  if (error.message.includes("NEON_URL")) {
    return "A variável NEON_URL não está configurada no servidor."
  }
  if (
    error.message.toLowerCase().includes("fetch failed") ||
    error.message.toLowerCase().includes("connect")
  ) {
    return "A conexão com o banco de dados falhou. Verifique a URL e se o ambiente tem acesso à internet."
  }
  return `Não foi possível carregar os clientes: ${error.message}`
}

export default async function AdminPage() {
  let loadError: string | null = null
  let dashboardData = buildAdminDashboardData([])

  try {
    const customers = await query<{
      email: string
      name: string | null
      status: string
      amount_cents: number
      transaction_id: string
      created_at: string
    }>(
      `SELECT email, name, status, amount_cents, transaction_id, created_at
       FROM customers
       ORDER BY created_at ASC`,
    )
    dashboardData = buildAdminDashboardData(customers ?? [])
  } catch (error) {
    loadError = getAdminLoadErrorMessage(error)
  }

  return <AdminPageClient dashboardData={dashboardData} loadError={loadError} />
}
