import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter',
  display: 'swap'
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
  variable: '--font-serif',
  display: 'swap'
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thegamesroom.io';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'The Games Room | Mesas de Billar, Futbolines, Dardos y Air Hockey',
    template: '%s | The Games Room',
  },
  description: 'Tienda especializada en mesas de billar, futbolines profesionales, dianas de dardos y mesas de air hockey para tu hogar. Envio gratis, garantia 2 anos y presupuesto sin compromiso en toda Europa.',
  keywords: ['mesa billar', 'futbolin', 'dardos', 'air hockey', 'mesa billar precio', 'futbolin profesional', 'diana electronica', 'juegos sala', 'mesa billar casa', 'futbolin comprar', 'mesa air hockey', 'juegos de salon'],
  authors: [{ name: 'The Games Room' }],
  creator: 'The Games Room',
  publisher: 'The Games Room',
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
    siteName: 'The Games Room',
    title: 'The Games Room | Mesas de Billar, Futbolines, Dardos y Air Hockey',
    description: 'Tienda especializada en mesas de billar, futbolines profesionales, dianas de dardos y mesas de air hockey. Envio gratis y garantia 2 anos.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1647633391986-4614f2ee0ca4?w=1200&h=630&fit=crop&q=80',
        width: 1200,
        height: 630,
        alt: 'The Games Room - Mesas de Billar, Futbolines y Juegos para Casa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Games Room | Mesas de Billar, Futbolines y Dardos',
    description: 'Mesas de billar, futbolines profesionales y dardos para tu hogar. Envio gratis.',
    images: ['https://images.unsplash.com/photo-1647633391986-4614f2ee0ca4?w=1200&h=630&fit=crop&q=80'],
    creator: '@thegamesroomio',
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
}

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
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
        <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <IntercomProvider />
        <Analytics />
      </body>
    </html>
  )
}
