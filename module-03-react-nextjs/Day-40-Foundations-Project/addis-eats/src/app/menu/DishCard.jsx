import React from 'react';
import Image from 'next/image'
import Link from 'next/link';

function DishCard({menu}) {
  return (
    <Link key={menu.id} href={`/menu/${menu.slug}`}
      className="rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className='overflow-hidden round-x1 border border-[#6f6252]'>
        <div className='p-5'>
          <Image src={menu.image} alt='menu.nameEn' width={600} height={550}/>
          <h2 className='text-xl font-semibold'>{menu.nameEn}</h2>
          <p className='mt-1 text-sm'>{menu.category}</p>
          <p className='mt-3 text-sm'>{menu.description}</p>
          <p className='mt-1 text-sm'>{menu.category}</p>
          <p className='mt-4 font-semibold'> {menu.priceETB} ETB</p>
          <p className='mt-2 text-sm'>{menu.spiceLevel}</p>            
        </div>
      </div>
    </Link>
  );
}

export default DishCard