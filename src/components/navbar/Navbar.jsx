import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../searchbar/SearchBar";
import logo from '../../assets/vinylzone.svg';
import Login from "../Login/Login";
import ShoppingCart from "../shoppingcart/ShoppingCart";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import DropdownButton from "../dropdownbutton/DropdownButton";

const Navbar = ({ cartItems, removeFromCart }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Reference to the mobile menu container

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    setIsMenuOpen(true);
    const menuElement = menuRef.current;
    if (menuElement) {
      menuElement.style.transform = "translateX(0)";
      menuElement.style.opacity = "1";
      menuElement.style.visibility = "visible";
    }
  };

  const closeMenu = () => {
    const menuElement = menuRef.current;
    if (menuElement) {
      menuElement.style.transform = "translateX(100%)";
      menuElement.style.opacity = "0";
      setTimeout(() => {
        setIsMenuOpen(false);
        menuElement.style.visibility = "hidden";
      }, 500); // Delay matches the transition duration
    }
  };
  
  return (
    <nav className="bg-light_red-300 border-gray-200 dark:border-gray-600 dark:bg-gray-900">
      {/* Container with responsive padding and max-width */}
      <div className="flex items-center justify-between mx-auto max-w-screen-xl p-4">
        {/* Logo Section */}
        <div className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src={logo}
              alt="Vinyl Zone Logo"
              className="h-20 w-auto sm:h-32" // Responsive logo size
            />
          </Link>
        </div>

        {/* Navigation Buttons and Search Bar */}
        <div className="hidden sm:flex items-center space-x-4 mb-4 sm:mb-0">
          <Link to="/">
            <InteractiveHoverButton
              className="bg-red w-full sm:w-auto"
              ballColor="bg-white"
              textColor1="text-white"
              textColor2="text-vermilion"
            >
              Inicio
            </InteractiveHoverButton>
          </Link>
          <div className="flex items-center">
            <DropdownButton />
          </div>
          <Link to="/Explorar">
            <InteractiveHoverButton
              className="bg-red w-full sm:w-auto"
              ballColor="bg-white"
              textColor1="text-white"
              textColor2="text-vermilion"
            >
              Explorar
            </InteractiveHoverButton>
          </Link>
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <SearchBar />
          </div>
        </div>

        {/* Cart and Login Button */}
        <div className="flex items-center space-x-4">
          <ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} />
          <InteractiveHoverButton
            type="button"
            className="text-white bg-saffron-500 hover:bg-saffron-300 focus:outline-none focus:ring-4 focus:ring-white font-medium rounded-full text-sm px-8 py-2.5 w-full sm:w-auto"
            ballColor="bg-white"
            textColor1="text-white"
            textColor2="text-saffron-500"
            onClick={() => setIsLoginOpen(true)}
          >
            Log In
          </InteractiveHoverButton>
        </div>

        {/* Hamburger Menu Toggle */}
        <div  className="sm:hidden">
          <button 
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-gray-800"
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
  
        <div
          ref={menuRef} 
          style={{
            transform: "translateX(100%)",
            opacity: "0",
            visibility: "hidden",
            transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
          }}
        className=" fixed top-0 right-0  sm:h-auto shadow-lg p-4 z-50 bg-red-300 rounded-xl sm:rounded-none shoppinglist"
      >
          {/* Close Button */}
          <button
            onClick={closeMenu}
            className="text-gray-800 hover:text-gray-900 mb-4 text-lg sm:text-base"
          >
            🗙
          </button>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-4">
            <a
              href="/"
              className="text-white text-lg font-medium hover:text-vermilion transition duration-300"
            >
              Inicio
            </a>
            <a
              href="/Explorar"
              className="text-white text-lg font-medium hover:text-vermilion transition duration-300"
            >
              Explorar
            </a>
            <div className="flex items-center">
              <DropdownButton />
            </div>
            <div className="w-full mb-4">
              <SearchBar />
            </div>
          </div>
        </div>
      

      {/* Login Modal */}
      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
    </nav>
  );
};

export default Navbar;