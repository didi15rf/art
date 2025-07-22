import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Xart - Art Community App',
  description: 'A gamified art app featuring artist recommendations and art categories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
