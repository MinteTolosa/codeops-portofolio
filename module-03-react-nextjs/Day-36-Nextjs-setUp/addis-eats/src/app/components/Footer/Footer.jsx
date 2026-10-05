import React from 'react'
import Link from "next/link";

export default function Footer() {
  return (
    <header className="border-t border-[#6f6252]/30 bg-[#17130f]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-sm tracking-wide text-[#c9a96e]" >
          Addis-Eats
        </Link>
        <div className="flex items-center gap-6 text-sm font-small">
          <Link href="/" className="text-[#f5efe6] transition hover:text-[#c9a96e]">
            Contact
          </Link>
          <Link href="/menu" className="text-[#f5efe6] transition hover:text-[#c9a96e]" >
            Address
          </Link>
          <Link href="/Cart" className="text-[#f5efe6] transition hover:text-[#c9a96e]" >
            Live a comment 
          </Link>
          <Link href="/Checkout" className="text-[#f5efe6] transition hover:text-[#c9a96e]" >
            Thanks for comming
          </Link>
        </div>
      </div>
      <p className='text-center text-sm tracking-wide text-[#c9a96e] py-b 15'>
        All @copy right reseved to Addis-eats
      </p>
    </header>
  )
}
