import { useState, useEffect } from "react";
import Dish from "./Cards/Dishs/Dish";
import OrderForm from "../OrderForm/orderForm";
import Category from "../../CategoryBar/Category";

function Menu() {
  const [cart, setCart] = useState(0);
  const [category, setCatagory] = useState("All");
  const [menu, setMenu] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true); 
        setError(null);
        
        const response = await fetch("/data/menu.json"); 
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("The fetched data", data);

        if (category.toLowerCase() === "all") {
          setMenu(data.items);
        } else {
          const filteredItems = data.items.filter(
            (item) => item.category.toLowerCase() === category.toLowerCase()
          );
          setMenu(filteredItems);
        }

      } catch (error) {
        console.log("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [category]);
  
  return (
    <div className="menu-container">
      <h1>Carts: {cart}</h1>

      <Category onSelectCat={setCatagory}/>

      <div className="card-container">
          {loading && <p>Loading menu...</p>}
          {error && <p>Error Loading menu: {error.message}</p>}
          
          {/* ✅ Safe mapping with an initialized array */}
          {!loading && !error &&
            menu.map((item) => (
              <Dish key={item.id} {...item} cart={cart} onCart={setCart}/>
            ))
          }
      </div>

      <OrderForm />
    </div>
  );
}

export default Menu;
