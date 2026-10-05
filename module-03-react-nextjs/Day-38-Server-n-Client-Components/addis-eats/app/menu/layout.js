import React from 'react'
import CategoryBar from './CategoryBar'

export default function MenuLayout({ children}) {
  return (
    <div>
        <CategoryBar />
        <section>{ children }</section>   
    </div>
   
  )
}
