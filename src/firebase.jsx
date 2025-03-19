// src/firebase.jsx
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importa Firestore
import { getAuth } from "firebase/auth"; // Importa Auth

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC8TuEfRZ0AAPTZW9D2_GGz5PPwckKj5os",
  authDomain: "vinyl-zone-87689.firebaseapp.com",
  projectId: "vinyl-zone-87689",
  storageBucket: "vinyl-zone-87689.firebasestorage.app",
  messagingSenderId: "735222044119",
  appId: "1:735222044119:web:9cdfb7c1ea36b17a2ae792",
  measurementId: "G-21SES2M4KR"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa los servicios que necesitas
const fireDB = getFirestore(app); // Base de datos Firestore
const auth = getAuth(app); // Autenticación

// Exporta los servicios para usarlos en otros archivos
export { fireDB, auth };