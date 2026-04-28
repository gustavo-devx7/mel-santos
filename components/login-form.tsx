"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")

    if (!email.trim() || !email.includes("@")) {
      setError("Digite o mesmo e-mail usado no pagamento.")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Não foi possível entrar.")
      }

      router.push("/conteudo")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível entrar.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center">

      <div></div>
      <div className="flex flex-col gap-6 w-full items-center mt-6">
        <label
          htmlFor="email"
          className="text-sm font-medium text-neutral-700 dark:text-neutral-200"
        >
          E-mail usado no pagamento
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="exemplo@gmail.com"
          className="h-12 w-[85%] rounded-xl border border-neutral-300 bg-white px-4 text-sm text-neutral-900 outline-none transition focus:border-emerald-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
          disabled={isLoading}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 -mt-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="h-12 w-[85%] rounded-xl bg-emerald-500 px-4 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-60 mb-6"
      >
        {isLoading ? "Entrando..." : "Acessar plataforma"}
      </button>
      <div></div>

    </form>
  )
}
