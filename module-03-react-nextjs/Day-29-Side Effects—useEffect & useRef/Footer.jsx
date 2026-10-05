/* eslint-disable no-unused-vars */
import React from 'react'
import { useContext } from 'react' ;
import { cartContext } from '../App' ;
import Dish from './Main/Menu/Cards/Dishs/Dish';
import Card from './Main/Menu/Cards/Card';

function Footer() {

  const {carts} = useContext(cartContext);
  return (
    <div>
    <h3>
        Cart Items:
    </h3>
    {carts.map((items) => (
      <Dish key={items.id} {...items} />  
      ))}
  </div> 
); }


export default Footer