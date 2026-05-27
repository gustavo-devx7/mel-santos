"use server"

import { redirect } from "next/navigation"
import { clearAdminSession, isValidAdminPassword, setAdminSession } from "@/lib/admin-session"

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get("password") ?? "")

  if (!isValidAdminPassword(password)) {
    redirect("/admin/login?error=1")
  }

  await setAdminSession()
  redirect("/admin")
}

export async function logoutAdmin() {
  await clearAdminSession()
  redirect("/admin/login")
}
