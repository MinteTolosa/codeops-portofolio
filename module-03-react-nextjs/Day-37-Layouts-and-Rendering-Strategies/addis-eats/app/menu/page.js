import React from 'react'


export const revalidate = 3600;
export default async function MenuPage() {
    const dishes = await getDishes();
  return (
    <main>
        <div>Menu Page</div>
        <DishList dishes={dishes} />
    </main>
    
  )
}
