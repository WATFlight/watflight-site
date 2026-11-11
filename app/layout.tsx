import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SkipLink } from '@/components/layout/skip-link'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { GridRails } from '@/components/ui/grid-rails'
import './globals.css'

// Geist covers navigation, buttons and body text (decision D17). The Bunken Tech Sans display fonts
// are licensed and not in the repo; globals.css documents the temporary system fallback.
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'WATFlight | Building the Future of Aerospace',
    template: '%s | WATFlight',
  },
  description:
    'WATFlight is a student-run design team at the University of Waterloo designing, building and flying innovative aerospace systems.',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${geist.variable}`}>
      <body className="font-sans antialiased">
        <div className="relative isolate flex min-h-dvh flex-col">
          <GridRails />
          <SkipLink />
          <SiteHeader />
          <main id="main" tabIndex={-1} className="relative z-10 flex-1 outline-none">
            {children}
          </main>
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
