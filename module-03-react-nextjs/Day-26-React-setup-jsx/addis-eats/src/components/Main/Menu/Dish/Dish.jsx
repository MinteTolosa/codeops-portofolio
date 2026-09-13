import React from 'react'
import './Dish.css'
function Dish({name, price}) {
  return (
    <div className="dish">
        <image src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt={name} />
        <h3>{name}</h3>
        <p>Price: ETB {price.toFixed(2)}</p>
    </div>
  )
}

export default Dish