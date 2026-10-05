import { useContext } from "react";
import {cartContext} from "../App";


function Header() {

   const {carts} = useContext(cartContext);

  return (
    <div>
      <h1>My First App</h1>
      <h1>Cart items: {carts.length}</h1>
    </div>
  )
}

export default Header