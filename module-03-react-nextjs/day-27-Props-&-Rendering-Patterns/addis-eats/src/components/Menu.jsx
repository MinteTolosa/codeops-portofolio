import React from 'react'
import Cards from './cards/Cards'
import "../css/style.css"

const menus = [
    {name: "Doro Wot", price: "240 ETB"},
    {name: "injera", price: "80 ETB"},
    {name: "Shiro", price: "120 ETB"},
    {name: "Doro Wot", price: "240 ETB"},
    {name: "injera", price: "80 ETB"},
    {name: "Shiro", price: "120 ETB"},
]


function Menu() {
  return (
    <div>
        <p>Addis-eats Main/Menu</p>
        <div className ='card-container'>
            {menus.map((items, index) => (
                <Cards key={index} name={items.name} price={items.price} />
            ))}
        </div>
        
        
    </div>
  )
}

export default Menu