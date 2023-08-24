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
    },
  },
  plugins: [],
}
export default config
