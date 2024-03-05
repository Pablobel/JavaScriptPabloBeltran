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

//URL para insertar https://insertelement-we5ef7bfvq-uc.a.run.app
exports.insertElement = onRequest(async (request, response) => {
  
  const data = request.body; 
  
  try {
      const docRef = await admin.firestore().collection('Prueba').add(data);
      response.send(`Elemento con ID ${docRef.id} fue insertado correctamente`);
  } catch (error) {
      console.error("Error inserting document: ", error);
      response.status(500).send("Error inserting the element");
  }
});

//Ejercicio 2

//URL para eliminar https://deleteelement-we5ef7bfvq-uc.a.run.app/?id=
exports.deleteElement = onRequest(async (request, response) => {
  
  const elementId = request.query.id || request.body.id; 

  if (!elementId) {
      return response.status(400).send('Es necesario proporcionar el ID del elemento a eliminar.');
  }

  try {
      await admin.firestore().collection('Prueba').doc(elementId).delete();
      response.send(`El elemento con ID ${elementId} fue eliminado correctamente`);
  } catch (error) {
      console.error("Error eliminando el elemento: ", error);
      response.status(500).send("Error eliminando el elemento");
  }
});

//Ejercicio 3

//URL para ver todos los elementos https://getall-we5ef7bfvq-uc.a.run.app
exports.getAll = onRequest(async (request, response) => {
  try {
      const collectionRef = admin.firestore().collection('Prueba');
      const snapshot = await collectionRef.get();
      const elements = [];

      snapshot.forEach(doc => {
          elements.push({ id: doc.id, ...doc.data() });
      });

      response.json(elements);
  } catch (error) {
      console.error("Error al obtener los elementos: ", error);
      response.status(500).send("Error al obtener los elementos");
  }
});

//Ejercicio 4

const functions = require('firebase-functions');
exports.agregarTimeStamp = functions.firestore
    .document('Prueba/{id}')
    .onCreate((snap, context) => {
        const data = snap.data();
        const timeStamp = admin.firestore.FieldValue.serverTimestamp();
        return snap.ref.update({ timeStamp });
    });