import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function DishCard({ item }) {
  return (
    <div className='overflow-hidden round-x1 border border-[#6f6252]'>
        <div className='p-5'>
            <Image src={item.image} alt='item.nameEn' width={600} height={600}/>
            <h2 className='text-xl font-semibold'>{item.nameEn}</h2>
            <p className='mt-1 text-sm'>{item.category}</p>
            <p className='mt-3 text-sm'>{item.description}</p>
            <p className='mt-1 text-sm'>{item.category}</p>
            <p className='mt-4 font-semibold'> {item.priceETB} ETB</p>
            <p className='mt-2 text-sm'>{item.spiceLevel}</p>
            <Link href={`/menu/${item.slug}`} 
            className='mt-5 block rounded-md border px-4 py-2.5 text-center text-sm'>
                View Details </Link>
        </div>
    </div>
  );
}
