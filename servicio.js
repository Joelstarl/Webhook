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

// Traducci�n en tiempo real
const translate = require('google-translate-api');

// Middleware de an�lisis del cuerpo de Node.js 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// M�todos de ruta (VERBOS HTTP: POST, GET, PUT, DELETE, etc...). Endpoint
app.post("/api/tiempo", (req, res) => {
    
    console.log(req.body);
    
    // JSON QUE ENVIA DIALOGFLOW
    let ubicacion = req.body.queryResult.parameters["any"];

    // Valor de kelvin para hacer la transformaci�n a cent�grados
    let kelvin = 273.15;

    // URL del API para la consulta de la temperatura por la posici�n geogr�fica
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${ubicacion}&APPID=36939a8b769711a5887a7aa0fd4fd8b3
    `;

    // Realizamos la petici�n
    request(url, function(error, response, body) {
        // Convertimos a JSON, la respuesta del servicio
        
     
        let _body = JSON.parse(body);

        console.log(_body['city']['coord']['lat']);
        
        let forecast = _body['city']['coord'];
  

        // Create response
        let output = `descripcion ${forecast['lat']}.`;

        // Resolve the promise with the output text
        console.log(output);
        
        
        let _response = new Object();
        _response.speech = `La temperatura prevista para el  `;
        _response.displayText = _response.speech;
        _response.source = "webhook";
       // res.status(200).send(_response);
        // Que no de error el servicio externo
     
     /*   
        if (_body.cod === '200') {

            // Peque�as conversiones
            let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            let mesTxt = meses[parseInt(_body.list[0].dt_txt.split(" ")[0].split("-")[1]) - 1];
            let fecha = `${_body.list[0].dt_txt.split(" ")[0].split("-")[2]} de ${mesTxt} de ${_body.list[0].dt_txt.split(" ")[0].split("-")[0]}`;
            let temperatura = _body.list[0].main.temp - kelvin;

            // Formamos la respuesta que enviaremos a Dialogflow
            let _response = new Object();

            // DEFAULT RESPONSE EN DIALOGFLOW
            _response.speech = `La temperatura prevista para el d�a ${fecha} (${_body.list[0].dt_txt.split(" ")[1]}) en ${_body.city.name} es de ${temperatura.toFixed(1)} grados `;
            _response.displayText = _response.speech;
            _response.source = "webhook";

            // Enviamos la respuesta 
            res.status(_body.cod).send(_response);
        } else {
            // ERROR!!!
       /*     translate(_body.message, { to: 'es' }).then(resTra) => {
                let _response = new Object();
                _response.speech = resTra.text;
                _response.displayText = resTra.text;
                _response.source = "webhook";
                res.status(200).send(_response);
            }).catch(err) => {
                console.error(err);
            });*/
    //    } 
    });
    
   return res.json({ 'fulfillmentText': output });   
    
});

// Escuchando nuestro servidor Node
app.listen(port, () => {
    console.log(`API REST en el puerto: http://localhost:${port}`);
});
