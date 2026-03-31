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
    <main className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl  shadow-xl p-5 md:p-8">
       
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