import { createContext, useReducer } from 'react' // 1. Import createContext and useReducer
import './App.css'
import Main from './components/Main/Main'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

// 2. Create and EXPORT the context so Dish.jsx can find it
export const cartContext = createContext();

// Simple placeholder reducer function (make sure you have your actual reducer logic here)
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter(item => item.id !== action.payload.id);
    default:
      return state;
  }
}

function App() {
  // 3. Initialize your carts state and dispatch
  const [carts, dispatch] = useReducer(cartReducer, []);

  return (
    // 4. Wrap everything in the Provider and pass the values
    <cartContext.Provider value={{ carts, dispatch }}>
      <div className="App">
        <Header />
        <Main /> 
        <Footer />    
      </div>
    </cartContext.Provider>
  )
}

export default App
