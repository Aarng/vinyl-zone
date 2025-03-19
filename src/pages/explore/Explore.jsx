// src/App.jsx

import Navbar from "../../components/navbar/Navbar";
import Cards from "../../components/cards/Cards";
import Footer from "../../components/footer/Footer"
import React, { useContext } from "react";
import { CartContext } from "@/components/cartcontext/CartContext";


const Explore = () => {
   
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
         
  return (
    <div>
      {/* Navbar con acceso al carrito */}
      <Navbar cartItems={cartItems} removeFromCart={removeFromCart} />

      {/* Lista de productos */}
      <Cards addToCart={addToCart} />

      <Footer/>
    </div>
  );
};

export default Explore;