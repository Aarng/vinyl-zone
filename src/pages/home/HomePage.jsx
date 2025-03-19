import Jumbotron from "../../components/Jumbotron/jumbotron";
import Gallery from "../../components/gallery/Gallery";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import React, { useContext } from "react";
import { CartContext } from "@/components/cartcontext/CartContext";


const HomePage = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
        

    
    return (
        <div className="bg-light_red-900">


        <Navbar cartItems={cartItems} removeFromCart={removeFromCart} />
   
        <div className="main-content bg-light_red-900">
      
        <Jumbotron />
        <Gallery />
        
        <Footer />
        </div>
    </div>
       
    );
}

export default HomePage;