/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

 exports.helloWorld = onRequest((request, response) => {
   logger.info("Hello logs!", {structuredData: true});
   response.send("Hello from Firebase!");
 });

//Ejercicio 1
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

//Trigger
exports.insertElement = onRequest(async (request, response) => {
  
  if (request.method !== "POST") {
      response.status(405).send('Método HTTP no permitido');
      return;
  }

  try {
      
      const docRef = await db.collection('Prueba').add(request.body);

      logger.info(`Elemento con ID ${docRef.id} fue insertado correctamente`, {structuredData: true});
      response.send(`Elemento con ID ${docRef.id} fue insertado correctamente`);
  } catch (error) {
      logger.error('Error insertando el documento', {error: error});
      response.status(500).send('Error al insertar el documento');
  }
});