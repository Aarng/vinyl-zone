import { Link } from "react-router-dom";
import SearchBar from "../searchbar/SearchBar";
import logo from '../../assets/vinylzone.svg';
import Login from "../Login/Login";
import ShoppingCart from "../shoppingcart/ShoppingCart";
import { useState } from "react";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import DropdownButton from "../dropdownbutton/DropdownButton";

const Navbar = ({ cartItems, removeFromCart }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <nav className="bg-light_red-300 border-gray-200 dark:border-gray-600 dark:bg-gray-900">
      {/* Container with responsive padding and max-width */}
      <div className="flex flex-col sm:flex-row items-center justify-between mx-auto max-w-screen-xl p-4">
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

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-0">
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
        </div>

        {/* Search Bar */}
        <div className="w-full sm:w-auto mb-4 sm:mb-0">
          <SearchBar />
        </div>

        {/* Cart and Login Button */}
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
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
      </div>

      {/* Login Modal */}
      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
    </nav>
  );
};

export default Navbar;