import { redirect } from "next/navigation"
import { getCustomerSession } from "@/lib/auth-session"

export default async function PlataformaLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<Record<string, never>>
}) {
  await params
  const session = await getCustomerSession()

  if (!session) {
    redirect("/entrar")
  }

  return children
}
