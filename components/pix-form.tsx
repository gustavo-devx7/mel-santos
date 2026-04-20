"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import type { PixData } from "@/lib/pix-types"

interface PixFormProps {
  valor: number | null
  onSuccess: (data: PixData) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export function PixForm({ valor, onSuccess, isLoading, setIsLoading }: PixFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name.trim()) {
      setError("Por favor, insira seu nome completo")
      return
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Por favor, insira um e-mail válido")
      return
    }

    const selectedAmount = valor && valor > 0 ? valor : null

    if (!selectedAmount) {
      setError("Por favor, insira ou selecione um valor válido")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/pix/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          amount: selectedAmount,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao gerar PIX")
      }

      onSuccess(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao gerar PIX")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <img className="logoPix object-cover h-10"
        src="/images/money hot black.png" alt="imagem do privacy" />

      <img src="/images/banner.png" alt="banner"
        className="rounded-2xl bannerPix mb-6 object-cover h-40" />


      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Pagamento via PIX</h1>
          <p className="text-gray-500 mt-2">Preencha os dados para gerar o QR Code</p>
        </div>

        <p className="text-center text-2xl font-bold text-emerald-500">Valor: R$ {valor?.toFixed(2) ?? "0,00"}</p>

        <div className="space-y-4">
          <div className="inputPix space-y-2">
            <Label htmlFor="name" className="text-gray-700">Nome completo</Label>
            <Input
              id="name"
              type="text"
              placeholder="Digite seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className="h-12"
            />
          </div>

          <div className="inputPix space-y-2">
            <Label htmlFor="email" className="text-gray-700">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="exemplo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="h-12"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <Button
          type="submit"
          className="w-full h-12 text-base bg-emerald-500 text-white hover:bg-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-400"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner className="mr-2" />
              Gerando PIX...
            </>
          ) : (
            "Gerar PIX"
          )}
        </Button>
      </form>
    </>
  )
}
