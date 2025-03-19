import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate, 
} from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import NoPage from "./pages/noPage/NoPage";
import Explore from "./pages/Explore/Explore";
import AddP from "./pages/addp/addp";
import CheckOut from "./pages/checkout/CheckOut";
import { CartProvider } from "./components/cartcontext/CartContext";
import Overview from "./pages/poverview/Overview";
import CheckOutComplete from "./pages/checkoutc/CheckOutComplete";




const App = () => {
 

  return (
    
    <CartProvider> {/* Envuelve toda la aplicación */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/explorar" element={<Explore />} />
          <Route path="/addproduct" element={<AddP />} />
          <Route path="/product/:productId" element={<Overview />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/checkout/complete" element={<CheckOutComplete />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};
export default App;