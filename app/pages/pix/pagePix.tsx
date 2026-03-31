"use client"

import { useState } from "react"
import { PixResult } from "@/components/pix-result"
import { PixForm } from "@/components/pix-form"

import type { PixData } from "@/lib/pix-types"

type Props = {
  valor: number | null;
};

export default function PagePix({ valor }: Props) {
  const [pixData, setPixData] = useState<PixData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleReset = () => {
    setPixData(null)
  }

  return (
    <main className="h-full bg-white/97 flex items-center justify-center p-4 rounded-2xl border-2">
      <div className="w-full max-w-md">

        {/* aqui você já tem o valor */}
        <p>Valor selecionado: {valor}</p>

        {!pixData ? (
          <PixForm
            valor={valor}
            onSuccess={setPixData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
          <PixResult
            data={pixData}
            onReset={handleReset}
          />
        )}

      </div>
    </main>
  )
}