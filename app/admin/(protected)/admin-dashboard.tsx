"use client"

import { useState, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { AdminDashboardData } from "@/lib/admin-metrics"

// ─── helpers ─────────────────────────────────────────────────────────────────

function formatCurrency(valueInCents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valueInCents / 100)
}

function formatDate(value: string | null) {
  if (!value) return "-"
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value))
}

function paymentStatusLabel(status: string) {
  switch (status) {
    case "paid":    return "Pago"
    case "pending": return "Pendente"
    default:        return status
  }
}

function accessStatusLabel(status: "ativo" | "expirado" | "pendente") {
  switch (status) {
    case "ativo":    return "Ativo"
    case "expirado": return "Expirado"
    default:         return "Pendente"
  }
}

function StatusPill({ status }: { status: "ativo" | "expirado" | "pendente" }) {
  const styles: Record<string, string> = {
    ativo:    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-900",
    expirado: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-900",
    pendente: "bg-[var(--muted)] text-[var(--muted-foreground)] border-[var(--border)]",
  }
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${styles[status] ?? styles.pendente}`}
    >
      {accessStatusLabel(status)}
    </span>
  )
}

// ─── MetricCard ───────────────────────────────────────────────────────────────

function MetricCard({
  label,
  value,
  sub,
  accent = false,
}: {
  label: string
  value: string
  sub: string
  accent?: boolean
}) {
  if (accent) {
    return (
      <article
        className="rounded-[20px] p-5"
        style={{
          background: "linear-gradient(135deg, #0f1b14, #101814)",
          boxShadow: "0 16px 48px rgba(15,27,20,0.25)",
        }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
          {label}
        </p>
        <h3 className="mt-3 text-[28px] font-normal leading-none tracking-tight text-white">
          {value}
        </h3>
        <p className="mt-2 text-sm text-emerald-100/60">{sub}</p>
      </article>
    )
  }

  return (
    <article
      className="rounded-[20px] border p-5"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        color: "var(--card-foreground)",
      }}
    >
      <p
        className="text-[10px] font-semibold uppercase tracking-[0.22em]"
        style={{ color: "var(--muted-foreground)" }}
      >
        {label}
      </p>
      <h3
        className="mt-3 text-[28px] font-normal leading-none tracking-tight"
        style={{ color: "var(--foreground)" }}
      >
        {value}
      </h3>
      <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
        {sub}
      </p>
    </article>
  )
}

// ─── BarRow ───────────────────────────────────────────────────────────────────

function BarRow({
  label,
  count,
  pct,
  variant,
}: {
  label: string
  count: number
  pct: number
  variant: "green" | "dark"
}) {
  return (
    <div className="space-y-1.5">
      <div
        className="flex items-center justify-between text-sm"
        style={{ color: "var(--muted-foreground)" }}
      >
        <span style={{ color: "var(--foreground)", fontWeight: 500 }}>{label}</span>
        <span>{count}</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full"
        style={{ background: "var(--muted)" }}
      >
        <div
          className="h-2 rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: variant === "green" ? "#22c55e" : "var(--foreground)",
          }}
        />
      </div>
    </div>
  )
}

// ─── AdminDashboard ───────────────────────────────────────────────────────────

export function AdminDashboard({ data }: { data: AdminDashboardData }) {
  const { clients, summary } = data
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<"" | "ativo" | "expirado" | "pendente">("")

  const filteredClients = useMemo(() => {
    const q = search.toLowerCase()
    return clients.filter((c) => {
      const matchSearch =
        !q ||
        (c.name ?? "").toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
      const matchStatus = !statusFilter || c.accessStatus === statusFilter
      return matchSearch && matchStatus
    })
  }, [clients, search, statusFilter])

  const newPct =
    summary.totalCustomersCount === 0
      ? 0
      : (summary.newCustomersCount / summary.totalCustomersCount) * 100

  const recurringPct =
    summary.totalCustomersCount === 0
      ? 0
      : (summary.recurringCustomersCount / summary.totalCustomersCount) * 100

  const avgTicket =
    summary.totalCustomersCount === 0
      ? 0
      : Math.round(summary.totalRevenueCents / summary.totalCustomersCount)

  const avgPayments =
    summary.totalCustomersCount === 0
      ? "0,0"
      : (summary.totalPaidPaymentsCount / summary.totalCustomersCount)
          .toFixed(1)
          .replace(".", ",")

  return (
    <Tabs defaultValue="visao-geral" className="space-y-5">
      {/* ── nav ── */}
      <TabsList
        className="h-auto gap-1.5 rounded-2xl p-1.5"
        style={{ background: "var(--muted)" }}
      >
        <TabsTrigger
          value="visao-geral"
          className="rounded-xl px-5 py-2 text-sm font-medium transition-colors data-[state=active]:bg-[#0f1b14] data-[state=active]:text-white"
          style={{ color: "var(--muted-foreground)" }}
        >
          Visão geral
        </TabsTrigger>
        <TabsTrigger
          value="clientes"
          className="rounded-xl px-5 py-2 text-sm font-medium transition-colors data-[state=active]:bg-[#0f1b14] data-[state=active]:text-white"
          style={{ color: "var(--muted-foreground)" }}
        >
          Clientes
        </TabsTrigger>
      </TabsList>

      {/* ── visão geral ── */}
      <TabsContent value="visao-geral" className="space-y-4">
        {/* metric cards */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Faturamento novo"
            value={formatCurrency(summary.newCustomerRevenueCents)}
            sub={`${summary.newCustomersCount} clientes novos`}
          />
          <MetricCard
            label="Faturamento recorrente"
            value={formatCurrency(summary.recurringCustomerRevenueCents)}
            sub={`${summary.recurringCustomersCount} clientes recorrentes`}
          />
          <MetricCard
            label="Faturamento total"
            value={formatCurrency(summary.totalRevenueCents)}
            sub={`${summary.totalPaidPaymentsCount} pagamentos aprovados`}
            accent
          />
          <MetricCard
            label="Clientes"
            value={String(summary.totalCustomersCount)}
            sub={`${summary.newCustomersCount} novos · ${summary.recurringCustomersCount} recorrentes`}
          />
        </div>

        {/* distribution + quick read */}
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <article
            className="space-y-5 rounded-[24px] border p-6"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <div>
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "var(--muted-foreground)" }}
              >
                Base de clientes
              </p>
              <h3
                className="mt-1 text-xl font-normal"
                style={{ color: "var(--foreground)" }}
              >
                Distribuição da operação
              </h3>
            </div>
            <div className="space-y-4">
              <BarRow label="Novos" count={summary.newCustomersCount} pct={newPct} variant="green" />
              <BarRow label="Recorrentes" count={summary.recurringCustomersCount} pct={recurringPct} variant="dark" />
            </div>
          </article>

          <article
            className="space-y-3 rounded-[24px] border p-6"
            style={{ background: "var(--secondary)", borderColor: "var(--border)" }}
          >
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: "var(--muted-foreground)" }}
            >
              Leitura rápida
            </p>
            {/* quick stat cards */}
            {[
              { label: "Ticket por cliente", value: formatCurrency(avgTicket) },
              { label: "Média de pagamentos", value: avgPayments },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-2xl border p-4"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                  {label}
                </p>
                <p
                  className="mt-1 text-2xl font-normal tracking-tight"
                  style={{ color: "var(--foreground)" }}
                >
                  {value}
                </p>
              </div>
            ))}
          </article>
        </div>
      </TabsContent>

      {/* ── clientes ── */}
      <TabsContent value="clientes">
        <section
          className="overflow-hidden rounded-[24px] border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          {/* header */}
          <div
            className="border-b px-6 py-5"
            style={{ borderColor: "var(--border)" }}
          >
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: "var(--muted-foreground)" }}
            >
              Clientes
            </p>
            <h3
              className="mt-1 text-xl font-normal"
              style={{ color: "var(--foreground)" }}
            >
              Tabela consolidada por e-mail
            </h3>
          </div>

          {/* search + filter */}
          <div
            className="flex flex-col gap-3 border-b px-6 py-4 sm:flex-row"
            style={{ borderColor: "var(--border)" }}
          >
            <input
              type="text"
              placeholder="Buscar por nome ou e-mail…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 flex-1 rounded-xl border px-3 text-sm outline-none transition focus:ring-2"
              style={{
                background: "var(--muted)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
                // @ts-ignore
                "--tw-ring-color": "var(--ring)",
              }}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="h-9 rounded-xl border px-3 text-sm outline-none"
              style={{
                background: "var(--muted)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            >
              <option value="">Todos os status</option>
              <option value="ativo">Ativo</option>
              <option value="expirado">Expirado</option>
              <option value="pendente">Pendente</option>
            </select>
          </div>

          {/* table */}
          <Table>
            <TableHeader>
              <TableRow style={{ background: "var(--muted)" }}>
                <TableHead className="px-6" style={{ color: "var(--muted-foreground)" }}>Cliente</TableHead>
                <TableHead style={{ color: "var(--muted-foreground)" }}>Email</TableHead>
                <TableHead style={{ color: "var(--muted-foreground)" }}>Status</TableHead>
                <TableHead style={{ color: "var(--muted-foreground)" }}>Tipo</TableHead>
                <TableHead className="text-right" style={{ color: "var(--muted-foreground)" }}>Total pago</TableHead>
                <TableHead className="text-right" style={{ color: "var(--muted-foreground)" }}>Pagamentos</TableHead>
                <TableHead style={{ color: "var(--muted-foreground)" }}>Primeiro</TableHead>
                <TableHead style={{ color: "var(--muted-foreground)" }}>Último</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <TableRow
                    key={client.email}
                    className="transition-colors"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <TableCell className="px-6 py-4">
                      <span
                        className="block text-sm font-medium"
                        style={{ color: "var(--foreground)" }}
                      >
                        {client.name || "Sem nome"}
                      </span>
                      <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                        Pagamento: {paymentStatusLabel(client.latestStatus)}
                      </span>
                    </TableCell>
                    <TableCell
                      className="text-sm"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {client.email}
                    </TableCell>
                    <TableCell>
                      <StatusPill status={client.accessStatus} />
                    </TableCell>
                    <TableCell
                      className="text-sm capitalize"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {client.segment}
                    </TableCell>
                    <TableCell
                      className="text-right text-sm font-medium"
                      style={{ color: "var(--foreground)" }}
                    >
                      {formatCurrency(client.totalPaidCents)}
                    </TableCell>
                    <TableCell
                      className="text-right text-sm"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {client.paymentCount}
                    </TableCell>
                    <TableCell
                      className="text-sm"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {formatDate(client.firstPaymentAt)}
                    </TableCell>
                    <TableCell
                      className="text-sm"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {formatDate(client.lastPaymentAt)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="px-6 py-12 text-center text-sm"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Nenhum cliente encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>
      </TabsContent>
    </Tabs>
  )
}
