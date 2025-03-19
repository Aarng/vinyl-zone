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
      <div className="flex items-center justify-between mx-auto max-w-screen-xl p-4">
        {/* Logo a la izquierda */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} alt="Vinyl Zone Logo" className="h-32 w-auto" />
        </Link>
        
        {/* Sección de botones de navegación */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <InteractiveHoverButton className="bg-red" ballColor="bg-white" textColor1="text-white" textColor2="text-vermilion">Inicio</InteractiveHoverButton>
          </Link>
          <div className="flex items-center">
            <DropdownButton />
          </div>
          <Link to="/Explorar">
            <InteractiveHoverButton className="bg-red" ballColor="bg-white" textColor1="text-white" textColor2="text-vermilion">Explorar</InteractiveHoverButton>
          </Link>
        </div>
        
        {/* Barra de búsqueda */}
        <SearchBar />
        
        {/* Carrito de compras y botón de Login */}
        <div className="flex items-center space-x-4">
          <ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} />
          <InteractiveHoverButton
            type="button"
            className="text-white bg-saffron-500 hover:bg-saffron-300 focus:outline-none focus:ring-4 focus:ring-white font-medium rounded-full text-sm px-8 py-2.5" ballColor="bg-white" textColor1="text-white" textColor2="text-saffron-500"
            onClick={() => setIsLoginOpen(true)}
          >
            Log In
            </InteractiveHoverButton>
        </div>
      </div>
      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
    </nav>
  );
};

export default Navbar;