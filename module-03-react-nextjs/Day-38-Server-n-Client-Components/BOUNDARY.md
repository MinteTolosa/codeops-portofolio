# Addis Eats Component Boundary

    Component --------------------------------- Type   

1:- app/layout.js                               Server  

Why:- Provides the application shell 

2:- app/page.js                                 Server 
Why:- No client interaction

3:- app/menu/page.js                            Server 
Why:- Fetches menu data

4:- app/menu/DishList.jsx                       Server
Why:-  Displays menu data


5:- app/menu/[id]/page.js                       Server 
Why:- Fetches and displays dish details

6:- app/components/FilterShell.jsx              Client  
Why:-  Uses state and button clicks


7:- app/components/AddToCartButton.jsx           Client 
Why:- Handles Add to Cart click 

8:- app/components/CartProvider.jsx              Client  
Why:- Holds cart state and context 

9:- app/components/CartLink.jsx                  Client
Why:- Reads cart state 


10:- app/cart/page.js                            Client 
Why:- Uses cart state and actions 