// src/routes/payment.js
const express = require('express');
const router = express.Router();
const { WebpayPlus } = require('../utils/transbank');

// Endpoint para iniciar el pago
router.post('/init', async (req, res) => {
  try {
    const { buyOrder, sessionId, amount, returnUrl } = req.body;

    // Crear la transacción en Transbank
    const response = await WebpayPlus.Transaction.create(buyOrder, sessionId, amount, returnUrl);

    // Responder con la URL de pago y el token
    res.json({ url: response.url, token: response.token });
  } catch (error) {
    console.error("Error al iniciar la transacción:", error);
    res.status(500).json({ error: "Error al iniciar la transacción" });
  }
});

module.exports = router;