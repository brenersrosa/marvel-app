import Link from 'next/link'
import Image from 'next/image'

import marvelLogo from '@/assets/marvel-logo.svg'

export function Header() {
  return (
    <nav className="absolute flex w-full items-center justify-between py-8">
      <div className="mx-auto flex max-w-7xl flex-1 items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Image src={marvelLogo} width={120} alt="Marvel logo." />
          </Link>
        </div>

        <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-4">
          <span className="font-medium">Brener Rosa</span>
          <img
            src="https://github.com/brenersrosa.png"
            alt="Profile image."
            className="h-10 w-10 rounded-full"
          />
        </div>
      </div>
    </nav>
  )
}
