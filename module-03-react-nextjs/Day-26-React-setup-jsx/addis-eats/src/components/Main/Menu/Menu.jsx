import React from 'react'
import Dish from './Dish/Dish'
import './Menu.css'
function Menu() {
  return (
    <div className="menu">
        <h2>Our Menu</h2>
        <Dish name="Injera" price={40} />
        <Dish name="Doro Wat" price={1100} />
        <Dish name="Tibis" price={900} />
        <Dish name="Gomen" price={120} />
    </div>
  )
}

export default Menu