import { useState, useContext } from "react"
import Card from "../Card"
import { cartContext } from "../../../../../App"; // Ensure this path points exactly to App.jsx

function Dish({id, name, price, category, isSpicy, currency = "ETB", cart, onCart  }) {

  const { carts, dispatch } = useContext(cartContext);  
  const [qty, setQty] = useState(0);

  const handleOrder = () => {
    setQty( qty + 1);
    onCart(price + cart);
  }

  return (
    <div className='dishs'>
      <Card>
          <h3>{name}</h3>
          <p>{price} {currency}</p>
          <p>{category}</p>
          <p>{isSpicy && "isSpicy"}</p>
        
        <div className="dish-button">
          <button onClick={handleOrder}>Add to Cart</button>
          { 
            carts.some((item) => item.id == id)
            ?
            ( <button onClick={() => dispatch({ type:"REMOVE", payload: {id} })}> REMOVE </button>) 
            :
            ( <button onClick={() => dispatch({ type:"ADD", payload: {id, name, price, category, isSpicy }}) }>ADD </button> ) 
          }
          <p>Quantity:{qty}</p>
        </div> 
     </Card>
    </div>
  )
}

export default Dish
