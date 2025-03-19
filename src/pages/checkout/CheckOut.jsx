import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import React, { useContext } from "react";
import { CartContext } from "@/components/cartcontext/CartContext";
import Payment from "@/components/payment/Payment";

const CheckOut = () => {
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
    return (
        <div>
        <Navbar cartItems={cartItems} removeFromCart={removeFromCart} />
        <Payment cartItems={cartItems}/>
        <Footer />
        </div>
    );
};

export default CheckOut;