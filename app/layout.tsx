import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SAIL-GUEST',
  description: 'SAIL Guest House Management System',
  icons: {
    icon: '/sail-logo.png', 
    apple: '/sail-logo.png',
  },
  manifest: '/manifest.json',
  themeColor: '#002060', 
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'SAIL-GUEST',
    description: 'SAIL Guest House Management System',
    images: [
      {
        url: '/sail-logo.png',
        width: 800,
        height: 600,
        alt: 'SAIL Guest House Logo',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
