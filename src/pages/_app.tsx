import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Changa_One as ChangaOne, Nunito } from 'next/font/google'

const changaOne = ChangaOne({
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
