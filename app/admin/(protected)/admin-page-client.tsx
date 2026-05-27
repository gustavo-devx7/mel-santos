"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { logoutAdmin } from "@/app/admin/actions"
import { AdminDashboard } from "@/app/admin/(protected)/admin-dashboard"
import type { AdminDashboardData } from "@/lib/admin-metrics"

// ─── ThemeToggle ──────────────────────────────────────────────────────────────

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // evita hydration mismatch
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Alternar tema"
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-[11px] tracking-wide text-white/75 transition hover:bg-white/14"
    >
      {/* pill toggle */}
      <span
        className="relative inline-block h-[18px] w-8 flex-shrink-0 rounded-full transition-colors duration-300"
        style={{ background: isDark ? "#1e3027" : "rgba(255,255,255,0.2)" }}
      >
        <span
          className="absolute top-[2px] h-3.5 w-3.5 rounded-full transition-all duration-300"
          style={{
            left: isDark ? "calc(100% - 18px)" : "2px",
            background: isDark ? "#22c55e" : "#fff",
          }}
        />
      </span>
      {isDark ? "Modo claro" : "Modo escuro"}
    </button>
  )
}

// ─── AdminPageClient ──────────────────────────────────────────────────────────

export function AdminPageClient({
  dashboardData,
  loadError,
}: {
  dashboardData: AdminDashboardData
  loadError: string | null
}) {
  return (
    <main
      className="min-h-screen px-4 py-6 sm:px-6 lg:px-10"
      style={{ background: "var(--background)" }}
    >
      <div className="mx-auto max-w-7xl space-y-5">

        {/* ── header ── */}
        <section
          className="overflow-hidden rounded-[28px] p-6 sm:p-8"
          style={{
            background: "linear-gradient(135deg, #0f1b14 0%, #101814 100%)",
            boxShadow: "0 24px 64px rgba(15,27,20,0.22)",
            position: "relative",
          }}
        >
          {/* glow sutil */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -60,
              left: -60,
              width: 260,
              height: 260,
              background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-200">
                Money Hot Admin
              </span>
              <div className="space-y-1.5">
                <h1 className="text-3xl font-normal tracking-tight text-white sm:text-4xl">
                  Receita, clientes e recorrência em um único painel.
                </h1>
                <p className="max-w-2xl text-sm leading-6 text-emerald-50/65 sm:text-base">
                  Dados agregados por e-mail com leitura rápida da base, status de acesso e histórico essencial de pagamentos.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 lg:flex-shrink-0">
              <ThemeToggle />
              <form action={logoutAdmin}>
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center rounded-2xl border border-white/12 bg-white/8 px-5 text-sm font-medium text-white transition hover:bg-white/14"
                >
                  Sair
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ── error banner ── */}
        {loadError && (
          <section
            className="rounded-[22px] border p-6"
            style={{
              background: "var(--muted)",
              borderColor: "#fde68a",
              color: "var(--foreground)",
            }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-600">
              Falha ao carregar dados
            </p>
            <h2 className="mt-1.5 text-xl font-normal" style={{ color: "var(--foreground)" }}>
              O painel abriu, mas a base não respondeu.
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6" style={{ color: "var(--muted-foreground)" }}>
              {loadError}
            </p>
          </section>
        )}

        {/* ── dashboard ── */}
        <AdminDashboard data={dashboardData} />
      </div>
    </main>
  )
}
