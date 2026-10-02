import React from 'react'
import { notFound } from 'next/navigation';

export default async function DishPage({ params }) {
    
    const { id } = params;
    const dish = await getDish(params.id);
    
    if (!dish) notFound();

  return (
    
    <div>
        <h1>{id}</h1>
        <h2>Single Dish page</h2>

        <DishCard {...dish} />;
    </div>
  )
}
