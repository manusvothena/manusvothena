"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="relative z-10 flex items-center p-2 sm:p-0">
      <div className="w-10 h-10 sm:w-12 sm:h-12 relative mr-1 sm:mr-2">
        <Image src="/assets/logotinyvothena.png" alt="Tiny Vothena" fill className="object-contain" />
      </div>
      <span className="text-lg sm:text-xl font-bold text-black dark:text-white bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Tiny Vothena
      </span>
    </Link>
  )
}
