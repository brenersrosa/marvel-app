import Image from 'next/image'
import { Buildings, MapTrifold, Package, User } from 'phosphor-react'

import { ActiveLink } from './ActiveLink'

import logo from '@/assets/marvel-logo.svg'

export function Navbar() {
  return (
    <div className="flex h-full w-20 flex-col justify-between">
      <div className="flex h-20 w-20 items-center justify-center bg-red-600">
        <Image src={logo} alt="Marvel logo." className="w-14" />
      </div>
      <div className="flex h-full w-full flex-col justify-center gap-8 bg-zinc-900">
        <ActiveLink
          icon={<Buildings size={24} className="text-white" />}
          link="/accommodations"
          active
        />

        <ActiveLink
          icon={<MapTrifold size={24} className="text-white" />}
          link="/itineraries"
        />

        <ActiveLink
          icon={<Package size={24} className="text-white" />}
          link="/packages"
        />

        <ActiveLink
          icon={<User size={24} className="text-white" />}
          link="/profile"
        />
      </div>
    </div>
  )
}
