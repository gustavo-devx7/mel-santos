"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check, Copy, Loader2 } from "lucide-react"
import type { PixData } from "@/lib/pix-types"

interface PixResultProps {
  data: PixData
  onReset: () => void
  redirectUrl?: string
}

export function PixResult({ data, onReset, redirectUrl = "/pages/sucesso" }: PixResultProps) {
  const [copied, setCopied] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()

  const checkPaymentStatus = useCallback(async () => {
    if (!data.transactionId) return

    try {
      const response = await fetch(`/api/pix/status/${data.transactionId}`)
      const result = await response.json()

      if (result.isPaid) {
        setIsPaid(true)
        setIsChecking(false)
        // Redireciona após 2 segundos para mostrar a mensagem de sucesso
        setTimeout(() => {
          router.push(redirectUrl)
        }, 2000)
      }
    } catch (error) {
      console.error("Erro ao verificar status:", error)
    }
  }, [data.transactionId, redirectUrl, router])

  useEffect(() => {
    // Verifica o status a cada 5 segundos
    const interval = setInterval(() => {
      if (!isPaid) {
        checkPaymentStatus()
      }
    }, 5000)

    // Verifica imediatamente ao montar
    checkPaymentStatus()

    return () => clearInterval(interval)
  }, [checkPaymentStatus, isPaid])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.copyPaste)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Erro ao copiar:", err)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  // Tela de pagamento confirmado
  if (isPaid) {
    return (
      <div className="space-y-6 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Pagamento Confirmado!</h1>
          <p className="text-gray-500 mt-2">
            Seu pagamento de {formatCurrency(data.amount)} foi recebido.
          </p>
          <p className="text-gray-400 text-sm mt-4">
            Redirecionando...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 flex flex-col items-center ">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">PIX Gerado</h1>
        <p className="text-gray-500 mt-2">
          Escaneie o QR Code ou copie o código
        </p>
        <p className="text-lg font-medium text-gray-900 valorQr">
          Valor: {formatCurrency(data.amount)}
        </p>
      </div>

      <div className="flex justify-center imgQr">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          {data.qrCodeBase64 ? (
            <Image
              src={data.qrCodeBase64.startsWith("data:")
                ? data.qrCodeBase64
                : `data:image/png;base64,${data.qrCodeBase64}`}
              alt="QR Code PIX"
              width={250}
              height={250}
              className="rounded"
            />
          ) : data.qrCode ? (
            <Image
              src={data.qrCode}
              alt="QR Code PIX"
              width={250}
              height={250}
              className="rounded"
            />
          ) : (
            <div className="w-[250px] h-[250px] bg-gray-100 flex items-center justify-center rounded">
              <p className="text-gray-400">QR Code</p>
            </div>
          )}
        </div>
      </div>

      {/* Indicador de verificação de pagamento */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 aguardando">
        {isChecking && <Loader2 className="h-4 w-4 animate-spin" />}
        <span>Aguardando pagamento...</span>
      </div>

      <div className="space-y-5 divCopiaCola">
        <p className="text-sm font-medium text-gray-700 text-center">
          PIX Copia e Cola
        </p>
        <div onClick={handleCopy}
          className="relative">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 pr-12 break-all
           text-gray-600 max-h-32 overflow-y-auto w-[80%] text-[10px] flex copiaCola">
            {data.copyPaste}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-500 rounded-[10px]"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 text-white" />
            ) : (
              <Copy className="h-4 w-4 text-gray-500" />
            )}
          </Button>
        </div>
      </div>

      <Button
        variant="outline"
        className="h-8 w-[70%] mx-auto botaoGerarNovo mt-30 mb-20"
        onClick={onReset}
      >
        Gerar novo PIX
      </Button>
    </div>
  )
}
