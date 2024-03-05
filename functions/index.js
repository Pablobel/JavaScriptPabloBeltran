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
const admin = require('firebase-admin');
admin.initializeApp();

exports.insertElement = onRequest(async (request, response) => {
  // Assuming Firestore is being used as the database
  const data = request.body; // Assuming the element data is in the request body
  
  try {
      const docRef = await admin.firestore().collection('Prueba').add(data);
      response.send(`Elemento con ID ${docRef.id} fue insertado correctamente`);
  } catch (error) {
      console.error("Error inserting document: ", error);
      response.status(500).send("Error inserting the element");
  }
});