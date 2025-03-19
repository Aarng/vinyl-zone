// Importa el módulo completo como un objeto
const pkg = require('transbank-sdk');
// Desestructura las propiedades necesarias
const { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes, WebpayPlus } = pkg;

// Configuración para ambiente de pruebas
const configureTransbank = () => {
  return new WebpayPlus.Transaction(
    new Options(
      IntegrationCommerceCodes.WEBPAY_PLUS, // Código de comercio
      IntegrationApiKeys.WEBPAY,           // Clave secreta
      Environment.Integration              // Ambiente de pruebas
    )
  );
};

// Importa Express y configura el servidor
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Configura CORS
app.use(cors({
  origin: "http://localhost:5173", // Permite solicitudes desde el frontend
}));

// Middleware para parsear JSON
app.use(express.json());

// Ruta raíz (/)
app.get('/', (req, res) => {
  res.send('¡Bienvenido al backend de Vinyl Zone!');
});

// Ruta para iniciar una transacción de pago
app.post('/api/payment/init', async (req, res) => {
  try {
    const { buyOrder, sessionId, amount, returnUrl } = req.body;

    // Validar que los datos requeridos estén presentes
    if (!buyOrder || !sessionId || !amount || !returnUrl) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    // Configura Transbank
    const tx = configureTransbank();

    // Crea la transacción
    const response = await tx.create(buyOrder, sessionId, amount, returnUrl);

    // Responde con la URL de pago y el token
    res.json({ url: response.url, token: response.token });
  } catch (error) {
    console.error("Error al iniciar la transacción:", error);
    res.status(500).json({ error: "Error al iniciar la transacción" });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});