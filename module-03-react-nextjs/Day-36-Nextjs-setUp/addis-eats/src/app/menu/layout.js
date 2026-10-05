import React from 'react'

const MenuLayout = ( {children}) =>  {
  return (
    <div className='flex justify-between'>
    <div className='w-1/6 border-r-2 flex flex-col justify-center text-center'>
        <div>
            <h3 className='font-bold text-2xl'>categories</h3>
        </div>
        <ul className='space-y-3 mt-4'>
            <li className='cursor-pointer hover:underline decoration-red-500'>All</li>
            <li className='cursor-pointer hover:underline decoration-red-500'>Starter</li>
            <li className='cursor-pointer hover:underline decoration-red-500'>Main Course</li>
            <li className='cursor-pointer hover:underline decoration-red-500'>Dessert</li>
            <li className='cursor-pointer hover:underline decoration-red-500'>Beverage</li>
        </ul>
    </div>
    {children}
    </div>
  )
}

export default MenuLayout