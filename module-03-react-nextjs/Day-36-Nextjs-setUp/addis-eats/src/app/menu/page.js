import React from 'react'
import { menus } from '@/data/menus';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 3600;
export default function MenuPage() {

  return (
    <div>
   <main className="min-h-screen bg-[#17130f] px-6 py-12 text-[#f5efe6]">
    <div className="mx-auto max-w-6xl">
     <div className="mb-12 text-center">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c9a96e]">
       Discover Our Dishes
      </p>
      <h1 className="text-4xl font-bold md:text-5xl">
        Our Menu
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-[#b8afa3]">
        Explore a selection of traditional Ethiopian dishes,
        prepared with authentic flavors and fresh ingredients.
      </p>
      </div>
   <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
    {menus.map((item) => (
      <div key={item.id} className="overflow-hidden rounded-xl border border-[#6f6252]/30 bg-[#211b15] shadow-lg transition duration-300 hover:-translate-y-1 hover:border-[#c9a96e]/50" >
        <Image src={item.image} alt={item.name} width={500} height={350} className="h-56 w-full object-cover" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold"> 
            {item.name} </h2>
          <p className="mt-1 text-sm text-[#9e9589]"> 
            {item.category} </p>
        </div>
          <p className="whitespace-nowrap font-semibold text-[#c9a96e]">
            {item.price} ETB
          </p>
        </div>
        <div className="mt-4"> {item.spicy 
          ? ( <span className="text-sm text-[#d98b6b]"> 🌶️ Spicy </span> ) 
          : ( <span className="text-sm text-[#a9b88f]"> 🌿 Mild </span> )}
        </div>
        <Link href={`/menu/${item.id}`} 
          className="mt-5 block rounded-md border border-[#c9a96e]/60 px-4 py-2.5 text-center text-sm font-medium text-[#c9a96e] transition hover:bg-[#c9a96e] hover:text-[#17130f]" >
          View Details
        </Link>
        </div>
      </div>
    ))}
  </div>
  </div>
  </main>
  </div>
  )
}
