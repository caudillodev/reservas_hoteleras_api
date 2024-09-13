# Proyecto 4 Bootcamp UDD - API/REST Reservas Hoteleras
El objetivo del Proyecto 4 es implementar una API/REST que gestione el CRUD relativo a las reservas de un hotel. La API fue desarrollada con Node.js y la librería de Express. Adicionalmente la API está documentada con Swagger.

## Documentación de la API en Swagger
Para revisar la documentación de la API desde Internet puede invocar la siguiente URL: http://45.236.129.243:3000/api-docs/ (disponible hasta el 15 de octubre de 2024).

## Contenido del proyecto
Adicional a los archivos que componen el proyecto, se ha sincronizado el archivo RESERVA_HOTELERA.postman_collection.json el cual se puede importar con la herramienta POSTMAN para ejecutar los servicios de forma local o la URL disponible en Internet:
![image](https://github.com/user-attachments/assets/2d9ccb5a-6519-4d79-a6ed-3285b5a9e9c2)

## Despliegue de la API en Internet
Se ha configurado un servidor VPS para la ejecución de las APIs vía Internet.

El servidor cuenta con una capacidad mínima en infraestructua y corre bajo el sistema operativo UBUNTU SERVER 22.04.

![image](https://github.com/user-attachments/assets/32e5fb8a-14f3-4564-8e8f-fddfd01fe797)

La configuración en el servidor es la siguiente:
![Captura de pantalla 2024-09-13 a la(s) 17 02 23](https://github.com/user-attachments/assets/3723702f-4d39-4cc7-9856-97cd65768663)

## Workspace
El proyecto consta del archivo server.js, el cual es el iniciador del servidor. 
Dicho archivo hace referencia al archivo de rutas (routes), el cual a su vez, invoca al controlador (controller).

```javascript
// Cargar variables de entorno
require("dotenv").config();

// Importamos el módulo de Express
const express = require("express");

// Importar el módulo de Swagger UI Express
const swaggerUi = require("swagger-ui-express");

// Importar el módulo de Swagger Jsdoc
const swaggerJsdoc = require("swagger-jsdoc");

// Módulo para manejar rutas de archivos
const path = require("path");

// Creamos una instancia de la aplicación
const app = express();

// Definimos el hostname en que publicará el servicio
const HOSTNAME = process.env.HOSTNAME || 'localhost';
// Definimos el puerto en el que correrá el servidor
const PORT = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes con formato JSON
app.use(express.json());

// Configuración de Swagger, para documentar la API
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de Reservas",
      version: "1.0.0",
      description:
        "Documentación de la API de Reservas Hoteleras - BOOTCAMP - Rodrigo Espinoza",
    },
    servers: [
      {
        url: `http://${HOSTNAME}:${PORT}`,
      },
    ],
  },
  // Documentar automáticamente las rutas en la carpeta routes
  apis: ["./routes/*.js"],
};

// Middleware para servir la documentación de Swagger en la ruta /api-docs
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware para parsear el cuerpo de las solicitudes con formato JSON
app.use(express.json());

// Creamos una ruta de ejemplo
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Importar las rutas de los recursos (reservas)
const reservaRoutes = require("./routes/reservaRoutes");

// Usar las rutas de los recursos (reservas)
app.use("/api/reservas", reservaRoutes);

// Iniciamos el servidor
app.listen(PORT,HOSTNAME, () => {
  console.log(`Servidor corriendo en el hostname ${HOSTNAME} y el puerto ${PORT}`);
});

```

Para procesar las solicitudes de los servicios, primero debemos invocar el archivo reservaRoutes.js para llegar a los controladores. Ejemplo para obtener los datos de una reserva:

```javascript
router.get("/:id", reservaController.obtenerReservaPorId);
```
Finalmente, el procesamiento de la solicitud se realiza en el archivo reservaController.js. Ejemplo:

```javascript
const obtenerReservaPorId = (req, res) => {
  const idReserva = parseInt(req.params.id)
  const reserva = reservas.find((c) => c.id === idReserva);

  if (!reserva) {
    return res.status(404).json({ error: "Reserva no encontrada" });
  }

  res.json({ mensaje: `Información de la reserva con ID: ${idReserva}`, reserva });
};
```
Como en el proyecto, no se ha usado una base de datos, se simulan objetos JSON con reservaModels.js. Ejemplo:

```javascript
// Simulamos una base de datos con listas de reservas
const reservas = [
    {
        "id":1,
        "fecha": "2024-09-11",
        "nombreHuesped": "Rodrigo Espinoza",
        "tipoHabitacion": "suite",
        "cantidadAdultos": 2,
        "cantidadMenores": 2,
        "estadoPago": "pagado",
            "hotel": {
                "id": 1,
                "nombre": "Hotel Paraíso"
            }
    },
    {
        "id":2,
        "fecha": "2024-09-11",
        "nombreHuesped": "Paz Espinoza",
        "tipoHabitacion": "doble",
        "cantidadAdultos": 1,
        "cantidadMenores": 0,
        "estadoPago": "pendiente",
            "hotel": {
                "id": 1,
                "nombre": "Hotel Paraíso"
            }
    }
  ];
  
  module.exports = reservas;
```
