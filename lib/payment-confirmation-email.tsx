import "server-only"

type PaymentConfirmationEmailProps = {
  buyerName?: string
  transactionId: string
  totalAmount: number
}

export function renderPaymentConfirmationEmail(props: PaymentConfirmationEmailProps): string {
  const buyerName = props.buyerName?.trim() || "Cliente"
  const escapedBuyerName = buyerName
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")

  return `
    <html>
      <body style="margin:0;padding:0;background-color:#ffffff;color:black;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="20" style="background-color:#ffffff;">
                <tr>
                  <td align="center">
                    <img
                      src="https://money-hot.vercel.app/images/money_hot_black.png"
                      width="150"
                      style="display:block;"
                      alt="Money Hot"
                    />
                    <div>
                      <h1>Pagamento semanal confirmado, ${escapedBuyerName}.</h1>
                      <p>Seu acesso fica liberado por 7 dias a partir da confirmação do pagamento.</p>
                      <p>Transação: ${props.transactionId}</p>
                      <p>Valor pago: R$ ${(props.totalAmount / 100).toFixed(2)}</p>
                    </div>
                    <a
                      href="https://money-hot.vercel.app/entrar"
                      style="display:inline-block;margin-top:20px;padding:12px 20px;background-color:#000;color:white;text-decoration:none;border-radius:5px;"
                    >
                      Acessar meus 7 dias
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `.trim()
}
