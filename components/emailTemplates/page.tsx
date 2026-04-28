import { renderToStaticMarkup } from 'react-dom/server'
import logo from "@/public/images/money hot black.png"

interface PaymentConfirmationEmailProps {
    buyerName?: string
    transactionId: string
    totalAmount: number // em centavos
}

export function PaymentConfirmationEmail({
    buyerName,
    transactionId,
    totalAmount,
}: PaymentConfirmationEmailProps) {
    return (
        <html>
            <body style={{ margin: 0, padding: 0, backgroundColor: "#ffffff", color:'black' }}>
                <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: "#ffffff" }}>
                    <tr>
                        <td align="center">

                            <table width="100%" cellPadding="20" style={{ backgroundColor: "#ffffff" }}>
                                <tr>
                                    <td align="center">

                                        <img
                                            src="https://mel-santos.vercel.app/images/money hot black.png"
                                            width="150"
                                            style={{ display: "block" }}
                                        />
                                        <div>
                                            <h1>
                                                Clique no botão abaixo para acessar a plataforma!!
                                            </h1>
                                        </div>

                                        <a
                                            href="https://mel-santos.vercel.app/entrar"
                                            style={{
                                                display: "inline-block",
                                                marginTop: "20px",
                                                padding: "12px 20px",
                                                backgroundColor: "#000",
                                                color: "white",
                                                textDecoration: "none",
                                                borderRadius: "5px"
                                            }}
                                        >
                                            Clique aqui para acessar!
                                        </a>

                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                </table>
            </body>
        </html>
    );
}

export function renderPaymentConfirmationEmail(props: PaymentConfirmationEmailProps): string {
    return renderToStaticMarkup(<PaymentConfirmationEmail {...props} />)
}