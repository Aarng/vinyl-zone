import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import React, { useContext } from "react";
import { CartContext } from "@/components/cartcontext/CartContext";
import Details from "../../components/details/Details";

const Overview = () => {
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
    return (
        <div>
        <Navbar cartItems={cartItems} removeFromCart={removeFromCart} />
        <Details></Details>
        <Footer />
        </div>
    );
};
export default Overview;