import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import AddToCartButton from '../components/AddToCartButton';

function DishCard({menu}) {
  return (
   <Link
  href={`/menu/${menu.slug}`}
  className="flex flex-col overflow-hidden rounded-xl border border-[#6f6252] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
>
  <Image
    src={menu.image}
    alt={menu.nameEn}
    width={650}
    height={450}
    className="aspect-[13/9] w-full rounded-lg object-cover"
  />
  <h2 className="mt-4 truncate text-xl font-semibold">{menu.nameEn}</h2>
  <p className="mt-1 text-sm text-neutral-500">{menu.category}</p>

  <div className="mt-auto flex items-center justify-between gap-4 pt-5">
    <p className="font-semibold">{menu.priceETB} ETB</p>
    <AddToCartButton menu={menu} />
  </div>
</Link>

  );
}

export default DishCard