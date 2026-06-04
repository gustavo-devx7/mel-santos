interface PaymentConfirmationEmailProps {
  buyerName?: string
  transactionId: string
  totalAmount: number
}

export function PaymentConfirmationEmail({
  buyerName,
  transactionId,
  totalAmount,
}: PaymentConfirmationEmailProps) {
  return (
    <html>
      <body style={{ margin: 0, padding: 0, backgroundColor: "#ffffff", color: "black" }}>
        <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: "#ffffff" }}>
          <tr>
            <td align="center">
              <table width="100%" cellPadding="20" style={{ backgroundColor: "#ffffff" }}>
                <tr>
                  <td align="center">
                    <img
                      src="https://money-hot.vercel.app/images/money_hot_black.png"
                      width="150"
                      style={{ display: "block" }}
                      alt="Money Hot"
                    />
                    <div>
                      <h1>Seu pagamento semanal foi confirmado.</h1>
                      <p>Olá, {buyerName ?? "Cliente"}.</p>
                      <p>Seu acesso fica liberado por 7 dias a partir da confirmação do pagamento.</p>
                      <p>Transação: {transactionId}</p>
                      <p>Valor pago: R$ {(totalAmount / 100).toFixed(2)}</p>
                    </div>
                    <a
                      href="https://money-hot.vercel.app/entrar"
                      style={{
                        display: "inline-block",
                        marginTop: "20px",
                        padding: "12px 20px",
                        backgroundColor: "#000",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "5px",
                      }}
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
  )
}
