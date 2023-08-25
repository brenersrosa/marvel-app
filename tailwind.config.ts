import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['var(--font-changa-one)'],
        sans: ['var(--font-nunito)'],
        barCode: ['var(--font-libre-bar-code)'],
      },
      backgroundImage: {
        home: "url('~/src/assets/background.png')",
      },
      gridTemplateColumns: {
        dashboard: '5rem repeat(2, 1fr)',
      },
      gridTemplateRows: {
        dashboard: '5rem repeat(2, 1fr)',
      },
      keyframes: {
        hide: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        slideIn: {
          from: {
            transform: 'translateX(calc(100% + var(--viewport-padding)))',
          },
          to: { transform: 'translateX(0)' },
        },
        swipeOut: {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
        },
      },
      animation: {
        hide: 'hide 100ms ease-in',
        slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        swipeOut: 'swipeOut 100ms ease-out',
        neonPulse: 'neon-pulse 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
