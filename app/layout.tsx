import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import './pages/pages.css'

import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {

  title: 'Mel santos',
  description: 'Clique e venha ver a surpresa que preparei para você!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
