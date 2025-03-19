import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom"

const Login = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false); // Estado para controlar la visibilidad
    const [isClosing, setIsClosing] = useState(false); // Estado para controlar la animación de cierre

    useEffect(() => {
        // Activar la animación de entrada después de que el componente se monte
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        // Activar la animación de salida
        setIsClosing(true);

        // Esperar a que termine la animación y luego cerrar el modal
        setTimeout(() => {
            onClose();
        }, 300); // Duración de la animación de salida
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          // Intenta iniciar sesión con Firebase Authentication
          await signInWithEmailAndPassword(auth, email, password);
    
          // Redirige al usuario a la página principal o dashboard
          navigate("/"); // Cambia esto según tu estructura de rutas
          alert("Inicio de sesión exitoso");
          

        } catch (error) {
          console.error("Error al iniciar sesión:", error.message);
          alert("Funcion No disponible en Version Demo de Vinyl Zone.");
        }
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 300); 
      };
   
    return (
        <div 
            className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 ${
                isVisible ? 'fade-in' : ''
            } ${isClosing ? 'fade-out' : ''}`}
        >
            <div 
                className="bg-white p-6 rounded-lg shadow-lg w-96 relative transform transition-transform duration-300 ease-out"
                style={{ transform: isVisible && !isClosing ? 'scale(1)' : 'scale(0.9)' }}
            >
                <button 
                    className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
                    onClick={handleClose}
                >
                    ✖
                </button>
                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-saffron text-white p-2 rounded-lg hover:bg-saffron-600"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;