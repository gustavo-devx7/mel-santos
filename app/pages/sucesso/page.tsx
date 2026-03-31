import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SucessoPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Check className="h-12 w-12 text-green-600" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-gray-900">
            Pagamento Confirmado!
          </h1>
          <p className="text-gray-500">
            Obrigado pelo seu pagamento. Sua transação foi processada com sucesso.
          </p>
        </div>

        <Button asChild className="w-full h-12">
          <Link href="/">
            Voltar ao início
          </Link>
        </Button>
      </div>
    </main>
  )
}
