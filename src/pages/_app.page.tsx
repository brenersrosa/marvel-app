import { Changa_One, Nunito } from 'next/font/google'

import type { AppProps } from 'next/app'

import '@/styles/globals.css'

const changaOne = Changa_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-changa-one',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${changaOne.variable} ${nunito.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}
