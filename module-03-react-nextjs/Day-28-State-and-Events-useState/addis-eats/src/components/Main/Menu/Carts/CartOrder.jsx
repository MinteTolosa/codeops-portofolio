import React from 'react'

function CartOrder({ cart }) {
  return (
    <div>
      <h2>Cart</h2>
      <p>{cart}</p>
    </div>
  )
}

export default CartOrder