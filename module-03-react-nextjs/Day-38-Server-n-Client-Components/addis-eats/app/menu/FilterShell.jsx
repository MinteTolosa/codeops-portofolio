'use client';
import React from 'react';

export default function FilterShell({ children}) {
  return (
    <div>
      <h2 className='mb-4 text-x1'>Filter Menu</h2>
      {children}
    </div>
  );
}
