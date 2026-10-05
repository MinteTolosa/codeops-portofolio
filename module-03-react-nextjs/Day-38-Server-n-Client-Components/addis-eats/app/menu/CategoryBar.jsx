'use client';
import React from 'react';
import { useState } from 'react';

export default function CategoryBar() {

  const [category, setCategory] = useState("all");
  return (
    <div className='mb-8 flex gap-3'>
     <h3 className='font-bold text-2xl'> categories </h3>
      <button onClick={() => setCategory('all')}> All </button>
      <button onClick={() => setCategory('starter')}>Starter</button>
      <button onClick={() => setCategory('Main Course')}>Main Course</button>
      <button onClick={() => setCategory('dessert')}>Dessert</button>
      <button onClick={() => setCategory('beverage')}>Beverage</button>
    </div>
  )
}
