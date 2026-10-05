import React from 'react'
import DishCard from './DishCard'

export default function DishList( {menus}) {
  return (
    <div className='grid gap-7 sm:grid-cols-2 lg:grid-cols-3'>
      {menus.map((item) => ( <DishCard key={item.id} item = {item} />))} 
    </div>
  );
}
