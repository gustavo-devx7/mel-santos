import Link from "next/link"
import { redirect } from "next/navigation"
import { LoginForm } from "@/components/login-form"
import { getCustomerSession } from "@/lib/auth-session"

export default async function EntrarPage() {
  const session = await getCustomerSession()

  if (session) {
    redirect("/plataforma")
  }

  return (
    <main className="min-h-screen bg-neutral-100 px-4 py-10 transition-colors dark:bg-neutral-950">
      <div className="mx-auto flex min-h-[80vh] w-full max-w-5xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-2xl dark:border-white/10 dark:bg-neutral-900 md:grid-cols-[1.1fr_0.9fr]">
          <div className="relative hidden min-h-[560px] md:block">
            <img
              src="/images/perfilModelo.jpg"
              alt="Prévia"
              className="h-full w-full object-cover"
              style={{ objectPosition: "center top" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <p className="text-sm uppercase tracking-[0.18em] text-white/70">Acesso liberado por e-mail</p>
              <h1 className="mt-3 text-4xl font-semibold">Entre com o e-mail usado no seu pagamento.</h1>
              <p className="mt-4 max-w-md text-sm text-white/80">
                Se a compra já foi confirmada, a plataforma reconhece o seu e-mail e libera a área privada.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-md">
              <Link href="/plataforma" className="text-sm text-neutral-500 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                Voltar
              </Link>
              <h2 className="mt-6 text-3xl font-semibold text-neutral-950 dark:text-white">Login</h2>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                Use exatamente o mesmo e-mail informado na hora do Pix.
              </p>

              <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 dark:border-white/10 dark:bg-white/[0.03]">
                <LoginForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
