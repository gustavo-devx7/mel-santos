import { redirect } from "next/navigation"
import { getCustomerSession } from "@/lib/auth-session"

export default async function PlataformaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getCustomerSession()

  if (!session) {
    redirect("/entrar")
  }

  return children
}
