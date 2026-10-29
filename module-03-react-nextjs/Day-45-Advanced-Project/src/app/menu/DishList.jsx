import React from 'react'
import DishCard from './DishCard';

function DishList({menus}) {
  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {menus.map((menu) => ( <DishCard key={menu.id} menu = {menu} />))} 
    </div>
  );
}

export default DishList