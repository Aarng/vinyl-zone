import React, { useState, useRef, useContext } from "react";
import { CartContext } from "../cartcontext/CartContext";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef(null); // Referencia al contenedor del carrito
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const toggleCart = () => {
    if (isCartOpen) {
      closeCart();
    } else {
      openCart();
    }
  };

  const openCart = () => {
    setIsCartOpen(true);
    const cartElement = cartRef.current;
    if (cartElement) {
      cartElement.style.transform = "translateX(0)";
      cartElement.style.opacity = "1";
      cartElement.style.visibility = "visible";
    }
  };

  const closeCart = () => {
    const cartElement = cartRef.current;
    if (cartElement) {
      cartElement.style.transform = "translateX(100%)";
      cartElement.style.opacity = "0";
      setTimeout(() => {
        setIsCartOpen(false);
        cartElement.style.visibility = "hidden";
      }, 500); // Delay matches the transition duration
    }
  };

  return (
    <div className="relative inline-block">
      {/* Cart Button */}
      <button onClick={toggleCart} className="relative">
        <svg
          className="w-6 h-6 text-white hover:text-saffron-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
          />
        </svg>
        {cartItems.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Cart Modal */}
      <div
        ref={cartRef}
        style={{
          transform: "translateX(100%)",
          opacity: "0",
          visibility: "hidden",
          transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
        }}
        className=" fixed top-0 right-0  sm:h-auto shadow-lg p-4 z-50 bg-light_red-800 rounded-xl sm:rounded-none shoppinglist"
      >
        {/* Close Button */}
        <button
          onClick={closeCart}
          className="text-gray-800 hover:text-gray-900 mb-4 text-lg sm:text-base"
        >
          🗙
        </button>

        {/* Cart Title */}
        <h2 className="text-lg sm:text-xl font-bold mb-4">Carrito de Compras</h2>

        {/* Empty Cart Message */}
        {cartItems.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">El carrito está vacío</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-lg mb-2"
              >
                {/* Product Image */}
                <img
                  src={item.photos && item.photos[0]}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded mr-4 mb-2 sm:mb-0"
                />
                {/* Product Details */}
                <div className="flex-1">
                  <p className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white">
                    ${item.price}
                  </p>
                </div>
                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 mt-2 sm:mt-0 text-lg sm:text-base"
                >
                  🗑
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Checkout Button */}
        {cartItems.length > 0 && (
          <Link to={'/checkout'}>
            <button className="w-full bg-saffron text-white p-2 rounded-lg hover:bg-saffron-600 mt-4 text-sm sm:text-base">
              Proceder al Checkout
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;