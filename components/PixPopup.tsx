import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

interface PixPopupProps {
  valor: number;
  onClose: () => void;
}

export default function PixPopup({ valor, onClose }: PixPopupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formattedValue = valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Por favor, insira seu nome completo");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Por favor, insira um e-mail válido");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/pix/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          amount: valor,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao gerar PIX");
      }

      // Handle success (QR code display, etc.)
      console.log("PIX gerado:", data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao gerar PIX");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50"
      onClick={onClose}
    >
      <div
        className="relative mx-4 w-full max-w-md rounded-2xl bg-card p-8 shadow-2xl border-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Pagamento via PIX
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Preencha os dados para gerar o QR Code
          </p>
          <p className="mt-2 text-xl font-bold text-pix-value">
            Valor: R$ {formattedValue}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold text-foreground">
              Nome completo
            </Label>
            <Input
              id="name"
              placeholder="Digite seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className="h-12 rounded-lg border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-foreground">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="h-12 rounded-lg border-border"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-emerald-500 py-4 text-base font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? "Gerando PIX..." : "Gerar PIX"}
          </button>
        </form>
      </div>
    </div>
  );
}
