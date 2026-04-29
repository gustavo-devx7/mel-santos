# Money Hot

Plataforma Next.js com vitrine de conteúdo, pagamento via PIX, liberação de acesso por e-mail e área privada protegida por sessão.

## Visão Geral

O projeto foi pensado para este fluxo:

1. O usuário acessa a landing.
2. Escolhe uma oferta e gera um PIX.
3. O pagamento é criado via API.
4. O webhook confirma o pagamento.
5. O cliente recebe e-mail com link de acesso.
6. O login valida o e-mail pago no Supabase.
7. A área `/plataforma` é liberada apenas para usuários com sessão válida.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Supabase
- Brevo

## Rotas Principais

- `/` - entrada inicial
- `/conteudo` - página pública de conteúdo/vitrine
- `/entrar` - login por e-mail
- `/plataforma` - área privada protegida
- `/plataforma/mel-santos` - página interna de modelo

## APIs

- `/api/auth/login` - cria sessão do cliente
- `/api/auth/logout` - encerra sessão
- `/api/pix/create` - cria cobrança PIX
- `/api/pix/status/[transactionId]` - consulta status do pagamento
- `/api/pix/webhook` - recebe confirmação do gateway

## Variáveis de Ambiente

Crie um `.env.local` com algo neste formato:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SESSION_SECRET=

BREVO_SENDER_EMAIL=
BREVO_SENDER_NAME=
BREVO_API_KEY=
# ou API_KEY_BREVO=

BUCKPAY_API_URL=
BUCKPAY_API_KEY=
BUCKPAY_USER_AGENT=

NEXT_PUBLIC_APP_URL=https://money-hot.vercel.app
```

## Rodando Localmente

```bash
npm install
npm run dev
```

App local:

```text
http://localhost:3000
```

## Checks

```bash
npm run lint
npm run build
```

## Deploy

O deploy principal está pensado para Vercel.

Antes de publicar, confirme:

- `NEXT_PUBLIC_APP_URL` com o domínio final
- webhook do gateway apontando para `/api/pix/webhook`
- variáveis do Supabase configuradas
- credenciais da Brevo configuradas

## Observações

- A área `/plataforma` exige sessão válida.
- O login libera acesso com base no e-mail com pagamento confirmado.
- Existem páginas e componentes ainda com conteúdo visual específico da operação atual. Se o branding mudar, revise textos, rotas internas e referências visuais.
