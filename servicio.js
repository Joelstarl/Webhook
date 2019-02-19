'use strict';

// Libreria express para crear un api rest
const express = require("express");
const bodyParser = require("body-parser");

// Para hacer peticiones http de forma simple
const request = require('request');

// Para usar express dentro de Node
const app = express();

// Definimos el puerto
const port = process.env.PORT || 8899;

// Middleware de an�lisis del cuerpo de Node.js 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// M�todos de ruta (VERBOS HTTP: POST, GET, PUT, DELETE, etc...). Endpoint
app.post("/api/tiempo", (req, res) => {
    
    console.log(req.body);
    
    // JSON QUE ENVIA DIALOGFLOW
    let ubicacion = req.body.queryResult.parameters["any"];

        return res.json({ 'fulfillmentText': 'hola' }); 
  
});

// Escuchando nuestro servidor Node
app.listen(port, () => {
    console.log(`API REST en el puerto: http://localhost:${port}`);
});
