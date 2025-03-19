import { useState, useEffect } from "react";

const CheckoutComplete = () => {
    const [transactionStatus, setTransactionStatus] = useState(null);
  
    useEffect(() => {
      const query = new URLSearchParams(window.location.search);
      const token_ws = query.get("token_ws");
  
      if (token_ws) {
        // Aquí puedes validar el token con Transbank para confirmar el pago
        console.log("Token recibido:", token_ws);
        setTransactionStatus("Pago completado exitosamente.");
      } else {
        setTransactionStatus("Error: No se recibió un token válido.");
      }
    }, []);
  
    return (
      <div>
        <h1 class="text-6xl">Estado del Pago</h1>
        <p class="text-4xl">{transactionStatus}</p>
      </div>
    );
  };
  
  export default CheckoutComplete;