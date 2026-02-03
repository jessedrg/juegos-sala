import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter',
  display: 'swap'
});

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600"],
  variable: '--font-serif',
  display: 'swap'
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gameroom.io';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Game Room | Mesas de Billar, Futbolines y Dardos',
    template: '%s | Game Room',
  },
  description: 'Mesas de billar, futbolines, dianas de dardos y air hockey para tu hogar. Garantía 2 años. Presupuesto sin compromiso.',
  keywords: ['mesa billar', 'futbolin', 'dardos', 'air hockey', 'mesa billar precio', 'futbolin profesional', 'diana electronica', 'juegos sala'],
  authors: [{ name: 'Game Room' }],
  creator: 'Game Room',
  publisher: 'Game Room',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/icon-light-32x32.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SITE_URL,
    siteName: 'Game Room',
    title: 'Game Room | Mesas de Billar, Futbolines y Dardos',
    description: 'Mesas de billar, futbolines, dianas de dardos y air hockey para tu hogar. Garantía 2 años.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=630&fit=crop&q=80',
        width: 1200,
        height: 630,
        alt: 'Game Room - Tu Sala de Juegos en Casa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Game Room | Mesas de Billar, Futbolines y Dardos',
    description: 'Mesas de billar, futbolines y dardos para tu hogar.',
    images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=630&fit=crop&q=80'],
    creator: '@gameroomio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: '#f5f4f0',
  width: 'device-width',
  initialScale: 1,
}

import { IntercomProvider } from '@/components/intercom'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}>
        {children}
        <IntercomProvider />
        <Analytics />
      </body>
    </html>
  )
}
