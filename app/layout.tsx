import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { SkipLink } from '@/components/layout/skip-link'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { GridRails } from '@/components/ui/grid-rails'
import { MotionBoot } from '@/components/motion/motion-boot'
import { MotionController } from '@/components/motion/motion-controller'
import './globals.css'
import './motion.css'

// Geist covers navigation, buttons and body text (decision D17).
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })

// Bunken Tech Sans (Buntype) covers display type: SC Wide for the hero and page titles, Std Wide for
// the technical headings. The owner confirmed web-embedding rights; the files are the unmodified
// originals in app/fonts, and next/font self-hosts them (with a metric-adjusted fallback to limit
// layout shift). They feed the --font-bunken-* variables that globals.css reads.
const bunkenSC = localFont({
  src: './fonts/BunkenTechSansSCWide-Med.otf',
  weight: '500',
  style: 'normal',
  variable: '--font-bunken-sc',
  display: 'swap',
})

const bunkenStd = localFont({
  src: './fonts/BunkenTechSansStdWide-Med.otf',
  weight: '500',
  style: 'normal',
  variable: '--font-bunken-std',
  display: 'swap',
})

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
    // suppressHydrationWarning: MotionBoot sets <html data-motion> before React hydrates (see components/motion).
    <html lang="en" suppressHydrationWarning className={`dark ${geist.variable} ${bunkenSC.variable} ${bunkenStd.variable}`}>
      <head>
        <MotionBoot />
      </head>
      <body className="font-sans antialiased">
        {/* Stacking layers (documented in app/globals.css): content < grid rails < sticky header. */}
        <div className="relative isolate flex min-h-dvh flex-col">
          <GridRails />
          <SkipLink />
          <SiteHeader />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <SiteFooter />
        </div>
        <MotionController />
        <Analytics />
      </body>
    </html>
  )
}
