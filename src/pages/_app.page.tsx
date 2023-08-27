import { Changa_One, Nunito, Libre_Barcode_128 } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

import type { AppProps } from 'next/app'

import '@/styles/globals.css'

import { ToastProvider } from '@/contexts/ToastContext'

const changaOne = Changa_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-changa-one',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
})

const libreBarCode = Libre_Barcode_128({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-libre-bar-code',
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ToastProvider>
        <main
          className={`${changaOne.variable} ${nunito.variable} ${libreBarCode.variable} font-sans`}
        >
          <Component {...pageProps} />
        </main>
      </ToastProvider>
    </SessionProvider>
  )
}
