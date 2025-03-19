import React, { useContext, useState } from "react";
import { CartContext } from "../cartcontext/CartContext";
import Starken from "../../assets/starken.png"
import { Link } from "react-router-dom";

const Payment = () => {
  const { cartItems } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  // Validar que cartItems sea un array
  if (!Array.isArray(cartItems)) {
    console.error("cartItems debe ser un array");
    return <div>Error: Los datos del carrito no son válidos.</div>;
  }

  // Calcular el monto total del carrito
  const totalAmount = cartItems.reduce((total, item) => total + parseFloat(item.price.replace(/\./g, "")), 0);
  

  // Función para iniciar el pago con Transbank
  const handlePayment = async () => {
    setLoading(true);
    try {
      const buyOrder = `ordenCompra${Date.now()}`;
      const sessionId = `sesion${Date.now()}`;
      const returnUrl = `${window.location.origin}/checkout/complete`;
  
      const response = await fetch("http://localhost:5000/api/payment/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyOrder,
          sessionId,
          amount: totalAmount,
          returnUrl,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error del servidor:", errorData);
        alert("Funcion No disponible en Version Demo de Vinyl Zone.");
        
        return;
      }
  
      const data = await response.json();
      if (data.url && data.token) {
        window.location.href = `${data.url}?token_ws=${data.token}`;
      } else {
        throw new Error("La respuesta del servidor no contiene una URL válida");
      }
    } catch (error) {
      console.error("Error al iniciar el pago:", error);
      alert("Funcion No disponible en Version Demo de Vinyl Zone.");
      setLoading(false);
    }
  };
return (
    <div className="font-[sans-serif] flex flex-col items-center justify-center py-4 bg-light_red-900">
        <div className="max-w-3xl bg-light_red-800 rounded-lg shadow-lg overflow-hidden flex flex-col p-16 h-min">
            <div className="bg-white p-16 rounded-md mb-4">
                <h3 className="text-2xl font-extrabold text-gray-800">Orden</h3>
                <ul className="text-gray-800 mt-6 space-y-3">
                    {cartItems.map((item) => (
                        <li key={item.id} className="flex justify-between gap-2">
                            <span >{item.name}</span>
                            <span className=" font-bold">${item.price}</span>
                        </li>
                    ))}
                    <hr />
                    <li className="flex justify-between text-base font-bold">
                        Total
                        <span className="ml-auto">
                            ${totalAmount.toLocaleString("es-CL")}
                        </span>
                    </li>
                    <div>
                    <h2 className="text-2xl font-extrabold text-gray-800 text-left">Envio</h2>
                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                        <div className="flex items-center">
                            <input type="checkbox" className="w-5 h-5 cursor-pointer bg-white-100" id="paypal" />
                            <label htmlFor="paypal" className="ml-4 flex gap-2 cursor-pointer">
                                <img src={Starken} className="w-20" alt="starken" />
                            </label>
                        </div>
                    </div>
                </div>
                </ul>
            </div>
            <div className="p-4 flex flex-col justify-between">
               
                <form className="mt-8">
                    <div className="flex flex-wrap gap-4 mt-8">
                        <Link
                        to={"/explorar"}>
                        <button type="button"
                            className="px-7 py-3.5 text-sm tracking-wide bg-white hover:bg-gray-50 text-gray-800 rounded-md">Seguir Comprando
                            </button>
                        </Link>
                        <button type="button"
                            onClick={handlePayment}
                            disabled={loading}
                            className="px-7 py-3.5 text-sm tracking-wide bg-saffron text-white rounded-md hover:bg-saffron-600">
                            {loading ? "Cargando..." : "Pagar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
);
};

export default Payment;