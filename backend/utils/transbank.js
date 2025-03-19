// Importa el módulo completo como un objeto
import pkg from 'transbank-sdk';

// Desestructura las propiedades necesarias del objeto importado
const { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } = pkg;

// Configuración para ambiente de pruebas
const tx = new pkg.WebpayPlus.Transaction(
  new Options(
    IntegrationCommerceCodes.WEBPAY_PLUS,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  )
);

// Ejemplo de uso
const response = await tx.create(buyOrder, sessionId, amount, returnUrl);
console.log(response);