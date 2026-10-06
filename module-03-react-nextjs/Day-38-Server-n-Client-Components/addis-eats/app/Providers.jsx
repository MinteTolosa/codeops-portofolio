'use client';
import React from 'react'

export default function Providers( {children}) {
  return (
    <cartProvider>
        {children}
    </cartProvider>
  );
}
